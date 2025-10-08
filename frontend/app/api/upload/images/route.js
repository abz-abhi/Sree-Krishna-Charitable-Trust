import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function POST(request) {
  try {
    console.log("🔄 Starting image upload to webstinline database...");

    // Connect to database
    const db = await connectDB();

    if (!db) {
      console.log("❌ Database connection failed");
      return NextResponse.json(
        {
          success: false,
          error: "Database not available",
        },
        { status: 503 }
      );
    }
    console.log("✅ Connected to webstinline database");

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("image");
    const section = formData.get("section") || "gallery";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Create unique filename
    const timestamp = Date.now();
    const filename = `image_${timestamp}.${file.name.split(".").pop()}`;

    // Save to webstinline.images collection
    const imageDoc = new ImageModel({
      filename: filename,
      originalName: file.name,
      filepath: `/api/images/${filename}`,
      section: section,
      size: file.size,
      mimetype: file.type,
      imageData: base64Image, // Store as base64
      uploadedAt: new Date(),
    });

    await imageDoc.save();
    console.log("✅ Image saved to webstinline.images collection");

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded to MongoDB successfully",
        database: "webstinline",
        collection: "images",
        image: {
          id: imageDoc._id,
          filename: filename,
          section: section,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Upload failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
