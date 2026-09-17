import React from 'react';
import AboutUsContent from '@/components/About/AboutUsContent';

export const metadata = {
  title: 'Best Abroad Education Consultants in India | Expert Guidance | 13 Dreams',
  description:
    'Looking for the best study abroad consultants in India? Get expert guidance on overseas education, visa assistance, and scholarships from top consultants.',
  keywords:
    'Study Abroad Consultants in Bareilly, Study Abroad, Overseas Education Consultants, Higher Education, Foreign Education, Study Consultants, Abroad Education Consultants, Top Abroad Education Consultants, Foreign Education Consultants, Study Abroad Counseling',
  openGraph: {
    title: 'About us | 13 Dreams Consultants Private Limited',
    description:
      '13 Dream Consultants is a leading overseas education consultancy in Bareilly that has established its name across India through its professionalism.',
    url: 'https://13dreamsconsultants.com/about-us',
    siteName: '13 Dreams Consultants Private Limited',
    images: [
      {
        url: 'https://13dreamsconsultants.com/img/BHH.jpg',
        width: 1200,
        height: 630,
        alt: '13 Dreams Consultants Building & Leadership',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}
