// PostgreSQL and MongoDB database configuration
const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("../utils/logger");

dotenv.config();

// PostgreSQL connection configuration
const sequelize = new Sequelize(
   process.env.POSTGRES_DB || "sportssphere",
   process.env.POSTGRES_USER || "postgres",
   process.env.POSTGRES_PASSWORD || "password",
   {
      host: process.env.POSTGRES_HOST || "localhost",
      port: process.env.POSTGRES_PORT || 5432,
      dialect: "postgres",
      logging: process.env.NODE_ENV === "development" ? console.log : false,
      pool: {
         max: 10,
         min: 0,
         acquire: 30000,
         idle: 10000,
      },
      define: {
         timestamps: true,
         underscored: false,
      },
   }
);

// MongoDB connection
const connectMongoDB = async () => {
   try {
      const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/sportssphere";
      await mongoose.connect(mongoURI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      logger.info("MongoDB connected successfully");
   } catch (error) {
      logger.error("MongoDB connection failed:", error);
      process.exit(1);
   }
};

// Test PostgreSQL connection
const testConnection = async () => {
   try {
      await sequelize.authenticate();
      logger.info("PostgreSQL connection established successfully");
   } catch (error) {
      logger.error("Unable to connect to PostgreSQL database:", error);
      throw error;
   }
};

// Initialize database (sync models)
const initDatabase = async () => {
   try {
      // Import all models
      require("../models/postgres/User");
      require("../models/postgres/Event");
      require("../models/postgres/Club");
      require("../models/postgres/Order");
      require("../models/postgres/Scholarship");

      // Sync database (create tables)
      await sequelize.sync({
         force: process.env.NODE_ENV === "development" && process.env.DB_FORCE_SYNC === "true",
         alter: process.env.NODE_ENV === "development",
      });

      logger.info("Database synchronized successfully");
   } catch (error) {
      logger.error("Database synchronization failed:", error);
      throw error;
   }
};

// Graceful shutdown
const closeConnections = async () => {
   try {
      await sequelize.close();
      await mongoose.connection.close();
      logger.info("Database connections closed");
   } catch (error) {
      logger.error("Error closing database connections:", error);
   }
};

module.exports = {
   sequelize,
   mongoose,
   connectMongoDB,
   testConnection,
   initDatabase,
   closeConnections,
};
