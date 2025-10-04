"use client";
import { useState } from "react";

export default function ImageUploadClient() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file first");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUploaded(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-emerald-700 text-white rounded"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {uploaded && (
        <div className="mt-4">
          <p className="font-medium">Uploaded:</p>
          {/* Show the served URL from backend */}
          <img
            src={`http://localhost:5000${uploaded.url}`}
            alt={uploaded.originalName || "uploaded"}
            className="w-64 h-auto object-cover mt-2"
          />
          <pre className="text-xs mt-2">
            {JSON.stringify(uploaded, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
