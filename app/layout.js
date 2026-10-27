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
    default: 'Best Visa Filing in Bareilly & Best IELTS Coaching | 13 Dreams Consultants',
    template: '%s | 13 Dreams Consultants',
  },
  description:
    'Ranked #1 for Best Visa Filing in Bareilly and Best IELTS Coaching. 13 Dreams Consultants at Luthra Tower, Ekta Nagar, Bareilly provides 99% visa grant rate for Canada, UK, Australia, USA, Germany, Malta & Europe with certified IDP/British Council trainers.',
  keywords: [
    'Best Visa Filing in Bareilly',
    'Visa Filing in Bareilly',
    'Best Study Visa Filing in Bareilly',
    'Best IELTS Coaching in Bareilly',
    'Best ILTS Coaching',
    'Best ILTS Coaching in Bareilly',
    'IELTS Coaching in Bareilly',
    'Top IELTS Coaching Institute Bareilly',
    'Best PTE Coaching in Bareilly',
    'Study Visa Consultants in Bareilly',
    'Best Study Abroad Consultants in Bareilly',
    'Apply for Student Visa Online',
    'Canada Visa Filing in Bareilly',
    'Australia Student Visa Filing Bareilly',
    'UK Student Visa Filing Bareilly',
    'USA F1 Student Visa Filing Bareilly',
    'Germany Student Visa Bareilly',
    'Malta Schengen Student Visa Bareilly',
    'Overseas Education Consultant Khatima',
    '13 Dreams Consultants Bareilly',
    'Best Overseas Education Agency Bareilly',
  ],
  authors: [{ name: siteConfig.siteName, url: siteConfig.siteUrl }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: 'Best Visa Filing in Bareilly & Best IELTS Coaching | 13 Dreams Consultants',
    description:
      'Ranked #1 for Best Visa Filing in Bareilly & Best IELTS Coaching. 15+ years experience, 150+ partner universities across UK, Canada, Australia, USA, Germany & Europe with 99% visa grant rate.',
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    images: [
      {
        url: `${siteConfig.siteUrl}/img/13dreamsconsultants-main.webp`,
        width: 1200,
        height: 630,
        alt: '13 Dreams Consultants - Best Visa Filing in Bareilly & IELTS Coaching',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Visa Filing in Bareilly & Best IELTS Coaching | 13 Dreams',
    description:
      'End-to-end university admissions, student visa filing, and certified IELTS coaching in Bareilly with 99% visa success rate.',
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
    logo: `${siteConfig.siteUrl}/img/logo.webp`,
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
    knowsAbout: [
      'Best Visa Filing in Bareilly',
      'Best IELTS Coaching in Bareilly',
      'Best ILTS Coaching',
      'Study Abroad Guidance',
      'Overseas University Admissions',
      'Student Visa Consultation',
      'Study in Canada',
      'Study in Australia',
      'Study in United Kingdom',
      'Study in United States',
      'Study in Germany',
      'Study in Malta',
      'Study in Singapore',
      'Study in Netherlands',
      'Study in New Zealand',
      'Study in Ireland',
      'Study in Switzerland',
      'IELTS Preparation',
      'PTE Coaching',
      'Zoekjaar Orientation Year Visa',
      'Schengen Student Visa',
      'ICA Solar Student Pass',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Visa Filing and Language Coaching Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Best Visa Filing in Bareilly',
            description: 'Accredited student visa filing and immigration guidance for Canada, UK, Australia, USA, and Europe with a 99% visa success rate.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Best IELTS Coaching in Bareilly',
            description: 'British Council & IDP certified master trainers, 1-on-1 speaking mock tests, and band 7.5+ preparation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'PTE Academic Coaching in Bareilly',
            description: 'AI-scored computer lab practice, official Pearson material, and rapid 65+ score target preparation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Study Abroad Profile Evaluation & University Admissions',
            description: 'Zero consultation fee profile assessment with 150+ international partner universities across 50+ countries.',
          },
        },
      ],
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Bareilly' },
      { '@type': 'AdministrativeArea', name: 'Ekta Nagar, Bareilly' },
      { '@type': 'AdministrativeArea', name: 'Civil Lines, Bareilly' },
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
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Bareilly" />
        <meta name="geo.position" content="28.3670;79.4304" />
        <meta name="ICBM" content="28.3670, 79.4304" />
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
