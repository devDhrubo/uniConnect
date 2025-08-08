import express from 'express';
import { Donation } from '../models/Donation.js';

const router = express.Router();

// Create new donation campaign
router.post('/', async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();

        res.status(201).json({
            status: 'success',
            message: 'Donation campaign created successfully',
            data: { donation }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get all donations
router.get('/', async (req, res) => {
    try {
        const { 
            type, 
            status = 'active', 
            search, 
            page = 1, 
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;
        
        const filter = { status };
        if (type) filter.type = type;
        
        // Text search
        if (search) {
            filter.$text = { $search: search };
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const donations = await Donation.find(filter)
            .select('-__v')
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Donation.countDocuments(filter);

        // Add virtual fields to response
        const donationsWithVirtuals = donations.map(donation => ({
            ...donation.toObject(),
            completionPercentage: donation.completionPercentage,
            daysRemaining: donation.daysRemaining
        }));

        res.json({
            status: 'success',
            data: {
                donations: donationsWithVirtuals,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get donation by ID
router.get('/:id', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({
                status: 'error',
                message: 'Donation campaign not found'
            });
        }

        // Increment views
        donation.views += 1;
        await donation.save();

        const donationWithVirtuals = {
            ...donation.toObject(),
            completionPercentage: donation.completionPercentage,
            daysRemaining: donation.daysRemaining
        };

        res.json({
            status: 'success',
            data: { donation: donationWithVirtuals }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Make a donation
router.post('/:id/donate', async (req, res) => {
    try {
        const { donorName, donorEmail, amount, message, isAnonymous, paymentMethod, transactionId } = req.body;
        
        if (!donorName || !amount) {
            return res.status(400).json({
                status: 'error',
                message: 'Donor name and amount are required'
            });
        }

        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({
                status: 'error',
                message: 'Donation campaign not found'
            });
        }

        if (donation.status !== 'active') {
            return res.status(400).json({
                status: 'error',
                message: 'This donation campaign is not active'
            });
        }

        // Add the donation
        const newDonation = {
            donorName: isAnonymous ? 'Anonymous' : donorName,
            donorEmail: donorEmail || '',
            amount: parseFloat(amount),
            message: message || '',
            isAnonymous: isAnonymous || false,
            paymentMethod: paymentMethod || 'bkash',
            transactionId: transactionId || '',
            donationDate: new Date(),
            verified: false // Would be verified by admin
        };

        donation.donations.push(newDonation);
        donation.currentAmount += parseFloat(amount);

        // Check if goal is reached
        if (donation.currentAmount >= donation.fundraisingGoal) {
            donation.status = 'completed';
        }

        await donation.save();

        res.json({
            status: 'success',
            message: 'Donation submitted successfully',
            data: { 
                donation: {
                    ...donation.toObject(),
                    completionPercentage: donation.completionPercentage
                }
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Add update to donation campaign
router.post('/:id/updates', async (req, res) => {
    try {
        const { title, content, images } = req.body;
        
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({
                status: 'error',
                message: 'Donation campaign not found'
            });
        }

        const update = {
            title,
            content,
            images: images || [],
            date: new Date()
        };

        donation.updates.push(update);
        await donation.save();

        res.json({
            status: 'success',
            message: 'Update added successfully',
            data: { donation }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Update donation status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!donation) {
            return res.status(404).json({
                status: 'error',
                message: 'Donation campaign not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Campaign status updated successfully',
            data: { donation }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get donation statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const totalCampaigns = await Donation.countDocuments();
        const activeCampaigns = await Donation.countDocuments({ status: 'active' });
        const completedCampaigns = await Donation.countDocuments({ status: 'completed' });
        
        // Total amount raised
        const totalRaised = await Donation.aggregate([
            { $group: { _id: null, total: { $sum: '$currentAmount' } } }
        ]);

        // Average donation per campaign
        const avgDonationPerCampaign = totalCampaigns > 0 ? 
            (totalRaised[0]?.total || 0) / totalCampaigns : 0;

        // Type distribution
        const typeStats = await Donation.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 }, totalRaised: { $sum: '$currentAmount' } } }
        ]);

        // Recent campaigns
        const recentCampaigns = await Donation.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title type currentAmount fundraisingGoal status createdAt');

        res.json({
            status: 'success',
            data: {
                totalCampaigns,
                activeCampaigns,
                completedCampaigns,
                totalAmountRaised: totalRaised[0]?.total || 0,
                averageDonationPerCampaign: Math.round(avgDonationPerCampaign),
                typeDistribution: typeStats,
                recentCampaigns: recentCampaigns.map(campaign => ({
                    ...campaign.toObject(),
                    completionPercentage: Math.min(100, Math.round((campaign.currentAmount / campaign.fundraisingGoal) * 100))
                }))
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Verify donation (admin function)
router.put('/:campaignId/donations/:donationId/verify', async (req, res) => {
    try {
        const { campaignId, donationId } = req.params;
        const { verified } = req.body;
        
        const donation = await Donation.findById(campaignId);
        if (!donation) {
            return res.status(404).json({
                status: 'error',
                message: 'Donation campaign not found'
            });
        }

        const donationToVerify = donation.donations.id(donationId);
        if (!donationToVerify) {
            return res.status(404).json({
                status: 'error',
                message: 'Donation not found'
            });
        }

        donationToVerify.verified = verified;
        await donation.save();

        res.json({
            status: 'success',
            message: `Donation ${verified ? 'verified' : 'marked as unverified'}`,
            data: { donation }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
