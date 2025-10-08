"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const HomePage = () => {
  const [homeImage, setHomeImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeImage = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/images");

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const images = await response.json();

        // Filter images with 'main' section
        const mainImages = images.filter((img) => img.section === "main");

        if (mainImages.length > 0) {
          // Get the latest main image
          const latestMain = mainImages.reduce((latest, current) => {
            const latestDate = new Date(latest.updatedAt || latest.uploadedAt);
            const currentDate = new Date(
              current.updatedAt || current.uploadedAt
            );
            return currentDate > latestDate ? current : latest;
          });

          setHomeImage(latestMain);
        } else {
          setHomeImage(null);
        }
      } catch (err) {
        console.error("Error fetching home image:", err);
        setError(err.message);
        setHomeImage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeImage();
  }, []);

  // Function to get the correct image source
  const getImageSource = () => {
    if (!homeImage) return null;

    if (homeImage.imageData) {
      return `data:${homeImage.mimetype};base64,${homeImage.imageData}`;
    }

    if (homeImage.filepath) {
      return homeImage.filepath;
    }

    if (homeImage.imageUrl) {
      return homeImage.imageUrl;
    }

    return null;
  };

  const imageSrc = getImageSource();

  return (
    <section className="py-16 sm:py-20 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-28 px-4 sm:px-6 lg:px-12">
        {/* Left Column - Text */}
        <div className="space-y-8 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-[#1f4d40] leading-tight">
            Sree Krishna <br className="hidden sm:block" /> Charitable Trust
          </h1>

          <div className="bg-[#eee6dc] flex flex-col space-y-6 p-6 sm:p-8 rounded-lg shadow-[1px_8px_12px_0px_#66A0A0AF]">
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
              An old age home for the most needy with maximum possible comforts.
              As you may visualise all the inmates are in the last leg of their
              life span. They are not looked after by their kith and kin but
              left them to mend for themselves.
              <span className="font-semibold text-black">
                {" "}
                They need care and love.
              </span>
            </p>
            <a
              href="#"
              className="inline-block mx-auto lg:mx-0 w-fit px-6 py-3 bg-[#1f4d40] delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-white font-medium rounded-md shadow-md hover:bg-[#16382f] transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f4d40] mb-3"></div>
              <p className="text-gray-600 text-sm">Loading image...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center w-full h-full bg-red-50 p-4">
              <div className="text-red-500 text-lg mb-2">⚠️</div>
              <p className="text-red-600 text-sm text-center">
                Failed to load image
              </p>
              <p className="text-red-500 text-xs text-center mt-1">{error}</p>
            </div>
          ) : homeImage && imageSrc ? (
            <Image
              src={imageSrc}
              alt={homeImage.originalName || "Home Page Image"}
              fill
              className="object-cover grayscale-[30%] hover:grayscale-0 transition duration-500"
              unoptimized={!!homeImage.imageData}
              priority={true}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 p-6">
              <div className="text-4xl text-gray-400 mb-3">🏠</div>
              <p className="text-gray-600 text-sm font-medium text-center mb-1">
                No Home Image
              </p>
              <p className="text-gray-500 text-xs text-center">
                Upload an image with section set to "main"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
