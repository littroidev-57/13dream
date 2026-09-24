import React from 'react';
import PageBanner from '@/components/UI/PageBanner';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { initialBlogs } from '@/lib/seedData';
import JsonLd from '@/components/SEO/JsonLd';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

async function getBlog(slug) {
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();
  try {
    await dbConnect();
    let blog = await Blog.findOne({
      $or: [
        { slug: slug },
        { slug: cleanSlug },
        { slug: new RegExp(`^${cleanSlug}$`, 'i') }
      ]
    }).lean();
    if (blog) return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    console.warn('DB search failed, using seedData:', err.message);
  }

  const fallback = initialBlogs.find(
    (b) =>
      b.slug === slug ||
      b.slug === cleanSlug ||
      (b.originalSlug && b.originalSlug.toLowerCase() === cleanSlug) ||
      (b.slug && b.slug.toLowerCase() === cleanSlug)
  );
  return fallback || null;
}

export async function generateStaticParams() {
  return initialBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: 'Article Not Found | 13 Dreams Consultants' };
  }

  const canonical = getCanonicalUrl(`/blog/${slug}`);

  return {
    title: `${blog.title} | 13 Dreams Consultants`,
    description: blog.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: canonical,
      siteName: siteConfig.siteName,
      type: 'article',
      publishedTime: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined,
      images: blog.image ? [{ url: blog.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const otherBlogs = initialBlogs.filter((b) => b.slug !== slug).slice(0, 4);
  const canonicalUrl = getCanonicalUrl(`/blog/${slug}`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    datePublished: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
      logo: `${siteConfig.siteUrl}/img/13d-logo.webp`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
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
        name: 'Blog',
        item: getCanonicalUrl('/blog'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageBanner
        title={blog.title}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: blog.category || 'Article', href: null },
        ]}
      />

      <section className="section-space">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Article Main Content (Col 8) */}
            <article className="lg:col-span-8 space-y-6">
              {/* Featured Banner Image */}
              {blog.image && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 sm:h-72 md:h-96 object-cover"
                  />
                </div>
              )}

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 pb-2 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <i className="fa-regular fa-calendar-days text-red-500"></i>
                  {new Date(blog.publishedAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-tag text-red-500"></i>
                  <span className="font-semibold text-gray-700">{blog.category || 'Education'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-user-pen text-red-500"></i>
                  <span>13 Dreams Editorial</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {blog.title}
              </h1>

              {/* Body HTML content */}
              <div
                className="blog-article-content pt-2"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Callout Action Banner */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-red-50/90 via-white to-orange-50/60 border border-red-100 shadow-sm mt-10">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider bg-red-100/80 px-2.5 py-1 rounded-md inline-block mb-3">
                  13 Dreams Study Abroad Guidance
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Planning to Study Abroad?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Speak directly with an accredited counselor to receive customized shortlisting of colleges, fees estimate, scholarship options, and student visa filing assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/apply"
                    className="bizwheel-btn text-center justify-center flex items-center gap-2 !py-3 !px-6"
                  >
                    <span>Start Your Free Application</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </Link>
                  <a
                    href="https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20read%20your%20article%20and%20need%20study%20visa%20guidance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 text-sm font-semibold transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <i className="fa-brands fa-whatsapp text-base text-[#25D366]"></i>
                    <span>WhatsApp Counselor</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar (Col 4) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 w-full">
              {/* Related Articles Card */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-red-600 flex items-center justify-between">
                  <span>Related Articles</span>
                  <i className="fa-solid fa-newspaper text-red-500 text-xs"></i>
                </h4>
                <div className="flex flex-col gap-4">
                  {otherBlogs.map((b, i) => (
                    <Link
                      key={i}
                      href={`/blog/${b.slug}`}
                      className="flex items-start gap-3 group p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h6 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1">
                          {b.title}
                        </h6>
                        <span className="text-[11px] text-gray-400">
                          {new Date(b.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Have Any Query? Dark Card */}
              <div className="bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-950 text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-slate-800">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                  <i className="fa-solid fa-headset text-xs"></i>
                  <span>Free Evaluation</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Have Any Questions?</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Drop your details and our senior counseling team will reach out with genuine admission &amp; visa guidance.
                </p>
                <div className="space-y-2.5">
                  <Link
                    href="/apply"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold text-xs shadow-md bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 transition-all text-center"
                  >
                    <span>Apply Online Now</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                  <a
                    href="https://wa.me/919759053463?text=Hi%2013%20Dreams%2C%20I%20have%20an%20inquiry%20regarding%20study%20visa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25 font-semibold text-xs transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp text-sm"></i>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Office Details Card */}
              <div className="bg-gray-50/90 p-5 rounded-2xl border border-gray-200/80 text-xs text-gray-600 space-y-2">
                <div className="font-bold text-gray-900 flex items-center gap-2 text-xs">
                  <i className="fa-solid fa-location-dot text-red-600"></i>
                  <span>13 Dreams Consultants</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Bareilly (UP) &amp; Khatima (Uttarakhand) centers. Call{' '}
                  <a href="tel:9759053463" className="font-semibold text-red-600 hover:underline">
                    +91 9759053463
                  </a>{' '}
                  or{' '}
                  <a href="tel:9520667842" className="font-semibold text-red-600 hover:underline">
                    +91 9520667842
                  </a>.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
