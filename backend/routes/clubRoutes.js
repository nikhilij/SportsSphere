const express = require('express');
const jwtAuth = require('../middlewares/jwtAuth');
const roleBasedAccess = require('../middlewares/roleBasedAccess');
const validateInput = require('../middlewares/inputValidation');
const { body } = require('express-validator');
const clubController = require('../controllers/clubController');

const router = express.Router();

// Import controller (assuming you'll create this file)

// Validation schemas
const clubValidation = [
    body('name').notEmpty().withMessage('Club name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('sportType').notEmpty().withMessage('Sport type is required'),
    body('location').optional(),
    body('maxMembers').optional().isInt({ min: 1 }).withMessage('Max members must be a positive number')
];

// Public routes
router.get('/', clubController.getAllClubs);
router.get('/:id', clubController.getClubById);

// Protected routes
router.post('/', 
    jwtAuth, 
    roleBasedAccess(['admin', 'coach']), 
    validateInput(clubValidation), 
    clubController.createClub
);

router.put('/:id', 
    jwtAuth, 
    roleBasedAccess(['admin', 'coach']), 
    validateInput(clubValidation), 
    clubController.updateClub
);

router.delete('/:id', 
    jwtAuth, 
    roleBasedAccess(['admin']), 
    clubController.deleteClub
);

// Member management
router.post('/:id/join', 
    jwtAuth, 
    clubController.joinClub
);

router.post('/:id/leave', 
    jwtAuth, 
    clubController.leaveClub
);

router.get('/:id/members', 
    jwtAuth, 
    clubController.getClubMembers
);

module.exports = router;