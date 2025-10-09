"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";

export default function ContactPage() {
  const [contactImage, setContactImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactImage = async () => {
      try {
        const response = await fetch("/api/images");
        const images = await response.json();

        // Look for the contact section image
        const contactImg = images.find((img) => img.section === "contact");
        setContactImage(contactImg || null);
      } catch (err) {
        console.error("Error fetching contact image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactImage();
  }, []);

  // Function to get image source (handles base64)
  const getImageSrc = (image) => {
    if (image?.imageData) {
      return `data:${image.mimetype};base64,${image.imageData}`;
    }
    return image?.filepath;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fdfb] to-[#e8f4f0]">
      {/* Hero Section with Dynamic Image */}
      <section className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        {contactImage ? (
          <Image
            src={getImageSrc(contactImage)}
            alt={
              contactImage.originalName ||
              "Contact Sree Krishna Charitable Trust"
            }
            fill
            className="object-cover brightness-[.6]"
            unoptimized={!!contactImage.imageData}
            priority
          />
        ) : (
          <Image
            src="/images/contact-hero.jpg"
            alt="Contact Sree Krishna Charitable Trust"
            fill
            className="object-cover brightness-[.6]"
            priority
          />
        )}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-bold mb-6 text-white drop-shadow-2xl"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl sm:text-2xl text-white/95 font-light max-w-2xl mx-auto"
          >
            Your support can bring smiles to many elderly lives. Let's connect
            and make a difference together.
          </motion.p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 sm:py-20 px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-[#1f4d40] mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 text-lg">
                Reach out to us for any inquiries, support, or to visit our
                facility. We're here to help and welcome your involvement.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Address */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-green-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    Our Address
                  </h3>
                  <p className="text-gray-600">
                    Santhi Bhavan Old Age Home
                    <br />
                    Near Trichambaram Temple
                    <br />
                    Taliparamba, Kannur District
                    <br />
                    Kerala - 670141
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    Phone Numbers
                  </h3>
                  <p className="text-gray-600">
                    +91 12345 67890
                    <br />
                    +91 98765 43210
                  </p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    Email Address
                  </h3>
                  <p className="text-gray-600">
                    info@sreekrishnatrust.org
                    <br />
                    support@sreekrishnatrust.org
                  </p>
                </div>
              </motion.div>

              {/* Visiting Hours */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    Visiting Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Sunday: 9:00 AM - 6:00 PM
                    <br />
                    <span className="text-sm text-gray-500">
                      Prior appointment recommended
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Trust Registration */}
            <motion.div
              variants={itemVariants}
              className="bg-[#1f4d40] text-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-300" />
                Registered Trust
              </h3>
              <p className="text-green-100">
                Sree Krishna Charitable Trust
                <br />
                Registration No: 86/21
                <br />
                Under Government of Kerala
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-[#1f4d40] mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="donation">Donation Inquiry</option>
                    <option value="volunteer">Volunteer Opportunity</option>
                    <option value="visit">Schedule a Visit</option>
                    <option value="support">Elderly Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us how you'd like to help or any questions you have..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -3px rgba(31, 77, 64, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#1f4d40] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#2a6655] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>

            {/* Upload Status */}
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-500">Loading contact image...</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                  <p className="text-blue-700 text-sm">
                    {contactImage
                      ? "✅ Custom contact image loaded"
                      : "ℹ️ Using default image - Upload custom contact image from admin panel"}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#1f4d40] mb-4">Find Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Visit our facility in Taliparamba. We're located near the historic
              Trichambaram Temple, easily accessible from major routes in Kannur
              district.
            </p>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden h-[400px]"
          >
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.223456789012!2d75.3456789!3d12.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIwJzQ0LjQiTiA3NcKwMjAnNDQuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sree Krishna Charitable Trust Location"
              className="filter grayscale-[25%] hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </motion.div>

          {/* Transportation Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">By Road</h3>
              <p className="text-green-700 text-sm">
                3km from Taliparamba town, easily accessible via NH66
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-2">
                Public Transport
              </h3>
              <p className="text-blue-700 text-sm">
                Buses available from Kannur and nearby towns to Taliparamba
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-2">Landmark</h3>
              <p className="text-purple-700 text-sm">
                Near Trichambaram Temple, opposite to the main entrance
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#1f4d40] to-[#2a6655] text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Your call or visit could be the beginning of a beautiful journey in
            serving our elderly community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+911234567890"
              className="bg-white text-[#1f4d40] font-semibold px-8 py-4 rounded-lg hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#visit"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#1f4d40] transition-all duration-300"
            >
              Schedule a Visit
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
