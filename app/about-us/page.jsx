import React from 'react';
import AboutUsContent from '@/components/About/AboutUsContent';

import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'About 13 Dreams Consultants | 15+ Years Overseas Education Legacy',
  description:
    'Learn about 13 Dreams Consultants, led by Mr. Harpreet Singh. 15+ years of excellence, 150+ partner universities, and a 99% visa success rate for Indian students.',
  alternates: {
    canonical: getCanonicalUrl('/about-us'),
  },
  openGraph: {
    title: 'About 13 Dreams Consultants | Study Abroad Leadership',
    description:
      'Discover our 15-year history of transforming overseas education aspirations into reality with ethical, transparent guidance.',
    url: getCanonicalUrl('/about-us'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}
