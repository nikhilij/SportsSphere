const storeService = require("../services/storeService");
const catchAsync = require("../utils/catchAsync");

// Get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
   const result = await storeService.getAllProducts(req.query);

   res.status(200).json({
      status: "success",
      results: result.products.length,
      pagination: result.pagination,
      data: {
         products: result.products,
      },
   });
});

// Get a single product
exports.getProduct = catchAsync(async (req, res, next) => {
   const product = await storeService.getProductById(req.params.id);

   res.status(200).json({
      status: "success",
      data: {
         product,
      },
   });
});

// Create a new product
exports.createProduct = catchAsync(async (req, res, next) => {
   const product = await storeService.createProduct(req.body);

   res.status(201).json({
      status: "success",
      data: {
         product,
      },
   });
});

// Update a product
exports.updateProduct = catchAsync(async (req, res, next) => {
   const product = await storeService.updateProduct(req.params.id, req.body);

   res.status(200).json({
      status: "success",
      data: {
         product,
      },
   });
});

// Delete a product
exports.deleteProduct = catchAsync(async (req, res, next) => {
   await storeService.deleteProduct(req.params.id);

   res.status(204).json({
      status: "success",
      data: null,
   });
});

// Search products
exports.searchProducts = catchAsync(async (req, res, next) => {
   const result = await storeService.searchProducts(req.query.q, req.query);

   res.status(200).json({
      status: "success",
      results: result.products.length,
      pagination: result.pagination,
      data: {
         products: result.products,
      },
   });
});

// Get products by category
exports.getProductsByCategory = catchAsync(async (req, res, next) => {
   const result = await storeService.getProductsByCategory(req.params.categoryId, req.query);

   res.status(200).json({
      status: "success",
      results: result.products.length,
      pagination: result.pagination,
      data: {
         products: result.products,
      },
   });
});

// Cart operations
exports.addToCart = catchAsync(async (req, res, next) => {
   const cartItem = await storeService.addToCart(req.user.id, req.body.productId, req.body.quantity);

   res.status(201).json({
      status: "success",
      data: {
         cartItem,
      },
   });
});

exports.getCart = catchAsync(async (req, res, next) => {
   const cart = await storeService.getCart(req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         cart,
      },
   });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
   const cartItem = await storeService.updateCartItem(req.params.itemId, req.body.quantity);

   res.status(200).json({
      status: "success",
      data: {
         cartItem,
      },
   });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
   await storeService.removeFromCart(req.params.itemId);

   res.status(204).json({
      status: "success",
      data: null,
   });
});

exports.clearCart = catchAsync(async (req, res, next) => {
   await storeService.clearCart(req.user.id);

   res.status(204).json({
      status: "success",
      data: null,
   });
});

// Order operations
exports.createOrder = catchAsync(async (req, res, next) => {
   const order = await storeService.createOrder(req.user.id, req.body);

   res.status(201).json({
      status: "success",
      data: {
         order,
      },
   });
});

exports.getOrders = catchAsync(async (req, res, next) => {
   const result = await storeService.getOrders(req.user.id, req.query);

   res.status(200).json({
      status: "success",
      results: result.orders.length,
      pagination: result.pagination,
      data: {
         orders: result.orders,
      },
   });
});

exports.getOrder = catchAsync(async (req, res, next) => {
   const order = await storeService.getOrderById(req.params.id, req.user.id);

   res.status(200).json({
      status: "success",
      data: {
         order,
      },
   });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
   const order = await storeService.updateOrderStatus(req.params.id, req.body.status);

   res.status(200).json({
      status: "success",
      data: {
         order,
      },
   });
});

// Review operations
exports.addReview = catchAsync(async (req, res, next) => {
   const review = await storeService.addReview(req.params.productId, req.user.id, req.body);

   res.status(201).json({
      status: "success",
      data: {
         review,
      },
   });
});

exports.getProductReviews = catchAsync(async (req, res, next) => {
   const result = await storeService.getProductReviews(req.params.productId, req.query);

   res.status(200).json({
      status: "success",
      results: result.reviews.length,
      pagination: result.pagination,
      data: {
         reviews: result.reviews,
      },
   });
});

// Category operations
exports.getAllCategories = catchAsync(async (req, res, next) => {
   const categories = await storeService.getAllCategories();

   res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
         categories,
      },
   });
});

exports.createCategory = catchAsync(async (req, res, next) => {
   const category = await storeService.createCategory(req.body);

   res.status(201).json({
      status: "success",
      data: {
         category,
      },
   });
});
