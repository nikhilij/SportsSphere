// PostgreSQL database configuration
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const logger = require("../utils/logger");

dotenv.config();

// PostgreSQL connection configuration
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT || 5432,
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? (msg) => logger.debug(msg) : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    logger.info("PostgreSQL connection has been established successfully");
    return true;
  } catch (error) {
    logger.error("Unable to connect to PostgreSQL database:", error);
    return false;
  }
}

// Initialize database
async function initDatabase() {
  if (process.env.NODE_ENV !== "production") {
    try {
      // Synchronize models with database (don't use force: true in production!)
      await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
      logger.info("Database synchronized");
    } catch (error) {
      logger.error("Failed to synchronize database:", error);
    }
  }
}

module.exports = sequelize;
module.exports.testConnection = testConnection;
module.exports.initDatabase = initDatabase;
