import React from 'react';
import ApplyForm from '@/components/Apply/ApplyForm';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Apply for Student Visa Online | Free Study Abroad Counselling - 13 Dreams Bareilly',
  description:
    'Apply online for 100% free study visa application assistance, university shortlisting, and expert career counselling with 13 Dreams Consultants Bareilly. 99% visa success rate for Canada, Australia, UK, USA & Europe.',
  keywords: [
    'apply for student visa online',
    'study abroad counselling bareilly',
    'visa application assistance bareilly',
    'study visa consultants in bareilly',
    'best overseas education consultants in bareilly',
    'study abroad consultants khatima',
    'canada student visa apply online',
    'australia subclass 500 visa application',
    'uk student route visa process',
    'usa f1 student visa filing bareilly',
    'free foreign education profile evaluation',
    '13 dreams consultants apply online',
    'ielts pte coaching bareilly',
    'student visa with education gap',
    'top visa consultants near me',
    'study abroad application form',
  ],
  alternates: {
    canonical: getCanonicalUrl('/apply'),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Apply for Student Visa Online | Free Study Abroad Counselling | 13 Dreams',
    description:
      'Fast-track your global university admission and student visa. 100% free profile evaluation, 150+ partner universities, 99% visa grant rate. Apply today!',
    url: getCanonicalUrl('/apply'),
    siteName: siteConfig.siteName,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Apply Online for Study Visa Assistance - 13 Dreams Consultants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply for Student Visa Online | Free Counselling - 13 Dreams',
    description:
      'Apply online for student visa assistance for Canada, Australia, UK, USA & Europe. 100% Free consultation & profile assessment.',
    images: ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function ApplyPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['Service', 'ContactPage'],
      '@id': `${getCanonicalUrl('/apply')}#service`,
      name: 'Visa Application Assistance & Free Study Abroad Counselling',
      serviceType: 'Overseas Education & Student Visa Consulting',
      description:
        'Comprehensive student visa application guidance, university shortlisting, documentation verification, and interview prep for Australia, Canada, UK, USA, and Europe.',
      provider: {
        '@type': ['EducationalOrganization', 'LocalBusiness'],
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        priceRange: '₹0 - Free Consultation',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '482',
          bestRating: '5',
          worstRating: '1',
        },
        address: siteConfig.offices.map((office) => ({
          '@type': 'PostalAddress',
          streetAddress: office.streetAddress,
          addressLocality: office.addressLocality,
          addressRegion: office.addressRegion,
          postalCode: office.postalCode,
          addressCountry: office.addressCountry,
        })),
        geo: siteConfig.offices.map((office) => ({
          '@type': 'GeoCoordinates',
          latitude: office.latitude,
          longitude: office.longitude,
        })),
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: '100% Free Initial Profile Evaluation & Course Counseling',
      },
      areaServed: [
        'India',
        'Bareilly',
        'Khatima',
        'Pilibhit',
        'Moradabad',
        'Rampur',
        'Haldwani',
        'Uttarakhand',
        'Uttar Pradesh',
      ],
      potentialAction: {
        '@type': 'ApplyAction',
        target: getCanonicalUrl('/apply'),
        name: 'Apply for Free Study Abroad Counselling',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is the study abroad counselling at 13 Dreams Consultants really 100% free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Our initial profile assessment, university shortlisting, and career counselling sessions are 100% free with no hidden charges.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which countries can I apply to for student visas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide specialized student visa guidance for Australia, Canada, United Kingdom (UK), United States (USA), Germany, New Zealand, Ireland, Singapore, Switzerland, and Malta.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the visa approval success rate of 13 Dreams Consultants?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '13 Dreams Consultants maintains an industry-leading 99% student visa grant rate with over 15 years of operational excellence.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you help with IELTS / PTE coaching and test preparation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we provide certified classroom and online IELTS and PTE coaching with mock tests, expert trainers, and band score improvement guarantees.',
          },
        },
        {
          '@type': 'Question',
          name: 'What documents are required to apply for a student visa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Key documents include your academic transcripts, valid passport, English proficiency scores (IELTS/PTE/TOEFL), Statement of Purpose (SOP), Letters of Recommendation (LOR), financial proof/bank statements, and university acceptance letter (Offer Letter / CoE / CAS / I-20).',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I apply for a student visa with an education gap?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Education gaps can be justified with valid work experience letters, skill certificates, salary slips, or business proof. Our visa experts specialize in drafting strong gap justifications for Australia, Canada, UK, and Europe.',
          },
        },
      ],
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
          name: 'Apply Online',
          item: getCanonicalUrl('/apply'),
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ApplyForm />
    </>
  );
}
