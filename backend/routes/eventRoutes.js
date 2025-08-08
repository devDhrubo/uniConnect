import express from 'express';
import { Event } from '../models/Event.js';

const router = express.Router();

// Create new event
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();

        res.status(201).json({
            status: 'success',
            message: 'Event created successfully',
            data: { event }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            type, 
            status, 
            upcoming = 'true',
            search, 
            page = 1, 
            limit = 10,
            sortBy = 'dateTime.start',
            sortOrder = 'asc'
        } = req.query;
        
        const filter = {};
        if (category) filter.category = category;
        if (type) filter.type = type;
        if (status) filter.status = status;
        
        // Filter for upcoming events
        if (upcoming === 'true') {
            filter['dateTime.start'] = { $gte: new Date() };
        }
        
        // Text search
        if (search) {
            filter.$text = { $search: search };
        }

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const events = await Event.find(filter)
            .select('-__v -registrations.participantEmail -registrations.participantPhone')
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Event.countDocuments(filter);

        // Add virtual fields
        const eventsWithVirtuals = events.map(event => ({
            ...event.toObject(),
            registeredCount: event.registeredCount,
            availableSpots: event.availableSpots
        }));

        res.json({
            status: 'success',
            data: {
                events: eventsWithVirtuals,
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

// Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .select('-registrations.participantEmail -registrations.participantPhone');
        
        if (!event) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found'
            });
        }

        // Increment views
        event.views += 1;
        await event.save();

        const eventWithVirtuals = {
            ...event.toObject(),
            registeredCount: event.registeredCount,
            availableSpots: event.availableSpots
        };

        res.json({
            status: 'success',
            data: { event: eventWithVirtuals }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Register for event
router.post('/:id/register', async (req, res) => {
    try {
        const {
            participantName,
            participantEmail,
            participantPhone,
            studentId,
            department,
            year
        } = req.body;

        if (!participantName || !participantEmail || !participantPhone) {
            return res.status(400).json({
                status: 'error',
                message: 'Name, email, and phone are required'
            });
        }

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found'
            });
        }

        // Check if registration is required and open
        if (event.registration.required && event.registration.deadline && 
            new Date() > event.registration.deadline) {
            return res.status(400).json({
                status: 'error',
                message: 'Registration deadline has passed'
            });
        }

        // Check if already registered
        const existingRegistration = event.registrations.find(
            reg => reg.participantEmail.toLowerCase() === participantEmail.toLowerCase()
        );

        if (existingRegistration) {
            return res.status(400).json({
                status: 'error',
                message: 'You are already registered for this event'
            });
        }

        // Check capacity
        if (event.registration.maxParticipants && 
            event.registeredCount >= event.registration.maxParticipants) {
            return res.status(400).json({
                status: 'error',
                message: 'Event is full'
            });
        }

        // Add registration
        const registration = {
            participantName,
            participantEmail: participantEmail.toLowerCase(),
            participantPhone,
            studentId: studentId || '',
            department: department || '',
            year: year || '',
            registrationDate: new Date(),
            status: 'confirmed',
            paymentStatus: event.registration.fee.amount > 0 ? 'pending' : 'free'
        };

        event.registrations.push(registration);
        await event.save();

        // Don't send back sensitive info
        const registrationResponse = {
            ...registration,
            participantEmail: undefined,
            participantPhone: undefined
        };

        res.json({
            status: 'success',
            message: 'Registration successful',
            data: { 
                registration: registrationResponse,
                event: {
                    title: event.title,
                    dateTime: event.dateTime,
                    venue: event.venue
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

// Cancel registration
router.delete('/:id/register', async (req, res) => {
    try {
        const { participantEmail } = req.body;

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found'
            });
        }

        const registrationIndex = event.registrations.findIndex(
            reg => reg.participantEmail.toLowerCase() === participantEmail.toLowerCase()
        );

        if (registrationIndex === -1) {
            return res.status(404).json({
                status: 'error',
                message: 'Registration not found'
            });
        }

        event.registrations.splice(registrationIndex, 1);
        await event.save();

        res.json({
            status: 'success',
            message: 'Registration cancelled successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Update event
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Event updated successfully',
            data: { event }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Add feedback
router.post('/:id/feedback', async (req, res) => {
    try {
        const { participantName, rating, comment } = req.body;

        if (!participantName || !rating) {
            return res.status(400).json({
                status: 'error',
                message: 'Participant name and rating are required'
            });
        }

        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({
                status: 'error',
                message: 'Event not found'
            });
        }

        const feedback = {
            participantName,
            rating: parseInt(rating),
            comment: comment || '',
            date: new Date()
        };

        event.feedback.push(feedback);
        await event.save();

        res.json({
            status: 'success',
            message: 'Feedback submitted successfully',
            data: { feedback }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get event statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();
        const upcomingEvents = await Event.countDocuments({
            'dateTime.start': { $gte: new Date() }
        });
        const ongoingEvents = await Event.countDocuments({
            'dateTime.start': { $lte: new Date() },
            'dateTime.end': { $gte: new Date() }
        });
        
        // Total registrations
        const totalRegistrations = await Event.aggregate([
            { $project: { registrationCount: { $size: '$registrations' } } },
            { $group: { _id: null, total: { $sum: '$registrationCount' } } }
        ]);

        // Category distribution
        const categoryStats = await Event.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Popular events (by registrations)
        const popularEvents = await Event.find({
            'dateTime.start': { $gte: new Date() }
        })
        .sort({ 'registrations.length': -1 })
        .limit(5)
        .select('title dateTime.start category registrations venue.name');

        res.json({
            status: 'success',
            data: {
                totalEvents,
                upcomingEvents,
                ongoingEvents,
                totalRegistrations: totalRegistrations[0]?.total || 0,
                categoryDistribution: categoryStats,
                popularEvents: popularEvents.map(event => ({
                    ...event.toObject(),
                    registrationCount: event.registrations.length
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
