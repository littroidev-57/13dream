import React from 'react';
import ApplyForm from '@/components/Apply/ApplyForm';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Visa Application Assistance & Free Study Abroad Counselling | 13 Dreams',
  description:
    'Get 100% free study visa application assistance, course selection, and admission support for Canada, Australia, UK, USA & Europe with 13 Dreams Consultants. 99% visa grant rate. Apply today!',
  keywords: [
    'visa application assistance',
    'study abroad counselling',
    'student visa assistance',
    'study in australia visa',
    'study in canada student visa',
    'study in uk visa process',
    'study in usa student visa',
    'overseas education consultants bareilly',
    'study visa consultants khatima',
    'free foreign education counselling',
    '13 dreams consultants apply online',
    'ielts pte coaching and visa assistance',
    'university admission assistance',
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
    title: 'Visa Application Assistance & Free Study Abroad Counselling | 13 Dreams',
    description:
      'Fast-track your global university admission and student visa. 100% free profile evaluation, 150+ partner universities, 99% visa grant rate.',
    url: getCanonicalUrl('/apply'),
    siteName: siteConfig.siteName,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Visa Application Assistance - 13 Dreams Consultants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Application Assistance & Free Counselling | 13 Dreams',
    description:
      'Apply online for student visa assistance for Canada, Australia, UK, USA & Europe. 100% Free consultation & profile assessment.',
    images: ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function ApplyPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Visa Application Assistance & Free Study Abroad Counselling',
      serviceType: 'Overseas Education & Student Visa Consulting',
      description:
        'Comprehensive student visa application guidance, university shortlisting, documentation verification, and interview prep for Australia, Canada, UK, USA, and Europe.',
      provider: {
        '@type': 'EducationalOrganization',
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town',
          addressLocality: 'Bareilly',
          addressRegion: 'Uttar Pradesh',
          postalCode: '243005',
          addressCountry: 'IN',
        },
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: '100% Free Initial Profile Evaluation & Course Counseling',
      },
      areaServed: ['India', 'Bareilly', 'Khatima', 'Uttarakhand', 'Uttar Pradesh'],
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
