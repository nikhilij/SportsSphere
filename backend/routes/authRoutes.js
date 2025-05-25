const express = require("express");
const authController = require("../controllers/authController");
const { authLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// Apply rate limiting to auth routes
router.use(authLimiter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);
router.patch("/update-password", authController.protect, authController.updatePassword);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/resend-verification", authController.resendVerification);

// Protect all routes after this middleware
router.use(authController.protect);

router.get("/me", authController.getMe);
router.patch("/update-me", authController.updateMe);
router.delete("/delete-me", authController.deleteMe);

module.exports = router;
