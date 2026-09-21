import { servicesData, initialBlogs } from '@/lib/seedData';
import { countryPageData } from '@/lib/pageData';
import { siteConfig } from '@/lib/siteConfig';

export default function sitemap() {
  const baseUrl = siteConfig.siteUrl;

  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/apply', priority: 1.0, changeFrequency: 'daily' },
    { path: '/study-abroad', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/student-visa', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/universities', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/courses', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/countries', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/service', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/story', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/story/ielts', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/story/pte', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
    { path: '/events', priority: 0.7, changeFrequency: 'monthly' },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // /study/[slug]
  const countryRoutes = Object.keys(countryPageData).map((slug) => ({
    url: `${baseUrl}/study/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // /service/[slug]
  const serviceRoutes = servicesData.map((s) => ({
    url: `${baseUrl}/service/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // /blog/[slug]
  const blogRoutes = initialBlogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...countryRoutes, ...serviceRoutes, ...blogRoutes];
}

