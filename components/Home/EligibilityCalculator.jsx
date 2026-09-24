'use client';

import React, { useState } from 'react';

const DESTINATIONS = [
  { id: 'canada', name: 'Canada', flag: '🇨🇦', minIelts: '6.0 overall (min 6.0 in each)', minPte: '60+', psw: 'Up to 3 Years PGWP', intake: 'Sept 2026 / Jan 2027', pr: 'High (Express Entry / PNP)' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', minIelts: '6.0 overall (Waiver available for 70%+ in 12th English)', minPte: '58+', psw: '2 Years Graduate Route', intake: 'Sept 2026 / Jan 2027', pr: 'Skilled Worker Visa' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', minIelts: '6.0 to 6.5 overall', minPte: '58 to 65+', psw: '2 to 4 Years Post-Study Work', intake: 'July 2026 / Nov 2026 / Feb 2027', pr: 'Points-based Subclass 189/190' },
  { id: 'usa', name: 'USA', flag: '🇺🇸', minIelts: '6.5 overall / Duolingo accepted', minPte: '60+', psw: 'Up to 3 Years (STEM OPT)', intake: 'Fall 2026 / Spring 2027', pr: 'H-1B & EB pathways' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', minIelts: '6.5 overall (Public Univs with zero tuition)', minPte: '60+', psw: '18 Months Job Seeking Visa', intake: 'Winter 2026 (Oct) / Summer 2027', pr: 'EU Blue Card' },
  { id: 'newzealand', name: 'New Zealand', flag: '🇳🇿', minIelts: '6.0 for Diploma/UG, 6.5 for PG', minPte: '58+', psw: 'Up to 3 Years Post-Study', intake: 'July 2026 / Feb 2027', pr: 'Green List PR pathway' },
];

const QUALIFICATIONS = [
  { id: '12th', label: '12th Grade (High School)', target: 'Bachelor / Diploma' },
  { id: 'bachelors', label: "Bachelor's Degree", target: "Master's / Post-Grad Diploma" },
  { id: 'masters', label: "Master's Degree", target: 'Second Masters / PhD' },
  { id: 'diploma', label: 'Polytechnic / 3-Yr Diploma', target: 'Lateral Entry / Bachelor Degree' },
];

const TEST_STATUSES = [
  { id: 'ielts_ready', label: 'IELTS Ready (Score 6.0+)', desc: 'Direct admission & visa eligible' },
  { id: 'pte_ready', label: 'PTE Ready (Score 58+)', desc: 'Fast track Australian & Canadian processing' },
  { id: 'need_coaching', label: 'Need IELTS / PTE Coaching', desc: 'Join 13 Dreams high-score prep batches' },
  { id: 'no_test', label: 'No English Test Taken Yet', desc: 'Check English waiver or start preparation' },
];

export default function EligibilityCalculator() {
  const [selectedCountry, setSelectedCountry] = useState(DESTINATIONS[0]);
  const [selectedQual, setSelectedQual] = useState(QUALIFICATIONS[1]);
  const [selectedTest, setSelectedTest] = useState(TEST_STATUSES[0]);

  const getVisaChance = () => {
    if (selectedTest.id === 'ielts_ready' || selectedTest.id === 'pte_ready') return '98% Excellent Chance';
    if (selectedTest.id === 'need_coaching') return '90% (With 13 Dreams Prep)';
    return '85% (English Waiver Check Required)';
  };

  const generateWhatsAppMessage = () => {
    const text = `Hi 13 Dreams Consultants! I used your online Eligibility Calculator:%0A` +
      `- Target Country: ${selectedCountry.name}%0A` +
      `- Qualification: ${selectedQual.label}%0A` +
      `- English Test: ${selectedTest.label}%0A` +
      `Please provide me with a free profile assessment and eligible university shortlist.`;
    return `https://wa.me/+919759053463?text=${text}`;
  };

  return (
    <section id="eligibility-calculator" className="py-16 md:py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden border-b border-gray-200">
      {/* Background soft glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
            <i className="fa-solid fa-calculator text-red-600"></i>
            <span>Instant Profile Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Check Your <span className="text-red-600">Study Visa & IELTS/PTE</span> Eligibility
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Select your target country, educational qualification, and English test status to instantly see admission requirements and visa probability.
          </p>
        </div>

        {/* 2-Column Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Selectors */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-8 border border-gray-200/90 shadow-xl shadow-slate-200/50 space-y-6 sm:space-y-7">
            {/* Step 1: Destination Country */}
            <div>
              <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-900 mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600 text-white text-[11px] sm:text-xs flex items-center justify-center font-bold">1</span>
                  Select Target Study Destination
                </span>
                <span className="text-xs text-red-600 font-semibold">{selectedCountry.name}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {DESTINATIONS.map((country) => {
                  const isSelected = selectedCountry.id === country.id;
                  return (
                    <button
                      key={country.id}
                      type="button"
                      onClick={() => setSelectedCountry(country)}
                      className={`flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-red-600 bg-red-50/70 text-red-950 font-bold shadow-sm ring-2 ring-red-600/20'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl shrink-0">{country.flag}</span>
                      <span className="text-xs sm:text-sm font-semibold truncate leading-tight">{country.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Qualification */}
            <div>
              <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-900 mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600 text-white text-[11px] sm:text-xs flex items-center justify-center font-bold">2</span>
                  Highest Academic Qualification
                </span>
                <span className="text-[11px] sm:text-xs text-gray-500 truncate max-w-[150px]">Target: {selectedQual.target}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUALIFICATIONS.map((qual) => {
                  const isSelected = selectedQual.id === qual.id;
                  return (
                    <button
                      key={qual.id}
                      type="button"
                      onClick={() => setSelectedQual(qual)}
                      className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-red-600 bg-red-50/70 text-red-950 font-bold shadow-sm ring-2 ring-red-600/20'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-bold">{qual.label}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Leads to: {qual.target}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: English Proficiency */}
            <div>
              <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-900 mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-600 text-white text-[11px] sm:text-xs flex items-center justify-center font-bold">3</span>
                  English Proficiency Status (IELTS / PTE)
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TEST_STATUSES.map((status) => {
                  const isSelected = selectedTest.id === status.id;
                  return (
                    <button
                      key={status.id}
                      type="button"
                      onClick={() => setSelectedTest(status)}
                      className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-red-600 bg-red-50/70 text-red-950 font-bold shadow-sm ring-2 ring-red-600/20'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <i className={`fa-solid ${isSelected ? 'fa-circle-check text-red-600' : 'fa-circle text-gray-300'} text-xs`}></i>
                        <p className="text-xs sm:text-sm font-bold">{status.label}</p>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 pl-4">{status.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Live Assessment Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900 text-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-gray-800 relative overflow-hidden">
            {/* Top decorative badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-5 mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-red-400 font-bold">Preliminary Assessment</span>
                <h3 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
                  <span>{selectedCountry.flag}</span>
                  <span>Study in {selectedCountry.name}</span>
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Visa Probability</span>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-xs font-bold mt-1">
                  {getVisaChance()}
                </span>
              </div>
            </div>

            {/* Dynamic Metrics List */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 text-sm">
                  <i className="fa-solid fa-spell-check"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Recommended IELTS Score</p>
                  <p className="text-white font-bold mt-0.5">{selectedCountry.minIelts}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 text-sm">
                  <i className="fa-solid fa-laptop-code"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Recommended PTE Academic Score</p>
                  <p className="text-white font-bold mt-0.5">{selectedCountry.minPte}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-sm">
                  <i className="fa-solid fa-briefcase"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Post-Study Work Permit (PSW)</p>
                  <p className="text-white font-bold mt-0.5">{selectedCountry.psw}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-sm">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium">Next Available Intakes</p>
                  <p className="text-white font-bold mt-0.5">{selectedCountry.intake}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 pt-5 border-t border-gray-800/80 space-y-3">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1faa52] text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
                style={{ color: '#ffffff' }}
              >
                <i className="fa-brands fa-whatsapp text-lg text-white" style={{ color: '#ffffff' }}></i>
                <span className="text-white" style={{ color: '#ffffff' }}>Get University Shortlist on WhatsApp</span>
              </a>

              <a
                href="#enquiry-form"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-colors"
                style={{ color: '#ffffff' }}
              >
                <span>Book Free In-Person Counseling in Bareilly / Khatima</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            </div>

            <p className="text-[11px] text-gray-400 text-center mt-3 font-normal">
              🔒 100% Free Preliminary Check • No hidden commitments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
