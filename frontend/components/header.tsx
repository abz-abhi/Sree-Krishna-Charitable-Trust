"use client";
import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "About", href: "/pages/about" },
  { name: "Santhi Bhavan", href: "/pages/shanthi" },
  { name: "Contact", href: "/pages/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-lime-50/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo Section */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center shadow-md">
              <img src="/favicon.ico" alt="Logo" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-emerald-700 font-medium transition duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-700 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Call Button */}
            <a
              href="tel:9446084671"
              className="hidden md:flex items-center px-4 py-2 bg-[#1f4d40] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition"
            >
              <FaPhone className="mr-2 w-5 h-5" />
              9446084671
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-lime-100 transition"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 bg-lime-50/95 shadow-inner rounded-b-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-lime-200 hover:text-emerald-700 font-medium transition"
            >
              {link.name}
            </a>
          ))}
          <a
            href="tel:9446084671"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 block w-full px-4 py-3 text-center bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
          >
            <div className="flex items-center justify-center">
              <FaPhone className="w-5 h-5 mr-2" />
              Call
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
