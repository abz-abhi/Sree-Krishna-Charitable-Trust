"use client";
import React from "react";
import Image from "next/image";

const JoinHandsSection = () => {
  return (
    <section className="py-16 sm:py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg order-1 lg:order-none">
          <Image
            src="/images/joel-muniz-A4Ax1ApccfA-unsplash.jpg" // 👈 replace with your image
            alt="Helping hands"
            fill
            className="object-cover grayscale-[40%] hover:grayscale-0 transition duration-500"
          />
        </div>

        {/* Right Content */}
        <div className="relative space-y-8">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1f4d40] leading-tight relative">
              <span className="px-2 sm:px-3 py-1 rounded-md">
                Join Hands In Spreading Love & Service
              </span>
            </h2>
          </div>

          {/* Info Box */}
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
