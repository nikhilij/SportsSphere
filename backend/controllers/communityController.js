const communityService = require("../services/communityService");
const catchAsync = require("../utils/catchAsync");

// Get all communities
exports.getAllCommunities = catchAsync(async (req, res, next) => {
   const result = await communityService.getAllCommunities(req.query);

   res.status(200).json({
      status: "success",
      results: result.communities.length,
      pagination: result.pagination,
      data: {
         communities: result.communities,
      },
   });
});

// Get a single community
exports.getCommunity = catchAsync(async (req, res, next) => {
   const community = await communityService.getCommunityById(req.params.id);

   res.status(200).json({
      status: "success",
      data: {
         community,
      },
   });
});

// Create a new community
exports.createCommunity = catchAsync(async (req, res, next) => {
   const community = await communityService.createCommunity(req.body, req.user.id);

   res.status(201).json({
      status: "success",
      data: {
         community,
      },
   });
});

// Update a community
exports.updateCommunity = catchAsync(async (req, res, next) => {
   const community = await communityService.updateCommunity(req.params.id, req.body, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         community,
      },
   });
});

// Delete a community
exports.deleteCommunity = catchAsync(async (req, res, next) => {
   await communityService.deleteCommunity(req.params.id, req.user.id);

   res.status(204).json({
      status: "success",
      data: null,
   });
});

// Join a community
exports.joinCommunity = catchAsync(async (req, res, next) => {
   const result = await communityService.joinCommunity(req.params.id, req.user.id);

   res.status(200).json({
      status: "success",
      message: result.message,
      data: {
         community: result.community,
      },
   });
});

// Leave a community
exports.leaveCommunity = catchAsync(async (req, res, next) => {
   const result = await communityService.leaveCommunity(req.params.id, req.user.id);

   res.status(200).json({
      status: "success",
      message: result.message,
      data: {
         community: result.community,
      },
   });
});

// Get community members
exports.getCommunityMembers = catchAsync(async (req, res, next) => {
   const result = await communityService.getCommunityMembers(req.params.id, req.query);

   res.status(200).json({
      status: "success",
      results: result.members.length,
      pagination: result.pagination,
      data: {
         members: result.members,
      },
   });
});
