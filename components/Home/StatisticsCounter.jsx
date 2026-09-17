'use client';

import React, { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ target, suffix, isVisible, duration = 2200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic for natural, smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, target, duration]);

  return (
    <span>
      {isVisible ? count : 0}
      {suffix}
    </span>
  );
}

export default function StatisticsCounter() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
      observer.disconnect();
    };
  }, []);

  const stats = [
    {
      icon: 'fa-solid fa-earth-americas',
      badgeIcon: 'fa-solid fa-plane-departure',
      target: 50,
      suffix: '+',
      label: 'Countries Represented',
      subtitle: 'Global Study Destinations',
      color: 'from-blue-500/20 to-red-500/10',
      accentColor: 'text-blue-400',
    },
    {
      icon: 'fa-solid fa-building-columns',
      badgeIcon: 'fa-solid fa-award',
      target: 150,
      suffix: '+',
      label: 'Partner Universities',
      subtitle: 'Worldwide Direct Tie-ups',
      color: 'from-amber-500/20 to-red-500/10',
      accentColor: 'text-amber-400',
    },
    {
      icon: 'fa-solid fa-passport',
      badgeIcon: 'fa-solid fa-circle-check',
      target: 99,
      suffix: '%',
      label: 'Visa Success Rate',
      subtitle: 'High Approval Record',
      color: 'from-emerald-500/20 to-red-500/10',
      accentColor: 'text-emerald-400',
    },
    {
      icon: 'fa-solid fa-user-graduate',
      badgeIcon: 'fa-solid fa-heart',
      target: 10,
      suffix: 'k+',
      label: 'Happy Students',
      subtitle: 'Dream Careers Realized',
      color: 'from-red-500/20 to-pink-500/10',
      accentColor: 'text-red-400',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-gradient-to-r from-gray-950 via-[#0d1117] to-gray-950 text-white relative overflow-hidden"
    >
      {/* Background Radial Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#e20000_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none"></div>

      {/* Ambient Red Glow Circles */}
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-96 h-96 rounded-full bg-red-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-96 h-96 rounded-full bg-red-600/10 blur-[120px] pointer-events-none"></div>

      {/* Continuous Flight Path Dotted Trail SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden md:block"
        viewBox="0 0 1440 320"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -100 180 C 300 80, 650 260, 1100 120 C 1300 60, 1450 140, 1550 100"
          stroke="url(#flightGrad)"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <defs>
          <linearGradient id="flightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e20000" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e20000" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated Flying Airplane with Exhaust Jetstream */}
      <div className="airplane-flight-banner">
        <div className="airplane-anim">
          {/* Contrail / Jetstream smoke line */}
          <div className="w-24 sm:w-36 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-white/80 mr-2 rounded-full"></div>

          {/* Airplane Icon with Glow */}
          <div className="relative">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600/30 blur-md absolute inset-0 -top-1 -left-1"></div>
            <i className="fa-solid fa-plane text-red-500 text-2xl sm:text-3xl drop-shadow-[0_0_12px_rgba(226,0,0,0.8)] transform -rotate-12"></i>
          </div>
        </div>
      </div>

      {/* Floating Travel Doodle Icons */}
      <div className="absolute top-8 left-[8%] text-white/15 float-slow text-2xl hidden lg:block pointer-events-none">
        <i className="fa-solid fa-compass"></i>
      </div>
      <div className="absolute bottom-6 left-[22%] text-white/15 float-reverse text-xl hidden lg:block pointer-events-none">
        <i className="fa-solid fa-paper-plane"></i>
      </div>
      <div className="absolute top-10 right-[15%] text-white/15 float-slow text-2xl hidden lg:block pointer-events-none">
        <i className="fa-solid fa-ticket"></i>
      </div>
      <div className="absolute bottom-8 right-[6%] text-white/15 float-reverse text-xl hidden lg:block pointer-events-none">
        <i className="fa-solid fa-star"></i>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/10 hover:border-red-500/40 shadow-xl hover:shadow-2xl hover:shadow-red-950/40 transition-all duration-500 flex flex-col items-center text-center group transform hover:-translate-y-1.5"
            >
              {/* Corner Glow Accent */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-red-600/10 blur-xl group-hover:bg-red-600/20 transition-all pointer-events-none"></div>

              {/* Icon Container with Pulse Glow Ring */}
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-2xl bg-red-600/20 blur-md pulse-glow-ring pointer-events-none"></div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/15 flex items-center justify-center text-2xl text-red-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all duration-300 shadow-lg relative z-10">
                  <i className={item.icon}></i>

                  {/* Miniature Accent Badge */}
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gray-950 border border-white/20 flex items-center justify-center text-[10px] text-white shadow-md group-hover:bg-white group-hover:text-red-600 transition-colors">
                    <i className={item.badgeIcon}></i>
                  </span>
                </div>
              </div>

              {/* Animated Counting Number with Gradient Typography */}
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 font-mono group-hover:text-red-400 transition-colors duration-300 flex items-center justify-center">
                <AnimatedNumber
                  target={item.target}
                  suffix={item.suffix}
                  isVisible={isVisible}
                  duration={2400}
                />
              </div>

              {/* Primary Label */}
              <h4 className="text-base font-bold text-gray-100 tracking-wide mb-1">
                {item.label}
              </h4>

              {/* Subtitle Tag */}
              <p className="text-xs text-gray-400 font-medium tracking-wider">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
