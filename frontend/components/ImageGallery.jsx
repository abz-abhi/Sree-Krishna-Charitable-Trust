"use client";
import { useState, useEffect } from "react";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/images");
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div
          key={image._id}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={image.filepath}
              alt={image.originalName}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <p className="font-medium text-gray-800 truncate">
              {image.originalName}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {(image.size / 1024).toFixed(1)} KB
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(image.uploadedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}

      {images.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No images uploaded yet. Upload some images to see them here.
        </div>
      )}
    </div>
  );
}
