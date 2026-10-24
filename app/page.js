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
  title: 'Best Visa Filing in Bareilly & Best IELTS Coaching | 13 Dreams Consultants',
  description:
    'Looking for the best visa filing in Bareilly or top IELTS coaching? 13 Dreams Consultants at Luthra Tower, Ekta Nagar offers 99% visa success rate, certified IDP/British Council IELTS & PTE training, and free foreign admissions.',
  keywords: [
    'Best Visa Filing in Bareilly',
    'Visa Filing in Bareilly',
    'Best Study Visa Filing in Bareilly',
    'Best IELTS Coaching in Bareilly',
    'Best ILTS Coaching',
    'Best ILTS Coaching in Bareilly',
    'IELTS Coaching in Bareilly',
    'Top IELTS Institute Bareilly',
    'PTE Coaching in Bareilly',
    'Best Study Visa Consultants in Bareilly',
    'Overseas Education Consultants Bareilly',
    'Study in Canada Consultant Bareilly',
    'Study in UK Consultants Bareilly',
    'Study in Australia Student Visa',
    'Study in USA Student Visa',
    'Study in Germany Free Education',
    'Student Visa Guidance Bareilly',
    '13 Dreams Consultants',
  ],
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: 'Best Visa Filing in Bareilly & Best IELTS Coaching | 13 Dreams Consultants',
    description:
      'Transform your study abroad dreams with 13 Dreams Consultants. 15+ years experience, 150+ partner universities across UK, Canada, Australia, USA, Germany, Malta & Europe with 99% visa grant rate.',
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
