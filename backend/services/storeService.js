const Product = require("../models/postgres/Product");
const Order = require("../models/postgres/Order");
const Cart = require("../models/postgres/Cart");
const Category = require("../models/postgres/Category");
const Review = require("../models/postgres/Review");
const { AppError, NotFoundError, ValidationError, AuthorizationError } = require("../utils/error");
const { Op } = require("sequelize");

class StoreService {
   /**
    * Get all products with optional filtering
    * @param {Object} filters - Filter options
    * @returns {Promise<Object>} Products with pagination
    */
   async getProducts(filters = {}) {
      try {
         const {
            category,
            search,
            minPrice,
            maxPrice,
            inStock,
            featured,
            sortBy = "createdAt",
            order = "DESC",
            page = 1,
            limit = 20,
         } = filters;

         const where = {};

         if (category) {
            where.categoryId = category;
         }

         if (search) {
            where[Op.or] = [{ name: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }];
         }

         if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
         }

         if (inStock === true) {
            where.stockQuantity = { [Op.gt]: 0 };
         }

         if (featured === true) {
            where.isFeatured = true;
         }

         const offset = (parseInt(page) - 1) * parseInt(limit);

         const { count, rows } = await Product.findAndCountAll({
            where,
            include: [
               { model: Category, attributes: ["id", "name"] },
               { model: Review, attributes: ["rating"], required: false },
            ],
            order: [[sortBy, order.toUpperCase()]],
            limit: parseInt(limit),
            offset,
            distinct: true,
         });

         return {
            products: rows,
            pagination: {
               total: count,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(count / parseInt(limit)),
            },
         };
      } catch (error) {
         throw new AppError(`Error fetching products: ${error.message}`, 500);
      }
   }

   /**
    * Get a product by ID
    * @param {string} productId - The product ID
    * @returns {Promise<Object>} Product object
    */
   async getProductById(productId) {
      try {
         const product = await Product.findByPk(productId, {
            include: [
               { model: Category, attributes: ["id", "name"] },
               {
                  model: Review,
                  attributes: ["id", "rating", "comment", "createdAt"],
                  include: [{ model: require("../models/postgres/User"), attributes: ["name"] }],
               },
            ],
         });
         if (!product) {
            throw new NotFoundError("Product not found");
         }

         return product;
      } catch (error) {
         if (error instanceof AppError) throw error;
         throw new AppError(`Error fetching product: ${error.message}`, 500);
      }
   }

   /**
    * Create a new product
    * @param {Object} productData - Product data
    * @param {string} userId - User ID creating the product
    * @returns {Promise<Object>} Created product
    */
   async createProduct(productData, userId) {
      try {
         const product = await Product.create({
            ...productData,
            createdBy: userId,
         });

         return await this.getProductById(product.id);
      } catch (error) {
         throw new AppError(`Error creating product: ${error.message}`, 500);
      }
   }

   /**
    * Update a product
    * @param {string} productId - Product ID
    * @param {Object} updateData - Data to update
    * @param {string} userId - User ID making the request
    * @returns {Promise<Object>} Updated product
    */
   async updateProduct(productId, updateData, userId) {
      try {
         const product = await Product.findByPk(productId);

         if (!product) {
            throw new ErrorResponse("Product not found", 404);
         }

         await product.update(updateData);
         return await this.getProductById(productId);
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error updating product: ${error.message}`, 500);
      }
   }

   /**
    * Delete a product
    * @param {string} productId - Product ID
    * @param {string} userId - User ID making the request
    * @returns {Promise<boolean>} Success indicator
    */
   async deleteProduct(productId, userId) {
      try {
         const product = await Product.findByPk(productId);

         if (!product) {
            throw new ErrorResponse("Product not found", 404);
         }

         await product.destroy();
         return true;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error deleting product: ${error.message}`, 500);
      }
   }

   /**
    * Get all categories
    * @returns {Promise<Array>} Array of categories
    */
   async getCategories() {
      try {
         const categories = await Category.findAll({
            attributes: ["id", "name", "description"],
            order: [["name", "ASC"]],
         });

         return categories;
      } catch (error) {
         throw new ErrorResponse(`Error fetching categories: ${error.message}`, 500);
      }
   }

   /**
    * Create a new order
    * @param {Object} orderData - Order data
    * @param {string} userId - User ID
    * @returns {Promise<Object>} Created order
    */
   async createOrder(orderData, userId) {
      try {
         const order = await Order.create({
            ...orderData,
            userId,
            status: "pending",
         });

         return await this.getOrderById(order.id, userId);
      } catch (error) {
         throw new ErrorResponse(`Error creating order: ${error.message}`, 500);
      }
   }

   /**
    * Get order by ID
    * @param {string} orderId - Order ID
    * @param {string} userId - User ID
    * @returns {Promise<Object>} Order object
    */
   async getOrderById(orderId, userId) {
      try {
         const where = { id: orderId };
         if (userId) where.userId = userId;

         const order = await Order.findOne({
            where,
            include: [
               {
                  model: Product,
                  attributes: ["id", "name", "price", "imageUrl"],
                  through: { attributes: ["quantity", "price"] },
               },
            ],
         });

         if (!order) {
            throw new ErrorResponse("Order not found", 404);
         }

         return order;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error fetching order: ${error.message}`, 500);
      }
   }

   /**
    * Get user orders
    * @param {string} userId - User ID
    * @param {Object} options - Query options
    * @returns {Promise<Object>} Orders with pagination
    */
   async getUserOrders(userId, options = {}) {
      try {
         const { page = 1, limit = 10, status } = options;
         const where = { userId };

         if (status) where.status = status;

         const offset = (parseInt(page) - 1) * parseInt(limit);

         const { count, rows } = await Order.findAndCountAll({
            where,
            include: [
               {
                  model: Product,
                  attributes: ["id", "name", "price", "imageUrl"],
                  through: { attributes: ["quantity", "price"] },
               },
            ],
            order: [["createdAt", "DESC"]],
            limit: parseInt(limit),
            offset,
         });

         return {
            orders: rows,
            pagination: {
               total: count,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(count / parseInt(limit)),
            },
         };
      } catch (error) {
         throw new ErrorResponse(`Error fetching user orders: ${error.message}`, 500);
      }
   }

   /**
    * Update order status
    * @param {string} orderId - Order ID
    * @param {string} status - New status
    * @returns {Promise<Object>} Updated order
    */
   async updateOrderStatus(orderId, status) {
      try {
         const order = await Order.findByPk(orderId);

         if (!order) {
            throw new ErrorResponse("Order not found", 404);
         }

         await order.update({ status });
         return await this.getOrderById(orderId);
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error updating order status: ${error.message}`, 500);
      }
   }

   /**
    * Add item to cart
    * @param {string} userId - User ID
    * @param {string} productId - Product ID
    * @param {number} quantity - Quantity
    * @returns {Promise<Object>} Cart item
    */
   async addToCart(userId, productId, quantity) {
      try {
         const product = await Product.findByPk(productId);

         if (!product) {
            throw new ErrorResponse("Product not found", 404);
         }

         if (product.stockQuantity < quantity) {
            throw new ErrorResponse("Insufficient stock", 400);
         }

         const [cartItem, created] = await Cart.findOrCreate({
            where: { userId, productId },
            defaults: { quantity },
         });

         if (!created) {
            cartItem.quantity += quantity;
            await cartItem.save();
         }

         return await Cart.findByPk(cartItem.id, {
            include: [{ model: Product, attributes: ["id", "name", "price", "imageUrl"] }],
         });
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error adding to cart: ${error.message}`, 500);
      }
   }

   /**
    * Get user cart
    * @param {string} userId - User ID
    * @returns {Promise<Array>} Cart items
    */
   async getCart(userId) {
      try {
         const cartItems = await Cart.findAll({
            where: { userId },
            include: [{ model: Product, attributes: ["id", "name", "price", "imageUrl", "stockQuantity"] }],
         });

         return cartItems;
      } catch (error) {
         throw new ErrorResponse(`Error fetching cart: ${error.message}`, 500);
      }
   }

   /**
    * Update cart item quantity
    * @param {string} cartItemId - Cart item ID
    * @param {number} quantity - New quantity
    * @param {string} userId - User ID
    * @returns {Promise<Object>} Updated cart item
    */
   async updateCartItem(cartItemId, quantity, userId) {
      try {
         const cartItem = await Cart.findOne({
            where: { id: cartItemId, userId },
         });

         if (!cartItem) {
            throw new ErrorResponse("Cart item not found", 404);
         }

         await cartItem.update({ quantity });

         return await Cart.findByPk(cartItemId, {
            include: [{ model: Product, attributes: ["id", "name", "price", "imageUrl"] }],
         });
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error updating cart item: ${error.message}`, 500);
      }
   }

   /**
    * Remove item from cart
    * @param {string} cartItemId - Cart item ID
    * @param {string} userId - User ID
    * @returns {Promise<boolean>} Success indicator
    */
   async removeCartItem(cartItemId, userId) {
      try {
         const cartItem = await Cart.findOne({
            where: { id: cartItemId, userId },
         });

         if (!cartItem) {
            throw new ErrorResponse("Cart item not found", 404);
         }

         await cartItem.destroy();
         return true;
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error removing cart item: ${error.message}`, 500);
      }
   }

   /**
    * Add product review
    * @param {string} productId - Product ID
    * @param {Object} reviewData - Review data
    * @param {string} userId - User ID
    * @returns {Promise<Object>} Created review
    */
   async addProductReview(productId, reviewData, userId) {
      try {
         const product = await Product.findByPk(productId);

         if (!product) {
            throw new ErrorResponse("Product not found", 404);
         }

         // Check if user already reviewed this product
         const existingReview = await Review.findOne({
            where: { productId, userId },
         });

         if (existingReview) {
            throw new ErrorResponse("You have already reviewed this product", 400);
         }

         const review = await Review.create({
            ...reviewData,
            productId,
            userId,
         });

         return await Review.findByPk(review.id, {
            include: [{ model: require("../models/postgres/User"), attributes: ["name"] }],
         });
      } catch (error) {
         if (error instanceof ErrorResponse) throw error;
         throw new ErrorResponse(`Error adding review: ${error.message}`, 500);
      }
   }

   /**
    * Get product reviews
    * @param {string} productId - Product ID
    * @param {Object} options - Query options
    * @returns {Promise<Object>} Reviews with pagination
    */
   async getProductReviews(productId, options = {}) {
      try {
         const { page = 1, limit = 10 } = options;
         const offset = (parseInt(page) - 1) * parseInt(limit);

         const { count, rows } = await Review.findAndCountAll({
            where: { productId },
            include: [{ model: require("../models/postgres/User"), attributes: ["name"] }],
            order: [["createdAt", "DESC"]],
            limit: parseInt(limit),
            offset,
         });

         return {
            reviews: rows,
            pagination: {
               total: count,
               page: parseInt(page),
               limit: parseInt(limit),
               pages: Math.ceil(count / parseInt(limit)),
            },
         };
      } catch (error) {
         throw new ErrorResponse(`Error fetching reviews: ${error.message}`, 500);
      }
   }
}

module.exports = new StoreService();
