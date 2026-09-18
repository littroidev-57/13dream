'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from '@/components/UI/WhatsAppButton';
import JourneyCtaBanner from '@/components/UI/JourneyCtaBanner';

export default function LayoutChrome({ children }) {
  const pathname = usePathname();
  const isApplyPage = pathname === '/apply' || pathname?.startsWith('/apply');

  if (isApplyPage) {
    return (
      <div id="page" className="site min-h-screen bg-[#f6f8fa]">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div id="page" className="site">
      <HeaderWrapper />
      <main>{children}</main>
      <JourneyCtaBanner />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
