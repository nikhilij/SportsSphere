const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: String, // UUID of the user from PostgreSQL
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: String, // UUIDs of users who liked the comment
    },
  ],
});

const postSchema = new mongoose.Schema({
  author: {
    type: String, // UUID of the user from PostgreSQL
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: String, // UUIDs of users who liked the post
    },
  ],
  comments: [commentSchema],
  tags: [
    {
      type: String,
    },
  ],
  attachments: [
    {
      url: String,
      type: String, // image, document, etc.
      name: String,
    },
  ],
});

const forumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "general",
  },
  moderators: [
    {
      type: String, // UUIDs of users who moderate the forum
    },
  ],
  posts: [postSchema],
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

forumSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

forumSchema.index({ name: 1 });
forumSchema.index({ category: 1 });

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
