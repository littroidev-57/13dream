'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from '@/components/UI/WhatsAppButton';
import AICounselorWidget from '@/components/UI/AICounselorWidget';
import EMagazineBadge from '@/components/UI/EMagazineBadge';
import JourneyCtaBanner from '@/components/UI/JourneyCtaBanner';

import ToastProvider from '@/components/UI/ToastProvider';
import MobileBottomBar from '@/components/UI/MobileBottomBar';

export default function LayoutChrome({ children }) {
  const pathname = usePathname();
  const isApplyPage = pathname === '/apply' || pathname?.startsWith('/apply');
  const isMagazinePage = pathname === '/e-magazine' || pathname?.startsWith('/e-magazine') || pathname === '/e-books';

  if (isApplyPage) {
    return (
      <div id="page" className="site min-h-screen bg-[#f6f8fa] pb-14 md:pb-0">
        <ToastProvider />
        <main>{children}</main>
        <EMagazineBadge />
        <AICounselorWidget />
        <MobileBottomBar />
      </div>
    );
  }

  if (isMagazinePage) {
    return (
      <div id="page" className="site bg-[#f8f9fa] min-h-screen pb-14 md:pb-0">
        <ToastProvider />
        <HeaderWrapper />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomBar />
      </div>
    );
  }

  return (
    <div id="page" className="site pb-14 md:pb-0">
      <ToastProvider />
      <HeaderWrapper />
      <main>{children}</main>
      <JourneyCtaBanner />
      <Footer />
      <EMagazineBadge />
      <WhatsAppButton />
      <AICounselorWidget />
      <MobileBottomBar />
    </div>
  );
}
