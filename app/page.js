import React from 'react';
import HeroBanner from '@/components/Home/HeroBanner';
import GloriousSection from '@/components/Home/GloriousSection';
import HomeEnquiryForm from '@/components/Home/HomeEnquiryForm';
import TopDestinations from '@/components/Home/TopDestinations';
import StepProcessSection from '@/components/Home/StepProcessSection';
import VideoSuccessStories from '@/components/Home/VideoSuccessStories';
import VideoFeatureAbout from '@/components/Home/VideoFeatureAbout';
import ServicesSection from '@/components/Home/ServicesSection';
import StatisticsCounter from '@/components/Home/StatisticsCounter';

export default function HomePage() {
  return (
    <>
      {/* 1. Main Hero Banner */}
      <HeroBanner />

      {/* 2. Glorious Experience Highlights (15 Years / Best Agency / Partners) */}
      <GloriousSection />

      {/* 3. Enquiry Form Section */}
      <HomeEnquiryForm />

      {/* 4. Top Education Destinations */}
      <TopDestinations />

      {/* 6. Success Stories (Student Video Reviews) */}
      <VideoSuccessStories />

      {/* 5. 4-Step Overseas Education Process (Stacking Cards & Student Travel) */}
      <StepProcessSection />

      {/* 6. Video Feature About 13 Dreams Consultants */}
      <VideoFeatureAbout />

      {/* 7. Our Services Section */}
      <ServicesSection />

      {/* 8. Statistics Counterup (50+ Countries / 150+ Univs / 99% Satisfaction) */}
      <StatisticsCounter />
    </>
  );
}
