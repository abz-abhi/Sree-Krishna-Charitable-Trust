import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function POST(request) {
  console.log("🔄 UPLOAD: Starting image upload process...");
  
  try {
    // Step 1: Connect to Database
    console.log("📦 UPLOAD: Connecting to database...");
    const db = await connectDB();
    
    if (!db) {
      console.log("❌ UPLOAD: Database connection failed");
      return NextResponse.json(
        { 
          success: false,
          error: "Database not available" 
        }, 
        { status: 503 }
      );
    }
    console.log("✅ UPLOAD: Database connected successfully");

    // Step 2: Parse Form Data
    console.log("🔄 UPLOAD: Parsing form data...");
    const formData = await request.formData();
    const file = formData.get("image");
    const section = formData.get("section") || "gallery";

    console.log("📁 UPLOAD: Received data:", {
      hasFile: !!file,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      section: section
    });

    if (!file) {
      console.log("❌ UPLOAD: No file uploaded");
      return NextResponse.json(
        { 
          success: false,
          error: "No file uploaded" 
        }, 
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.log("❌ UPLOAD: Invalid file type:", file.type);
      return NextResponse.json(
        { 
          success: false,
          error: "File must be an image" 
        },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB for base64)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      console.log("❌ UPLOAD: File too large:", file.size, "bytes");
      return NextResponse.json(
        {
          success: false,
          error: "File too large",
          details: `Maximum size is 2MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`
        },
        { status: 400 }
      );
    }

    // Convert file to base64
    console.log("🔄 UPLOAD: Converting file to base64...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    console.log("📊 UPLOAD: Base64 conversion complete, length:", base64Image.length);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const filename = `image_${timestamp}.${extension}`;

    console.log("💾 UPLOAD: Saving to database, section:", section);

    // Save to database
    const imageDoc = new ImageModel({
      filename: filename,
      originalName: originalName,
      filepath: `/api/images/${filename}`,
      section: section,
      size: file.size,
      mimetype: file.type,
      imageData: base64Image,
      uploadedAt: new Date(),
      updatedAt: new Date(),
    });

    await imageDoc.save();
    console.log("✅ UPLOAD: Image saved successfully to section:", section);
    console.log("📝 UPLOAD: Document ID:", imageDoc._id);

    return NextResponse.json(
      {
        success: true,
        message: `Image uploaded successfully to ${section} section`,
        image: {
          id: imageDoc._id,
          filename: imageDoc.filename,
          section: imageDoc.section,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ UPLOAD: Critical Error:", error);
    console.error("❌ UPLOAD: Error details:", error.message);
    console.error("❌ UPLOAD: Error stack:", error.stack);
    
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