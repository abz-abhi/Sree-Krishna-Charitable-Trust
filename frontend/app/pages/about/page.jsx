"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const AboutPage = () => {
  const [aboutImages, setAboutImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutImages = async () => {
      try {
        const response = await fetch("/api/images");
        const images = await response.json();

        // Organize images by their section
        const organizedImages = {};

        // Hero image (about-1)
        const heroImage = images.find((img) => img.section === "about-1");
        organizedImages.hero = heroImage || null;

        // Mission image (about-2)
        const missionImage = images.find((img) => img.section === "about-2");
        organizedImages.mission = missionImage || null;

        // Gallery images (about-3, about-4, about-5)
        const galleryImage1 = images.find((img) => img.section === "about-3");
        const galleryImage2 = images.find((img) => img.section === "about-4");
        const galleryImage3 = images.find((img) => img.section === "about-5");

        organizedImages.gallery = [
          galleryImage1 || null,
          galleryImage2 || null,
          galleryImage3 || null,
        ];

        setAboutImages(organizedImages);
      } catch (err) {
        console.error("Error fetching about images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutImages();
  }, []);

  // Function to get image source (handles base64)
  const getImageSrc = (image) => {
    if (image?.imageData) {
      return `data:${image.mimetype};base64,${image.imageData}`;
    }
    return image?.filepath;
  };

  // Default placeholder images
  const defaultImages = {
    hero: "/images/hero-about.jpg",
    mission: "/images/mission.jpg",
    gallery: [
      "/images/gallery1.jpg",
      "/images/gallery2.jpg",
      "/images/gallery3.jpg",
    ],
  };

  return (
    <main className="bg-white text-[#1f4d40]">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
        {aboutImages.hero ? (
          <Image
            src={getImageSrc(aboutImages.hero)}
            alt={
              aboutImages.hero.originalName || "Sree Krishna Charitable Trust"
            }
            fill
            className="object-cover brightness-75"
            unoptimized={!!aboutImages.hero.imageData}
            priority
          />
        ) : (
          <Image
            src={defaultImages.hero}
            alt="Sree Krishna Charitable Trust"
            fill
            className="object-cover brightness-75"
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg">
            Sree Krishna Charitable Trust
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl drop-shadow-md">
            Spreading Love & Service to Our Elderly with Care and Compassion
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-[#fdf6f0] to-[#e8f0f2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
            {aboutImages.mission ? (
              <Image
                src={getImageSrc(aboutImages.mission)}
                alt={aboutImages.mission.originalName || "Our Mission"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                unoptimized={!!aboutImages.mission.imageData}
              />
            ) : (
              <Image
                src={defaultImages.mission}
                alt="Our Mission"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1f4d40] leading-tight">
              Our Mission
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Presently we are operating the old Age Home in a rented house with
              few inmates, adhering to all Government and statutory body's rules
              and regulations. We wish to maintain the right ambiance for the
              elderly.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Our dream is to build a spacious hostel with modern facilities
              where we can accommodate at least 50 inmates. Amenities include
              clean rooms with attached bathrooms, good beds, tables, lockers,
              meeting places, gardens, and above all, clean healthy vegetarian
              food.
            </p>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              We also wish to provide a Palliative Care Centre with qualified
              doctors and nurses on site. Land is purchased and construction is
              in progress. Estimated total cost is approximately 2 Crores. We
              appeal to all well-wishers to extend a helping hand in championing
              our noble cause.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 sm:py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1f4d40]">
            Our Work in Action
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            A glimpse of our environment and care for the elderly.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gallery Image 1 */}
          <div className="relative w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden shadow-lg">
            {aboutImages.gallery?.[0] ? (
              <Image
                src={getImageSrc(aboutImages.gallery[0])}
                alt={aboutImages.gallery[0].originalName || "Gallery Image 1"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                unoptimized={!!aboutImages.gallery[0]?.imageData}
              />
            ) : (
              <Image
                src={defaultImages.gallery[0]}
                alt="Gallery Image 1"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>

          {/* Gallery Image 2 */}
          <div className="relative w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden shadow-lg">
            {aboutImages.gallery?.[1] ? (
              <Image
                src={getImageSrc(aboutImages.gallery[1])}
                alt={aboutImages.gallery[1].originalName || "Gallery Image 2"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                unoptimized={!!aboutImages.gallery[1]?.imageData}
              />
            ) : (
              <Image
                src={defaultImages.gallery[1]}
                alt="Gallery Image 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>

          {/* Gallery Image 3 */}
          <div className="relative w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden shadow-lg">
            {aboutImages.gallery?.[2] ? (
              <Image
                src={getImageSrc(aboutImages.gallery[2])}
                alt={aboutImages.gallery[2].originalName || "Gallery Image 3"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                unoptimized={!!aboutImages.gallery[2]?.imageData}
              />
            ) : (
              <Image
                src={defaultImages.gallery[2]}
                alt="Gallery Image 3"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>
        </div>

        {/* Upload Status */}
        <div className="mt-8 text-center">
          {loading ? (
            <p className="text-gray-500">Loading images...</p>
          ) : (
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <p className="text-blue-700 text-sm">
                {Object.values(aboutImages).filter((img) => img).length > 0
                  ? `✅ ${
                      Object.values(aboutImages).filter((img) => img).length
                    } custom images loaded`
                  : "ℹ️ Using default images - Upload custom images from admin panel"}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
