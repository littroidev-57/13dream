'use client';

import React from 'react';

export default function Topbar({ onOpenSidebar, onToggleSearch }) {
  return (
    <div className="bg-slate-900 text-gray-300 text-xs py-2.5 border-b border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-4">
        {/* Contact Links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <i className="fa fa-phone text-red-500"></i>
            <a href="tel:9520667842" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              +91 9520667842
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <i className="fa fa-envelope text-red-500"></i>
            <a href="mailto:contact@13dreamsconsultants.com" className="hover:text-white transition-colors">
              contact@13dreamsconsultants.com
            </a>
          </div>
        </div>

        {/* Social Icons & Actions */}
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-2.5">
            <li>
              <a
                href="https://www.facebook.com/13Dreamsconsultants"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-all"
              >
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/13dreamsconsultants/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-all"
              >
                <i className="fa-brands fa-instagram text-xs"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UC2ysHlAkujP6vUzpn7ZE-tA/featured"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-all"
              >
                <i className="fa-brands fa-youtube text-xs"></i>
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <button
              onClick={onToggleSearch}
              title="Search"
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-all"
            >
              <i className="fa fa-search text-xs"></i>
            </button>
            <button
              onClick={onOpenSidebar}
              title="Quick Info"
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-all"
            >
              <i className="fa fa-bars text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
