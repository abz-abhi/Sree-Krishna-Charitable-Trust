import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";

export async function POST(request) {
  try {
    console.log("🔄 UPLOAD: Starting upload...");

    // Connect to database
    const db = await connectDB();

    if (!db) {
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

    console.log("📁 UPLOAD: Section:", section, "File:", file?.name);

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
    console.log("✅ UPLOAD: Success for section:", section);

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
    console.error("❌ UPLOAD: Error for section:", error.message);
    return NextResponse.json(
      {
        error: "Upload failed: " + error.message,
      },
      { status: 500 }
    );
  }
}
