const express = require('express');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const clubRoutes = require('./clubRoutes');
const communityRoutes = require('./communityRoutes');

const router = express.Router();

// Import all route modules

// Define base paths for each route module
router.use('/api/users', userRoutes);
router.use('/api/events', eventRoutes);
router.use('/api/clubs', clubRoutes);
router.use('/api/communities', communityRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Default route
router.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to SportsSphere API',
        version: '1.0.0'
    });
});

// 404 handler for undefined routes
router.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;