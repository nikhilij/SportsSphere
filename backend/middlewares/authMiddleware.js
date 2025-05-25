const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/postgres/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");

// Create and export the jwtAuth middleware
const jwtAuth = catchAsync(async (req, res, next) => {
   // 1) Getting token and check if it's there
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
   } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
   }

   if (!token) {
      return next(new AppError("You are not logged in! Please log in to get access.", 401));
   }

   // 2) Verification token
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

   // 3) Check if user still exists
   const currentUser = await User.findByPk(decoded.id);
   if (!currentUser) {
      return next(new AppError("The user belonging to this token does no longer exist.", 401));
   }

   // 4) Check if user changed password after the token was issued
   if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError("User recently changed password! Please log in again.", 401));
   }

   // Grant access to protected route
   req.user = currentUser;
   res.locals.user = currentUser;
   next();
});

// Optional authentication middleware - doesn't throw error if no token
const optionalAuth = catchAsync(async (req, res, next) => {
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
   } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
   }

   if (!token) {
      return next();
   }

   try {
      // Verification token
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      // Check if user still exists
      const currentUser = await User.findByPk(decoded.id);
      if (!currentUser) {
         return next();
      }

      // Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
         return next();
      }

      // Grant access to protected route
      req.user = currentUser;
      res.locals.user = currentUser;
   } catch (error) {
      // If token is invalid, just continue without user
      return next();
   }

   next();
});

module.exports = { jwtAuth, optionalAuth };
