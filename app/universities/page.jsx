import React from 'react';
import Link from 'next/link';
import PageBanner from '@/components/UI/PageBanner';
import FaqAccordion from '@/components/SEO/FaqAccordion';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Partner Universities & Global Colleges | 13 Dreams Consultants',
  description:
    'Explore 150+ accredited partner universities across Canada, UK, Australia, USA, Germany, and New Zealand. Get fast-track admissions and scholarship guidance with 13 Dreams Consultants.',
  alternates: {
    canonical: getCanonicalUrl('/universities'),
  },
  openGraph: {
    title: 'Global Universities Directory | 13 Dreams Consultants',
    description:
      'Explore world-ranked universities, admissions criteria, and scholarship eligibility across 10+ countries.',
    url: getCanonicalUrl('/universities'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

const uniFaqs = [
  {
    question: 'How do 13 Dreams Consultants help me choose the right university?',
    answer:
      'We conduct a comprehensive profile assessment evaluating your past academic scores, English language results, career ambitions, and tuition budget. We cross-reference this with post-study work regulations and industry placement statistics to shortlist best-fit dream, target, and safe universities.',
  },
  {
    question: 'What is the difference between conditional and unconditional offer letters?',
    answer:
      'A conditional offer letter requires you to fulfill specific pending requirements before final enrollment (such as submitting your final semester degree, achieving a specific IELTS score, or paying an initial tuition deposit). An unconditional offer letter confirms you have met all academic and linguistic requirements and are fully admitted.',
  },
  {
    question: 'Can I apply to multiple universities through 13 Dreams?',
    answer:
      'Yes. We typically assist students in applying to 3 to 5 universities concurrently across their preferred country or multiple destinations, maximizing their admission chances and scholarship opportunities.',
  },
];

const universityClusters = [
  {
    country: 'Australia',
    title: 'Group of Eight (Go8) & Top Tech Universities',
    unis: [
      'University of Melbourne',
      'University of Sydney',
      'UNSW Sydney',
      'Monash University',
      'University of Queensland',
      'Deakin University',
      'RMIT University',
      'La Trobe University',
    ],
    highlight: '7 of the World\'s Top 100 Universities',
  },
  {
    country: 'Canada',
    title: 'Top U15 Universities & Premier Public Colleges',
    unis: [
      'University of Toronto',
      'University of British Columbia (UBC)',
      'McGill University',
      'University of Alberta',
      'University of Waterloo',
      'George Brown College',
      'Humber College',
      'Centennial College',
    ],
    highlight: 'PGWP Eligible Programs & Low Tuition vs US',
  },
  {
    country: 'United Kingdom',
    title: 'Russell Group & World Heritage Academia',
    unis: [
      'University of Oxford',
      'University of Cambridge',
      'Imperial College London',
      'University College London (UCL)',
      'University of Edinburgh',
      'University of Manchester',
      'University of Birmingham',
      'Coventry University',
    ],
    highlight: 'Fast-Track 1-Year Master\'s Programs',
  },
  {
    country: 'United States',
    title: 'Ivy League & Tier-1 Research Institutions',
    unis: [
      'MIT',
      'Stanford University',
      'Harvard University',
      'University of California, Berkeley',
      'Carnegie Mellon University',
      'Purdue University',
      'University of Southern California',
      'Northeastern University',
    ],
    highlight: 'World Leaders in STEM & 3-Year OPT',
  },
  {
    country: 'Germany',
    title: 'TU9 Technical Universities & Applied Sciences',
    unis: [
      'Technical University of Munich (TUM)',
      'RWTH Aachen University',
      'TU Berlin',
      'University of Stuttgart',
      'Karlsruhe Institute of Technology (KIT)',
      'Heidelberg University',
      'IU International University',
      'SRH Berlin',
    ],
    highlight: 'Zero Tuition Fees at Public Universities',
  },
  {
    country: 'Ireland & New Zealand',
    title: 'Leading European & Pacific Research Hubs',
    unis: [
      'Trinity College Dublin (TCD)',
      'University College Dublin (UCD)',
      'University of Auckland',
      'University of Otago',
      'Victoria University of Wellington',
      'Dublin City University (DCU)',
      'University of Galway',
      'Auckland University of Technology (AUT)',
    ],
    highlight: '2 to 3 Years Post-Study Work Visas',
  },
];

export default function UniversitiesPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Global Partner Universities & Colleges | 13 Dreams Consultants',
    description:
      'Directory of global universities, admissions shortlisting, and institutional scholarship guidance.',
    url: getCanonicalUrl('/universities'),
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
        title="Partner Universities"
        breadcrumbs={[{ label: 'Universities', href: null }]}
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full">
              Global Higher Education Network
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
              Study at <span className="text-red-600">World-Ranked</span> Partner Universities
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Choosing the right university shapes your entire professional trajectory. 13 Dreams Consultants represents over 150 accredited institutions globally, facilitating fast-track offer letters, credit transfers, and institutional scholarships.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/25 transition-all"
              >
                Get Free University Shortlist
              </Link>
              <Link
                href="/courses"
                className="px-8 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm transition-all"
              >
                Explore In-Demand Courses
              </Link>
            </div>
          </div>

          {/* Clusters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {universityClusters.map((cluster, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-600">
                      {cluster.country}
                    </span>
                    <i className="fa-solid fa-building-columns text-gray-400"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1.5">{cluster.title}</h3>
                  <p className="text-xs font-semibold text-red-600 mb-4">{cluster.highlight}</p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Featured Institutions:</p>
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      {cluster.unis.map((u, uIdx) => (
                        <li key={uIdx} className="flex items-center gap-2">
                          <i className="fa-solid fa-graduation-cap text-red-500 text-[10px]"></i>
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/apply?destination=${cluster.country}`}
                  className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-red-600 text-gray-800 hover:text-white font-bold text-xs text-center transition-colors border border-gray-200 hover:border-red-600"
                >
                  Apply to {cluster.country} Universities
                </Link>
              </div>
            ))}
          </div>

          {/* Key Selection Criteria */}
          <div className="bg-gray-50/80 rounded-3xl p-8 sm:p-12 mb-20 border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                How to Evaluate an Overseas University
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Four critical factors our counselors evaluate before recommending any institution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Accreditation & Quality',
                  desc: 'Ensuring the college is government-recognized and degree credentials are authenticated globally by WES and AIU.',
                  icon: 'fa-certificate',
                },
                {
                  title: 'Post-Study Work Eligibility',
                  desc: 'Confirming programs grant eligibility for PGWP (Canada), Subclass 485 (Australia), or Graduate Route (UK).',
                  icon: 'fa-id-card',
                },
                {
                  title: 'Industry Co-op & Internships',
                  desc: 'Prioritizing courses that include structured, paid internships providing real-world corporate experience.',
                  icon: 'fa-handshake',
                },
                {
                  title: 'Scholarship Potential',
                  desc: 'Assessing institutional bursaries and fee remissions ranging from 15% to 50% to optimize overall budget.',
                  icon: 'fa-award',
                },
              ].map((c, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-lg mb-3">
                    <i className={`fa-solid ${c.icon}`}></i>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{c.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <FaqAccordion
            faqs={uniFaqs}
            title="University Admission FAQs"
            subtitle="Understand offer letters, university shortlisting, and admission criteria."
          />

          {/* Bottom Conversion */}
          <div className="mt-16 text-center bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-red-500/30">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Want a Tailored University Shortlist for Your Profile?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
              Our counselors will analyze your marks, gap years, and career goals to identify your best university matches.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                Apply for Free Shortlist
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
              >
                Talk with an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
