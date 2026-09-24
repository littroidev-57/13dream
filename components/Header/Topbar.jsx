'use client';

import React from 'react';

export default function Topbar({ onOpenSidebar, onToggleSearch }) {
  return (
    <div className="bg-black text-gray-300 text-xs relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-11 sm:h-12">
        {/* Contact Links */}
        <div className="flex items-center gap-5 sm:gap-6 py-2">
          <div className="flex items-center gap-2">
            <i className="fa fa-phone text-red-600"></i>
            <a
              href="tel:9520667842"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors font-medium text-xs tracking-wide"
            >
              +91 9520667842
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <i className="fa fa-envelope text-red-600"></i>
            <a
              href="mailto:contact@13dreamsconsultants.com"
              className="text-white hover:text-red-500 transition-colors font-medium text-xs tracking-wide"
            >
              contact@13dreamsconsultants.com
            </a>
          </div>
        </div>

        {/* Right Section: Social Icons + Red Slanted Action Box */}
        <div className="flex items-center h-full gap-4 sm:gap-6">
          {/* Social Icons (clean white, no background circle, matching design) */}
          <ul className="flex items-center gap-4 text-white">
            <li>
              <a
                href="https://www.facebook.com/13Dreamsconsultants"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="hover:text-red-500 transition-colors flex items-center justify-center text-sm"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/13dreamsconsultants/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="hover:text-red-500 transition-colors flex items-center justify-center text-sm"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UC2ysHlAkujP6vUzpn7ZE-tA/featured"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="hover:text-red-500 transition-colors flex items-center justify-center text-sm"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>

          {/* Red Slanted Parallelogram Shape with Circular Action Buttons */}
          <div className="h-full flex items-center mr-1 sm:mr-3">
            <div className="h-full bg-red-600 -skew-x-[25deg] px-5 sm:px-8 flex items-center justify-center shadow-md">
              {/* Counter-skew container so buttons stay perfectly circular */}
              <div className="skew-x-[25deg] flex items-center gap-2.5 sm:gap-3">
                {/* Search Button (White circular border on red) */}
                <button
                  type="button"
                  onClick={onToggleSearch}
                  title="Search"
                  aria-label="Search"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white bg-red-600 hover:bg-white text-white hover:text-red-600 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
                >
                  <i className="fa fa-search text-xs sm:text-sm"></i>
                </button>

                {/* Drawer Menu Button (White circular border on red) */}
                <button
                  type="button"
                  onClick={onOpenSidebar}
                  title="Menu"
                  aria-label="Menu"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white bg-red-600 hover:bg-white text-white hover:text-red-600 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 focus:outline-none"
                >
                  <i className="fa-solid fa-bars text-xs sm:text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
