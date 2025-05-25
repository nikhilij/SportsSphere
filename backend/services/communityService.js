const Community = require("../models/mongo/Community");
const mongoose = require("mongoose");
const { AppError, ValidationError, NotFoundError, AuthorizationError } = require("../utils/error");

const ObjectId = mongoose.Types.ObjectId;

/**
 * Community service layer to handle business logic for communities
 */
class CommunityService {
   /**
    * Get all communities with optional filtering
    * @param {Object} queryParams - Query parameters for filtering
    * @returns {Promise<Object>} Communities and pagination info
    */
   async getAllCommunities(queryParams = {}) {
      try {
         const { category, name, sortBy = "createdAt", order = "desc", page = 1, limit = 10, isPublic } = queryParams;

         const query = {};

         if (category) query.category = category;
         if (name) query.name = { $regex: name, $options: "i" };
         if (isPublic !== undefined) query.isPublic = isPublic;

         const sortOptions = {};
         sortOptions[sortBy] = order === "desc" ? -1 : 1;

         const skip = (parseInt(page) - 1) * parseInt(limit);

         const communities = await Community.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("creator", "name profileImage")
            .populate("moderators", "name profileImage");

         const total = await Community.countDocuments(query);

         return {
            communities,
            pagination: {
               total,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(total / parseInt(limit)),
            },
         };
      } catch (error) {
         throw new AppError(`Error retrieving communities: ${error.message}`, 500);
      }
   }

   /**
    * Get community by ID
    * @param {string} communityId - Community ID
    * @returns {Promise<Object>} Community object
    */
   async getCommunityById(communityId) {
      try {
         if (!ObjectId.isValid(communityId)) {
            throw new ValidationError("Invalid community ID");
         }

         const community = await Community.findById(communityId)
            .populate("creator", "name profileImage email")
            .populate("moderators", "name profileImage email")
            .populate("members", "name profileImage");

         if (!community) {
            throw new NotFoundError("Community not found");
         }

         return community;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error retrieving community: ${error.message}`, 500);
      }
   }

   /**
    * Create a new community
    * @param {Object} communityData - Community information
    * @param {string} userId - User ID of the creator
    * @returns {Promise<Object>} Created community
    */
   async createCommunity(communityData, userId) {
      try {
         const newCommunity = new Community({
            ...communityData,
            creator: userId,
            moderators: [userId],
            members: [userId],
         });

         await newCommunity.save();
         return newCommunity;
      } catch (error) {
         throw new AppError(`Error creating community: ${error.message}`, 500);
      }
   }

   /**
    * Update community details
    * @param {string} communityId - Community ID
    * @param {Object} updateData - Updated community data
    * @param {string} userId - ID of user making the update
    * @returns {Promise<Object>} Updated community object
    */
   async updateCommunity(communityId, updateData, userId) {
      try {
         if (!ObjectId.isValid(communityId)) {
            throw new ValidationError("Invalid community ID");
         }

         const community = await Community.findById(communityId);

         if (!community) {
            throw new NotFoundError("Community not found");
         }

         // Check if user is a moderator or creator
         if (!community.moderators.includes(userId) && community.creator.toString() !== userId) {
            throw new AuthorizationError("Not authorized to update this community");
         }

         const updatedCommunity = await Community.findByIdAndUpdate(communityId, updateData, {
            new: true,
            runValidators: true,
         });

         return updatedCommunity;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error updating community: ${error.message}`, 500);
      }
   }

   /**
    * Delete a community
    * @param {string} communityId - Community ID
    * @param {string} userId - ID of user making the request
    * @returns {Promise<boolean>} Success indicator
    */
   async deleteCommunity(communityId, userId) {
      try {
         if (!ObjectId.isValid(communityId)) {
            throw new ValidationError("Invalid community ID");
         }

         const community = await Community.findById(communityId);

         if (!community) {
            throw new NotFoundError("Community not found");
         }

         // Only creator can delete community
         if (community.creator.toString() !== userId) {
            throw new AuthorizationError("Only the creator can delete this community");
         }

         await Community.findByIdAndDelete(communityId);
         return true;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error deleting community: ${error.message}`, 500);
      }
   }

   /**
    * Join a community
    * @param {string} communityId - Community ID
    * @param {string} userId - ID of user joining
    * @returns {Promise<Object>} Updated community
    */
   async joinCommunity(communityId, userId) {
      try {
         if (!ObjectId.isValid(communityId)) {
            throw new ValidationError("Invalid community ID");
         }

         const community = await Community.findById(communityId);

         if (!community) {
            throw new NotFoundError("Community not found");
         }

         // Check if user is already a member
         if (community.members.includes(userId)) {
            throw new ValidationError("User is already a member");
         }

         community.members.push(userId);
         await community.save();

         return {
            community,
            message: "Successfully joined the community",
         };
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error joining community: ${error.message}`, 500);
      }
   }

   /**
    * Leave a community
    * @param {string} communityId - Community ID
    * @param {string} userId - ID of user leaving
    * @returns {Promise<Object>} Updated community
    */
   async leaveCommunity(communityId, userId) {
      try {
         if (!ObjectId.isValid(communityId)) {
            throw new ValidationError("Invalid community ID");
         }

         const community = await Community.findById(communityId);

         if (!community) {
            throw new NotFoundError("Community not found");
         }

         // Check if user is a member
         if (!community.members.includes(userId)) {
            throw new ValidationError("User is not a member of this community");
         }

         // Creator cannot leave their own community
         if (community.creator.toString() === userId) {
            throw new ValidationError("Community creator cannot leave. Delete the community instead.");
         }

         // Remove user from members and moderators
         const updatedCommunity = await Community.findByIdAndUpdate(
            communityId,
            {
               $pull: {
                  members: userId,
                  moderators: userId,
               },
            },
            { new: true }
         );

         return {
            community: updatedCommunity,
            message: "Successfully left the community",
         };
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error leaving community: ${error.message}`, 500);
      }
   }

   /**
    * Get community members
    * @param {string} communityId - Community ID
    * @param {Object} queryParams - Query parameters for pagination
    * @returns {Promise<Object>} Members and pagination info
    */
   async getCommunityMembers(communityId, queryParams = {}) {
      try {
         if (!ObjectId.isValid(communityId)) {
            throw new ValidationError("Invalid community ID");
         }

         const community = await Community.findById(communityId);

         if (!community) {
            throw new NotFoundError("Community not found");
         }

         const { page = 1, limit = 20 } = queryParams;
         const skip = (parseInt(page) - 1) * parseInt(limit);

         // Get paginated members
         const members = await Community.findById(communityId)
            .populate({
               path: "members",
               select: "name profileImage email role",
               options: {
                  skip,
                  limit: parseInt(limit),
               },
            })
            .select("members");

         const total = community.members.length;

         return {
            members: members.members,
            pagination: {
               total,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(total / parseInt(limit)),
            },
         };
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error retrieving community members: ${error.message}`, 500);
      }
   }

   /**
    * Add moderator to community
    * @param {string} communityId - Community ID
    * @param {string} userId - User ID to promote
    * @param {string} requesterId - User ID making the request
    * @returns {Promise<Object>} Updated community
    */
   async addModerator(communityId, userId, requesterId) {
      try {
         if (!ObjectId.isValid(communityId) || !ObjectId.isValid(userId)) {
            throw new ValidationError("Invalid ID format");
         }

         const community = await Community.findById(communityId);

         if (!community) {
            throw new NotFoundError("Community not found");
         }

         // Only creator can add moderators
         if (community.creator.toString() !== requesterId) {
            throw new AuthorizationError("Only the community creator can add moderators");
         }

         // Check if user is a member
         if (!community.members.includes(userId)) {
            throw new ValidationError("User must be a community member first");
         }

         // Check if already a moderator
         if (community.moderators.includes(userId)) {
            throw new ValidationError("User is already a moderator");
         }

         const updatedCommunity = await Community.findByIdAndUpdate(
            communityId,
            { $addToSet: { moderators: userId } },
            { new: true }
         );

         return updatedCommunity;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error adding moderator: ${error.message}`, 500);
      }
   }

   /**
    * Search communities
    * @param {string} searchTerm - Search term
    * @param {Object} queryParams - Additional query parameters
    * @returns {Promise<Array>} Matching communities
    */
   async searchCommunities(searchTerm, queryParams = {}) {
      try {
         if (!searchTerm) {
            throw new ValidationError("Search term is required");
         }

         const { limit = 20 } = queryParams;

         const communities = await Community.find({
            $and: [
               { isPublic: true }, // Only search public communities
               {
                  $or: [
                     { name: { $regex: searchTerm, $options: "i" } },
                     { description: { $regex: searchTerm, $options: "i" } },
                     { tags: { $in: [new RegExp(searchTerm, "i")] } },
                  ],
               },
            ],
         })
            .populate("creator", "name profileImage")
            .limit(parseInt(limit))
            .sort({ memberCount: -1, createdAt: -1 });

         return communities;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error searching communities: ${error.message}`, 500);
      }
   }
}

module.exports = new CommunityService();
