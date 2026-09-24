'use client';

import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'What is the minimum IELTS / PTE score required for Canada, UK, and Australia student visas?',
    a: 'For Canada, most colleges and universities require an overall IELTS score of 6.0 (with no individual band below 6.0) or PTE 60+. For the UK, undergraduate degrees generally require IELTS 6.0 and postgraduate degrees require 6.5 (or PTE 58-65+). For Australia, requirements range between IELTS 6.0-6.5 or PTE 58-64 depending on the institution and study level. At 13 Dreams Consultants, our certified trainers prepare students to target 7.0+ bands in IELTS and 65+ in PTE.',
  },
  {
    q: 'Can I study abroad without IELTS or with an English waiver?',
    a: 'Yes! Several top universities in the UK, Germany, and Europe accept English medium of instruction (MOI) waivers if you scored 70%+ in your 12th standard English or graduated from an English-medium degree. Additionally, alternative tests like PTE Academic, Duolingo English Test (DET), and Oxford ELLT are accepted by hundreds of institutions. Contact our counselors to check if your profile qualifies for an IELTS waiver.',
  },
  {
    q: 'Is PTE Academic accepted for student visas in Canada and Australia?',
    a: 'Yes, absolutely. PTE Academic is fully recognized by the Australian Department of Home Affairs (DHA), Immigration, Refugees and Citizenship Canada (IRCC) under the SDS/regular stream, UK Visas and Immigration (PTE Academic UKVI), and New Zealand Immigration. It offers rapid results (usually within 48 hours) and computer-based unbiased scoring.',
  },
  {
    q: 'What documents are required for university admissions and student visa filing?',
    a: 'Key documents include: (1) Valid Passport, (2) Academic mark sheets and degree certificates (10th, 12th, Graduation), (3) English proficiency test report (IELTS/PTE), (4) Statement of Purpose (SOP), (5) Letters of Recommendation (LOR), (6) Financial bank statements & affidavit of support, and (7) University Offer Letter / CAS / CoE. 13 Dreams Consultants guides you through preparing, reviewing, and organizing every single document to guarantee error-free visa submission.',
  },
  {
    q: 'How long does the study visa application process take?',
    a: 'Processing times vary by destination: Canada student visas typically take 4 to 8 weeks; UK Student Visas take 3 weeks (or 5 working days with Priority service); Australia takes approximately 4 to 6 weeks; USA visa interviews provide on-spot approval. We recommend starting your process 4 to 6 months before your target university intake (e.g., September Fall or January Winter).',
  },
  {
    q: 'What services are included when I apply through 13 Dreams Consultants?',
    a: '13 Dreams provides complete end-to-end guidance: Free 1-on-1 career profiling, shortlisting top QS-ranked universities, scholarship application assistance, high-scoring IELTS/PTE coaching, SOP drafting, complete visa filing & document verification, mock visa interview preparation, education loan guidance, and pre-departure briefings.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  // Google FAQPage Schema for SERP Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq-section" className="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden border-b border-gray-200">
      {/* Google FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
            <i className="fa-solid fa-circle-question text-red-600"></i>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Got Questions About <span className="text-red-600">Study Abroad & Visas</span>?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Find quick answers regarding IELTS band requirements, PTE acceptance, student visa timelines, and our counseling process.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-red-300 bg-white shadow-md'
                    : 'border-gray-200/90 bg-white/80 hover:border-gray-300 hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 text-xs font-bold shrink-0 flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{item.q}</span>
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-red-600 text-white rotate-180' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help box */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-red-50 via-white to-red-50 border border-red-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-gray-900">Have a specific question about your profile or test scores?</h4>
            <p className="text-xs text-gray-600 mt-1">Speak directly with our senior study abroad counselors in Bareilly & Khatima.</p>
          </div>
          <a
            href="https://wa.me/+919759053463?text=Hi%2013%20Dreams%2C%20I%20have%20a%20question%20regarding%20my%20study%20abroad%20eligibility"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1faa52] text-white font-bold text-xs sm:text-sm shadow-md shrink-0"
            style={{ color: '#ffffff' }}
          >
            <i className="fa-brands fa-whatsapp text-base text-white" style={{ color: '#ffffff' }}></i>
            <span className="text-white" style={{ color: '#ffffff' }}>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
