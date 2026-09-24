'use client';

import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import SidebarPopup from './SidebarPopup';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';

export default function HeaderWrapper() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          // Use wide hysteresis deadband (60px vs 15px) to eliminate any boundary jitter
          setIsScrolled((prev) => {
            if (sy > 60 && !prev) return true;
            if (sy < 15 && prev) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top utility bar (phone, email, socials) scrolls naturally with document flow - no unmount glitches! */}
      <Topbar
        onOpenSidebar={() => setSidebarOpen(true)}
        onToggleSearch={() => setSearchOpen(!searchOpen)}
      />

      {/* Permanently Sticky Header: Red Announcement Bar + Main Navbar */}
      <header
        className="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 9999,
          width: '100%',
          backgroundColor: '#ffffff',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Red Announcement Bar (Red Line) stays permanently fixed at top: 0 on scroll */}
        <AnnouncementBar />

        {/* Main Navbar */}
        <Navbar onToggleMobileNav={() => setMobileMenuOpen(true)} isScrolled={isScrolled} />
      </header>

      <SidebarPopup isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
