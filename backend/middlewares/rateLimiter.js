const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const redis = require("../config/redis");
const logger = require("../utils/logger");

// General rate limiter
const generalLimiter = rateLimit({
   store: new RedisStore({
      sendCommand: (...args) => redis.call(...args),
   }),
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100, // limit each IP to 100 requests per windowMs
   message: {
      error: "Too many requests from this IP, please try again later.",
   },
   standardHeaders: true,
   legacyHeaders: false,
   handler: (req, res) => {
      logger.logSecurity("Rate limit exceeded", req.user?.id, req.ip, {
         url: req.originalUrl,
         userAgent: req.get("User-Agent"),
      });
      res.status(429).json({
         error: "Too many requests from this IP, please try again later.",
      });
   },
});

// Strict rate limiter for auth endpoints
const authLimiter = rateLimit({
   store: new RedisStore({
      sendCommand: (...args) => redis.call(...args),
   }),
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 5, // limit each IP to 5 requests per windowMs
   skipSuccessfulRequests: true,
   message: {
      error: "Too many authentication attempts, please try again later.",
   },
   handler: (req, res) => {
      logger.logSecurity("Auth rate limit exceeded", req.body?.email, req.ip, {
         url: req.originalUrl,
      });
      res.status(429).json({
         error: "Too many authentication attempts, please try again later.",
      });
   },
});

module.exports = {
   generalLimiter,
   authLimiter,
};
