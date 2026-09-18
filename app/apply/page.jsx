import React from 'react';
import ApplyForm from '@/components/Apply/ApplyForm';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Apply Online | Student Visa & Admission Assistance | 13 Dreams Consultants',
  description:
    'Apply for overseas university admissions and student visas with 13 Dreams Consultants. Free counseling, quick offer letters, and high visa approval rates for Canada, UK, Australia, USA & Europe.',
  alternates: {
    canonical: getCanonicalUrl('/apply'),
  },
  openGraph: {
    title: 'Apply to Study Abroad | 13 Dreams Consultants',
    description:
      'Fast-track your global university admission and student visa. 100% free profile evaluation, 150+ partner universities, 99% visa grant rate.',
    url: getCanonicalUrl('/apply'),
    siteName: siteConfig.siteName,
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Apply to Study Abroad with 13 Dreams Consultants',
      },
    ],
  },
};

export default function ApplyPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Apply to Study Abroad | 13 Dreams Consultants',
    description:
      'Online application portal for study abroad university admissions and student visa processing.',
    url: getCanonicalUrl('/apply'),
    publisher: {
      '@type': 'EducationalOrganization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      logo: 'https://13dreamsconsultants.com/img/13d-logo.webp',
      telephone: siteConfig.phone,
    },
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <ApplyForm />
    </>
  );
}
