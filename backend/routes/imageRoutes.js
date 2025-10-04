import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { uploadImage, getImages } from "../controllers/imageController.js";
import { log } from "console";

const router = express.Router();

// Dynamic storage based on title
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const title = req.body.title;
    let folder = "uploads";

    if (title === "home") folder = "uploads/home";
    else if (title === "mission") folder = "uploads/mission";

    fs.mkdirSync(folder, { recursive: true }); // Ensure folder exists
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), uploadImage);
router.get("/", getImages);

export default router;

console.log();

