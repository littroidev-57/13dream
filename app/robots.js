import { siteConfig } from '@/lib/siteConfig';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/quick-query'],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}

