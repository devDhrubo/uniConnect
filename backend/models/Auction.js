import mongoose from 'mongoose';

const auctionItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Item title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Item description is required'],
        trim: true,
        minlength: [20, 'Description must be at least 20 characters']
    },
    category: {
        type: String,
        required: [true, 'Item category is required'],
        enum: [
            'Books',
            'Electronics',
            'Furniture',
            'Clothing',
            'Sports Equipment',
            'Musical Instruments',
            'Laboratory Equipment',
            'Art Supplies',
            'Vehicle',
            'Other'
        ]
    },
    condition: {
        type: String,
        required: [true, 'Item condition is required'],
        enum: ['new', 'like_new', 'good', 'fair', 'poor']
    },
    
    seller: {
        name: {
            type: String,
            required: [true, 'Seller name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Seller email is required'],
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: [true, 'Seller phone is required'],
            trim: true
        },
        studentId: {
            type: String,
            trim: true
        },
        department: {
            type: String,
            trim: true
        },
        year: {
            type: String,
            trim: true
        }
    },

    pricing: {
        type: {
            type: String,
            required: [true, 'Pricing type is required'],
            enum: ['fixed', 'auction', 'negotiable']
        },
        startingPrice: {
            type: Number,
            required: [true, 'Starting price is required'],
            min: [1, 'Price must be at least 1']
        },
        buyNowPrice: {
            type: Number,
            min: 1
        },
        currentBid: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'BDT',
            enum: ['BDT', 'USD']
        }
    },

    auction: {
        startDate: {
            type: Date,
            default: Date.now
        },
        endDate: {
            type: Date,
            required: function() {
                return this.parent().pricing.type === 'auction';
            },
            validate: {
                validator: function(value) {
                    if (this.parent().pricing.type === 'auction') {
                        return value > this.startDate;
                    }
                    return true;
                },
                message: 'Auction end date must be after start date'
            }
        },
        bidIncrement: {
            type: Number,
            default: 10,
            min: 1
        }
    },

    images: [{
        url: {
            type: String,
            required: true
        },
        filename: String,
        caption: String
    }],

    specifications: [{
        key: String,
        value: String
    }],

    bids: [{
        bidder: {
            name: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            },
            phone: {
                type: String,
                required: true,
                trim: true
            }
        },
        amount: {
            type: Number,
            required: true,
            min: 1
        },
        bidTime: {
            type: Date,
            default: Date.now
        },
        isAutomatic: {
            type: Boolean,
            default: false
        },
        maxBid: {
            type: Number // For automatic bidding
        }
    }],

    watchers: [{
        name: String,
        email: String,
        watchDate: {
            type: Date,
            default: Date.now
        }
    }],

    location: {
        campus: {
            type: String,
            required: [true, 'Campus location is required'],
            trim: true
        },
        building: {
            type: String,
            trim: true
        },
        room: {
            type: String,
            trim: true
        },
        meetingPreference: {
            type: String,
            enum: ['campus_only', 'flexible', 'delivery_available'],
            default: 'campus_only'
        }
    },

    status: {
        type: String,
        enum: ['draft', 'active', 'sold', 'expired', 'withdrawn'],
        default: 'active'
    },

    tags: [{
        type: String,
        trim: true
    }],

    views: {
        type: Number,
        default: 0
    },

    questions: [{
        questioner: {
            name: String,
            email: String
        },
        question: String,
        answer: String,
        questionDate: {
            type: Date,
            default: Date.now
        },
        answerDate: Date
    }],

    transaction: {
        buyer: {
            name: String,
            email: String,
            phone: String
        },
        finalPrice: Number,
        paymentMethod: {
            type: String,
            enum: ['cash', 'bkash', 'nagad', 'bank_transfer']
        },
        transactionDate: Date,
        deliveryStatus: {
            type: String,
            enum: ['pending', 'in_progress', 'completed'],
            default: 'pending'
        },
        feedback: {
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            comment: String,
            date: Date
        }
    }
}, {
    timestamps: true
});

// Virtual for time remaining (for auctions)
auctionItemSchema.virtual('timeRemaining').get(function() {
    if (this.pricing.type !== 'auction' || !this.auction.endDate) return null;
    
    const now = new Date();
    const endDate = new Date(this.auction.endDate);
    const diffTime = endDate - now;
    
    if (diffTime <= 0) return { expired: true };
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes, expired: false };
});

// Virtual for highest bidder
auctionItemSchema.virtual('highestBidder').get(function() {
    if (this.bids.length === 0) return null;
    
    const sortedBids = this.bids.sort((a, b) => b.amount - a.amount);
    return sortedBids[0];
});

// Index for better search performance
auctionItemSchema.index({ title: 'text', description: 'text' });
auctionItemSchema.index({ category: 1, 'pricing.type': 1, status: 1 });
auctionItemSchema.index({ 'pricing.currentBid': 1 });
auctionItemSchema.index({ 'auction.endDate': 1 });
auctionItemSchema.index({ createdAt: -1 });

export const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);
