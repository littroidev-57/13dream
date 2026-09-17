import React from 'react';
import Link from 'next/link';

export default function PageBanner({ title, breadcrumbs = [] }) {
  return (
    <section className="page-banner">
      <div className="container">
        <h1>{title}</h1>
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span>/</span>
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span style={{ color: 'var(--primary-red)' }}>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
