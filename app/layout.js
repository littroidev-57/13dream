import './globals.css';
import LayoutChrome from '@/components/UI/LayoutChrome';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig } from '@/lib/siteConfig';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'Best Study Abroad Consultants in India | 13 Dreams Consultants',
    template: '%s',
  },
  description:
    'Get expert guidance from 13 Dreams Consultants, India\'s trusted overseas education and study visa specialists. Comprehensive guidance for Canada, UK, USA, Australia, and Europe.',
  keywords: [
    'Study Abroad Consultants',
    'Overseas Education Consultants',
    'Student Visa Guidance',
    'Study Abroad Consultants in Bareilly',
    'Study Visa Consultants in Bareilly',
    'Best Study Visa Agency Bareilly',
    'Overseas Education Consultant Khatima',
    'Study in Canada Consultant Bareilly',
    'Study in Australia Student Visa',
    'Study in UK Consultants',
    'Study in USA Student Visa',
    'Study in Germany Free Education',
    'IELTS Coaching in Bareilly',
    'PTE Training Centre Bareilly',
    'Visa Application Assistance Online',
    '13 Dreams Consultants',
  ],
  authors: [{ name: siteConfig.siteName, url: siteConfig.siteUrl }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: '13 Dreams Consultants Private Limited | Study Abroad & Visa Experts',
    description:
      'Trusted Study Abroad & Student Visa Consultants in Bareilly and Khatima. Assisting Indian students with global admissions to Canada, Australia, UK, USA, and Europe.',
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    images: [
      {
        url: `${siteConfig.siteUrl}/img/13dreamsconsultants-main.webp`,
        width: 1200,
        height: 630,
        alt: '13 Dreams Consultants - Best Study Abroad Advisors',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '13 Dreams Consultants | Study Abroad & Visa Guidance',
    description:
      'End-to-end university admissions, scholarships, and student visa guidance with a 99% visa success rate.',
    images: [`${siteConfig.siteUrl}/img/13dreamsconsultants-main.webp`],
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/icon.png' }],
  },
};

export default function RootLayout({ children }) {
  // Organization & LocalBusiness JSON-LD for Rich Snippets (4.9 Stars on Google)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.siteName,
    alternateName: siteConfig.shortName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/img/13d-logo.webp`,
    image: `${siteConfig.siteUrl}/img/13dreamsconsultants-main.webp`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '₹0 - Free Consultation',
    founder: {
      '@type': 'Person',
      name: siteConfig.director,
    },
    foundingDate: '2011',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '482',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Bareilly' },
      { '@type': 'AdministrativeArea', name: 'Khatima' },
      { '@type': 'AdministrativeArea', name: 'Pilibhit' },
      { '@type': 'AdministrativeArea', name: 'Moradabad' },
      { '@type': 'AdministrativeArea', name: 'Rampur' },
      { '@type': 'AdministrativeArea', name: 'Haldwani' },
      { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
      { '@type': 'AdministrativeArea', name: 'Uttarakhand' },
      { '@type': 'Country', name: 'India' },
    ],
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.youtube,
      siteConfig.socials.facebook,
    ],
    address: siteConfig.offices.map((office) => ({
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress,
      addressLocality: office.addressLocality,
      addressRegion: office.addressRegion,
      postalCode: office.postalCode,
      addressCountry: office.addressCountry,
    })),
    geo: siteConfig.offices.map((office) => ({
      '@type': 'GeoCoordinates',
      latitude: office.latitude,
      longitude: office.longitude,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:30',
        closes: '18:30',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.siteName,
    description: siteConfig.tagline,
    publisher: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.siteUrl}/universities?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body id="bg">
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
