"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const MissionSection = () => {
  const [missionImage, setMissionImage] = useState(null);

  const fetchMissionImage = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();

      const missionImg = data.filter((item) => item.section === "mission");
      const latestMission = missionImg.reduce((latest, item) => {
        return new Date(item.updatedAt) > new Date(latest.updatedAt)
          ? item
          : latest;
      }, missionImg[0]);

      setMissionImage(latestMission || null);
    } catch (err) {
      console.error("Error fetching mission image:", err);
    }
  };

  useEffect(() => {
    fetchMissionImage();
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-28 lg:gap-20 px-4 sm:px-8 lg:px-12">
        {/* Left Column - Image */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[700px] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-none">
          {missionImage ? (
            <Image
              src={missionImage.filepath || missionImage.imageUrl}
              alt="Mission"
              fill
              className="object-cover grayscale-[30%] hover:grayscale-0 transition duration-700 ease-in-out"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg">
              <p className="text-gray-500 text-sm sm:text-base">
                Loading mission image...
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Text */}
        <div className="space-y-8 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1f4d40] leading-tight tracking-tight">
            Our Mission
          </h2>

          <div className="bg-[#eee6dc] flex flex-col space-y-6 p-6 sm:p-8 rounded-2xl shadow-[1px_8px_15px_0px_#66A0A0AF] transition-all duration-500 hover:shadow-[2px_10px_20px_0px_#7bb5b5b0]">
            <p className="text-gray-800 text-base  leading-relaxed">
              Presently we are operating the old age home in a rented house with
              two inmates since July 2004. We are a statutory body governed by
              rules and regulations, striving to maintain the highest standards
              in service delivery.
            </p>

            <p className="text-gray-800 text-base  leading-relaxed">
              Our ambition is to build a separate hospital with all modern
              facilities. We aim to accommodate at least 50 senior citizens from
              diverse backgrounds, offering regular medical care, doctor visits,
              and a clean, healthy atmosphere.
            </p>

            <p className="text-gray-800 text-base  leading-relaxed">
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
