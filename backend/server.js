import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import imageRoutes from "./routes/imageRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// --- Path Configuration for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, 'uploads'); 

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadsPath));

app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    console.log(`Serving static files from: ${uploadsPath}`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
