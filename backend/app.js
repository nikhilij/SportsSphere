const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const clubRoutes = require("./routes/clubRoutes");
const communityRoutes = require("./routes/communityRoutes");
const eventRoutes = require("./routes/eventRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const storeRoutes = require("./routes/storeRoutes");

// Import middlewares
const corsMiddleware = require("./middlewares/cors");
const errorHandler = require("./middlewares/errorHandler");
const rateLimiter = require("./middlewares/rateLimiter");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Initialize PostgreSQL connection through Sequelize
const sequelize = require("./config/database");
const { testConnection, initDatabase } = require("./config/database");
(async () => {
  await testConnection();
  await initDatabase();
})();

// Middlewares
app.use(helmet()); // Security headers
app.use(corsMiddleware); // Custom CORS configuration
app.use(express.json({ limit: "10mb" })); // Parse JSON request body
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded request body
app.use(morgan("dev")); // HTTP request logger

// Apply rate limiter to all requests
app.use(rateLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/store", storeRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
    timestamp: new Date(),
  });
});

// Default route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to SportsSphere API",
    version: "1.0.0",
  });
});

// Handle undefined routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
