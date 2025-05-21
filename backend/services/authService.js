const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const crypto = require("crypto");
const AppError = require("../utils/error");
const sendEmail = require("../utils/email");

// Create JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token as response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  user.password = undefined;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

exports.signup = async ({ name, email, password, passwordConfirm, role }) => {
  if (!name || !email || !password || !passwordConfirm) {
    throw new AppError("All fields are required for signup", 400);
  }
  const newUser = await User.create({ name, email, password, passwordConfirm, role });
  return newUser;
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }
  return user;
};

exports.logout = (res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = async (req) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    throw new AppError("You are not logged in! Please log in to get access.", 401);
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new AppError("The user belonging to this token no longer exists.", 401);
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new AppError("User recently changed password! Please log in again.", 401);
  }
  return currentUser;
};

exports.isLoggedIn = async (req) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id);
      if (!currentUser || currentUser.changedPasswordAfter(decoded.iat)) {
        return null;
      }
      return currentUser;
    } catch (err) {
      return null;
    }
  }
  return null;
};

exports.restrictTo = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new AppError("You do not have permission to perform this action", 403);
  }
  return true;
};

exports.forgotPassword = async (email, req) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("There is no user with that email address.", 404);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.
If you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    return { status: "success", message: "Token sent to email!" };
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError("There was an error sending the email. Try again later!", 500);
  }
};

exports.resetPassword = async (token, password, passwordConfirm) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new AppError("Token is invalid or has expired", 400);
  }
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return user;
};

exports.updatePassword = async (userId, passwordCurrent, password, passwordConfirm) => {
  const user = await User.findById(userId).select("+password");
  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    throw new AppError("Your current password is wrong.", 401);
  }
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  return user;
};

exports.createSendToken = createSendToken;
