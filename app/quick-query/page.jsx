'use client';

import React, { useState } from 'react';
import PageBanner from '@/components/UI/PageBanner';

export default function QuickQueryPage() {
  const [formData, setFormData] = useState({
    quick_name: '',
    quick_email: '',
    quick_phone: '',
    quick_interest: '',
    quick_studylevel: '',
    quick_country: '',
    quick_city: '',
    quick_office: 'Bareilly',
    quick_counseling: 'In Person',
  });

  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', isSuccess: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.quick_name || !formData.quick_email || !formData.quick_phone) {
      setFormStatus({ message: '❌ Please fill all mandatory fields.', isSuccess: false });
      return;
    }

    setLoading(true);
    setFormStatus({ message: '', isSuccess: false });

    try {
      const res = await fetch('/api/quick-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.msg || data.success) {
        setFormStatus({ message: '✅ Form submitted successfully! Our expert will call you shortly.', isSuccess: true });
        setFormData({
          quick_name: '',
          quick_email: '',
          quick_phone: '',
          quick_interest: '',
          quick_studylevel: '',
          quick_country: '',
          quick_city: '',
          quick_office: 'Bareilly',
          quick_counseling: 'In Person',
        });
      } else {
        setFormStatus({ message: '❌ Submission failed. Please try again.', isSuccess: false });
      }
    } catch (err) {
      setFormStatus({ message: '❌ Server error. Please try again later.', isSuccess: false });
    } finally {
      setLoading(false);
      setTimeout(() => setFormStatus({ message: '', isSuccess: false }), 7000);
    }
  };

  return (
    <>
      <PageBanner
        title="Quick Query"
        breadcrumbs={[{ label: 'Quick Query', href: null }]}
      />

      <section className="section-space">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#ffffff', padding: '45px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
            <div className="section-title text-center" style={{ marginBottom: '30px' }}>
              <h2>
                <span>Quick </span>
                <b>Student Query</b>
              </h2>
            </div>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14.5px', marginBottom: '35px' }}>
              Fill this quick enquiry form and our country counselors will evaluate your profile and advise you on eligible universities, intakes, and scholarship opportunities.
            </p>

            <form onSubmit={handleSubmit} id="student_form" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Full Name *</label>
                  <input
                    type="text"
                    name="quick_name"
                    id="quick_name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.quick_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Email Address *</label>
                  <input
                    type="email"
                    name="quick_email"
                    id="quick_email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.quick_email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Phone Number *</label>
                  <input
                    type="text"
                    name="quick_phone"
                    id="quick_phone"
                    className="form-control"
                    placeholder="10-digit mobile number"
                    value={formData.quick_phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Area of Interest *</label>
                  <input
                    type="text"
                    name="quick_interest"
                    id="quick_interest"
                    className="form-control"
                    placeholder="e.g. IT, Business, Health, Engineering"
                    value={formData.quick_interest}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Target Study Level *</label>
                  <select
                    name="quick_studylevel"
                    id="quick_studylevel"
                    className="form-select"
                    value={formData.quick_studylevel}
                    onChange={handleChange}
                  >
                    <option value="">Select Level</option>
                    <option value="Undergraduate">Undergraduate / Bachelor's</option>
                    <option value="Postgraduate">Postgraduate / Master's</option>
                    <option value="Diploma">Diploma / Advanced Diploma</option>
                    <option value="Doctorate">Doctorate / PhD</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Preferred Country *</label>
                  <select
                    name="quick_country"
                    id="quick_country"
                    className="form-select"
                    value={formData.quick_country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Germany">Germany</option>
                    <option value="Malta">Malta</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Your City *</label>
                  <input
                    type="text"
                    name="quick_city"
                    id="quick_city"
                    className="form-control"
                    placeholder="e.g. Bareilly, Khatima, Haldwani, Delhi"
                    value={formData.quick_city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Nearest Branch Office *</label>
                  <select
                    name="quick_office"
                    id="quick_office"
                    className="form-select"
                    value={formData.quick_office}
                    onChange={handleChange}
                  >
                    <option value="Bareilly">Bareilly (Ekta Nagar, Model Town)</option>
                    <option value="Khatima">Khatima (Nanakmatta Road)</option>
                    <option value="Online">Online / Virtual Counseling</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '10px' }}>
                <button
                  type="submit"
                  className="shubtn"
                  disabled={loading}
                  style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                >
                  {loading ? 'Submitting...' : 'Submit Quick Query'} <i className="fa-solid fa-paper-plane"></i>
                </button>

                {formStatus.message && (
                  <div
                    id="form_status"
                    style={{
                      marginTop: '15px',
                      fontSize: '14px',
                      fontWeight: '700',
                      textAlign: 'center',
                      color: formStatus.isSuccess ? 'green' : 'red',
                    }}
                  >
                    {formStatus.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
