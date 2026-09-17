'use client';

import React from 'react';
import Link from 'next/link';

export default function SidebarPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-popup-overlay" onClick={onClose} />
      <div className="sidebar-popup">
        <div className="cross" onClick={onClose}>
          <i className="fa fa-times"></i>
        </div>

        <div className="single-content">
          <h4>13 Dreams Consultants</h4>
          <p>
            We strive to provide best quality education Visa Consulting Service, bridging your success with well formed infrastructure of knowledge and resources.
          </p>
          <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '13.5px' }}>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '14px', gap: '12px' }}>
              <i
                className="fa fa-phone"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  color: 'var(--primary-red)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              ></i>
              <div>
                <a href="tel:9759053463">+91 9759053463</a>
                <br />
                <a href="tel:9520667842">+91 9520667842</a>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '14px', gap: '12px' }}>
              <i
                className="fa fa-envelope"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  color: 'var(--primary-red)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              ></i>
              <a href="mailto:contact@13dreamsconsultants.com" style={{ wordBreak: 'break-all' }}>
                contact@13dreamsconsultants.com
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '14px', gap: '12px' }}>
              <i
                className="fa-solid fa-location-dot"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  color: 'var(--primary-red)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              ></i>
              <span>Near Jhankat (Banusi) Khatima Nanakmatta Road, U S Nagar, Uttrakhand - 262308</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '14px', gap: '12px' }}>
              <i
                className="fa-solid fa-location-dot"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  color: 'var(--primary-red)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              ></i>
              <span>Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly</span>
            </li>
          </ul>
        </div>

        <div className="single-content">
          <h4>Important Links</h4>
          <ul className="links" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><Link href="/about-us" onClick={onClose}>About Us</Link></li>
            <li><Link href="/service" onClick={onClose}>Our Services</Link></li>
            <li><Link href="/countries" onClick={onClose}>Countries</Link></li>
            <li><Link href="/story" onClick={onClose}>Success Stories</Link></li>
            <li><Link href="/blog" onClick={onClose}>Blog &amp; News</Link></li>
            <li><Link href="/events" onClick={onClose}>Our Events</Link></li>
            <li><Link href="/contact" onClick={onClose}>Contact Us</Link></li>
            <li><Link href="/#enquiry-form" onClick={onClose}>Enquire Now</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
