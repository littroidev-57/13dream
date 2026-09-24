import React from 'react';
import JsonLd from '@/components/SEO/JsonLd';
import EMagazineClient from '@/components/EBook/EMagazineClient';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';
import { BROCHURES } from '@/lib/brochuresData';

export const metadata = {
  title: 'Official Study Abroad E-Magazines & Visa Brochures 2025–2026 | 13 Dreams',
  description:
    'Explore official Study Visa E-Magazines for Canada, Australia, UK, Germany, USA, and New Zealand. Interactive 3D flipbook reader, PR pathways, IELTS cutoffs, and free PDF downloads.',
  keywords: [
    'Study Visa E-Magazine',
    'Study Abroad Brochure PDF',
    'Canada Student Visa Guide PDF',
    'Australia Study Visa Handbook',
    'Germany Free Education Brochure',
    'UK Student Route Guide',
    'USA F-1 Visa Brochure',
    'New Zealand Student Visa Guide',
    '13 Dreams Consultants Magazines',
  ],
  alternates: {
    canonical: getCanonicalUrl('/e-magazine'),
  },
  openGraph: {
    title: 'Study Abroad E-Magazines & Visa Brochures | 13 Dreams Consultants',
    description:
      'Official country blueprints with interactive 3D page flipbook reader and instant free PDF downloads.',
    url: getCanonicalUrl('/e-magazine'),
    siteName: siteConfig.siteName,
    images: [
      {
        url: 'https://res.cloudinary.com/eikgki2a/image/upload/v1790160801/13dreams/brochures/covers/australia-cover.jpg',
        width: 1200,
        height: 630,
        alt: '13 Dreams Study Abroad E-Magazines & Brochures',
      },
    ],
    type: 'website',
  },
};

export default function EMagazinePage() {
  // Structured Schema for Digital Documents / Books
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '13 Dreams Consultants Official Study Visa E-Magazines & Handbooks',
    description:
      'Collection of official overseas education and visa brochures for Canada, Australia, UK, Germany, USA, and New Zealand.',
    itemListElement: BROCHURES.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'DigitalDocument',
        name: b.title,
        description: b.description,
        url: `${siteConfig.siteUrl}${b.pdfUrl}`,
        image: `${siteConfig.siteUrl}${b.coverImage}`,
        inLanguage: 'en',
        numberOfPages: b.totalPages,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.siteName,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <main>
        <EMagazineClient />
      </main>
    </>
  );
}
