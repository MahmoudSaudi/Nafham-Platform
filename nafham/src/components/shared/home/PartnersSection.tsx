"use client";

import React from "react";

import { PARTNERS_DATA } from "@/constants/homeData";

export default function PartnersSection() {

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl text-center mb-12">
        <h3 className="text-gray-500 font-bold text-sm tracking-widest uppercase">
          شركاء النجاح وداعمي منصة نفهم
        </h3>
      </div>
      
      <div className="relative flex w-full overflow-hidden" dir="ltr">
        <div className="flex w-max animate-marquee items-center">
          {/* First Set */}
          <div className="flex w-max items-center gap-16 md:gap-24 pr-16 md:pr-24">
            {PARTNERS_DATA.map((partner, index) => (
              <div 
                key={index} 
                className={`text-2xl md:text-3xl font-extrabold font-sans ${partner.color} hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer select-none drop-shadow-sm`}
              >
                {partner.name}
              </div>
            ))}
          </div>
          {/* Second Set (Duplicate for seamless loop) */}
          <div className="flex w-max items-center gap-16 md:gap-24 pr-16 md:pr-24" aria-hidden="true">
            {PARTNERS_DATA.map((partner, index) => (
              <div 
                key={index + PARTNERS_DATA.length} 
                className={`text-2xl md:text-3xl font-extrabold font-sans ${partner.color} hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer select-none drop-shadow-sm`}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Fade Gradients for visual depth */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
}
