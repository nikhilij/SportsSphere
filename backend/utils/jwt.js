const jwt = require("jsonwebtoken");

/**
 * Signs a JWT token
 * @param {Object} payload - Data to be signed
 * @returns {String} JWT token
 */
exports.signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * Creates a JWT and sends it to the client as a cookie
 * @param {Object} user - User object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 */
exports.createSendToken = (user, statusCode, res) => {
  const token = this.signToken({ id: user.id });

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // Only add secure flag in production
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  // Remove password from output
  // eslint-disable-next-line no-param-reassign
  if (user.password) user.password = undefined;

  // Send JWT as cookie
  res.cookie("jwt", token, cookieOptions);

  // Send response
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

/**
 * Verifies a JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token
 */
exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
