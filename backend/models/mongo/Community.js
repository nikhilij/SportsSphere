const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
   },
   description: {
      type: String,
      required: true,
      maxlength: 1000,
   },
   category: {
      type: String,
      required: true,
      enum: [
         "sports",
         "fitness",
         "basketball",
         "football",
         "soccer",
         "tennis",
         "swimming",
         "running",
         "cycling",
         "yoga",
         "general",
         "other",
      ],
      default: "general",
   },
   creator: {
      type: String, // UUID of the user from PostgreSQL
      required: true,
   },
   moderators: [
      {
         type: String, // UUIDs of users who moderate the community
      },
   ],
   members: [
      {
         type: String, // UUIDs of community members
      },
   ],
   location: {
      type: String,
      maxlength: 200,
   },
   rules: [
      {
         type: String,
         maxlength: 500,
      },
   ],
   avatar: {
      type: String, // URL to community avatar image
      default: null,
   },
   coverImage: {
      type: String, // URL to community cover image
      default: null,
   },
   tags: [
      {
         type: String,
         maxlength: 50,
      },
   ],
   isPrivate: {
      type: Boolean,
      default: false,
   },
   isActive: {
      type: Boolean,
      default: true,
   },
   memberCount: {
      type: Number,
      default: 0,
   },
   postCount: {
      type: Number,
      default: 0,
   },
   socialLinks: {
      website: { type: String, default: null },
      facebook: { type: String, default: null },
      twitter: { type: String, default: null },
      instagram: { type: String, default: null },
      linkedin: { type: String, default: null },
   },
   settings: {
      allowGuestPosts: { type: Boolean, default: false },
      moderationRequired: { type: Boolean, default: true },
      allowMemberInvites: { type: Boolean, default: true },
   },
   statistics: {
      weeklyActiveMembers: { type: Number, default: 0 },
      monthlyActiveMembers: { type: Number, default: 0 },
      totalPosts: { type: Number, default: 0 },
      totalComments: { type: Number, default: 0 },
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

// Update the updatedAt timestamp on save
communitySchema.pre("save", function (next) {
   this.updatedAt = Date.now();
   next();
});

// Update member count before saving
communitySchema.pre("save", function (next) {
   this.memberCount = this.members.length;
   next();
});

// Indexes for faster queries
communitySchema.index({ name: 1 });
communitySchema.index({ category: 1 });
communitySchema.index({ creator: 1 });
communitySchema.index({ members: 1 });
communitySchema.index({ isPrivate: 1 });
communitySchema.index({ createdAt: -1 });
communitySchema.index({ memberCount: -1 });

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
