const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
   userId: {
      type: String, // UUID of the user from PostgreSQL
      required: true,
   },
   joinedAt: {
      type: Date,
      default: Date.now,
   },
   role: {
      type: String,
      enum: ["member", "moderator", "admin"],
      default: "member",
   },
   membershipType: {
      type: String,
      enum: ["basic", "premium", "vip", "honorary"],
      default: "basic",
   },
   status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
   },
   permissions: [
      {
         type: String,
         enum: ["view", "post", "comment", "moderate", "admin"],
      },
   ],
});

const eventHistorySchema = new mongoose.Schema({
   eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
   },
   eventTitle: {
      type: String,
      required: true,
   },
   eventDate: {
      type: Date,
      required: true,
   },
   participantCount: {
      type: Number,
      default: 0,
   },
   outcome: {
      type: String,
      enum: ["completed", "cancelled", "postponed"],
      default: "completed",
   },
});

const clubSchema = new mongoose.Schema({
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
      maxlength: 2000,
   },
   founder: {
      type: String, // UUID of the user from PostgreSQL
      required: true,
   },
   administrators: [
      {
         type: String, // UUIDs of club administrators
      },
   ],
   members: [memberSchema],
   sportTypes: [
      {
         type: String,
         required: true,
         enum: [
            "basketball",
            "football",
            "soccer",
            "tennis",
            "swimming",
            "running",
            "cycling",
            "volleyball",
            "badminton",
            "cricket",
            "baseball",
            "hockey",
            "golf",
            "boxing",
            "wrestling",
            "martial_arts",
            "yoga",
            "fitness",
            "other",
         ],
      },
   ],
   logo: {
      type: String, // URL to club logo
      default: null,
   },
   images: [
      {
         url: { type: String, required: true },
         caption: { type: String, default: null },
         isPrimary: { type: Boolean, default: false },
      },
   ],
   location: {
      address: {
         type: String,
         required: true,
      },
      city: {
         type: String,
         required: true,
      },
      state: {
         type: String,
         default: null,
      },
      country: {
         type: String,
         required: true,
      },
      postalCode: {
         type: String,
         default: null,
      },
      coordinates: {
         latitude: { type: Number, default: null },
         longitude: { type: Number, default: null },
      },
   },
   contactInfo: {
      email: {
         type: String,
         required: true,
      },
      phone: {
         type: String,
         default: null,
      },
      website: {
         type: String,
         default: null,
      },
      socialMedia: {
         facebook: { type: String, default: null },
         twitter: { type: String, default: null },
         instagram: { type: String, default: null },
         linkedin: { type: String, default: null },
         youtube: { type: String, default: null },
      },
   },
   establishedYear: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
   },
   membershipTypes: [
      {
         name: { type: String, required: true },
         description: { type: String, default: null },
         fee: { type: Number, default: 0 },
         duration: { type: String, default: "annual" }, // monthly, quarterly, annual
         benefits: [{ type: String }],
      },
   ],
   facilities: [
      {
         name: { type: String, required: true },
         description: { type: String, default: null },
         capacity: { type: Number, default: null },
         amenities: [{ type: String }],
         availability: {
            days: [{ type: String }], // ["monday", "tuesday", ...]
            hours: {
               open: { type: String }, // "09:00"
               close: { type: String }, // "22:00"
            },
         },
      },
   ],
   achievements: [
      {
         title: { type: String, required: true },
         description: { type: String, default: null },
         year: { type: Number, required: true },
         category: { type: String, default: "tournament" },
         level: { type: String, enum: ["local", "regional", "national", "international"], default: "local" },
      },
   ],
   coachingStaff: [
      {
         name: { type: String, required: true },
         role: { type: String, required: true },
         specialization: { type: String, default: null },
         experience: { type: Number, default: 0 }, // years
         certifications: [{ type: String }],
         bio: { type: String, maxlength: 500 },
         contactInfo: {
            email: { type: String, default: null },
            phone: { type: String, default: null },
         },
      },
   ],
   events: [eventHistorySchema],
   rules: [
      {
         title: { type: String, required: true },
         description: { type: String, required: true },
         category: { type: String, default: "general" },
      },
   ],
   schedule: {
      regularTraining: [
         {
            day: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            activity: { type: String, required: true },
            location: { type: String, default: null },
            coach: { type: String, default: null },
         },
      ],
      specialEvents: [
         {
            title: { type: String, required: true },
            date: { type: Date, required: true },
            time: { type: String, required: true },
            description: { type: String, default: null },
         },
      ],
   },
   memberCount: {
      type: Number,
      default: 0,
   },
   status: {
      type: String,
      enum: ["pending", "active", "verified", "suspended", "inactive"],
      default: "pending",
   },
   verificationDate: {
      type: Date,
      default: null,
   },
   rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
   },
   reviews: [
      {
         userId: { type: String, required: true },
         rating: { type: Number, min: 1, max: 5, required: true },
         comment: { type: String, maxlength: 500 },
         createdAt: { type: Date, default: Date.now },
      },
   ],
   isPublic: {
      type: Boolean,
      default: true,
   },
   isFeatured: {
      type: Boolean,
      default: false,
   },
   subscription: {
      plan: {
         type: String,
         enum: ["basic", "premium", "pro"],
         default: "basic",
      },
      expiresAt: {
         type: Date,
         default: null,
      },
      features: [{ type: String }],
   },
   statistics: {
      totalEvents: { type: Number, default: 0 },
      activeMembers: { type: Number, default: 0 },
      monthlyActivity: { type: Number, default: 0 },
      avgEventAttendance: { type: Number, default: 0 },
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
clubSchema.pre("save", function (next) {
   this.updatedAt = Date.now();
   next();
});

// Update member count before saving
clubSchema.pre("save", function (next) {
   this.memberCount = this.members.length;
   this.statistics.activeMembers = this.members.filter((m) => m.status === "active").length;
   next();
});

// Update rating before saving
clubSchema.pre("save", function (next) {
   if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.rating.average = totalRating / this.reviews.length;
      this.rating.count = this.reviews.length;
   }
   next();
});

// Indexes for faster queries
clubSchema.index({ name: "text", description: "text" });
clubSchema.index({ name: 1 });
clubSchema.index({ founder: 1 });
clubSchema.index({ "members.userId": 1 });
clubSchema.index({ administrators: 1 });
clubSchema.index({ sportTypes: 1 });
clubSchema.index({ "location.city": 1 });
clubSchema.index({ "location.country": 1 });
clubSchema.index({ status: 1 });
clubSchema.index({ isPublic: 1 });
clubSchema.index({ isFeatured: 1 });
clubSchema.index({ memberCount: -1 });
clubSchema.index({ "rating.average": -1 });
clubSchema.index({ createdAt: -1 });

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;
