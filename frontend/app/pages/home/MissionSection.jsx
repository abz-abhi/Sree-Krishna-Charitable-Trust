"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const MissionSection = () => {
  const [missionImage, setMissionImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionImage = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔄 Fetching images from API...");
        const response = await fetch("/api/images");

        if (!response.ok) {
          throw new Error(
            `API returned ${response.status}: ${response.statusText}`
          );
        }

        const images = await response.json();
        console.log("✅ API response:", images);

        // Filter images with 'mission' section
        const missionImages = images.filter((img) => img.section === "mission");
        console.log("🎯 Mission images found:", missionImages);

        if (missionImages.length > 0) {
          // Get the latest mission image
          const latestMission = missionImages.reduce((latest, current) => {
            const latestDate = new Date(latest.updatedAt || latest.uploadedAt);
            const currentDate = new Date(
              current.updatedAt || current.uploadedAt
            );
            return currentDate > latestDate ? current : latest;
          });

          console.log("📸 Latest mission image:", latestMission);
          setMissionImage(latestMission);
        } else {
          console.log("❌ No mission images found");
          setMissionImage(null);
        }
      } catch (err) {
        console.error("❌ Error fetching mission image:", err);
        setError(err.message);
        setMissionImage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionImage();
  }, []);

  // Function to get the correct image source
  const getImageSource = () => {
    if (!missionImage) return null;

    // Priority 1: Use base64 image data if available
    if (missionImage.imageData) {
      return `data:${missionImage.mimetype};base64,${missionImage.imageData}`;
    }

    // Priority 2: Use filepath if available
    if (missionImage.filepath) {
      return missionImage.filepath;
    }

    // Priority 3: Use imageUrl if available (backward compatibility)
    if (missionImage.imageUrl) {
      return missionImage.imageUrl;
    }

    return null;
  };

  const imageSrc = getImageSource();

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-28 lg:gap-20 px-4 sm:px-8 lg:px-12">
        {/* Left Column - Image */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[700px] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-none">
          {loading ? (
            // Loading state
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f4d40] mb-3"></div>
              <p className="text-gray-600 text-sm">Loading mission image...</p>
            </div>
          ) : error ? (
            // Error state
            <div className="flex flex-col items-center justify-center w-full h-full bg-red-50 rounded-lg p-4">
              <div className="text-red-500 text-lg mb-2">⚠️</div>
              <p className="text-red-600 text-sm text-center font-medium">
                Failed to load image
              </p>
              <p className="text-red-500 text-xs text-center mt-1">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 transition"
              >
                Try Again
              </button>
            </div>
          ) : missionImage && imageSrc ? (
            // Success state - Image loaded
            <Image
              src={imageSrc}
              alt={missionImage.originalName || "Mission Section Image"}
              fill
              className="object-cover grayscale-[30%] hover:grayscale-0 transition duration-700 ease-in-out"
              unoptimized={!!missionImage.imageData} // Required for base64 images
              priority={true} // Important for above-the-fold images
            />
          ) : (
            // No image state
            <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6">
              <div className="text-4xl text-gray-400 mb-3">📷</div>
              <p className="text-gray-600 text-sm font-medium text-center mb-1">
                No Mission Image
              </p>
              <p className="text-gray-500 text-xs text-center">
                Upload an image with section set to "mission"
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Text Content (unchanged) */}
        <div className="space-y-8 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1f4d40] leading-tight tracking-tight">
            Our Mission
          </h2>

          <div className="bg-[#eee6dc] flex flex-col space-y-6 p-6 sm:p-8 rounded-2xl shadow-[1px_8px_15px_0px_#66A0A0AF] transition-all duration-500 hover:shadow-[2px_10px_20px_0px_#7bb5b5b0]">
            <p className="text-gray-800 text-base leading-relaxed">
              Presently we are operating the old age home in a rented house with
              two inmates since July 2004. We are a statutory body governed by
              rules and regulations, striving to maintain the highest standards
              in service delivery.
            </p>

            <p className="text-gray-800 text-base leading-relaxed">
              Our ambition is to build a separate hospital with all modern
              facilities. We aim to accommodate at least 50 senior citizens from
              diverse backgrounds, offering regular medical care, doctor visits,
              and a clean, healthy atmosphere.
            </p>

            <p className="text-gray-800 text-base leading-relaxed">
              We also plan to establish a palliative care center with qualified
              doctors and nurses to improve care. The estimated cost is around
              ₹1 crore for land and ₹2 crores for construction. We currently
              receive no government aid.
            </p>

            <p className="text-gray-800 text-base leading-relaxed">
              Our members are doing their best to achieve this goal. Your kind
              support can help us overcome financial challenges. Our trust and
              the public will always stand with you.
            </p>

            <a
              href="#"
              className="inline-block mx-auto lg:mx-0 w-fit px-8 py-3 bg-[#1f4d40] delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 text-white font-medium rounded-md shadow-md hover:bg-[#16382f] transition"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
