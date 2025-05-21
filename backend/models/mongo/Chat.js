const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // UUID of the user from PostgreSQL
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  readBy: [
    {
      type: String, // UUIDs of users who have read the message
    },
  ],
  attachments: [
    {
      url: String,
      type: String, // image, document, etc.
      name: String,
    },
  ],
  isSystemMessage: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["direct", "group"],
    required: true,
  },
  participants: [
    {
      userId: {
        type: String, // UUID of the user from PostgreSQL
        required: true,
      },
      role: {
        type: String,
        enum: ["member", "admin"],
        default: "member",
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
      lastSeen: {
        type: Date,
        default: null,
      },
    },
  ],
  name: {
    type: String, // Only for group chats
    default: null,
  },
  avatar: {
    type: String, // URL to avatar image (for group chats)
    default: null,
  },
  messages: [messageSchema],
  lastMessage: {
    content: String,
    sender: String,
    timestamp: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Update the updatedAt timestamp on save
chatSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
chatSchema.index({ "participants.userId": 1 });
chatSchema.index({ updatedAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
