'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function JourneyCtaBanner() {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';

  return (
    <section className="pt-20 sm:pt-28 md:pt-36 pb-12 md:pb-20 bg-white overflow-visible">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-[32px] md:rounded-[48px] overflow-visible shadow-2xl shadow-red-950/25 px-6 sm:px-10 lg:px-16 pt-10 pb-10 lg:pb-12 border border-red-500/20"
          style={{
            background: 'linear-gradient(135deg, #101318 0%, #1c090d 40%, #2b0811 75%, #0d0f13 100%)',
          }}
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-red-600/15 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-red-500/20 blur-[100px] pointer-events-none" />

          {/* Background SVG Doodle Art */}
          {/* 2. Location Pin doodle */}
          <svg
            className="absolute top-7 right-[44%] w-8 h-8 text-white/40 hidden md:block pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>

          {/* 3. Certificate / Degree Doodle at bottom right */}
          <svg
            className="absolute bottom-5 right-8 w-12 h-12 text-white/30 hidden md:block pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="14" rx="2" />
            <path d="M7 8h10M7 12h6" />
            <path d="M14 17l2 4 2-4" />
          </svg>

          {/* 4. Curved Flight Trail Doodles traversing the container */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-25 hidden md:block"
            viewBox="0 0 1000 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 100 280 C 400 320, 600 80, 850 160"
              stroke="white"
              strokeWidth="1.8"
              strokeDasharray="6 6"
            />
            <path
              d="M 450 240 C 620 360, 820 300, 920 180"
              stroke="white"
              strokeWidth="1.4"
            />
          </svg>

          {/* Grid Layout: Left Content, Right Student Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Heading, Description, CTA Buttons */}
            <div className="lg:col-span-7 text-white text-left">
              <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.2] text-white">
                Get Ready To Begin <br />
                <span className="relative inline-block mt-1 font-extrabold text-white">
                  Your Journey
                  {/* 13 Dreams Curved Red Highlighter Underline */}
                  <svg
                    className="absolute -bottom-2.5 left-0 w-full h-3.5 text-red-500"
                    viewBox="0 0 100 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 14C32 4 72 4 98 13"
                      stroke="#ef4444"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h3>

              <p className="mt-5 text-sm sm:text-base text-gray-100/95 max-w-lg leading-relaxed font-normal">
                Explore more, stay informed, and start your journey to academic excellence with 13 Dreams Consultants.
              </p>

              {/* Sleek, Decreased Height CTA Action Controls */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                {/* Contact Us Button: Sleek 40px Height (hidden when already on /contact) */}
                {!isContactPage && (
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 rounded-full bg-white text-gray-900 font-bold text-xs sm:text-sm shadow-md hover:bg-red-600 hover:text-white active:scale-95 transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Us
                  </Link>
                )}

                {/* Social Icons Pill: Sleek 40px Height Matching Button */}
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-white/60 flex items-center gap-2 sm:gap-2.5">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/13dreamsconsultants/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-pink-600 hover:scale-125 transition-transform"
                  >
                    <i className="fa-brands fa-instagram text-base"></i>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/channel/UC2ysHlAkujP6vUzpn7ZE-tA/featured"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-red-600 hover:scale-125 transition-transform"
                  >
                    <i className="fa-brands fa-youtube text-base"></i>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/13Dreamsconsultants"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-blue-600 hover:scale-125 transition-transform"
                  >
                    <i className="fa-brands fa-facebook-f text-base"></i>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/+919759053463"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-emerald-600 hover:scale-125 transition-transform"
                  >
                    <i className="fa-brands fa-whatsapp text-base"></i>
                  </a>

                  {/* Blog */}
                  <Link
                    href="/blog"
                    title="Blog"
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-orange-500 hover:scale-125 transition-transform font-bold"
                  >
                    <i className="fa-solid fa-blog text-base"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Girl's Head and Airplane Clearly Popping OUT of the Box */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-end relative overflow-visible">
              <div className="relative w-[280px] sm:w-[350px] lg:w-[410px] -mt-24 sm:-mt-36 lg:-mt-56 -mb-10 lg:-mb-12 z-30 pointer-events-none">
                <img
                  src="/img/about/study.png"
                  alt="Indian study abroad student holding blue airplane and globe"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
