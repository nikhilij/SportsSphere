const eventService = require("../services/eventService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");

// Get all events
exports.getAllEvents = catchAsync(async (req, res, next) => {
   const result = await eventService.getAllEvents(req.query);

   res.status(200).json({
      status: "success",
      results: result.events.length,
      pagination: result.pagination,
      data: {
         events: result.events,
      },
   });
});

// Get a single event
exports.getEvent = catchAsync(async (req, res, next) => {
   const event = await eventService.getEventById(req.params.id);

   res.status(200).json({
      status: "success",
      data: {
         event,
      },
   });
});

// Create a new event
exports.createEvent = catchAsync(async (req, res, next) => {
   const event = await eventService.createEvent(req.body, req.user.id);

   res.status(201).json({
      status: "success",
      data: {
         event,
      },
   });
});

// Update an event
exports.updateEvent = catchAsync(async (req, res, next) => {
   const event = await eventService.updateEvent(req.params.id, req.body, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         event,
      },
   });
});

// Delete an event
exports.deleteEvent = catchAsync(async (req, res, next) => {
   await eventService.deleteEvent(req.params.id, req.user.id);

   res.status(204).json({
      status: "success",
      data: null,
   });
});

// Register for an event
exports.registerForEvent = catchAsync(async (req, res, next) => {
   const event = await eventService.registerForEvent(req.params.id, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         event,
      },
   });
});

// Unregister from an event
exports.unregisterFromEvent = catchAsync(async (req, res, next) => {
   const event = await eventService.unregisterFromEvent(req.params.id, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         event,
      },
   });
});

// Get event participants
exports.getEventParticipants = catchAsync(async (req, res, next) => {
   const participants = await eventService.getEventParticipants(req.params.id);

   res.status(200).json({
      status: "success",
      results: participants.length,
      data: {
         participants,
      },
   });
});

// Get events by sport type
exports.getEventsBySportType = catchAsync(async (req, res, next) => {
   const result = await eventService.getEventsBySportType(req.params.sportType, req.query);

   res.status(200).json({
      status: "success",
      results: result.events.length,
      pagination: result.pagination,
      data: {
         events: result.events,
      },
   });
});

// Get upcoming events
exports.getUpcomingEvents = catchAsync(async (req, res, next) => {
   const result = await eventService.getUpcomingEvents(req.query);

   res.status(200).json({
      status: "success",
      results: result.events.length,
      pagination: result.pagination,
      data: {
         events: result.events,
      },
   });
});

// Search events
exports.searchEvents = catchAsync(async (req, res, next) => {
   const { query } = req.query;

   if (!query) {
      return next(new AppError("Please provide a search query", 400));
   }

   const result = await eventService.searchEvents(query, req.query);

   res.status(200).json({
      status: "success",
      results: result.events.length,
      pagination: result.pagination,
      data: {
         events: result.events,
      },
   });
});

// Add comment to event (placeholder - would need comment model)
exports.addComment = catchAsync(async (req, res, next) => {
   // This would typically use a separate comment service
   res.status(201).json({
      status: "success",
      message: "Comment functionality to be implemented",
   });
});

// Get event comments (placeholder)
exports.getEventComments = catchAsync(async (req, res, next) => {
   // This would typically use a separate comment service
   res.status(200).json({
      status: "success",
      data: {
         comments: [],
      },
   });
});

// Update an event
exports.updateEvent = catchAsync(async (req, res, next) => {
   const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   });

   if (!event) {
      return next(new AppError("No event found with that ID", 404));
   }

   res.status(200).json({
      status: "success",
      data: {
         event,
      },
   });
});

// Delete an event
exports.deleteEvent = catchAsync(async (req, res, next) => {
   const event = await Event.findByIdAndDelete(req.params.id);

   if (!event) {
      return next(new AppError("No event found with that ID", 404));
   }

   res.status(204).json({
      status: "success",
      data: null,
   });
});
