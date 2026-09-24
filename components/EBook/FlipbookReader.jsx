'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Synthesizes a realistic gentle paper rustle/flip sound using Web Audio API
 */
function playPaperFlipSound() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp(-i / (bufferSize * 0.28));
      data[i] = (Math.random() * 2 - 1) * decay * 0.35;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.12);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.13);
  } catch {
    // audio context blocked by browser until interaction
  }
}

export default function FlipbookReader({ brochure, onClose }) {
  // Current active page index (1 to totalPages)
  const [currentPage, setCurrentPage] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Active turning leaf state: null | { direction: 'forward' | 'backward', flippingFront: number, flippingBack: number, underLeft: number, underRight: number, targetPage: number }
  const [flippingLeaf, setFlippingLeaf] = useState(null);

  const containerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const flipTimerRef = useRef(null);

  const totalPages = brochure?.totalPages || 32;

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    };
  }, []);

  // Lock body scroll & keyboard navigation
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen?.();
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        flipNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        flipPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, totalPages, isFullscreen, isMobile, flippingLeaf]);

  // Handle Fullscreen events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // In-memory cache of preloaded Image objects so browser keeps them in memory
  const preloadedUrlsRef = useRef(new Set());

  const getPageSrc = useCallback(
    (num) => {
      if (!num || num < 1 || num > totalPages) return null;
      return `${brochure.pagesDir}/page-${num}.jpg`;
    },
    [brochure, totalPages]
  );

  const preloadPage = useCallback(
    (num) => {
      if (!num || num < 1 || num > totalPages || !brochure?.pagesDir) return;
      const src = getPageSrc(num);
      if (!src || preloadedUrlsRef.current.has(src)) return;
      preloadedUrlsRef.current.add(src);
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    },
    [totalPages, brochure, getPageSrc]
  );

  // Proactive smart preloading: immediately load first 6 pages, then idle-load remainder
  useEffect(() => {
    if (!brochure) return;
    for (let i = 1; i <= Math.min(6, totalPages); i++) {
      preloadPage(i);
    }

    let nextIdx = 7;
    const interval = setInterval(() => {
      if (nextIdx > totalPages) {
        clearInterval(interval);
        return;
      }
      preloadPage(nextIdx);
      preloadPage(nextIdx + 1);
      nextIdx += 2;
    }, 100);

    return () => clearInterval(interval);
  }, [brochure, totalPages, preloadPage]);

  // When currentPage changes, immediately preload neighboring pages
  useEffect(() => {
    if (!brochure) return;
    const neighbors = [
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
      currentPage - 1,
      currentPage - 2,
    ];
    neighbors.forEach((p) => preloadPage(p));
  }, [currentPage, brochure, totalPages, preloadPage]);

  // Immediate jump / slide - shows page instantaneously without animation lock
  const jumpToPage = (pageNum) => {
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    setFlippingLeaf(null);
    const valid = Math.max(1, Math.min(totalPages, pageNum));
    setCurrentPage(valid);
  };

  // Flip Forward (Next Page)
  const flipNext = () => {
    if (flippingLeaf) return;

    if (soundEnabled) {
      playPaperFlipSound();
    }

    if (isMobile) {
      if (currentPage >= totalPages) return;
      const target = currentPage + 1;
      setFlippingLeaf({
        direction: 'forward',
        targetPage: target,
      });
      flipTimerRef.current = setTimeout(() => {
        setCurrentPage(target);
        setFlippingLeaf(null);
      }, 420);
      return;
    }

    // DESKTOP SPREAD MODE
    if (currentPage === 1) {
      // Cover page (1) flipping forward to open spread (2 & 3)
      setFlippingLeaf({
        direction: 'forward',
        flippingFront: 1, // Front cover lifting from right
        flippingBack: 2,  // Inside left cover
        underLeft: null,  // Nothing on left yet
        underRight: 3,    // Page 3 waiting underneath on right
        targetPage: 2,
      });

      flipTimerRef.current = setTimeout(() => {
        setCurrentPage(2);
        setFlippingLeaf(null);
      }, 420);
    } else {
      // Current spread is: left = even page (e.g. 2), right = odd page (e.g. 3)
      const currentLeft = currentPage % 2 === 0 ? currentPage : currentPage - 1;
      const currentRight = currentLeft + 1 <= totalPages ? currentLeft + 1 : null;

      if (!currentRight || currentRight >= totalPages) return;

      const nextLeft = currentRight + 1; // e.g. 4
      const nextRight = nextLeft + 1 <= totalPages ? nextLeft + 1 : null; // e.g. 5

      setFlippingLeaf({
        direction: 'forward',
        flippingFront: currentRight, // e.g. 3 lifting
        flippingBack: nextLeft,     // e.g. 4 turning into left side
        underLeft: currentLeft,     // e.g. 2 stays under on left
        underRight: nextRight,      // e.g. 5 waiting under on right
        targetPage: nextLeft,
      });

      flipTimerRef.current = setTimeout(() => {
        setCurrentPage(nextLeft);
        setFlippingLeaf(null);
      }, 420);
    }
  };

  // Flip Backward (Previous Page)
  const flipPrev = () => {
    if (flippingLeaf) return;

    if (soundEnabled) {
      playPaperFlipSound();
    }

    if (isMobile) {
      if (currentPage <= 1) return;
      const target = currentPage - 1;
      setFlippingLeaf({
        direction: 'backward',
        targetPage: target,
      });
      flipTimerRef.current = setTimeout(() => {
        setCurrentPage(target);
        setFlippingLeaf(null);
      }, 420);
      return;
    }

    // DESKTOP SPREAD MODE
    if (currentPage <= 1) return;

    if (currentPage <= 3) {
      // Spread (2 & 3) flipping backward to closed cover (1)
      setFlippingLeaf({
        direction: 'backward',
        flippingFront: 1, // Front cover landing on right
        flippingBack: 2,  // Left page lifting
        underLeft: null,
        underRight: 3,
        targetPage: 1,
      });

      flipTimerRef.current = setTimeout(() => {
        setCurrentPage(1);
        setFlippingLeaf(null);
      }, 420);
    } else {
      const currentLeft = currentPage % 2 === 0 ? currentPage : currentPage - 1;
      const currentRight = currentLeft + 1 <= totalPages ? currentLeft + 1 : null;

      const prevLeft = currentLeft - 2 >= 2 ? currentLeft - 2 : null;
      const prevRight = currentLeft - 1;

      setFlippingLeaf({
        direction: 'backward',
        flippingFront: prevRight,   // Landing on right
        flippingBack: currentLeft, // Lifting from left
        underLeft: prevLeft,       // Revealed on left
        underRight: currentRight,  // Revealed under right
        targetPage: prevLeft || 1,
      });

      flipTimerRef.current = setTimeout(() => {
        setCurrentPage(prevLeft || 1);
        setFlippingLeaf(null);
      }, 420);
    }
  };

  // Touch Swipe
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      flipNext();
    } else if (diff < -50) {
      flipPrev();
    }
  };

  // Static spread pages when not flipping
  let staticLeft = null;
  let staticRight = null;

  if (isMobile) {
    staticLeft = currentPage;
  } else {
    if (currentPage === 1) {
      staticLeft = null;
      staticRight = 1;
    } else {
      staticLeft = currentPage % 2 === 0 ? currentPage : currentPage - 1;
      staticRight = staticLeft + 1 <= totalPages ? staticLeft + 1 : null;
    }
  }

  return (
    <div
      ref={containerRef}
      style={{ isolation: 'isolate' }}
      className="fixed inset-0 z-[9999999] bg-[#090d14] text-white flex flex-col justify-between select-none overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 bg-black/60 backdrop-blur-md z-40">
        <div className="flex items-center gap-3">
          <span className="text-2xl drop-shadow">{brochure.flag}</span>
          <div>
            <h2 className="text-white text-xs sm:text-base font-bold truncate max-w-[180px] sm:max-w-md">
              {brochure.title}
            </h2>
            <p className="text-gray-400 text-[10px] sm:text-xs hidden sm:block">
              13 Dreams Consultants • Study Visa E-Book
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg text-xs sm:text-sm transition-colors ${soundEnabled
              ? 'bg-white/10 text-emerald-400 hover:bg-white/20'
              : 'bg-white/5 text-gray-500 hover:bg-white/10'
              }`}
            title={soundEnabled ? 'Page flip sound on' : 'Sound muted'}
            aria-label="Toggle page turn audio"
          >
            <i className={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-xs sm:text-sm bg-white/10 text-white hover:bg-white/20 transition-colors hidden sm:block"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle fullscreen mode"
          >
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>

          {/* Download Original PDF Button */}
          <a
            href={brochure.pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-red-600/30"
            title="Download Official PDF"
          >
            <i className="fa-solid fa-download"></i>
            <span className="hidden sm:inline">Download PDF</span>
          </a>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close Book Reader (Esc)"
            aria-label="Close reader"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
      </header>

      {/* Main 3D Book Stage */}
      <div
        className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Arrow Button */}
        <button
          onClick={flipPrev}
          disabled={currentPage <= 1 || !!flippingLeaf}
          className={`absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all shadow-2xl backdrop-blur-md ${currentPage <= 1
            ? 'opacity-20 cursor-not-allowed bg-black/20'
            : 'bg-black/70 hover:bg-red-600 hover:scale-110 active:scale-95 border border-white/20'
            }`}
          title="Previous Page (Left Arrow)"
          aria-label="Previous page"
        >
          <i className="fa-solid fa-chevron-left text-lg sm:text-xl"></i>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={flipNext}
          disabled={currentPage >= totalPages || !!flippingLeaf}
          className={`absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all shadow-2xl backdrop-blur-md ${currentPage >= totalPages
            ? 'opacity-20 cursor-not-allowed bg-black/20'
            : 'bg-black/70 hover:bg-red-600 hover:scale-110 active:scale-95 border border-white/20'
            }`}
          title="Next Page (Right Arrow)"
          aria-label="Next page"
        >
          <i className="fa-solid fa-chevron-right text-lg sm:text-xl"></i>
        </button>

        {/* Book Container with 3D Perspective */}
        <div
          className="relative flex items-center justify-center max-w-full max-h-[76vh] transition-transform duration-300"
          style={{
            perspective: '2500px',
            transform: `scale(${zoomLevel})`,
          }}
        >
          {/* DESKTOP 2-PAGE SPREAD */}
          {!isMobile ? (
            <div className="relative flex items-center shadow-2xl rounded-lg overflow-visible bg-[#121620] p-1.5 border border-white/10">
              {/* === STATIC UNDERNEATH PAGES === */}
              {/* Left Page Underneath */}
              <div
                onClick={flipPrev}
                className="relative cursor-pointer overflow-hidden rounded-l-md bg-white shadow-inner flex items-center justify-center"
                style={{
                  height: '70vh',
                  aspectRatio: '1 / 1.414',
                }}
              >
                {(() => {
                  const leftPg = flippingLeaf
                    ? flippingLeaf.underLeft
                    : staticLeft;
                  return leftPg ? (
                    <img
                      src={getPageSrc(leftPg)}
                      alt={`Page ${leftPg}`}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1e2430] flex flex-col items-center justify-center text-gray-500 text-xs gap-2">
                      <i className="fa-solid fa-book text-3xl text-gray-600"></i>
                      <span>Inside Front Cover</span>
                    </div>
                  );
                })()}

                {/* Left Page Spine Shadow */}
                <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none"></div>

                {/* Page Number Badge */}
                {(flippingLeaf ? flippingLeaf.underLeft : staticLeft) && (
                  <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono pointer-events-none">
                    Page {flippingLeaf ? flippingLeaf.underLeft : staticLeft}
                  </div>
                )}
              </div>

              {/* Realistic Center Binding / Spine Crease */}
              <div className="w-2.5 h-[70vh] bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 shadow-inner flex items-center justify-center relative z-20">
                <div className="w-[1px] h-full bg-white/20"></div>
              </div>

              {/* Right Page Underneath */}
              <div
                onClick={flipNext}
                className="relative cursor-pointer overflow-hidden rounded-r-md bg-white shadow-inner flex items-center justify-center"
                style={{
                  height: '70vh',
                  aspectRatio: '1 / 1.414',
                }}
              >
                {(() => {
                  const rightPg = flippingLeaf
                    ? flippingLeaf.underRight
                    : staticRight;
                  return rightPg ? (
                    <img
                      src={getPageSrc(rightPg)}
                      alt={`Page ${rightPg}`}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1e2430] flex flex-col items-center justify-center text-gray-500 text-xs gap-2">
                      <i className="fa-solid fa-book text-3xl text-gray-600"></i>
                      <span>Back Cover</span>
                    </div>
                  );
                })()}

                {/* Right Page Spine Shadow */}
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none"></div>

                {/* Page Number Badge */}
                {(flippingLeaf ? flippingLeaf.underRight : staticRight) && (
                  <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono pointer-events-none">
                    Page {flippingLeaf ? flippingLeaf.underRight : staticRight}
                  </div>
                )}
              </div>

              {/* === DYNAMIC 3D FLIPPING LEAF (The Turning Page) === */}
              {flippingLeaf && (
                <>
                  {/* FORWARD FLIP: Page turning from Right to Left */}
                  {flippingLeaf.direction === 'forward' && (
                    <div
                      className="animate-leaf-forward absolute z-30"
                      style={{
                        right: '6px', // aligns with right half of book
                        width: 'calc(50% - 6px)',
                        height: '70vh',
                        transformOrigin: 'left center',
                      }}
                    >
                      {/* FRONT OF FLIPPING PAGE (Facing Right before flip) */}
                      <div
                        className="absolute inset-0 bg-white rounded-r-md overflow-hidden shadow-2xl"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        {flippingLeaf.flippingFront ? (
                          <img
                            src={getPageSrc(flippingLeaf.flippingFront)}
                            alt={`Page ${flippingLeaf.flippingFront}`}
                            className="w-full h-full object-contain"
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                          />
                        ) : null}
                        {/* Dynamic shadow when curling */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10 pointer-events-none"></div>
                      </div>

                      {/* BACK OF FLIPPING PAGE (Facing Left after flip) */}
                      <div
                        className="absolute inset-0 bg-white rounded-l-md overflow-hidden shadow-2xl"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        {flippingLeaf.flippingBack ? (
                          <img
                            src={getPageSrc(flippingLeaf.flippingBack)}
                            alt={`Page ${flippingLeaf.flippingBack}`}
                            className="w-full h-full object-contain"
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-black/10 pointer-events-none"></div>
                      </div>
                    </div>
                  )}

                  {/* BACKWARD FLIP: Page turning from Left to Right */}
                  {flippingLeaf.direction === 'backward' && (
                    <div
                      className="animate-leaf-backward absolute z-30"
                      style={{
                        left: '6px', // aligns with left half of book
                        width: 'calc(50% - 6px)',
                        height: '70vh',
                        transformOrigin: 'right center',
                      }}
                    >
                      {/* BACK OF FLIPPING PAGE (Facing Left before backward flip) */}
                      <div
                        className="absolute inset-0 bg-white rounded-l-md overflow-hidden shadow-2xl"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        {flippingLeaf.flippingBack ? (
                          <img
                            src={getPageSrc(flippingLeaf.flippingBack)}
                            alt={`Page ${flippingLeaf.flippingBack}`}
                            className="w-full h-full object-contain"
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-black/10 pointer-events-none"></div>
                      </div>

                      {/* FRONT OF FLIPPING PAGE (Facing Right after backward flip) */}
                      <div
                        className="absolute inset-0 bg-white rounded-r-md overflow-hidden shadow-2xl"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      >
                        {flippingLeaf.flippingFront ? (
                          <img
                            src={getPageSrc(flippingLeaf.flippingFront)}
                            alt={`Page ${flippingLeaf.flippingFront}`}
                            className="w-full h-full object-contain"
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10 pointer-events-none"></div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            /* MOBILE SINGLE PAGE */
            <div
              className={`relative bg-white rounded-lg shadow-2xl overflow-hidden border border-white/20 transition-all duration-300 ${flippingLeaf ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                }`}
              style={{
                height: '68vh',
                aspectRatio: '1 / 1.414',
              }}
            >
              <img
                src={getPageSrc(currentPage)}
                alt={`Page ${currentPage}`}
                className="w-full h-full object-contain bg-white"
                loading="eager"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 text-white text-xs font-mono">
                {currentPage} / {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Toolbar */}
      <footer className="relative bg-black/70 backdrop-blur-md border-t border-white/10 px-3 sm:px-6 py-2.5 z-40 flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          {/* Left: Thumbnails toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${showThumbnails
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            title="Toggle All Page Thumbnails"
          >
            <i className="fa-solid fa-table-cells"></i>
            <span>All Pages</span>
          </button>

          {/* Center: Page Counter Shown in the Center */}
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white shadow-sm">
            <span className="font-bold text-amber-400">Pg {currentPage}</span>
            <span className="text-white/40">of</span>
            <span className="font-semibold text-gray-300">{totalPages}</span>
          </div>

          {/* Right: Zoom controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 rounded bg-white/10 text-white text-xs hover:bg-white/20"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <i className="fa-solid fa-magnifying-glass-minus"></i>
            </button>
            <span className="text-xs text-gray-400 font-mono w-10 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 rounded bg-white/10 text-white text-xs hover:bg-white/20"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <i className="fa-solid fa-magnifying-glass-plus"></i>
            </button>
          </div>
        </div>

        {/* Expandable Filmstrip Thumbnails Drawer */}
        {showThumbnails && (
          <div className="mt-2 pt-2 border-t border-white/10 overflow-x-auto flex gap-2 pb-1 no-scrollbar animate-in slide-in-from-bottom duration-200">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pgNum) => (
              <button
                key={pgNum}
                onClick={() => {
                  jumpToPage(pgNum);
                  setShowThumbnails(false);
                }}
                className={`relative flex-shrink-0 w-16 sm:w-20 rounded border-2 transition-all overflow-hidden ${currentPage === pgNum
                  ? 'border-red-500 scale-105 shadow-lg shadow-red-500/40 ring-1 ring-red-400'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/40'
                  }`}
                style={{ aspectRatio: '1 / 1.414' }}
              >
                <img
                  src={getPageSrc(pgNum)}
                  alt={`Page ${pgNum}`}
                  className="w-full h-full object-cover bg-white"
                  loading="lazy"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-[9px] text-center font-mono py-0.5">
                  Pg {pgNum}
                </span>
              </button>
            ))}
          </div>
        )}
      </footer>
    </div>
  );
}
