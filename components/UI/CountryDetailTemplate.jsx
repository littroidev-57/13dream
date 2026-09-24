'use client';

import React, { useEffect } from 'react';
import PageBanner from '@/components/UI/PageBanner';
import HomeEnquiryForm from '@/components/Home/HomeEnquiryForm';
import Link from 'next/link';
import { destinationsData } from '@/lib/seedData';

export default function CountryDetailTemplate({
  countryName,
  tagline,
  bannerImg,
  overview,
  whyStudyPoints = [],
  topUniversities = [],
  visaFacts = [],
  currentSlug,
}) {
  const otherCountries = destinationsData.filter((d) => d.id !== currentSlug).slice(0, 6);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentSlug]);

  return (
    <>
      <PageBanner
        title={`Study in ${countryName}`}
        breadcrumbs={[
          { label: 'Countries', href: '/countries' },
          { label: countryName, href: null },
        ]}
      />

      <section className="section-space">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Content (Col 8) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Featured Banner Image */}
              {bannerImg && (
                <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <img
                    src={bannerImg}
                    alt={`Study in ${countryName}`}
                    className="w-full h-56 sm:h-72 md:h-96 object-cover"
                  />
                </div>
              )}

              {/* Title & Tagline */}
              <div>
                <div className="section-title text-left mb-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    <span>Why Study in </span>
                    <b>{countryName}?</b>
                  </h2>
                </div>

                {tagline && (
                  <p className="text-sm sm:text-base font-semibold text-red-600 mb-3">
                    {tagline}
                  </p>
                )}

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {overview}
                </p>
              </div>

              {/* Key Advantages for Indian Students */}
              {whyStudyPoints.length > 0 && (
                <div className="p-5 sm:p-7 rounded-2xl bg-gray-50/90 border border-gray-200/80 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></span>
                    Key Advantages for Indian Students
                  </h3>
                  <ul className="space-y-3">
                    {whyStudyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                        <i className="fa-solid fa-circle-check text-red-600 mt-0.5 shrink-0 text-sm"></i>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Popular Universities & Colleges */}
              {topUniversities.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-graduation-cap text-red-600"></i>
                    Popular Universities &amp; Colleges
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {topUniversities.map((uni, i) => (
                      <div
                        key={i}
                        className="p-3.5 sm:p-4 rounded-xl bg-white border border-gray-200/80 hover:border-red-200 shadow-sm flex items-center gap-3 transition-colors text-xs sm:text-sm font-semibold text-gray-800"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                          <i className="fa-solid fa-building-columns text-xs"></i>
                        </div>
                        <span className="line-clamp-2">{uni}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visa & Post-Study Work Highlights */}
              {visaFacts.length > 0 && (
                <div className="p-5 sm:p-6 rounded-2xl bg-red-50/70 border-l-4 border-red-600 border border-red-100">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-passport text-red-600"></i>
                    Visa &amp; Post-Study Work Highlights
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    {visaFacts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span className="leading-relaxed">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* In-content Admission Application Callout */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-red-50/90 via-white to-orange-50/60 border border-red-100 shadow-sm">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider bg-red-100/80 px-2.5 py-1 rounded-md inline-block mb-3">
                  Admissions Open for {countryName}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Plan Your Study Journey to {countryName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Receive personalized university shortlisting, fast-track offer letter assistance, scholarship evaluation, and student visa filing support with our certified counselors.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/apply?destination=${encodeURIComponent(countryName)}`}
                    className="bizwheel-btn text-center justify-center flex items-center gap-2 !py-3 !px-6"
                  >
                    <span>Start Online Application</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </Link>
                  <a
                    href="#enquiry-form"
                    className="px-5 py-3 rounded-lg border border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 text-sm font-semibold transition-colors text-center bg-white shadow-sm flex items-center justify-center gap-2"
                  >
                    <i className="fa-regular fa-comments text-red-500"></i>
                    <span>Quick Callback Form</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Sidebar (Col 4) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 w-full">
              {/* Explore Other Countries Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-red-600 flex items-center justify-between">
                  <span>Explore Other Countries</span>
                  <span className="text-[11px] bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                    {otherCountries.length} Options
                  </span>
                </h4>
                <div className="flex flex-col gap-2">
                  {otherCountries.map((c) => (
                    <Link
                      key={c.id}
                      href={`/study/${c.id}`}
                      className="p-3 rounded-xl bg-gray-50/80 hover:bg-red-50 hover:text-red-600 border border-gray-100 hover:border-red-200 flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-700 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-globe text-gray-400 group-hover:text-red-500 transition-colors text-xs"></i>
                        <span>{c.name}</span>
                      </div>
                      <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all"></i>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Need Expert Guidance? Card */}
              <div className="bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-950 text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-slate-800">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                  <i className="fa-solid fa-headset text-xs"></i>
                  <span>Certified Advisors</span>
                </div>
                <h4 className="text-lg font-bold mb-2">
                  Need Expert Guidance for {countryName}?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Get personalized course shortlisting, fee breakdowns, and admission timelines directly from certified counselors.
                </p>
                <div className="space-y-2.5">
                  <Link
                    href={`/apply?destination=${encodeURIComponent(countryName)}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold text-xs shadow-md bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 transition-all text-center"
                  >
                    <span>Apply For {countryName}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>

                  <a
                    href={`https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20would%20like%20to%20enquire%20about%20studying%20in%20${encodeURIComponent(countryName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25 font-semibold text-xs transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp text-sm"></i>
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>

              {/* Bareilly & Uttarakhand Help Card */}
              <div className="bg-gray-50/90 p-5 rounded-2xl border border-gray-200/80 text-xs text-gray-600 space-y-2">
                <div className="font-bold text-gray-900 flex items-center gap-2 text-xs">
                  <i className="fa-solid fa-location-dot text-red-600"></i>
                  <span>13 Dreams Consultants</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Offices in Bareilly (UP) &amp; Khatima (Uttarakhand). Call{' '}
                  <a href="tel:9759053463" className="font-semibold text-red-600 hover:underline">
                    +91 9759053463
                  </a>{' '}
                  for in-person and virtual counseling.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Embedded Enquiry Form */}
      <HomeEnquiryForm defaultDestination={countryName} />
    </>
  );
}
