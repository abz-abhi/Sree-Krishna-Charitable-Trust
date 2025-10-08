import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// DON'T throw error during build - this causes deployment failure
if (!MONGODB_URI && typeof window === "undefined") {
  console.log("⚠️ MONGODB_URI not defined - build time");
  // Don't throw error, just log
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If no MongoDB URI (during build), return null instead of throwing
  if (!MONGODB_URI) {
    console.log("📦 DB: MongoDB URI not configured - build time");
    return null;
  }

  if (cached.conn) {
    console.log("📦 DB: Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("📦 DB: Creating new connection...");
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ DB: MongoDB Connected Successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ DB: Connection Failed:", error);
        cached.promise = null; // Reset on error
        return null; // Don't throw, return null
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("❌ DB: Connection Error:", error);
    return null;
  }

  return cached.conn;
}

export default connectDB;
