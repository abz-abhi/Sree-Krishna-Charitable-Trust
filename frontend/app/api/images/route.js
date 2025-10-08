import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function GET() {
  try {
    const db = await connectDB();

    if (!db) {
      return NextResponse.json([]);
    }

    // Get images from webstinline database
    const images = await ImageModel.find({}).sort({ uploadedAt: -1 });
    console.log(`📁 Found ${images.length} images in webstinline database`);

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json([]);
  }
}
