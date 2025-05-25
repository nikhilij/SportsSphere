const Event = require("../models/mongo/Event");
const User = require("../models/postgres/User");
const { AppError, NotFoundError, ValidationError } = require("../utils/error");

class RecommendationService {
   /**
    * Get personalized event recommendations for a user
    * @param {string} userId - The user's ID
    * @param {Object} options - Options for recommendations
    * @returns {Promise<Array>} Array of recommended events
    */
   async getPersonalizedRecommendations(userId, options = {}) {
      try {
         const { limit = 5 } = options;

         // Get user to determine their interests and communities
         const user = await User.findById(userId).populate("interests");
         if (!user) {
            throw new NotFoundError("User not found");
         }

         // Build a query to find relevant events
         const query = {
            // Only show upcoming events
            eventDate: { $gte: new Date() },
            // Don't show events the user has already joined
            _id: { $nin: user.eventsJoined || [] },
         };

         // If user has interests, prioritize those categories
         const userInterests = user.interests?.map((interest) => interest.name) || [];

         // Add logic to find events based on interests
         let recommendedEvents = [];

         if (userInterests.length > 0) {
            // Find events matching user interests
            const interestEvents = await Event.find({
               ...query,
               category: { $in: userInterests },
            })
               .sort({ eventDate: 1 })
               .limit(Math.ceil(limit * 0.7)) // 70% of recommendations from interests
               .populate("creator", "name profileImage")
               .populate("community", "name");

            recommendedEvents = interestEvents;
         }

         // If we need more events to reach the limit, add popular ones
         if (recommendedEvents.length < limit) {
            const remainingNeeded = limit - recommendedEvents.length;
            const existingIds = recommendedEvents.map((event) => event._id);

            // Find popular events (those with more participants)
            const popularEvents = await Event.find({
               ...query,
               _id: { $nin: existingIds },
            })
               .sort({ participantCount: -1 })
               .limit(remainingNeeded)
               .populate("creator", "name profileImage")
               .populate("community", "name");

            recommendedEvents = [...recommendedEvents, ...popularEvents];
         }

         return recommendedEvents;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error getting recommendations: ${error.message}`, 500);
      }
   }

   /**
    * Get events similar to a specific event
    * @param {string} eventId - The reference event ID
    * @param {Object} options - Options for recommendations
    * @returns {Promise<Array>} Array of similar events
    */
   async getSimilarEvents(eventId, options = {}) {
      try {
         const { limit = 3 } = options;

         const event = await Event.findById(eventId);
         if (!event) {
            throw new ErrorResponse("Event not found", 404);
         }

         // Find events in the same category and/or location
         const similarEvents = await Event.find({
            _id: { $ne: eventId }, // Exclude the current event
            eventDate: { $gte: new Date() },
            $or: [{ category: event.category }, { location: { $regex: event.location.split(",")[0], $options: "i" } }],
         })
            .sort({ eventDate: 1 })
            .limit(limit)
            .populate("creator", "name profileImage")
            .populate("community", "name");

         return similarEvents;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error getting similar events: ${error.message}`, 500);
      }
   }

   /**
    * Get trending events based on recent popularity
    * @param {Object} options - Options for trending events
    * @returns {Promise<Array>} Array of trending events
    */
   async getTrendingEvents(options = {}) {
      try {
         const { limit = 5 } = options;

         // Find events with recent activity and high participant count
         const trendingEvents = await Event.find({
            eventDate: { $gte: new Date() },
         })
            .sort({
               participantCount: -1,
               createdAt: -1,
            })
            .limit(limit)
            .populate("creator", "name profileImage")
            .populate("community", "name");

         return trendingEvents;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error getting trending events: ${error.message}`, 500);
      }
   }
}

module.exports = new RecommendationService();
