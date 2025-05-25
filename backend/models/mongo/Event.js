const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
   userId: {
      type: String, // UUID of the user from PostgreSQL
      required: true,
   },
   registrationDate: {
      type: Date,
      default: Date.now,
   },
   status: {
      type: String,
      enum: ["registered", "confirmed", "cancelled", "attended", "no-show"],
      default: "registered",
   },
   teamName: {
      type: String,
      default: null,
   },
   additionalInfo: {
      type: Map,
      of: String,
   },
});

const eventSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
   },
   description: {
      type: String,
      required: true,
      maxlength: 2000,
   },
   creator: {
      type: String, // UUID of the user from PostgreSQL
      required: true,
   },
   community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      default: null,
   },
   sportType: {
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
   eventType: {
      type: String,
      enum: ["tournament", "match", "training", "workshop", "competition", "friendly", "other"],
      default: "tournament",
   },
   category: {
      type: String,
      enum: ["professional", "amateur", "recreational", "youth", "senior", "mixed"],
      default: "recreational",
   },
   status: {
      type: String,
      enum: ["draft", "published", "registration_open", "registration_closed", "ongoing", "completed", "cancelled"],
      default: "draft",
   },
   eventDate: {
      type: Date,
      required: true,
   },
   endDate: {
      type: Date,
      required: true,
   },
   registrationStartDate: {
      type: Date,
      default: null,
   },
   registrationEndDate: {
      type: Date,
      default: null,
   },
   location: {
      venue: {
         type: String,
         required: true,
      },
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
      coordinates: {
         latitude: { type: Number, default: null },
         longitude: { type: Number, default: null },
      },
   },
   participants: [participantSchema],
   capacity: {
      type: Number,
      default: null,
   },
   registrationFee: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
   },
   prizes: [
      {
         position: { type: String, required: true }, // "1st", "2nd", "3rd", etc.
         description: { type: String, required: true },
         value: { type: Number, default: 0 },
         currency: { type: String, default: "USD" },
      },
   ],
   rules: {
      type: String,
      maxlength: 2000,
   },
   requirements: [
      {
         type: String,
         maxlength: 200,
      },
   ],
   images: [
      {
         url: { type: String, required: true },
         caption: { type: String, default: null },
         isPrimary: { type: Boolean, default: false },
      },
   ],
   organizer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, default: null },
      organization: { type: String, default: null },
   },
   contactInfo: {
      email: { type: String, required: true },
      phone: { type: String, default: null },
      website: { type: String, default: null },
      socialMedia: {
         facebook: { type: String, default: null },
         twitter: { type: String, default: null },
         instagram: { type: String, default: null },
      },
   },
   tags: [
      {
         type: String,
         maxlength: 50,
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
   isRecurring: {
      type: Boolean,
      default: false,
   },
   recurringPattern: {
      frequency: {
         type: String,
         enum: ["daily", "weekly", "monthly", "yearly"],
         default: null,
      },
      interval: { type: Number, default: 1 },
      endDate: { type: Date, default: null },
      daysOfWeek: [{ type: Number, min: 0, max: 6 }], // 0 = Sunday, 6 = Saturday
   },
   ageRestriction: {
      minAge: { type: Number, default: null },
      maxAge: { type: Number, default: null },
   },
   skillLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "professional", "all"],
      default: "all",
   },
   equipment: [
      {
         item: { type: String, required: true },
         required: { type: Boolean, default: true },
         providedByOrganizer: { type: Boolean, default: false },
      },
   ],
   schedule: [
      {
         date: { type: Date, required: true },
         startTime: { type: String, required: true }, // Format: "HH:MM"
         endTime: { type: String, required: true },
         activity: { type: String, required: true },
         location: { type: String, default: null },
      },
   ],
   weather: {
      indoor: { type: Boolean, default: false },
      weatherDependent: { type: Boolean, default: true },
      backup: {
         location: { type: String, default: null },
         plan: { type: String, default: null },
      },
   },
   statistics: {
      viewCount: { type: Number, default: 0 },
      registrationCount: { type: Number, default: 0 },
      attendanceCount: { type: Number, default: 0 },
      completionRate: { type: Number, default: 0 },
   },
   feedback: [
      {
         userId: { type: String, required: true },
         rating: { type: Number, min: 1, max: 5, required: true },
         comment: { type: String, maxlength: 500 },
         createdAt: { type: Date, default: Date.now },
      },
   ],
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
eventSchema.pre("save", function (next) {
   this.updatedAt = Date.now();
   next();
});

// Update registration count before saving
eventSchema.pre("save", function (next) {
   this.statistics.registrationCount = this.participants.length;
   next();
});

// Validate dates
eventSchema.pre("save", function (next) {
   if (this.endDate <= this.eventDate) {
      next(new Error("End date must be after event date"));
   }

   if (
      this.registrationEndDate &&
      this.registrationStartDate &&
      this.registrationEndDate <= this.registrationStartDate
   ) {
      next(new Error("Registration end date must be after registration start date"));
   }

   next();
});

// Indexes for faster queries
eventSchema.index({ title: "text", description: "text" });
eventSchema.index({ creator: 1 });
eventSchema.index({ community: 1 });
eventSchema.index({ sportType: 1 });
eventSchema.index({ eventType: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ eventDate: 1 });
eventSchema.index({ "location.city": 1 });
eventSchema.index({ "location.country": 1 });
eventSchema.index({ isPublic: 1 });
eventSchema.index({ isFeatured: 1 });
eventSchema.index({ skillLevel: 1 });
eventSchema.index({ createdAt: -1 });
eventSchema.index({ "statistics.viewCount": -1 });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
