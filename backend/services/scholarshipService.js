const Scholarship = require("../models/postgres/Scholarship");
const { AppError, ValidationError, NotFoundError, AuthorizationError } = require("../utils/error");
const { Op } = require("sequelize");

/**
 * Service class for managing sports scholarships
 */
class ScholarshipService {
   /**
    * Get all available scholarships
    * @param {Object} query - Query parameters for filtering scholarships
    * @returns {Promise<Object>} Array of scholarships with pagination
    */
   async getAllScholarships(query = {}) {
      try {
         const {
            sportType,
            provider,
            minAmount,
            maxAmount,
            status = "active",
            page = 1,
            limit = 10,
            sortBy = "deadline",
            order = "asc",
         } = query;

         const whereClause = { status };

         if (sportType) whereClause.sportType = sportType;
         if (provider) whereClause.provider = { [Op.iLike]: `%${provider}%` };
         if (minAmount) whereClause.amount = { [Op.gte]: minAmount };
         if (maxAmount) {
            whereClause.amount = whereClause.amount
               ? { ...whereClause.amount, [Op.lte]: maxAmount }
               : { [Op.lte]: maxAmount };
         }

         const offset = (page - 1) * limit;
         const orderClause = [[sortBy, order.toUpperCase()]];

         const { rows: scholarships, count: total } = await Scholarship.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset,
            order: orderClause,
         });

         return {
            scholarships,
            pagination: {
               total,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(total / limit),
            },
         };
      } catch (error) {
         throw new AppError(`Error retrieving scholarships: ${error.message}`, 500);
      }
   }

   /**
    * Get scholarship by ID
    * @param {string} scholarshipId - The scholarship ID
    * @returns {Promise<Object>} Scholarship details
    */
   async getScholarshipById(scholarshipId) {
      try {
         const scholarship = await Scholarship.findByPk(scholarshipId);

         if (!scholarship) {
            throw new NotFoundError("Scholarship not found");
         }

         return scholarship;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error retrieving scholarship: ${error.message}`, 500);
      }
   }

   /**
    * Create a new scholarship
    * @param {Object} scholarshipData - Scholarship details
    * @param {string} creatorId - ID of the user creating the scholarship
    * @returns {Promise<Object>} Created scholarship
    */
   async createScholarship(scholarshipData, creatorId) {
      try {
         const scholarship = await Scholarship.create({
            ...scholarshipData,
            createdBy: creatorId,
            status: "active",
         });

         return scholarship;
      } catch (error) {
         throw new AppError(`Error creating scholarship: ${error.message}`, 500);
      }
   }

   /**
    * Update scholarship details
    * @param {string} scholarshipId - The scholarship ID
    * @param {Object} updateData - Updated scholarship data
    * @param {string} userId - ID of user making the update
    * @returns {Promise<Object>} Updated scholarship
    */
   async updateScholarship(scholarshipId, updateData, userId) {
      try {
         const scholarship = await Scholarship.findByPk(scholarshipId);

         if (!scholarship) {
            throw new NotFoundError("Scholarship not found");
         }

         // Check if user is authorized to update
         if (scholarship.createdBy !== userId) {
            throw new AuthorizationError("Not authorized to update this scholarship");
         }

         await scholarship.update(updateData);
         return scholarship;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error updating scholarship: ${error.message}`, 500);
      }
   }

   /**
    * Delete a scholarship
    * @param {string} scholarshipId - The scholarship ID
    * @param {string} userId - ID of user making the request
    * @returns {Promise<boolean>} Success indicator
    */
   async deleteScholarship(scholarshipId, userId) {
      try {
         const scholarship = await Scholarship.findByPk(scholarshipId);

         if (!scholarship) {
            throw new NotFoundError("Scholarship not found");
         }

         // Check if user is authorized to delete
         if (scholarship.createdBy !== userId) {
            throw new AuthorizationError("Not authorized to delete this scholarship");
         }

         await scholarship.destroy();
         return true;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error deleting scholarship: ${error.message}`, 500);
      }
   }

   /**
    * Apply for a scholarship
    * @param {string} scholarshipId - The scholarship ID
    * @param {string} userId - The user ID of the applicant
    * @param {Object} applicationData - Application details
    * @returns {Promise<Object>} Application status
    */
   async applyForScholarship(scholarshipId, userId, applicationData) {
      try {
         const scholarship = await Scholarship.findByPk(scholarshipId);

         if (!scholarship) {
            throw new NotFoundError("Scholarship not found");
         }

         if (scholarship.status !== "active") {
            throw new ValidationError("This scholarship is no longer accepting applications");
         }

         if (new Date() > new Date(scholarship.deadline)) {
            throw new ValidationError("Application deadline has passed");
         }

         // Check if user has already applied
         const existingApplications = scholarship.applications || [];
         const hasApplied = existingApplications.some((app) => app.userId === userId);

         if (hasApplied) {
            throw new ValidationError("You have already applied for this scholarship");
         }

         // Add application to scholarship
         const application = {
            userId,
            ...applicationData,
            status: "pending",
            appliedAt: new Date(),
         };

         const updatedApplications = [...existingApplications, application];
         await scholarship.update({ applications: updatedApplications });

         return {
            success: true,
            message: "Application submitted successfully",
            application,
         };
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error applying for scholarship: ${error.message}`, 500);
      }
   }

   /**
    * Get scholarships by sport type
    * @param {string} sportType - Type of sport
    * @param {Object} queryParams - Additional query parameters
    * @returns {Promise<Object>} Scholarships for the sport type
    */
   async getScholarshipsBySport(sportType, queryParams = {}) {
      try {
         const { page = 1, limit = 10 } = queryParams;
         const offset = (page - 1) * limit;

         const { rows: scholarships, count: total } = await Scholarship.findAndCountAll({
            where: {
               sportType,
               status: "active",
               deadline: { [Op.gt]: new Date() },
            },
            limit: parseInt(limit),
            offset,
            order: [["deadline", "ASC"]],
         });

         return {
            scholarships,
            pagination: {
               total,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(total / limit),
            },
         };
      } catch (error) {
         throw new AppError(`Error retrieving scholarships by sport: ${error.message}`, 500);
      }
   }

   /**
    * Search scholarships
    * @param {string} searchTerm - Search term
    * @param {Object} queryParams - Additional query parameters
    * @returns {Promise<Array>} Matching scholarships
    */
   async searchScholarships(searchTerm, queryParams = {}) {
      try {
         if (!searchTerm) {
            throw new ValidationError("Search term is required");
         }

         const { limit = 20 } = queryParams;

         const scholarships = await Scholarship.findAll({
            where: {
               status: "active",
               [Op.or]: [
                  { title: { [Op.iLike]: `%${searchTerm}%` } },
                  { description: { [Op.iLike]: `%${searchTerm}%` } },
                  { provider: { [Op.iLike]: `%${searchTerm}%` } },
                  { sportType: { [Op.iLike]: `%${searchTerm}%` } },
               ],
            },
            limit: parseInt(limit),
            order: [["deadline", "ASC"]],
         });

         return scholarships;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error searching scholarships: ${error.message}`, 500);
      }
   }

   /**
    * Get user's scholarship applications
    * @param {string} userId - User ID
    * @param {Object} queryParams - Query parameters
    * @returns {Promise<Object>} User's applications
    */
   async getUserApplications(userId, queryParams = {}) {
      try {
         const { page = 1, limit = 10, status } = queryParams;
         const offset = (page - 1) * limit;

         const whereClause = {};
         if (status) whereClause.status = status;

         // This would need to be implemented based on how applications are stored
         // For now, returning empty array as placeholder
         return {
            applications: [],
            pagination: {
               total: 0,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: 0,
            },
         };
      } catch (error) {
         throw new AppError(`Error retrieving user applications: ${error.message}`, 500);
      }
   }
}

module.exports = new ScholarshipService();
