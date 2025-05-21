const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

async function connectDB(retries = 5, delay = 5000) {
  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("MongoDB connected successfully");
    
    // Add event listeners for monitoring connection
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    
    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
    });
    
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to application termination");
      process.exit(0);
    });
    
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    
    if (retries > 0) {
      console.log(`Retrying connection in ${delay/1000} seconds... (${retries} attempts remaining)`);
      setTimeout(() => connectDB(retries - 1, delay), delay);
    } else {
      console.error("Maximum retries reached. Could not connect to MongoDB.");
      process.exit(1); // Exit the process with failure
    }
  }
}

module.exports = connectDB;
