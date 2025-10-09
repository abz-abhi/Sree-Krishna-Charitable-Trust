"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Handshake, ChevronRight } from "lucide-react";

export default function SanthiBhavanContactPage() {
  const [contactImages, setContactImages] = useState({});
  const [loading, setLoading] = useState(true);

  const trustInfo = {
    reg: "Reg. No. 86/2021 Dt-18-10-2021",
    address: "Thrichambaram, P.O. Taliparamba, Kannur District – 670 141",
    phone1: "94460 84671",
    phone2: "82811 58662",
    phone3: "96052 02057",
    phone4: "80788 77671",
    email: "skcharitabletpba@gmail.com",
  };

  useEffect(() => {
    const fetchContactImages = async () => {
      try {
        const response = await fetch("/api/images");
        const images = await response.json();

        // Organize images by their section
        const organizedImages = {};

        // Hero image (contact-1)
        const heroImage = images.find((img) => img.section === "contact-1");
        organizedImages.hero = heroImage || null;

        setContactImages(organizedImages);
      } catch (err) {
        console.error("Error fetching contact images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactImages();
  }, []);

  // Function to get image source (handles base64)
  const getImageSrc = (image) => {
    if (image?.imageData) {
      return `data:${image.mimetype};base64,${image.imageData}`;
    }
    return image?.filepath;
  };

  // Default placeholder image
  const defaultHeroImage = "/api/images";

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffffff] to-[#e7f0eb] text-gray-800">
      {/* Header Section with Image */}
      <section className="relative w-full h-[500px] flex items-end justify-center overflow-hidden shadow-2xl">
        {contactImages.hero ? (
          <Image
            src={getImageSrc(contactImages.hero)}
            alt={
              contactImages.hero.originalName ||
              "Santhi Bhavan new floor construction"
            }
            fill
            className="object-cover brightness-75 saturate-110"
            priority
            unoptimized={!!contactImages.hero.imageData}
          />
        ) : (
          <Image
            src={defaultHeroImage}
            alt="Santhi Bhavan new floor construction"
            fill
            className="object-cover brightness-75 saturate-110"
            priority
          />
        )}
        <div className="relative z-10 text-center pb-16 px-6 bg-gradient-to-t from-[#1f4d40]/80 via-transparent w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-extrabold mb-3 drop-shadow-lg text-white tracking-tight"
          >
            Reach Out Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl sm:text-2xl text-white/90 font-light"
          >
            SREEKRISHNA CHARITABLE TRUST & SANTHI BHAVAN
          </motion.p>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-white text-lg">Loading image...</div>
          </div>
        )}
      </section>

      {/* Main Content: Progress & Call to Action */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Progress Card */}
          <motion.div
            {...fadeInUp}
            className="lg:col-span-2 p-8 bg-white rounded-xl shadow-2xl border-t-4 border-[#1f4d40]"
          >
            <h2 className="text-3xl font-bold mb-4 text-[#1f4d40] flex items-center">
              <Handshake className="w-7 h-7 mr-3 text-green-600" />
              Our Urgent Need & Progress
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              <span className="font-semibold text-[#1f4d40]">
                We are near the finish line!
              </span>{" "}
              We expect to open our **new floor** soon to shift our beloved
              inmates from the current rented building to a safe and permanent
              home.
            </p>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 shadow-inner">
              <p className="text-xl font-medium text-green-800 mb-3">
                Current Status:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>We have successfully finished the **Ground Floor**.</li>
                <li>Construction for the **First Floor** has begun.</li>
                <li>
                  <span className="font-bold">It is in your hand:</span> The
                  speed of finishing this dream project directly depends on the
                  support we receive.
                </li>
              </ul>
            </div>
            <motion.a
              whileHover={{ scale: 1.02, backgroundColor: "#2a6655" }}
              whileTap={{ scale: 0.98 }}
              href="/donate"
              className="mt-8 inline-flex items-center justify-center w-full text-center bg-[#1f4d40] text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-green-700 transition duration-300 text-lg"
            >
              Blessings and Cooperation with Helpful Arms{" "}
              <ChevronRight className="ml-2 w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Contact Details Card */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1 p-8 bg-white rounded-xl shadow-2xl border-t-4 border-green-500"
          >
            <h2 className="text-3xl font-bold mb-6 text-green-700">
              Get in Touch
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 mr-4 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#1f4d40]">Trust Address</p>
                  <p className="text-gray-600">{trustInfo.address}</p>
                  <p className="text-sm italic text-gray-500">
                    {trustInfo.reg}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-center mb-1">
                  <Phone className="w-6 h-6 mr-4 text-blue-500 flex-shrink-0" />
                  <p className="font-semibold text-[#1f4d40]">
                    Contact Numbers
                  </p>
                </div>
                <div className="ml-10 space-y-1">
                  <a
                    href={`tel:${trustInfo.phone1}`}
                    className="block text-gray-700 hover:text-green-600 transition"
                  >
                    {trustInfo.phone1}
                  </a>
                  <a
                    href={`tel:${trustInfo.phone2}`}
                    className="block text-gray-700 hover:text-green-600 transition"
                  >
                    {trustInfo.phone2}
                  </a>
                  <a
                    href={`tel:${trustInfo.phone3}`}
                    className="block text-gray-700 hover:text-green-600 transition"
                  >
                    {trustInfo.phone3}
                  </a>
                  <a
                    href={`tel:${trustInfo.phone4}`}
                    className="block text-gray-700 hover:text-green-600 transition"
                  >
                    {trustInfo.phone4}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1f4d40]">Email Us</p>
                  <a
                    href={`mailto:${trustInfo.email}`}
                    className="text-gray-700 hover:text-green-600 transition break-all"
                  >
                    {trustInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Consistent Branding */}
      <footer className="bg-[#1f4d40] text-white text-center py-8 mt-10">
        <p className="text-xl font-medium mb-2">
          SREE KRISHNA CHARITABLE TRUST
        </p>
        <p className="text-sm opacity-80">
          A Permanent Home for Dignity and Care
        </p>
      </footer>
    </div>
  );
}
