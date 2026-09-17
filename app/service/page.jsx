import React from 'react';
import PageBanner from '@/components/UI/PageBanner';
import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/Service';
import { servicesData } from '@/lib/seedData';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Our Overseas Education & Visa Services | 13 Dreams Consultants',
  description:
    'Explore the full suite of overseas education services by 13 Dreams Consultants: course counseling, university admissions, visa processing, scholarships, and pre-departure assistance.',
};

async function getServices() {
  try {
    await dbConnect();
    const services = await Service.find({}, 'title slug subtitle image order')
      .sort({ order: 1 })
      .lean();
    if (services && services.length > 0) {
      return JSON.parse(JSON.stringify(services));
    }
  } catch (err) {
    console.warn('[ServicesListingPage] DB error, falling back to local file:', err.message);
  }

  try {
    const filePath = path.join(process.cwd(), 'lib/servicesScraped.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return data;
    }
  } catch (err) {
    console.warn('[ServicesListingPage] Failed reading servicesScraped.json:', err.message);
  }

  return servicesData;
}

// Icon mapping helper
const iconMap = {
  'comprehensive-counselling': 'fa-podcast',
  'application-processing': 'fa-file-lines',
  'advice-on-program-selection': 'fa-graduation-cap',
  'assistance-with-scholarship-applications': 'fa-award',
  'advice-on-student-visas': 'fa-passport',
  'pre-departure-assistance': 'fa-plane-departure',
  'value-added-services': 'fa-handshake',
  'visa-counseling': 'fa-comments',
  'visa-processing': 'fa-stamp',
  'admission-assistance': 'fa-university',
  'finance-assistance': 'fa-coins',
  'scholarship-guidance': 'fa-file-invoice-dollar',
  'study-visa-consultants-bareilly': 'fa-location-dot',
};

export default async function ServicesListingPage() {
  const services = await getServices();

  return (
    <>
      <PageBanner
        title="Our Services"
        breadcrumbs={[{ label: 'Services', href: null }]}
      />

      <section className="section-space">
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '45px' }}>
            <h2>
              <span>Comprehensive </span>
              <b>Visa &amp; Education Solutions</b>
            </h2>
            <p style={{ maxWidth: '680px', margin: '12px auto 0', color: '#6b7280', fontSize: '15px' }}>
              We provide 360-degree support from course shortlisting and scholarship grants to visa filing and overseas settlement.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '30px',
            }}
          >
            {services.map((service, index) => {
              const iconClass = iconMap[service.slug] || 'fa-graduation-cap';
              const description =
                service.subtitle ||
                service.description ||
                'Tailored study abroad counseling and visa filing support designed for international students.';

              return (
                <div
                  key={service.slug || index}
                  className="single-feature-card group hover:shadow-xl transition-all duration-300"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    border: '1px solid #eef2f6',
                    padding: '30px',
                    background: '#ffffff',
                  }}
                >
                  <div
                    className="icon-head"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: '#fff5f5',
                      color: 'var(--primary-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      marginBottom: '20px',
                    }}
                  >
                    <i className={`fa-solid ${iconClass}`}></i>
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4' }}>
                    <Link
                      href={`/service/${service.slug}`}
                      className="hover:text-red-600 transition-colors"
                      style={{ color: '#111827' }}
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#4b5563',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                      flexGrow: 1,
                    }}
                  >
                    {description}
                  </p>
                  <div className="button" style={{ marginTop: 'auto' }}>
                    <Link
                      href={`/service/${service.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--primary-red)',
                      }}
                    >
                      <i className="fa-solid fa-circle-arrow-right"></i> Explore Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
