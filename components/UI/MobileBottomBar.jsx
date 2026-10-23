'use client';

import React from 'react';
import Link from 'next/link';

export default function MobileBottomBar() {
  const handleOpenAi = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-ai-counselor'));
    }
  };

  const handleScrollToCalculator = (e) => {
    e.preventDefault();
    const el = document.getElementById('eligibility-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#eligibility-calculator';
    }
  };

  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[9990] bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 py-2 safe-area-bottom select-none"
    >
      <div className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto">
        {/* 1. Call Now */}
        <a
          href="tel:+919759053463"
          aria-label="Call 13 Dreams counselor"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl active:bg-gray-100 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-sm group-active:scale-95 transition-transform">
            <i className="fa-solid fa-phone"></i>
          </div>
          <span className="text-[10px] font-bold text-gray-700 mt-0.5 tracking-tight">Call</span>
        </a>

        {/* 2. WhatsApp */}
        <a
          href="https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20would%20like%20to%20enquire%20about%20study%20visa%20and%20admissions"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with counselor on WhatsApp"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl active:bg-emerald-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-base shadow-sm group-active:scale-95 transition-transform">
            <i className="fa-brands fa-whatsapp"></i>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 mt-0.5 tracking-tight">WhatsApp</span>
        </a>

        {/* 3. Ask AI Priya */}
        <button
          type="button"
          onClick={handleOpenAi}
          aria-label="Ask Priya AI counselor"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl active:bg-red-50 transition-colors group relative"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-gray-950 via-red-950 to-red-600 text-white flex items-center justify-center text-xs shadow-sm border border-red-500/40 group-active:scale-95 transition-transform">
            <i className="fa-solid fa-wand-magic-sparkles text-red-400"></i>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </div>
          <span className="text-[10px] font-bold text-gray-900 mt-0.5 tracking-tight">Ask AI</span>
        </button>

        {/* 4. Check Eligibility */}
        <button
          type="button"
          onClick={handleScrollToCalculator}
          aria-label="Check study visa eligibility"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl active:bg-blue-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm group-active:scale-95 transition-transform">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <span className="text-[10px] font-bold text-gray-700 mt-0.5 tracking-tight">Eligibility</span>
        </button>
      </div>
    </nav>
  );
}
