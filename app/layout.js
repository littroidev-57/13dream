import './globals.css';
import LayoutChrome from '@/components/UI/LayoutChrome';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig } from '@/lib/siteConfig';

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
    'Study in Canada',
    'Study in UK',
    'Study in Australia',
    'Study in USA',
    'Study in Germany',
    'IELTS Coaching',
    'PTE Training',
    'Study Abroad Consultants in Bareilly',
    'Study Visa Consultants in Bareilly',
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
  // Organization & LocalBusiness JSON-LD
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.siteName,
    alternateName: siteConfig.shortName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/img/13d-logo.webp`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    founder: {
      '@type': 'Person',
      name: siteConfig.director,
    },
    foundingDate: '2011',
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
  };

  return (
    <html lang="en">
      <head>
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
