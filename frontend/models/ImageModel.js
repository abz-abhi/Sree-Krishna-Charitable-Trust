import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    enum: ["main", "mission", "gallery"],
    default: "gallery",
  },
  size: {
    type: Number,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  // ADD THIS FIELD - Store image as base64
  imageData: {
    type: String, // base64 encoded image
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
imageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
