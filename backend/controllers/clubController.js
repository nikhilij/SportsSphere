const clubService = require("../services/clubService");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");

// Get all clubs
exports.getAllClubs = catchAsync(async (req, res, next) => {
   const result = await clubService.getAllClubs(req.query);

   res.status(200).json({
      status: "success",
      results: result.clubs.length,
      pagination: result.pagination,
      data: {
         clubs: result.clubs,
      },
   });
});

// Get a single club
exports.getClub = catchAsync(async (req, res, next) => {
   const club = await clubService.getClubById(req.params.id);

   res.status(200).json({
      status: "success",
      data: {
         club,
      },
   });
});

// Create a new club
exports.createClub = catchAsync(async (req, res, next) => {
   const club = await clubService.createClub(req.body, req.user.id);

   res.status(201).json({
      status: "success",
      data: {
         club,
      },
   });
});

// Update a club
exports.updateClub = catchAsync(async (req, res, next) => {
   const club = await clubService.updateClub(req.params.id, req.body, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         club,
      },
   });
});

// Delete a club
exports.deleteClub = catchAsync(async (req, res, next) => {
   await clubService.deleteClub(req.params.id, req.user.id);

   res.status(204).json({
      status: "success",
      data: null,
   });
});

// Join a club
exports.joinClub = catchAsync(async (req, res, next) => {
   const club = await clubService.joinClub(req.params.id, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         club,
      },
   });
});

// Leave a club
exports.leaveClub = catchAsync(async (req, res, next) => {
   const club = await clubService.leaveClub(req.params.id, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         club,
      },
   });
});

// Search clubs by name or sport
exports.searchClubs = catchAsync(async (req, res, next) => {
   const { query } = req.query;

   if (!query) {
      return next(new AppError("Please provide a search query", 400));
   }

   const clubs = await clubService.searchClubs(query);

   res.status(200).json({
      status: "success",
      results: clubs.length,
      data: {
         clubs,
      },
   });
});

// Get popular clubs (by member count)
exports.getPopularClubs = catchAsync(async (req, res, next) => {
   const result = await clubService.getAllClubs({
      sortBy: "memberCount",
      order: "desc",
      limit: req.query.limit || 5,
   });

   res.status(200).json({
      status: "success",
      results: result.clubs.length,
      data: {
         clubs: result.clubs,
      },
   });
});

// Get clubs by sport type
exports.getClubsBySport = catchAsync(async (req, res, next) => {
   const result = await clubService.getClubsBySport(req.params.sportType, req.query);

   res.status(200).json({
      status: "success",
      results: result.clubs.length,
      pagination: result.pagination,
      data: {
         clubs: result.clubs,
      },
   });
});

// Add an administrator to club
exports.addAdministrator = catchAsync(async (req, res, next) => {
   const club = await clubService.addAdministrator(req.params.id, req.body.adminId, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         club,
      },
   });
});

// Get club members
exports.getClubMembers = catchAsync(async (req, res, next) => {
   const club = await clubService.getClubById(req.params.id);

   res.status(200).json({
      status: "success",
      data: {
         members: club.members,
      },
   });
});
