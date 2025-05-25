const { body, validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/error");

// Validation middleware
const validateInput = (validations) => {
   return catchAsync(async (req, res, next) => {
      // Run all validations
      await Promise.all(validations.map((validation) => validation.run(req)));

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const errorMessages = errors.array().map((error) => error.msg);
         return next(new AppError(`Validation failed: ${errorMessages.join(", ")}`, 400));
      }

      next();
   });
};

module.exports = { validateInput };
