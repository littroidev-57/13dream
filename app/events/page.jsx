'use client';

import React, { useState, useEffect } from 'react';
import PageBanner from '@/components/UI/PageBanner';
import { eventsGallery } from '@/lib/eventsData';

export default function EventsPage() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePhotoIdx(null);
      }
      if (activePhotoIdx !== null) {
        if (e.key === 'ArrowRight') {
          setActivePhotoIdx((prev) => (prev + 1) % eventsGallery.length);
        } else if (e.key === 'ArrowLeft') {
          setActivePhotoIdx((prev) => (prev - 1 + eventsGallery.length) % eventsGallery.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIdx]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (activePhotoIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePhotoIdx]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((prev) => (prev - 1 + eventsGallery.length) % eventsGallery.length);
    }
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((prev) => (prev + 1) % eventsGallery.length);
    }
  };

  return (
    <>
      <PageBanner
        title="Our Events"
        breadcrumbs={[{ label: 'Our Events', href: null }]}
      />

      <section className="shu-university">
        <div className="container">
          <div className="section-title default text-center" style={{ marginBottom: '45px' }}>
            <div className="section-top">
              <h2>
                <span>Our </span>
                <b>Events</b>
              </h2>
            </div>
          </div>

          <div className="gallery-grid-events">
            {eventsGallery.map((item, idx) => (
              <div
                key={idx}
                className="gallery-shu group"
                onClick={() => setActivePhotoIdx(idx)}
                title={item.title || item.alt || '13 Dreams Consultants Event'}
              >
                <img
                  src={item.src}
                  alt={item.alt || '13 Dreams Consultants Event'}
                  title={item.title || item.alt}
                  loading="lazy"
                />
                <div className="gallery-shu-overlay">
                  <div className="gallery-shu-zoom-icon">
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhotoIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Previous Button */}
          <button
            type="button"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center text-xl transition-all z-10"
            onClick={handlePrev}
            title="Previous (Left Arrow)"
            aria-label="Previous Photo"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Lightbox Content */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center text-lg transition-all"
              onClick={() => setActivePhotoIdx(null)}
              title="Close (Esc)"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <img
              src={eventsGallery[activePhotoIdx].src}
              alt={eventsGallery[activePhotoIdx].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />

            {(eventsGallery[activePhotoIdx].title || eventsGallery[activePhotoIdx].alt) && (
              <p className="text-white/80 text-center text-sm md:text-base mt-4 max-w-2xl px-4 font-medium">
                {eventsGallery[activePhotoIdx].title || eventsGallery[activePhotoIdx].alt}
              </p>
            )}

            <span className="text-white/50 text-xs mt-2 font-mono">
              {activePhotoIdx + 1} / {eventsGallery.length}
            </span>
          </div>

          {/* Next Button */}
          <button
            type="button"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center text-xl transition-all z-10"
            onClick={handleNext}
            title="Next (Right Arrow)"
            aria-label="Next Photo"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
}
