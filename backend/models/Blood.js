import mongoose from 'mongoose';

const bloodDonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    lastDonation: {
        type: Date,
        default: null
    },
    medicalConditions: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['available', 'not_available', 'inactive'],
        default: 'available'
    },
    totalDonations: {
        type: Number,
        default: 0
    },
    badges: [{
        type: String
    }],
    location: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const bloodRequestSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    unitsNeeded: {
        type: Number,
        required: [true, 'Units needed is required'],
        min: [1, 'At least 1 unit is required'],
        max: [10, 'Maximum 10 units allowed']
    },
    urgency: {
        type: String,
        enum: ['normal', 'urgent', 'critical'],
        default: 'normal'
    },
    hospital: {
        type: String,
        required: [true, 'Hospital name is required'],
        trim: true
    },
    contact: {
        type: String,
        required: [true, 'Contact number is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    requesterName: {
        type: String,
        required: [true, 'Requester name is required'],
        trim: true
    },
    requesterEmail: {
        type: String,
        required: [true, 'Requester email is required'],
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: ['active', 'fulfilled', 'cancelled'],
        default: 'active'
    },
    responses: [{
        donorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BloodDonor'
        },
        donorName: String,
        donorPhone: String,
        responseDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['interested', 'confirmed', 'completed'],
            default: 'interested'
        }
    }]
}, {
    timestamps: true
});

export const BloodDonor = mongoose.model('BloodDonor', bloodDonorSchema);
export const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);
