const winston = require("winston");
const path = require("path");
const fs = require("fs");
const DailyRotateFile = require("winston-daily-rotate-file");

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
   fs.mkdirSync(logDir, { recursive: true });
}

// Custom log levels
const customLevels = {
   levels: {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
      trace: 5
   },
   colors: {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'blue',
      trace: 'gray'
   }
};

winston.addColors(customLevels.colors);

// Enhanced console format with better error handling
const consoleFormat = winston.format.combine(
   winston.format.colorize({ all: true }),
   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
   winston.format.errors({ stack: true }),
   winston.format.printf(({ timestamp, level, message, requestId, duration, stack, ...meta }) => {
      const requestInfo = requestId ? `[${requestId}]` : "";
      const durationInfo = duration ? `(${duration}ms)` : "";
      const metaInfo = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : "";
      const stackInfo = stack ? `\n${stack}` : "";
      
      return `${timestamp} [${level}]${requestInfo}: ${message} ${durationInfo}${metaInfo}${stackInfo}`;
   })
);

// Enhanced file format with structured logging
const fileFormat = winston.format.combine(
   winston.format.timestamp(),
   winston.format.errors({ stack: true }),
   winston.format.json(),
   winston.format.prettyPrint()
);

// Create the main logger
const logger = winston.createLogger({
   level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug"),
   levels: customLevels.levels,
   format: fileFormat,
   defaultMeta: { 
      service: "sportssphere-backend",
      environment: process.env.NODE_ENV || "development",
      version: process.env.APP_VERSION || "1.0.0"
   },
   transports: [
      // Enhanced console transport
      new winston.transports.Console({
         format: consoleFormat,
         handleExceptions: true,
         handleRejections: true,
         level: process.env.NODE_ENV === "production" ? "info" : "debug"
      }),
      
      // File transports only in non-test environments
      ...(process.env.NODE_ENV !== "test" ? [
         // Daily rotating error logs
         new DailyRotateFile({
            filename: path.join(logDir, "error-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "error",
            format: fileFormat,
            maxSize: "20m",
            maxFiles: "14d",
            handleExceptions: true,
            handleRejections: true
         }),
         
         // Daily rotating combined logs
         new DailyRotateFile({
            filename: path.join(logDir, "app-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            format: fileFormat,
            maxSize: "20m",
            maxFiles: "7d"
         }),
         
         // Performance logs
         new DailyRotateFile({
            filename: path.join(logDir, "performance-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "info",
            format: fileFormat,
            maxSize: "10m",
            maxFiles: "3d"
         }),
         
         // Security logs
         new DailyRotateFile({
            filename: path.join(logDir, "security-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "warn",
            format: fileFormat,
            maxSize: "10m",
            maxFiles: "30d"
         }),
         
         // HTTP access logs
         new DailyRotateFile({
            filename: path.join(logDir, "access-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "http",
            format: fileFormat,
            maxSize: "10m",
            maxFiles: "7d"
         })
      ] : [])
   ],
   
   // Handle uncaught exceptions and rejections
   exceptionHandlers: process.env.NODE_ENV !== "test" ? [
      new winston.transports.File({ 
         filename: path.join(logDir, "exceptions.log"),
         format: fileFormat,
         maxsize: 5242880,
         maxFiles: 5
      })
   ] : [],
   
   rejectionHandlers: process.env.NODE_ENV !== "test" ? [
      new winston.transports.File({ 
         filename: path.join(logDir, "rejections.log"),
         format: fileFormat,
         maxsize: 5242880,
         maxFiles: 5
      })
   ] : [],
   
   exitOnError: false
});

// Enhanced helper methods
logger.logPerformance = (operation, duration, metadata = {}) => {
   logger.info(`Performance: ${operation}`, {
      operation,
      duration,
      ...metadata,
      type: "performance",
      timestamp: new Date().toISOString()
   });
};

logger.logSecurity = (event, userId = null, ip = null, details = {}) => {
   logger.warn(`Security Event: ${event}`, {
      event,
      userId,
      ip,
      userAgent: details.userAgent || null,
      ...details,
      type: "security",
      timestamp: new Date().toISOString()
   });
};

logger.logAuth = (action, userId, success, details = {}) => {
   const level = success ? "info" : "warn";
   logger[level](`Auth: ${action}`, {
      action,
      userId,
      success,
      ...details,
      type: "auth",
      timestamp: new Date().toISOString()
   });
};

logger.logDatabase = (operation, table, duration = null, error = null) => {
   const level = error ? "error" : "debug";
   logger[level](`Database: ${operation}`, {
      operation,
      table,
      duration,
      error: error?.message || null,
      type: "database",
      timestamp: new Date().toISOString()
   });
};

logger.logAPI = (method, url, statusCode, duration, userId = null, error = null) => {
   const level = statusCode >= 400 ? "warn" : "http";
   logger[level](`API: ${method} ${url}`, {
      method,
      url,
      statusCode,
      duration,
      userId,
      error: error?.message || null,
      type: "api",
      timestamp: new Date().toISOString()
   });
};

logger.logBusiness = (event, userId = null, metadata = {}) => {
   logger.info(`Business Event: ${event}`, {
      event,
      userId,
      ...metadata,
      type: "business",
      timestamp: new Date().toISOString()
   });
};

// Create context-aware child logger
logger.createChildLogger = (context = {}) => {
   return logger.child(context);
};

// Request correlation ID helper
logger.withCorrelationId = (correlationId) => {
   return logger.child({ correlationId });
};

// Create a stream object for Morgan HTTP logging
logger.stream = {
   write: (message) => {
      logger.http(message.trim());
   }
};

// Graceful shutdown
logger.shutdown = () => {
   return new Promise((resolve) => {
      logger.end();
      setTimeout(resolve, 1000); // Give time for logs to flush
   });
};

// Health check for logger
logger.healthCheck = () => {
   try {
      logger.info("Logger health check");
      return { status: "healthy", timestamp: new Date().toISOString() };
   } catch (error) {
      return { status: "unhealthy", error: error.message, timestamp: new Date().toISOString() };
   }
};

// Log level management
logger.setLogLevel = (level) => {
   if (customLevels.levels.hasOwnProperty(level)) {
      logger.level = level;
      logger.info(`Log level changed to: ${level}`);
   } else {
      logger.warn(`Invalid log level: ${level}`);
   }
};

logger.getLogLevel = () => logger.level;

// Add metadata helpers
logger.addDefaultMeta = (meta) => {
   Object.assign(logger.defaultMeta, meta);
};

// Error boundary logging
logger.logErrorBoundary = (error, context = {}) => {
   logger.error("Error Boundary Triggered", {
      error: {
         name: error.name,
         message: error.message,
         stack: error.stack
      },
      context,
      type: "error_boundary",
      timestamp: new Date().toISOString()
   });
};

// Process monitoring
process.on('uncaughtException', (error) => {
   logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
});

process.on('unhandledRejection', (reason, promise) => {
   logger.error('Unhandled Rejection', { reason, promise });
});

module.exports = logger;
