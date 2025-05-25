const redis = require("redis");
const logger = require("../utils/logger");

// Get Redis configuration from environment variables with fallbacks
const redisURL = process.env.REDIS_URL || "redis://localhost:6379";
const RETRY_MAX_ATTEMPTS = process.env.REDIS_RETRY_MAX_ATTEMPTS || 10;
const RETRY_DELAY_MS = process.env.REDIS_RETRY_DELAY_MS || 3000;

// Create Redis client with retry strategy
const client = redis.createClient({
   url: redisURL,
   retry_strategy: (options) => {
      if (options.error && options.error.code === "ECONNREFUSED") {
         logger.error("Redis server connection refused");
         return new Error("Redis server connection refused");
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
         logger.error("Redis retry time exhausted");
         return new Error("Retry time exhausted");
      }
      if (options.attempt > RETRY_MAX_ATTEMPTS) {
         logger.error(`Redis max retry attempts (${RETRY_MAX_ATTEMPTS}) exceeded`);
         return new Error("Redis max retry attempts exceeded");
      }
      // Increase delay with each attempt with some randomization
      const delay = Math.min(options.attempt * RETRY_DELAY_MS, 30000);
      return delay;
   },
});

// Handle Redis connection events
client.on("connect", () => {
   logger.info("Redis client connected");
});

client.on("ready", () => {
   logger.info("Redis client ready for use");
});

client.on("reconnecting", () => {
   logger.info("Redis client reconnecting");
});

client.on("end", () => {
   logger.info("Redis client disconnected");
});

client.on("error", (err) => {
   logger.error("Redis client error:", err);
});

// Connect to Redis
client.connect().catch((err) => {
   logger.error("Failed to connect to Redis:", err);
});

module.exports = client;
