import React from 'react';
import PageBanner from '@/components/UI/PageBanner';
import Link from 'next/link';
import { destinationsData } from '@/lib/seedData';

export const metadata = {
  title: 'Top Study Abroad Countries | 13 Dreams Consultants',
  description:
    'Explore study abroad destinations worldwide with 13 Dreams Consultants: Canada, Australia, United Kingdom, USA, New Zealand, Germany, Malta, and Singapore.',
};

export default function CountriesPage() {
  return (
    <>
      <PageBanner
        title="Study Destinations"
        breadcrumbs={[{ label: 'Countries', href: null }]}
      />

      <section className="section-space">
        <div className="container">
          <div className="section-title text-center">
            <h2>
              <span>Choose Your </span>
              <b>Dream Destination</b>
            </h2>
          </div>

          <div className="destinations-grid">
            {destinationsData.map((dest) => (
              <div key={dest.id} className="single-service">
                <div className="service-head">
                  <img src={dest.image} alt={dest.name} title={dest.name} />
                </div>
                <Link href={`/study/${dest.id}`} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div className="service-content">
                    <h4>{dest.name}</h4>
                    <p>{dest.description}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '15px' }}>
                      <span style={{ color: 'var(--primary-red)', fontWeight: '600', fontSize: '13px' }}>
                        Explore Country Details <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
