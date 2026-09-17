'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const TEAM_MEMBERS = [
  {
    name: 'HARPREET SINGH',
    role: '( CEO )',
    image: '/img/team/harpreet-singh.webp',
    alt: 'Harpreet Singh, CEO of 13 Dreams Consultant, seated confidently in a professional office',
    title: 'Harpreet Singh – CEO',
  },
  {
    name: 'BALVINDER SINGH',
    role: '( DIRECTOR )',
    image: '/img/team/balvinder-singh.webp',
    alt: 'Balvinder Singh, Director of 13 Dreams Consultant',
    title: 'Balvinder Singh – Director',
  },
  {
    name: 'ANSHIKA BATRA',
    role: '( MANAGER )',
    image: '/img/team/anshika-batra.webp',
    alt: 'Anshika Batra, Manager at 13 Dreams Consultant',
    title: 'Anshika Batra – Manager',
  },
  {
    name: 'TWINKLE ARORA',
    role: '( OPERATIONAL EXECUTIVE )',
    image: '/img/team/twinkle-arora.webp',
    alt: 'Twinkle Arora – Operational Executive professional portrait.',
    title: 'Operational Executive',
  },
  {
    name: 'PREETI DIWAKAR',
    role: '( OPERATIONAL MANAGER )',
    image: '/img/team/preeti-diwakar.webp',
    alt: 'Preeti Diwakar, part of the operational management team at 13 Dreams Consultant',
    title: 'Preeti Diwakar – Operational Management',
  },
  {
    name: 'JOVAN SINGH DHILLON',
    role: '( OPERATIONAL EXECUTIVE )',
    image: '/img/team/jovan-singh-dhillon.webp',
    alt: 'Jovan Singh Dhillon, Operational Executive at 13 Dreams Consultant',
    title: 'Jovan Singh Dhillon – Operational Executive',
  },
  {
    name: 'ANITA POKHARIA',
    role: '( RECEPTIONIST )',
    image: '/img/team/anita-pokharia.webp',
    alt: 'Anita Pokharia, receptionist at 13 Dreams Consultant, smiling in professional office portrait.',
    title: 'Anita Pokharia – Receptionist',
  },
];

export default function AboutUsContent() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {/* ── Breadcrumb Banner with Authentic Background ── */}
      <div
        className="breadcrumbs-banner overlay"
        style={{ backgroundImage: "url('/img/13dreamsconsultants-main.webp')" }}
      >
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="bread-inner">
            {/* Breadcrumb Navigation Menu with Authentic Red Indicator */}
            <div className="bread-menu">
              <ul className="flex items-center gap-2 text-white text-base md:text-lg font-medium">
                <li>
                  <Link href="/" className="hover:text-red-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-white">About Us</li>
              </ul>
            </div>

            {/* Breadcrumb Title */}
            <div className="bread-title mt-2">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                About Company
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ── Home Three About Section ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Heading (Centered) */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              13 Dreams{' '}
              <span className="text-red-600 font-extrabold">
                Consultants Private Limited
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Office Building Image with In-Place Video Playback (No Popup!) */}
            <div className="lg:col-span-6">
              {isPlaying ? (
                <div className="relative w-full max-w-[550px] mx-auto h-[380px] sm:h-[450px] rounded-xl overflow-hidden bg-black shadow-2xl border-2 border-gray-200">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/w-McW9p4XE0?autoplay=1&rel=0"
                    title="13 Dreams Consultants Overview Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {/* Return to image button */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center text-xs transition-colors shadow-md border border-white/20"
                    title="Back to photo"
                    aria-label="Close video"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <div className="img-feature-container relative max-w-[550px] mx-auto group">
                  <img
                    src="/img/BHH.jpg"
                    alt="13 Dreams Consultants office building – Trusted experts for study abroad visa services, IELTS & PTE coaching, and international education guidance."
                    title="13 Dreams Consultants for IELTS, PTE & Expert Guidance"
                    className="w-full h-[380px] sm:h-[450px] object-cover object-center rounded-xl"
                  />

                  {/* Pulsing Ripple Waves */}
                  <div className="waves-pulse wave-1"></div>
                  <div className="waves-pulse wave-2"></div>
                  <div className="waves-pulse wave-3"></div>

                  {/* Circular Play Button: Plays inline in same place */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="video-play-btn"
                    aria-label="Play 13 Dreams Video in place"
                  >
                    <i className="fa fa-play text-xl"></i>
                  </button>
                </div>
              )}
            </div>

            {/* Right: Narrative Content */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-5">
                A complete place for immigration and visa services in Bareilly or North India
              </h4>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
                A comprehensive hub for immigration and visa services, 13 Dreams Consultants Private Limited stands out as one of the best visa consultants in the industry. Our journey commenced with a distinct vision of delivering top-notch Education and Visa assistance services to students. With a commitment to excellence and transparency, we prioritize the needs of our clients, ensuring unparalleled support every step of the way.
              </p>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
                Led by a visionary entrepreneur <strong>Mr. Harpreet Singh</strong> with more than 15 years of industry expertise, our agency addresses the growing demand for reliable consultancy services in the field.
              </p>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify">
                At 13 Dream Consultants, we understand the importance of personalized attention, tailoring our services to meet the unique aspirations of each student. Whether it&apos;s securing a work visa or pursuing higher education abroad, our team of dedicated visa consultants is here to guide you through the process.
              </p>
            </div>

            {/* Bottom: Full-Width Authentic Callout Strip (shu-line-about) */}
            <div className="lg:col-span-12">
              <div className="shu-line-about">
                <p>
                  As one of the best Study Abroad Consultants available, we take pride in our ability to navigate the complexities of immigration and visa procedures with ease. Your career advancement is our priority, and we are committed to ensuring your success while upholding the highest standards of quality and integrity. Experience the difference with 13 Dreams Consultants Private Limited – your trusted partner for all your immigration and visa needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet Our Team Section ── */}
      <section className="py-16 md:py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Team Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14">

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Meet Our Team
            </h2>
            <h4 className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
              Our experts leaders are waiting for you. <br className="hidden sm:inline" />
              Our commitment to helping you achieve your study abroad dream is not restricted to a place of work and four walls, it’s much stronger than that.
            </h4>
          </div>

          {/* Team Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={index}
                className={`single-team-card ${index >= 4 ? 'lg:col-span-1' : ''
                  }`}
              >
                <div className="team-img-wrap">
                  <img
                    src={member.image}
                    alt={member.alt}
                    title={member.title}
                    loading="lazy"
                  />
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
