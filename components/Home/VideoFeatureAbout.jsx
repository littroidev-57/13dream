'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function VideoFeatureAbout() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="video-feature">
      <div className="container">
        <div className="feature-layout">
          <div
            className="img-feature-wrap"
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              minHeight: '420px',
              background: '#0a0d14',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            {isPlaying ? (
              <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '420px' }}>
                <iframe
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '420px',
                    border: 'none',
                    display: 'block',
                  }}
                  src="https://www.youtube.com/embed/w-McW9p4XE0?autoplay=1&rel=0"
                  title="13 Dreams Consultants Overview Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* Close button to return back to the image */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(false)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 20,
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d90429')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)')}
                  title="Close video"
                  aria-label="Close video"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ) : (
              <div
                style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src="/img/BHH.jpg"
                  alt="13 Dreams Consultants Office Building Bareilly"
                  title="13 Dreams Consultants Building"
                  style={{
                    width: '100%',
                    height: '420px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Office Building Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0, 0, 0, 0.65)',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.3px',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    pointerEvents: 'none',
                  }}
                >
                  13 Dreams Consultants Building
                </div>

                {/* In-place Play Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                  className="video-play-btn"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 25px rgba(255, 0, 0, 0.7)',
                  }}
                  aria-label="Play 13 Dreams Overview Video in place"
                >
                  <i className="fa fa-play" style={{ marginLeft: '4px', color: '#ffffff' }}></i>
                </button>
              </div>
            )}
          </div>

          <div className="feature-info">
            <h2>
              13 Dreams <span>Consultants Private Limited</span>
            </h2>
            <h4 className="home-three-subtitle">
              A complete place for immigration and visa services in Bareilly or North India
            </h4>
            <p>
              A comprehensive hub for immigration and visa services, 13 Dreams Consultants Private Limited stands out as one of the best visa consultants in the industry. Our journey commenced with a distinct vision of delivering top-notch Education and Visa assistance services to students. With a commitment to excellence and transparency, we prioritize the needs of our clients, ensuring unparalleled support every step of the way.
            </p>
            <p style={{ fontStyle: 'italic', color: '#e0e0e0' }}>
              Led by a visionary entrepreneur Mr. Harpreet Singh with more than 15 years of industry expertise.
            </p>
            <Link href="/about-us" className="bizwheel-btn theme-2">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
