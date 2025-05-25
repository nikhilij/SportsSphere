const jwt = require("jsonwebtoken");

/**
 * Signs a JWT token
 * @param {Object} payload - Data to be signed
 * @returns {String} JWT token
 */
exports.signToken = (payload) => {
   if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
   }

   return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "90d",
   });
};

/**
 * Creates a JWT and sends it to the client
 * @param {Object} user - User object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 */
exports.createSendToken = (user, statusCode, res) => {
   const token = this.signToken({ id: user.id });

   const cookieOptions = {
      expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
   };

   // Remove sensitive data from output
   if (user.password) user.password = undefined;
   if (user.loginAttempts) user.loginAttempts = undefined;
   if (user.lockUntil) user.lockUntil = undefined;

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
   if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
   }

   try {
      return jwt.verify(token, process.env.JWT_SECRET);
   } catch (error) {
      if (error.name === "TokenExpiredError") {
         throw new Error("Token has expired");
      } else if (error.name === "JsonWebTokenError") {
         throw new Error("Invalid token");
      } else {
         throw new Error("Token verification failed");
      }
   }
};

/**
 * Decodes a JWT token without verification (useful for getting payload)
 * @param {String} token - JWT token to decode
 * @returns {Object} Decoded token payload
 */
exports.decodeToken = (token) => {
   return jwt.decode(token);
};
