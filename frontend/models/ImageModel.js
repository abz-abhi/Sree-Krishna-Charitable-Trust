import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  filepath: { type: String, required: true },
  section: {
    type: String,
    enum: ["main", "mission", "gallery", "joinhands"], // ✅ Make sure joinhands is here
    default: "gallery",
  },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  imageData: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

imageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
