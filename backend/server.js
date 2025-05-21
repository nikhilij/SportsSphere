const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { initSocket } = require("./config/socket");
const logger = require("./utils/logger");

// Load environment variables
dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io
initSocket(server);

// Set port
const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...", err);
  process.exit(1);
});

// Start server
const serverInstance = server.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...", err);
  serverInstance.close(() => {
    process.exit(1);
  });
});
