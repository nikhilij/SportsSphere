const Club = require("../models/mongo/Club");
const mongoose = require("mongoose");
const { AppError, ValidationError, NotFoundError, AuthorizationError } = require("../utils/error");

const ObjectId = mongoose.Types.ObjectId;

/**
 * Club service layer to handle business logic for clubs
 */
class ClubService {
   /**
    * Get all clubs with optional filtering
    * @param {Object} queryParams - Query parameters for filtering
    * @returns {Promise<Array>} List of clubs
    */
   async getAllClubs(queryParams = {}) {
      try {
         const { sportType, location, name, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = queryParams;

         const query = {};

         if (sportType) query.sportType = sportType;
         if (location) query.location = { $regex: location, $options: "i" };
         if (name) query.name = { $regex: name, $options: "i" };

         const sortOptions = {};
         sortOptions[sortBy] = order === "desc" ? -1 : 1;

         const skip = (parseInt(page) - 1) * parseInt(limit);

         const clubs = await Club.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("members", "name profileImage")
            .populate("coaches", "name profileImage");

         const total = await Club.countDocuments(query);

         return {
            clubs,
            pagination: {
               total,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(total / parseInt(limit)),
            },
         };
      } catch (error) {
         throw new AppError(`Error retrieving clubs: ${error.message}`, 500);
      }
   }

   /**
    * Get club by ID
    * @param {string} clubId - Club ID
    * @returns {Promise<Object>} Club object
    */
   async getClubById(clubId) {
      try {
         if (!ObjectId.isValid(clubId)) {
            throw new ValidationError("Invalid club ID");
         }

         const club = await Club.findById(clubId)
            .populate("members", "name profileImage email")
            .populate("coaches", "name profileImage email")
            .populate("events", "title date location");

         if (!club) {
            throw new NotFoundError("Club not found");
         }

         return club;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error retrieving club: ${error.message}`, 500);
      }
   }

   /**
    * Create a new club
    * @param {Object} clubData - Club information
    * @param {string} userId - User ID of the creator
    * @returns {Promise<Object>} Created club
    */
   async createClub(clubData, userId) {
      try {
         const newClub = new Club({
            ...clubData,
            founder: userId,
            administrators: [userId],
         });

         await newClub.save();
         return newClub;
      } catch (error) {
         throw new AppError(`Error creating club: ${error.message}`, 500);
      }
   }

   /**
    * Update club information
    * @param {string} clubId - Club ID
    * @param {Object} updateData - Updated club information
    * @param {string} userId - User ID making the request
    * @returns {Promise<Object>} Updated club
    */
   async updateClub(clubId, updateData, userId) {
      try {
         if (!ObjectId.isValid(clubId)) {
            throw new ValidationError("Invalid club ID");
         }

         const club = await Club.findById(clubId);

         if (!club) {
            throw new NotFoundError("Club not found");
         }

         // Check if user is authorized to update
         if (!club.administrators.includes(userId) && !club.founder.equals(userId)) {
            throw new AuthorizationError("Not authorized to update this club");
         }

         const updatedClub = await Club.findByIdAndUpdate(
            clubId,
            { $set: updateData },
            { new: true, runValidators: true }
         );

         return updatedClub;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error updating club: ${error.message}`, 500);
      }
   }

   /**
    * Delete a club
    * @param {string} clubId - Club ID
    * @param {string} userId - User ID making the request
    * @returns {Promise<boolean>} Success indicator
    */
   async deleteClub(clubId, userId) {
      try {
         if (!ObjectId.isValid(clubId)) {
            throw new ValidationError("Invalid club ID");
         }

         const club = await Club.findById(clubId);

         if (!club) {
            throw new NotFoundError("Club not found");
         }

         // Only founder can delete club
         if (!club.founder.equals(userId)) {
            throw new AuthorizationError("Only the club founder can delete this club");
         }

         await Club.findByIdAndDelete(clubId);
         return true;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error deleting club: ${error.message}`, 500);
      }
   }

   /**
    * Join a club
    * @param {string} clubId - Club ID
    * @param {string} userId - User ID joining
    * @returns {Promise<Object>} Updated club
    */
   async joinClub(clubId, userId) {
      try {
         if (!ObjectId.isValid(clubId)) {
            throw new ValidationError("Invalid club ID");
         }

         const club = await Club.findById(clubId);

         if (!club) {
            throw new NotFoundError("Club not found");
         }

         if (club.members.includes(userId)) {
            throw new ValidationError("You are already a member of this club");
         }

         const updatedClub = await Club.findByIdAndUpdate(clubId, { $addToSet: { members: userId } }, { new: true });

         return updatedClub;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error joining club: ${error.message}`, 500);
      }
   }

   /**
    * Leave a club
    * @param {string} clubId - Club ID
    * @param {string} userId - User ID leaving
    * @returns {Promise<Object>} Updated club
    */
   async leaveClub(clubId, userId) {
      try {
         if (!ObjectId.isValid(clubId)) {
            throw new ValidationError("Invalid club ID");
         }

         const club = await Club.findById(clubId);

         if (!club) {
            throw new NotFoundError("Club not found");
         }

         if (!club.members.includes(userId)) {
            throw new ValidationError("You are not a member of this club");
         }

         if (club.founder.equals(userId)) {
            throw new ValidationError(
               "Club founder cannot leave the club. Transfer ownership first or delete the club."
            );
         }

         const updatedClub = await Club.findByIdAndUpdate(
            clubId,
            {
               $pull: {
                  members: userId,
                  administrators: userId,
                  coaches: userId,
               },
            },
            { new: true }
         );

         return updatedClub;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error leaving club: ${error.message}`, 500);
      }
   }

   /**
    * Add an administrator to the club
    * @param {string} clubId - Club ID
    * @param {string} adminId - User ID to promote
    * @param {string} requesterId - User ID making the request
    * @returns {Promise<Object>} Updated club
    */
   async addAdministrator(clubId, adminId, requesterId) {
      try {
         if (!ObjectId.isValid(clubId) || !ObjectId.isValid(adminId)) {
            throw new ValidationError("Invalid ID format");
         }

         const club = await Club.findById(clubId);

         if (!club) {
            throw new NotFoundError("Club not found");
         }

         // Check if requester is authorized
         if (!club.founder.equals(requesterId) && !club.administrators.includes(requesterId)) {
            throw new AuthorizationError("Not authorized to add administrators");
         }

         if (!club.members.includes(adminId)) {
            throw new ValidationError("User must be a club member first");
         }

         if (club.administrators.includes(adminId)) {
            throw new ValidationError("User is already an administrator");
         }

         const updatedClub = await Club.findByIdAndUpdate(
            clubId,
            { $addToSet: { administrators: adminId } },
            { new: true }
         );

         return updatedClub;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error adding administrator: ${error.message}`, 500);
      }
   }

   /**
    * Get clubs by sport type
    * @param {string} sportType - Type of sport
    * @param {Object} queryParams - Additional query parameters
    * @returns {Promise<Array>} List of clubs
    */
   async getClubsBySport(sportType, queryParams = {}) {
      try {
         const { sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = queryParams;

         const sortOptions = {};
         sortOptions[sortBy] = order === "desc" ? -1 : 1;

         const skip = (parseInt(page) - 1) * parseInt(limit);

         const clubs = await Club.find({ sportType })
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("members", "name profileImage")
            .populate("coaches", "name profileImage");

         const total = await Club.countDocuments({ sportType });

         return {
            clubs,
            pagination: {
               total,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(total / parseInt(limit)),
            },
         };
      } catch (error) {
         throw new AppError(`Error retrieving clubs by sport: ${error.message}`, 500);
      }
   }

   /**
    * Search clubs by name or location
    * @param {string} searchTerm - Term to search for
    * @returns {Promise<Array>} List of matching clubs
    */
   async searchClubs(searchTerm) {
      try {
         if (!searchTerm) {
            throw new ValidationError("Search term is required");
         }

         const clubs = await Club.find({
            $or: [
               { name: { $regex: searchTerm, $options: "i" } },
               { location: { $regex: searchTerm, $options: "i" } },
               { description: { $regex: searchTerm, $options: "i" } },
            ],
         }).limit(20);

         return clubs;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error searching clubs: ${error.message}`, 500);
      }
   }
}

module.exports = new ClubService();
