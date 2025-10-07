"use client";
import { useState } from "react";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload/images", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Image uploaded successfully!");
        setFile(null);
        document.getElementById("file-input").value = "";
        // Refresh the page to show new image
        window.location.reload();
      } else {
        setMessage(data.error || "Upload failed");
      }
    } catch (error) {
      setMessage("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Upload New Image</h3>

      <div className="space-y-4">
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
