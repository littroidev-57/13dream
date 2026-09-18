import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Contact 13 Dreams Consultants | Bareilly & Khatima Offices',
  description:
    'Contact 13 Dreams Consultants for expert overseas education and student visa guidance. Visit our Bareilly or Khatima branches or reach us by phone and WhatsApp.',
  alternates: {
    canonical: getCanonicalUrl('/contact'),
  },
  openGraph: {
    title: 'Contact 13 Dreams Consultants | Study Abroad Guidance',
    description:
      'Reach our certified counselors in Bareilly and Khatima for free university counseling and student visa assistance.',
    url: getCanonicalUrl('/contact'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

export default function ContactLayout({ children }) {
  return children;
}
