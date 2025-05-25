const scholarshipService = require("../services/scholarshipService");
const catchAsync = require("../utils/catchAsync");

// Get all scholarships
exports.getAllScholarships = catchAsync(async (req, res, next) => {
   const result = await scholarshipService.getScholarships(req.query);

   res.status(200).json({
      status: "success",
      results: result.data.length,
      pagination: result.pagination,
      data: {
         scholarships: result.data,
      },
   });
});

// Get a single scholarship
exports.getScholarship = catchAsync(async (req, res, next) => {
   const scholarship = await scholarshipService.getScholarshipById(req.params.id);

   res.status(200).json({
      status: "success",
      data: {
         scholarship,
      },
   });
});

// Create a new scholarship
exports.createScholarship = catchAsync(async (req, res, next) => {
   const scholarship = await scholarshipService.createScholarship(req.body, req.user.id);

   res.status(201).json({
      status: "success",
      data: {
         scholarship,
      },
   });
});

// Update a scholarship
exports.updateScholarship = catchAsync(async (req, res, next) => {
   const scholarship = await scholarshipService.updateScholarship(req.params.id, req.body, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         scholarship,
      },
   });
});

// Delete a scholarship
exports.deleteScholarship = catchAsync(async (req, res, next) => {
   await scholarshipService.deleteScholarship(req.params.id, req.user.id);

   res.status(204).json({
      status: "success",
      data: null,
   });
});

// Apply for a scholarship
exports.applyForScholarship = catchAsync(async (req, res, next) => {
   const result = await scholarshipService.applyForScholarship(req.params.id, req.user.id, req.body);

   res.status(200).json({
      status: "success",
      message: result.message,
      data: {
         application: result.application,
      },
   });
});
