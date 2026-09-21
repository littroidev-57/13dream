'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ onToggleMobileNav, isScrolled }) {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';

  return (
    <div
      className="middle-header"
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        borderBottom: isScrolled ? '1px solid #f1f5f9' : 'none',
      }}
    >
      <div className="container">
        <div
          className="middle-inner"
          style={{
            padding: isScrolled ? '14px 0' : '20px 0',
            transition: 'padding 0.3s ease',
          }}
        >
          <div className="logo">
            <Link href="/" title="13 Dreams Consultants">
              <img
                src="https://13dreamsconsultants.com/img/13d-logo.webp"
                alt="13 Dreams Consultants Logo"
                style={{
                  height: isScrolled ? '50px' : '58px',
                  width: 'auto',
                  transition: 'height 0.3s ease',
                }}
              />
            </Link>
          </div>

          <div className="menu-area">
            <nav className="navbar">
              <ul className="nav main-menu">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>

                {/* Our Services dropdown */}
                <li className="has-dropdown">
                  <Link href="/service">
                    Our Services <i className="fa fa-angle-down" style={{ fontSize: '11px' }}></i>
                  </Link>
                  <ul className="sub-menu">
                    <li><Link href="/student-visa">Student Visa Guide</Link></li>
                    <li><Link href="/universities">Partner Universities</Link></li>
                    <li><Link href="/courses">In-Demand Courses</Link></li>
                    <li><Link href="/service/comprehensive-counselling">Comprehensive Counselling</Link></li>
                    <li><Link href="/service/application-processing">Application Processing</Link></li>
                    <li><Link href="/events">Our Events</Link></li>
                    <li><Link href="/service/advice-on-program-selection">Advice on Selection of Programs</Link></li>
                    <li><Link href="/service/assistance-with-scholarship-applications">Scholarship Application Assistance</Link></li>
                    <li><Link href="/service/advice-on-student-visas">Student Visa Guidance</Link></li>
                    <li><Link href="/service/pre-departure-assistance">Pre-departure Support</Link></li>
                    <li><Link href="/service/value-added-services">Value Added Services</Link></li>
                    <li><Link href="/service/visa-counseling">Visa Counseling</Link></li>
                    <li><Link href="/service/visa-processing">Visa Processing</Link></li>
                    <li><Link href="/service/admission-assistance">Admission Assistance</Link></li>
                    <li><Link href="/service/finance-assistance">Finance Assistance</Link></li>
                    <li><Link href="/service/scholarship-guidance">Scholarship Guidance</Link></li>
                    <li><Link href="/service/study-visa-consultants-bareilly">Study Visa Consultants Bareilly</Link></li>
                  </ul>
                </li>

                {/* Countries dropdown */}
                <li className="has-dropdown">
                  <Link href="/countries">
                    Countries <i className="fa fa-angle-down" style={{ fontSize: '11px' }}></i>
                  </Link>
                  <ul className="sub-menu">
                    <li><Link href="/study-abroad">Study Abroad Guide</Link></li>
                    <li><Link href="/study/australia">Study in Australia</Link></li>
                    <li><Link href="/study/canada">Study in Canada</Link></li>
                    <li><Link href="/study/uk">Study in UK</Link></li>
                    <li><Link href="/study/usa">Study in USA</Link></li>
                    <li><Link href="/study/new-zealand">Study in New Zealand</Link></li>
                    <li><Link href="/study/germany">Study in Germany</Link></li>
                    <li><Link href="/study/malta">Study in Malta</Link></li>
                    <li><Link href="/study/singapore">Study in Singapore</Link></li>
                    <li><Link href="/study/ireland">Study in Ireland</Link></li>
                    <li><Link href="/study/switzerland">Study in Switzerland</Link></li>
                  </ul>
                </li>

                {/* Success Stories dropdown */}
                <li className="has-dropdown">
                  <Link href="/story">
                    Success Stories <i className="fa fa-angle-down" style={{ fontSize: '11px' }}></i>
                  </Link>
                  <ul className="sub-menu">
                    <li><Link href="/story">Visa Success Stories</Link></li>
                    <li><Link href="/story/ielts">IELTS Success Stories</Link></li>
                    <li><Link href="/story/pte">PTE Success Stories</Link></li>
                  </ul>
                </li>

                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </nav>

            <div className="right-button" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Link href="/contact" className="bizwheel-btn">
                Contact Us
              </Link>
              <button
                className="mobile-nav-toggle"
                onClick={onToggleMobileNav}
                aria-label="Toggle navigation menu"
              >
                <i className="fa fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
