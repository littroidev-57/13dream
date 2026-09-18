'use client';

import React, { useState } from 'react';
import JsonLd from './JsonLd';

/**
 * Accessible FAQ Accordion component that injects Schema.org FAQPage JSON-LD.
 * 
 * @param {{
 *   faqs: Array<{ question: string, answer: string }>,
 *   title?: string,
 *   subtitle?: string
 * }} props
 */
export default function FaqAccordion({
  faqs = [],
  title = 'Frequently Asked Questions',
  subtitle = 'Get quick answers to common queries about university applications and student visas.',
}) {
  const [openIndices, setOpenIndices] = useState([0]); // Open first FAQ by default

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Schema.org FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="w-full my-8">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>}
            {subtitle && <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className="space-y-3 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-red-500/40 bg-white shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-semibold text-gray-900 hover:text-red-600 transition-colors text-sm sm:text-base"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs transition-transform duration-200 ${
                      isOpen ? 'bg-red-600 text-white rotate-180' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
