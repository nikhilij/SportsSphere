const { Pool } = require("pg");
const catchAsync = require("../../utils/catchAsync");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
   user: process.env.POSTGRES_USER || "postgres",
   host: process.env.POSTGRES_HOST || "localhost",
   database: process.env.POSTGRES_DB || "sportssphere",
   password: process.env.POSTGRES_PASSWORD || "password",
   port: process.env.POSTGRES_PORT || 5432,
});

class EventDao {
   // Create a new event
   static createEvent = catchAsync(async (eventData) => {
      const { name, description, date, location } = eventData;
      const result = await pool.query(
         "INSERT INTO events (name, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *",
         [name, description, date, location]
      );
      return result.rows[0];
   });

   // Get an event by ID
   static getEventById = catchAsync(async (eventId) => {
      const result = await pool.query("SELECT * FROM events WHERE id = $1", [eventId]);
      return result.rows[0];
   });

   // Get all events
   static getAllEvents = catchAsync(async () => {
      const result = await pool.query("SELECT * FROM events");
      return result.rows;
   });

   // Update an event
   static updateEvent = catchAsync(async (eventId, updateData) => {
      const { name, description, date, location } = updateData;
      const result = await pool.query(
         "UPDATE events SET name = $1, description = $2, date = $3, location = $4 WHERE id = $5 RETURNING *",
         [name, description, date, location, eventId]
      );
      return result.rows[0];
   });

   // Delete an event
   static deleteEvent = catchAsync(async (eventId) => {
      const result = await pool.query("DELETE FROM events WHERE id = $1 RETURNING *", [eventId]);
      return result.rows[0];
   });
}

module.exports = EventDao;
