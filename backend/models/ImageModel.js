// models/ImageModel.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    page: { type: String, required: true }, // e.g., "home", "mission"
    section: { type: String, required: true }, // e.g., "hero", "main", etc.
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
