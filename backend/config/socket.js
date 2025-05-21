const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('../models/User');

let io;

// Initialize socket.io with the HTTP server
const initSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: process.env.NODE_ENV === 'production' 
                ? process.env.FRONTEND_URL 
                : 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    // Socket.io authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            
            if (!token) {
                return next(new Error('Authentication error'));
            }

            const decoded = jwt.verify(token, config.jwtSecret);
            const user = await User.findById(decoded.id).select('-password');
            
            if (!user) {
                return next(new Error('User not found'));
            }
            
            socket.user = user;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    // Connection handler
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user._id}`);
        
        // Join a room based on user ID
        socket.join(`user_${socket.user._id}`);
        
        // Join rooms for teams or events the user follows
        if (socket.user.followingTeams && socket.user.followingTeams.length) {
            socket.user.followingTeams.forEach(teamId => {
                socket.join(`team_${teamId}`);
            });
        }
        
        // Handle events
        socket.on('join-event', (eventId) => {
            socket.join(`event_${eventId}`);
            console.log(`${socket.user._id} joined event: ${eventId}`);
        });
        
        socket.on('leave-event', (eventId) => {
            socket.leave(`event_${eventId}`);
            console.log(`${socket.user._id} left event: ${eventId}`);
        });
        
        socket.on('new-comment', (data) => {
            socket.to(`event_${data.eventId}`).emit('comment-received', {
                comment: data.comment,
                user: {
                    _id: socket.user._id,
                    name: socket.user.name,
                    avatar: socket.user.avatar
                },
                eventId: data.eventId,
                createdAt: new Date()
            });
        });
        
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user._id}`);
        });
    });

    return io;
};

// Get socket.io instance
const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = {
    initSocket,
    getIO
};