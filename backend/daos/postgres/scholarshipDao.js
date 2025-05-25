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

class ScholarshipDao {
   static createScholarship = catchAsync(async (scholarshipData) => {
      const { name, description, amount, eligibilityCriteria } = scholarshipData;
      const result = await pool.query(
         "INSERT INTO scholarships (name, description, amount, eligibility_criteria) VALUES ($1, $2, $3, $4) RETURNING *",
         [name, description, amount, eligibilityCriteria]
      );
      return result.rows[0];
   });

   static getScholarshipById = catchAsync(async (scholarshipId) => {
      const result = await pool.query("SELECT * FROM scholarships WHERE id = $1", [scholarshipId]);
      return result.rows[0];
   });

   static updateScholarship = catchAsync(async (scholarshipId, updateData) => {
      const { name, description, amount, eligibilityCriteria } = updateData;
      const result = await pool.query(
         "UPDATE scholarships SET name = $1, description = $2, amount = $3, eligibility_criteria = $4 WHERE id = $5 RETURNING *",
         [name, description, amount, eligibilityCriteria, scholarshipId]
      );
      return result.rows[0];
   });

   static deleteScholarship = catchAsync(async (scholarshipId) => {
      const result = await pool.query("DELETE FROM scholarships WHERE id = $1 RETURNING *", [scholarshipId]);
      return result.rows[0];
   });
}

module.exports = ScholarshipDao;
