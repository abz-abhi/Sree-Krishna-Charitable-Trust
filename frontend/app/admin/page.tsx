"use client";
import React, { useState, useEffect } from "react";

export default function AdminPage() {
  const [message, setMessage] = useState("");
  const [homeImage, setHomeImage] = useState<File | null>(null);
  const [missionImage, setMissionImage] = useState<File | null>(null);
  const [homePreview, setHomePreview] = useState<string | null>(null);
  const [missionPreview, setMissionPreview] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  // Fetch already uploaded images
  useEffect(() => {
    fetch("http://localhost:5000/api/images")
      .then((res) => res.json())
      .then(setUploadedImages)
      .catch(console.error);
  }, []);

  // Upload function
  const uploadImage = async (
    file: File,
    title: string,
    page: string,
    section: string
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("page", page);
    formData.append("section", section);
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) return data;
    throw new Error(data.message || "Upload failed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      if (homeImage) {
        await uploadImage(homeImage, "home", "homepage", "main");
      }

      if (missionImage) {
        await uploadImage(missionImage, "mission", "homepage", "mission");
      }

      setMessage("✅ Images uploaded successfully!");
      setHomeImage(null);
      setMissionImage(null);
      setHomePreview(null);
      setMissionPreview(null);

      const res = await fetch("http://localhost:5000/api/images");
      setUploadedImages(await res.json());
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed");
    }
  };

  // Helper: find existing image by title
  const findImage = (title: string) =>
    uploadedImages.find((img) => img.title === title);

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-8 text-[#1f4d40] text-center">
        Admin Dashboard
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* HOME PAGE IMAGE */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-700 mb-3">
            Home Page Image
          </h2>
          {findImage("home") && (
            <img
              src={`http://localhost:5000${findImage("home").imageUrl}`}
              alt="Home"
              className="w-full h-48 object-cover rounded-md mb-4 border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setHomeImage(file);
              if (file) setHomePreview(URL.createObjectURL(file));
            }}
            className="block w-full border border-gray-300 p-2 rounded"
          />
          {homePreview && (
            <img
              src={homePreview}
              alt="Home Preview"
              className="w-full h-40 object-cover mt-3 rounded-md"
            />
          )}
        </div>

        {/* MISSION SECTION IMAGE */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-700 mb-3">
            Mission Section Image
          </h2>
          {findImage("mission") && (
            <img
              src={`http://localhost:5000${findImage("mission").imageUrl}`}
              alt="Mission"
              className="w-full h-48 object-cover rounded-md mb-4 border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setMissionImage(file);
              if (file) setMissionPreview(URL.createObjectURL(file));
            }}
            className="block w-full border border-gray-300 p-2 rounded"
          />
          {missionPreview && (
            <img
              src={missionPreview}
              alt="Mission Preview"
              className="w-full h-40 object-cover mt-3 rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#1f4d40] text-white font-semibold rounded-md hover:bg-[#16382f] transition"
        >
          Save Images
        </button>
      </form>

      {message && (
        <p className="mt-6 text-center text-emerald-700 font-medium">
          {message}
        </p>
      )}
    </div>
  );
}
