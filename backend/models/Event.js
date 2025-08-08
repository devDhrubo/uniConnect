import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        trim: true,
        minlength: [20, 'Description must be at least 20 characters']
    },
    category: {
        type: String,
        required: [true, 'Event category is required'],
        enum: [
            'Academic',
            'Cultural',
            'Sports',
            'Technology',
            'Workshop',
            'Seminar',
            'Competition',
            'Social',
            'Career',
            'Health',
            'Other'
        ]
    },
    type: {
        type: String,
        required: [true, 'Event type is required'],
        enum: ['online', 'offline', 'hybrid']
    },
    
    dateTime: {
        start: {
            type: Date,
            required: [true, 'Start date and time is required']
        },
        end: {
            type: Date,
            required: [true, 'End date and time is required'],
            validate: {
                validator: function(value) {
                    return value > this.dateTime.start;
                },
                message: 'End time must be after start time'
            }
        }
    },

    venue: {
        name: {
            type: String,
            required: function() { return this.type === 'offline' || this.type === 'hybrid'; },
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        capacity: {
            type: Number,
            min: 1
        },
        onlineLink: {
            type: String,
            required: function() { return this.type === 'online' || this.type === 'hybrid'; },
            trim: true
        }
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
        },
        department: {
            type: String,
            trim: true
        }
    },

    registration: {
        required: {
            type: Boolean,
            default: false
        },
        deadline: {
            type: Date
        },
        fee: {
            amount: {
                type: Number,
                min: 0,
                default: 0
            },
            currency: {
                type: String,
                default: 'BDT',
                enum: ['BDT', 'USD']
            }
        },
        maxParticipants: {
            type: Number,
            min: 1
        },
        requirements: [String]
    },

    speakers: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            trim: true
        },
        bio: {
            type: String,
            trim: true
        },
        image: {
            url: String,
            filename: String
        },
        social: {
            linkedin: String,
            twitter: String,
            website: String
        }
    }],

    agenda: [{
        time: String,
        title: String,
        speaker: String,
        duration: Number // in minutes
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

    registrations: [{
        participantName: {
            type: String,
            required: true,
            trim: true
        },
        participantEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        participantPhone: {
            type: String,
            required: true,
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
        },
        registrationDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['confirmed', 'pending', 'cancelled'],
            default: 'confirmed'
        },
        attended: {
            type: Boolean,
            default: false
        },
        paymentStatus: {
            type: String,
            enum: ['paid', 'pending', 'free'],
            default: function() {
                return this.registration.fee.amount > 0 ? 'pending' : 'free';
            }
        }
    }],

    status: {
        type: String,
        enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
        default: 'draft'
    },

    visibility: {
        type: String,
        enum: ['public', 'private', 'department'],
        default: 'public'
    },

    views: {
        type: Number,
        default: 0
    },
    
    feedback: [{
        participantName: String,
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Virtual for registered count
eventSchema.virtual('registeredCount').get(function() {
    return this.registrations.filter(reg => reg.status === 'confirmed').length;
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
    if (!this.registration.maxParticipants) return null;
    return Math.max(0, this.registration.maxParticipants - this.registeredCount);
});

// Index for better search performance
eventSchema.index({ title: 'text', description: 'text' });
eventSchema.index({ category: 1, type: 1, status: 1 });
eventSchema.index({ 'dateTime.start': 1 });
eventSchema.index({ createdAt: -1 });

export const Event = mongoose.model('Event', eventSchema);
