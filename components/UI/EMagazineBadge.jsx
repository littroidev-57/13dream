'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EMagazineBadge() {
  const pathname = usePathname();
  const [isDismissed, setIsDismissed] = useState(false);

  // Hide badge if on magazine or books page
  const isMagazinePage = pathname === '/e-magazine' || pathname === '/e-books';
  if (isMagazinePage || isDismissed) return null;

  return (
    <aside
      aria-label="Study Abroad E-Magazine and Brochures"
      className="fixed right-0 top-[46%] sm:top-1/2 -translate-y-1/2 z-[9980] flex select-none"
    >
      <Link
        href="/e-magazine"
        title="Explore 13 Dreams Official Study Abroad E-Magazines"
        className="group relative flex flex-col items-center justify-center gap-1.5 py-3 px-2 sm:px-2.5 rounded-l-2xl bg-black text-white shadow-2xl shadow-red-700/40 border-l-2 border-y-2 border-amber-400/80 hover:translate-x-[-4px] transition-all duration-300 overflow-hidden"
      >
        {/* Continuous Animated Light Shimmer Sweep */}
        <div className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent pointer-events-none animate-badge-shine"></div>

        {/* Top NEW Badge */}
        <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-gray-950 font-black text-[9px] uppercase tracking-wider shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
          NEW
        </span>

        {/* Book Icon with glowing halo */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-inner group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-300">
          <i className="fa-solid fa-book-open text-amber-300 text-sm drop-shadow-sm"></i>
        </div>

        {/* Column-Type Text: Vertical Orientation */}
        <div className="flex flex-col items-center text-center leading-tight">

          <span className="text-[9px] font-bold text-amber-200 uppercase tracking-tight">
            E-Books
          </span>
        </div>

        {/* Bottom indicator arrow */}
        <i className="fa-solid fa-angle-left text-[11px] text-amber-300 transform group-hover:translate-x-[-2px] transition-transform"></i>
      </Link>
    </aside>
  );
}
