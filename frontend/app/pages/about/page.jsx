"use client";
import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <main className="bg-white text-[#1f4d40]">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
        <Image
          src="/images/hero-about.jpg" // replace with your hero image
          alt="Sree Krishna Charitable Trust"
          fill
          className="object-cover brightness-75"
        />
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
            <Image
              src="/images/mission.jpg" // replace with your mission image
              alt="Our Mission"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
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
          <div className="relative w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/gallery1.jpg"
              alt="Gallery Image 1"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/gallery2.jpg"
              alt="Gallery Image 2"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/gallery3.jpg"
              alt="Gallery Image 3"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
