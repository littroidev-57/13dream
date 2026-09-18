import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Education Fairs & Seminars | 13 Dreams Consultants',
  description:
    'Explore overseas education fairs, university delegate interaction seminars, and pre-departure briefings hosted by 13 Dreams Consultants.',
  alternates: {
    canonical: getCanonicalUrl('/events'),
  },
  openGraph: {
    title: 'Education Fairs & Seminars | 13 Dreams Consultants',
    description:
      'Join education seminars, university delegate visits, and student visa workshops.',
    url: getCanonicalUrl('/events'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

export default function EventsLayout({ children }) {
  return children;
}
