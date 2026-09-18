import React from 'react';
import Link from 'next/link';
import JsonLd from './JsonLd';
import { siteConfig } from '@/lib/siteConfig';

/**
 * Breadcrumb component that renders an accessible breadcrumb trail
 * and injects BreadcrumbList JSON-LD schema for search engines.
 * 
 * @param {{ items: Array<{ label: string, href?: string | null }> }} props
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  const fullTrail = [{ label: 'Home', href: '/' }, ...items];

  // Schema.org BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullTrail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteConfig.siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-gray-500 py-3">
        <ol className="flex flex-wrap items-center gap-1.5 list-none m-0 p-0">
          {fullTrail.map((item, idx) => {
            const isLast = idx === fullTrail.length - 1;
            return (
              <li key={idx} className="inline-flex items-center gap-1.5">
                {idx > 0 && <span className="text-gray-400 select-none">/</span>}
                {isLast || !item.href ? (
                  <span className="font-semibold text-gray-800" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
