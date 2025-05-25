const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const logger = require("../utils/logger");

// Connection options
const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverSelectionTimeoutMS: 5000,
   socketTimeoutMS: 45000,
};

async function connectDB(retries = 5, delay = 5000) {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI, options);
      logger.info(`MongoDB connected: ${conn.connection.host}`);

      // Add event listeners for monitoring connection
      mongoose.connection.on("error", (err) => {
         logger.error("MongoDB connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
         logger.warn("MongoDB disconnected. Attempting to reconnect...");
      });

      process.on("SIGINT", async () => {
         await mongoose.connection.close();
         logger.info("MongoDB connection closed due to application termination");
         process.exit(0);
      });
   } catch (error) {
      logger.error("MongoDB connection failed:", error);

      if (retries > 0) {
         logger.info(`Retrying connection in ${delay / 1000} seconds... (${retries} attempts remaining)`);
         setTimeout(() => connectDB(retries - 1, delay), delay);
      } else {
         logger.error("Maximum retries reached. Could not connect to MongoDB.");
         process.exit(1); // Exit the process with failure
      }
   }
}

module.exports = connectDB;
