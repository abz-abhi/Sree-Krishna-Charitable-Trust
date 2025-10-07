"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminPage() {
  const [message, setMessage] = useState("");
  const [homeImage, setHomeImage] = useState<File | null>(null);
  const [missionImage, setMissionImage] = useState<File | null>(null);
  const [homePreview, setHomePreview] = useState<string | null>(null);
  const [missionPreview, setMissionPreview] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  // Fetch already uploaded images
  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then(setUploadedImages)
      .catch(console.error);
  }, []);

  const uploadImage = async (file: File, section: string) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("section", section);

    // ❌ WRONG: You're calling this
    // const res = await fetch("/api/images/upload", {

    // ✅ CORRECT: Should be this (based on your folder structure)
    const res = await fetch("/api/upload/images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) return data;
    throw new Error(data.error || "Upload failed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      if (homeImage) {
        await uploadImage(homeImage, "main");
      }

      if (missionImage) {
        await uploadImage(missionImage, "mission");
      }

      setMessage("✅ Images uploaded successfully!");
      setHomeImage(null);
      setMissionImage(null);
      setHomePreview(null);
      setMissionPreview(null);

      // Refresh the images list
      const res = await fetch("/api/images");
      setUploadedImages(await res.json());

      // Refresh the page after 2 seconds to see changes
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setMessage(`❌ Upload failed: ${err.message}`);
    }
  };

  // Helper: find existing image by section
  const findImage = (section: string) => {
    const images = uploadedImages.filter((img) => img.section === section);
    // Get the latest image for the section
    return images.reduce((latest, current) => {
      return new Date(current.uploadedAt) > new Date(latest.uploadedAt)
        ? current
        : latest;
    }, images[0]);
  };

  // Clear file input and preview
  const clearFileInput = (type: "home" | "mission") => {
    if (type === "home") {
      setHomeImage(null);
      setHomePreview(null);
    } else {
      setMissionImage(null);
      setMissionPreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold mb-8 text-[#1f4d40] text-center">
          Admin Dashboard
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* HOME PAGE IMAGE */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-semibold text-emerald-700 mb-4">
              🏠 Home Page Image
            </h2>

            {/* Current Home Image */}
            {findImage("main") && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Current Home Image:
                </p>
                <div className="relative w-full h-48 rounded-md overflow-hidden border">
                  <Image
                    src={findImage("main").filepath}
                    alt="Home"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Uploaded:{" "}
                  {new Date(findImage("main").uploadedAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* File Input */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload New Home Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setHomeImage(file);
                  if (file) setHomePreview(URL.createObjectURL(file));
                }}
                className="block w-full border border-gray-300 p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Preview and Clear */}
            {homePreview && (
              <div className="mt-4 p-3 border border-blue-200 rounded bg-blue-50">
                <p className="text-sm font-medium text-blue-700 mb-2">
                  New Image Preview:
                </p>
                <div className="relative w-full h-40 rounded-md overflow-hidden">
                  <Image
                    src={homePreview}
                    alt="Home Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-600">
                    File: {homeImage?.name} (
                    {(homeImage?.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <button
                    type="button"
                    onClick={() => clearFileInput("home")}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MISSION SECTION IMAGE */}
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-semibold text-emerald-700 mb-4">
              🎯 Mission Section Image
            </h2>

            {/* Current Mission Image */}
            {findImage("mission") && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Current Mission Image:
                </p>
                <div className="relative w-full h-48 rounded-md overflow-hidden border">
                  <Image
                    src={findImage("mission").filepath}
                    alt="Mission"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Uploaded:{" "}
                  {new Date(
                    findImage("mission").uploadedAt
                  ).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* File Input */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload New Mission Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setMissionImage(file);
                  if (file) setMissionPreview(URL.createObjectURL(file));
                }}
                className="block w-full border border-gray-300 p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Preview and Clear */}
            {missionPreview && (
              <div className="mt-4 p-3 border border-blue-200 rounded bg-blue-50">
                <p className="text-sm font-medium text-blue-700 mb-2">
                  New Image Preview:
                </p>
                <div className="relative w-full h-40 rounded-md overflow-hidden">
                  <Image
                    src={missionPreview}
                    alt="Mission Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-600">
                    File: {missionImage?.name} (
                    {(missionImage?.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <button
                    type="button"
                    onClick={() => clearFileInput("mission")}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!homeImage && !missionImage}
            className="w-full py-3 bg-[#1f4d40] text-white font-semibold rounded-md hover:bg-[#16382f] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            📤 Save Images
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded text-center font-medium ${
              message.includes("✅")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Uploaded Images Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📊 Upload Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-700">
                {uploadedImages.filter((img) => img.section === "main").length}
              </div>
              <div className="text-blue-600">Home Images</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-700">
                {
                  uploadedImages.filter((img) => img.section === "mission")
                    .length
                }
              </div>
              <div className="text-green-600">Mission Images</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-700">
                {
                  uploadedImages.filter((img) => img.section === "gallery")
                    .length
                }
              </div>
              <div className="text-purple-600">Gallery Images</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
