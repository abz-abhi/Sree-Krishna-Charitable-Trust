import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in your .env.local file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
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
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("❌ DB: Connection Error:", error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;
