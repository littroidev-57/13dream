'use client';

import React from 'react';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9990]">
      <a
        id="WhatsApp-button"
        href="https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20would%20like%20to%20enquire%20about%20study%20visa"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp with 13 Dreams counselor"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-600/35 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white"
      >
        {/* Subtle Online Pulse Dot */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </span>

        {/* Crisp WhatsApp Icon */}
        <i className="fa-brands fa-whatsapp text-2xl sm:text-[27px] drop-shadow-sm"></i>

        {/* Tooltip on desktop hover */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-gray-900/95 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg hidden sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
