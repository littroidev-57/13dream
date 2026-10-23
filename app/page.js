import React from 'react';
import HeroBanner from '@/components/Home/HeroBanner';
import GloriousSection from '@/components/Home/GloriousSection';
import TopDestinations from '@/components/Home/TopDestinations';
import EligibilityCalculator from '@/components/Home/EligibilityCalculator';
import CompareTeaserBanner from '@/components/Home/CompareTeaserBanner';
import CoachingSection from '@/components/Home/CoachingSection';
import GoogleReviewsSection from '@/components/Home/GoogleReviewsSection';
import VideoSuccessStories from '@/components/Home/VideoSuccessStories';
import StepProcessSection from '@/components/Home/StepProcessSection';
import VideoFeatureAbout from '@/components/Home/VideoFeatureAbout';
import ServicesSection from '@/components/Home/ServicesSection';
import HomeEnquiryForm from '@/components/Home/HomeEnquiryForm';
import FaqAccordion from '@/components/Home/FaqAccordion';
import StatisticsCounter from '@/components/Home/StatisticsCounter';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Best Study Abroad & Overseas Education Consultants | 13 Dreams',
  description:
    'Looking for trusted study abroad consultants? 13 Dreams Consultants provides expert university admissions, student visa filing, and IELTS/PTE coaching across Canada, UK, Australia, USA, Germany, Malta, Singapore & Netherlands.',
  keywords: [
    'Best Study Abroad Consultants in India',
    'Study Abroad Consultants Bareilly',
    'Overseas Education Khatima',
    'Study in Malta',
    'Study in Singapore',
    'Study in Netherlands',
    'Study in Canada',
    'Study in UK',
    'Study in Australia',
    'Study in Germany',
    'Study in USA',
    'Student Visa Guidance',
    'IELTS Coaching Bareilly',
  ],
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: 'Best Study Abroad & Overseas Education Consultants | 13 Dreams',
    description:
      'Transform your study abroad dreams into reality with 13 Dreams Consultants. 15+ years experience, 150+ partner universities across UK, Canada, Australia, USA, Germany, Malta, Singapore & Netherlands. 99% visa grant rate.',
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

      {/* 3. Top Education Destinations (Parallax 11 Countries Carousel) */}
      <TopDestinations />

      {/* 4. Interactive Visa & IELTS Eligibility Calculator */}
      <EligibilityCalculator />

      {/* 5. Country Quick Comparison Snapshot Teaser (links to /compare-countries) */}
      <CompareTeaserBanner />

      {/* 6. Dedicated IELTS & PTE Coaching Showcase (Score 7.5+ & 65+) */}
      <CoachingSection />

      {/* 7. Google 4.9★ Verified Reviews & Real Student Experiences */}
      <GoogleReviewsSection />

      {/* 8. Success Stories (Student Video Reviews & Instagram Reels) */}
      <VideoSuccessStories />

      {/* 9. 4-Step Overseas Education Process Roadmap */}
      <StepProcessSection />

      {/* 10. Video Feature About 13 Dreams Consultants */}
      <VideoFeatureAbout />

      {/* 11. Our Comprehensive Services Section */}
      <ServicesSection />

      {/* 12. Free Consultation Enquiry Form */}
      <HomeEnquiryForm />

      {/* 13. Google FAQ Rich Snippet Accordion with Schema.org */}
      <FaqAccordion />

      {/* 14. Statistics Counterup (50+ Countries / 150+ Univs / 99% Satisfaction) */}
      <StatisticsCounter />
    </>
  );
}
