import express from 'express';
import { Bulletin } from '../models/Bulletin.js';

const router = express.Router();

// Create new bulletin
router.post('/', async (req, res) => {
    try {
        const bulletin = new Bulletin(req.body);
        await bulletin.save();

        res.status(201).json({
            status: 'success',
            message: 'Bulletin created successfully',
            data: { bulletin }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get all bulletins
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            priority, 
            type,
            status = 'published',
            department,
            search, 
            page = 1, 
            limit = 10,
            sortBy = 'schedule.publishDate',
            sortOrder = 'desc'
        } = req.query;
        
        const filter = { status };
        
        // Only show non-expired bulletins unless specifically requesting expired ones
        if (status !== 'expired') {
            filter.$or = [
                { 'schedule.expiryDate': { $exists: false } },
                { 'schedule.expiryDate': null },
                { 'schedule.expiryDate': { $gte: new Date() } }
            ];
        }
        
        if (category) filter.category = category;
        if (priority) filter.priority = priority;
        if (type) filter.type = type;
        if (department) filter['publisher.department'] = department;
        
        // Text search
        if (search) {
            filter.$text = { $search: search };
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const bulletins = await Bulletin.find(filter)
            .select('-__v -comments -acknowledgments')
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Bulletin.countDocuments(filter);

        // Add virtual fields
        const bulletinsWithVirtuals = bulletins.map(bulletin => ({
            ...bulletin.toObject(),
            isExpired: bulletin.isExpired,
            daysUntilExpiry: bulletin.daysUntilExpiry
        }));

        res.json({
            status: 'success',
            data: {
                bulletins: bulletinsWithVirtuals,
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

// Get bulletin by ID
router.get('/:id', async (req, res) => {
    try {
        const bulletin = await Bulletin.findById(req.params.id);
        
        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        // Increment views
        bulletin.interactions.views += 1;
        await bulletin.save();

        const bulletinWithVirtuals = {
            ...bulletin.toObject(),
            isExpired: bulletin.isExpired,
            daysUntilExpiry: bulletin.daysUntilExpiry
        };

        res.json({
            status: 'success',
            data: { bulletin: bulletinWithVirtuals }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Update bulletin
router.put('/:id', async (req, res) => {
    try {
        const { modifiedBy } = req.body;
        
        const updateData = { 
            ...req.body,
            'metadata.modifiedBy': modifiedBy || 'System'
        };

        const bulletin = await Bulletin.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Bulletin updated successfully',
            data: { bulletin }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Publish bulletin (change from draft to published)
router.put('/:id/publish', async (req, res) => {
    try {
        const bulletin = await Bulletin.findByIdAndUpdate(
            req.params.id,
            { 
                status: 'published',
                'schedule.publishDate': new Date()
            },
            { new: true, runValidators: true }
        );

        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Bulletin published successfully',
            data: { bulletin }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Add comment to bulletin
router.post('/:id/comments', async (req, res) => {
    try {
        const { commenterName, commenterEmail, comment, isAnonymous } = req.body;

        if (!commenterName || !commenterEmail || !comment) {
            return res.status(400).json({
                status: 'error',
                message: 'Commenter name, email, and comment are required'
            });
        }

        const bulletin = await Bulletin.findById(req.params.id);
        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        const newComment = {
            commenterName: isAnonymous ? 'Anonymous' : commenterName,
            commenterEmail: commenterEmail.toLowerCase(),
            comment,
            commentDate: new Date(),
            isAnonymous: isAnonymous || false
        };

        bulletin.comments.push(newComment);
        await bulletin.save();

        // Don't return email in response for privacy
        const commentResponse = {
            ...newComment,
            commenterEmail: undefined
        };

        res.json({
            status: 'success',
            message: 'Comment added successfully',
            data: { comment: commentResponse }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Acknowledge bulletin (for tracking who has read important notices)
router.post('/:id/acknowledge', async (req, res) => {
    try {
        const { acknowledgerName, acknowledgerEmail, acknowledgerDepartment } = req.body;

        if (!acknowledgerName || !acknowledgerEmail) {
            return res.status(400).json({
                status: 'error',
                message: 'Acknowledger name and email are required'
            });
        }

        const bulletin = await Bulletin.findById(req.params.id);
        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        // Check if already acknowledged
        const existingAck = bulletin.acknowledgments.find(
            ack => ack.acknowledgerEmail.toLowerCase() === acknowledgerEmail.toLowerCase()
        );

        if (existingAck) {
            return res.status(400).json({
                status: 'error',
                message: 'You have already acknowledged this bulletin'
            });
        }

        bulletin.acknowledgments.push({
            acknowledgerName,
            acknowledgerEmail: acknowledgerEmail.toLowerCase(),
            acknowledgerDepartment: acknowledgerDepartment || '',
            acknowledgeDate: new Date()
        });

        await bulletin.save();

        res.json({
            status: 'success',
            message: 'Bulletin acknowledged successfully',
            data: { 
                acknowledgmentCount: bulletin.acknowledgments.length
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Increment download count
router.post('/:id/download/:attachmentId', async (req, res) => {
    try {
        const bulletin = await Bulletin.findById(req.params.id);
        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        const attachment = bulletin.attachments.id(req.params.attachmentId);
        if (!attachment) {
            return res.status(404).json({
                status: 'error',
                message: 'Attachment not found'
            });
        }

        bulletin.interactions.downloads += 1;
        await bulletin.save();

        res.json({
            status: 'success',
            message: 'Download recorded',
            data: { 
                attachment,
                downloadCount: bulletin.interactions.downloads
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Increment share count
router.post('/:id/share', async (req, res) => {
    try {
        const bulletin = await Bulletin.findByIdAndUpdate(
            req.params.id,
            { $inc: { 'interactions.shares': 1 } },
            { new: true }
        );

        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Share recorded',
            data: { 
                shareCount: bulletin.interactions.shares
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Archive bulletin
router.put('/:id/archive', async (req, res) => {
    try {
        const bulletin = await Bulletin.findByIdAndUpdate(
            req.params.id,
            { status: 'archived' },
            { new: true }
        );

        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Bulletin archived successfully',
            data: { bulletin }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Delete bulletin
router.delete('/:id', async (req, res) => {
    try {
        const bulletin = await Bulletin.findByIdAndDelete(req.params.id);
        if (!bulletin) {
            return res.status(404).json({
                status: 'error',
                message: 'Bulletin not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Bulletin deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get bulletin statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const totalBulletins = await Bulletin.countDocuments();
        const publishedBulletins = await Bulletin.countDocuments({ status: 'published' });
        const urgentBulletins = await Bulletin.countDocuments({ 
            status: 'published', 
            priority: { $in: ['high', 'urgent'] }
        });
        
        // Total views and downloads
        const interactionStats = await Bulletin.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: '$interactions.views' },
                    totalDownloads: { $sum: '$interactions.downloads' },
                    totalShares: { $sum: '$interactions.shares' }
                }
            }
        ]);

        // Category distribution
        const categoryStats = await Bulletin.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Department statistics
        const departmentStats = await Bulletin.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: '$publisher.department', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Recent bulletins
        const recentBulletins = await Bulletin.find({ status: 'published' })
            .sort({ 'schedule.publishDate': -1 })
            .limit(5)
            .select('title category priority publisher.department schedule.publishDate');

        res.json({
            status: 'success',
            data: {
                totalBulletins,
                publishedBulletins,
                urgentBulletins,
                totalViews: interactionStats[0]?.totalViews || 0,
                totalDownloads: interactionStats[0]?.totalDownloads || 0,
                totalShares: interactionStats[0]?.totalShares || 0,
                categoryDistribution: categoryStats,
                departmentDistribution: departmentStats,
                recentBulletins
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
