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

class UserDao {
   static createUser = catchAsync(async (userData) => {
      const { name, email, password } = userData;
      const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [
         name,
         email,
         password,
      ]);
      return result.rows[0];
   });

   static getUserById = catchAsync(async (userId) => {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
      return result.rows[0];
   });

   static updateUser = catchAsync(async (userId, updateData) => {
      const { name, email, password } = updateData;
      const result = await pool.query(
         "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
         [name, email, password, userId]
      );
      return result.rows[0];
   });

   static deleteUser = catchAsync(async (userId) => {
      const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);
      return result.rows[0];
   });
}

module.exports = UserDao;
