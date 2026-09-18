import React from 'react';
import Link from 'next/link';
import PageBanner from '@/components/UI/PageBanner';
import FaqAccordion from '@/components/SEO/FaqAccordion';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Student Visa Consultants | High Success Study Visa Guidance | 13 Dreams',
  description:
    'Expert student visa consultancy for Canada, UK, USA, Australia, and Europe. 99% visa grant rate, GTE/SOP scrutiny, financial documentation, and embassy mock interviews.',
  alternates: {
    canonical: getCanonicalUrl('/student-visa'),
  },
  openGraph: {
    title: 'Student Visa Consultants | 99% Visa Grant Rate | 13 Dreams',
    description:
      'End-to-end student visa processing for Canada SDS, Australia Subclass 500, UK Student Route, and USA F-1 visas with certified advisors.',
    url: getCanonicalUrl('/student-visa'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

const visaFaqs = [
  {
    question: 'What is the visa grant rate with 13 Dreams Consultants?',
    answer:
      '13 Dreams Consultants maintains an industry-leading 99% visa approval rate across Canada, the UK, Australia, the USA, and European nations. Our rigorous pre-submission audit ensures that every financial affidavit, SOP, and academic credential conforms to strict embassy guidelines.',
  },
  {
    question: 'How long does a student visa application take to process?',
    answer:
      'Processing times vary by destination and stream: Canadian SDS applications typically take 20 to 30 days; UK Student Route visas take 3 to 4 weeks (with priority options in 5 days); Australian Subclass 500 visas take 4 to 8 weeks; and US F-1 decisions are rendered immediately at the conclusion of the embassy interview.',
  },
  {
    question: 'What is a Blocked Account (Sperrkonto) for Germany?',
    answer:
      'To secure a German National Student Visa, Indian students must deposit mandatory living expenses (currently €11,904 per year) into a government-approved blocked account such as Expatrio, Coracle, or Fintiba. 13 Dreams assists with setting up your blocked account and obtaining the requisite confirmation certificate.',
  },
  {
    question: 'Do I need to attend an embassy interview for my student visa?',
    answer:
      'The USA mandates an in-person F-1 interview at a US consulate. The UK conducts occasional credibility interviews, while Canada, Australia, and Germany primarily assess digital filings and biometric data unless specific clarifications are requested. 13 Dreams provides comprehensive 1-on-1 mock interviews for all candidates.',
  },
];

const visaStreams = [
  {
    country: 'Canada',
    visaName: 'Study Permit (SDS / Regular)',
    keyFeature: 'Up to 3-Year Post-Graduation Work Permit (PGWP)',
    reqs: ['Letter of Acceptance (DLI)', 'GIC CAD 20,635 Deposit', 'IELTS 6.0+ or PTE 60+', 'Medical & Biometrics'],
    badge: 'Fast-Track SDS',
  },
  {
    country: 'Australia',
    visaName: 'Student Visa (Subclass 500)',
    keyFeature: '48 Hours/Fortnight Work Rights + Subclass 485 PSW',
    reqs: ['Confirmation of Enrolment (CoE)', 'Genuine Student (GS) Assessment', 'OSHC Health Insurance', 'Annual Living Costs Proof'],
    badge: 'Electronic Lodgement',
  },
  {
    country: 'United Kingdom',
    visaName: 'Student Route Visa',
    keyFeature: '2-Year Graduate Route Post-Study Work Permit',
    reqs: ['CAS from Licensed Sponsor', '28-Day Bank Balance Rule', 'IELTS UKVI or University Waiver', 'TB Screening Certificate'],
    badge: 'Russell Group Access',
  },
  {
    country: 'United States',
    visaName: 'F-1 Academic Student Visa',
    keyFeature: '1-Year OPT + 2-Year STEM Extension (3 Years Total)',
    reqs: ['Form I-20 from SEVP College', 'SEVIS I-901 Fee Payment', 'DS-160 Filing & Visa Fee', 'Consular Mock Interview'],
    badge: 'Top STEM Research',
  },
  {
    country: 'Germany',
    visaName: 'National Visa (Type D)',
    keyFeature: 'Zero Tuition Fees + 18-Month Job Seeker Visa',
    reqs: ['University Admission Letter', 'APS Verification Certificate', 'Blocked Account (€11,904)', 'Statutory Health Cover'],
    badge: 'Tuition-Free Study',
  },
  {
    country: 'Ireland',
    visaName: 'Stamp 2 Student Visa',
    keyFeature: '2-Year Third Level Graduate Scheme (Master\'s)',
    reqs: ['College Acceptance', '€10,000+ Proof of Funds', 'Private Medical Insurance', 'Police Clearance & SOP'],
    badge: 'EU Tech Capital',
  },
];

export default function StudentVisaPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Student Visa Guidance & Consultation | 13 Dreams Consultants',
    description:
      'Professional study visa assistance, document compilation, financial sponsorship verification, and embassy mock interviews.',
    url: getCanonicalUrl('/student-visa'),
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
        title="Student Visa Guidance"
        breadcrumbs={[{ label: 'Student Visa', href: null }]}
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full">
              High-Approval Visa Processing
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
              Expert <span className="text-red-600">Student Visa Guidance</span> for Global Universities
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Securing a student visa requires flawless documentation, embassy compliance, and clear demonstration of genuine student intent. With over 15 years of dedicated visa consulting, 13 Dreams ensures a stress-free lodgement process.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/25 transition-all"
              >
                Apply for Visa Counseling
              </Link>
              <Link
                href="/story"
                className="px-8 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm transition-all"
              >
                View Visa Success Stories
              </Link>
            </div>
          </div>

          {/* Visa Streams Grid */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Major International Student Visa Categories
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Click any category or apply directly for tailored dossier preparation with our senior visa officers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visaStreams.map((v, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-white border border-gray-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-600">
                        {v.badge}
                      </span>
                      <span className="text-sm font-extrabold text-gray-400">{v.country}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1">{v.visaName}</h3>
                    <p className="text-xs font-semibold text-red-600 mb-4">{v.keyFeature}</p>

                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Key Requirements:</p>
                      <ul className="space-y-1.5 text-xs text-gray-600">
                        {v.reqs.map((r, rIdx) => (
                          <li key={rIdx} className="flex items-center gap-2">
                            <i className="fa-solid fa-check text-red-500 text-[10px]"></i>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/apply?destination=${v.country}`}
                    className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-red-600 text-gray-800 hover:text-white font-bold text-xs text-center transition-colors border border-gray-200 hover:border-red-600"
                  >
                    Start {v.country} Visa Filing
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Visa Preparation 4 Steps */}
          <div className="bg-gray-50/80 rounded-3xl p-8 sm:p-12 mb-20 border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Our Proven Visa Filing Methodology
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Every application undergoes four distinct phases of scrutiny prior to embassy submission.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Financial Scrutiny',
                  desc: 'Comprehensive verification of sponsor affidavits, ITRs, bank balances, and loan sanctions to meet exact immigration standards.',
                },
                {
                  step: '2',
                  title: 'SOP & GTE Drafting',
                  desc: 'Crafting compelling, customized Statements of Purpose highlighting genuine academic intent and clear ties to your home country.',
                },
                {
                  step: '3',
                  title: 'Mock Embassy Interviews',
                  desc: 'One-on-one simulated interview sessions conducted by experienced advisors to ensure articulate, confident communication.',
                },
                {
                  step: '4',
                  title: 'Portal Lodgement & Tracking',
                  desc: 'Error-free filing on official high commission portals with real-time biometric scheduling and milestone updates.',
                },
              ].map((s, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                  <span className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center mb-4">
                    {s.step}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{s.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <FaqAccordion
            faqs={visaFaqs}
            title="Student Visa Frequently Asked Questions"
            subtitle="Understand embassy regulations, processing timelines, and financial requirements."
          />

          {/* Conversion Box */}
          <div className="mt-16 text-center bg-gradient-to-r from-slate-900 to-red-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-red-500/30">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Had a Prior Visa Refusal? We Can Help.
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
              Our specialized refusal review team conducts forensic audits of previous CAIPS/GCMS notes and builds ironclad re-applications.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                Book Free Visa Audit
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
              >
                Contact Bareilly Office
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
