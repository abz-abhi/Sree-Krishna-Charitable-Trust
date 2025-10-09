import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';

export async function GET() {
  // Use the exact connection string
  const MONGODB_URI = "mongodb+srv://abhislinux:adverto1@cluster1.s8nemrc.mongodb.net/sreekrishna?retryWrites=true&w=majority&appName=cluster1";
  
  let client;
  try {
    console.log("🔧 Testing direct connection...");
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    await client.connect();
    console.log("✅ Connected successfully!");
    
    const db = client.db();
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({
      success: true,
      message: "✅ Direct connection works!",
      database: db.databaseName,
      collections: collections.map(c => c.name)
    });
    
  } catch (error) {
    console.error("❌ Direct connection failed:", error.message);
    
    return NextResponse.json({
      success: false,
      error: "Direct connection failed",
      details: error.message,
      check: [
        "1. Password is correct",
        "2. Network Access allows 0.0.0.0/0", 
        "3. Cluster URL is correct",
        "4. Database user has permissions"
      ]
    }, { status: 500 });
  } finally {
    if (client) await client.close();
  }
}