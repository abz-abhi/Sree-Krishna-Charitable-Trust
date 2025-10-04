import ImageModel from "../models/ImageModel.js";

export const uploadImage = async (req, res) => {
  try {
    const { title, page, section } = req.body;
    const folder =
      title === "home" ? "home" : title === "mission" ? "mission" : "";
    const imageUrl = `/uploads/${folder}/${req.file.filename}`;
    const createdAt = new Date();

    const newImage = await ImageModel.create({
      title,
      page,
      section,
      imageUrl,
      createdAt,
    });

    res.status(200).json(newImage);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Image upload failed" });
  }
};

export const getImages = async (req, res) => {
  try {    
    const images = await ImageModel.find().sort({ createdAt: -1 });
    // console.log(images);
    
    res.json(images);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Failed to fetch images" });
  }
};
