import React from 'react';
import PageBanner from '@/components/UI/PageBanner';
import Link from 'next/link';
import { destinationsData } from '@/lib/seedData';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Top Study Abroad Countries | 13 Dreams Consultants',
  description:
    'Explore study abroad destinations worldwide with 13 Dreams Consultants: Canada, Australia, United Kingdom, USA, New Zealand, Germany, Malta, and Singapore.',
  alternates: {
    canonical: getCanonicalUrl('/countries'),
  },
  openGraph: {
    title: 'Top Study Abroad Countries | 13 Dreams Consultants',
    description:
      'Compare global overseas education destinations by work permits, university rankings, and tuition costs.',
    url: getCanonicalUrl('/countries'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

export default function CountriesPage() {
  return (
    <>
      <PageBanner
        title="Study Destinations"
        breadcrumbs={[{ label: 'Countries', href: null }]}
      />

      <section className="section-space">
        <div className="container">
          <div className="section-title text-center mb-8">
            <h2>
              <span>Choose Your </span>
              <b>Dream Destination</b>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinationsData.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    title={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <i className="fa-solid fa-graduation-cap text-red-400 text-xs"></i>
                    <span>Top Choice</span>
                  </div>
                </div>

                <Link
                  href={`/study/${dest.id}`}
                  className="p-5 flex flex-col flex-1 justify-between"
                >
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                      {dest.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-red-600 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <span>Explore Destination</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
