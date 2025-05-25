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

class ClubDao {
   // Create a new club
   static createClub = catchAsync(async (clubData) => {
      const { name, description, location } = clubData;
      const result = await pool.query(
         "INSERT INTO clubs (name, description, location) VALUES ($1, $2, $3) RETURNING *",
         [name, description, location]
      );
      return result.rows[0];
   });

   // Get a club by ID
   static getClubById = catchAsync(async (clubId) => {
      const result = await pool.query("SELECT * FROM clubs WHERE id = $1", [clubId]);
      return result.rows[0];
   });

   // Get all clubs
   static getAllClubs = catchAsync(async () => {
      const result = await pool.query("SELECT * FROM clubs");
      return result.rows;
   });

   // Update a club
   static updateClub = catchAsync(async (clubId, updateData) => {
      const { name, description, location } = updateData;
      const result = await pool.query(
         "UPDATE clubs SET name = $1, description = $2, location = $3 WHERE id = $4 RETURNING *",
         [name, description, location, clubId]
      );
      return result.rows[0];
   });

   // Delete a club
   static deleteClub = catchAsync(async (clubId) => {
      const result = await pool.query("DELETE FROM clubs WHERE id = $1 RETURNING *", [clubId]);
      return result.rows[0];
   });
}

module.exports = ClubDao;
