import { notFound } from 'next/navigation';
import CountryDetailTemplate from '@/components/UI/CountryDetailTemplate';
import { countryPageData } from '@/lib/pageData';

// Generate all valid country slugs at build time
export function generateStaticParams() {
  return Object.keys(countryPageData).map((slug) => ({ slug }));
}

// Dynamic metadata per country
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = countryPageData[slug];
  if (!data) return { title: 'Country Not Found' };
  return {
    title: data.metaTitle,
    description: data.metaDesc,
  };
}

export default async function StudySlugPage({ params }) {
  const { slug } = await params;
  const data = countryPageData[slug];
  if (!data) return notFound();

  return (
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
  );
}
