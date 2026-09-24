'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function SidebarPopup({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="sidebar-popup-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] transition-opacity"
        onClick={onClose}
        aria-label="Close sidebar overlay"
      />
      <aside
        className="sidebar-popup fixed top-0 right-0 h-full h-screen w-full max-w-[340px] sm:max-w-[400px] bg-white shadow-2xl z-[99999] flex flex-col justify-between overflow-y-auto p-5 sm:p-6 animate-drawer-right"
        role="dialog"
        aria-modal="true"
        aria-label="Information Sidebar"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          zIndex: 99999,
          backgroundColor: '#ffffff',
          boxShadow: '-8px 0 35px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Link href="/" onClick={onClose} className="inline-block">
              <img
                src="/img/logo.webp"
                alt="13 Dreams Consultants"
                className="h-9 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/img/13dreamsconsultants-main.webp';
                }}
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              title="Close sidebar"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 active:scale-95 flex items-center justify-center transition-all cursor-pointer border border-gray-200 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* About Section */}
          <div className="mt-5">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md mb-2">
              Overseas Education Experts
            </span>
            <p className="text-xs text-gray-600 leading-relaxed">
              We provide end-to-end guidance for study visas, top university admissions, scholarships, and test prep (IELTS/PTE), turning your global study dreams into reality.
            </p>
          </div>

          {/* Contact Details */}
          <div className="mt-6 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-1.5">
              Contact &amp; Assistance
            </h5>

            {/* Phone */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-100/80 text-red-600 flex items-center justify-center shrink-0">
                <i className="fa fa-phone text-xs"></i>
              </div>
              <div className="text-xs">
                <p className="text-gray-500 text-[11px] font-medium">Helpline Numbers</p>
                <div className="flex flex-col gap-0.5 mt-0.5 font-semibold text-gray-800">
                  <a href="tel:9759053463" className="hover:text-red-600 transition-colors">
                    +91 9759053463
                  </a>
                  <a href="tel:9520667842" className="hover:text-red-600 transition-colors">
                    +91 9520667842
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-100/80 text-red-600 flex items-center justify-center shrink-0">
                <i className="fa fa-envelope text-xs"></i>
              </div>
              <div className="text-xs">
                <p className="text-gray-500 text-[11px] font-medium">Email Inquiry</p>
                <a
                  href="mailto:contact@13dreamsconsultants.com"
                  className="font-semibold text-gray-800 hover:text-red-600 transition-colors break-all"
                >
                  contact@13dreamsconsultants.com
                </a>
              </div>
            </div>

            {/* Branch Locations */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-100/80 text-red-600 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-location-dot text-xs"></i>
              </div>
              <div className="text-xs text-gray-700 space-y-2">
                <div>
                  <p className="font-bold text-gray-900">Bareilly Office:</p>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly
                  </p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Khatima Office:</p>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    Near Jhankat (Banusi) Khatima Nanakmatta Road, U S Nagar, Uttarakhand - 262308
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-1.5 mb-2">
              Quick Links
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/about-us"
                onClick={onClose}
                className="py-1.5 px-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-700 transition-colors flex items-center gap-1.5"
              >
                <i className="fa fa-angle-right text-red-500 text-[10px]"></i>
                About Us
              </Link>
              <Link
                href="/service"
                onClick={onClose}
                className="py-1.5 px-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-700 transition-colors flex items-center gap-1.5"
              >
                <i className="fa fa-angle-right text-red-500 text-[10px]"></i>
                Services
              </Link>
              <Link
                href="/countries"
                onClick={onClose}
                className="py-1.5 px-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-700 transition-colors flex items-center gap-1.5"
              >
                <i className="fa fa-angle-right text-red-500 text-[10px]"></i>
                Countries
              </Link>
              <Link
                href="/story"
                onClick={onClose}
                className="py-1.5 px-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-700 transition-colors flex items-center gap-1.5"
              >
                <i className="fa fa-angle-right text-red-500 text-[10px]"></i>
                Success Stories
              </Link>
              <Link
                href="/blog"
                onClick={onClose}
                className="py-1.5 px-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-700 transition-colors flex items-center gap-1.5"
              >
                <i className="fa fa-angle-right text-red-500 text-[10px]"></i>
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="py-1.5 px-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-700 transition-colors flex items-center gap-1.5"
              >
                <i className="fa fa-angle-right text-red-500 text-[10px]"></i>
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA & Social Links */}
        <div className="pt-4 border-t border-gray-100 mt-6 space-y-3">
          <Link
            href="/apply"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-semibold text-xs shadow-md bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-[0.99] transition-all"
          >
            <span>Apply Online Now</span>
            <i className="fa fa-arrow-right text-[10px]"></i>
          </Link>

          <a
            href="https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20would%20like%20to%20enquire%20about%20study%20visa"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] hover:bg-[#25D366]/20 font-medium text-xs transition-colors"
          >
            <i className="fa-brands fa-whatsapp text-sm text-[#25D366]"></i>
            <span>Chat with Counselor on WhatsApp</span>
          </a>

          {/* Social Row */}
          <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
            <span className="text-[11px]">Follow Us:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/13Dreamsconsultants"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-600 transition-colors"
              >
                <i className="fa-brands fa-facebook-f text-[11px]"></i>
              </a>
              <a
                href="https://www.instagram.com/13dreamsconsultants/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-red-500 hover:to-purple-600 hover:text-white flex items-center justify-center text-gray-600 transition-colors"
              >
                <i className="fa-brands fa-instagram text-[11px]"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UC2ysHlAkujP6vUzpn7ZE-tA/featured"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center text-gray-600 transition-colors"
              >
                <i className="fa-brands fa-youtube text-[11px]"></i>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
