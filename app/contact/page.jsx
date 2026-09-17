'use client';

import React, { useState } from 'react';
import PageBanner from '@/components/UI/PageBanner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFeedback({ text: 'Please fill the name !', type: 'error' });
      return;
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) {
      setFeedback({ text: 'Phone number must be 10 digits only!', type: 'error' });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setFeedback({ text: 'Please fill a valid email address !', type: 'error' });
      return;
    }
    if (!formData.subject.trim()) {
      setFeedback({ text: 'Please fill the subject !', type: 'error' });
      return;
    }
    if (!formData.message.trim()) {
      setFeedback({ text: 'Please fill the message !', type: 'error' });
      return;
    }

    setLoading(true);
    setFeedback({ text: '', type: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.msg || data.success) {
        setFeedback({ text: 'We will get back to you shortly', type: 'success' });
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      } else {
        setFeedback({ text: data.error || 'Something went wrong', type: 'error' });
      }
    } catch (err) {
      setFeedback({ text: 'Server error. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback({ text: '', type: '' }), 6000);
    }
  };

  return (
    <>
      <PageBanner
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact', href: null }]}
      />

      <section className="section-space">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {/* Contact Information */}
            <div>
              <div className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>
                <h2>
                  <span>Get In </span>
                  <b>Touch With Us</b>
                </h2>
              </div>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.7', marginBottom: '30px' }}>
                Have questions regarding courses, eligibility, tuition fees, or country options? Our certified counselors are here to guide you toward your ideal foreign university.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)', fontSize: '18px', flexShrink: 0 }}>
                    <i className="fa fa-phone"></i>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '700', color: '#222' }}>Call Us</h5>
                    <p style={{ fontSize: '14px', color: '#555', marginTop: '4px' }}>
                      <a href="tel:9759053463">+91 9759053463</a> / <a href="tel:9520667842">+91 9520667842</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)', fontSize: '18px', flexShrink: 0 }}>
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '700', color: '#222' }}>Email Us</h5>
                    <p style={{ fontSize: '14px', color: '#555', marginTop: '4px' }}>
                      <a href="mailto:contact@13dreamsconsultants.com">contact@13dreamsconsultants.com</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)', fontSize: '18px', flexShrink: 0 }}>
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '700', color: '#222' }}>Bareilly Office</h5>
                    <p style={{ fontSize: '13.5px', color: '#555', marginTop: '4px', lineHeight: '1.6' }}>
                      Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly, UP
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)', fontSize: '18px', flexShrink: 0 }}>
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '16px', fontWeight: '700', color: '#222' }}>Khatima Office</h5>
                    <p style={{ fontSize: '13.5px', color: '#555', marginTop: '4px', lineHeight: '1.6' }}>
                      Near Jhankat (Banusi) Khatima Nanakmatta Road, U S Nagar, Uttarakhand - 262308
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: '#f9f9fb', padding: '40px', borderRadius: '10px', border: '1px solid #eee' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111', marginBottom: '10px' }}>
                Leave Us A Message
              </h3>
              <p style={{ fontSize: '13.5px', color: '#666', marginBottom: '25px' }}>
                Fill out the form below and an education expert will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name*"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number*"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject*"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Your Message / Query*"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div>
                  <button type="submit" className="shubtn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                    {loading ? 'Sending...' : 'Send Message'} <i className="fa-solid fa-arrow-right"></i>
                  </button>

                  {feedback.text && (
                    <div
                      style={{
                        marginTop: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: feedback.type === 'success' ? '#2e7d32' : '#d32f2f',
                        textAlign: 'center',
                      }}
                    >
                      {feedback.text}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
