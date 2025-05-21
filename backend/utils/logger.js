const winston = require("winston");
const path = require("path");
const fs = require("fs");

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log formats
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const fileFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

// Create logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.json(),
  defaultMeta: { service: "sportssphere-backend" },
  transports: [
    // Console transport for all environments
    new winston.transports.Console({
      format: consoleFormat,
    }),
    // File transports only in non-test environments
    ...(process.env.NODE_ENV !== "test"
      ? [
          // Write all logs with importance level of 'error' or less to error.log
          new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
            format: fileFormat,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
          // Write all logs to combined.log
          new winston.transports.File({
            filename: path.join(logDir, "combined.log"),
            format: fileFormat,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
        ]
      : []),
  ],
});

// Create a stream object with a 'write' function for Morgan
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
