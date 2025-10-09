"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Define types for better TypeScript support
type SectionKey = "home" | "about" | "shanthi" | "contact";

type ImageConfig = {
  key: string;
  label: string;
  description: string;
};

type SectionConfig = {
  title: string;
  images: ImageConfig[];
};

// Section configuration with proper typing
const SECTIONS: Record<SectionKey, SectionConfig> = {
  home: {
    title: "🏠 Home Page",
    images: [
      {
        key: "home-main",
        label: "Home Page Main Image",
        description: "Main banner image for homepage",
      },
      {
        key: "home-mission",
        label: "Mission Section Image",
        description: "Image for mission section",
      },
      {
        key: "home-joinhands",
        label: "Join Hands Section Image",
        description: "Image for join hands section",
      },
    ],
  },
  about: {
    title: "📖 About Page",
    images: [
      {
        key: "about-1",
        label: "About Image 1",
        description: "First about section image",
      },
      {
        key: "about-2",
        label: "About Image 2",
        description: "Second about section image",
      },
      {
        key: "about-3",
        label: "About Image 3",
        description: "Third about section image",
      },
      {
        key: "about-4",
        label: "About Image 4",
        description: "Fourth about section image",
      },
      {
        key: "about-5",
        label: "About Image 5",
        description: "Fifth about section image",
      },
    ],
  },
  shanthi: {
    title: "🕊️ Shanthi Page",
    images: [
      {
        key: "shanthi-1",
        label: "Shanthi Image 1",
        description: "First shanthi section image",
      },
      {
        key: "shanthi-2",
        label: "Shanthi Image 2",
        description: "Second shanthi section image",
      },
      {
        key: "shanthi-3",
        label: "Shanthi Image 3",
        description: "Third shanthi section image",
      },
      {
        key: "shanthi-4",
        label: "Shanthi Image 4",
        description: "Fourth shanthi section image",
      },
      {
        key: "shanthi-5",
        label: "Shanthi Image 5",
        description: "Fifth shanthi section image",
      },
      {
        key: "shanthi-6",
        label: "Shanthi Image 6",
        description: "Sixth shanthi section image",
      },
      {
        key: "shanthi-7",
        label: "Shanthi Image 7",
        description: "Seventh shanthi section image",
      },
    ],
  },
  contact: {
    title: "📞 Contact Page",
    images: [
      {
        key: "contact",
        label: "Contact Page Image",
        description: "Main image for contact page",
      },
    ],
  },
};

export default function AdminPage() {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File }>(
    {}
  );
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setUploadedImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      setMessage("❌ Failed to load images");
    }
  };

  const findImage = (section: string) => {
    return uploadedImages.find((img) => img.section === section);
  };

  const getImageSrc = (image: any) => {
    if (image?.imageData) {
      return `data:${image.mimetype};base64,${image.imageData}`;
    }
    return image?.filepath;
  };

  const getFileSize = (file: File) => {
    return (file.size / 1024 / 1024).toFixed(2);
  };

  const handleFileSelect = (sectionKey: string, file: File | null) => {
    if (file) {
      setSelectedFiles((prev) => ({ ...prev, [sectionKey]: file }));
      setPreviews((prev) => ({
        ...prev,
        [sectionKey]: URL.createObjectURL(file),
      }));
    } else {
      setSelectedFiles((prev) => {
        const newFiles = { ...prev };
        delete newFiles[sectionKey];
        return newFiles;
      });
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[sectionKey];
        return newPreviews;
      });
    }
  };

  const uploadImage = async (file: File, section: string) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("section", section);

    const res = await fetch("/api/upload/images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) return data;
    throw new Error(
      data.error || data.details || `Upload failed for ${section}`
    );
  };

  const handleSectionUpload = async (sectionKey: string) => {
    const file = selectedFiles[sectionKey];
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      await uploadImage(file, sectionKey);

      // Get the section name and label safely
      const sectionName = sectionKey.split("-")[0] as SectionKey;
      const sectionLabel =
        SECTIONS[sectionName]?.images.find((img) => img.key === sectionKey)
          ?.label || sectionKey;

      setMessage(`✅ ${sectionLabel} uploaded successfully!`);

      // Clear this file only
      handleFileSelect(sectionKey, null);
      await fetchImages();
    } catch (err: any) {
      setMessage(`❌ Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleBulkUpload = async () => {
    const entries = Object.entries(selectedFiles);
    if (entries.length === 0) {
      setMessage("❌ Please select at least one image to upload");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      let successCount = 0;
      let errorMessages = [];

      for (const [sectionKey, file] of entries) {
        try {
          await uploadImage(file, sectionKey);
          successCount++;
        } catch (err: any) {
          errorMessages.push(`${sectionKey}: ${err.message}`);
        }
      }

      if (errorMessages.length === 0) {
        setMessage(`✅ All ${successCount} images uploaded successfully!`);
      } else if (successCount > 0) {
        setMessage(
          `⚠️ ${successCount} uploaded, ${errorMessages.length} failed`
        );
      } else {
        setMessage(`❌ All uploads failed`);
      }

      // Clear all files
      setSelectedFiles({});
      setPreviews({});
      await fetchImages();

      // Refresh page
      setTimeout(() => window.location.reload(), 2000);
    } catch (err: any) {
      setMessage(`❌ Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const ImageUploadSection = ({
    sectionKey,
    label,
    description,
  }: {
    sectionKey: string;
    label: string;
    description: string;
  }) => {
    const currentImage = findImage(sectionKey);
    const hasNewFile = !!selectedFiles[sectionKey];
    const preview = previews[sectionKey];

    return (
      <div className="border border-gray-200 rounded-lg p-6 bg-white hover:bg-gray-50 transition-colors">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              currentImage
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {currentImage ? "✅ Uploaded" : "⏳ Pending"}
          </span>
        </div>

        {/* Current Image */}
        {currentImage && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <div className="relative w-full h-32 rounded-md overflow-hidden border">
              <Image
                src={getImageSrc(currentImage)}
                alt={label}
                fill
                className="object-cover"
                unoptimized={!!currentImage.imageData}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Size: {(currentImage.size / 1024 / 1024).toFixed(2)} MB •
              Uploaded: {new Date(currentImage.uploadedAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* File Input */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileSelect(sectionKey, e.target.files?.[0] || null)
            }
            className="block w-full border border-gray-300 p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-3 p-3 border border-blue-200 rounded bg-blue-50">
            <p className="text-sm font-medium text-blue-700 mb-2">
              New Image Preview:
            </p>
            <div className="relative w-full h-32 rounded-md overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-600">
                File: {selectedFiles[sectionKey]?.name} (
                {getFileSize(selectedFiles[sectionKey])} MB)
              </p>
              <button
                type="button"
                onClick={() => handleFileSelect(sectionKey, null)}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                ✕ Remove
              </button>
            </div>
          </div>
        )}

        {/* Individual Upload Button */}
        {hasNewFile && (
          <button
            type="button"
            onClick={() => handleSectionUpload(sectionKey)}
            disabled={uploading}
            className="w-full mt-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            📤 Upload This Image
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1f4d40] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage all website images from one place
          </p>
        </div>

        {/* Bulk Upload Button */}
        {Object.keys(selectedFiles).length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-blue-800">
                  Ready to upload {Object.keys(selectedFiles).length} image(s)
                </p>
                <p className="text-sm text-blue-600">
                  {Object.keys(selectedFiles)
                    .map((key) => {
                      const sectionName = key.split("-")[0] as SectionKey;
                      return (
                        SECTIONS[sectionName]?.images.find(
                          (img) => img.key === key
                        )?.label || key
                      );
                    })
                    .join(", ")}
                </p>
              </div>
              <button
                onClick={handleBulkUpload}
                disabled={uploading}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  "🚀 Upload All Selected"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded text-center font-medium ${
              message.includes("✅")
                ? "bg-green-50 text-green-700 border border-green-200"
                : message.includes("⚠️")
                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Sections */}
        {(Object.entries(SECTIONS) as [SectionKey, SectionConfig][]).map(
          ([sectionKey, section]) => (
            <div key={sectionKey} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {section.title}
                </h2>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                  {section.images.length} image
                  {section.images.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.images.map((image) => (
                  <ImageUploadSection
                    key={image.key}
                    sectionKey={image.key}
                    label={image.label}
                    description={image.description}
                  />
                ))}
              </div>
            </div>
          )
        )}

        {/* Storage Summary */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            📊 Storage Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(SECTIONS) as [SectionKey, SectionConfig][]).map(
              ([sectionKey, section]) => (
                <div
                  key={sectionKey}
                  className="text-center p-4 bg-gray-50 rounded border"
                >
                  <div className="text-2xl font-bold text-[#1f4d40]">
                    {
                      uploadedImages.filter((img) =>
                        img.section.startsWith(sectionKey)
                      ).length
                    }
                  </div>
                  <div className="text-gray-600 font-medium">
                    {section.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {section.images.length} slots available
                  </div>
                </div>
              )
            )}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={fetchImages}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              🔄 Refresh Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
