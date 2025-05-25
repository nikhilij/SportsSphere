const User = require("../models/postgres/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { AppError, ValidationError, AuthenticationError } = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const logger = require("../utils/logger");

// Create JWT token
const signToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "90d",
   });
};

// Send token as response
const createSendToken = (user, statusCode, res) => {
   const token = signToken(user.id);

   const cookieOptions = {
      expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
   };

   user.password = undefined; // Remove password from output
   user.loginAttempts = undefined;
   user.lockUntil = undefined;

   res.cookie("jwt", token, cookieOptions);

   res.status(statusCode).json({
      status: "success",
      token,
      data: {
         user,
      },
   });
};

exports.signup = catchAsync(async (req, res, next) => {
   const { name, email, password, passwordConfirm, role, dateOfBirth, phone, sportsPreferences } = req.body;

   // Validation
   if (!name || !email || !password || !passwordConfirm) {
      return next(new ValidationError("All required fields must be provided"));
   }

   if (password !== passwordConfirm) {
      return next(new ValidationError("Passwords do not match"));
   }

   if (password.length < 6) {
      return next(new ValidationError("Password must be at least 6 characters long"));
   }

   // Check if user already exists
   const existingUser = await User.findOne({ where: { email } });
   if (existingUser) {
      return next(new ValidationError("User with this email already exists"));
   }

   try {
      const newUser = await User.create({
         name,
         email,
         password,
         role: role === "admin" ? "user" : role || "user", // Prevent admin signup via API
         dateOfBirth,
         phone,
         sportsPreferences: sportsPreferences || [],
         isActive: true,
         isVerified: false,
      });

      // Generate email verification token
      if (newUser.createEmailVerificationToken) {
         const verificationToken = newUser.createEmailVerificationToken();
         await newUser.save({ validate: false });

         // Send verification email
         try {
            const verifyURL = `${req.protocol}://${req.get("host")}/api/auth/verify-email/${verificationToken}`;
            await sendEmail({
               email: newUser.email,
               subject: "Welcome to SportsSphere - Verify your email",
               message: `Please click this link to verify your email: ${verifyURL}`,
            });
         } catch (err) {
            logger.error("Error sending verification email:", err);
            // Don't fail registration if email fails
         }
      }

      logger.info(`New user registered: ${newUser.email}`);
      createSendToken(newUser, 201, res);
   } catch (error) {
      logger.error("User registration failed:", error);

      if (error.name === "SequelizeValidationError") {
         const messages = error.errors.map((err) => err.message);
         return next(new ValidationError(messages.join(". ")));
      }

      if (error.name === "SequelizeUniqueConstraintError") {
         return next(new ValidationError("User with this email already exists"));
      }

      return next(new AppError("Registration failed. Please try again.", 500));
   }
});

exports.login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return next(new ValidationError("Please provide email and password"));
   }

   const user = await User.findOne({
      where: { email },
      attributes: { include: ["password", "loginAttempts", "lockUntil"] },
   });

   // Check if account is locked
   if (user && user.lockUntil && user.lockUntil > new Date()) {
      logger.logSecurity("Login attempt on locked account", user.id, req.ip);
      return next(new AuthenticationError("Account temporarily locked due to too many failed login attempts"));
   }

   if (!user || !(await user.correctPassword(password, user.password))) {
      if (user) {
         // Increment login attempts
         user.loginAttempts = (user.loginAttempts || 0) + 1;

         // Lock account after 5 failed attempts
         if (user.loginAttempts >= 5) {
            user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
            logger.logSecurity("Account locked due to failed attempts", user.id, req.ip);
         }

         await user.save({ validate: false });
      }

      logger.logSecurity("Failed login attempt", email, req.ip);
      return next(new AuthenticationError("Incorrect email or password"));
   }

   // Reset login attempts on successful login
   if (user.loginAttempts > 0) {
      user.loginAttempts = 0;
      user.lockUntil = null;
   }

   user.lastLogin = new Date();
   await user.save({ validate: false });

   logger.info(`User logged in: ${user.email}`);
   createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
   res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
   });

   res.status(200).json({
      status: "success",
      message: "Logged out successfully",
   });
};

exports.protect = catchAsync(async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
   } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
   }

   if (!token) {
      return next(new AuthenticationError("You are not logged in! Please log in to get access."));
   }

   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

   const currentUser = await User.findByPk(decoded.id);
   if (!currentUser) {
      return next(new AuthenticationError("The user belonging to this token no longer exists."));
   }

   if (!currentUser.isActive) {
      return next(new AuthenticationError("Your account has been deactivated."));
   }

   if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new AuthenticationError("User recently changed password! Please log in again."));
   }

   req.user = currentUser;
   res.locals.user = currentUser;
   next();
});

exports.restrictTo = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return next(new AuthenticationError("You do not have permission to perform this action"));
      }
      next();
   };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
   const user = await User.findOne({ where: { email: req.body.email } });
   if (!user) {
      return next(new ValidationError("There is no user with that email address."));
   }

   const resetToken = user.createPasswordResetToken();
   await user.save({ validate: false });

   try {
      const resetURL = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

      await sendEmail({
         email: user.email,
         subject: "Your password reset token (valid for 10 min)",
         message: `Forgot your password? Click this link to reset: ${resetURL}`,
      });

      res.status(200).json({
         status: "success",
         message: "Token sent to email!",
      });
   } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validate: false });

      return next(new AppError("There was an error sending the email. Try again later!", 500));
   }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
   const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

   const user = await User.findOne({
      where: {
         passwordResetToken: hashedToken,
         passwordResetExpires: { [Op.gt]: new Date() },
      },
   });

   if (!user) {
      return next(new ValidationError("Token is invalid or has expired"));
   }

   user.password = req.body.password;
   user.passwordResetToken = null;
   user.passwordResetExpires = null;
   await user.save();

   logger.info(`Password reset successful: ${user.email}`);
   createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
   const user = await User.findByPk(req.user.id, {
      attributes: { include: ["password"] },
   });

   if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return next(new ValidationError("Your current password is wrong."));
   }

   user.password = req.body.password;
   await user.save();

   createSendToken(user, 200, res);
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
   const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

   const user = await User.findOne({
      where: {
         emailVerificationToken: hashedToken,
         emailVerificationExpires: { [Op.gt]: new Date() },
      },
   });

   if (!user) {
      return next(new ValidationError("Token is invalid or has expired"));
   }

   user.isVerified = true;
   user.emailVerificationToken = null;
   user.emailVerificationExpires = null;
   await user.save({ validate: false });

   res.status(200).json({
      status: "success",
      message: "Email verified successfully!",
   });
});

exports.getMe = catchAsync(async (req, res, next) => {
   const user = await User.findByPk(req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         user,
      },
   });
});

exports.updateMe = catchAsync(async (req, res, next) => {
   // 1) Create error if user POSTs password data
   if (req.body.password || req.body.passwordConfirm) {
      return next(new ValidationError("This route is not for password updates. Please use /update-password."));
   }

   // 2) Filter out unwanted fields
   const allowedFields = ["name", "phone", "dateOfBirth", "address", "sportsPreferences"];
   const filteredBody = {};

   Object.keys(req.body).forEach((el) => {
      if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
   });

   // 3) Update user document
   await req.user.update(filteredBody);
   const updatedUser = await User.findByPk(req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         user: updatedUser,
      },
   });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
   await req.user.update({ isActive: false });

   res.status(204).json({
      status: "success",
      data: null,
   });
});

module.exports = exports;
