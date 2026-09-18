import { notFound } from 'next/navigation';
import StoryTemplate from '@/components/UI/StoryTemplate';
import dbConnect from '@/lib/dbConnect';
import SuccessStory from '@/models/SuccessStory';
import { initialSuccessStories } from '@/lib/seedData';

export function generateStaticParams() {
  return [{ type: 'ielts' }, { type: 'pte' }];
}

export const revalidate = 60;

const storyConfig = {
  ielts: {
    title: 'IELTS Success Stories',
    breadcrumbLabel: 'IELTS',
    metaTitle: 'IELTS Success Stories | 13 Dreams Consultants',
    metaDesc:
      'Read real reviews and test scores achieved by students taking IELTS coaching at 13 Dreams Consultants in Bareilly and Khatima.',
    category: 'ielts',
    badgeLabel: 'IELTS 7.5+',
  },
  pte: {
    title: 'PTE Success Stories',
    breadcrumbLabel: 'PTE',
    metaTitle: 'PTE Success Stories | 13 Dreams Consultants',
    metaDesc:
      'Discover successful PTE scores achieved by students with 13 Dreams Consultants certified Pearson PTE training.',
    category: 'pte',
    badgeLabel: 'PTE 65+',
  },
};

import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export async function generateMetadata({ params }) {
  const { type } = await params;
  const config = storyConfig[type];
  if (!config) return { title: 'Not Found' };
  
  const canonical = getCanonicalUrl(`/story/${type}`);

  return {
    title: config.metaTitle,
    description: config.metaDesc,
    alternates: {
      canonical,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDesc,
      url: canonical,
      siteName: siteConfig.siteName,
      type: 'website',
    },
  };
}

export default async function StoryTypePage({ params }) {
  const { type } = await params;
  const config = storyConfig[type];
  if (!config) return notFound();

  let stories = [];
  try {
    await dbConnect();
    const docs = await SuccessStory.find({ category: type }).sort({ createdAt: -1 }).lean();
    if (docs && docs.length > 0) {
      stories = JSON.parse(JSON.stringify(docs));
    }
  } catch (err) {
    console.warn('MongoDB fetch error, falling back to seed stories:', err.message);
  }

  if (stories.length === 0) {
    stories = initialSuccessStories.filter((s) => s.category === type);
  }

  return (
    <StoryTemplate
      title={config.title}
      breadcrumbLabel={config.breadcrumbLabel}
      stories={stories}
      activeType={type}
      badgeLabel={config.badgeLabel}
    />
  );
}
