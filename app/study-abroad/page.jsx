import React from 'react';
import Link from 'next/link';
import PageBanner from '@/components/UI/PageBanner';
import FaqAccordion from '@/components/SEO/FaqAccordion';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';
import { destinationsData } from '@/lib/seedData';

export const metadata = {
  title: 'Study Abroad Consultants | Top Overseas Education Advisory | 13 Dreams',
  description:
    'Comprehensive guide to studying abroad for Indian students. Learn about university admissions, popular countries, tuition costs, scholarships, and post-study work visas with 13 Dreams Consultants.',
  alternates: {
    canonical: getCanonicalUrl('/study-abroad'),
  },
  openGraph: {
    title: 'Study Abroad Guide & Overseas Education Consultancy | 13 Dreams',
    description:
      'Explore top global study destinations, admission criteria, and scholarship opportunities with trusted study abroad advisors in Bareilly & Khatima.',
    url: getCanonicalUrl('/study-abroad'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

const studyAbroadFaqs = [
  {
    question: 'Why should I choose 13 Dreams Consultants for my study abroad journey?',
    answer:
      'With over 15 years of proven experience, 13 Dreams Consultants provides genuine, student-first guidance. We are official partner agents for leading universities across Canada, the UK, Australia, the USA, and Europe, maintaining a 99% visa success rate and offering 100% free profile evaluations.',
  },
  {
    question: 'Which country is best for Indian students to study abroad in 2026/2027?',
    answer:
      'The best country depends on your budget, degree level, and career goals: Germany offers tuition-free education at public universities; the UK offers fast-track 1-year Master\'s degrees with 2-year Graduate Route visas; Canada and Australia offer generous 2 to 4 year post-study work permits with accessible PR pathways; while the USA is the global leader in STEM research and OPT internships.',
  },
  {
    question: 'What is the average cost of studying abroad?',
    answer:
      'Tuition fees typically range from €0 - €3,000/year in Germany, CAD 15,000 - CAD 30,000/year in Canada, £12,000 - £25,000/year in the UK, and AUD 22,000 - AUD 45,000/year in Australia. Living costs range between INR 7 Lakhs to 12 Lakhs annually depending on the city.',
  },
  {
    question: 'Are scholarships available for international students?',
    answer:
      'Yes. Many universities offer merit-based scholarships, global diversity bursaries, and faculty fee reductions ranging from 10% to 50% of annual tuition fees. 13 Dreams advisors guide you through identifying and securing applicable scholarships during the application stage.',
  },
];

export default function StudyAbroadPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Study Abroad Guide & Overseas Education Consultancy',
    description:
      'Complete study abroad guidance, country comparison, and university admission resources for Indian students.',
    url: getCanonicalUrl('/study-abroad'),
    publisher: {
      '@type': 'EducationalOrganization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      <PageBanner
        title="Study Abroad Guide"
        breadcrumbs={[{ label: 'Study Abroad', href: null }]}
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full">
              Global Education Opportunities
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
              Your Complete Guide to <span className="text-red-600">Studying Abroad</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Pursuing an international degree is a life-changing investment. From choosing the ideal destination to securing university admissions and student visas, 13 Dreams Consultants is your trusted mentor every step of the way.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/25 transition-all"
              >
                Apply for Free Counselling
              </Link>
              <Link
                href="/countries"
                className="px-8 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm transition-all"
              >
                View All Countries
              </Link>
            </div>
          </div>

          {/* Why Study Abroad 4 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                title: 'Global Career Mobility',
                desc: 'Earn globally accredited degrees recognized by Fortune 500 employers worldwide with high starting salaries.',
                icon: 'fa-briefcase',
              },
              {
                title: 'Post-Study Work Visas',
                desc: 'Access 2 to 4 years of open work authorization in countries like Canada, Australia, the UK, and Germany.',
                icon: 'fa-passport',
              },
              {
                title: 'Quality of Living & Safety',
                desc: 'Experience multicultural, inclusive societies with exceptional public healthcare, infrastructure, and security.',
                icon: 'fa-shield-halved',
              },
              {
                title: 'PR & Settlement Pathways',
                desc: 'Leverage points-based immigration and provincial nominee programs to transition from student to permanent resident.',
                icon: 'fa-house-flag',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-gray-50/70 border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl mb-5 shadow-md shadow-red-600/30">
                  <i className={`fa-solid ${p.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Destination Comparison Grid */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Top Study Destinations for Indian Students
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Compare major overseas study hubs by work rights, average costs, and top academic specializations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinationsData.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white font-extrabold text-lg">{dest.name}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {dest.description}
                    </p>
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/study/${dest.id}`}
                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        Country Details <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </Link>
                      <Link
                        href={`/apply?destination=${dest.name}`}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <FaqAccordion
            faqs={studyAbroadFaqs}
            title="Study Abroad Frequently Asked Questions"
            subtitle="Get essential answers about country selection, costs, English tests, and scholarships."
          />

          {/* Bottom CTA Banner */}
          <div className="mt-16 text-center bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-red-500/20">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Plan Your Study Abroad Journey with Experts
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
              Schedule your free 1-on-1 counseling session in Bareilly, Khatima, or online from anywhere in India.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                Start Free Application
              </Link>
              <Link
                href="/student-visa"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
              >
                Explore Student Visas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
