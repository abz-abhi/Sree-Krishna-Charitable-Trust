"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const HomePage = () => {
  const [homeImage, setHomeImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeImage = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();

        // Look for the new section name "home-main"
        const homeImg = data.filter((item) => item.section === "home-main");
        const latestMain = homeImg.reduce((latest, item) => {
          return new Date(item.updatedAt) > new Date(latest.updatedAt)
            ? item
            : latest;
        }, homeImg[0]);

        setHomeImage(latestMain || null);
      } catch (err) {
        console.error("Error fetching home image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeImage();
  }, []);

  // Function to get image source - handles both base64 and filepath
  const getImageSrc = (image) => {
    if (image?.imageData) {
      return `data:${image.mimetype};base64,${image.imageData}`;
    }
    return image?.filepath;
  };

  return (
    <section className="py-16 sm:py-20 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-28 px-4 sm:px-6 lg:px-12">
        {/* Left Column */}
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

        {/* Right Column */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
          {homeImage && getImageSrc(homeImage) ? (
            <Image
              src={getImageSrc(homeImage)}
              alt={homeImage.originalName || "Home Page Image"}
              fill
              className="object-cover grayscale-[30%] hover:grayscale-0 transition duration-500"
              unoptimized={!!homeImage.imageData}
              priority={true}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <p className="text-gray-500 text-sm sm:text-base">
                {homeImage ? "No image available" : "Loading image..."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
