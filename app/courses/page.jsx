import React from 'react';
import Link from 'next/link';
import PageBanner from '@/components/UI/PageBanner';
import FaqAccordion from '@/components/SEO/FaqAccordion';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Top Courses & Degrees to Study Abroad | 13 Dreams Consultants',
  description:
    'Discover high-paying, in-demand courses to study abroad in Canada, UK, Australia, USA, and Germany. Expert course shortlisting in Computer Science, Business, Engineering, Healthcare, and Hospitality.',
  alternates: {
    canonical: getCanonicalUrl('/courses'),
  },
  openGraph: {
    title: 'Top Overseas Courses & High-Demand Degrees | 13 Dreams',
    description:
      'Explore in-demand international degrees with excellent global job opportunities and post-study work visa rights.',
    url: getCanonicalUrl('/courses'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

const courseFaqs = [
  {
    question: 'Which courses have the highest job demand overseas?',
    answer:
      'Computer Science, Cloud Computing, Data Analytics, Cybersecurity, Artificial Intelligence, Nursing, Healthcare Management, Mechanical Engineering, Renewable Energy, Construction Project Management, and Luxury Hospitality currently have the strongest global employment demand and fastest pathways to skilled work visas.',
  },
  {
    question: 'Should I choose a 1-year Master\'s or a 2-year Master\'s degree?',
    answer:
      'A 1-year Master\'s (standard in the UK) saves an entire year of tuition fees and living expenses while still granting a 2-year post-study Graduate Route work visa. A 2-year Master\'s (common in Australia, Canada, and the USA) provides maximum post-study work rights (up to 3-4 years) and allows for a structured summer internship.',
  },
  {
    question: 'Can I change my academic stream when applying for a Master\'s abroad?',
    answer:
      'Yes! Many international universities offer conversion programs or management degrees (such as Master in Management, MBA, Data Analytics for Business, or International Hospitality) that welcome graduates from non-related undergraduate backgrounds.',
  },
];

const courseCategories = [
  {
    title: 'Computer Science, AI & Data Science',
    subTitle: 'Highest Global Salaries & Technology Hub Demand',
    desc: 'Specializations in Machine Learning, Cloud Architecture, Full-Stack Engineering, and Cybersecurity.',
    topDestinations: 'USA, Canada, Germany, Ireland, UK',
    icon: 'fa-laptop-code',
  },
  {
    title: 'Business Administration & Management (MBA)',
    subTitle: 'Leadership, Finance & Global Corporate Strategy',
    desc: 'Programs in Business Analytics, Supply Chain Management, International Marketing, and FinTech.',
    topDestinations: 'UK, Australia, USA, Canada, Singapore',
    icon: 'fa-chart-line',
  },
  {
    title: 'Engineering & Advanced Technology',
    subTitle: 'Industrial Innovation & Renewable Systems',
    desc: 'Courses in Robotics, Automotive Engineering, Renewable Energy, Civil & Structural Engineering.',
    topDestinations: 'Germany, USA, Australia, Canada',
    icon: 'fa-gears',
  },
  {
    title: 'Healthcare, Nursing & Biomedical Sciences',
    subTitle: 'Critical Global Shortages & Rapid PR Opportunities',
    desc: 'Accredited degrees in Registered Nursing, Public Health, Biotechnology, and Healthcare Administration.',
    topDestinations: 'Australia, UK, Canada, New Zealand',
    icon: 'fa-heart-pulse',
  },
  {
    title: 'Hospitality & Luxury Brand Management',
    subTitle: 'World-Leading Experiential & Hotelier Careers',
    desc: 'Elite management programs with paid Swiss internships, luxury hotel chains, and event management.',
    topDestinations: 'Switzerland, Malta, Australia, UK',
    icon: 'fa-hotel',
  },
  {
    title: 'Finance, Accounting & FinTech',
    subTitle: 'Global Banking & Corporate Audit Excellence',
    desc: 'ACCA-accredited Master\'s in Accounting, Investment Banking, Financial Risk Management, and Blockchain.',
    topDestinations: 'UK, Singapore, Ireland, USA, Canada',
    icon: 'fa-coins',
  },
];

export default function CoursesPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Top Courses & Degrees to Study Abroad | 13 Dreams Consultants',
    description:
      'Comprehensive directory of high-demand international degree programs and post-study career trajectories.',
    url: getCanonicalUrl('/courses'),
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
        title="In-Demand Courses"
        breadcrumbs={[{ label: 'Courses', href: null }]}
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full">
              Future-Proof Qualifications
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
              Top <span className="text-red-600">Courses &amp; Degrees</span> to Study Abroad
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Choosing the right course determines your post-graduation career opportunities, starting salary, and eligibility for post-study work visas. Discover in-demand global programs aligned with your background.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/25 transition-all"
              >
                Apply for Course Counseling
              </Link>
              <Link
                href="/universities"
                className="px-8 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm transition-all"
              >
                View Universities
              </Link>
            </div>
          </div>

          {/* Course Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {courseCategories.map((c, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl mb-5">
                    <i className={`fa-solid ${c.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{c.title}</h3>
                  <p className="text-xs font-bold text-red-600 mb-3">{c.subTitle}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{c.desc}</p>
                  <p className="text-xs text-gray-500 mb-6">
                    <strong className="text-gray-800">Top Hubs:</strong> {c.topDestinations}
                  </p>
                </div>

                <Link
                  href={`/apply?interest=${encodeURIComponent(c.title)}`}
                  className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-red-600 text-gray-800 hover:text-white font-bold text-xs text-center transition-colors border border-gray-200 hover:border-red-600"
                >
                  Apply for {c.title.split(' ')[0]} Programs
                </Link>
              </div>
            ))}
          </div>

          {/* Degree Levels Section */}
          <div className="bg-gray-50/80 rounded-3xl p-8 sm:p-12 mb-20 border border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Degrees Catered for Every Education Stage
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Whether completing 12th standard, finishing graduation, or seeking executive diplomas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600">3 - 4 Years</span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Bachelor's Degrees</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ideal for students completing Grade 12 (CBSE / ICSE / State Boards). Comprehensive foundational training with co-op work terms.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-600">1 - 2 Years</span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Master's / Postgraduate</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Specialized advanced qualifications offering maximum post-study work authorization, research fellowships, and high corporate leadership roles.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-sm">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">1 - 2 Years</span>
                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">Postgraduate Diplomas</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Highly affordable, skill-intensive Canadian &amp; New Zealand college programs designed for fast entry into the local employment market.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <FaqAccordion
            faqs={courseFaqs}
            title="Course Selection FAQs"
            subtitle="Get insights on program durations, conversion degrees, and career opportunities."
          />

          {/* Bottom Conversion */}
          <div className="mt-16 text-center bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-red-500/30">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Unsure Which Course Best Fits Your Background?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
              Our counselors will evaluate your marks, gap years, and interests to recommend optimal programs.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                Get Course Recommendation
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
