import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function GET() {
  try {
    const db = await connectDB();

    if (!db) {
      console.log("📦 No DB connection - returning empty data");
      return NextResponse.json([]);
    }

    // Get all images from sreekrishna database
    const images = await ImageModel.find({}).sort({ uploadedAt: -1 });
    console.log(`📁 Found ${images.length} images in sreekrishna database`);

    return NextResponse.json(images);
  } catch (error) {
    console.error("❌ API Images Error:", error);
    return NextResponse.json([]);
  }
}

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
