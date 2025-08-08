import express from 'express';
import { LostFound } from '../models/LostFound.js';

const router = express.Router();

// Create new lost/found item
router.post('/', async (req, res) => {
    try {
        const item = new LostFound(req.body);
        await item.save();

        res.status(201).json({
            status: 'success',
            message: `${item.type === 'lost' ? 'Lost' : 'Found'} item posted successfully`,
            data: { item }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get all lost/found items
router.get('/', async (req, res) => {
    try {
        const { 
            type, 
            category, 
            status = 'active', 
            search, 
            page = 1, 
            limit = 10 
        } = req.query;
        
        const filter = { status };
        if (type) filter.type = type;
        if (category) filter.category = category;
        
        // Text search
        if (search) {
            filter.$text = { $search: search };
        }

        const items = await LostFound.find(filter)
            .select('-__v')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await LostFound.countDocuments(filter);

        res.json({
            status: 'success',
            data: {
                items,
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

// Get item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await LostFound.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        // Increment views
        item.views += 1;
        await item.save();

        res.json({
            status: 'success',
            data: { item }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const item = await LostFound.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Item updated successfully',
            data: { item }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Mark item as resolved
router.put('/:id/resolve', async (req, res) => {
    try {
        const { matchedWith } = req.body;
        
        const item = await LostFound.findByIdAndUpdate(
            req.params.id,
            { 
                status: 'resolved',
                matches: matchedWith ? [{
                    matchedWith,
                    status: 'verified',
                    matchDate: new Date()
                }] : []
            },
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Item marked as resolved',
            data: { item }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Delete item
router.delete('/:id', async (req, res) => {
    try {
        const item = await LostFound.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Search for potential matches
router.get('/:id/matches', async (req, res) => {
    try {
        const item = await LostFound.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        // Find potential matches (opposite type, similar category, recent dates)
        const oppositeType = item.type === 'lost' ? 'found' : 'lost';
        const potentialMatches = await LostFound.find({
            _id: { $ne: item._id },
            type: oppositeType,
            category: item.category,
            status: 'active',
            dateTime: {
                $gte: new Date(item.dateTime.getTime() - 7 * 24 * 60 * 60 * 1000), // Within 7 days
                $lte: new Date(item.dateTime.getTime() + 7 * 24 * 60 * 60 * 1000)
            }
        }).limit(10);

        res.json({
            status: 'success',
            data: { matches: potentialMatches }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get statistics
router.get('/stats', async (req, res) => {
    try {
        const totalItems = await LostFound.countDocuments();
        const lostItems = await LostFound.countDocuments({ type: 'lost', status: 'active' });
        const foundItems = await LostFound.countDocuments({ type: 'found', status: 'active' });
        const resolvedItems = await LostFound.countDocuments({ status: 'resolved' });
        
        // Success rate
        const successRate = totalItems > 0 ? ((resolvedItems / totalItems) * 100).toFixed(1) : 0;

        // Category distribution
        const categoryStats = await LostFound.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Recent activity
        const recentItems = await LostFound.find({ status: 'active' })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('type itemName category createdAt');

        res.json({
            status: 'success',
            data: {
                totalItems,
                lostItems,
                foundItems,
                resolvedItems,
                successRate: parseFloat(successRate),
                categoryDistribution: categoryStats,
                recentActivity: recentItems
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
