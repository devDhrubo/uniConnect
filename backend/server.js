import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import auctionRoutes from './routes/auctionRoutes.js';
import bloodRoutes from './routes/bloodRoutes.js';
import bulletinRoutes from './routes/bulletinRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import lostFoundRoutes from './routes/lostFoundRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure environment variables with explicit path
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug environment variables
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
});

// Routes
app.use('/api/blood', bloodRoutes);
app.use('/api/lost-found', lostFoundRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auction', auctionRoutes);
app.use('/api/bulletin', bulletinRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'UniConnect Backend Server is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('❌ Server Error:', error);
    
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Error',
            errors: Object.values(error.errors).map(err => err.message)
        });
    }
    
    if (error.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid ID format'
        });
    }
    
    res.status(error.status || 500).json({
        status: 'error',
        message: error.message || 'Internal Server Error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('📴 SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('📴 SIGINT received, shutting down gracefully');
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
    console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL}`);
});
