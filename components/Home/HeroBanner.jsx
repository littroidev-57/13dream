'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Text & Action Controls */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span>100% FREE COUNSELING & VISA GUIDANCE</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 tracking-tight leading-[1.25]">
              Realise Your <strong className="text-gray-900">Study Abroad Dreams</strong> with Expert{' '}
              <span className="text-red-600 bg-red-100/60 px-2 py-0.5 rounded-md inline-block">IELTS, PTE & Visa</span>{' '}
              Filing!
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              Get end-to-end guidance from India’s trusted overseas education consultancy. From score-boosting <strong className="text-gray-800">IELTS & PTE coaching</strong> to university admissions and hassle-free <strong className="text-gray-800">Student Visa Filing</strong> for UK, Canada, Australia, USA, Germany, New Zealand & Singapore.
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-2 pt-1 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200/90 text-xs font-semibold text-gray-800 shadow-sm hover:border-red-200 transition-colors">
                <i className="fa-solid fa-circle-check text-green-600"></i> IELTS & PTE Coaching
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200/90 text-xs font-semibold text-gray-800 shadow-sm hover:border-red-200 transition-colors">
                <i className="fa-solid fa-circle-check text-green-600"></i> Complete Visa Filing Assistance
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200/90 text-xs font-semibold text-gray-800 shadow-sm hover:border-red-200 transition-colors">
                <i className="fa-solid fa-circle-check text-green-600"></i> 1-on-1 Free Profile Assessment
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#enquiry-form"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto text-center"
                style={{ color: '#ffffff' }}
              >
                <span className="text-white" style={{ color: '#ffffff' }}>Book Free Consultation</span>
                <i className="fa-solid fa-arrow-right text-white text-sm transition-transform duration-300 group-hover:translate-x-1" style={{ color: '#ffffff' }}></i>
              </a>
              <a
                href="https://wa.me/+919759053463?text=Hi%2C%20I%20want%20to%20know%20about%20IELTS%2FPTE%20coaching%20and%20study%20visa%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1faa52] active:bg-[#168a42] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto text-center"
                style={{ color: '#ffffff' }}
              >
                <i className="fa-brands fa-whatsapp text-xl text-white transition-transform duration-300 group-hover:scale-110" style={{ color: '#ffffff' }}></i>
                <span className="text-white" style={{ color: '#ffffff' }}>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Footnote with Google 4.9 Rating Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-3 border-t border-gray-100 w-full">
              {/* Google Reviews Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200/90 shadow-sm shrink-0">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400 text-xs">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <span className="text-xs font-bold text-gray-900 ml-1">4.9 / 5</span>
                  <span className="text-[11px] text-gray-500 font-medium">(250+ Google Reviews)</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 flex-wrap">
                <strong className="text-gray-900 font-semibold">15+ Years Experience</strong>
                <span>• 150+ Partner Universities</span>
                <span>• 99% Visa Approval</span>
              </div>
            </div>
          </div>

          {/* Right: Large Seamless Virtual Counseling Graphic matching screenshot */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative">
            <div className="relative w-full max-w-[620px] xl:max-w-[660px] transition-transform duration-500 hover:scale-[1.01]">
              <img
                src="/img/homepage/virtual-counseling.jpg"
                alt="13 Dreams Consultants - Virtual Study Abroad Counseling, Student Visa & Test Preparation"
                className="w-full h-auto object-contain block mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
