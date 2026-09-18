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

export default async function BlogListingPage() {
  const blogs = await getBlogs();

  return (
    <>
      <PageBanner
        title="Blog &amp; News"
        breadcrumbs={[{ label: 'Blog', href: null }]}
      />

      <section className="section-space">
        <div className="container">
          <div className="section-title text-center">
            <h2>
              <span>Latest </span>
              <b>Articles &amp; Updates</b>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '35px' }}>
            {blogs.map((blog, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 25px rgba(0,0,0,0.06)',
                  border: '1px solid #eee',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
                  <Link href={`/blog/${blog.slug}`}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Link>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                    <span><i className="fa-regular fa-clock" style={{ marginRight: '5px' }}></i> {new Date(blog.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--primary-red)', fontWeight: '600' }}>{blog.category || 'Study Abroad'}</span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#222', lineHeight: '1.4', marginBottom: '12px' }}>
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p style={{ fontSize: '13.5px', color: '#666', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>
                    {blog.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto' }}>
                    <Link
                      href={`/blog/${blog.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: '700',
                        fontSize: '13.5px',
                        color: 'var(--primary-red)',
                      }}
                    >
                      Read Full Article <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
