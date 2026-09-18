import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* 1. About */}
            <div className="single-widget footer-about">
              <div className="footer-logo">
                <Link href="/" title="13 Dreams Consultants">
                  <img
                    src="https://13dreamsconsultants.com/img/13d-logo-white.webp"
                    alt="13 Dreams Consultants Logo White"
                    style={{ width: '220px', maxWidth: '100%', height: 'auto' }}
                  />
                </Link>
              </div>
              <div className="footer-widget-about-description">
                <p>
                  We are one of the trusted, reliable, cost effective and transparent study overseas and immigration consultants.
                </p>
              </div>
              <div className="social">
                <ul className="social-icons">
                  <li>
                    <a href="https://www.facebook.com/13Dreamsconsultants" target="_blank" rel="noopener noreferrer" title="Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/13dreamsconsultants/" target="_blank" rel="noopener noreferrer" title="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UC2ysHlAkujP6vUzpn7ZE-tA/featured" target="_blank" rel="noopener noreferrer" title="YouTube">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div className="single-widget f-link">
              <h3 className="widget-title">Quick Links</h3>
              <ul className="links">
                <li><Link href="/apply" > Apply Online</Link></li>
                <li><Link href="/study-abroad">Study Abroad Guide</Link></li>
                <li><Link href="/student-visa">Student Visa Assistance</Link></li>
                <li><Link href="/universities">Top Universities</Link></li>
                <li><Link href="/courses">In-Demand Courses</Link></li>
                <li><Link href="/countries">Destinations</Link></li>
                <li><Link href="/service">Our Services</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* 3. Blog Page */}
            <div className="single-widget footer-news">
              <h3 className="widget-title">Blog Page</h3>
              <div className="single-f-news">
                <div className="post-thumb">
                  <Link href="/blog/germany-the-next-big-study-abroad-destination-heres-the-reason-why">
                    <img
                      src="https://13dreamsconsultants.com/img/blog/Germany-The-next-big-study-abroad-destination-here-the-reason-why.webp"
                      alt="Germany Education"
                    />
                  </Link>
                </div>
                <div className="content">
                  <p className="post-meta">
                    <i className="fa-regular fa-clock"></i> June 14, 2023
                  </p>
                  <h4 className="title">
                    <Link href="/blog/germany-the-next-big-study-abroad-destination-heres-the-reason-why">
                      Germany! The next big study abroad destination, here's the reason why!
                    </Link>
                  </h4>
                </div>
              </div>

              <div className="single-f-news">
                <div className="post-thumb">
                  <Link href="/blog/germany-wants-to-make-it-easier-for-Indian-IT-workers-to-get-work-visa">
                    <img
                      src="https://13dreamsconsultants.com/img/blog/Germany-wants-to-make-it-easier-for-Indian-IT-workers-to-get-work-visa.webp"
                      alt="Germany Work Visa"
                    />
                  </Link>
                </div>
                <div className="content">
                  <p className="post-meta">
                    <i className="fa-regular fa-clock"></i> June 20, 2023
                  </p>
                  <h4 className="title">
                    <Link href="/blog/germany-wants-to-make-it-easier-for-Indian-IT-workers-to-get-work-visa">
                      Germany wants to make it easier for Indian IT workers to get work visa
                    </Link>
                  </h4>
                </div>
              </div>

              <div className="single-f-news">
                <div className="post-thumb">
                  <Link href="/blog/10-things-to-know-before-studying-in-germany">
                    <img
                      src="https://13dreamsconsultants.com/img/blog/10-Things-to-Know-Before-Studying-in-Germany.webp"
                      alt="10 Things Germany"
                    />
                  </Link>
                </div>
                <div className="content">
                  <p className="post-meta">
                    <i className="fa-regular fa-clock"></i> June 22, 2023
                  </p>
                  <h4 className="title">
                    <Link href="/blog/10-things-to-know-before-studying-in-germany">
                      10 Things to Know Before Studying in Germany
                    </Link>
                  </h4>
                </div>
              </div>
            </div>

            {/* 4. Contact */}
            <div className="single-widget footer_contact">
              <h3 className="widget-title">Contact</h3>
              <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '15px' }}>
                We are World's reputed Visa Specialist and are assisting aspirants in fulfilling their dreams of migrating and settling abroad for more than a decade.
              </p>
              <ul className="address-widget-list">
                <li>
                  <i className="fa fa-phone"></i>
                  <div>
                    <a href="tel:9759053463" target="_blank" rel="noopener noreferrer">+91 9759053463</a>
                    <br />
                    <a href="tel:9520667842" target="_blank" rel="noopener noreferrer">+91 9520667842</a>
                  </div>
                </li>
                <li>
                  <i className="fa fa-envelope"></i>
                  <a href="mailto:contact@13dreamsconsultants.com">contact@13dreamsconsultants.com</a>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  <span>Near Jhankat (Banusi) Khatima Nanakmatta Road, U S Nagar, Uttrakhand - 262308</span>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  <span>Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div className="container">
          <p>
            2026 © Copyright <Link href="/">13 Dreams Consultants</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
