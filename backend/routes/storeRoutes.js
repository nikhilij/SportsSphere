const express = require("express");
const { body } = require("express-validator");
const storeController = require("../controllers/storeController");
const { jwtAuth } = require("../middlewares/authMiddleware");
const { validateInput } = require("../middlewares/validation");
const { roleBasedAccess } = require("../middlewares/accessControl");
const { rateLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// Public routes for store browsing
router.get("/products", storeController.getAllProducts);
router.get("/categories", storeController.getAllCategories);
router.get("/categories/:categoryId/products", storeController.getProductsByCategory);
router.get("/products/:id", storeController.getProduct);

// Search and filter products
router.get("/search", storeController.searchProducts);

// Protected routes requiring authentication
router.post(
   "/orders",
   jwtAuth,
   validateInput([
      body("products").isArray().withMessage("Products must be an array"),
      body("shippingAddress").notEmpty().withMessage("Shipping address is required"),
      body("paymentMethod").notEmpty().withMessage("Payment method is required"),
   ]),
   storeController.createOrder
);

router.get("/orders", jwtAuth, storeController.getOrders);

router.get("/orders/:id", jwtAuth, storeController.getOrder);

// Cart management
router.post(
   "/cart",
   jwtAuth,
   validateInput([
      body("productId").notEmpty().withMessage("Product ID is required"),
      body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
   ]),
   storeController.addToCart
);

router.get("/cart", jwtAuth, storeController.getCart);

router.put(
   "/cart/:itemId",
   jwtAuth,
   validateInput([body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1")]),
   storeController.updateCartItem
);

router.delete("/cart/:itemId", jwtAuth, storeController.removeFromCart);

router.delete("/cart", jwtAuth, storeController.clearCart);

// Reviews and ratings
router.post(
   "/products/:productId/reviews",
   jwtAuth,
   rateLimiter({ windowMs: 60 * 60 * 1000, max: 5 }),
   validateInput([
      body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
      body("comment").isString().optional(),
   ]),
   storeController.addReview
);

router.get("/products/:productId/reviews", storeController.getProductReviews);

// Admin routes for product management
router.post(
   "/products",
   jwtAuth,
   roleBasedAccess(["admin"]),
   validateInput([
      body("name").notEmpty().withMessage("Product name is required"),
      body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
      body("description").notEmpty().withMessage("Description is required"),
      body("categoryId").notEmpty().withMessage("Category is required"),
      body("stockQuantity").isInt({ min: 0 }).withMessage("Stock quantity must be a positive number"),
   ]),
   storeController.createProduct
);

router.put("/products/:id", jwtAuth, roleBasedAccess(["admin"]), storeController.updateProduct);

router.delete("/products/:id", jwtAuth, roleBasedAccess(["admin"]), storeController.deleteProduct);

router.post(
   "/categories",
   jwtAuth,
   roleBasedAccess(["admin"]),
   validateInput([body("name").notEmpty().withMessage("Category name is required"), body("description").optional()]),
   storeController.createCategory
);

// Order management for admins
router.put(
   "/orders/:id/status",
   jwtAuth,
   roleBasedAccess(["admin"]),
   validateInput([
      body("status").isIn(["processing", "shipped", "delivered", "cancelled"]).withMessage("Invalid status"),
   ]),
   storeController.updateOrderStatus
);

module.exports = router;
