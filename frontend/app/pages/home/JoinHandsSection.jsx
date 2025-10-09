"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const JoinHandsSection = () => {
  const [joinHandsImage, setJoinHandsImage] = useState(null);

  const fetchJoinHandsImage = async () => {
    try {
      console.log("🔄 Fetching joinhands images...");
      const response = await fetch("/api/images?t=" + Date.now()); // Prevent caching
      const images = await response.json();

      const joinHandsImages = images.filter(
        (img) => img.section === "joinhands"
      );
      console.log("📸 Joinhands images found:", joinHandsImages.length);

      if (joinHandsImages.length > 0) {
        const latestImage = joinHandsImages.reduce((latest, current) => {
          const latestDate = new Date(latest.updatedAt || latest.uploadedAt);
          const currentDate = new Date(current.updatedAt || current.uploadedAt);
          return currentDate > latestDate ? current : latest;
        });

        setJoinHandsImage(latestImage);
        console.log("✅ Join Hands image loaded:", latestImage.filename);
      } else {
        setJoinHandsImage(null);
        console.log("❌ No joinhands images found");
      }
    } catch (err) {
      console.error("Error fetching join hands image:", err);
    }
  };

  useEffect(() => {
    fetchJoinHandsImage();

    // Refresh every 3 seconds for 30 seconds after component loads
    const interval = setInterval(fetchJoinHandsImage, 3000);
    const timeout = setTimeout(() => clearInterval(interval), 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const getImageSrc = (image) => {
    if (image?.imageData) {
      return `data:${image.mimetype};base64,${image.imageData}`;
    }
    return image?.filepath;
  };

  return (
    <section className="py-16 sm:py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg order-1 lg:order-none">
          {joinHandsImage ? (
            <Image
              src={getImageSrc(joinHandsImage)}
              alt={joinHandsImage.originalName || "Helping hands"}
              fill
              className="object-cover grayscale-[40%] hover:grayscale-0 transition duration-500"
              unoptimized={!!joinHandsImage.imageData}
              priority
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <p className="text-gray-500 text-sm text-center">
                No join hands image uploaded yet
                <br />
                <span className="text-xs">Upload from admin panel</span>
              </p>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="relative space-y-8">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1f4d40] leading-tight">
              Join Hands In Spreading Love & Service
            </h2>
          </div>

          <div className="bg-[#f1e8dd] p-6 sm:p-8 rounded-xl shadow-[1px_8px_12px_0px_#66A0A0AF] flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Looking to contribute, volunteer, or seek support from Sree
              Krishna Charitable Trust? Join us in making a difference in the
              lives of those who need it most.
            </p>
            <a
              href="#"
              className="inline-block bg-[#1f4d40] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#16382f] hover:-translate-y-1 transition-all duration-300"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinHandsSection;
