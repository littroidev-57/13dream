'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/30 py-12 md:py-16 lg:py-20 border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Text & Action Controls */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span>100% FREE VIRTUAL COUNSELING & VISA GUIDANCE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 tracking-tight leading-[1.2]">
              Meet with <strong className="text-gray-900">80+ Universities</strong> at the World{' '}
              <span className="text-red-600 bg-red-100/60 px-2 py-0.5 rounded-md inline-block">Education Fair</span>
              <br />
              In Your City!
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              Connect 1-on-1 with official university delegates and expert study abroad mentors. Get instant virtual counseling, spot assessments, application fee waivers, and guaranteed student visa assistance for <strong className="text-gray-800">UK, USA, Australia, Germany, Canada, New Zealand & Singapore</strong>.
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-gray-200/90 text-xs font-semibold text-gray-800 shadow-sm hover:border-red-200 transition-colors">
                <i className="fa-solid fa-circle-check text-green-600"></i> Free* Guidance For Student Visa
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-gray-200/90 text-xs font-semibold text-gray-800 shadow-sm hover:border-red-200 transition-colors">
                <i className="fa-solid fa-circle-check text-green-600"></i> Instant Virtual Counseling
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-gray-200/90 text-xs font-semibold text-gray-800 shadow-sm hover:border-red-200 transition-colors">
                <i className="fa-solid fa-circle-check text-green-600"></i> Schedule 1-on-1 Sessions
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#enquiry-form"
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 transition-all duration-300 transform hover:-translate-y-0.5"
                style={{ color: '#ffffff' }}
              >
                <span className="text-white" style={{ color: '#ffffff' }}>Book Free Consultation</span>
                <i className="fa-solid fa-arrow-right text-white text-sm transition-transform duration-300 group-hover:translate-x-1" style={{ color: '#ffffff' }}></i>
              </a>
              <a
                href="https://wa.me/+919759053463?text=Hi%2C%20I%20want%20to%20schedule%20free%20virtual%20counseling%20for%20study%20abroad"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1faa52] active:bg-[#168a42] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
                style={{ color: '#ffffff' }}
              >
                <i className="fa-brands fa-whatsapp text-xl text-white transition-transform duration-300 group-hover:scale-110" style={{ color: '#ffffff' }}></i>
                <span className="text-white" style={{ color: '#ffffff' }}>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Footnote */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 w-full">
              <div className="flex -space-x-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 border-2 border-white text-sm shadow-sm">🎓</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 border-2 border-white text-sm shadow-sm">✈️</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 border-2 border-white text-sm shadow-sm">🌍</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                <strong className="text-gray-900 font-semibold">15+ Years Experience</strong>
                <span> • 150+ Partner Universities • 99% Visa Approval Rate</span>
              </div>
            </div>
          </div>

          {/* Right: Arched Virtual Counseling Hero Image */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[460px] rounded-t-[260px] rounded-b-[24px] p-2.5 bg-gradient-to-b from-red-100/60 via-white to-slate-100 shadow-2xl transition-transform duration-500 hover:-translate-y-1">
              <img
                src="/img/homepage/virtual-counseling.jpg"
                alt="Free Guidance For Student Visa & Instant Virtual Counseling - 13 Dreams Consultants"
                className="w-full h-[520px] sm:h-[580px] object-cover rounded-t-[250px] rounded-b-[18px] shadow-sm block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
