import React from 'react';
import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Privacy Policy | 13 Dreams Consultants Bareilly',
  description:
    'Read the official Privacy Policy of 13 Dreams Consultants Private Limited. Understand how we collect, safeguard, and process your student visa enquiry data.',
  alternates: {
    canonical: getCanonicalUrl('/privacy-policy'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | 13 Dreams Consultants',
    description: 'Data protection and privacy guidelines for students and clients.',
    url: getCanonicalUrl('/privacy-policy'),
    siteName: siteConfig.siteName,
  },
};

export default function PrivacyPolicyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: getCanonicalUrl('/privacy-policy'),
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
            <span className="text-gray-900 font-semibold">Privacy Policy</span>
          </nav>

          <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-gray-200">
            <header className="border-b border-gray-100 pb-6 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                Legal &amp; Compliance
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Last updated: January 2025 • Effective immediately for all visitors and applicants
              </p>
            </header>

            <div className="space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  1. Introduction &amp; Scope
                </h2>
                <p>
                  At <strong>13 Dreams Consultants Private Limited</strong> (&quot;13 Dreams&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, store, and utilize information when you browse our website ({siteConfig.siteUrl}), use our AI counselor widget, apply online, or visit our head office in Bareilly or branch office in Khatima.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  2. Information We Collect
                </h2>
                <p className="mb-2">We collect only necessary information required to evaluate your study abroad profile and provide visa counseling:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li><strong>Contact Details:</strong> Full name, phone/WhatsApp number, and email address.</li>
                  <li><strong>Academic Background:</strong> Current education level, percentage/CGPA, year of passing, and education gaps (if any).</li>
                  <li><strong>Language &amp; Test Scores:</strong> IELTS, PTE, TOEFL, DUOLINGO, or GRE/GMAT scores.</li>
                  <li><strong>Study Preferences:</strong> Preferred countries (e.g. Canada, Australia, UK, USA, Germany), course levels (Undergraduate, Postgraduate, Diploma), and target intake.</li>
                  <li><strong>Technical Data:</strong> IP address, device type, browser information, and anonymized analytics to maintain web speed and security.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  3. How We Use Your Information
                </h2>
                <p className="mb-2">Your information is strictly used for legitimate counseling operations:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>Connecting you with a senior overseas education advisor for your 100% free profile evaluation.</li>
                  <li>Shortlisting accredited universities, government scholarships, and study permit categories.</li>
                  <li>Submitting university admission applications and embassy visa documentation on your behalf with your explicit written consent.</li>
                  <li>Sending critical visa appointment alerts, policy updates, and application status notifications.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  4. Confidentiality &amp; Zero Spam Guarantee
                </h2>
                <p>
                  <strong>We do NOT sell, rent, or trade your personal information</strong> to third-party telemarketers or external advertisers. Your documents are shared solely with authorized institutions, university admission portals, and official immigration bodies (such as IRCC, Australian Home Affairs, UK Visas &amp; Immigration) strictly as required for your admission and visa issuance.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  5. Data Security &amp; Retention
                </h2>
                <p>
                  We implement robust industry-standard encryption, SSL (HTTPS), and secure cloud storage protocols to protect your submitted documents and personal details from unauthorized access, disclosure, or misuse. Data is retained only as long as necessary to facilitate your active university enrollment or legal compliance.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  6. Your Rights
                </h2>
                <p>
                  You have the right to request access to the data we hold about you, request corrections, or ask for the deletion of your enquiry record at any time by contacting our data compliance officer.
                </p>
              </section>

              <section className="bg-red-50/60 rounded-2xl p-6 border border-red-100">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  7. Contact Our Grievance &amp; Privacy Officer
                </h2>
                <p className="text-sm text-gray-700">
                  If you have questions about this Privacy Policy or wish to revoke your consent, reach us at:
                </p>
                <div className="mt-3 text-sm space-y-1 text-gray-800 font-medium">
                  <p><strong>13 Dreams Consultants Private Limited</strong></p>
                  <p>Head Office: Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly, UP 243005</p>
                  <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-red-600 underline">{siteConfig.email}</a></p>
                  <p>Phone: <a href="tel:+919759053463" className="text-red-600 underline">+91 97590 53463</a></p>
                </div>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between text-xs text-gray-500">
              <Link href="/apply" className="font-bold text-red-600 hover:underline">
                ← Return to Apply Online Form
              </Link>
              <Link href="/terms" className="hover:underline">
                Read Terms of Service →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
