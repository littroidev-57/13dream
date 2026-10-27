'use client';

import React, { useState } from 'react';
import PageBanner from '@/components/UI/PageBanner';
import { latestEventsInstagram } from '@/lib/eventsData';

export default function EventsPage() {
  const [playingId, setPlayingId] = useState(null);

  return (
    <>
      <PageBanner
        title="Our Events"
        breadcrumbs={[{ label: 'Our Events', href: null }]}
      />

      <section className="shu-university bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Main Title */}
          <div className="section-title default text-center mb-10">
            <div className="section-top">
              <h2>
                <span className="text-gray-900">Our </span>
                <b className="text-red-600">Events</b>
              </h2>
            </div>
          </div>

          {/* Videos & Photos - Pure In-Card Media with Full Uncropped Images on Clean White Background */}
          {latestEventsInstagram && latestEventsInstagram.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
              {latestEventsInstagram.map((event) => {
                const isPlaying = playingId === event.id;

                return (
                  <div
                    key={event.id}
                    className="w-full max-w-[400px] h-[300px] sm:h-[340px] md:h-[360px] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl relative group transition-all duration-300 hover:border-red-500/60 flex items-center justify-center"
                  >
                    {/* Event: Native HTML5 Video */}
                    {event.videoSrc ? (
                      isPlaying ? (
                        <div className="relative z-20 w-full h-full bg-black flex items-center justify-center">
                          <video
                            src={event.videoSrc}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => setPlayingId(null)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center text-xs transition-colors z-30 cursor-pointer shadow-lg"
                            title="Stop"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ) : (
                        <div
                          className="w-full h-full relative cursor-pointer flex items-center justify-center bg-gray-50/70"
                          onClick={() => setPlayingId(event.id)}
                        >
                          {/* Ambient background blur */}
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <img
                              src={event.image}
                              alt=""
                              className="w-full h-full object-cover blur-2xl opacity-15 scale-110"
                              aria-hidden="true"
                            />
                          </div>
                          {/* Full uncropped thumbnail */}
                          <img
                            src={event.image}
                            alt={event.title}
                            className="relative z-10 w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 z-20 bg-black/15 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform">
                              <i className="fa-solid fa-play ml-1"></i>
                            </div>
                          </div>
                        </div>
                      )
                    ) : event.type === 'video' ? (
                      /* Event: Reel / Embed - Plays directly inside the card when clicked */
                      isPlaying ? (
                        <div className="relative z-20 w-full h-full bg-black flex items-center justify-center">
                          <iframe
                            src={event.embedUrl}
                            className="w-full h-full border-0"
                            allow="autoplay; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                            title={event.title}
                          />
                          <button
                            type="button"
                            onClick={() => setPlayingId(null)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center text-xs transition-colors z-30 cursor-pointer shadow-lg"
                            title="Close"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ) : (
                        <div
                          className="w-full h-full relative cursor-pointer flex items-center justify-center bg-gray-50/70"
                          onClick={() => setPlayingId(event.id)}
                        >
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <img
                              src={event.image}
                              alt=""
                              className="w-full h-full object-cover blur-2xl opacity-15 scale-110"
                              aria-hidden="true"
                            />
                          </div>
                          <img
                            src={event.image}
                            alt={event.title}
                            className="relative z-10 w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 z-20 bg-black/15 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform">
                              <i className="fa-solid fa-play ml-1"></i>
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      /* Event: Pure Photo (Full image displayed in the box proper without cropping) */
                      <div className="w-full h-full relative flex items-center justify-center bg-gray-50/70">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            src={event.image}
                            alt=""
                            className="w-full h-full object-cover blur-2xl opacity-15 scale-110"
                            aria-hidden="true"
                          />
                        </div>
                        <img
                          src={event.image}
                          alt={event.title}
                          className="relative z-10 w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
