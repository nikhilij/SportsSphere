const Forum = require("../../models/mongo/Forum");
const catchAsync = require("../../utils/catchAsync");

class ForumDao {
   // Get a forum by ID
   static getForumById = catchAsync(async (forumId) => {
      const forum = await Forum.findById(forumId);
      return forum;
   });

   // Get all forums
   static getAllForums = catchAsync(async () => {
      const forums = await Forum.find();
      return forums;
   });

   // Create a new forum
   static createForum = catchAsync(async (forumData) => {
      const forum = await Forum.create(forumData);
      return forum;
   });

   // Update a forum
   static updateForum = catchAsync(async (forumId, updateData) => {
      const forum = await Forum.findByIdAndUpdate(forumId, updateData, {
         new: true,
         runValidators: true,
      });
      return forum;
   });

   // Delete a forum
   static deleteForum = catchAsync(async (forumId) => {
      const forum = await Forum.findByIdAndDelete(forumId);
      return forum;
   });
}

module.exports = ForumDao;
