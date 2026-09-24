import React from 'react';
import PageBanner from '@/components/UI/PageBanner';
import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { initialBlogs } from '@/lib/seedData';
import { siteConfig, getCanonicalUrl } from '@/lib/siteConfig';

export const metadata = {
  title: 'Blog & Study Abroad News | 13 Dreams Consultants',
  description:
    'Stay updated with latest study visa policies, European PR options, IELTS/PTE preparation tips, and overseas university updates.',
  alternates: {
    canonical: getCanonicalUrl('/blog'),
  },
  openGraph: {
    title: 'Blog & Study Abroad News | 13 Dreams Consultants',
    description:
      'Latest insights on student visas, university rankings, and scholarship announcements.',
    url: getCanonicalUrl('/blog'),
    siteName: siteConfig.siteName,
    type: 'website',
  },
};

async function getBlogs() {
  try {
    await dbConnect();
    let blogs = await Blog.find({}).sort({ publishedAt: -1 }).lean();
    if (!blogs || blogs.length === 0) {
      return initialBlogs;
    }
    return JSON.parse(JSON.stringify(blogs));
  } catch (err) {
    console.warn('DB connect error, using initial blogs fallback:', err.message);
    return initialBlogs;
  }
}

export default async function BlogListingPage({ searchParams }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const searchQuery = resolvedParams?.s ? String(resolvedParams.s).trim().toLowerCase() : '';
  const allBlogs = await getBlogs();

  const blogs = searchQuery
    ? allBlogs.filter((b) =>
        b.title?.toLowerCase().includes(searchQuery) ||
        b.excerpt?.toLowerCase().includes(searchQuery) ||
        b.category?.toLowerCase().includes(searchQuery)
      )
    : allBlogs;

  return (
    <>
      <PageBanner
        title="Blog &amp; News"
        breadcrumbs={[{ label: 'Blog', href: null }]}
      />

      <section className="section-space">
        <div className="container">
          <div className="section-title text-center mb-10">
            <h2>
              {searchQuery ? (
                <>
                  <span>Search Results for </span>
                  <b>&ldquo;{resolvedParams.s}&rdquo;</b>
                </>
              ) : (
                <>
                  <span>Latest </span>
                  <b>Articles &amp; Updates</b>
                </>
              )}
            </h2>
            {searchQuery && (
              <div className="mt-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full transition-colors"
                >
                  ✕ Clear search &amp; view all {allBlogs.length} articles
                </Link>
              </div>
            )}
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 p-8 max-w-lg mx-auto">
              <p className="text-gray-600 font-medium mb-4">No articles found matching &ldquo;{resolvedParams.s}&rdquo;.</p>
              <Link
                href="/blog"
                className="inline-block px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors shadow-sm"
              >
                View all articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((blog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="h-52 sm:h-56 w-full overflow-hidden bg-gray-100 relative">
                  <Link href={`/blog/${blog.slug}`} className="block w-full h-full">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {blog.category || 'Study Abroad'}
                  </span>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <i className="fa-regular fa-clock text-red-500"></i>
                      <span>
                        {new Date(blog.publishedAt || Date.now()).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug mb-3">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-red-600 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Full Article</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
