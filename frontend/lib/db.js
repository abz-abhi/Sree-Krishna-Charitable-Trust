import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) {
    console.log("❌ MONGODB_URI not configured");
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log(
          "✅ MongoDB Connected to:",
          mongoose.connection.db.databaseName
        );
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error.message);
        return null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
