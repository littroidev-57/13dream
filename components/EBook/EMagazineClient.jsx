'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BROCHURES } from '@/lib/brochuresData';
import FlipbookReader from '@/components/EBook/FlipbookReader';

export default function EMagazineClient() {
  const [viewMode, setViewMode] = useState('stack'); // 'stack' | 'columns'
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFlipbook, setActiveFlipbook] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef(0);

  const total = BROCHURES.length;
  const currentBrochure = BROCHURES[activeIndex];

  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slideNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const slidePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeFlipbook || viewMode !== 'stack') return;

      if (e.key === 'ArrowRight') {
        slideNext();
      } else if (e.key === 'ArrowLeft') {
        slidePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFlipbook, viewMode, slideNext, slidePrev]);

  // Touch Swipe for mobile/tablet slider
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      slideNext();
    } else if (diff < -40) {
      slidePrev();
    }
  };

  // Preloading cache for brochure pages to eliminate open/flip lag
  const preloadedPagesRef = useRef(new Set());
  const preloadBrochureInitialPages = useCallback((brochure) => {
    if (!brochure?.pagesDir || typeof window === 'undefined') return;
    [1, 2, 3, 4].forEach((p) => {
      const url = `${brochure.pagesDir}/page-${p}.jpg`;
      if (!preloadedPagesRef.current.has(url)) {
        preloadedPagesRef.current.add(url);
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      }
    });
  }, []);

  // Preload current, next, and previous brochure pages on activeIndex change
  useEffect(() => {
    preloadBrochureInitialPages(BROCHURES[activeIndex]);
    const timer = setTimeout(() => {
      const nextB = BROCHURES[(activeIndex + 1) % BROCHURES.length];
      const prevB = BROCHURES[(activeIndex - 1 + BROCHURES.length) % BROCHURES.length];
      preloadBrochureInitialPages(nextB);
      preloadBrochureInitialPages(prevB);
    }, 150);
    return () => clearTimeout(timer);
  }, [activeIndex, preloadBrochureInitialPages]);

  // Helper to compute 3D layered position for each book in stack
  const getBookLayerStyle = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;

    if (isActive) {
      return {
        zIndex: 30,
        opacity: 1,
        transform: 'translateX(0px) translateY(0px) translateZ(0px) rotateY(-5deg) scale(1)',
        filter: 'blur(0px)',
        cursor: 'pointer',
      };
    }

    if (isMobile) {
      if (diff === 1) {
        return {
          zIndex: 20,
          opacity: 0.8,
          transform: 'translateX(65px) translateY(-8px) translateZ(-40px) rotateY(-14deg) scale(0.84)',
          filter: 'blur(0.3px)',
          cursor: 'pointer',
        };
      }
      if (diff === -1) {
        return {
          zIndex: 20,
          opacity: 0.8,
          transform: 'translateX(-65px) translateY(-8px) translateZ(-40px) rotateY(14deg) scale(0.84)',
          filter: 'blur(0.3px)',
          cursor: 'pointer',
        };
      }
      return {
        zIndex: 5,
        opacity: 0,
        transform: 'translateX(0px) scale(0.6)',
        pointerEvents: 'none',
      };
    }

    // Desktop & Tablet Layering
    if (diff === 1) {
      // 2nd book on right: visible layered behind at minimum scale
      return {
        zIndex: 20,
        opacity: 0.88,
        transform: 'translateX(165px) translateY(-14px) translateZ(-70px) rotateY(-16deg) scale(0.85)',
        filter: 'blur(0.2px)',
        cursor: 'pointer',
      };
    }
    if (diff === -1) {
      // 2nd book on left: visible layered behind at minimum scale
      return {
        zIndex: 20,
        opacity: 0.88,
        transform: 'translateX(-165px) translateY(-14px) translateZ(-70px) rotateY(16deg) scale(0.85)',
        filter: 'blur(0.2px)',
        cursor: 'pointer',
      };
    }
    if (diff === 2) {
      // 3rd book on right
      return {
        zIndex: 10,
        opacity: 0.58,
        transform: 'translateX(290px) translateY(-28px) translateZ(-140px) rotateY(-22deg) scale(0.72)',
        filter: 'blur(0.6px)',
        cursor: 'pointer',
      };
    }
    if (diff === -2) {
      // 3rd book on left
      return {
        zIndex: 10,
        opacity: 0.58,
        transform: 'translateX(-290px) translateY(-28px) translateZ(-140px) rotateY(22deg) scale(0.72)',
        filter: 'blur(0.6px)',
        cursor: 'pointer',
      };
    }

    // 4th / Deep background book
    return {
      zIndex: 5,
      opacity: 0,
      transform: 'translateX(0px) translateY(-40px) translateZ(-200px) scale(0.6)',
      pointerEvents: 'none',
    };
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 flex flex-col justify-between py-6 sm:py-10 px-3 sm:px-6 select-none overflow-x-hidden">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto text-center pt-2 pb-3 sm:pb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold mb-3 shadow-sm">
          <i className="fa-solid fa-book-open text-xs"></i>
          <span>Official Editions • 2025–2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Study Abroad <span className="text-[#e20000]">E-Books</span>
        </h1>

        {/* View Switcher: 3D Book Stack vs Columns View */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="inline-flex p-1 rounded-xl bg-gray-200/80 border border-gray-300/70 shadow-inner">
            <button
              onClick={() => setViewMode('stack')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'stack'
                  ? 'bg-white text-[#e20000] shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <i className="fa-solid fa-layer-group"></i>
              <span>3D Book Stack</span>
            </button>
            <button
              onClick={() => setViewMode('columns')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'columns'
                  ? 'bg-white text-[#e20000] shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <i className="fa-solid fa-table-columns"></i>
              <span>Columns View</span>
            </button>
          </div>
        </div>

        {/* Country Quick Pills */}
        {viewMode === 'stack' && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-3xl mx-auto no-scrollbar">
            {BROCHURES.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${activeIndex === idx
                    ? 'bg-[#e20000] text-white shadow-md shadow-red-600/35 scale-105 border border-[#e20000]'
                    : 'bg-white hover:bg-red-50 text-gray-700 hover:text-[#e20000] border border-gray-200 shadow-sm'
                  }`}
              >
                <span>{b.flag}</span>
                <span>{b.country}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MODE 1: 3D LAYERED BOOK STACK */}
      {viewMode === 'stack' && (
        <main className="relative flex-1 flex flex-col items-center justify-center py-2 sm:py-6 max-w-6xl mx-auto w-full">
          {/* Main 3D Layered Stage */}
          <div
            className="physical-book-stage relative flex items-center justify-center w-full h-[380px] sm:h-[480px] md:h-[510px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Slide Arrow */}
            <button
              onClick={slidePrev}
              className="absolute left-1 sm:left-4 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#e20000] border border-gray-200/90 hover:border-[#e20000] text-gray-800 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md"
              title="Previous Book (Left Arrow)"
              aria-label="Previous Book"
            >
              <i className="fa-solid fa-chevron-left text-base sm:text-xl"></i>
            </button>

            {/* Right Slide Arrow */}
            <button
              onClick={slideNext}
              className="absolute right-1 sm:right-4 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#e20000] border border-gray-200/90 hover:border-[#e20000] text-gray-800 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md"
              title="Next Book (Right Arrow)"
              aria-label="Next Book"
            >
              <i className="fa-solid fa-chevron-right text-base sm:text-xl"></i>
            </button>

            {/* ALL 6 BOOKS IN 3D LAYERED STACK */}
            {BROCHURES.map((brochure, idx) => {
              let diff = idx - activeIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const isActive = diff === 0;
              const layerStyle = getBookLayerStyle(idx);

              return (
                <div
                  key={brochure.id}
                  style={layerStyle}
                  className="realistic-book-card absolute flex flex-col items-center select-none"
                  onClick={() => {
                    if (isActive) {
                      setActiveFlipbook(brochure);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  onMouseEnter={() => preloadBrochureInitialPages(brochure)}
                >
                  {/* Physical 3D Hardcover Book Container */}
                  <div
                    className={`relative rounded-r-2xl bg-white shadow-2xl transition-all duration-300 group ${isActive ? 'hover:-translate-y-2' : ''
                      }`}
                    style={{
                      width: isMobile ? '205px' : '285px',
                      aspectRatio: '1 / 1.414',
                    }}
                  >
                    {/* Front Cover Artwork */}
                    <div className="relative w-full h-full rounded-r-2xl overflow-hidden border-l-4 border-gray-900 bg-white">
                      <img
                        src={brochure.coverImage}
                        alt={brochure.title}
                        className="w-full h-full object-cover"
                        loading={isActive ? 'eager' : 'lazy'}
                      />

                      {/* Spine Crease & Shadow */}
                      <div className="absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-black/55 via-black/20 to-transparent pointer-events-none z-10"></div>
                      <div className="absolute inset-y-0 left-4 w-[1px] bg-white/20 pointer-events-none z-10"></div>

                      {/* High-Gloss Reflection Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>

                      {/* Country Foil Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold shadow-lg z-20 border border-white/10">
                        <span>{brochure.flag}</span>
                        <span>{brochure.country}</span>
                      </div>

                      {/* Hover Open Ribbon (on active book) */}
                      {isActive && (
                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <span className="px-4 py-2.5 rounded-full bg-[#e20000] text-white font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <i className="fa-solid fa-book-open"></i>
                            <span>Click to Open Book</span>
                          </span>
                        </div>
                      )}

                      {/* Second Book Minimum Overlay (if layered behind) */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors pointer-events-none z-20"></div>
                      )}
                    </div>

                    {/* Realistic 3D Paper Thickness (Right Page Edges) */}
                    <div className="realistic-book-pages-right"></div>

                    {/* Realistic 3D Bottom Paper Thickness */}
                    <div className="realistic-book-pages-bottom"></div>

                    {/* Silk Bookmark Ribbon Hanging from Bottom */}
                    <div className="book-ribbon-bookmark"></div>

                    {/* Realistic Floor Contact Shadow */}
                    <div className="book-ground-shadow"></div>
                  </div>

                  {/* Below-Book Label for Layered Books */}
                  <div className="mt-4 text-center">
                    <span
                      className={`text-xs font-bold transition-all px-2.5 py-0.5 rounded-full ${isActive
                          ? 'text-[#e20000] bg-red-50 border border-red-200'
                          : 'text-gray-500 bg-white/80 border border-gray-200'
                        }`}
                    >
                      {brochure.flag} {brochure.country}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE BOOK REDESIGN PANEL (Below 3D Stage) */}
          <div className="w-full max-w-xl mx-auto mt-2 sm:mt-4 text-center px-4 flex flex-col items-center">
            {/* Primary Action Button to Open Book */}


            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 w-full">
              <div className="bg-white rounded-xl p-2.5 border border-gray-200 shadow-sm text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Intakes
                </span>
                <span className="text-xs font-extrabold text-gray-900 line-clamp-1 mt-0.5">
                  {currentBrochure.specs.intakes}
                </span>
              </div>
              <div className="bg-white rounded-xl p-2.5 border border-gray-200 shadow-sm text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Work Rights
                </span>
                <span className="text-xs font-extrabold text-gray-900 line-clamp-1 mt-0.5">
                  {currentBrochure.specs.workRights}
                </span>
              </div>
              <div className="bg-white rounded-xl p-2.5 border border-gray-200 shadow-sm text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Post-Study Visa
                </span>
                <span className="text-xs font-extrabold text-gray-900 line-clamp-1 mt-0.5">
                  {currentBrochure.specs.pswDuration}
                </span>
              </div>
              <div className="bg-white rounded-xl p-2.5 border border-gray-200 shadow-sm text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Visa Success
                </span>
                <span className="text-xs font-extrabold text-emerald-600 mt-0.5 block">
                  {currentBrochure.specs.successRate}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Mini-Covers Strip */}
          <footer className="max-w-2xl mx-auto w-full pt-6 pb-2 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
              {BROCHURES.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex-shrink-0 w-12 sm:w-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeIndex === idx
                      ? 'border-[#e20000] scale-110 shadow-lg shadow-red-500/30 ring-2 ring-red-400/50'
                      : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                    }`}
                  style={{ aspectRatio: '1 / 1.414' }}
                  title={`Switch to ${b.country}`}
                >
                  <img
                    src={b.coverImage}
                    alt={b.country}
                    className="w-full h-full object-cover bg-white"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-[8px] sm:text-[9px] font-bold text-center py-0.5 truncate px-0.5">
                    {b.country}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1.5">
              <i className="fa-solid fa-hand-pointer text-[11px] text-red-500"></i>
              <span>Click on any book in the stack to bring it forward or open it</span>
            </p>
          </footer>
        </main>
      )}

      {/* MODE 2: COLUMN TYPE (Grid of Columns) */}
      {viewMode === 'columns' && (
        <main className="max-w-6xl mx-auto w-full py-6 px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BROCHURES.map((brochure) => (
              <div
                key={brochure.id}
                onMouseEnter={() => preloadBrochureInitialPages(brochure)}
                className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:border-red-300 transition-all duration-300 p-5 flex flex-col items-center text-center group"
              >
                {/* 3D Book Cover in Column */}
                <div
                  onClick={() => setActiveFlipbook(brochure)}
                  className="book-cover-3d relative cursor-pointer w-full max-w-[210px] rounded-r-xl overflow-hidden shadow-xl border-l-4 border-gray-800 bg-white transition-all duration-300 group-hover:scale-105"
                  style={{ aspectRatio: '1 / 1.414' }}
                  title="Click to Open 3D Flipbook Reader"
                >
                  <img
                    src={brochure.coverImage}
                    alt={brochure.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none"></div>

                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-bold shadow">
                    <span>{brochure.flag}</span>
                    <span>{brochure.country}</span>
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3.5 py-2 rounded-full bg-[#e20000] text-white font-bold text-xs shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <i className="fa-solid fa-book-open"></i>
                      <span>Open E-Book</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-gray-900 mt-4 group-hover:text-[#e20000] transition-colors flex items-center gap-2">
                  <span>{brochure.flag}</span>
                  <span>{brochure.country}</span>
                </h3>

                <div className="flex items-center gap-2.5 mt-4 w-full">
                  <button
                    onClick={() => setActiveFlipbook(brochure)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#e20000] hover:bg-[#c40000] text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <i className="fa-solid fa-book-open text-xs"></i>
                    <span>Open E-Book</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 3D Flipbook Reader Modal */}
      {activeFlipbook && (
        <FlipbookReader
          brochure={activeFlipbook}
          onClose={() => setActiveFlipbook(null)}
        />
      )}
    </div>
  );
}
