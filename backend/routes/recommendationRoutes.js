const express = require("express");
const { body } = require("express-validator");
const recommendationController = require("../controllers/recommendationController");
const { jwtAuth } = require("../middlewares/authMiddleware");
const { validateInput } = require("../middlewares/validationMiddleware");
const { rateLimiter } = require("../middlewares/rateLimiter");
const { roleBasedAccess } = require("../middlewares/roleMiddleware");

const router = express.Router();

// Get personalized recommendations for the logged-in user
router.get("/personalized", jwtAuth, recommendationController.getPersonalizedRecommendations);

// Get events similar to a specific event
router.get("/events/:eventId/similar", recommendationController.getSimilarEvents);

// Get event recommendations based on user interests (legacy)
router.get("/events", recommendationController.getRecommendedEvents);

// Get community recommendations based on user interests
router.get("/communities", recommendationController.getRecommendedCommunities);

// Get trending content recommendations
router.get("/trending", recommendationController.getTrendingEvents);

module.exports = router;
