const express = require("express");
const { body } = require("express-validator");
const scholarshipController = require("../controllers/scholarshipController");
const { jwtAuth } = require("../middlewares/auth");
const { validateInput } = require("../middlewares/validation");
const { roleBasedAccess } = require("../middlewares/access");
const { rateLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// Validation rules for scholarships
const scholarshipValidation = [
   body("title").notEmpty().withMessage("Scholarship title is required"),
   body("description").notEmpty().withMessage("Description is required"),
   body("provider").notEmpty().withMessage("Provider name is required"),
   body("sportType").notEmpty().withMessage("Sport type is required"),
   body("eligibilityCriteria").notEmpty().withMessage("Eligibility criteria is required"),
   body("amount").optional().isNumeric().withMessage("Amount must be a number"),
   body("deadline").isISO8601().withMessage("Deadline must be a valid date"),
   body("applicationUrl").optional().isURL().withMessage("Application URL must be valid"),
];

// Public routes
router.get("/", scholarshipController.getAllScholarships);
router.get("/:id", scholarshipController.getScholarship);

// Protected routes
router.post(
   "/",
   jwtAuth,
   roleBasedAccess(["admin", "coach", "organizer"]),
   validateInput(scholarshipValidation),
   scholarshipController.createScholarship
);

router.put(
   "/:id",
   jwtAuth,
   roleBasedAccess(["admin", "coach", "organizer"]),
   validateInput(scholarshipValidation),
   scholarshipController.updateScholarship
);

router.delete("/:id", jwtAuth, roleBasedAccess(["admin"]), scholarshipController.deleteScholarship);

// User application tracking
router.post("/:id/apply", jwtAuth, scholarshipController.applyForScholarship);

module.exports = router;
