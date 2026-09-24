'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileMenu({ isOpen, onClose }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Lock body scroll while menu is open & allow ESC to close
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

  const toggleSubmenu = (menu) => {
    setOpenSubmenu((prev) => (prev === menu ? null : menu));
  };

  const handleNavClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    onClose();
  };

  return (
    <>
      {/* Dimmed backdrop blur overlay */}
      <div
        className="sidebar-popup-overlay"
        onClick={onClose}
        aria-label="Close menu overlay"
      />

      {/* Modern Right-Aligned Mobile Drawer */}
      <aside
        className="mobile-drawer flex flex-col justify-between"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '340px',
          maxWidth: '88vw',
          height: '100vh',
          backgroundColor: '#ffffff',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.22)',
          zIndex: 99999,
        }}
      >
        {/* Drawer Header with Logo & Close Button */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/95 sticky top-0 z-10 backdrop-blur-sm">
          <Link href="/" onClick={handleNavClick} className="inline-block">
            <img
              src="/img/logo.webp"
              alt="13 Dreams Consultants Logo"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/img/13dreamsconsultants-main.webp';
              }}
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Navigation"
            title="Close Navigation"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 active:scale-95 flex items-center justify-center transition-all cursor-pointer border border-gray-200 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="space-y-1 text-sm font-medium text-gray-800">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <i className="fa fa-home text-red-500 w-4 text-center"></i>
                  <span>Home</span>
                </Link>
              </li>

              {/* About Us */}
              <li>
                <Link
                  href="/about-us"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <i className="fa fa-info-circle text-red-500 w-4 text-center"></i>
                  <span>About Us</span>
                </Link>
              </li>

              {/* Our Services Accordion */}
              <li className="rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSubmenu('services')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa fa-briefcase text-red-500 w-4 text-center"></i>
                    <span>Our Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-red-100 text-red-600 font-semibold px-1.5 py-0.5 rounded">
                      17
                    </span>
                    <i
                      className={`fa fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${
                        openSubmenu === 'services' ? 'rotate-180 text-red-600' : ''
                      }`}
                    ></i>
                  </div>
                </button>

                {openSubmenu === 'services' && (
                  <ul className="mt-1 ml-4 pl-3 border-l-2 border-red-500 space-y-1 text-xs text-gray-600 py-1">
                    <li>
                      <Link
                        href="/student-visa"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 font-semibold text-red-600"
                      >
                        ★ Student Visa Guide
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/universities"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Partner Universities
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/courses"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        In-Demand Courses
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/comprehensive-counselling"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Comprehensive Counselling
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/application-processing"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Application Processing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/advice-on-program-selection"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Advice on Selection of Programs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/assistance-with-scholarship-applications"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Scholarship Assistance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/advice-on-student-visas"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Student Visa Guidance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/pre-departure-assistance"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Pre-departure Support
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/value-added-services"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Value Added Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/visa-counseling"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Visa Counseling
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/visa-processing"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Visa Processing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/admission-assistance"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Admission Assistance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/finance-assistance"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Finance Assistance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/study-visa-consultants-bareilly"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Bareilly Consultants
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Countries Accordion */}
              <li className="rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSubmenu('countries')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa fa-globe text-red-500 w-4 text-center"></i>
                    <span>Countries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-red-100 text-red-600 font-semibold px-1.5 py-0.5 rounded">
                      10+
                    </span>
                    <i
                      className={`fa fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${
                        openSubmenu === 'countries' ? 'rotate-180 text-red-600' : ''
                      }`}
                    ></i>
                  </div>
                </button>

                {openSubmenu === 'countries' && (
                  <ul className="mt-1 ml-4 pl-3 border-l-2 border-red-500 space-y-1 text-xs text-gray-600 py-1">
                    <li>
                      <Link
                        href="/study-abroad"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 font-semibold text-red-600"
                      >
                        ★ Study Abroad Guide
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/uk"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in UK
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/canada"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in Canada
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/australia"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in Australia
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/usa"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in USA
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/germany"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in Germany
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/new-zealand"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in New Zealand
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/ireland"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in Ireland
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/singapore"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in Singapore
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/malta"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in Malta
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/study/switzerland"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Study in Switzerland
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Success Stories Accordion */}
              <li className="rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleSubmenu('stories')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa fa-award text-red-500 w-4 text-center"></i>
                    <span>Success Stories</span>
                  </div>
                  <i
                    className={`fa fa-chevron-down text-xs text-gray-400 transition-transform duration-200 ${
                      openSubmenu === 'stories' ? 'rotate-180 text-red-600' : ''
                    }`}
                  ></i>
                </button>

                {openSubmenu === 'stories' && (
                  <ul className="mt-1 ml-4 pl-3 border-l-2 border-red-500 space-y-1 text-xs text-gray-600 py-1">
                    <li>
                      <Link
                        href="/story"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        Visa Success Stories
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/story/ielts"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        IELTS Success Stories
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/story/pte"
                        onClick={handleNavClick}
                        className="block py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600"
                      >
                        PTE Success Stories
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Events */}
              <li>
                <Link
                  href="/events"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <i className="fa fa-calendar-days text-red-500 w-4 text-center"></i>
                  <span>Our Events</span>
                </Link>
              </li>

              {/* E-Magazine */}
              <li>
                <Link
                  href="/e-magazine"
                  onClick={handleNavClick}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-red-50/70 text-red-600 font-semibold hover:bg-red-100/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-book-open text-red-500 w-4 text-center"></i>
                    <span>E-Magazine &amp; Brochures</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                    NEW
                  </span>
                </Link>
              </li>

              {/* Blog */}
              <li>
                <Link
                  href="/blog"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <i className="fa fa-newspaper text-red-500 w-4 text-center"></i>
                  <span>Blog &amp; News</span>
                </Link>
              </li>

              {/* Contact Us */}
              <li>
                <Link
                  href="/contact"
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <i className="fa fa-envelope text-red-500 w-4 text-center"></i>
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Drawer Footer Actions & Contact info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-3">
          {/* Main Apply Button */}
          <Link
            href="/apply"
            onClick={handleNavClick}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-[0.99] transition-all"
          >
            <span>Apply Online Now</span>
            <i className="fa fa-arrow-right text-xs"></i>
          </Link>

          {/* Quick Direct Communication Buttons */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="tel:9759053463"
              className="flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-200 font-medium transition-colors"
            >
              <i className="fa fa-phone text-red-500"></i>
              <span>Call Us</span>
            </a>
            <a
              href="https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20would%20like%20to%20enquire%20about%20study%20visa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] hover:bg-[#25D366]/20 font-medium transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-sm text-[#25D366]"></i>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200/60">
            <span className="text-[11px]">Follow 13 Dreams:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/13Dreamsconsultants"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-colors"
              >
                <i className="fa-brands fa-facebook-f text-[11px]"></i>
              </a>
              <a
                href="https://www.instagram.com/13dreamsconsultants/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-red-500 hover:to-purple-600 transition-colors"
              >
                <i className="fa-brands fa-instagram text-[11px]"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UC2ysHlAkujP6vUzpn7ZE-tA/featured"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition-colors"
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
