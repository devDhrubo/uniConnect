import mongoose from 'mongoose';

const bulletinSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Bulletin title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Bulletin content is required'],
        trim: true,
        minlength: [20, 'Content must be at least 20 characters']
    },
    category: {
        type: String,
        required: [true, 'Bulletin category is required'],
        enum: [
            'Academic',
            'Administrative',
            'Events',
            'Scholarships',
            'Job Opportunities',
            'Admission',
            'Examination',
            'Emergency',
            'General',
            'Sports',
            'Cultural',
            'Other'
        ]
    },
    priority: {
        type: String,
        required: [true, 'Priority level is required'],
        enum: ['low', 'normal', 'high', 'urgent'],
        default: 'normal'
    },
    type: {
        type: String,
        required: [true, 'Bulletin type is required'],
        enum: ['notice', 'announcement', 'circular', 'news', 'alert']
    },
    
    publisher: {
        name: {
            type: String,
            required: [true, 'Publisher name is required'],
            trim: true
        },
        designation: {
            type: String,
            required: [true, 'Publisher designation is required'],
            trim: true
        },
        department: {
            type: String,
            required: [true, 'Department is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Publisher email is required'],
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            trim: true
        }
    },

    visibility: {
        scope: {
            type: String,
            required: [true, 'Visibility scope is required'],
            enum: ['all_students', 'specific_departments', 'specific_years', 'faculty', 'staff'],
            default: 'all_students'
        },
        departments: [{
            type: String,
            trim: true
        }],
        years: [{
            type: String,
            enum: ['1st', '2nd', '3rd', '4th', 'masters', 'phd']
        }]
    },

    schedule: {
        publishDate: {
            type: Date,
            default: Date.now
        },
        expiryDate: {
            type: Date,
            validate: {
                validator: function(value) {
                    if (value) {
                        return value > this.schedule.publishDate;
                    }
                    return true;
                },
                message: 'Expiry date must be after publish date'
            }
        },
        isScheduled: {
            type: Boolean,
            default: false
        }
    },

    attachments: [{
        filename: {
            type: String,
            required: true
        },
        originalName: String,
        url: String,
        fileSize: Number,
        mimeType: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],

    images: [{
        url: String,
        filename: String,
        caption: String
    }],

    tags: [{
        type: String,
        trim: true
    }],

    status: {
        type: String,
        enum: ['draft', 'published', 'archived', 'expired'],
        default: 'draft'
    },

    interactions: {
        views: {
            type: Number,
            default: 0
        },
        downloads: {
            type: Number,
            default: 0
        },
        shares: {
            type: Number,
            default: 0
        }
    },

    comments: [{
        commenterName: {
            type: String,
            required: true,
            trim: true
        },
        commenterEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        comment: {
            type: String,
            required: true,
            trim: true
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        isAnonymous: {
            type: Boolean,
            default: false
        }
    }],

    acknowledgments: [{
        acknowledgerName: String,
        acknowledgerEmail: String,
        acknowledgerDepartment: String,
        acknowledgeDate: {
            type: Date,
            default: Date.now
        }
    }],

    relatedBulletins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bulletin'
    }],

    isActive: {
        type: Boolean,
        default: true
    },

    metadata: {
        lastModified: {
            type: Date,
            default: Date.now
        },
        modifiedBy: String,
        version: {
            type: Number,
            default: 1
        }
    }
}, {
    timestamps: true
});

// Virtual for active status based on expiry
bulletinSchema.virtual('isExpired').get(function() {
    if (!this.schedule.expiryDate) return false;
    return new Date() > this.schedule.expiryDate;
});

// Virtual for days until expiry
bulletinSchema.virtual('daysUntilExpiry').get(function() {
    if (!this.schedule.expiryDate) return null;
    const now = new Date();
    const expiry = new Date(this.schedule.expiryDate);
    const diffTime = expiry - now;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
});

// Pre-save middleware to update metadata
bulletinSchema.pre('save', function(next) {
    if (this.isModified() && !this.isNew) {
        this.metadata.lastModified = new Date();
        this.metadata.version += 1;
    }
    next();
});

// Index for better search performance
bulletinSchema.index({ title: 'text', content: 'text' });
bulletinSchema.index({ category: 1, priority: 1, status: 1 });
bulletinSchema.index({ 'schedule.publishDate': -1 });
bulletinSchema.index({ 'schedule.expiryDate': 1 });
bulletinSchema.index({ 'publisher.department': 1 });

export const Bulletin = mongoose.model('Bulletin', bulletinSchema);
