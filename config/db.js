const mongoose = require("mongoose");

// Reuse one connection across requests (important on Vercel serverless)
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose.connect(process.env.MONGO_URI);
  }

  try {
    await global._mongoosePromise;
    console.log("MongoDB Connected");
  } catch (error) {
    global._mongoosePromise = null; // allow retry on next request
    throw error;
  }
};

module.exports = connectDB;