import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/70" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <span className="text-sm font-bold text-red-600 uppercase tracking-widest bg-red-50 px-4 py-1.5 rounded-full inline-block mb-3">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          The page you are looking for may have been moved, renamed, or is temporarily unavailable. Explore our key overseas education sections below.
        </p>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-10 max-w-2xl mx-auto text-left">
          <Link
            href="/apply"
            className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all group"
          >
            <i className="fa-solid fa-file-pen text-red-600 text-lg mb-2 block"></i>
            <span className="font-bold text-sm text-gray-900 block group-hover:text-red-600">Apply Now</span>
            <span className="text-[11px] text-gray-500">Free assessment</span>
          </Link>

          <Link
            href="/study-abroad"
            className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all group"
          >
            <i className="fa-solid fa-earth-americas text-red-600 text-lg mb-2 block"></i>
            <span className="font-bold text-sm text-gray-900 block group-hover:text-red-600">Study Abroad</span>
            <span className="text-[11px] text-gray-500">Country guides</span>
          </Link>

          <Link
            href="/student-visa"
            className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all group"
          >
            <i className="fa-solid fa-passport text-red-600 text-lg mb-2 block"></i>
            <span className="font-bold text-sm text-gray-900 block group-hover:text-red-600">Student Visa</span>
            <span className="text-[11px] text-gray-500">99% grant rate</span>
          </Link>

          <Link
            href="/universities"
            className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all group"
          >
            <i className="fa-solid fa-building-columns text-red-600 text-lg mb-2 block"></i>
            <span className="font-bold text-sm text-gray-900 block group-hover:text-red-600">Universities</span>
            <span className="text-[11px] text-gray-500">150+ partners</span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/apply" className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors">
            Start Free Application
          </Link>
          <Link href="/" className="px-8 py-3.5 rounded-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold text-sm transition-colors">
            Return to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

