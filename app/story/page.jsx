import StoryTemplate from '@/components/UI/StoryTemplate';
import { instagramReelsData } from '@/lib/instagramReelsData';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Visa Success Stories (Instagram Reels) | 13 Dreams Consultants',
  description:
    'Watch real student celebrations, visa handover moments, and study visa grant reels directly from 13 Dreams Consultants Instagram.',
  alternates: {
    canonical: getCanonicalUrl('/story'),
  },
  openGraph: {
    title: 'Visa Success Stories | 13 Dreams Consultants',
    description:
      'Real student visa approvals, happiness moments, and visa grant celebrations from 13 Dreams Consultants.',
    url: getCanonicalUrl('/story'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

export const revalidate = 60;

export default async function VisaSuccessStoriesPage() {
  return (
    <StoryTemplate
      title="Visa Success Stories"
      breadcrumbLabel={null}
      stories={instagramReelsData}
      activeType="visa"
      badgeLabel={null}
    />
  );
}
