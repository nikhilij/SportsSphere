const Event = require("../models/mongo/Event");
const { AppError } = require("../utils/error");
const { ObjectId } = require("mongoose").Types;

class EventService {
   /**
    * Create a new event
    * @param {Object} eventData - Data for the new event
    * @param {string} creatorId - ID of the user creating the event
    * @returns {Promise<Object>} Created event
    */
   async createEvent(eventData, creatorId) {
      try {
         if (!eventData || !creatorId) {
            throw new AppError("Event data and creator ID are required", 400);
         }

         const event = new Event({
            ...eventData,
            creator: creatorId,
            participants: [creatorId], // Creator is automatically a participant
         });

         await event.save();
         return event;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error creating event: ${error.message}`, 500);
      }
   }

   /**
    * Get event by ID
    * @param {string} eventId - Event ID
    * @returns {Promise<Object>} Event object
    */
   async getEventById(eventId) {
      try {
         if (!ObjectId.isValid(eventId)) {
            throw new ErrorResponse("Invalid event ID format", 400);
         }

         const event = await Event.findById(eventId)
            .populate("creator", "name profileImage")
            .populate("participants", "name profileImage")
            .populate("community", "name");

         if (!event) {
            throw new ErrorResponse("Event not found", 404);
         }

         return event;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error retrieving event: ${error.message}`, 500);
      }
   }

   /**
    * Update event
    * @param {string} eventId - Event ID
    * @param {Object} updateData - Data to update
    * @param {string} userId - ID of user making the request
    * @returns {Promise<Object>} Updated event
    */
   async updateEvent(eventId, updateData, userId) {
      try {
         if (!ObjectId.isValid(eventId)) {
            throw new ErrorResponse("Invalid event ID format", 400);
         }

         const event = await Event.findById(eventId);

         if (!event) {
            throw new ErrorResponse("Event not found", 404);
         }

         // Check if user is authorized (creator or moderator of related community)
         if (event.creator.toString() !== userId) {
            // You may want to add community moderator check here
            throw new ErrorResponse("Not authorized to update this event", 403);
         }

         // Don't allow changing creator
         delete updateData.creator;
         delete updateData.participants;

         const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $set: updateData },
            { new: true, runValidators: true }
         );

         return updatedEvent;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error updating event: ${error.message}`, 500);
      }
   }

   /**
    * Delete an event
    * @param {string} eventId - Event ID
    * @param {string} userId - ID of user making the request
    * @returns {Promise<boolean>} Success indicator
    */
   async deleteEvent(eventId, userId) {
      try {
         if (!ObjectId.isValid(eventId)) {
            throw new ErrorResponse("Invalid event ID format", 400);
         }

         const event = await Event.findById(eventId);

         if (!event) {
            throw new ErrorResponse("Event not found", 404);
         }

         // Check authorization
         if (event.creator.toString() !== userId) {
            throw new ErrorResponse("Not authorized to delete this event", 403);
         }

         await Event.findByIdAndDelete(eventId);
         return true;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error deleting event: ${error.message}`, 500);
      }
   }

   /**
    * Get all events with filtering and pagination
    * @param {Object} queryParams - Query parameters
    * @returns {Promise<Object>} Events with pagination
    */
   async getAllEvents(queryParams = {}) {
      try {
         const {
            category,
            location,
            startDate,
            endDate,
            isPublic,
            sortBy = "eventDate",
            order = "asc",
            page = 1,
            limit = 10,
         } = queryParams;

         const query = {};

         if (category) query.category = category;
         if (location) query.location = { $regex: location, $options: "i" };
         if (isPublic !== undefined) query.isPublic = isPublic;

         if (startDate || endDate) {
            query.eventDate = {};
            if (startDate) query.eventDate.$gte = new Date(startDate);
            if (endDate) query.eventDate.$lte = new Date(endDate);
         }

         const sortOptions = {};
         sortOptions[sortBy] = order === "desc" ? -1 : 1;

         const skip = (parseInt(page) - 1) * parseInt(limit);

         const events = await Event.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("creator", "name profileImage")
            .populate("participants", "name profileImage")
            .populate("community", "name");

         const total = await Event.countDocuments(query);

         return {
            events,
            pagination: {
               total,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(total / parseInt(limit)),
            },
         };
      } catch (error) {
         throw new ErrorResponse(`Error retrieving events: ${error.message}`, 500);
      }
   }

   /**
    * Register user for an event
    * @param {string} eventId - Event ID
    * @param {string} userId - User ID
    * @returns {Promise<Object>} Updated event
    */
   async registerForEvent(eventId, userId) {
      try {
         if (!ObjectId.isValid(eventId)) {
            throw new ErrorResponse("Invalid event ID format", 400);
         }

         const event = await Event.findById(eventId);

         if (!event) {
            throw new ErrorResponse("Event not found", 404);
         }

         if (event.participants.includes(userId)) {
            throw new ErrorResponse("User is already registered for this event", 400);
         }

         if (event.capacity && event.participants.length >= event.capacity) {
            throw new ErrorResponse("Event is at full capacity", 400);
         }

         const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $addToSet: { participants: userId } },
            { new: true }
         )
            .populate("creator", "name profileImage")
            .populate("participants", "name profileImage");

         return updatedEvent;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error registering for event: ${error.message}`, 500);
      }
   }

   /**
    * Unregister user from an event
    * @param {string} eventId - Event ID
    * @param {string} userId - User ID
    * @returns {Promise<Object>} Updated event
    */
   async unregisterFromEvent(eventId, userId) {
      try {
         if (!ObjectId.isValid(eventId)) {
            throw new ErrorResponse("Invalid event ID format", 400);
         }

         const event = await Event.findById(eventId);

         if (!event) {
            throw new ErrorResponse("Event not found", 404);
         }

         if (!event.participants.includes(userId)) {
            throw new ErrorResponse("User is not registered for this event", 400);
         }

         // Creator cannot unregister themselves
         if (event.creator.toString() === userId) {
            throw new ErrorResponse("Event creator cannot unregister from their own event", 400);
         }

         const updatedEvent = await Event.findByIdAndUpdate(eventId, { $pull: { participants: userId } }, { new: true })
            .populate("creator", "name profileImage")
            .populate("participants", "name profileImage");

         return updatedEvent;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error unregistering from event: ${error.message}`, 500);
      }
   }

   /**
    * Get events by sport type
    * @param {string} sportType - Sport type
    * @param {Object} queryParams - Additional query parameters
    * @returns {Promise<Object>} Events with pagination
    */
   async getEventsBySportType(sportType, queryParams = {}) {
      try {
         return await this.getAllEvents({
            ...queryParams,
            category: sportType,
         });
      } catch (error) {
         throw new ErrorResponse(`Error retrieving events by sport type: ${error.message}`, 500);
      }
   }

   /**
    * Get upcoming events
    * @param {Object} queryParams - Query parameters
    * @returns {Promise<Object>} Upcoming events
    */
   async getUpcomingEvents(queryParams = {}) {
      try {
         return await this.getAllEvents({
            ...queryParams,
            startDate: new Date().toISOString(),
         });
      } catch (error) {
         throw new ErrorResponse(`Error retrieving upcoming events: ${error.message}`, 500);
      }
   }

   /**
    * Get event participants
    * @param {string} eventId - Event ID
    * @returns {Promise<Array>} List of participants
    */
   async getEventParticipants(eventId) {
      try {
         if (!ObjectId.isValid(eventId)) {
            throw new ErrorResponse("Invalid event ID format", 400);
         }

         const event = await Event.findById(eventId).populate("participants", "name profileImage email");

         if (!event) {
            throw new ErrorResponse("Event not found", 404);
         }

         return event.participants;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error retrieving event participants: ${error.message}`, 500);
      }
   }

   /**
    * Search events
    * @param {string} searchTerm - Search term
    * @param {Object} queryParams - Additional query parameters
    * @returns {Promise<Object>} Search results
    */
   async searchEvents(searchTerm, queryParams = {}) {
      try {
         if (!searchTerm) {
            throw new ErrorResponse("Search term is required", 400);
         }

         const query = {
            $or: [
               { title: { $regex: searchTerm, $options: "i" } },
               { description: { $regex: searchTerm, $options: "i" } },
               { location: { $regex: searchTerm, $options: "i" } },
            ],
         };

         const { sortBy = "eventDate", order = "asc", page = 1, limit = 10 } = queryParams;

         const sortOptions = {};
         sortOptions[sortBy] = order === "desc" ? -1 : 1;

         const skip = (parseInt(page) - 1) * parseInt(limit);

         const events = await Event.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("creator", "name profileImage")
            .populate("participants", "name profileImage");

         const total = await Event.countDocuments(query);

         return {
            events,
            pagination: {
               total,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(total / parseInt(limit)),
            },
         };
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error searching events: ${error.message}`, 500);
      }
   }
}

module.exports = new EventService();
