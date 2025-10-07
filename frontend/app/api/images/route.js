import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function GET() {

  try {
    // Connect to database
    await connectDB();

    // Get all images sorted by upload date (newest first)
    const images = await ImageModel.find({}).sort({ uploadedAt: -1 });

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch images",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method for direct image creation
export async function POST(request) {
  try {
    await connectDB();
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
