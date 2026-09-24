'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const leftDestinations = [
  {
    name: 'UK',
    slug: 'uk',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in UK for Indian students',
  },
  {
    name: 'USA',
    slug: 'usa',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in USA for Indian students',
  },
  {
    name: 'Canada',
    slug: 'canada',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in Canada for Indian students',
  },
  {
    name: 'Australia',
    slug: 'australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in Australia for Indian students',
  },
  {
    name: 'Germany',
    slug: 'germany',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in Germany for Indian students',
  },
];

const rightDestinations = [
  {
    name: 'Singapore',
    slug: 'singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in Singapore for Indian students',
  },
  {
    name: 'New Zealand',
    slug: 'new-zealand',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in New Zealand for Indian students',
  },
  {
    name: 'Switzerland',
    slug: 'switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in Switzerland for Indian students',
  },
  {
    name: 'Ireland',
    slug: 'ireland',
    image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in Ireland for Indian students',
  },
  {
    name: 'Malta',
    slug: 'malta',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    alt: 'Study in Malta for Indian students',
  },
];

export default function TopDestinations() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId = null;
    let isRunning = true;

    const onScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const winH = window.innerHeight;
        const totalDist = winH + rect.height;
        const currentDist = winH - rect.top;
        const progress = currentDist / totalDist;
        // Normalized progress: -1 (approaching) to 1 (passed)
        targetProgress = (progress - 0.5) * 2;
      }
    };

    const renderLoop = () => {
      if (!isRunning) return;

      // Silky smooth lerp damping (0.08 factor for organic inertia)
      currentProgress += (targetProgress - currentProgress) * 0.08;

      if (leftColRef.current && rightColRef.current) {
        // Left column glides UP on scroll (-Y)
        const leftShift = currentProgress * -320;
        // Right column glides DOWN on scroll (+Y)
        const rightShift = currentProgress * 320;

        leftColRef.current.style.transform = `translate3d(0px, ${leftShift.toFixed(2)}px, 0px)`;
        rightColRef.current.style.transform = `translate3d(0px, ${rightShift.toFixed(2)}px, 0px)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    renderLoop();

    return () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="py-14 md:py-20 bg-white overflow-hidden" ref={sectionRef}>
      {/* ── Increased Width Wrapper (max-w-[1440px]) ── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Outer 13 Dreams Theme Obsidian & Deep Crimson Luxury Container ── */}
        <div
          className="relative w-full rounded-[40px] md:rounded-[56px] overflow-hidden shadow-2xl shadow-red-950/20 border border-red-500/20 md:min-h-[760px]"
          style={{
            background: 'linear-gradient(145deg, #111418 0%, #1f0a0e 40%, #2e0911 75%, #0c0e11 100%)',
          }}
        >
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[130px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-red-500/20 blur-[130px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-600/10 blur-[140px] pointer-events-none" />

          {/* ── Desktop & Tablet 3-Column Layout ── */}
          <div className="relative z-10 hidden md:flex items-center justify-between h-[780px] lg:h-[820px] px-6 lg:px-12 gap-6 lg:gap-10">
            {/* ── Left Column: Moves UP smoothly with momentum lerp ── */}
            <div className="w-[31%] lg:w-[29%] flex-shrink-0 h-full overflow-hidden flex flex-col justify-center">
              <div
                ref={leftColRef}
                className="flex flex-col gap-6 will-change-transform"
                style={{ transform: 'translate3d(0px, 0px, 0px)' }}
              >
                {leftDestinations.map((dest, i) => (
                  <Link
                    key={i}
                    href={`/study/${dest.slug}`}
                    className="group relative block w-full h-[240px] lg:h-[260px] rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex-shrink-0 border-2 border-white/20 hover:border-red-500/90 bg-slate-900"
                  >
                    <img
                      src={dest.image}
                      alt={dest.alt}
                      className="w-full h-full object-cover object-center brightness-[0.88]"
                    />
                    {/* Centered Text Only */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/20 group-hover:bg-black/10 transition-colors">
                      <span className="text-white font-extrabold text-2xl lg:text-3xl tracking-wider uppercase text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] select-none">
                        {dest.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Center Column: Fixed Center Content with Ample Bottom Padding ── */}
            <div className="w-[38%] lg:w-[42%] text-center text-white px-2 lg:px-6 flex flex-col items-center justify-center my-auto pt-8 pb-12">
              <h2 className="text-3xl lg:text-[46px] font-bold leading-[1.18] text-white tracking-tight">
                Your <strong className="font-extrabold text-white">Dream Study</strong>{' '}
                <span className="relative inline-block whitespace-nowrap font-extrabold">
                  Destination
                  {/* Curved Red Highlighter Underline */}
                  <svg
                    className="absolute -bottom-2.5 left-0 w-full h-3 text-red-500"
                    viewBox="0 0 100 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 14C32 4 72 4 98 13"
                      stroke="#ef4444"
                      strokeWidth="5.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                Awaits
              </h2>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 max-w-md">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15 flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-red-500"></i> 150+ Partner Universities
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15 flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-red-500"></i> 99% Visa Grant Rate
                </span>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15 flex items-center gap-1.5">
                  <i className="fa-solid fa-check text-red-500"></i> 100% Free Guidance
                </span>
              </div>

              {/* View More Button with Theme Red Hover and Extra Bottom Clearance */}
              <div className="mt-8 pb-3">
                <Link
                  href="/countries"
                  className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl border-2 border-white text-white font-bold text-sm lg:text-base bg-transparent hover:bg-red-600 hover:border-red-600 active:bg-red-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-red-600/40"
                  style={{ color: '#ffffff' }}
                >
                  <span style={{ color: '#ffffff' }}>View more</span>
                  <i
                    className="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1.5"
                    style={{ color: '#ffffff' }}
                  ></i>
                </Link>
              </div>
            </div>

            {/* ── Right Column: Moves DOWN smoothly with momentum lerp ── */}
            <div className="w-[31%] lg:w-[29%] flex-shrink-0 h-full overflow-hidden flex flex-col justify-center">
              <div
                ref={rightColRef}
                className="flex flex-col gap-6 will-change-transform"
                style={{ transform: 'translate3d(0px, 0px, 0px)' }}
              >
                {rightDestinations.map((dest, i) => (
                  <Link
                    key={i}
                    href={`/study/${dest.slug}`}
                    className="group relative block w-full h-[240px] lg:h-[260px] rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex-shrink-0 border-2 border-white/20 hover:border-red-500/90 bg-slate-900"
                  >
                    <img
                      src={dest.image}
                      alt={dest.alt}
                      className="w-full h-full object-cover object-center brightness-[0.88]"
                    />
                    {/* Centered Text Only */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/20 group-hover:bg-black/10 transition-colors">
                      <span className="text-white font-extrabold text-2xl lg:text-3xl tracking-wider uppercase text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] select-none">
                        {dest.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Mobile Layout (< 768px) with Generous Bottom Padding ── */}
          <div className="md:hidden p-7 pb-12 text-center text-white flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              Your <strong className="font-extrabold text-white">Dream Study</strong>{' '}
              <span className="relative inline-block font-extrabold">
                Destination
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2.5 text-red-500"
                  viewBox="0 0 100 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 14C32 4 72 4 98 13"
                    stroke="#ef4444"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              Awaits
            </h2>

            {/* Mobile Cards Grid */}
            <div className="w-full mt-6 grid grid-cols-2 gap-3.5">
              {[...leftDestinations.slice(0, 2), ...rightDestinations.slice(0, 2)].map((dest, i) => (
                <Link
                  key={i}
                  href={`/study/${dest.slug}`}
                  className="group relative block h-40 rounded-2xl overflow-hidden shadow-md border border-white/20 hover:border-red-500 transition-colors"
                >
                  <img
                    src={dest.image}
                    alt={dest.alt}
                    className="w-full h-full object-cover brightness-[0.88]"
                  />
                  {/* Centered Text Only */}
                  <div className="absolute inset-0 flex items-center justify-center p-2 bg-black/20">
                    <span className="text-white font-extrabold text-base sm:text-lg tracking-wider uppercase text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none">
                      {dest.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 pb-2">
              <Link
                href="/countries"
                className="inline-flex items-center gap-2 px-9 py-3.5 rounded-xl border-2 border-white text-white font-bold text-xs bg-transparent hover:bg-red-600 hover:border-red-600 active:scale-95 transition-all shadow-md hover:shadow-red-600/40"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ffffff' }}>View more</span>
                <i className="fa-solid fa-arrow-right text-[11px]" style={{ color: '#ffffff' }}></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
