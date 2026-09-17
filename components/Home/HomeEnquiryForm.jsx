'use client';

import React, { useState, useEffect, useRef } from 'react';

const destinationsList = [
  'Australia',
  'Canada',
  'United Kingdom',
  'United States',
  'Germany',
  'New Zealand',
  'Singapore',
  'Ireland',
  'Switzerland',
  'Malta',
  'France',
  'Italy',
  'Dubai (UAE)',
  'Europe',
  'Other',
];

export default function HomeEnquiryForm({ defaultDestination = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    LastQualification: '',
    preferred_destination: defaultDestination || '',
    preferredintake: '',
    check: true,
  });

  const [isDestOpen, setIsDestOpen] = useState(false);
  const destDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (destDropdownRef.current && !destDropdownRef.current.contains(e.target)) {
        setIsDestOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (defaultDestination) {
      setFormData((prev) => ({ ...prev, preferred_destination: defaultDestination }));
    }
  }, [defaultDestination]);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client validation matching original script
    if (!formData.name.trim()) {
      setStatusMsg({ text: 'Please fill the name', type: 'error' });
      return;
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim())) {
      setStatusMsg({ text: 'Phone number must be 10 digits only', type: 'error' });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatusMsg({ text: 'Invalid email format', type: 'error' });
      return;
    }
    if (!formData.LastQualification.trim()) {
      setStatusMsg({ text: 'Please fill your qualification', type: 'error' });
      return;
    }
    if (!formData.preferred_destination) {
      setStatusMsg({ text: 'Please select a preferred destination', type: 'error' });
      return;
    }
    if (!formData.preferredintake) {
      setStatusMsg({ text: 'Please select preferred intake', type: 'error' });
      return;
    }

    setLoading(true);
    setStatusMsg({ text: '', type: '' });

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.msg || data.success) {
        setStatusMsg({ text: 'We will get back to you shortly', type: 'success' });
        setFormData({
          name: '',
          phone: '',
          email: '',
          LastQualification: '',
          preferred_destination: '',
          preferredintake: '',
          check: true,
        });
      } else {
        setStatusMsg({ text: data.error || 'Something went wrong', type: 'error' });
      }
    } catch (err) {
      setStatusMsg({ text: 'Error connecting to server. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStatusMsg({ text: '', type: '' });
      }, 6000);
    }
  };

  return (
    <section className="contact-section scroll-mt-24" id="enquiry-form">
      <div className="container">
        <div className="enquiry-container">
          {/* Background Ambient Glows */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-red-500/5 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-red-500/5 blur-3xl pointer-events-none"></div>

          {/* Curved Flight Path Dotted Line Trail */}
          <div className="enquiry-flight-trail">
            <svg
              className="w-full h-full opacity-20"
              viewBox="0 0 1100 480"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M -50 140 C 200 40, 420 220, 750 100 C 950 30, 1050 120, 1150 80"
                stroke="#e20000"
                strokeWidth="2"
                className="enquiry-svg-trail"
              />
              <path
                d="M 50 360 C 280 420, 520 260, 850 380"
                stroke="#e20000"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Animated Flying Airplane Across the Form Box */}
          <div className="enquiry-plane-track">
            <div className="enquiry-plane-mover">
              <div className="w-16 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/30 to-red-600/80 mr-1.5 rounded-full"></div>
              <div className="relative">
                <div className="w-5 h-5 rounded-full bg-red-600/20 blur-sm absolute inset-0 -top-0.5 -left-0.5"></div>
                <i className="fa-solid fa-plane text-red-500 text-sm sm:text-base drop-shadow-[0_0_8px_rgba(226,0,0,0.6)] transform -rotate-12"></i>
              </div>
            </div>
          </div>

          {/* Floating Study Abroad Related Animated Icons */}
          {/* 1. Graduation Cap (bottom-left) */}
          <div className="absolute bottom-6 left-8 text-red-500/20 text-3xl enquiry-float-item-1 pointer-events-none hidden md:block">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>

          {/* 2. Globe (top-right) */}
          <div className="absolute top-6 right-8 text-red-500/20 text-3xl enquiry-float-item-2 pointer-events-none hidden md:block">
            <i className="fa-solid fa-earth-americas"></i>
          </div>

          {/* 3. Paper Plane (middle) */}
          <div className="absolute top-1/2 left-[36%] -translate-y-1/2 text-red-500/15 text-2xl enquiry-float-item-3 pointer-events-none hidden lg:block">
            <i className="fa-solid fa-paper-plane"></i>
          </div>

          {/* 4. Passport / Stamp (bottom-right) */}
          <div className="absolute bottom-4 right-1/3 text-red-500/15 text-2xl enquiry-float-item-2 pointer-events-none hidden lg:block">
            <i className="fa-solid fa-passport"></i>
          </div>

          {/* 5. Compass (top-middle) */}
          <div className="absolute top-4 left-[42%] text-red-500/15 text-xl enquiry-float-item-1 pointer-events-none hidden md:block">
            <i className="fa-solid fa-compass"></i>
          </div>

          <div className="enquiry-left">
            <h2>Enquire Now</h2>
            <h6>Start your study abroad journey - Fill the form &amp; let us guide you!.</h6>
            <hr />
            <p>Are you an institute looking for collaboration?</p>
          </div>

          <div className="enquiry-right">
            <form onSubmit={handleSubmit} className="detail-form">
              <div className="form-grid">
                <div className="full-col">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Full Name*"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number*"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="full-col">
                  <input
                    type="text"
                    className="form-control"
                    id="LastQualification"
                    name="LastQualification"
                    placeholder="Last Qualification"
                    value={formData.LastQualification}
                    onChange={handleChange}
                  />
                </div>

                <div ref={destDropdownRef} style={{ position: 'relative', zIndex: 50 }}>
                  <button
                    type="button"
                    id="preferred_destination"
                    onClick={() => setIsDestOpen((prev) => !prev)}
                    className="form-select"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      color: formData.preferred_destination ? '#1e293b' : '#64748b',
                      fontWeight: formData.preferred_destination ? '600' : 'normal',
                      borderColor: isDestOpen ? 'var(--primary-red)' : '#e2e8f0',
                      boxShadow: isDestOpen ? '0 0 0 3px rgba(226, 0, 0, 0.12)' : 'none',
                      height: '46px',
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={isDestOpen}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {formData.preferred_destination || 'Preferred Destination*'}
                    </span>
                    <i
                      className="fa-solid fa-chevron-down"
                      style={{
                        fontSize: '11px',
                        color: isDestOpen ? 'var(--primary-red)' : '#94a3b8',
                        transform: isDestOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease, color 0.2s ease',
                        marginLeft: '8px',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  <input
                    type="hidden"
                    name="preferred_destination"
                    value={formData.preferred_destination}
                  />

                  {/* Dropdown Menu with Fixed Height & Scrollbar */}
                  {isDestOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 4px)',
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
                        overflow: 'hidden',
                      }}
                    >
                      <ul
                        role="listbox"
                        className="custom-dropdown-scroll"
                        style={{
                          maxHeight: '220px',
                          overflowY: 'scroll',
                          margin: 0,
                          padding: '6px 4px 6px 6px',
                          listStyle: 'none',
                        }}
                      >
                        {destinationsList.map((dest) => {
                          const isSelected = formData.preferred_destination === dest;
                          return (
                            <li
                              key={dest}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, preferred_destination: dest }));
                                setIsDestOpen(false);
                              }}
                              style={{
                                padding: '9px 12px',
                                fontSize: '13.5px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: isSelected ? '#fef2f2' : 'transparent',
                                color: isSelected ? 'var(--primary-red)' : '#334155',
                                fontWeight: isSelected ? '700' : '500',
                                transition: 'background 0.15s ease, color 0.15s ease',
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.backgroundColor = '#f8fafc';
                                  e.currentTarget.style.color = 'var(--primary-red)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#334155';
                                }
                              }}
                            >
                              <span>{dest}</span>
                              {isSelected && (
                                <i className="fa-solid fa-check" style={{ fontSize: '11px', color: 'var(--primary-red)' }} />
                              )}
                            </li>
                          );
                        })}
                      </ul>

                    </div>
                  )}
                </div>

                <div>
                  <select
                    className="form-select"
                    id="preferredintake"
                    name="preferredintake"
                    value={formData.preferredintake}
                    onChange={handleChange}
                  >
                    <option value="">When do you plan to start?</option>
                    <option value="Immediately">Immediately</option>
                    <option value="In a week">In a week</option>
                    <option value="This month">This month</option>
                    <option value="Next month">Next month</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>

                <div className="full-col">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="check"
                      name="check"
                      checked={formData.check}
                      onChange={handleChange}
                    />
                    <label htmlFor="check">
                      By selecting this, you agree to 13 Dreams’ <a href="#">Privacy policy</a> and <a href="#">Terms &amp; Conditions</a>. You agree to be contacted by phone, e-mail, or messages.
                    </label>
                  </div>
                </div>

                <div className="full-col" style={{ marginTop: '10px' }}>
                  <button type="submit" className="shubtn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}{' '}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>

                  {statusMsg.text && (
                    <div
                      style={{
                        marginTop: '12px',
                        fontSize: '13.5px',
                        fontWeight: '600',
                        color: statusMsg.type === 'success' ? '#2e7d32' : '#d32f2f',
                      }}
                    >
                      {statusMsg.text}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
