import mongoose from 'mongoose';

const lostFoundSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: ['lost', 'found']
    },
    itemName: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true,
        minlength: [2, 'Item name must be at least 2 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'Electronics',
            'Clothing',
            'Accessories',
            'Books',
            'Documents',
            'Keys',
            'Bags',
            'Sports Equipment',
            'Jewelry',
            'Other'
        ]
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters']
    },
    location: {
        found: {
            type: String,
            required: function() { return this.type === 'found'; },
            trim: true
        },
        lost: {
            type: String,
            required: function() { return this.type === 'lost'; },
            trim: true
        }
    },
    dateTime: {
        type: Date,
        required: [true, 'Date and time is required']
    },
    images: [{
        url: String,
        filename: String
    }],
    contactInfo: {
        name: {
            type: String,
            required: [true, 'Contact name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true
        }
    },
    status: {
        type: String,
        enum: ['active', 'resolved', 'expired'],
        default: 'active'
    },
    reward: {
        offered: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
            min: 0
        },
        description: String
    },
    tags: [{
        type: String,
        trim: true
    }],
    views: {
        type: Number,
        default: 0
    },
    matches: [{
        matchedWith: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LostFound'
        },
        similarity: Number,
        matchDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['potential', 'verified', 'rejected'],
            default: 'potential'
        }
    }]
}, {
    timestamps: true
});

// Index for better search performance
lostFoundSchema.index({ itemName: 'text', description: 'text', 'contactInfo.name': 'text' });
lostFoundSchema.index({ category: 1, type: 1, status: 1 });
lostFoundSchema.index({ dateTime: -1 });

export const LostFound = mongoose.model('LostFound', lostFoundSchema);
