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
    title: 'Best IELTS Coaching in Bareilly - Student Success Stories',
    breadcrumbLabel: 'Best IELTS Coaching Bareilly',
    metaTitle: 'Best IELTS Coaching in Bareilly | Score 7.5+ Band | 13 Dreams',
    metaDesc:
      'Ranked #1 for Best IELTS Coaching in Bareilly. Read real student scorecards, band 7.5+ success stories, and verified reviews for certified IDP/British Council training at 13 Dreams Bareilly.',
    category: 'ielts',
    badgeLabel: 'IELTS 7.5+ Band',
    keywords: [
      'best ielts coaching in bareilly',
      'best ilts coaching',
      'best ilts coaching in bareilly',
      'ielts coaching in bareilly',
      'top ielts institute in bareilly',
      'ielts classes bareilly',
      'ielts preparation bareilly',
      'ielts band 7.5 bareilly',
    ],
  },
  pte: {
    title: 'PTE Academic Coaching Bareilly - Success Stories',
    breadcrumbLabel: 'PTE Coaching Bareilly',
    metaTitle: 'Best PTE Coaching in Bareilly | Score 65+ | 13 Dreams Consultants',
    metaDesc:
      'Discover successful PTE scores achieved by students with 13 Dreams Consultants certified Pearson PTE training in Bareilly & Khatima.',
    category: 'pte',
    badgeLabel: 'PTE 65+',
    keywords: [
      'best pte coaching in bareilly',
      'pte coaching in bareilly',
      'pte classes bareilly',
      'pearson test of english bareilly',
    ],
  },
};

import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export async function generateMetadata({ params }) {
  const { type } = await params;
  const config = storyConfig[type];
  if (!config) return { title: 'Not Found' };
  
  const canonical = getCanonicalUrl(`/story/${type}`);

  return {
    title: config.metaTitle,
    description: config.metaDesc,
    keywords: config.keywords,
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
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle,
      description: config.metaDesc,
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

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: type === 'ielts' ? 'Best IELTS Coaching in Bareilly' : 'Best PTE Coaching in Bareilly',
    description: config.metaDesc,
    provider: {
      '@type': ['EducationalOrganization', 'LocalBusiness'],
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Luthra Tower 2nd Floor C 56, Opp. LIC Office, Ekta Nagar',
        addressLocality: 'Bareilly',
        addressRegion: 'Uttar Pradesh',
        postalCode: '243005',
        addressCountry: 'IN',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Success Stories',
        item: getCanonicalUrl('/story'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: config.breadcrumbLabel,
        item: getCanonicalUrl(`/story/${type}`),
      },
    ],
  };

  return (
    <>
      <JsonLd data={[courseSchema, breadcrumbSchema]} />
      <StoryTemplate
        title={config.title}
        breadcrumbLabel={config.breadcrumbLabel}
        stories={stories}
        activeType={type}
        badgeLabel={config.badgeLabel}
      />
    </>
  );
}
