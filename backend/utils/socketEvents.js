const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/postgres/User');

let io;

// Initialize Socket.IO
const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // Middleware for authentication
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);
            
            if (!user) {
                return next(new Error('User not found'));
            }

            socket.userId = user.id;
            socket.user = user;
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`User ${socket.user.username} connected`);

        // Join user to their personal room
        socket.join(`user_${socket.userId}`);

        // Handle chat events
        socket.on('join_chat', (chatId) => {
            socket.join(`chat_${chatId}`);
        });

        socket.on('leave_chat', (chatId) => {
            socket.leave(`chat_${chatId}`);
        });

        socket.on('send_message', (data) => {
            socket.to(`chat_${data.chatId}`).emit('new_message', data);
        });

        // Handle notification events
        socket.on('mark_notification_read', (notificationId) => {
            socket.to(`user_${socket.userId}`).emit('notification_read', notificationId);
        });

        // Handle live event updates
        socket.on('join_event', (eventId) => {
            socket.join(`event_${eventId}`);
        });

        socket.on('leave_event', (eventId) => {
            socket.leave(`event_${eventId}`);
        });

        // Handle user status updates
        socket.on('user_status_update', (status) => {
            socket.broadcast.emit('user_status_changed', {
                userId: socket.userId,
                status: status
            });
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.user.username} disconnected`);
        });
    });

    return io;
};

// Emit events to specific users or rooms
const emitToUser = (userId, event, data) => {
    if (io) {
        io.to(`user_${userId}`).emit(event, data);
    }
};

const emitToChat = (chatId, event, data) => {
    if (io) {
        io.to(`chat_${chatId}`).emit(event, data);
    }
};

const emitToEvent = (eventId, event, data) => {
    if (io) {
        io.to(`event_${eventId}`).emit(event, data);
    }
};

const emitToAll = (event, data) => {
    if (io) {
        io.emit(event, data);
    }
};

module.exports = {
    initializeSocket,
    emitToUser,
    emitToChat,
    emitToEvent,
    emitToAll
};