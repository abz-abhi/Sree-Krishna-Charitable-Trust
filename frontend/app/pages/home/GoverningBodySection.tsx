"use client";
import React from "react";

const members = [
  { id: 1, name: "KK Nambiar", role: "Patron", phone: "9496928577" },
  { id: 2, name: "Raveendran Athilat", role: "Patron", phone: "8137008008" },
  { id: 3, name: "PR Narayanan", role: "Chairman", phone: "9546084671" },
  { id: 4, name: "VV Harindran", role: "Vice Chairman", phone: "9446444710" },
  { id: 5, name: "KV Padmanabhan", role: "Convenor", phone: "8281158662" },
  { id: 6, name: "KPV Ravindran", role: "Joint Convenor", phone: "9381511933" },
  { id: 7, name: "SK Muralidharan", role: "Treasurer", phone: "9605202057" },
  { id: 8, name: "KV Vilasan", role: "Director", phone: "9846203407" },
  { id: 9, name: "P Gopinathan", role: "Director", phone: "8547503717" },
  { id: 10, name: "Janardhanan Palakkal", role: "Director", phone: "8589805396" },
  { id: 11, name: "V V Radha Krishnan", role: "Director", phone: "9567638462" },
];

const GoverningBodySection = () => {
  return (
    <section className=" py-16 sm:py-20 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1f4d40] mb-3">
            Governing Body Members
          </h2>
          <div className="w-24 h-1 bg-[#1f4d40] mx-auto rounded-full"></div>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {members.map((member) => (
            <div
              key={member.id}
              className="relative bg-[#f1e8dd] border border-[#dcd2c5] p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Number Tag */}
              <div className="absolute -top-3 -left-3 bg-[#1f4d40] text-white w-8 h-8 flex items-center justify-center rounded-md font-semibold shadow">
                {member.id}
              </div>

              {/* Member Info */}
              <h3 className="text-xl font-semibold text-[#1f4d40] mb-2">
                {member.name}{" "}
                <span className="text-[#3f7a67] font-medium">
                  | {member.role}
                </span>
              </h3>
              <p className="text-gray-700 text-sm">{member.phone}</p>
            </div>
          ))}
        </div>

        
        
      </div>
    </section>
  );
};

export default GoverningBodySection;
