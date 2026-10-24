import React from 'react';
import ApplyForm from '@/components/Apply/ApplyForm';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Apply Online | Best Visa Filing in Bareilly & Best IELTS Coaching | 13 Dreams',
  description:
    'Apply online for the best visa filing in Bareilly and top-rated IELTS coaching. 100% free profile evaluation, 150+ partner universities, 99% visa grant rate for Canada, Australia, UK, USA & Europe at 13 Dreams Bareilly.',
  keywords: [
    'best visa filing in bareilly',
    'visa filing in bareilly',
    'best study visa filing in bareilly',
    'best ielts coaching in bareilly',
    'best ilts coaching',
    'best ilts coaching in bareilly',
    'ielts coaching in bareilly',
    'apply for student visa online',
    'apply online visa filing',
    'study abroad counselling bareilly',
    'visa application assistance bareilly',
    'study visa consultants in bareilly',
    'canada student visa apply online',
    'australia subclass 500 visa application',
    'uk student route visa process',
    'usa f1 student visa filing bareilly',
    'top visa consultants near me',
    '13 dreams consultants apply online',
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
    title: 'Apply Online | Best Visa Filing in Bareilly & IELTS Coaching | 13 Dreams',
    description:
      'Fast-track your global university admission and student visa filing. 100% free profile evaluation, certified IELTS coaching, and 99% visa grant rate.',
    url: getCanonicalUrl('/apply'),
    siteName: siteConfig.siteName,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://res.cloudinary.com/eikgki2a/image/upload/v1790672807/13dreams/general/apply_student_application.jpg',
        width: 1200,
        height: 630,
        alt: 'Apply Online for Best Visa Filing in Bareilly & IELTS Coaching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply Online | Best Visa Filing in Bareilly & IELTS Coaching',
    description:
      'Apply online for best visa filing in Bareilly and certified IELTS coaching. 100% Free consultation & profile assessment.',
    images: ['https://res.cloudinary.com/eikgki2a/image/upload/v1790672807/13dreams/general/apply_student_application.jpg'],
  },
};

export default function ApplyPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['Service', 'ContactPage'],
      '@id': `${getCanonicalUrl('/apply')}#service`,
      name: 'Best Visa Filing in Bareilly & Free Study Abroad Counselling',
      serviceType: 'Student Visa Filing & Overseas Education Consulting',
      description:
        'Ranked #1 for best visa filing in Bareilly. Comprehensive student visa documentation scrutiny, university shortlisting, GTE/SOP preparation, and interview prep for Australia, Canada, UK, USA, and Europe.',
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
        'Bareilly',
        'Model Town, Bareilly',
        'Ekta Nagar, Bareilly',
        'Civil Lines, Bareilly',
        'Khatima',
        'Pilibhit',
        'Moradabad',
        'Rampur',
        'Haldwani',
        'Uttarakhand',
        'Uttar Pradesh',
        'India',
      ],
      potentialAction: {
        '@type': 'ApplyAction',
        target: getCanonicalUrl('/apply'),
        name: 'Apply for Best Visa Filing in Bareilly',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Best IELTS Coaching in Bareilly',
      description: 'Comprehensive IELTS Academic & General test preparation by British Council & IDP certified trainers with daily speaking interviews and mock exams.',
      provider: {
        '@type': 'EducationalOrganization',
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: ['Blended', 'Onsite', 'Online'],
        location: 'Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which is the best visa filing consultancy in Bareilly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '13 Dreams Consultants Private Limited, located at Luthra Tower, 2nd Floor, C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly, is widely recognized as the best visa filing consultancy in Bareilly. With 15+ years of operational experience and a 99% visa approval rate, they provide unmatched visa filing expertise for Canada, UK, Australia, USA, Germany, and Europe.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I find the best IELTS coaching in Bareilly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '13 Dreams Consultants provides the best IELTS coaching in Bareilly with IDP and British Council certified trainers, dedicated computer labs, 1-on-1 daily speaking practice, authentic test materials, and guaranteed 7.5+ band preparation.',
          },
        },
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
            text: 'We provide specialized student visa guidance for Australia, Canada, United Kingdom (UK), United States (USA), Germany, New Zealand, Ireland, Netherlands, Singapore, Switzerland, and Malta.',
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
