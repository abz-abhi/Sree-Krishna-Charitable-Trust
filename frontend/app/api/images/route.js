import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function GET() {
  try {
    // Connect to database safely
    const db = await connectDB();
    
    // If no database connection, return empty array
    if (!db) {
      console.log("📦 API: No DB connection - returning empty data");
      return NextResponse.json([]);
    }

    // Get all images sorted by upload date (newest first)
    const images = await ImageModel.find({}).sort({ uploadedAt: -1 });

    return NextResponse.json(images);
  } catch (error) {
    console.error("❌ API Images Error:", error);
    // Return empty array instead of error
    return NextResponse.json([]);
  }
}

// Optional: Add POST method for direct image creation
export async function POST(request) {
  try {
    const db = await connectDB();
    
    if (!db) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const imageDoc = new ImageModel(body);
    await imageDoc.save();

    return NextResponse.json(
      {
        success: true,
        image: imageDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}