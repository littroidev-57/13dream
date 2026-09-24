import React from 'react';
import HeroBanner from '@/components/Home/HeroBanner';
import GloriousSection from '@/components/Home/GloriousSection';
import EligibilityCalculator from '@/components/Home/EligibilityCalculator';
import CoachingSection from '@/components/Home/CoachingSection';
import HomeEnquiryForm from '@/components/Home/HomeEnquiryForm';
import TopDestinations from '@/components/Home/TopDestinations';
import StepProcessSection from '@/components/Home/StepProcessSection';
import VideoSuccessStories from '@/components/Home/VideoSuccessStories';
import VideoFeatureAbout from '@/components/Home/VideoFeatureAbout';
import ServicesSection from '@/components/Home/ServicesSection';
import FaqAccordion from '@/components/Home/FaqAccordion';
import StatisticsCounter from '@/components/Home/StatisticsCounter';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Best Study Abroad & Overseas Education Consultants | 13 Dreams',
  description:
    'Looking for trusted study abroad consultants? 13 Dreams Consultants provides expert university admissions, student visa filing, and IELTS/PTE coaching across Canada, UK, Australia, USA & Germany.',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: 'Best Study Abroad & Overseas Education Consultants | 13 Dreams',
    description:
      'Transform your study abroad dreams into reality with 13 Dreams Consultants. 15+ years experience, 150+ partner universities, 99% visa grant rate.',
    url: getCanonicalUrl('/'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Main Hero Banner with Corporate Counselor & Google 4.9★ Badge */}
      <HeroBanner />

      {/* 2. Glorious Experience Highlights (15 Years / Best Agency / Partners) */}
      <GloriousSection />

      {/* 3. Interactive Visa & IELTS Eligibility Calculator (Interactive Engagement) */}
      <EligibilityCalculator />

      {/* 4. Dedicated IELTS & PTE Coaching Showcase (Score 7.5+ & 65+) */}
      <CoachingSection />

      {/* 5. Enquiry Form Section */}
      <HomeEnquiryForm />

      {/* 6. Top Education Destinations */}
      <TopDestinations />

      {/* 7. Success Stories (Student Video Reviews) */}
      <VideoSuccessStories />

      {/* 8. 4-Step Overseas Education Process */}
      <StepProcessSection />

      {/* 9. Video Feature About 13 Dreams Consultants */}
      <VideoFeatureAbout />

      {/* 10. Our Services Section */}
      <ServicesSection />

      {/* 11. Google FAQ Rich Snippet Accordion with Schema.org */}
      <FaqAccordion />

      {/* 12. Statistics Counterup (50+ Countries / 150+ Univs / 99% Satisfaction) */}
      <StatisticsCounter />
    </>
  );
}
