const express = require("express");
const eventController = require("../controllers/eventController");
const jwtAuth = require("../middlewares/jwtAuth");
const roleBasedAccess = require("../middlewares/roleBasedAccess");
const { body } = require("express-validator");
const validateInput = require("../middlewares/validateInput");
const { rateLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// Validation rules for events
const eventValidation = [
    body('title').notEmpty().withMessage('Event title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('startDate').isISO8601().withMessage('Start date must be valid'),
    body('endDate').isISO8601().withMessage('End date must be valid')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('End date must be after start date');
            }
            return true;
        }),
    body('location').notEmpty().withMessage('Location is required'),
    body('sportType').notEmpty().withMessage('Sport type is required'),
    body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be a positive number'),
    body('isPublic').isBoolean().withMessage('isPublic must be a boolean value')
];

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/sport/:sportType', eventController.getEventsBySportType);
router.get('/upcoming', eventController.getUpcomingEvents);

// Protected routes
router.post('/', 
    jwtAuth, 
    roleBasedAccess(['admin', 'coach', 'organizer']), 
    validateInput(eventValidation), 
    eventController.createEvent
);

router.put('/:id', 
    jwtAuth, 
    roleBasedAccess(['admin', 'coach', 'organizer']), 
    validateInput(eventValidation), 
    eventController.updateEvent
);

router.delete('/:id', 
    jwtAuth, 
    roleBasedAccess(['admin', 'organizer']), 
    eventController.deleteEvent
);

// Participant management
router.post('/:id/register', 
    jwtAuth, 
    eventController.registerForEvent
);

router.post('/:id/unregister', 
    jwtAuth, 
    eventController.unregisterFromEvent
);

router.get('/:id/participants', 
    jwtAuth, 
    eventController.getEventParticipants
);

// Comments and feedback
router.post('/:id/comments', 
    jwtAuth, 
    rateLimiter({ windowMs: 15 * 60 * 1000, max: 10 }), 
    eventController.addComment
);

router.get('/:id/comments', 
    eventController.getEventComments
);

module.exports = router;