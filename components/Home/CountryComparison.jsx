'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const COMPARISON_DATA = [
  {
    country: 'United Kingdom',
    code: 'UK',
    flag: '🇬🇧',
    slug: 'uk',
    tuition: '£12,000 – £22,000',
    tuitionDetail: '1-Year Master’s saves living cost',
    psw: '2 Years (Graduate Route)',
    livingCost: '£9,000 – £12,000 / yr',
    prEase: 'Moderate (Skilled Worker)',
    intakes: 'Jan, May, Sept',
    englishRequirement: 'IELTS 6.0 or 12th English Waiver',
    category: 'popular',
    badge: 'Fastest Degree',
    highlightColor: 'from-blue-600 to-indigo-700',
  },
  {
    country: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    slug: 'canada',
    tuition: 'CAD 15,000 – CAD 28,000',
    tuitionDetail: 'Colleges & Universities',
    psw: 'Up to 3 Years (PGWP)',
    livingCost: 'CAD 12,000 – CAD 15,000 / yr',
    prEase: 'High (Express Entry / PNP)',
    intakes: 'Jan, May, Sept',
    englishRequirement: 'IELTS 6.0 / PTE 60+ (SDS)',
    category: 'popular',
    badge: 'Top PR Pathways',
    highlightColor: 'from-red-600 to-rose-700',
  },
  {
    country: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    slug: 'australia',
    tuition: 'AUD 22,000 – AUD 42,000',
    tuitionDetail: 'Top 100 World Universities',
    psw: '2 to 4 Years Post-Study',
    livingCost: 'AUD 20,000 – AUD 24,000 / yr',
    prEase: 'Moderate (Points Based 189/190)',
    intakes: 'Feb, July, Nov',
    englishRequirement: 'IELTS 6.0–6.5 / PTE 50–58+',
    category: 'popular',
    badge: 'High Minimum Wage',
    highlightColor: 'from-amber-600 to-yellow-600',
  },
  {
    country: 'USA',
    code: 'US',
    flag: '🇺🇸',
    slug: 'usa',
    tuition: '$20,000 – $45,000',
    tuitionDetail: 'Ivy League & State Universities',
    psw: 'Up to 3 Years (STEM OPT)',
    livingCost: '$12,000 – $18,000 / yr',
    prEase: 'H-1B & EB Sponsorship',
    intakes: 'Aug (Fall), Jan (Spring)',
    englishRequirement: 'IELTS / TOEFL / Duolingo',
    category: 'popular',
    badge: 'World #1 Education',
    highlightColor: 'from-sky-600 to-blue-700',
  },
  {
    country: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    slug: 'germany',
    tuition: '€0 – €3,000 / yr (Free Tuition!)',
    tuitionDetail: 'Public Universities 100% Free',
    psw: '18 Months Job Seeking Visa',
    livingCost: '€11,208 / yr (Blocked Account)',
    prEase: 'Very High (EU Blue Card in 21 mo)',
    intakes: 'Oct (Winter), Apr (Summer)',
    englishRequirement: 'IELTS 6.5 (English Taught)',
    category: 'europe',
    badge: 'Zero Tuition Fees',
    highlightColor: 'from-emerald-600 to-teal-700',
  },
  {
    country: 'Netherlands',
    code: 'NL',
    flag: '🇳🇱',
    slug: 'netherlands',
    tuition: '€8,000 – €16,000',
    tuitionDetail: '2,100+ English taught degrees',
    psw: '1 Year Zoekjaar (Orientation)',
    livingCost: '€10,000 – €13,000 / yr',
    prEase: 'High (Highly Skilled Migrant)',
    intakes: 'Sept, Feb',
    englishRequirement: 'IELTS 6.0–6.5 / PTE 58+',
    category: 'europe',
    badge: 'English-Speaking EU Hub',
    highlightColor: 'from-orange-600 to-amber-600',
  },
  {
    country: 'Malta',
    code: 'MT',
    flag: '🇲🇹',
    slug: 'malta',
    tuition: '€6,000 – €9,500',
    tuitionDetail: 'Affordable EU Schengen Education',
    psw: '6–9 Months Post-Study Work',
    livingCost: '€6,000 – €8,000 / yr',
    prEase: 'Schengen 27-Nation Travel',
    intakes: 'Feb, June, Oct',
    englishRequirement: 'MOI Accepted / IELTS 5.5',
    category: 'europe',
    badge: 'Budget European Gateway',
    highlightColor: 'from-cyan-600 to-blue-700',
  },
  {
    country: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    slug: 'singapore',
    tuition: 'SGD 14,000 – SGD 28,000',
    tuitionDetail: 'Earn UK & Australian Degrees',
    psw: 'LTVP & S-Pass Work Visa',
    livingCost: 'SGD 12,000 – SGD 16,000 / yr',
    prEase: 'High for STEM & Finance',
    intakes: 'Rolling (Jan, Apr, July, Oct)',
    englishRequirement: 'Internal Tests / Fast ICA Visa',
    category: 'popular',
    badge: 'Global Financial Capital',
    highlightColor: 'from-red-600 to-pink-700',
  },
];

export default function CountryComparison() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredData =
    activeTab === 'all'
      ? COMPARISON_DATA
      : COMPARISON_DATA.filter((item) => item.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-b border-gray-200/80 relative overflow-hidden">
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <i className="fa-solid fa-scale-balanced text-red-500"></i>
            Compare Study Destinations
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-gray-900 tracking-tight leading-tight">
            Compare Tuition, <span className="text-red-600">Work Visas</span> &amp; PR Pathways
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Find the destination that fits your budget and career goals. Compare average tuition, post-study work permit duration, and PR opportunities.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === 'all'
                  ? 'bg-gray-900 text-white shadow-gray-900/20'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-red-500 hover:text-red-600'
              }`}
            >
              All Top 8 Countries
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('popular')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === 'popular'
                  ? 'bg-red-600 text-white shadow-red-600/25'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-red-500 hover:text-red-600'
              }`}
            >
              English Big 4 &amp; Asia (UK, CA, AU, US, SG)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('europe')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === 'europe'
                  ? 'bg-red-600 text-white shadow-red-600/25'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-red-500 hover:text-red-600'
              }`}
            >
              Europe &amp; Schengen (Germany, Netherlands, Malta)
            </button>
          </div>
        </div>

        {/* ── Cards Grid for Responsive (Mobile, Tablet, Desktop) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredData.map((item) => (
            <div
              key={item.code}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header with Flag and Badge */}
              <div className="p-5 pb-4 border-b border-gray-100 bg-gradient-to-br from-slate-50/70 to-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl drop-shadow-sm">{item.flag}</span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {item.country}
                    </h3>
                  </div>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/70">
                  {item.badge}
                </div>
              </div>

              {/* Card Body - Key Metrics */}
              <div className="p-5 space-y-3.5 text-xs text-gray-700 flex-1">
                {/* 1. Tuition Fees */}
                <div className="flex items-start justify-between gap-2">
                  <div className="text-gray-500 flex items-center gap-1.5">
                    <i className="fa-solid fa-coins text-amber-500 text-xs"></i>
                    <span>Tuition Fee</span>
                  </div>
                  <div className="text-right font-bold text-gray-900">
                    <div>{item.tuition}</div>
                    <span className="text-[10px] text-gray-500 font-normal block">{item.tuitionDetail}</span>
                  </div>
                </div>

                {/* 2. Post Study Work */}
                <div className="flex items-start justify-between gap-2 pt-2 border-t border-gray-100">
                  <div className="text-gray-500 flex items-center gap-1.5">
                    <i className="fa-solid fa-briefcase text-blue-500 text-xs"></i>
                    <span>Work Visa (PSW)</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-right">
                    {item.psw}
                  </span>
                </div>

                {/* 3. PR / Settlement */}
                <div className="flex items-start justify-between gap-2 pt-2 border-t border-gray-100">
                  <div className="text-gray-500 flex items-center gap-1.5">
                    <i className="fa-solid fa-passport text-indigo-500 text-xs"></i>
                    <span>PR Opportunity</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-right">{item.prEase}</span>
                </div>

                {/* 4. Upcoming Intakes */}
                <div className="flex items-start justify-between gap-2 pt-2 border-t border-gray-100">
                  <div className="text-gray-500 flex items-center gap-1.5">
                    <i className="fa-regular fa-calendar-check text-red-500 text-xs"></i>
                    <span>Intakes</span>
                  </div>
                  <span className="font-semibold text-gray-800 text-right">{item.intakes}</span>
                </div>

                {/* 5. English Requirement */}
                <div className="flex items-start justify-between gap-2 pt-2 border-t border-gray-100">
                  <div className="text-gray-500 flex items-center gap-1.5">
                    <i className="fa-solid fa-language text-purple-500 text-xs"></i>
                    <span>English Criteria</span>
                  </div>
                  <span className="font-medium text-gray-700 text-right text-[11px] max-w-[150px] leading-snug">
                    {item.englishRequirement}
                  </span>
                </div>
              </div>

              {/* Card Footer - Action Buttons */}
              <div className="p-4 pt-3 bg-gray-50/70 border-t border-gray-100 flex items-center gap-2">
                <Link
                  href={`/study/${item.slug}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-gray-900 hover:bg-red-600 text-white font-bold text-xs transition-colors duration-200 shadow-sm"
                >
                  Explore Details
                </Link>
                <a
                  href={`https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20want%20to%20check%20my%20eligibility%20for%20Study%20in%20${encodeURIComponent(item.country)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs flex items-center justify-center transition-colors shadow-sm"
                  title={`Chat about ${item.country}`}
                  aria-label={`Chat on WhatsApp about ${item.country}`}
                >
                  <i className="fa-brands fa-whatsapp text-sm"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl flex-shrink-0">
              <i className="fa-solid fa-calculator"></i>
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">Not sure which country fits your 12th or Degree marks?</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Use our instant Visa Eligibility Calculator for free university shortlisting.
              </p>
            </div>
          </div>

          <a
            href="#eligibility-calculator"
            onClick={(e) => {
              const el = document.getElementById('eligibility-calculator');
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.location.href = '/#eligibility-calculator';
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 transition-all flex-shrink-0 cursor-pointer"
          >
            <span>Check My Profile Now</span>
            <i className="fa-solid fa-arrow-down text-xs"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
