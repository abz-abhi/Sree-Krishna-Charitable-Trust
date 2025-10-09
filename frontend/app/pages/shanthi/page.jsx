"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Building2, Users, HandHelping, Home } from "lucide-react";

export default function SanthiBhavanPage() {
  const [shanthiImages, setShanthiImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShanthiImages = async () => {
      try {
        const response = await fetch("/api/images");
        const images = await response.json();

        // Organize images by their section
        const organizedImages = {};

        // Hero image (shanthi-1)
        const heroImage = images.find((img) => img.section === "shanthi-1");
        organizedImages.hero = heroImage || null;

        // Community image (shanthi-2)
        const communityImage = images.find(
          (img) => img.section === "shanthi-2"
        );
        organizedImages.community = communityImage || null;

        // Mission image (shanthi-3)
        const missionImage = images.find((img) => img.section === "shanthi-3");
        organizedImages.mission = missionImage || null;

        // Vision image (shanthi-4)
        const visionImage = images.find((img) => img.section === "shanthi-4");
        organizedImages.vision = visionImage || null;

        // Construction images (shanthi-5, shanthi-6, shanthi-7)
        const landImage = images.find((img) => img.section === "shanthi-5");
        const blueprintImage = images.find(
          (img) => img.section === "shanthi-6"
        );
        const futureImage = images.find((img) => img.section === "shanthi-7");

        organizedImages.construction = [
          landImage || null,
          blueprintImage || null,
          futureImage || null,
        ];

        setShanthiImages(organizedImages);
      } catch (err) {
        console.error("Error fetching shanthi images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShanthiImages();
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
    hero: "/images/santhi-bhavan-hero.jpg",
    community: "/images/santhi-bhavan-community.jpg",
    mission: "/images/mission.jpg",
    vision: "/images/vision.jpg",
    construction: [
      "/images/new-land.jpg",
      "/images/blueprint.jpg",
      "/images/future-render.jpg",
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#f0f7f2] text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[550px] flex items-center justify-center overflow-hidden shadow-xl">
        {shanthiImages.hero ? (
          <Image
            src={getImageSrc(shanthiImages.hero)}
            alt={
              shanthiImages.hero.originalName ||
              "Santhi Bhavan, a serene home for the elderly"
            }
            fill
            className="object-cover brightness-[.55] saturate-125"
            unoptimized={!!shanthiImages.hero.imageData}
            priority
          />
        ) : (
          <Image
            src={defaultImages.hero}
            alt="Santhi Bhavan, a serene home for the elderly"
            fill
            className="object-cover brightness-[.55] saturate-125"
            priority
          />
        )}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-7xl font-extrabold mb-4 drop-shadow-xl text-white tracking-tight"
          >
            ശാന്തി ഭവൻ തളിപ്പറമ്പ്
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl sm:text-2xl text-white/95 font-light"
          >
            A Sanctuary of Love, Care, and Dignity for the Golden Years
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(31, 77, 64, 0.5)",
            }}
            href="#donate-section"
            className="mt-10 inline-flex items-center gap-3 bg-[#1f4d40] text-white font-semibold px-10 py-4 rounded-lg shadow-xl hover:bg-[#2a6655] transition-all duration-300 text-lg"
          >
            <HandHelping className="w-6 h-6" />
            Support Our New Building Project
          </motion.a>
        </div>
      </section>

      {/* Intro Section - The Essence */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-6 text-[17px] text-gray-700"
          >
            <h2 className="text-4xl font-bold mb-6 text-[#1f4d40]">
              ഞങ്ങൾ ഒരു കൂടൊരുക്കുന്നു...
            </h2>
            <motion.p variants={itemVariants} className="text-lg">
              ഞങ്ങൾ സ്വന്തമായി ഒരു കൂടൊരുക്കുന്നു.. മഹത്തായ ഈ ഉദ്ദ്യമത്തിൽ
              നിങ്ങൾക്കും പങ്കാളികളാകാം. ജീവിത സായാഹ്നത്തിൽ ഒറ്റപ്പെടുന്നവർക്ക്
              ഒരുകൈത്താങ്ങ്.
            </motion.p>
            <motion.p variants={itemVariants}>
              സുഹൃത്തുക്കളേ, 2021 ൽ തളിപ്പറമ്പിലും പരിസരത്തുമുള്ള ഒരു കൂട്ടം
              മനുഷ്യ സ്നേഹികൾ സ്ഥാപിച്ചതാണ്{" "}
              <span className="font-bold text-[#1f4d40] bg-green-100/70 px-1 rounded">
                ശ്രീ കൃഷ്ണ ചാരിറ്റബിൾ ട്രസ്റ്റ്
              </span>{" "}
              (രജി നമ്പർ 86/21). 2022 ഏപ്രിൽ 17ന് **"ശാന്തി ഭവൻ"** എന്ന
              വൃദ്ധസദനം ആരംഭിച്ചു.
            </motion.p>
            <motion.p variants={itemVariants}>
              തളിപ്പറമ്പ് തൃച്ചംബരം ക്ഷേത്രത്തിനടുത്തുള്ള താത്കാലിക
              കെട്ടിടത്തിലാണ് ഇതിന്റെ പ്രവർത്തനം. ഇപ്പോഴുള്ള സൗകര്യങ്ങൾ
              പരിമിതമായതുകൊണ്ട് പുതുതായി വരുന്ന അംഗങ്ങളെ ഉൾപ്പെടുത്താൻ
              സാധിക്കാതെ വരുന്നു.
            </motion.p>
          </motion.div>

          {/* Image 1: Community/Interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] rounded-2xl shadow-2xl overflow-hidden"
          >
            {shanthiImages.community ? (
              <Image
                src={getImageSrc(shanthiImages.community)}
                alt={
                  shanthiImages.community.originalName ||
                  "Elderly residents laughing together"
                }
                fill
                className="object-cover"
                unoptimized={!!shanthiImages.community.imageData}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <Image
                src={defaultImages.community}
                alt="Elderly residents laughing together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Divider with Quote */}
      <div className="py-12 bg-[#e7f0eb] border-t border-b border-green-200">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          className="text-center text-2xl italic font-serif text-[#1f4d40]/90 max-w-4xl mx-auto px-4"
        >
          "The greatest use of life is to spend it for something that will
          outlast it."
        </motion.p>
      </div>

      {/* Mission + Vision */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-stretch">
          {/* Mission Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
            className="rounded-2xl shadow-xl bg-white border border-green-100 flex flex-col"
          >
            <div className="relative w-full h-[280px] rounded-t-2xl overflow-hidden">
              {shanthiImages.mission ? (
                <Image
                  src={getImageSrc(shanthiImages.mission)}
                  alt={shanthiImages.mission.originalName || "Our Mission"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  unoptimized={!!shanthiImages.mission.imageData}
                />
              ) : (
                <Image
                  src={defaultImages.mission}
                  alt="Our Mission"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>
            <div className="p-8 flex-grow">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-green-700">
                <Heart className="text-red-500 w-7 h-7" /> Our MISSION
              </h2>
              <p className="text-[17px] leading-relaxed text-gray-700">
                ഇന്ത്യയിൽ താമസിക്കുന്ന ദരിദ്രർക്ക്, ആശ്രയമില്ലാത്തവർക്ക് രോഗം,
                അപകടം, പ്രായം തുടങ്ങിയവയാൽ ദുരിതമനുഭവിക്കുന്നവർക്ക് താങ്ങും
                തണലുമായും പാവപ്പെട്ടവരുടെ സമുന്മാനത്തിനായുള്ള പ്രവർത്തനങ്ങൾ
                സംഘടിപ്പിക്കുന്നതിനുമാണ് ഈ ട്രസ്റ്റിന്റെ രൂപീകരണം.
              </p>
            </div>
          </motion.div>

          {/* Vision Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
            className="rounded-2xl shadow-xl bg-white border border-green-100 flex flex-col"
          >
            <div className="relative w-full h-[280px] rounded-t-2xl overflow-hidden">
              {shanthiImages.vision ? (
                <Image
                  src={getImageSrc(shanthiImages.vision)}
                  alt={shanthiImages.vision.originalName || "Our Vision"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  unoptimized={!!shanthiImages.vision.imageData}
                />
              ) : (
                <Image
                  src={defaultImages.vision}
                  alt="Our Vision"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>
            <div className="p-8 flex-grow">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-blue-700">
                <Building2 className="text-blue-500 w-7 h-7" /> Our VISION
              </h2>
              <p className="text-[17px] leading-relaxed text-gray-700">
                ജാതി-മത-വർഗ്ഗഭേദമന്യേ എല്ലാ മനുഷ്യർക്കും സന്തോഷകരമായ
                ജീവിതാനുഭവങ്ങൾ ലഭ്യമാക്കുക എന്നതാണ് ഞങ്ങളുടെ ദർശനം.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Construction/Need Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#1f4d40]">
          Building a Permanent Home of Compassion
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Image 2: New Location/Land */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-64 rounded-xl shadow-lg overflow-hidden border-4 border-white"
          >
            {shanthiImages.construction?.[0] ? (
              <Image
                src={getImageSrc(shanthiImages.construction[0])}
                alt={
                  shanthiImages.construction[0].originalName ||
                  "New land acquired for Santhi Bhavan"
                }
                fill
                className="object-cover"
                unoptimized={!!shanthiImages.construction[0]?.imageData}
              />
            ) : (
              <Image
                src={defaultImages.construction[0]}
                alt="New land acquired for Santhi Bhavan"
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <p className="text-white text-xl font-semibold">Land Acquired</p>
            </div>
          </motion.div>

          {/* Image 3: Blueprint/Construction */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-64 rounded-xl shadow-lg overflow-hidden border-4 border-white"
          >
            {shanthiImages.construction?.[1] ? (
              <Image
                src={getImageSrc(shanthiImages.construction[1])}
                alt={
                  shanthiImages.construction[1].originalName ||
                  "Architectural Blueprint for the new facility"
                }
                fill
                className="object-cover"
                unoptimized={!!shanthiImages.construction[1]?.imageData}
              />
            ) : (
              <Image
                src={defaultImages.construction[1]}
                alt="Architectural Blueprint for the new facility"
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white text-xl font-semibold">
                Construction Underway
              </p>
            </div>
          </motion.div>

          {/* Image 4: Future Render */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative h-64 rounded-xl shadow-lg overflow-hidden border-4 border-white"
          >
            {shanthiImages.construction?.[2] ? (
              <Image
                src={getImageSrc(shanthiImages.construction[2])}
                alt={
                  shanthiImages.construction[2].originalName ||
                  "Architectural render of the future Santhi Bhavan"
                }
                fill
                className="object-cover"
                unoptimized={!!shanthiImages.construction[2]?.imageData}
              />
            ) : (
              <Image
                src={defaultImages.construction[2]}
                alt="Architectural render of the future Santhi Bhavan"
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <p className="text-white text-xl font-semibold">Future Home</p>
            </div>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 text-center text-[18px] text-gray-700">
          <p className="mb-4">
            അതിനാൽ ആധുനിക സജ്ജീകരണങ്ങളോടുകൂടിയ കെട്ടിടം നിർമ്മിക്കുന്നതിനായി
            സ്ഥലം വാങ്ങുകയും പ്രവർത്തനങ്ങൾ ആരംഭിക്കുകയും ചെയ്തിരിക്കുന്നു.
            സുമനസ്സുകളുടെ സഹായ സഹകരണത്തോടെയാണ് ഇത്രയും കാര്യങ്ങൾ
            സാധിച്ചിട്ടുള്ളത്.
          </p>
          <p className="font-semibold text-[#1f4d40]">
            ഇനി നിർമ്മാണ പ്രവർത്തനങ്ങൾ സമയബന്ധിതമായി ത്വരിതപ്പെടുത്തേണ്ടതുണ്ട്.
            അതിന് നിങ്ങളുടെ പിന്തുണ അത്യാവശ്യമാണ്.
          </p>
        </div>

        {/* Upload Status */}
        <div className="mt-8 text-center">
          {loading ? (
            <p className="text-gray-500">Loading images...</p>
          ) : (
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              
               
            </div>
          )}
        </div>
      </section>

      {/* Sponsorship Section - Call to Action */}
      <section
        id="donate-section"
        className="bg-[#e7f0eb] py-20 text-center px-6 shadow-inner"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-[#1f4d40] mb-8"
          >
            നിങ്ങൾക്കും ഞങ്ങളെ സഹായിക്കാം - Sponsor a Square Foot!
          </motion.h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            നിങ്ങളുടെ ഉറ്റവരുടെ ഓർമ്മയ്ക്കായി ഹാളുകൾ, മുറികൾ എന്നിവ **സ്പോൺസർ**
            ചെയ്യാം. ആജീവനാന്തം അവരുടെ പേരുകൾ അവിടെ നാമകരണം ചെയ്യപ്പെടും. ഒരു
            **സ്ക്വയർ ഫീറ്റിന് ₹2000** വീതം വെച്ച് കഴിവിനനുസരിച്ച് സംഭാവന
            ചെയ്യാം. കൂടാതെ, നിർമ്മാണത്തിനുള്ള അസംസ്കൃത വസ്തുക്കളോ
            അന്തേവാസികൾക്കുള്ള ഭക്ഷണമോ വസ്ത്രമോ നൽകിയും സഹായിക്കാം.
          </p>

          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(110, 231, 183, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            href="/donate" // Link to your donation page
            className="mt-6 inline-flex items-center gap-3 bg-green-600 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 text-xl"
          >
            <Home className="w-6 h-6" />
            Join Hands & Donate Today
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f4d40] text-white text-center py-8">
        <p className="text-xl font-medium mb-2">
          SREE KRISHNA CHARITABLE TRUST (Reg No: 86/21)
        </p>
        <p className="text-sm opacity-80">
          Spreading Love, Care & Compassion in Taliparamba
        </p>
      </footer>
    </div>
  );
}
