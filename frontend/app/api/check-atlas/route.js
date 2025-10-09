import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  // REPLACE "NEW_PASSWORD_HERE" with your actual new password
  const MONGODB_URI =
    "mongodb+srv://abhislinux:BFcr6BVoZkwILGLK@cluster1.s8nemrc.mongodb.net/sreekrishna?retryWrites=true&w=majority&appName=cluster1";

  let client;
  try {
    console.log("🔧 Testing with new password...");
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    await client.connect();
    console.log("✅ Connected successfully with new password!");

    const db = client.db();
    const collections = await db.listCollections().toArray();
    const imagesCount = await db.collection("images").countDocuments();

    return NextResponse.json({
      success: true,
      message: "✅ Connection successful with new password!",
      database: db.databaseName,
      collections: collections.map((c) => c.name),
      imagesCount: imagesCount,
    });
  } catch (error) {
    console.error("❌ Connection failed:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: "Connection failed",
        details: error.message,
        action: "Password might still be wrong. Reset again in MongoDB Atlas.",
      },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}
