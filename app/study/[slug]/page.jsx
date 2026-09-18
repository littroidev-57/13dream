import { notFound } from 'next/navigation';
import CountryDetailTemplate from '@/components/UI/CountryDetailTemplate';
import JsonLd from '@/components/SEO/JsonLd';
import { countryPageData } from '@/lib/pageData';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

// Generate all valid country slugs at build time
export function generateStaticParams() {
  return Object.keys(countryPageData).map((slug) => ({ slug }));
}

// Dynamic metadata per country
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = countryPageData[slug];
  if (!data) return { title: 'Country Not Found' };
  
  const canonical = getCanonicalUrl(`/study/${slug}`);

  return {
    title: data.metaTitle,
    description: data.metaDesc,
    alternates: {
      canonical,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDesc,
      url: canonical,
      siteName: siteConfig.siteName,
      type: 'article',
      images: [
        {
          url: data.bannerImg,
          width: 1200,
          height: 630,
          alt: `Study in ${data.countryName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDesc,
      images: [data.bannerImg],
    },
  };
}

export default async function StudySlugPage({ params }) {
  const { slug } = await params;
  const data = countryPageData[slug];
  if (!data) return notFound();

  const canonicalUrl = getCanonicalUrl(`/study/${slug}`);

  // Schema.org Breadcrumbs & Educational Program
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
        name: 'Countries',
        item: getCanonicalUrl('/countries'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Study in ${data.countryName}`,
        item: canonicalUrl,
      },
    ],
  };

  const programSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: `Higher Education in ${data.countryName}`,
    description: data.overview,
    provider: {
      '@type': 'EducationalOrganization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    educationalProgramMode: 'full-time',
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={programSchema} />
      <CountryDetailTemplate
        countryName={data.countryName}
        tagline={data.tagline}
        bannerImg={data.bannerImg}
        overview={data.overview}
        whyStudyPoints={data.whyStudyPoints}
        topUniversities={data.topUniversities}
        visaFacts={data.visaFacts}
        currentSlug={slug}
      />
    </>
  );
}
