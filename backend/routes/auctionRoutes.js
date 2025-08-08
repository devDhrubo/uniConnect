import express from 'express';
import { AuctionItem } from '../models/Auction.js';

const router = express.Router();

// Create new auction item
router.post('/', async (req, res) => {
    try {
        const item = new AuctionItem(req.body);
        await item.save();

        res.status(201).json({
            status: 'success',
            message: 'Auction item listed successfully',
            data: { item }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get all auction items
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            condition, 
            pricingType,
            status = 'active',
            minPrice,
            maxPrice,
            search, 
            page = 1, 
            limit = 12,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;
        
        const filter = { status };
        if (category) filter.category = category;
        if (condition) filter.condition = condition;
        if (pricingType) filter['pricing.type'] = pricingType;
        
        // Price range
        if (minPrice || maxPrice) {
            filter['pricing.currentBid'] = {};
            if (minPrice) filter['pricing.currentBid'].$gte = parseFloat(minPrice);
            if (maxPrice) filter['pricing.currentBid'].$lte = parseFloat(maxPrice);
        }
        
        // Text search
        if (search) {
            filter.$text = { $search: search };
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const items = await AuctionItem.find(filter)
            .select('-__v -bids.bidder.email -bids.bidder.phone -seller.email -seller.phone')
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await AuctionItem.countDocuments(filter);

        // Add virtual fields
        const itemsWithVirtuals = items.map(item => ({
            ...item.toObject(),
            timeRemaining: item.timeRemaining,
            highestBidder: item.highestBidder ? {
                name: item.highestBidder.bidder.name,
                amount: item.highestBidder.amount,
                bidTime: item.highestBidder.bidTime
            } : null
        }));

        res.json({
            status: 'success',
            data: {
                items: itemsWithVirtuals,
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
        const item = await AuctionItem.findById(req.params.id)
            .select('-__v -bids.bidder.email -bids.bidder.phone');
        
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        // Increment views
        item.views += 1;
        await item.save();

        const itemWithVirtuals = {
            ...item.toObject(),
            timeRemaining: item.timeRemaining,
            highestBidder: item.highestBidder
        };

        res.json({
            status: 'success',
            data: { item: itemWithVirtuals }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Place a bid
router.post('/:id/bid', async (req, res) => {
    try {
        const { bidder, amount } = req.body;

        if (!bidder || !bidder.name || !bidder.email || !bidder.phone || !amount) {
            return res.status(400).json({
                status: 'error',
                message: 'Bidder information and amount are required'
            });
        }

        const item = await AuctionItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        if (item.status !== 'active') {
            return res.status(400).json({
                status: 'error',
                message: 'This auction is not active'
            });
        }

        if (item.pricing.type !== 'auction') {
            return res.status(400).json({
                status: 'error',
                message: 'This item is not available for bidding'
            });
        }

        // Check if auction has ended
        if (item.auction.endDate && new Date() > item.auction.endDate) {
            item.status = 'expired';
            await item.save();
            return res.status(400).json({
                status: 'error',
                message: 'Auction has ended'
            });
        }

        const bidAmount = parseFloat(amount);

        // Check minimum bid
        const minBidAmount = item.pricing.currentBid + item.auction.bidIncrement;
        if (bidAmount < minBidAmount) {
            return res.status(400).json({
                status: 'error',
                message: `Minimum bid amount is ${minBidAmount} ${item.pricing.currency}`
            });
        }

        // Check if bidder is the seller
        if (bidder.email.toLowerCase() === item.seller.email.toLowerCase()) {
            return res.status(400).json({
                status: 'error',
                message: 'Seller cannot bid on their own item'
            });
        }

        // Add the bid
        const newBid = {
            bidder: {
                name: bidder.name,
                email: bidder.email.toLowerCase(),
                phone: bidder.phone
            },
            amount: bidAmount,
            bidTime: new Date(),
            isAutomatic: false
        };

        item.bids.push(newBid);
        item.pricing.currentBid = bidAmount;

        await item.save();

        res.json({
            status: 'success',
            message: 'Bid placed successfully',
            data: { 
                currentBid: bidAmount,
                nextMinimumBid: bidAmount + item.auction.bidIncrement
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Buy now (for fixed price or buy now price)
router.post('/:id/buy-now', async (req, res) => {
    try {
        const { buyer } = req.body;

        if (!buyer || !buyer.name || !buyer.email || !buyer.phone) {
            return res.status(400).json({
                status: 'error',
                message: 'Buyer information is required'
            });
        }

        const item = await AuctionItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        if (item.status !== 'active') {
            return res.status(400).json({
                status: 'error',
                message: 'This item is not available for purchase'
            });
        }

        let finalPrice;
        if (item.pricing.type === 'fixed') {
            finalPrice = item.pricing.startingPrice;
        } else if (item.pricing.buyNowPrice) {
            finalPrice = item.pricing.buyNowPrice;
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'Buy now option is not available for this item'
            });
        }

        // Check if buyer is the seller
        if (buyer.email.toLowerCase() === item.seller.email.toLowerCase()) {
            return res.status(400).json({
                status: 'error',
                message: 'Seller cannot buy their own item'
            });
        }

        // Complete the transaction
        item.status = 'sold';
        item.transaction = {
            buyer: {
                name: buyer.name,
                email: buyer.email.toLowerCase(),
                phone: buyer.phone
            },
            finalPrice,
            transactionDate: new Date(),
            deliveryStatus: 'pending'
        };

        await item.save();

        // Don't return sensitive buyer info
        res.json({
            status: 'success',
            message: 'Purchase successful',
            data: { 
                finalPrice,
                transactionDate: item.transaction.transactionDate,
                item: {
                    title: item.title,
                    seller: item.seller.name
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

// Add to watchlist
router.post('/:id/watch', async (req, res) => {
    try {
        const { watcher } = req.body;

        if (!watcher || !watcher.name || !watcher.email) {
            return res.status(400).json({
                status: 'error',
                message: 'Watcher information is required'
            });
        }

        const item = await AuctionItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        // Check if already watching
        const existingWatcher = item.watchers.find(
            w => w.email.toLowerCase() === watcher.email.toLowerCase()
        );

        if (existingWatcher) {
            return res.status(400).json({
                status: 'error',
                message: 'Already watching this item'
            });
        }

        item.watchers.push({
            name: watcher.name,
            email: watcher.email.toLowerCase(),
            watchDate: new Date()
        });

        await item.save();

        res.json({
            status: 'success',
            message: 'Added to watchlist',
            data: { watchersCount: item.watchers.length }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Ask question
router.post('/:id/questions', async (req, res) => {
    try {
        const { questioner, question } = req.body;

        if (!questioner || !questioner.name || !questioner.email || !question) {
            return res.status(400).json({
                status: 'error',
                message: 'Questioner information and question are required'
            });
        }

        const item = await AuctionItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        const newQuestion = {
            questioner: {
                name: questioner.name,
                email: questioner.email.toLowerCase()
            },
            question,
            questionDate: new Date()
        };

        item.questions.push(newQuestion);
        await item.save();

        res.json({
            status: 'success',
            message: 'Question submitted successfully',
            data: { question: newQuestion }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Answer question (seller only)
router.put('/:id/questions/:questionId/answer', async (req, res) => {
    try {
        const { answer } = req.body;

        if (!answer) {
            return res.status(400).json({
                status: 'error',
                message: 'Answer is required'
            });
        }

        const item = await AuctionItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                status: 'error',
                message: 'Item not found'
            });
        }

        const question = item.questions.id(req.params.questionId);
        if (!question) {
            return res.status(404).json({
                status: 'error',
                message: 'Question not found'
            });
        }

        question.answer = answer;
        question.answerDate = new Date();
        
        await item.save();

        res.json({
            status: 'success',
            message: 'Answer submitted successfully',
            data: { question }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Update item status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        const item = await AuctionItem.findByIdAndUpdate(
            req.params.id,
            { status },
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
            message: 'Item status updated successfully',
            data: { item }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get auction statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const totalItems = await AuctionItem.countDocuments();
        const activeItems = await AuctionItem.countDocuments({ status: 'active' });
        const soldItems = await AuctionItem.countDocuments({ status: 'sold' });
        
        // Total sales value
        const totalSalesValue = await AuctionItem.aggregate([
            { $match: { status: 'sold' } },
            { $group: { _id: null, total: { $sum: '$transaction.finalPrice' } } }
        ]);

        // Category distribution
        const categoryStats = await AuctionItem.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Ending soon (auctions ending within 24 hours)
        const endingSoon = await AuctionItem.find({
            'pricing.type': 'auction',
            status: 'active',
            'auction.endDate': {
                $gte: new Date(),
                $lte: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        })
        .sort({ 'auction.endDate': 1 })
        .limit(5)
        .select('title pricing.currentBid auction.endDate');

        res.json({
            status: 'success',
            data: {
                totalItems,
                activeItems,
                soldItems,
                totalSalesValue: totalSalesValue[0]?.total || 0,
                categoryDistribution: categoryStats,
                endingSoon: endingSoon.map(item => ({
                    ...item.toObject(),
                    timeRemaining: item.timeRemaining
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

export default router;
