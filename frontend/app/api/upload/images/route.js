import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

// Valid sections with their limits
const SECTION_LIMITS = {
  "home-main": 1,
  "home-mission": 1,
  "home-joinhands": 1,
  "about-1": 1,
  "about-2": 1,
  "about-3": 1,
  "about-4": 1,
  "about-5": 1,
  "shanthi-1": 1,
  "shanthi-2": 1,
  "shanthi-3": 1,
  "shanthi-4": 1,
  "shanthi-5": 1,
  "shanthi-6": 1,
  "shanthi-7": 1,
  "contact-1": 1,
};

export async function POST(request) {
  try {
    // Connect to database
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database not available" },
        { status: 503 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("image");
    const section = formData.get("section");

    // Validation
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!section || !SECTION_LIMITS[section]) {
      return NextResponse.json(
        { success: false, error: "Invalid section" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "File must be an image" },
        { status: 400 }
      );
    }

    // File size validation (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "File too large",
          details: `Maximum size is 5MB. Your file is ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB`,
        },
        { status: 400 }
      );
    }

    // Check if section already has an image (for single-image sections)
    if (SECTION_LIMITS[section] === 1) {
      const existingImage = await ImageModel.findOne({ section });
      if (existingImage) {
        // Delete old image
        await ImageModel.findByIdAndDelete(existingImage._id);
      }
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Save to database
    const imageDoc = new ImageModel({
      filename: `image_${Date.now()}.${file.name.split(".").pop()}`,
      originalName: file.name,
      filepath: `/api/images/image_${Date.now()}`,
      section: section,
      size: file.size,
      mimetype: file.type,
      imageData: base64Image,
      uploadedAt: new Date(),
    });

    await imageDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        image: {
          id: imageDoc._id,
          filename: imageDoc.filename,
          section: imageDoc.section,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);

    // MongoDB validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: errors.join(", "),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Upload failed: " + error.message },
      { status: 500 }
    );
  }
}
