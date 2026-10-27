import React from 'react';
import PageBanner from '@/components/UI/PageBanner';
import CountryComparison from '@/components/Home/CountryComparison';
import EligibilityCalculator from '@/components/Home/EligibilityCalculator';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Compare Study Abroad Countries 2027 | Tuition, Work Visas & PR - 13 Dreams',
  description:
    'Compare top study destinations: UK, Canada, Australia, USA, Germany, Netherlands, Malta, Singapore by tuition fees, post-study work permits (PSWP), living costs, and PR eligibility with 13 Dreams Consultants.',
  keywords: [
    'compare study abroad countries',
    'study in uk vs canada vs australia',
    'cheapest country to study abroad in europe',
    'post study work permit comparison',
    'tuition fees comparison for indian students',
    'pr pathways study abroad',
    'study in germany free tuition comparison',
    'best country for masters 2027',
    '13 dreams consultants bareilly',
  ],
  alternates: {
    canonical: getCanonicalUrl('/compare-countries'),
  },
  openGraph: {
    title: 'Compare Study Abroad Countries 2027 | Tuition, Work Visas & PR - 13 Dreams',
    description:
      'Compare top study destinations: UK, Canada, Australia, USA, Germany, Netherlands, Malta, Singapore by tuition costs, post-study work permits, and PR pathways.',
    url: getCanonicalUrl('/compare-countries'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Study Abroad Countries | 13 Dreams Consultants',
    description:
      'Compare top study destinations by tuition, post-study work rights, and PR pathways.',
  },
};

export default function CompareCountriesPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Compare Global Study Destinations 2027',
      url: getCanonicalUrl('/compare-countries'),
      description:
        'Comprehensive overseas education destination comparison tool comparing tuition fees, living costs, work visas, and PR pathways.',
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteConfig.siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Countries',
          item: getCanonicalUrl('/countries'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Compare Countries',
          item: getCanonicalUrl('/compare-countries'),
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <PageBanner
        title="Compare Study Destinations"
        breadcrumbs={[
          { label: 'Countries', href: '/countries' },
          { label: 'Compare', href: null },
        ]}
      />
      <CountryComparison />
      <EligibilityCalculator />
    </>
  );
}
