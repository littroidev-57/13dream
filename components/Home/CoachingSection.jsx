'use client';

import React from 'react';
import Link from 'next/link';

export default function CoachingSection() {
  return (
    <section id="coaching-section" className="py-16 md:py-20 bg-white relative overflow-hidden border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
            <i className="fa-solid fa-graduation-cap text-red-600"></i>
            <span>Premier Language Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Master <span className="text-red-600">IELTS & PTE</span> with Certified Experts
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Achieve your target band score on the first attempt with result-oriented coaching at 13 Dreams Consultants in Bareilly & Khatima.
          </p>
        </div>

        {/* 2-Column Program Cards: IELTS & PTE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* IELTS Program Card */}
          <div className="group rounded-3xl p-5 sm:p-8 bg-gradient-to-br from-slate-50 via-white to-red-50/20 border border-gray-200 shadow-lg hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-lg sm:text-xl font-black shadow-md shadow-red-600/20 shrink-0">
                    IELTS
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">IELTS Preparation</h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Academic & General Training</p>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold shrink-0">
                  Target: 7.5+ Band
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Comprehensive training module tailored to British Council & IDP exam standards. Master Listening, Reading, Writing, and Speaking with dedicated personal feedback.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="fa-solid fa-circle-check text-green-600 mt-1 text-xs"></i>
                  <span><strong>1-on-1 Daily Speaking Interviews</strong> to eliminate hesitation & boost fluency</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="fa-solid fa-circle-check text-green-600 mt-1 text-xs"></i>
                  <span><strong>Task 1 & Task 2 Writing Evaluation</strong> with detailed lexical & grammatical band scoring</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="fa-solid fa-circle-check text-green-600 mt-1 text-xs"></i>
                  <span><strong>Weekly Full-Length Mock Exams</strong> simulating actual test room conditions</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="fa-solid fa-circle-check text-green-600 mt-1 text-xs"></i>
                  <span><strong>Free Official Study Materials</strong>, vocabulary lists, and practice audio sets</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Batch Options:</span>
                <span className="text-xs font-bold text-gray-800">Regular (8 Weeks) • Crash (4 Weeks)</span>
              </div>
              <a
                href="https://wa.me/+919759053463?text=Hi%2013%20Dreams%2C%20I%20want%20to%20join%20IELTS%20coaching%20and%20book%20a%20free%20demo%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 w-full sm:w-auto text-center"
                style={{ color: '#ffffff' }}
              >
                <span className="text-white" style={{ color: '#ffffff' }}>Book Free IELTS Demo</span>
                <i className="fa-solid fa-arrow-right text-white text-xs" style={{ color: '#ffffff' }}></i>
              </a>
            </div>
          </div>

          {/* PTE Program Card */}
          <div className="group rounded-3xl p-5 sm:p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0072CE] text-white flex items-center justify-center text-lg sm:text-xl font-black shadow-md shadow-blue-600/20 shrink-0">
                    PTE
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">PTE Academic</h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pearson Test of English</p>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shrink-0">
                  Target: 65+ Score
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Computer-based testing strategies with Pearson-aligned AI scoring practice software. Designed specifically for fast results for Australia, Canada, UK, and New Zealand visas.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="fa-solid fa-circle-check text-green-600 mt-1 text-xs"></i>
                  <span><strong>AI-Scored Mock Test Software</strong> with instant pronunciation & oral fluency metrics</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="fa-solid fa-circle-check text-green-600 mt-1 text-xs"></i>
                  <span><strong>Proven Templates & Strategies</strong> for Describe Image, Retell Lecture & Essay Writing</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="fa-solid fa-circle-check text-green-600 mt-1 text-xs"></i>
                  <span><strong>High-Frequency Question Bank</strong> with repeated questions from recent actual exams</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <i className="fa-solid fa-circle-check text-green-600 mt-1 text-xs"></i>
                  <span><strong>Dedicated Computer Lab</strong> with noise-canceling headsets in Bareilly & Khatima</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Batch Options:</span>
                <span className="text-xs font-bold text-gray-800">Comprehensive (6 Weeks) • Fast Track (2 Weeks)</span>
              </div>
              <a
                href="https://wa.me/+919759053463?text=Hi%2013%20Dreams%2C%20I%20want%20to%20join%20PTE%20coaching%20and%20book%20a%20free%20demo%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0072CE] hover:bg-[#005ba3] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 w-full sm:w-auto text-center"
                style={{ color: '#ffffff' }}
              >
                <span className="text-white" style={{ color: '#ffffff' }}>Book Free PTE Demo</span>
                <i className="fa-solid fa-arrow-right text-white text-xs" style={{ color: '#ffffff' }}></i>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 text-center">
            <span className="w-10 h-10 rounded-xl bg-red-100 text-red-600 inline-flex items-center justify-center text-lg mb-3">
              <i className="fa-solid fa-certificate"></i>
            </span>
            <h4 className="text-sm font-bold text-gray-900">Certified Faculty</h4>
            <p className="text-xs text-gray-500 mt-1">IDP & Pearson certified master trainers</p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 text-center">
            <span className="w-10 h-10 rounded-xl bg-green-100 text-green-600 inline-flex items-center justify-center text-lg mb-3">
              <i className="fa-solid fa-users"></i>
            </span>
            <h4 className="text-sm font-bold text-gray-900">Small Batches</h4>
            <p className="text-xs text-gray-500 mt-1">Maximum 15 students per batch for personal focus</p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 text-center">
            <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 inline-flex items-center justify-center text-lg mb-3">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </span>
            <h4 className="text-sm font-bold text-gray-900">Flexible Timings</h4>
            <p className="text-xs text-gray-500 mt-1">Morning, evening & weekend batches available</p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 text-center">
            <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 inline-flex items-center justify-center text-lg mb-3">
              <i className="fa-solid fa-passport"></i>
            </span>
            <h4 className="text-sm font-bold text-gray-900">Direct Visa Integration</h4>
            <p className="text-xs text-gray-500 mt-1">Free visa counseling alongside your coaching</p>
          </div>
        </div>
      </div>
    </section>
  );
}
