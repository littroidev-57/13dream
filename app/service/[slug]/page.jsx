import { notFound } from 'next/navigation';
import ServiceDetailTemplate from '@/components/UI/ServiceDetailTemplate';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/Service';
import { servicePageData } from '@/lib/pageData';
import { servicesData } from '@/lib/seedData';
import fs from 'fs';
import path from 'path';

// Helper to load scraped backup if DB is not populated
function getScrapedFallback(slug) {
  try {
    const filePath = path.join(process.cwd(), 'lib/servicesScraped.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (slug) {
        return data.find((s) => s.slug === slug) || null;
      }
      return data;
    }
  } catch (err) {
    console.error('Error reading servicesScraped.json:', err.message);
  }
  return null;
}

// Fetch single service by slug
async function getService(slug) {
  try {
    await dbConnect();
    const service = await Service.findOne({ slug }).lean();
    if (service) {
      return JSON.parse(JSON.stringify(service));
    }
  } catch (err) {
    console.warn(`[getService] DB query failed for slug "${slug}":`, err.message);
  }

  // Fallback 1: Scraped data with full HTML content
  const scraped = getScrapedFallback(slug);
  if (scraped) return scraped;

  // Fallback 2: Static pageData
  const legacy = servicePageData[slug];
  if (legacy) {
    return {
      title: legacy.title,
      slug,
      subtitle: legacy.subtitle,
      metaTitle: legacy.metaTitle,
      metaDesc: legacy.metaDesc,
      overview: legacy.overview,
      keyOfferings: legacy.keyOfferings,
      processSteps: legacy.processSteps,
    };
  }

  return null;
}

// Fetch all services for sidebar & static generation
async function getAllServices() {
  try {
    await dbConnect();
    const list = await Service.find({}, 'title slug subtitle image order')
      .sort({ order: 1 })
      .lean();
    if (list && list.length > 0) {
      return JSON.parse(JSON.stringify(list));
    }
  } catch (err) {
    console.warn('[getAllServices] DB query failed:', err.message);
  }

  // Fallback 1: Scraped data
  const scrapedList = getScrapedFallback();
  if (scrapedList && scrapedList.length > 0) {
    return scrapedList.map((s) => ({
      title: s.title,
      slug: s.slug,
      subtitle: s.subtitle,
      image: s.localImage || s.image,
    }));
  }

  // Fallback 2: seedData
  return servicesData;
}

// Generate all valid service slugs at build time
export async function generateStaticParams() {
  const allServices = await getAllServices();
  return allServices.map((s) => ({ slug: s.slug }));
}

// Dynamic metadata per service
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return { title: 'Service Not Found | 13 Dreams Consultants' };
  }

  return {
    title: service.metaTitle || `${service.title} | 13 Dreams Consultants`,
    description:
      service.metaDesc ||
      service.subtitle ||
      `Professional ${service.title} services by 13 Dreams Consultants Bareilly.`,
    openGraph: {
      title: service.metaTitle || `${service.title} | 13 Dreams Consultants`,
      description: service.metaDesc || service.subtitle,
      images: service.image ? [service.image] : [],
    },
  };
}

export default async function ServiceSlugPage({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return notFound();
  }

  const allServices = await getAllServices();

  return (
    <ServiceDetailTemplate
      service={service}
      currentSlug={slug}
      allServices={allServices}
      // Support legacy props if present
      title={service.title}
      subtitle={service.subtitle}
      overview={service.overview}
      keyOfferings={service.keyOfferings}
      processSteps={service.processSteps}
    />
  );
}
