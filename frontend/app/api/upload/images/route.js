import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function POST(request) {
  try {
    console.log("🔄 Starting image upload...");

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
    console.log("✅ Connected to sreekrishna database");

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("image");
    const section = formData.get("section") || "gallery";

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: "File must be an image",
        },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB for base64)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "File too large",
          details: `Maximum size is 2MB. Your file is ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB`,
        },
        { status: 400 }
      );
    }

    // Convert file to base64
    console.log("🔄 Converting file to base64...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = originalName.split(".").pop();
    const filename = `image_${timestamp}.${extension}`;

    // Save to database
    console.log("💾 Saving to sreekrishna.images collection...");
    const imageDoc = new ImageModel({
      filename: filename,
      originalName: originalName,
      filepath: `/api/images/${filename}`,
      section: section,
      size: file.size,
      mimetype: file.type,
      imageData: base64Image, // Store as base64
      uploadedAt: new Date(),
      updatedAt: new Date(),
    });

    await imageDoc.save();
    console.log("✅ Image saved successfully");

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully to MongoDB",
        image: {
          id: imageDoc._id,
          filename: imageDoc.filename,
          section: imageDoc.section,
          size: imageDoc.size,
        },
        storage: {
          database: "sreekrishna",
          collection: "images",
          type: "MongoDB Base64",
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

// GET method for testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload endpoint is working!",
    database: "sreekrishna",
    collection: "images",
  });
}
