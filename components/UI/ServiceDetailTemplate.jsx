'use client';

import React, { useEffect, useRef } from 'react';
import PageBanner from '@/components/UI/PageBanner';
import HomeEnquiryForm from '@/components/Home/HomeEnquiryForm';
import Link from 'next/link';
import { servicesData } from '@/lib/seedData';

export default function ServiceDetailTemplate({
  service,
  title,
  subtitle,
  overview,
  keyOfferings = [],
  processSteps = [],
  currentSlug,
  allServices = [],
}) {
  const activeItemRef = useRef(null);

  // Support either full service object or legacy individual props
  const displayTitle = service?.title || title || 'Service Detail';
  const displaySubtitle = service?.subtitle || subtitle || '';
  const displayImage = service?.image || null;
  const displayContent = service?.content || null;
  const slug = currentSlug || service?.slug || '';

  // Use passed allServices list or fallback to seedData's servicesData
  const serviceList = allServices && allServices.length > 0 ? allServices : servicesData;

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [slug]);

  return (
    <>
      <PageBanner
        title={displayTitle}
        breadcrumbs={[
          { label: 'Services', href: '/service' },
          { label: displayTitle, href: null },
        ]}
      />

      <section className="section-space">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Content (Col 8) */}
            <div className="lg:col-span-8">
              {/* Featured Service Image */}
              {displayImage && (
                <div
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '32px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.07)',
                    border: '1px solid #f0f0f0',
                  }}
                >
                  <img
                    src={displayImage}
                    alt={displayTitle}
                    style={{
                      width: '100%',
                      maxHeight: '440px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              )}

              {/* Rich Scraped / Seeded HTML Content */}
              {displayContent ? (
                <div
                  className="service-rich-content"
                  dangerouslySetInnerHTML={{ __html: displayContent }}
                />
              ) : (
                /* Fallback for legacy static data */
                <div>
                  <div className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <h2>
                      <span>About </span>
                      <b>{displayTitle}</b>
                    </h2>
                  </div>

                  {displaySubtitle && (
                    <h4
                      style={{
                        fontSize: '17px',
                        color: '#555',
                        fontWeight: '600',
                        marginBottom: '20px',
                        lineHeight: '1.6',
                      }}
                    >
                      {displaySubtitle}
                    </h4>
                  )}

                  <p
                    style={{
                      fontSize: '15px',
                      color: '#444',
                      lineHeight: '1.8',
                      marginBottom: '25px',
                    }}
                  >
                    {overview}
                  </p>

                  {keyOfferings.length > 0 && (
                    <div style={{ marginBottom: '35px' }}>
                      <h3
                        style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#111',
                          marginBottom: '16px',
                        }}
                      >
                        What We Deliver
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {keyOfferings.map((item, idx) => (
                          <div
                            key={idx}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                          >
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: '#fff0f0',
                                color: 'var(--primary-red)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '2px',
                              }}
                            >
                              <i className="fa-solid fa-check" style={{ fontSize: '12px' }}></i>
                            </div>
                            <span style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {processSteps.length > 0 && (
                    <div
                      style={{
                        padding: '30px',
                        background: '#f9f9fb',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        marginBottom: '35px',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '19px',
                          fontWeight: '700',
                          color: '#111',
                          marginBottom: '16px',
                        }}
                      >
                        Our Step-by-Step Procedure
                      </h3>
                      <ol
                        style={{
                          paddingLeft: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          fontSize: '14px',
                          color: '#555',
                          lineHeight: '1.7',
                        }}
                      >
                        {processSteps.map((step, idx) => (
                          <li key={idx}>
                            <strong>Step {idx + 1}:</strong> {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {/* Interactive Consultation Banner */}
              <div
                style={{
                  marginTop: '45px',
                  padding: '32px',
                  background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)',
                  borderRadius: '12px',
                  border: '1px solid #fed7d7',
                  boxShadow: '0 4px 20px rgba(217, 4, 41, 0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'var(--primary-red)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '20px',
                    }}
                  >
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '8px',
                      }}
                    >
                      Need Guidance with {displayTitle}?
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#4b5563',
                        lineHeight: '1.6',
                        marginBottom: '20px',
                      }}
                    >
                      Connect with our certified counsellors at 13 Dreams Consultants. We evaluate your
                      academic profile, career ambitions, and financial readiness to build a winning study abroad roadmap.
                    </p>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                      <Link href="/contact" className="bizwheel-btn">
                        Book Free Consultation
                      </Link>
                      <a
                        href="tel:+919105533013"
                        className="bizwheel-btn theme-2"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      >
                        <i className="fa-solid fa-phone"></i> +91 91055 33013
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (Col 4) */}
            <aside className="lg:col-span-4 sticky top-28 space-y-8">
              {/* All Services Menu with Active Highlight */}
              <div
                style={{
                  background: '#ffffff',
                  padding: '28px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}
              >
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '18px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid var(--primary-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Our Services</span>
                  <span
                    style={{
                      fontSize: '12px',
                      background: '#fee2e2',
                      color: 'var(--primary-red)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontWeight: '600',
                    }}
                  >
                    {serviceList.length} Options
                  </span>
                </h4>

                <div
                  className="custom-sidebar-scroll"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    maxHeight: '420px',
                    overflowY: 'auto',
                    paddingRight: '6px',
                    scrollBehavior: 'smooth',
                  }}
                >
                  {serviceList.map((s) => {
                    const isActive = s.slug === slug;
                    return (
                      <Link
                        key={s.slug || s.id}
                        ref={isActive ? activeItemRef : null}
                        href={`/service/${s.slug}`}
                        style={{
                          padding: '12px 16px',
                          background: isActive
                            ? 'linear-gradient(135deg, #d90429 0%, #b90322 100%)'
                            : '#f9fafb',
                          color: isActive ? '#ffffff' : '#374151',
                          borderRadius: '8px',
                          border: isActive ? '1px solid #b90322' : '1px solid #e5e7eb',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '14px',
                          fontWeight: isActive ? '700' : '500',
                          transition: 'all 0.2s ease',
                          boxShadow: isActive ? '0 4px 14px rgba(217, 4, 41, 0.25)' : 'none',
                        }}
                      >
                        <span style={{ paddingRight: '8px' }}>{s.title}</span>
                        <i
                          className={`fa-solid ${
                            isActive ? 'fa-circle-chevron-right' : 'fa-chevron-right'
                          }`}
                          style={{
                            color: isActive ? '#ffffff' : '#9ca3af',
                            fontSize: '13px',
                            flexShrink: 0,
                          }}
                        ></i>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Consultation & Callback Card */}
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #101318 0%, #1c090d 40%, #2b0811 75%, #0d0f13 100%)',
                  color: '#ffffff',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(217, 4, 41, 0.25)',
                    color: '#ff6b6b',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '14px',
                  }}
                >
                  <i className="fa-solid fa-headset"></i> Certified Advisors
                </div>
                <h4
                  style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    marginBottom: '10px',
                    lineHeight: '1.3',
                  }}
                >
                  Talk with Senior Counsellor
                </h4>
                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#cbd5e1',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                  }}
                >
                  Get direct answers about course eligibility, IELTS/PTE requirements, and visa approval odds.
                </p>
                <Link
                  href="/contact"
                  className="bizwheel-btn"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    display: 'block',
                    padding: '12px 20px',
                  }}
                >
                  Contact Our Counselors
                </Link>
              </div>

              {/* Local Bareilly Office Quick Card */}
              <div
                style={{
                  background: '#f8fafc',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <h5
                  style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary-red)' }}></i>
                  Visit Bareilly Head Office
                </h5>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#64748b',
                    lineHeight: '1.5',
                    marginBottom: '14px',
                  }}
                >
                  Luthra Tower, Opp. Income Tax Office, Ekta Nagar, Bareilly, Uttar Pradesh - 243005
                </p>
                <div style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>
                  <i className="fa-regular fa-clock" style={{ marginRight: '6px', color: '#94a3b8' }}></i>
                  Mon – Sat: 10:00 AM – 6:30 PM
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Embedded Working Enquiry Form */}
      <HomeEnquiryForm />
    </>
  );
}
