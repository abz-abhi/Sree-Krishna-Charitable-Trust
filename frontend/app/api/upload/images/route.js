import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ImageModel from "@/models/ImageModel";
import fs from "fs";
import path from "path";

// ✅ COMPLETELY disable body parsing for this route
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Parse multipart form data manually
async function parseFormData(request) {
  const formData = await request.formData();
  return formData;
}

// ✅ ADD GET METHOD to test the route
export async function GET() {

  return NextResponse.json({
    success: true,
    message: "Upload endpoint is working!",
    endpoint: "/api/upload/images",
    method: "POST",
    required_fields: [
      "image (file)",
      "section (optional: main, mission, gallery)",
    ],
    max_file_size: "8MB",
    supported_formats: "All image types",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {

  try {
    // Step 1: Connect to Database
    await connectDB();

    // Step 2: Parse Form Data manually
    const formData = await parseFormData(request);
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

    // Validate file size (max 8MB to be safe)
    const maxSize = 8 * 1024 * 1024;
    if (file.size > maxSize) {
      console.log(
        "❌ UPLOAD: File too large:",
        (file.size / 1024 / 1024).toFixed(2),
        "MB"
      );
      return NextResponse.json(
        {
          error: "File too large",
          details: `Maximum size is 8MB. Your file is ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB`,
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    console.log("🔄 UPLOAD: Converting file to buffer...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log("✅ UPLOAD: Created uploads directory");
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = path.extname(originalName);
    const filename = `image_${timestamp}${extension}`;
    const filepath = `/uploads/${filename}`;
    const fullFilepath = path.join(uploadsDir, filename);

    console.log("💾 UPLOAD: Saving file as:", filename);

    // Save file to filesystem
    fs.writeFileSync(fullFilepath, buffer);
    console.log("✅ UPLOAD: File saved to filesystem");

    // Save to database
    const imageDoc = new ImageModel({
      filename: filename,
      originalName: originalName,
      filepath: filepath,
      section: section,
      size: file.size,
      mimetype: file.type,
      uploadedAt: new Date(),
      updatedAt: new Date(),
    });

    await imageDoc.save();
    console.log("✅ UPLOAD: Database entry created");

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
