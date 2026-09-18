'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ApplyForm({ defaultCountry = '' }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    primary_email: '',
    dialCode: '+91',
    primary_mobile_number: '',
    preferredCountryCode: defaultCountry || '',
    studyPlanTimeline: '',
    nearestOffice: '',
    modeOfCounselling: '',
    preferredStudyLevel: '',
    primaryFinancialSource: '',
    termsAndConditionsAcceptance: false,
    contactMeBy: false,
    marketing_acceptance_flag: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const handleClose = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field when user types/changes
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Please enter your first name';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Please enter your last name';
    }
    if (!formData.primary_email.trim()) {
      newErrors.primary_email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primary_email.trim())) {
      newErrors.primary_email = 'Please enter a valid email address';
    }
    if (!formData.primary_mobile_number.trim()) {
      newErrors.primary_mobile_number = 'Please enter your mobile number';
    } else if (!/^\d{8,12}$/.test(formData.primary_mobile_number.trim().replace(/\D/g, ''))) {
      newErrors.primary_mobile_number = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.preferredCountryCode) {
      newErrors.preferredCountryCode = 'Please select where you would like to study';
    }
    if (!formData.studyPlanTimeline) {
      newErrors.studyPlanTimeline = 'When would you like to start studying?';
    }
    if (!formData.nearestOffice) {
      newErrors.nearestOffice = 'Please select nearest office';
    }
    if (!formData.modeOfCounselling) {
      newErrors.modeOfCounselling = 'Please select preferred mode of counselling';
    }
    if (!formData.preferredStudyLevel) {
      newErrors.preferredStudyLevel = 'Please select preferred study level';
    }
    if (!formData.primaryFinancialSource) {
      newErrors.primaryFinancialSource = 'Please let us know how would you fund your education?';
    }
    if (!formData.termsAndConditionsAcceptance) {
      newErrors.termsAndConditionsAcceptance = 'Please accept terms and privacy policy';
    }
    if (!formData.contactMeBy) {
      newErrors.contactMeBy = 'Please confirm we can contact you regarding your enquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ text: '', type: '' });

    if (!validate()) {
      setStatusMsg({
        text: 'Please complete all required fields marked with *.',
        type: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.first_name.trim()} ${formData.last_name.trim()}`,
          phone: `${formData.dialCode} ${formData.primary_mobile_number.trim()}`,
          email: formData.primary_email.trim(),
          preferred_destination: formData.preferredCountryCode,
          preferredintake: formData.studyPlanTimeline,
          studyLevel: formData.preferredStudyLevel,
          office: formData.nearestOffice,
          counseling: formData.modeOfCounselling,
          interest: `Funding: ${formData.primaryFinancialSource} | Mode: ${formData.modeOfCounselling}`,
          source: 'Apply Page (IDP Style)',
          check: formData.termsAndConditionsAcceptance && formData.contactMeBy,
        }),
      });

      const data = await res.json();

      if (data.success || data.msg) {
        setStatusMsg({
          text: '🎉 Thank you! Your request for FREE counselling has been received. Our senior study abroad advisor will contact you within 24 hours.',
          type: 'success',
        });
        setFormData({
          first_name: '',
          last_name: '',
          primary_email: '',
          dialCode: '+91',
          primary_mobile_number: '',
          preferredCountryCode: defaultCountry || '',
          studyPlanTimeline: '',
          nearestOffice: '',
          modeOfCounselling: '',
          preferredStudyLevel: '',
          primaryFinancialSource: '',
          termsAndConditionsAcceptance: false,
          contactMeBy: false,
          marketing_acceptance_flag: false,
        });
        setErrors({});
      } else {
        setStatusMsg({
          text: data.error || 'Something went wrong. Please check your details and try again.',
          type: 'error',
        });
      }
    } catch (err) {
      console.error('Apply form submission error:', err);
      setStatusMsg({
        text: 'Network error submitting application. Please call +91 9759053463 or try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex flex-col">
      {/* ── Top Bar with Logo & Right Side Cross (X) Back Button ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2">
              <img
                src="/img/logo.webp"
                alt="13 Dreams Consultants"
                className="h-9 sm:h-11 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/img/13dreamsconsultants-main.webp';
                }}
              />
            </Link>

            {/* Right-side Cross (X) Button for Back */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close and go back"
              title="Close and go back"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-gray-100 active:scale-95 flex items-center justify-center border border-gray-300 shadow-sm hover:shadow text-gray-700 hover:text-red-600 transition-all cursor-pointer"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Form Section: New Girl Image Left, Form Right ── */}
      <main className="flex-1 py-6 sm:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center lg:items-start">
            
            {/* Left Column: Brand New Study Abroad Student Girl Image */}
            <div className="col-span-12 lg:col-span-5 flex justify-center items-center order-2 lg:order-1">
              <div className="relative w-full max-w-[440px] lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                <img
                  src="/img/apply-student-girl.jpg"
                  alt="Student holding passport and books for study abroad"
                  className="w-full h-auto max-h-[520px] lg:max-h-[640px] object-cover object-top hover:scale-102 transition-transform duration-700"
                />
                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                      <i className="fa-solid fa-passport"></i>
                    </div>
                    <div>
                      <span className="block text-xs font-black text-gray-900">100% Free Guidance</span>
                      <span className="block text-[11px] text-gray-500 font-medium">99% Visa Approval Rate</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    ISO-Aligned
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-200/80 order-1 lg:order-2">
              
              {/* Heading & Red Accent Bar */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f242e] tracking-tight">
                  Get FREE Counselling Today!
                </h1>
                <span className="block bg-red-600 w-8 h-1.5 rounded-full mt-2.5 mb-3.5"></span>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Enter your details and our expert will reach out to you to discuss your plans. By the way, all our services are free!
                </p>
              </div>

              {/* Status Message */}
              {statusMsg.text && (
                <div
                  className={`p-4 rounded-xl my-5 text-sm font-medium border ${
                    statusMsg.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                  role="alert"
                >
                  {statusMsg.text}
                </div>
              )}

              {/* Form Grid */}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-8">
                
                {/* 1. First Name */}
                <div>
                  <label htmlFor="enquiry-first_name" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    First name*
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="enquiry-first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.first_name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors placeholder:text-gray-400`}
                  />
                  {errors.first_name && (
                    <p className="text-red-600 text-xs mt-1">{errors.first_name}</p>
                  )}
                </div>

                {/* 2. Last Name */}
                <div>
                  <label htmlFor="enquiry-last_name" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Last name*
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="enquiry-last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.last_name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors placeholder:text-gray-400`}
                  />
                  {errors.last_name && (
                    <p className="text-red-600 text-xs mt-1">{errors.last_name}</p>
                  )}
                </div>

                {/* 3. Email Address (Full Width) */}
                <div className="sm:col-span-2">
                  <label htmlFor="enquiry-primary_email" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Email address*
                  </label>
                  <input
                    type="email"
                    name="primary_email"
                    id="enquiry-primary_email"
                    value={formData.primary_email}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.primary_email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors placeholder:text-gray-400`}
                  />
                  {errors.primary_email && (
                    <p className="text-red-600 text-xs mt-1">{errors.primary_email}</p>
                  )}
                </div>

                {/* 4. Mobile Number with Dial Code (Full Width) */}
                <div className="sm:col-span-2">
                  <label htmlFor="enquiry-primary_mobile_number" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Mobile number*
                  </label>
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      type="text"
                      disabled
                      name="dialCode"
                      id="enquiry-dialCode"
                      value="+91"
                      className="w-20 sm:w-24 text-center font-bold bg-gray-100 border border-gray-300 rounded-md py-2.5 sm:py-3 text-sm text-gray-700 select-none cursor-not-allowed"
                    />
                    <input
                      type="tel"
                      name="primary_mobile_number"
                      id="enquiry-primary_mobile_number"
                      inputMode="numeric"
                      value={formData.primary_mobile_number}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      className={`flex-1 px-3.5 py-2.5 sm:py-3 bg-white border ${
                        errors.primary_mobile_number ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                      } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors placeholder:text-gray-400`}
                    />
                  </div>
                  {errors.primary_mobile_number && (
                    <p className="text-red-600 text-xs mt-1">{errors.primary_mobile_number}</p>
                  )}
                </div>

                {/* 5. Preferred Study Destination */}
                <div>
                  <label htmlFor="enquiry-preferredCountryCode" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Your preferred study destination*
                  </label>
                  <select
                    id="enquiry-preferredCountryCode"
                    name="preferredCountryCode"
                    value={formData.preferredCountryCode}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.preferredCountryCode ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer`}
                  >
                    <option value="">Select</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Ireland">Ireland</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Dubai (UAE)">Dubai (UAE)</option>
                    <option value="Malaysia">Malaysia</option>
                  </select>
                  {errors.preferredCountryCode && (
                    <p className="text-red-600 text-xs mt-1">{errors.preferredCountryCode}</p>
                  )}
                </div>

                {/* 6. When would you like to start? */}
                <div>
                  <label htmlFor="enquiry-studyPlanTimeline" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    When would you like to start?*
                  </label>
                  <select
                    id="enquiry-studyPlanTimeline"
                    name="studyPlanTimeline"
                    value={formData.studyPlanTimeline}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.studyPlanTimeline ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer`}
                  >
                    <option value="">Select</option>
                    <option value="Now">Now</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="More than 12 months">More than 12 months</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  {errors.studyPlanTimeline && (
                    <p className="text-red-600 text-xs mt-1">{errors.studyPlanTimeline}</p>
                  )}
                </div>

                {/* 7. Nearest 13 Dreams Office */}
                <div>
                  <label htmlFor="enquiry-nearestOffice" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Nearest 13 Dreams Office*
                  </label>
                  <select
                    id="enquiry-nearestOffice"
                    name="nearestOffice"
                    value={formData.nearestOffice}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.nearestOffice ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer`}
                  >
                    <option value="">Select</option>
                    <option value="Bareilly Office">Bareilly (Civil Lines)</option>
                    <option value="Khatima Office">Khatima (Tanakpur Road)</option>
                    <option value="Virtual / Online">Virtual / Online (Pan India)</option>
                  </select>
                  {errors.nearestOffice && (
                    <p className="text-red-600 text-xs mt-1">{errors.nearestOffice}</p>
                  )}
                </div>

                {/* 8. Preferred Mode of Counselling */}
                <div>
                  <label htmlFor="enquiry-modeOfCounselling" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Preferred mode of counselling*
                  </label>
                  <select
                    id="enquiry-modeOfCounselling"
                    name="modeOfCounselling"
                    value={formData.modeOfCounselling}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.modeOfCounselling ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer`}
                  >
                    <option value="">Select</option>
                    <option value="In-person">In-person</option>
                    <option value="Virtual Counselling">Virtual Counselling</option>
                  </select>
                  {errors.modeOfCounselling && (
                    <p className="text-red-600 text-xs mt-1">{errors.modeOfCounselling}</p>
                  )}
                </div>

                {/* 9. Preferred Study Level */}
                <div>
                  <label htmlFor="enquiry-preferredStudyLevel" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    Preferred study level*
                  </label>
                  <select
                    id="enquiry-preferredStudyLevel"
                    name="preferredStudyLevel"
                    value={formData.preferredStudyLevel}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.preferredStudyLevel ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer`}
                  >
                    <option value="">Select</option>
                    <option value="Undergraduate">Undergraduate (Bachelor's)</option>
                    <option value="Postgraduate">Postgraduate (Master's)</option>
                    <option value="Doctorate">Doctorate / PhD</option>
                    <option value="Vocational">Vocational / Diploma</option>
                    <option value="School">School / High School</option>
                    <option value="English Language">English Language (IELTS / PTE)</option>
                    <option value="University Preparation">University Preparation</option>
                  </select>
                  {errors.preferredStudyLevel && (
                    <p className="text-red-600 text-xs mt-1">{errors.preferredStudyLevel}</p>
                  )}
                </div>

                {/* 10. How would you fund your education? */}
                <div>
                  <label htmlFor="enquiry-primaryFinancialSource" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                    How would you fund your education?*
                  </label>
                  <select
                    id="enquiry-primaryFinancialSource"
                    name="primaryFinancialSource"
                    value={formData.primaryFinancialSource}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
                      errors.primaryFinancialSource ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                    } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer`}
                  >
                    <option value="">Select</option>
                    <option value="Self-Funded">Self-Funded</option>
                    <option value="Parents">Parents</option>
                    <option value="Seeking Scholarship">Seeking Scholarship</option>
                    <option value="Seeking Government Scholarship">Seeking Government Scholarship</option>
                    <option value="Have Government Scholarship">Have Government Scholarship</option>
                    <option value="Bank Loan">Bank Loan</option>
                    <option value="Employer Scholarship">Employer Scholarship</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.primaryFinancialSource && (
                    <p className="text-red-600 text-xs mt-1">{errors.primaryFinancialSource}</p>
                  )}
                </div>

                {/* Checkbox 1: Terms & Privacy Policy */}
                <div className="sm:col-span-2 pt-2">
                  <label className="relative flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="termsAndConditionsAcceptance"
                      id="enquiry-termsAndConditionsAcceptance"
                      checked={formData.termsAndConditionsAcceptance}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-gray-700 leading-snug">
                      I agree to 13 Dreams{' '}
                      <Link href="/terms" className="text-red-600 underline hover:no-underline font-medium">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy-policy" className="text-red-600 underline hover:no-underline font-medium">
                        privacy policy
                      </Link>
                      *
                    </span>
                  </label>
                  {errors.termsAndConditionsAcceptance && (
                    <p className="text-red-600 text-xs mt-1 pl-8">{errors.termsAndConditionsAcceptance}</p>
                  )}
                </div>

                {/* Checkbox 2: Contact Consent */}
                <div className="sm:col-span-2">
                  <label className="relative flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="contactMeBy"
                      id="enquiry-contactMeBy"
                      checked={formData.contactMeBy}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-gray-700 leading-snug">
                      Please contact me by phone, email or SMS to assist with my enquiry*
                    </span>
                  </label>
                  {errors.contactMeBy && (
                    <p className="text-red-600 text-xs mt-1 pl-8">{errors.contactMeBy}</p>
                  )}
                </div>

                {/* Checkbox 3: Marketing Updates (Optional) */}
                <div className="sm:col-span-2">
                  <label className="relative flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="marketing_acceptance_flag"
                      id="enquiry-marketing_acceptance_flag"
                      checked={formData.marketing_acceptance_flag}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-gray-700 leading-snug">
                      I would like to receive updates and offers from 13 Dreams
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Avail FREE Counselling</span>
                    )}
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
