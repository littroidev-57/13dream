import { destinationsData, servicesData, initialBlogs } from '@/lib/seedData';
import { countryPageData } from '@/lib/pageData';

export default function sitemap() {
  const baseUrl = 'https://13dreamsconsultants.com';

  const staticRoutes = [
    '',
    '/about-us',
    '/service',
    '/countries',
    '/story',
    '/story/ielts',
    '/story/pte',
    '/blog',
    '/contact',
    '/quick-query',
    '/events',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // /study/[slug] — uses country id keys e.g. /study/australia
  const countryRoutes = Object.keys(countryPageData).map((slug) => ({
    url: `${baseUrl}/study/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // /service/[slug] — uses service slugs e.g. /service/comprehensive-counselling
  const serviceRoutes = servicesData.map((s) => ({
    url: `${baseUrl}/service/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogRoutes = initialBlogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...countryRoutes, ...serviceRoutes, ...blogRoutes];
}
