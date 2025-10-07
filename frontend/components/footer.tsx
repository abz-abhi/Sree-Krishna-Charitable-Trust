import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

// The navigation links and contact info from the image
const footerLinks = [
  { name: "About", href: "#" },
  { name: "Santhi Bhavan", href: "#" },
  { name: "Contact", href: "#" },
];
const getInvolvedLinks = [
  { name: "Donation", href: "/donation" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Events", href: "/events" },
];

// Re-using the navigation structure for consistency with the header
const Footer = () => {
  return (
    // The main container has the light, earthy background color from the image
    <footer className="bg-lime-50/80 shadow-[0px_2px_20px_3px_#00000024] text-gray-700 py-10 border-t border-gray-200">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          {/* 1. Logo and Social Media Section */}
          <div className="flex gap-4 flex-wrap justify-between">
            {/* Logo placeholder, similar to the header's logo section */}
            <div className="flex flex-col space-y-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                {/* NOTE: Replace '/favicon.ico' with the actual path to your logo image */}
                <img
                  src="/favicon.ico"
                  alt="Trust Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="max-w-[28rem]">
                Dedicated to serving the community and fostering well-being
                through charitable activities.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-5 text-xl">
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="hover:text-emerald-700 transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="hover:text-emerald-700 transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  aria-label="YouTube"
                  className="hover:text-emerald-700 transition"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <h1 className="font-bold">QUICK LINKS</h1>
              <nav className="flex space-x-6 flex-col text-md font-medium">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-emerald-700 transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-emerald-700 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-col space-y-3">
              <h1 className="font-bold">GET INVOLVED</h1>
              <nav className="flex space-x-6 flex-col text-md font-medium">
                {getInvolvedLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-emerald-700 transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-emerald-700 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-col space-y-3">
              <h1 className="font-bold">CONTACT US</h1>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <strong className="font-semibold">
                  Thirichambaram, P.O Thaliparamba, Kannur District - 670
                </strong>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                <span className="font-semibold">Phone:</span> 94460 84671, 82811
                58662, 96052 02057 / 80788 777671
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope />
                <a
                  href="mailto:skccharitabletrust@gmail.com"
                  className="hover:text-emerald-700 transition"
                >
                  skccharitabletrust@gmail.com
                </a>
              </p>
            </div>
          </div>
          <br />
          <hr className="opacity-10" />
          <br />
          <div className="text-sm flex justify-between">
            <p>
              &copy; 2025 Sree Krishna Charitable Trust, Taliparamba.All rights
              reserved
            </p>
            <p>Reg. No: 141 / 86 / 2021 Dt: 18-10-2021</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
