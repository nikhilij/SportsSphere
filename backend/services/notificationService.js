const Notification = require('../models/Notification');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

class NotificationService {
    /**
     * Create a new notification
     * @param {Object} notificationData - Data for the new notification
     * @returns {Promise<Object>} The created notification
     */
    async createNotification(notificationData) {
        try {
            const { recipient, type, content, relatedId, sender } = notificationData;
            
            if (!recipient || !type || !content) {
                throw new ErrorResponse('Recipient, type, and content are required fields', 400);
            }
            
            const notification = new Notification({
                recipient,
                type,
                content,
                relatedId,
                sender,
                read: false,
                createdAt: new Date()
            });
            
            await notification.save();
            return notification;
        } catch (error) {
            if (error instanceof ErrorResponse) throw error;
            throw new ErrorResponse(`Error creating notification: ${error.message}`, 500);
        }
    }
    
    /**
     * Get notifications for a specific user
     * @param {string} userId - The user's ID
     * @param {Object} queryParams - Query parameters for pagination and filtering
     * @returns {Promise<Object>} Notifications with pagination info
     */
    async getUserNotifications(userId, queryParams = {}) {
        try {
            const { 
                page = 1, 
                limit = 20,
                read = null,
                type = null
            } = queryParams;
            
            const query = { recipient: userId };
            
            if (read !== null) {
                query.read = read === 'true';
            }
            
            if (type) {
                query.type = type;
            }
            
            const skip = (parseInt(page) - 1) * parseInt(limit);
            
            const notifications = await Notification.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .populate('sender', 'name profileImage')
                .populate('recipient', 'name profileImage');
                
            const total = await Notification.countDocuments(query);
            
            return {
                notifications,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(total / parseInt(limit))
                }
            };
        } catch (error) {
            throw new ErrorResponse(`Error retrieving notifications: ${error.message}`, 500);
        }
    }
    
    /**
     * Mark a notification as read
     * @param {string} notificationId - The notification ID
     * @param {string} userId - The user's ID (for authorization)
     * @returns {Promise<Object>} The updated notification
     */
    async markAsRead(notificationId, userId) {
        try {
            const notification = await Notification.findById(notificationId);
            
            if (!notification) {
                throw new ErrorResponse('Notification not found', 404);
            }
            
            // Ensure the user owns this notification
            if (notification.recipient.toString() !== userId) {
                throw new ErrorResponse('Not authorized to update this notification', 403);
            }
            
            notification.read = true;
            await notification.save();
            
            return notification;
        } catch (error) {
            if (error instanceof ErrorResponse) throw error;
            throw new ErrorResponse(`Error marking notification as read: ${error.message}`, 500);
        }
    }
    
    /**
     * Mark all notifications as read for a user
     * @param {string} userId - The user's ID
     * @returns {Promise<Object>} The result of the update operation
     */
    async markAllAsRead(userId) {
        try {
            const result = await Notification.updateMany(
                { recipient: userId, read: false },
                { $set: { read: true } }
            );
            
            return { success: true, modifiedCount: result.modifiedCount };
        } catch (error) {
            throw new ErrorResponse(`Error marking all notifications as read: ${error.message}`, 500);
        }
    }
    
    /**
     * Delete a notification
     * @param {string} notificationId - The notification ID
     * @param {string} userId - The user's ID (for authorization)
     * @returns {Promise<Object>} Success message
     */
    async deleteNotification(notificationId, userId) {
        try {
            const notification = await Notification.findById(notificationId);
            
            if (!notification) {
                throw new ErrorResponse('Notification not found', 404);
            }
            
            // Ensure the user owns this notification
            if (notification.recipient.toString() !== userId) {
                throw new ErrorResponse('Not authorized to delete this notification', 403);
            }
            
            await Notification.findByIdAndDelete(notificationId);
            
            return { success: true, message: 'Notification deleted successfully' };
        } catch (error) {
            if (error instanceof ErrorResponse) throw error;
            throw new ErrorResponse(`Error deleting notification: ${error.message}`, 500);
        }
    }
    
    /**
     * Get unread notification count for a user
     * @param {string} userId - The user's ID
     * @returns {Promise<Object>} Count of unread notifications
     */
    async getUnreadCount(userId) {
        try {
            const count = await Notification.countDocuments({ 
                recipient: userId,
                read: false
            });
            
            return { count };
        } catch (error) {
            throw new ErrorResponse(`Error getting unread notification count: ${error.message}`, 500);
        }
    }
}

module.exports = new NotificationService();