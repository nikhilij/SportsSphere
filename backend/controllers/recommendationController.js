const recommendationService = require("../services/recommendationService");
const catchAsync = require("../utils/catchAsync");

// Get personalized event recommendations for the authenticated user
exports.getPersonalizedRecommendations = catchAsync(async (req, res, next) => {
   const events = await recommendationService.getPersonalizedRecommendations(req.user.id, req.query);

   res.status(200).json({
      status: "success",
      results: events.length,
      data: {
         events,
      },
   });
});

// Get events similar to a specific event
exports.getSimilarEvents = catchAsync(async (req, res, next) => {
   const events = await recommendationService.getSimilarEvents(req.params.eventId, req.query);

   res.status(200).json({
      status: "success",
      results: events.length,
      data: {
         events,
      },
   });
});

// Get trending events
exports.getTrendingEvents = catchAsync(async (req, res, next) => {
   const events = await recommendationService.getTrendingEvents(req.query);

   res.status(200).json({
      status: "success",
      results: events.length,
      data: {
         events,
      },
   });
});

// Legacy endpoints for backward compatibility
// Get recommended events based on user preferences
exports.getRecommendedEvents = catchAsync(async (req, res, next) => {
   // If user is authenticated, use personalized recommendations
   if (req.user) {
      const events = await recommendationService.getPersonalizedRecommendations(req.user.id, req.query);
      return res.status(200).json({
         status: "success",
         results: events.length,
         data: {
            events,
         },
      });
   }

   // Fallback to trending events for unauthenticated users
   const events = await recommendationService.getTrendingEvents(req.query);

   res.status(200).json({
      status: "success",
      results: events.length,
      data: {
         events,
      },
   });
});

// Get recommended communities (placeholder - would need community service enhancement)
exports.getRecommendedCommunities = catchAsync(async (req, res, next) => {
   // This would be enhanced when community recommendations are implemented
   const communities = [];

   res.status(200).json({
      status: "success",
      results: communities.length,
      data: {
         communities,
      },
   });
});
