'use client';

import React, { useState } from 'react';

const REVIEWS = [
  {
    name: 'Harmandeep Kaur',
    location: 'Khatima, UK',
    destination: 'Australia',
    flag: '🇦🇺',
    university: 'Deakin University, Melbourne',
    course: 'Master of Information Technology',
    visaDays: 'Subclass 500 Approved',
    rating: 5,
    date: 'August 2026',
    comment:
      '13 Dreams Khatima team handled my entire Australia student visa file seamlessly. From Genuine Student (GS) assessment to biometric booking, everything went through without a single query. Truly grateful to the entire team!',
  },
  {
    name: 'Sukhmandeep Kaur',
    location: 'Bareilly, UP',
    destination: 'United Kingdom',
    flag: '🇬🇧',
    university: 'University of Leeds',
    course: 'MSc Data Science & Analytics',
    visaDays: 'IELTS 7.5 Band & Visa in 10 Days',
    rating: 5,
    date: 'September 2026',
    comment:
      'Achieved 7.5 Band in IELTS coaching with 13 Dreams Bareilly faculty, followed by an unconditional offer letter and UK visa approval in just 10 days. The personalized attention and visa mock guidance are unmatched.',
  },
  {
    name: 'Ajay Joshi',
    location: 'Bareilly, UP',
    destination: 'Australia',
    flag: '🇦🇺',
    university: 'RMIT University, Melbourne',
    course: 'Master of Professional Accounting',
    visaDays: 'PTE 68+ & Visa Granted',
    rating: 5,
    date: 'July 2026',
    comment:
      'Enrolled for Pearson PTE coaching at the Bareilly branch and achieved 68 overall! The counselors prepared my statement of purpose and visa paperwork with extreme precision. 100% recommended for Australia.',
  },
  {
    name: 'Simranjeet Kaur',
    location: 'Khatima, UK',
    destination: 'Canada',
    flag: '🇨🇦',
    university: 'Conestoga College, Ontario',
    course: 'PG in Health Information Management',
    visaDays: 'SDS Study Permit Approved',
    rating: 5,
    date: 'August 2026',
    comment:
      'Was really anxious about Canada SDS visa rule updates, but Harpreet Sir and Priya Ma’am guided me step-by-step with GIC, medical filing, and provincial attestation. Got my passport stamped without delay!',
  },
  {
    name: 'Amanpreet Singh',
    location: 'Bareilly, UP',
    destination: 'United Kingdom',
    flag: '🇬🇧',
    university: 'University of Birmingham',
    course: 'MSc Artificial Intelligence',
    visaDays: 'Without IELTS (CBSE English)',
    rating: 5,
    date: 'September 2026',
    comment:
      'Applied without IELTS using my CBSE class 12th English score! 13 Dreams secured my admission, CAS letter, and processed biometric filing with complete transparency. Best overseas consultancy in Rohilkhand.',
  },
  {
    name: 'Arpit Rawat',
    location: 'Bareilly, UP',
    destination: 'Germany',
    flag: '🇩🇪',
    university: 'University of Europe (UE Berlin)',
    course: 'MSc International Business Management',
    visaDays: 'APS Cleared & Visa in 3 Weeks',
    rating: 5,
    date: 'June 2026',
    comment:
      'Helped me secure an English-taught master’s degree in Berlin along with APS verification and blocked account setup. Studying in Germany with 18 months post-study work rights was made super easy.',
  },
  {
    name: 'Taranpreet Dhillon',
    location: 'Bareilly, UP',
    destination: 'United States',
    flag: '🇺🇸',
    university: 'University of North Texas',
    course: 'MS Computer Science (STEM OPT)',
    visaDays: 'F-1 Visa Approved on Spot',
    rating: 5,
    date: 'June 2026',
    comment:
      'My F-1 visa interview prep at 13 Dreams was the game changer. We did 3 rigorous mock rounds covering finances and post-study career plans. Got my US visa approved on the spot at Delhi Embassy!',
  },
  {
    name: 'Amrat Kaur',
    location: 'Khatima, UK',
    destination: 'Canada',
    flag: '🇨🇦',
    university: 'Fanshawe College, London ON',
    course: 'Post-Grad in Supply Chain Management',
    visaDays: 'Canada Visa Approved',
    rating: 5,
    date: 'July 2026',
    comment:
      'From selecting the right PG diploma aligned with my previous graduation to submitting SOP and visa forms, 13 Dreams provided complete peace of mind. Truly professional and genuine consultants in Kumaon.',
  },
  {
    name: 'Harshit Joshi',
    location: 'Haldwani, UK',
    destination: 'Ireland',
    flag: '🇮🇪',
    university: 'Dublin Business School',
    course: 'MSc Cloud Computing',
    visaDays: 'Ireland Visa Approved',
    rating: 5,
    date: 'May 2026',
    comment:
      'Got clear guidance on Ireland’s 2-year post-study work permit and top tech opportunities in Dublin. Zero hidden charges, honest timeline estimates, and friendly support on WhatsApp anytime.',
  },
  {
    name: 'Ayush Bhalla',
    location: 'Bareilly, UP',
    destination: 'United Kingdom',
    flag: '🇬🇧',
    university: 'Sheffield Hallam University',
    course: 'MBA International Business',
    visaDays: '£2,500 Scholarship & Visa Grant',
    rating: 5,
    date: 'August 2026',
    comment:
      'The team assisted with my offer letter, university scholarship discount of £2,500, and fast-track student visa processing. Excellent guidance from initial counseling to pre-departure briefing.',
  },
  {
    name: 'Neha Gangwar',
    location: 'Bareilly, UP',
    destination: 'Malta (Europe)',
    flag: '🇲🇹',
    university: 'Middlesex University Malta',
    course: 'BSc Computer Science',
    visaDays: 'Schengen Visa Granted',
    rating: 5,
    date: 'April 2026',
    comment:
      'Affordable European education with access to 27 Schengen countries. The counselors at Bareilly office are knowledgeable, courteous, and always prompt to answer every query.',
  },
  {
    name: 'Gurtej Singh',
    location: 'Khatima, UK',
    destination: 'New Zealand',
    flag: '🇳🇿',
    university: 'Auckland Institute of Studies',
    course: 'Postgraduate Diploma in IT',
    visaDays: 'NZ Fee Paying Visa',
    rating: 5,
    date: 'March 2026',
    comment:
      '13 Dreams team in Khatima supported me right from course evaluation to fee paying visa grant for New Zealand. Genuine advice with zero false promises.',
  },
  {
    name: 'Pooja Verma',
    location: 'Pilibhit, UP',
    destination: 'Germany',
    flag: '🇩🇪',
    university: 'SRH Berlin University',
    course: 'MA International Management',
    visaDays: 'German Student Visa',
    rating: 5,
    date: 'June 2026',
    comment:
      'Traveled from Pilibhit to Bareilly for counseling and it was the best decision. They sorted my university offer, blocked account, and German embassy visa interview smoothly.',
  },
  {
    name: 'Mandeep Singh',
    location: 'Khatima, UK',
    destination: 'Australia',
    flag: '🇦🇺',
    university: 'Western Sydney University',
    course: 'Bachelor of Nursing',
    visaDays: 'IELTS 6.5 Band & Visa in 3 Weeks',
    rating: 5,
    date: 'May 2026',
    comment:
      'Achieved my target 6.5 band in IELTS classes at Khatima branch and secured admission with partial scholarship. Visa was granted within 3 weeks without interview.',
  },
  {
    name: 'Manpreet Kaur',
    location: 'Bareilly, UP',
    destination: 'Canada',
    flag: '🇨🇦',
    university: 'Georgian College, Barrie ON',
    course: 'PG in Project Management',
    visaDays: 'Canada Study Permit Granted',
    rating: 5,
    date: 'July 2026',
    comment:
      'Super transparent counseling for Canada. They carefully verified all my academic gap documents and financials so there was zero reason for rejection. Visa approved on the first attempt!',
  },
  {
    name: 'Jaspreet Singh',
    location: 'Majhola, UP',
    destination: 'United Kingdom',
    flag: '🇬🇧',
    university: 'University of Hertfordshire',
    course: 'MSc Cyber Security',
    visaDays: 'UK Biometric Approved in 8 Days',
    rating: 5,
    date: 'September 2026',
    comment:
      'Applied for September intake and received my CAS within 2 weeks. The visa filing team double-checked every financial document. Got my UK biometric approval in just 8 days!',
  },
  {
    name: 'Navjot Kaur',
    location: 'Khatima, UK',
    destination: 'Australia',
    flag: '🇦🇺',
    university: 'Charles Sturt University',
    course: 'Master of Professional Accounting',
    visaDays: 'Subclass 500 Approved',
    rating: 5,
    date: 'July 2026',
    comment:
      'Very supportive staff and direct access to senior counselors. They explained all regional study benefits, post-study work rights, and handled the GS requirement thoroughly.',
  },
  {
    name: 'Rohan Sharma',
    location: 'Bareilly, UP',
    destination: 'Singapore',
    flag: '🇸🇬',
    university: 'PSB Academy, Singapore',
    course: 'BSc Global Business Management',
    visaDays: 'Student Pass in 2 Weeks',
    rating: 5,
    date: 'June 2026',
    comment:
      'Guided me through world-class Asian education hubs. Fast admission turnaround and student pass approval in less than 2 weeks. Exceptional consultancy for global careers!',
  },
];

export default function GoogleReviewsSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-200/80 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          {/* Google Verified Banner Linked to Official Google Maps Listing */}
          <a
            href="https://maps.google.com/maps?cid=0x39a0073e0285cc55:0xc22bb507faa8a382"
            target="_blank"
            rel="noopener noreferrer"
            title="View 13 Dreams Consultants on Google Maps"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-black text-white shadow-lg shadow-slate-900/10 mb-4 border border-slate-800 transition-all transform hover:scale-105"
          >
            {/* Google G icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-xs font-bold text-gray-200">Google Verified Rating</span>
            <div className="flex items-center text-amber-400 text-xs">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <span className="text-xs font-extrabold text-amber-300">4.8 / 5.0</span>
            <span className="text-[11px] text-gray-400 hidden sm:inline">(116+ Google Reviews)</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-gray-400 ml-1"></i>
          </a>

          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-gray-900 tracking-tight leading-tight">
            Real Students, Real <span className="text-red-600">Visa Grants</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Read verified reviews from students who trusted 13 Dreams Consultants for university admissions, IELTS/PTE coaching, and student visa filing in Bareilly, Khatima, and across North India.
          </p>
        </div>
      </div>

      {/* ── Running Marquee Wrapper with Smooth Gradient Fade Edges ── */}
      <div
        className="reviews-marquee-container relative w-full overflow-hidden py-4 select-none group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Gradient Edge Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        {/* Right Gradient Edge Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track: Loops Twice for Seamless Continuous Scroll */}
        <div
          className="reviews-marquee-track flex gap-6 w-max will-change-transform"
          style={{
            animation: 'reviewsMarqueeScroll 72s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <div
              key={i}
              className="reviews-marquee-card w-[340px] sm:w-[380px] flex-shrink-0 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-red-500/80 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              onMouseEnter={() => setIsPaused(true)}
            >
              <div>
                {/* Review Header: User Info & Rating */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white font-extrabold text-base flex items-center justify-center shadow-md flex-shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {review.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        <i className="fa-solid fa-location-dot text-red-500 text-[10px]"></i>
                        <span>{review.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 shrink-0">
                    <i className="fa-solid fa-circle-check text-emerald-600 text-[10px]"></i>
                    <span>Verified</span>
                  </span>
                </div>

                {/* Stars and Destination Pill */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center text-amber-400 text-xs">
                    {[...Array(review.rating)].map((_, s) => (
                      <i key={s} className="fa-solid fa-star"></i>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1 bg-gray-100/80 px-2 py-0.5 rounded-full">
                    <span>{review.flag}</span>
                    <span>{review.destination}</span>
                  </span>
                </div>

                {/* University and Course Badge */}
                <div className="mb-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-gray-700">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5 truncate">
                    <i className="fa-solid fa-building-columns text-red-500 text-xs shrink-0"></i>
                    <span className="truncate">{review.university}</span>
                  </div>
                  <div className="text-[11px] text-gray-600 mt-0.5 pl-4 truncate">
                    {review.course}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed italic line-clamp-4">
                  "{review.comment}"
                </p>
              </div>

              {/* Review Footer: Visa tag and date */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span className="font-bold text-red-600 flex items-center gap-1">
                  <i className="fa-solid fa-bolt text-red-500 text-[10px]"></i>
                  {review.visaDays}
                </span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Trust Action Box */}
      <div className="container mx-auto px-4 max-w-7xl relative mt-8">
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-8 rounded-2xl bg-slate-900 text-white shadow-xl">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-lg text-white flex-shrink-0">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Join 1,000+ Successful Visa Holders</h4>
                <p className="text-xs text-gray-400">100% Free profile assessment with Bareilly &amp; Khatima counselors.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center">
              <a
                href="https://maps.google.com/maps?cid=0x39a0073e0285cc55:0xc22bb507faa8a382"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/10"
              >
                <i className="fa-brands fa-google text-amber-400 text-xs"></i>
                <span>All 116+ Google Reviews</span>
              </a>
              <a
                href="https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20saw%20your%20student%20reviews%20and%20would%20like%20to%20book%20a%20free%20counseling%20session"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-md"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="tel:+919759053463"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
              >
                <i className="fa-solid fa-phone text-xs"></i>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
