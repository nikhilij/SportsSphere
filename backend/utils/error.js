/**
 * Custom error class for application errors
 * @extends Error
 */
class AppError extends Error {
   /**
    * Creates a new AppError instance
    * @param {string} message - Error message
    * @param {number} statusCode - HTTP status code
    * @param {string} code - Error code for programmatic handling
    * @param {Object} details - Additional error details
    */
   constructor(message, statusCode, code = null, details = null) {
      super(message);

      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
      this.code = code;
      this.details = details;
      this.timestamp = new Date().toISOString();

      Error.captureStackTrace(this, this.constructor);
   }

   /**
    * Convert error to JSON format for API responses
    */
   toJSON() {
      return {
         name: this.name,
         message: this.message,
         statusCode: this.statusCode,
         status: this.status,
         code: this.code,
         details: this.details,
         timestamp: this.timestamp,
         ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
      };
   }
}

class ValidationError extends AppError {
   constructor(message, field = null, value = null) {
      super(message, 400, 'VALIDATION_ERROR');
      this.name = "ValidationError";
      this.field = field;
      this.value = value;
   }
}

class AuthenticationError extends AppError {
   constructor(message = "Authentication failed") {
      super(message, 401, 'AUTH_FAILED');
      this.name = "AuthenticationError";
   }
}

class AuthorizationError extends AppError {
   constructor(message = "Access denied", requiredPermission = null) {
      super(message, 403, 'ACCESS_DENIED');
      this.name = "AuthorizationError";
      this.requiredPermission = requiredPermission;
   }
}

class NotFoundError extends AppError {
   constructor(message = "Resource not found", resource = null) {
      super(message, 404, 'RESOURCE_NOT_FOUND');
      this.name = "NotFoundError";
      this.resource = resource;
   }
}

class ConflictError extends AppError {
   constructor(message = "Resource conflict", conflictType = null) {
      super(message, 409, 'RESOURCE_CONFLICT');
      this.name = "ConflictError";
      this.conflictType = conflictType;
   }
}

class RateLimitError extends AppError {
   constructor(message = "Rate limit exceeded", retryAfter = null) {
      super(message, 429, 'RATE_LIMIT_EXCEEDED');
      this.name = "RateLimitError";
      this.retryAfter = retryAfter;
   }
}

class DatabaseError extends AppError {
   constructor(message = "Database operation failed", operation = null) {
      super(message, 500, 'DATABASE_ERROR');
      this.name = "DatabaseError";
      this.operation = operation;
   }
}

class ExternalServiceError extends AppError {
   constructor(message = "External service error", service = null, originalError = null) {
      super(message, 502, 'EXTERNAL_SERVICE_ERROR');
      this.name = "ExternalServiceError";
      this.service = service;
      this.originalError = originalError;
   }
}

class TimeoutError extends AppError {
   constructor(message = "Request timeout", timeout = null) {
      super(message, 408, 'REQUEST_TIMEOUT');
      this.name = "TimeoutError";
      this.timeout = timeout;
   }
}

class PayloadTooLargeError extends AppError {
   constructor(message = "Payload too large", maxSize = null) {
      super(message, 413, 'PAYLOAD_TOO_LARGE');
      this.name = "PayloadTooLargeError";
      this.maxSize = maxSize;
   }
}

class UnsupportedMediaTypeError extends AppError {
   constructor(message = "Unsupported media type", supportedTypes = null) {
      super(message, 415, 'UNSUPPORTED_MEDIA_TYPE');
      this.name = "UnsupportedMediaTypeError";
      this.supportedTypes = supportedTypes;
   }
}

class BusinessLogicError extends AppError {
   constructor(message, rule = null) {
      super(message, 422, 'BUSINESS_LOGIC_ERROR');
      this.name = "BusinessLogicError";
      this.rule = rule;
   }
}

class MaintenanceError extends AppError {
   constructor(message = "Service temporarily unavailable", estimatedTime = null) {
      super(message, 503, 'SERVICE_UNAVAILABLE');
      this.name = "MaintenanceError";
      this.estimatedTime = estimatedTime;
   }
}

/**
 * Error factory for creating specific error types
 */
class ErrorFactory {
   static createValidationError(field, value, message) {
      return new ValidationError(message, field, value);
   }

   static createNotFoundError(resource, id = null) {
      const message = id ? `${resource} with ID '${id}' not found` : `${resource} not found`;
      return new NotFoundError(message, resource);
   }

   static createConflictError(resource, field, value) {
      const message = `${resource} with ${field} '${value}' already exists`;
      return new ConflictError(message, 'DUPLICATE_RESOURCE');
   }

   static createDatabaseError(operation, originalError) {
      return new DatabaseError(`Database ${operation} failed: ${originalError.message}`, operation);
   }

   static createExternalServiceError(service, originalError) {
      return new ExternalServiceError(
         `${service} service error: ${originalError.message}`,
         service,
         originalError
      );
   }
}

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
   let error = { ...err };
   error.message = err.message;

   // Log error
   console.error(err);

   // Mongoose bad ObjectId
   if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new NotFoundError(message);
   }

   // Mongoose duplicate key
   if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const value = err.keyValue[field];
      error = ErrorFactory.createConflictError('Resource', field, value);
   }

   // Mongoose validation error
   if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message).join(', ');
      error = new ValidationError(message);
   }

   // JWT errors
   if (err.name === 'JsonWebTokenError') {
      error = new AuthenticationError('Invalid token');
   }

   if (err.name === 'TokenExpiredError') {
      error = new AuthenticationError('Token expired');
   }

   // Default to AppError if not already an operational error
   if (!error.isOperational) {
      error = new AppError('Something went wrong', 500, 'INTERNAL_SERVER_ERROR');
   }

   res.status(error.statusCode || 500).json({
      success: false,
      error: error.toJSON ? error.toJSON() : {
         message: error.message,
         statusCode: error.statusCode || 500,
         status: error.status || 'error'
      }
   });
};

module.exports = {
   AppError,
   ValidationError,
   AuthenticationError,
   AuthorizationError,
   NotFoundError,
   ConflictError,
   RateLimitError,
   DatabaseError,
   ExternalServiceError,
   TimeoutError,
   PayloadTooLargeError,
   UnsupportedMediaTypeError,
   BusinessLogicError,
   MaintenanceError,
   ErrorFactory,
   errorHandler
};
