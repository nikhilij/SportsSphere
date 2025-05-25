require("dotenv").config();
const { Pool } = require("pg");
const catchAsync = require("../../utils/catchAsync");

const pool = new Pool({
   user: process.env.DB_USER || "your_username",
   host: process.env.DB_HOST || "localhost",
   database: process.env.DB_NAME || "sportssphere",
   password: process.env.DB_PASSWORD || "your_password",
   port: process.env.DB_PORT || 5432,
});

class OrderDao {
   static createOrder = catchAsync(async (orderData) => {
      const { userId, productId, quantity, totalPrice, status } = orderData;
      const result = await pool.query(
         "INSERT INTO orders (user_id, product_id, quantity, total_price, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
         [userId, productId, quantity, totalPrice, status]
      );
      return result.rows[0];
   });

   // Get an order by ID
   static getOrderById = catchAsync(async (orderId) => {
      const result = await pool.query("SELECT * FROM orders WHERE id = $1", [orderId]);
      return result.rows[0];
   });

   // Get all orders
   static getAllOrders = catchAsync(async () => {
      const result = await pool.query("SELECT * FROM orders");
      return result.rows;
   });

   // Update an order
   static updateOrder = catchAsync(async (orderId, updateData) => {
      const { quantity, totalPrice, status } = updateData;
      const result = await pool.query(
         "UPDATE orders SET quantity = $1, total_price = $2, status = $3 WHERE id = $4 RETURNING *",
         [quantity, totalPrice, status, orderId]
      );
      return result.rows[0];
   });

   // Delete an order
   static deleteOrder = catchAsync(async (orderId) => {
      const result = await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [orderId]);
      return result.rows[0];
   });
}

module.exports = OrderDao;
