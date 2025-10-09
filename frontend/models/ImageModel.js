import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: [true, "Filename is required"],
    trim: true,
  },
  originalName: {
    type: String,
    required: [true, "Original name is required"],
    trim: true,
  },
  filepath: {
    type: String,
    required: [true, "Filepath is required"],
    trim: true,
  },
  section: {
    type: String,
    required: [true, "Section is required"],
    enum: {
      values: [
        "home-main",
        "home-mission",
        "home-joinhands",
        "about-1",
        "about-2",
        "about-3",
        "about-4",
        "about-5",
        "shanthi-1",
        "shanthi-2",
        "shanthi-3",
        "shanthi-4",
        "shanthi-5",
        "shanthi-6",
        "shanthi-7",
        "contact",
      ],
      message: "Invalid section",
    },
  },
  size: {
    type: Number,
    required: [true, "File size is required"],
    min: [1, "File size must be at least 1 byte"],
  },
  mimetype: {
    type: String,
    required: [true, "Mimetype is required"],
    validate: {
      validator: function (v) {
        return v.startsWith("image/");
      },
      message: "File must be an image",
    },
  },
  imageData: {
    type: String,
    required: [true, "Image data is required"],
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

imageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Add index for better performance
imageSchema.index({ section: 1, uploadedAt: -1 });

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
