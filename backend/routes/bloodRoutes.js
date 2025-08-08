import express from 'express';
import { BloodDonor, BloodRequest } from '../models/Blood.js';

const router = express.Router();

// DONOR ROUTES

// Register new blood donor
router.post('/donors', async (req, res) => {
    try {
        const donorData = req.body;
        
        // Check if donor already exists
        const existingDonor = await BloodDonor.findOne({ email: donorData.email });
        if (existingDonor) {
            return res.status(400).json({
                status: 'error',
                message: 'A donor with this email already exists'
            });
        }

        const donor = new BloodDonor(donorData);
        await donor.save();

        res.status(201).json({
            status: 'success',
            message: 'Blood donor registered successfully',
            data: { donor }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get all donors
router.get('/donors', async (req, res) => {
    try {
        const { bloodGroup, status, page = 1, limit = 10 } = req.query;
        
        const filter = { isActive: true };
        if (bloodGroup) filter.bloodGroup = bloodGroup;
        if (status) filter.status = status;

        const donors = await BloodDonor.find(filter)
            .select('-__v')
            .sort({ totalDonations: -1, createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await BloodDonor.countDocuments(filter);

        res.json({
            status: 'success',
            data: {
                donors,
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

// Get donor by ID
router.get('/donors/:id', async (req, res) => {
    try {
        const donor = await BloodDonor.findById(req.params.id);
        if (!donor) {
            return res.status(404).json({
                status: 'error',
                message: 'Donor not found'
            });
        }

        res.json({
            status: 'success',
            data: { donor }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Update donor
router.put('/donors/:id', async (req, res) => {
    try {
        const donor = await BloodDonor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!donor) {
            return res.status(404).json({
                status: 'error',
                message: 'Donor not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Donor updated successfully',
            data: { donor }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// BLOOD REQUEST ROUTES

// Create blood request
router.post('/requests', async (req, res) => {
    try {
        const request = new BloodRequest(req.body);
        await request.save();

        res.status(201).json({
            status: 'success',
            message: 'Blood request created successfully',
            data: { request }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get all blood requests
router.get('/requests', async (req, res) => {
    try {
        const { bloodGroup, urgency, status = 'active', page = 1, limit = 10 } = req.query;
        
        const filter = { status };
        if (bloodGroup) filter.bloodGroup = bloodGroup;
        if (urgency) filter.urgency = urgency;

        const requests = await BloodRequest.find(filter)
            .select('-__v')
            .sort({ urgency: 1, createdAt: -1 }) // Critical first, then by date
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await BloodRequest.countDocuments(filter);

        res.json({
            status: 'success',
            data: {
                requests,
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

// Get blood request by ID
router.get('/requests/:id', async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id)
            .populate('responses.donorId', 'name phone bloodGroup');

        if (!request) {
            return res.status(404).json({
                status: 'error',
                message: 'Blood request not found'
            });
        }

        res.json({
            status: 'success',
            data: { request }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Respond to blood request
router.post('/requests/:id/respond', async (req, res) => {
    try {
        const { donorId, donorName, donorPhone } = req.body;
        
        const request = await BloodRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({
                status: 'error',
                message: 'Blood request not found'
            });
        }

        // Check if donor already responded
        const existingResponse = request.responses.find(
            response => response.donorId.toString() === donorId
        );

        if (existingResponse) {
            return res.status(400).json({
                status: 'error',
                message: 'You have already responded to this request'
            });
        }

        request.responses.push({
            donorId,
            donorName,
            donorPhone,
            status: 'interested'
        });

        await request.save();

        res.json({
            status: 'success',
            message: 'Response submitted successfully',
            data: { request }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Update request status
router.put('/requests/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        const request = await BloodRequest.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!request) {
            return res.status(404).json({
                status: 'error',
                message: 'Blood request not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Request status updated successfully',
            data: { request }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get statistics
router.get('/stats', async (req, res) => {
    try {
        const totalDonors = await BloodDonor.countDocuments({ isActive: true });
        const availableDonors = await BloodDonor.countDocuments({ 
            isActive: true, 
            status: 'available' 
        });
        const activeRequests = await BloodRequest.countDocuments({ status: 'active' });
        const urgentRequests = await BloodRequest.countDocuments({ 
            status: 'active', 
            urgency: { $in: ['urgent', 'critical'] }
        });

        // Blood group distribution
        const bloodGroupStats = await BloodDonor.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$bloodGroup', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({
            status: 'success',
            data: {
                totalDonors,
                availableDonors,
                activeRequests,
                urgentRequests,
                bloodGroupDistribution: bloodGroupStats
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
