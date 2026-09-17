import React from 'react';
import PageBanner from '@/components/UI/PageBanner';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { initialBlogs } from '@/lib/seedData';

async function getBlog(slug) {
  try {
    await dbConnect();
    let blog = await Blog.findOne({ slug }).lean();
    if (blog) return JSON.parse(JSON.stringify(blog));
  } catch (err) {
    console.warn('DB search failed, using seedData:', err.message);
  }

  const fallback = initialBlogs.find((b) => b.slug === slug);
  return fallback || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: 'Article Not Found | 13 Dreams Consultants' };
  }

  return {
    title: `${blog.title} | 13 Dreams Consultants`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const otherBlogs = initialBlogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <PageBanner
        title={blog.title}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: blog.category || 'Article', href: null },
        ]}
      />

      <section className="section-space">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
            {/* Article Main Content */}
            <article>
              <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: '100%', maxHeight: '460px', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#888', fontSize: '13px', marginBottom: '20px' }}>
                <span><i className="fa-regular fa-calendar-days" style={{ marginRight: '5px', color: 'var(--primary-red)' }}></i> {new Date(blog.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span><i className="fa-solid fa-tag" style={{ marginRight: '5px', color: 'var(--primary-red)' }}></i> {blog.category}</span>
                <span>•</span>
                <span><i className="fa-solid fa-user" style={{ marginRight: '5px', color: 'var(--primary-red)' }}></i> 13 Dreams Editorial</span>
              </div>

              <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111', lineHeight: '1.4', marginBottom: '25px' }}>
                {blog.title}
              </h1>

              <div
                style={{ fontSize: '15px', color: '#444', lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <div style={{ marginTop: '50px', padding: '30px', background: '#f9f9fb', borderRadius: '8px', borderLeft: '4px solid var(--primary-red)' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Planning to Study Abroad?</h4>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                  Speak directly with an accredited counselor to receive customized shortlisting of colleges, fees estimate, and visa requirements.
                </p>
                <Link href="/contact" className="bizwheel-btn">
                  Book Free Counseling Session
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div style={{ background: '#f9f9fb', padding: '30px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '30px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#111', marginBottom: '20px', borderBottom: '2px solid var(--primary-red)', paddingBottom: '8px' }}>
                  Related Articles
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {otherBlogs.map((b, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px' }}>
                      <img
                        src={b.image}
                        alt={b.title}
                        style={{ width: '65px', height: '60px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                      />
                      <div>
                        <h6 style={{ fontSize: '13px', fontWeight: '600', lineHeight: '1.4', marginBottom: '4px' }}>
                          <Link href={`/blog/${b.slug}`} style={{ color: '#222' }}>
                            {b.title}
                          </Link>
                        </h6>
                        <span style={{ fontSize: '11px', color: '#888' }}>
                          {new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Query Widget */}
              <div style={{ background: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)', color: '#fff', padding: '30px', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>Have Any Query?</h4>
                <p style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
                  Drop your details and our team will get in touch to assist with admissions and visa filing.
                </p>
                <Link href="/#enquiry-form" className="bizwheel-btn" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Enquire Now
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
