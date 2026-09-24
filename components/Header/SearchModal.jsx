'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STATIC_SEARCH_ITEMS = [
  // Destinations
  { title: 'Study in Australia', category: 'Destination', href: '/study/australia', desc: 'Top universities, post-study work rights, Subclass 500 visa guidance' },
  { title: 'Study in Canada', category: 'Destination', href: '/study/canada', desc: 'PGWP, SDS visa stream, top Canadian colleges & universities' },
  { title: 'Study in United Kingdom (UK)', category: 'Destination', href: '/study/uk', desc: 'Russell Group universities, 2-year Graduate Route work visa' },
  { title: 'Study in United States (USA)', category: 'Destination', href: '/study/usa', desc: 'F-1 student visa, STEM OPT 3-year work permit, top global rankings' },
  { title: 'Study in Germany', category: 'Destination', href: '/study/germany', desc: 'Tuition-free public universities, 18-month job seeker visa' },
  { title: 'Study in New Zealand', category: 'Destination', href: '/study/new-zealand', desc: 'High quality of life, green list pathways, post-study work visa' },
  { title: 'Study in Ireland', category: 'Destination', href: '/study/ireland', desc: 'European tech hub, 2-year post-study work permit, top universities' },
  { title: 'Study in Singapore', category: 'Destination', href: '/study/singapore', desc: 'Global financial capital, world-class education & Asian headquarters' },
  { title: 'Study in Malta', category: 'Destination', href: '/study/malta', desc: 'Schengen European country, affordable fees, English speaking' },
  { title: 'Study in France', category: 'Destination', href: '/study/france', desc: 'Top business schools, 5-year post-study Schengen visa for masters' },
  { title: 'Study in Italy', category: 'Destination', href: '/study/italy', desc: 'Historic universities, regional government scholarships, English programs' },
  { title: 'Study in Dubai (UAE)', category: 'Destination', href: '/study/dubai', desc: 'International branch campuses, fast visa processing, zero tax earnings' },
  { title: 'All Study Destinations', category: 'Destination', href: '/countries', desc: 'Explore all 12+ international study destinations guided by 13 Dreams' },

  // Services
  { title: 'Comprehensive Counselling', category: 'Service', href: '/service/comprehensive-counselling', desc: 'One-on-one personalized career mapping and profile assessment' },
  { title: 'Application Processing', category: 'Service', href: '/service/application-processing', desc: 'End-to-end university application filing and offer letter procurement' },
  { title: 'Advice on Selection of Programs', category: 'Service', href: '/service/advice-on-program-selection', desc: 'Curated course matching tailored to your academics and career goals' },
  { title: 'University Shortlisting', category: 'Service', href: '/service/university-shortlisting', desc: 'Finding the right university based on rankings, budget, and location' },
  { title: 'Statement of Purpose (SOP) Assistance', category: 'Service', href: '/service/statement-of-purpose', desc: 'Professional SOP, LOR, and resume drafting support' },
  { title: 'Student Visa Assistance', category: 'Service', href: '/service/student-visa-assistance', desc: '99% visa grant rate, file preparation, financial audits and mock interviews' },
  { title: 'Scholarship Guidance', category: 'Service', href: '/service/scholarship-guidance', desc: 'Merit and need-based international scholarship identification' },
  { title: 'Education Loan Assistance', category: 'Service', href: '/service/education-loan-assistance', desc: 'Collateral and non-collateral overseas education loan partnerships' },
  { title: 'Pre-Departure Briefing', category: 'Service', href: '/service/pre-departure-briefing', desc: 'Accommodation, forex, travel packing, and culture transition briefing' },
  { title: 'Post-Arrival Support', category: 'Service', href: '/service/post-arrival-support', desc: 'Airport pickup, local SIM card, student bank account setup' },
  { title: 'IELTS Coaching & Test Prep', category: 'Coaching', href: '/service/ielts-coaching', desc: 'Certified trainers, mock test series, 7.5+ band score guarantees' },
  { title: 'PTE Coaching & Test Prep', category: 'Coaching', href: '/service/pte-coaching', desc: 'Computerized lab sessions, Pearson-aligned strategies, 79+ targets' },
  { title: 'All Services', category: 'Service', href: '/service', desc: 'Overview of all 12+ student visa and foreign admission services' },

  // Key Pages
  { title: 'Avail Free Counselling (Apply Online)', category: 'Quick Action', href: '/apply', desc: '100% Free profile assessment and visa application assistance' },
  { title: 'About 13 Dreams Consultants', category: 'About', href: '/about-us', desc: '15+ years experience, 150+ partner universities, certified team' },
  { title: 'Success Stories & Visa Approvals', category: 'Story', href: '/story', desc: 'Real student visa grants, high IELTS & PTE scorecards' },
  { title: 'Contact Our Offices', category: 'Contact', href: '/contact', desc: 'Bareilly & Khatima branch locations, phone numbers & enquiry forms' },
  { title: 'Partner Universities', category: 'Explore', href: '/universities', desc: 'Explore 150+ global universities across Canada, UK, Australia & USA' },
  { title: 'Courses & Degree Finder', category: 'Explore', href: '/courses', desc: 'Explore Bachelor, Master, and Diploma programs abroad' },
  { title: 'Education Fairs & Events', category: 'Explore', href: '/events', desc: 'Upcoming university seminars, spot assessments, and webinars' },
  { title: 'Student Visa Guide', category: 'Visa', href: '/student-visa', desc: 'Complete country-by-country student visa requirements and checklist' },
  { title: 'Study Abroad Guide', category: 'Guide', href: '/study-abroad', desc: 'Step-by-step roadmap to study in world-class institutions' },
  { title: 'Study Abroad Blog & News', category: 'Blog', href: '/blog', desc: 'Latest articles on study visas, immigration policies, and tests' },
];

const POPULAR_SEARCHES = [
  'Canada',
  'Australia',
  'UK Student Visa',
  'IELTS Coaching',
  'Free Counselling',
  'Germany',
  'Scholarships',
];

export default function SearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [blogItems, setBlogItems] = useState([]);
  const inputRef = useRef(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Auto-focus input after a tiny tick
      const timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
    }
  }, [isOpen, onClose]);

  // Fetch blogs on first modal open for real-time search
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((b) => ({
            title: b.title,
            category: b.category || 'Blog',
            href: `/blog/${b.slug}`,
            desc: b.excerpt || 'Read article on 13 Dreams Consultants blog',
          }));
          setBlogItems(mapped);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch blogs for search modal:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const allItems = [...STATIC_SEARCH_ITEMS, ...blogItems];
  const query = searchTerm.trim().toLowerCase();

  const filteredResults = query
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      ).slice(0, 10)
    : [];

  const handleSelectResult = (href) => {
    onClose();
    router.push(href);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    if (filteredResults.length > 0) {
      handleSelectResult(filteredResults[0].href);
    } else {
      onClose();
      router.push(`/blog?s=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Destination':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Service':
      case 'Coaching':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'Quick Action':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Blog':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-start pt-12 sm:pt-20 px-4 pb-12 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Close (X) Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close search dialog"
        title="Close (Esc)"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Search Modal Box */}
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-4 sm:p-6 my-auto sm:my-0 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Form */}
        <form onSubmit={handleFormSubmit} className="relative flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1 flex items-center bg-gray-50 border-2 border-gray-200 rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 focus-within:border-red-600 focus-within:bg-white transition-all">
            <svg
              className="w-5 h-5 text-gray-400 mr-2.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              name="s"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses, destinations, visas, or blogs..."
              className="w-full bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400 outline-none focus:outline-none"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors ml-1"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 flex-shrink-0 cursor-pointer"
          >
            <span>Search</span>
            <svg className="w-3.5 h-3.5 hidden sm:inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        {/* Content Area */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          {/* State 1: When user has not typed anything yet */}
          {!query && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Popular Searches
                </span>
                <span className="text-[11px] text-gray-400">Click to search</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setSearchTerm(chip);
                      if (inputRef.current) inputRef.current.focus();
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 transition-colors cursor-pointer border border-gray-200/80 active:scale-95"
                  >
                    🔍 {chip}
                  </button>
                ))}
              </div>

              {/* Quick Shortcuts */}
              <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectResult('/apply')}
                  className="p-2.5 text-left rounded-xl bg-gray-50 hover:bg-red-50 transition-colors border border-gray-100 group"
                >
                  <span className="block text-xs font-bold text-gray-900 group-hover:text-red-600">
                    Apply Online
                  </span>
                  <span className="block text-[11px] text-gray-500">Free Counselling</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectResult('/countries')}
                  className="p-2.5 text-left rounded-xl bg-gray-50 hover:bg-red-50 transition-colors border border-gray-100 group"
                >
                  <span className="block text-xs font-bold text-gray-900 group-hover:text-red-600">
                    Countries
                  </span>
                  <span className="block text-[11px] text-gray-500">12+ Destinations</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectResult('/service')}
                  className="p-2.5 text-left rounded-xl bg-gray-50 hover:bg-red-50 transition-colors border border-gray-100 group col-span-2 sm:col-span-1"
                >
                  <span className="block text-xs font-bold text-gray-900 group-hover:text-red-600">
                    Services
                  </span>
                  <span className="block text-[11px] text-gray-500">Visa & Admissions</span>
                </button>
              </div>
            </div>
          )}

          {/* State 2: When user has typed and results exist */}
          {query && filteredResults.length > 0 && (
            <div className="space-y-1 max-h-[360px] overflow-y-auto custom-dropdown-scroll pr-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Search Results ({filteredResults.length})
                </span>
                <span className="text-[11px] text-gray-400">Press Enter to visit top result</span>
              </div>
              {filteredResults.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectResult(item.href)}
                  className="p-2.5 sm:p-3 rounded-xl hover:bg-red-50/70 border border-transparent hover:border-red-100 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    {item.desc && (
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.desc}</p>
                    )}
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {/* State 3: When user has typed and no results exist */}
          {query && filteredResults.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                🔍
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900">
                No matching results found for &ldquo;{searchTerm}&rdquo;
              </h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-4">
                Try searching for popular terms like <strong>Canada</strong>, <strong>Australia</strong>, <strong>IELTS</strong>, <strong>Visas</strong>, or <strong>Counselling</strong>.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectResult('/apply')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  Avail Free Counselling
                </button>
                <a
                  href="https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20have%20an%20inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 text-xs font-semibold transition-all cursor-pointer"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
