import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Donation type is required'],
        enum: ['flood_relief', 'medical_aid']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [50, 'Description must be at least 50 characters']
    },
    
    // For Medical Aid
    patientInfo: {
        name: {
            type: String,
            required: function() { return this.type === 'medical_aid'; },
            trim: true
        },
        age: {
            type: Number,
            min: 0,
            max: 120
        },
        condition: {
            type: String,
            trim: true
        },
        hospital: {
            type: String,
            trim: true
        },
        treatmentCost: {
            type: Number,
            min: 0
        }
    },

    // For Flood Relief
    floodInfo: {
        affectedArea: {
            type: String,
            required: function() { return this.type === 'flood_relief'; },
            trim: true
        },
        familiesAffected: {
            type: Number,
            min: 0
        },
        urgencyLevel: {
            type: String,
            enum: ['low', 'medium', 'high', 'critical'],
            default: 'medium'
        }
    },

    fundraisingGoal: {
        type: Number,
        required: [true, 'Fundraising goal is required'],
        min: [100, 'Minimum goal should be 100']
    },
    currentAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    currency: {
        type: String,
        default: 'BDT',
        enum: ['BDT', 'USD', 'EUR']
    },
    
    organizer: {
        name: {
            type: String,
            required: [true, 'Organizer name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Organizer email is required'],
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: [true, 'Organizer phone is required'],
            trim: true
        },
        organization: {
            type: String,
            trim: true
        }
    },

    documents: [{
        type: {
            type: String,
            enum: ['medical_report', 'certificate', 'photo', 'other']
        },
        url: String,
        filename: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],

    donations: [{
        donorName: {
            type: String,
            required: true,
            trim: true
        },
        donorEmail: {
            type: String,
            trim: true,
            lowercase: true
        },
        amount: {
            type: Number,
            required: true,
            min: 1
        },
        message: {
            type: String,
            trim: true
        },
        isAnonymous: {
            type: Boolean,
            default: false
        },
        donationDate: {
            type: Date,
            default: Date.now
        },
        paymentMethod: {
            type: String,
            enum: ['bkash', 'nagad', 'rocket', 'bank_transfer', 'cash'],
            default: 'bkash'
        },
        transactionId: String,
        verified: {
            type: Boolean,
            default: false
        }
    }],

    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled', 'paused'],
        default: 'active'
    },
    deadline: {
        type: Date
    },
    tags: [{
        type: String,
        trim: true
    }],
    views: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    updates: [{
        title: String,
        content: String,
        images: [{
            url: String,
            filename: String
        }],
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Virtual for completion percentage
donationSchema.virtual('completionPercentage').get(function() {
    return Math.min(100, Math.round((this.currentAmount / this.fundraisingGoal) * 100));
});

// Virtual for days remaining
donationSchema.virtual('daysRemaining').get(function() {
    if (!this.deadline) return null;
    const now = new Date();
    const deadline = new Date(this.deadline);
    const diffTime = deadline - now;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
});

// Index for better search performance
donationSchema.index({ title: 'text', description: 'text' });
donationSchema.index({ type: 1, status: 1 });
donationSchema.index({ createdAt: -1 });

export const Donation = mongoose.model('Donation', donationSchema);
