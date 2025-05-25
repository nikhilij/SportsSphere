const express = require("express");
const communityController = require("../controllers/communityController");
const jwtAuth = require("../middlewares/jwtAuth");
const roleBasedAccess = require("../middlewares/roleBasedAccess");
const validateInput = require("../middlewares/inputValidation");
const { body } = require("express-validator");
const { rateLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// Validation rules for community
const communityValidation = [
   body("name").notEmpty().withMessage("Community name is required"),
   body("description").notEmpty().withMessage("Description is required"),
   body("category").notEmpty().withMessage("Category is required"),
   body("isPublic").isBoolean().withMessage("isPublic must be a boolean value"),
   body("tags").optional().isArray().withMessage("Tags must be an array"),
];

// Public routes
router.get("/", communityController.getAllCommunities);
router.get("/:id", communityController.getCommunity);

// Protected routes
router.post("/", jwtAuth, validateInput(communityValidation), communityController.createCommunity);

router.put("/:id", jwtAuth, validateInput(communityValidation), communityController.updateCommunity);

router.delete("/:id", jwtAuth, communityController.deleteCommunity);

// Membership management
router.post("/:id/join", jwtAuth, communityController.joinCommunity);

router.post("/:id/leave", jwtAuth, communityController.leaveCommunity);

router.get("/:id/members", communityController.getCommunityMembers);

module.exports = router;
