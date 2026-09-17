'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu({ isOpen, onClose }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  if (!isOpen) return null;

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuItem = { borderBottom: '1px solid #f0f0f0' };
  const subItem = { padding: '6px 0' };
  const linkBase = { display: 'block', padding: '12px 0', fontWeight: 600 };

  return (
    <>
      <div className="sidebar-popup-overlay" onClick={onClose} />
      <div
        className="mobile-drawer"
        style={{
          position: 'fixed', top: 0, left: 0, width: '300px', maxWidth: '85vw',
          height: '100vh', backgroundColor: '#ffffff', boxShadow: '5px 0 25px rgba(0,0,0,0.2)',
          zIndex: 99999, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '25px 20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <img src="https://13dreamsconsultants.com/img/13d-logo.webp" alt="Logo" style={{ height: '42px', width: 'auto' }} />
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#222' }}>
            <i className="fa fa-times"></i>
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <li style={menuItem}>
            <Link href="/" onClick={onClose} style={linkBase}>Home</Link>
          </li>
          <li style={menuItem}>
            <Link href="/about-us" onClick={onClose} style={linkBase}>About Us</Link>
          </li>

          {/* Services Accordion */}
          <li style={menuItem}>
            <div onClick={() => toggleSubmenu('services')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', fontWeight: 600, cursor: 'pointer' }}>
              <span>Our Services</span>
              <i className={`fa fa-chevron-${openSubmenu === 'services' ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
            </div>
            {openSubmenu === 'services' && (
              <ul style={{ listStyle: 'none', paddingLeft: '15px', paddingBottom: '10px', fontSize: '13px' }}>
                <li style={subItem}><Link href="/service/comprehensive-counselling" onClick={onClose}>Comprehensive Counselling</Link></li>
                <li style={subItem}><Link href="/service/application-processing" onClick={onClose}>Application Processing</Link></li>
                <li style={subItem}><Link href="/events" onClick={onClose}>Our Events</Link></li>
                <li style={subItem}><Link href="/service/advice-on-program-selection" onClick={onClose}>Advice on Selection of Programs</Link></li>
                <li style={subItem}><Link href="/service/assistance-with-scholarship-applications" onClick={onClose}>Scholarship Application Assistance</Link></li>
                <li style={subItem}><Link href="/service/advice-on-student-visas" onClick={onClose}>Student Visa Guidance</Link></li>
                <li style={subItem}><Link href="/service/pre-departure-assistance" onClick={onClose}>Pre-departure Support</Link></li>
                <li style={subItem}><Link href="/service/value-added-services" onClick={onClose}>Value Added Services</Link></li>
                <li style={subItem}><Link href="/service/visa-counseling" onClick={onClose}>Visa Counseling</Link></li>
                <li style={subItem}><Link href="/service/visa-processing" onClick={onClose}>Visa Processing</Link></li>
                <li style={subItem}><Link href="/service/admission-assistance" onClick={onClose}>Admission Assistance</Link></li>
                <li style={subItem}><Link href="/service/finance-assistance" onClick={onClose}>Finance Assistance</Link></li>
                <li style={subItem}><Link href="/service/scholarship-guidance" onClick={onClose}>Scholarship Guidance</Link></li>
                <li style={subItem}><Link href="/service/study-visa-consultants-bareilly" onClick={onClose}>Study Visa Consultants Bareilly</Link></li>
              </ul>
            )}
          </li>

          {/* Countries Accordion */}
          <li style={menuItem}>
            <div onClick={() => toggleSubmenu('countries')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', fontWeight: 600, cursor: 'pointer' }}>
              <span>Countries</span>
              <i className={`fa fa-chevron-${openSubmenu === 'countries' ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
            </div>
            {openSubmenu === 'countries' && (
              <ul style={{ listStyle: 'none', paddingLeft: '15px', paddingBottom: '10px', fontSize: '13px' }}>
                <li style={subItem}><Link href="/study/australia" onClick={onClose}>Study in Australia</Link></li>
                <li style={subItem}><Link href="/study/canada" onClick={onClose}>Study in Canada</Link></li>
                <li style={subItem}><Link href="/study/uk" onClick={onClose}>Study in UK</Link></li>
                <li style={subItem}><Link href="/study/usa" onClick={onClose}>Study in USA</Link></li>
                <li style={subItem}><Link href="/study/new-zealand" onClick={onClose}>Study in New Zealand</Link></li>
                <li style={subItem}><Link href="/study/germany" onClick={onClose}>Study in Germany</Link></li>
                <li style={subItem}><Link href="/study/malta" onClick={onClose}>Study in Malta</Link></li>
                <li style={subItem}><Link href="/study/singapore" onClick={onClose}>Study in Singapore</Link></li>
                <li style={subItem}><Link href="/study/ireland" onClick={onClose}>Study in Ireland</Link></li>
                <li style={subItem}><Link href="/study/switzerland" onClick={onClose}>Study in Switzerland</Link></li>
              </ul>
            )}
          </li>

          {/* Success Stories Accordion */}
          <li style={menuItem}>
            <div onClick={() => toggleSubmenu('stories')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', fontWeight: 600, cursor: 'pointer' }}>
              <span>Success Stories</span>
              <i className={`fa fa-chevron-${openSubmenu === 'stories' ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
            </div>
            {openSubmenu === 'stories' && (
              <ul style={{ listStyle: 'none', paddingLeft: '15px', paddingBottom: '10px', fontSize: '13px' }}>
                <li style={subItem}><Link href="/story" onClick={onClose}>Visa Success Stories</Link></li>
                <li style={subItem}><Link href="/story/ielts" onClick={onClose}>IELTS Success Stories</Link></li>
                <li style={subItem}><Link href="/story/pte" onClick={onClose}>PTE Success Stories</Link></li>
              </ul>
            )}
          </li>

          <li style={menuItem}>
            <Link href="/blog" onClick={onClose} style={linkBase}>Blog</Link>
          </li>
          <li style={menuItem}>
            <Link href="/#enquiry-form" onClick={onClose} style={{ ...linkBase, color: 'var(--primary-red)' }}>Enquire Now</Link>
          </li>
        </ul>

        <div style={{ marginTop: '25px' }}>
          <Link href="/contact" onClick={onClose} className="bizwheel-btn" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
