import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function POST(request) {
  try {
    console.log("🔄 UPLOAD: Starting image upload process...");

    // Connect to database safely
    const db = await connectDB();

    if (!db) {
      console.log("❌ UPLOAD: No database connection");
      return NextResponse.json(
        {
          success: false,
          error: "Database not available",
        },
        { status: 503 }
      );
    }

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

    // Validate file size (max 4MB for base64)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "File too large",
          details: `Maximum size is 4MB. Your file is ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB`,
        },
        { status: 400 }
      );
    }

    // Convert file to base64 (INSTEAD of saving to filesystem)
    console.log("🔄 UPLOAD: Converting file to base64...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = originalName.split(".").pop();
    const filename = `image_${timestamp}.${extension}`;

    console.log("💾 UPLOAD: Saving to database...");

    // Save to database WITH base64 image data
    const imageDoc = new ImageModel({
      filename: filename,
      originalName: originalName,
      filepath: `/api/images/${filename}`, // Virtual path
      section: section,
      size: file.size,
      mimetype: file.type,
      imageData: base64Image, // ✅ STORE IMAGE AS BASE64
      uploadedAt: new Date(),
      updatedAt: new Date(),
    });

    await imageDoc.save();
    console.log("✅ UPLOAD: Image saved to database successfully");

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        image: {
          id: imageDoc._id,
          filename: imageDoc.filename,
          filepath: imageDoc.filepath,
          section: imageDoc.section,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ UPLOAD: Error:", error);
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
    instructions:
      "Use POST method with form-data containing 'image' file and optional 'section' field",
  });
}
