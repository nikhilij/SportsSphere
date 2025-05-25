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

class RewardDao {
   static createReward = catchAsync(async (rewardData) => {
      const { name, points, description } = rewardData;
      const result = await pool.query(
         "INSERT INTO rewards (name, points, description) VALUES ($1, $2, $3) RETURNING *",
         [name, points, description]
      );
      return result.rows[0];
   });

   static getRewardById = catchAsync(async (rewardId) => {
      const result = await pool.query("SELECT * FROM rewards WHERE id = $1", [rewardId]);
      return result.rows[0];
   });

   static updateReward = catchAsync(async (rewardId, updateData) => {
      const { name, points, description } = updateData;
      const result = await pool.query(
         "UPDATE rewards SET name = $1, points = $2, description = $3 WHERE id = $4 RETURNING *",
         [name, points, description, rewardId]
      );
      return result.rows[0];
   });

   static deleteReward = catchAsync(async (rewardId) => {
      const result = await pool.query("DELETE FROM rewards WHERE id = $1 RETURNING *", [rewardId]);
      return result.rows[0];
   });
}

module.exports = RewardDao;
