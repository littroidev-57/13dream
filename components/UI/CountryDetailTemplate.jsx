import React from 'react';
import PageBanner from '@/components/UI/PageBanner';
import HomeEnquiryForm from '@/components/Home/HomeEnquiryForm';
import Link from 'next/link';
import { destinationsData } from '@/lib/seedData';

export default function CountryDetailTemplate({
  countryName,
  tagline,
  bannerImg,
  overview,
  whyStudyPoints = [],
  topUniversities = [],
  visaFacts = [],
  currentSlug,
}) {
  const otherCountries = destinationsData.filter((d) => d.id !== currentSlug).slice(0, 4);

  return (
    <>
      <PageBanner
        title={`Study in ${countryName}`}
        breadcrumbs={[
          { label: 'Countries', href: '/countries' },
          { label: countryName, href: null },
        ]}
      />

      <section className="section-space">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
            {/* Left Main Content */}
            <div>
              <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 5px 25px rgba(0,0,0,0.08)' }}>
                <img
                  src={bannerImg}
                  alt={`Study in ${countryName}`}
                  style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
                />
              </div>

              <div className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
                <h2>
                  <span>Why Study in </span>
                  <b>{countryName}?</b>
                </h2>
              </div>

              <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.8', marginBottom: '25px' }}>
                {overview}
              </p>

              {whyStudyPoints.length > 0 && (
                <div style={{ marginBottom: '35px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111', marginBottom: '16px' }}>
                    Key Advantages for Indian Students
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '5px' }}>
                    {whyStudyPoints.map((pt, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#555' }}>
                        <i className="fa-solid fa-check-circle" style={{ color: 'var(--primary-red)', marginTop: '4px' }}></i>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {topUniversities.length > 0 && (
                <div style={{ marginBottom: '35px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111', marginBottom: '16px' }}>
                    Popular Universities &amp; Colleges
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {topUniversities.map((uni, i) => (
                      <div key={i} style={{ padding: '14px 18px', background: '#f9f9fb', borderRadius: '6px', border: '1px solid #eee', fontSize: '13.5px', fontWeight: '600', color: '#333' }}>
                        <i className="fa-solid fa-building-columns" style={{ color: 'var(--primary-red)', marginRight: '8px' }}></i>
                        {uni}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {visaFacts.length > 0 && (
                <div style={{ padding: '25px', background: '#fff0f0', borderRadius: '8px', borderLeft: '4px solid var(--primary-red)', marginBottom: '35px' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#111', marginBottom: '10px' }}>
                    Visa &amp; Post-Study Work Highlights
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#444' }}>
                    {visaFacts.map((fact, i) => (
                      <li key={i}>• {fact}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <aside>
              <div style={{ background: '#f9f9fb', padding: '30px', borderRadius: '10px', border: '1px solid #eee', marginBottom: '30px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px', borderBottom: '2px solid var(--primary-red)', paddingBottom: '8px' }}>
                  Explore Other Countries
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {otherCountries.map((c) => (
                    <Link
                      key={c.id}
                      href={`/study/${c.id}`}
                      style={{
                        padding: '12px 16px',
                        background: '#ffffff',
                        borderRadius: '6px',
                        border: '1px solid #e5e5e5',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: '600',
                        fontSize: '13.5px',
                        color: '#333',
                      }}
                    >
                      <span>{c.name}</span>
                      <i className="fa-solid fa-angle-right" style={{ color: 'var(--primary-red)' }}></i>
                    </Link>
                  ))}
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)', color: '#ffffff', padding: '30px', borderRadius: '10px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                  Need Expert Guidance?
                </h4>
                <p style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
                  Get custom course options, fee breakdowns, and admission timelines for {countryName}.
                </p>
                <a href="#enquiry-form" className="bizwheel-btn" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Apply For {countryName}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Embedded Enquiry Form */}
      <HomeEnquiryForm defaultDestination={countryName} />
    </>
  );
}
