import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section-space" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '90px', fontWeight: '800', color: 'var(--primary-red)', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#222', margin: '20px 0 10px 0' }}>
          Page Not Found
        </h2>
        <p style={{ color: '#666', fontSize: '15px', maxWidth: '500px', margin: '0 auto 30px auto' }}>
          We could not find the page you were looking for. Please check the URL or return to our homepage.
        </p>
        <Link href="/" className="bizwheel-btn">
          Back To Home
        </Link>
      </div>
    </section>
  );
}
