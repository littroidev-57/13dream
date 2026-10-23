'use client';

import React from 'react';
import Link from 'next/link';

export default function CompareTeaserBanner() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white border-b border-gray-200/80">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white shadow-xl overflow-hidden border border-slate-800">
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                <i className="fa-solid fa-scale-balanced"></i>
                Side-by-Side Comparison Tool
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Confused Between <span className="text-red-500">UK, Canada, Australia</span> or Germany?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Compare tuition fees, living costs, post-study work permits (2–4 years), and PR pathways side-by-side to choose the perfect destination for your profile and budget.
              </p>

              {/* Quick Feature Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-gray-200 border border-white/10 flex items-center gap-1.5">
                  <i className="fa-solid fa-coins text-amber-400"></i> Tuition Cost Breakdown
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-gray-200 border border-white/10 flex items-center gap-1.5">
                  <i className="fa-solid fa-briefcase text-blue-400"></i> 2–4 Years Work Visas
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-gray-200 border border-white/10 flex items-center gap-1.5">
                  <i className="fa-solid fa-passport text-emerald-400"></i> PR &amp; Settlement Pathways
                </span>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
              <Link
                href="/compare-countries"
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-red-600/35 group"
              >
                <span>Compare All Countries</span>
                <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform duration-300"></i>
              </Link>
              <span className="text-xs text-gray-400 text-center w-full">
                100% Free Interactive Comparison • Updated 2027
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
