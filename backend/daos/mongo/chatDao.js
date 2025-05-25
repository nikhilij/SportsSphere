const Chat = require("../../models/mongo/Chat");
const catchAsync = require("../../utils/catchAsync");

class ChatDao {
   // Create a new chat
   static createChat = catchAsync(async (chatData) => {
      const chat = await Chat.create(chatData);
      return chat;
   });

   // Get chat by ID
   static getChatById = catchAsync(async (chatId) => {
      const chat = await Chat.findById(chatId);
      return chat;
   });

   // Get all chats for a user
   static getChatsByUserId = catchAsync(async (userId) => {
      const chats = await Chat.find({ participants: userId });
      return chats;
   });

   // Update a chat
   static updateChat = catchAsync(async (chatId, updateData) => {
      const chat = await Chat.findByIdAndUpdate(chatId, updateData, {
         new: true,
         runValidators: true,
      });
      return chat;
   });

   // Delete a chat
   static deleteChat = catchAsync(async (chatId) => {
      const chat = await Chat.findByIdAndDelete(chatId);
      return chat;
   });
}

module.exports = ChatDao;
