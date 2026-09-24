import React from 'react';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Terms of Service & Conditions | 13 Dreams Consultants Bareilly',
  description:
    'Review the Terms of Service of 13 Dreams Consultants Private Limited regarding our overseas education counselling, university admission assistance, and visa advisory services.',
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service | 13 Dreams Consultants',
    description: 'Terms and conditions for study abroad guidance and student visa processing.',
    url: getCanonicalUrl('/terms'),
    siteName: siteConfig.siteName,
  },
};

export default function TermsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    url: getCanonicalUrl('/terms'),
    publisher: {
      '@type': 'EducationalOrganization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="min-h-screen bg-[#f8fafc] py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Terms of Service</span>
          </nav>

          <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-gray-200">
            <header className="border-b border-gray-100 pb-6 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                Transparency &amp; Governance
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Terms and Conditions of Service
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Last updated: January 2025 • Applicable to all student visa and counseling clients
              </p>
            </header>

            <div className="space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing the <strong>13 Dreams Consultants Private Limited</strong> portal ({siteConfig.siteUrl}), submitting an enquiry form, applying online, or engaging our consulting services, you agree to comply with and be bound by the following terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  2. 100% Free Initial Profile Evaluation
                </h2>
                <p>
                  Our initial profile review, course shortlisting, and university matchmaking services are provided free of charge to prospective students. We take pride in transparent guidance with no hidden upfront registration fees.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  3. Advisory Role &amp; Visa Decisions
                </h2>
                <p>
                  13 Dreams Consultants provides professional guidance, SOP proofreading, and application compilation based on official foreign immigration frameworks. 
                  However, please note that <strong>final decisions regarding student visa issuance, work permit validity, and entry approvals rest solely with the respective sovereign government embassies and high commissions</strong> (such as IRCC for Canada, Department of Home Affairs for Australia, UKVI for the UK, and US Department of State for the USA). No consultancy can legitimately guarantee visa issuance.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  4. Accuracy of Submitted Information
                </h2>
                <p>
                  Applicants are solely responsible for providing genuine, truthful, and verifiable academic transcripts, employment documents, financial records, and personal statements. Submitting falsified documents is strictly prohibited and grounds for immediate termination of counseling services.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  5. Intellectual Property
                </h2>
                <p>
                  All content, e-magazines, digital brochures, course curriculum guides, logos, and website layouts are intellectual properties of 13 Dreams Consultants Private Limited. Reproduction without prior written authorization is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  6. Contact &amp; Grievance
                </h2>
                <p>
                  For any clarifications regarding these Terms of Service, please contact our administrative desk:
                </p>
                <div className="mt-3 text-sm space-y-1 text-gray-800 font-medium">
                  <p><strong>13 Dreams Consultants Private Limited</strong></p>
                  <p>Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly, UP 243005</p>
                  <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-red-600 underline">{siteConfig.email}</a></p>
                  <p>Phone: <a href="tel:+919634777761" className="text-red-600 underline">+91 96347 77761</a></p>
                </div>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between text-xs text-gray-500">
              <Link href="/apply" className="font-bold text-red-600 hover:underline">
                ← Return to Apply Online Form
              </Link>
              <Link href="/privacy-policy" className="hover:underline">
                Read Privacy Policy →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
