'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ResponsiveSelectField from '@/components/UI/ResponsiveSelectField';

const COUNTRY_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Dubai (UAE)', label: 'Dubai (UAE)' },
  { value: 'Malaysia', label: 'Malaysia' },
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'Now', label: 'Now' },
  { value: '3 months', label: '3 months' },
  { value: '6 months', label: '6 months' },
  { value: '12 months', label: '12 months' },
  { value: 'More than 12 months', label: 'More than 12 months' },
  { value: 'Not sure yet', label: 'Not sure yet' },
];

const OFFICE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'Bareilly Office', label: 'Bareilly (Ekta Nagar)' },
  { value: 'Khatima Office', label: 'Khatima (Tanakpur Road)' },
  { value: 'Virtual / Online', label: 'Virtual / Online (Pan India)' },
];

const COUNSELLING_MODE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'In-person', label: 'In-person' },
  { value: 'Virtual Counselling', label: 'Virtual Counselling' },
];

const STUDY_LEVEL_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'Undergraduate', label: "Undergraduate (Bachelor's)" },
  { value: 'Postgraduate', label: "Postgraduate (Master's)" },
  { value: 'Doctorate', label: 'Doctorate / PhD' },
  { value: 'Vocational', label: 'Vocational / Diploma' },
  { value: 'School', label: 'School / High School' },
  { value: 'English Language', label: 'English Language (IELTS / PTE)' },
  { value: 'University Preparation', label: 'University Preparation' },
];

const FINANCIAL_SOURCE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'Self-Funded', label: 'Self-Funded' },
  { value: 'Parents', label: 'Parents' },
  { value: 'Seeking Scholarship', label: 'Seeking Scholarship' },
  { value: 'Seeking Government Scholarship', label: 'Seeking Government Scholarship' },
  { value: 'Have Government Scholarship', label: 'Have Government Scholarship' },
  { value: 'Bank Loan', label: 'Bank Loan' },
  { value: 'Employer Scholarship', label: 'Employer Scholarship' },
  { value: 'Other', label: 'Other' },
];

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
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const studentFaqs = [
    {
      q: 'Is the study abroad counselling at 13 Dreams Consultants really 100% free?',
      a: 'Yes! Our initial profile assessment, university shortlisting, and career counselling sessions are 100% free with no hidden charges. We help you choose the right course and destination tailored to your career goals and budget.',
    },
    {
      q: 'Which countries can I apply to for student visas?',
      a: 'We provide end-to-end student visa guidance for Australia, Canada, United Kingdom (UK), United States (USA), Germany, New Zealand, Ireland, Singapore, Switzerland, and Malta.',
    },
    {
      q: 'What is the visa approval success rate of 13 Dreams Consultants?',
      a: '13 Dreams Consultants maintains an industry-leading 99% student visa grant rate backed by 15+ years of operational excellence, rigorous documentation audits, and dedicated mock embassy interview prep.',
    },
    {
      q: 'Do you help with IELTS / PTE coaching and test preparation?',
      a: 'Yes, we provide certified classroom and online IELTS and PTE coaching with mock tests, master trainers, and band score improvement strategies at our Bareilly & Khatima centres.',
    },
    {
      q: 'What documents are required to apply for a student visa?',
      a: 'Essential documents include academic transcripts, passport, English test scorecards (IELTS / PTE / TOEFL), Statement of Purpose (SOP), Letters of Recommendation (LOR), financial bank statements, and university acceptance letters (Offer Letter / CoE / CAS / I-20).',
    },
    {
      q: 'Can I apply for a student visa with an education gap?',
      a: 'Yes! Study gaps are accepted by many foreign universities and embassies when supported with relevant work experience certificates, skill credentials, or genuine explanations. Our experts guide you with flawless gap documentation.',
    },
  ];

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
      const valError = 'Please complete all required fields marked with *.';
      toast.error(valError);
      setStatusMsg({
        text: valError,
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
        const apiReturnText = data.message || 'We will get back to you shortly';
        toast.success(apiReturnText, {
          duration: 6000,
        });
        setStatusMsg({
          text: `🎉 ${apiReturnText}. Our senior study abroad advisor will contact you within 24 hours.`,
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
        const apiError = data.error || 'Something went wrong. Please check your details and try again.';
        toast.error(apiError);
        setStatusMsg({
          text: apiError,
          type: 'error',
        });
      }
    } catch (err) {
      console.error('Apply form submission error:', err);
      const netErr = 'Network error submitting application. Please call +91 9759053463 or try again.';
      toast.error(netErr);
      setStatusMsg({
        text: netErr,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] flex flex-col overflow-x-hidden">
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
                  alt="Student applying for overseas education visa at 13 Dreams Consultants Bareilly"
                  width={640}
                  height={800}
                  loading="eager"
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
            <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-gray-200/80 order-1 lg:order-2">

              {/* Heading & Red Accent Bar */}
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full mb-3">
                  100% Free Consultation • 99% Visa Grant Rate
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f242e] tracking-tight">
                  Apply Online for Study Visa Assistance &amp; Free Overseas Counselling
                </h1>
                <span className="block bg-red-600 w-12 h-1.5 rounded-full mt-2.5 mb-3.5"></span>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Enter your details to connect with a certified overseas education expert in Bareilly. We provide end-to-end university shortlisting, documentation guidance, and student visa assistance with ₹0 service fee!
                </p>
              </div>

              {/* Status Message */}
              {statusMsg.text && (
                <div
                  className={`p-4 rounded-xl my-5 text-sm font-medium border ${statusMsg.type === 'success'
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
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${errors.first_name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
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
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${errors.last_name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
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
                    className={`w-full px-3.5 py-2.5 sm:py-3 bg-white border ${errors.primary_email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
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
                      className={`flex-1 min-w-0 px-3.5 py-2.5 sm:py-3 bg-white border ${errors.primary_mobile_number ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                        } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors placeholder:text-gray-400`}
                    />
                  </div>
                  {errors.primary_mobile_number && (
                    <p className="text-red-600 text-xs mt-1">{errors.primary_mobile_number}</p>
                  )}
                </div>

                {/* 5. Preferred Study Destination */}
                <ResponsiveSelectField
                  id="enquiry-preferredCountryCode"
                  name="preferredCountryCode"
                  label="Your preferred study destination*"
                  value={formData.preferredCountryCode}
                  onChange={handleChange}
                  error={errors.preferredCountryCode}
                  options={COUNTRY_OPTIONS}
                />

                {/* 6. When would you like to start? */}
                <ResponsiveSelectField
                  id="enquiry-studyPlanTimeline"
                  name="studyPlanTimeline"
                  label="When would you like to start?*"
                  value={formData.studyPlanTimeline}
                  onChange={handleChange}
                  error={errors.studyPlanTimeline}
                  options={TIMELINE_OPTIONS}
                />

                {/* 7. Nearest 13 Dreams Office */}
                <ResponsiveSelectField
                  id="enquiry-nearestOffice"
                  name="nearestOffice"
                  label="Nearest 13 Dreams Office*"
                  value={formData.nearestOffice}
                  onChange={handleChange}
                  error={errors.nearestOffice}
                  options={OFFICE_OPTIONS}
                />

                {/* 8. Preferred Mode of Counselling */}
                <ResponsiveSelectField
                  id="enquiry-modeOfCounselling"
                  name="modeOfCounselling"
                  label="Preferred mode of counselling*"
                  value={formData.modeOfCounselling}
                  onChange={handleChange}
                  error={errors.modeOfCounselling}
                  options={COUNSELLING_MODE_OPTIONS}
                />

                {/* 9. Preferred Study Level */}
                <ResponsiveSelectField
                  id="enquiry-preferredStudyLevel"
                  name="preferredStudyLevel"
                  label="Preferred study level*"
                  value={formData.preferredStudyLevel}
                  onChange={handleChange}
                  error={errors.preferredStudyLevel}
                  options={STUDY_LEVEL_OPTIONS}
                />

                {/* 10. How would you fund your education? */}
                <ResponsiveSelectField
                  id="enquiry-primaryFinancialSource"
                  name="primaryFinancialSource"
                  label="How would you fund your education?*"
                  value={formData.primaryFinancialSource}
                  onChange={handleChange}
                  error={errors.primaryFinancialSource}
                  options={FINANCIAL_SOURCE_OPTIONS}
                />

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

          {/* ── SEO Authority & Trust Bar ── */}
          <div className="mt-12 sm:mt-16 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-2">
              <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">15+</div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">Years Experience</div>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">Trusted by thousands of students</p>
            </div>
            <div className="p-2 border-l border-gray-100">
              <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">99%</div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">Visa Grant Rate</div>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">Meticulous file auditing</p>
            </div>
            <div className="p-2 md:border-l border-gray-100">
              <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">150+</div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">Global Partners</div>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">Top universities &amp; colleges</p>
            </div>
            <div className="p-2 border-l border-gray-100">
              <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">₹0</div>
              <div className="text-xs sm:text-sm font-bold text-gray-900">Counselling Fee</div>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">100% Free profile assessment</p>
            </div>
          </div>

          {/* ── Section: 4-Step Application Process (SEO Keyword Rich) ── */}
          <section className="mt-14 sm:mt-20">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                Simple &amp; Transparent
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f242e] mt-3">
                How Your Free Study Abroad Application Works
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                From initial profile assessment to embassy visa stamping, our team guides you at every single step with zero confusion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm relative hover:-translate-y-1 transition-transform">
                <span className="absolute -top-3.5 left-6 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                  Step 01
                </span>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl font-bold mb-4 mt-2">
                  <i className="fa-solid fa-clipboard-check"></i>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">Free Profile Evaluation</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We analyze your academic marks, backlogs, gaps, and IELTS/PTE scores to identify eligible high-visa-success countries.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm relative hover:-translate-y-1 transition-transform">
                <span className="absolute -top-3.5 left-6 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                  Step 02
                </span>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl font-bold mb-4 mt-2">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">Course &amp; University Shortlisting</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Select from 150+ accredited global institutions offering scholarships, high employability, and post-study work rights.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm relative hover:-translate-y-1 transition-transform">
                <span className="absolute -top-3.5 left-6 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                  Step 03
                </span>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl font-bold mb-4 mt-2">
                  <i className="fa-solid fa-file-signature"></i>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">SOP &amp; Document Filing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Our professional editors refine your Statement of Purpose (SOP), recommendation letters, and financial paper trails.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm relative hover:-translate-y-1 transition-transform">
                <span className="absolute -top-3.5 left-6 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                  Step 04
                </span>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl font-bold mb-4 mt-2">
                  <i className="fa-solid fa-plane-departure"></i>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">Visa Grant &amp; Pre-Departure</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Embassy visa file submission, biometric booking, mock interview sessions, and pre-departure accommodation guidance.
                </p>
              </div>
            </div>
          </section>

          {/* ── Section: Top Study Abroad Destinations ── */}
          <section className="mt-14 sm:mt-20">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                Global Opportunities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f242e] mt-3">
                Top Student Visa &amp; Study Abroad Destinations
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Explore popular international education hubs with high PR opportunities, generous scholarships, and top-tier universities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Australia */}
              <Link
                href="/study/australia"
                className="group bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🇦🇺</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Study in Australia</h3>
                    <span className="text-xs text-gray-500">Subclass 500 Student Visa</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  World-renowned Group of Eight (Go8) universities, high minimum wages, and 2-4 years Post-Study Work rights (PSW).
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-gray-600 mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">Fast CoE Issuance</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">Part-Time Work Allowed</span>
                </div>
                <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Australia Guide →
                </span>
              </Link>

              {/* Canada */}
              <Link
                href="/study/canada"
                className="group bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🇨🇦</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Study in Canada</h3>
                    <span className="text-xs text-gray-500">Study Permit &amp; SDS Category</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Affordable tuition fees, safe multicultural cities, and up to 3-year Post-Graduation Work Permits (PGWP) leading to PR.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-gray-600 mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">SDS Stream</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">Co-op Programs</span>
                </div>
                <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Canada Guide →
                </span>
              </Link>

              {/* UK */}
              <Link
                href="/study/uk"
                className="group bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🇬🇧</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Study in the United Kingdom</h3>
                    <span className="text-xs text-gray-500">Student Route Visa</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Prestigious 1-year Master’s degrees, globally ranked Russell Group institutions, and 2-year Graduate Route visa.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-gray-600 mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">1-Year Masters</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">No IELTS Options</span>
                </div>
                <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore UK Guide →
                </span>
              </Link>

              {/* USA */}
              <Link
                href="/study/usa"
                className="group bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Study in the United States</h3>
                    <span className="text-xs text-gray-500">F-1 Student Visa &amp; STEM OPT</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Unmatched research facilities, Fortune 500 internship opportunities, and up to 36-month STEM OPT work extensions.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-gray-600 mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">STEM OPT</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">Scholarships Available</span>
                </div>
                <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore USA Guide →
                </span>
              </Link>

              {/* Germany & Europe */}
              <Link
                href="/study/germany"
                className="group bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🇩🇪</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Study in Germany &amp; Europe</h3>
                    <span className="text-xs text-gray-500">Schengen Student Visa</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  Low or zero tuition fees at public universities, strong engineering hub, and 18-month post-study job search visa.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-gray-600 mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">Zero Tuition Fees</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">Schengen Travel</span>
                </div>
                <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Germany Guide →
                </span>
              </Link>

              {/* New Zealand & Ireland */}
              <Link
                href="/study/new-zealand"
                className="group bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:border-red-500 hover:shadow-md transition-all block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🇳🇿</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">Study in New Zealand &amp; Ireland</h3>
                    <span className="text-xs text-gray-500">Fee Paying Student Visa</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  High quality of life, peaceful environment, booming European tech hub in Dublin, and straightforward work routes.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-gray-600 mb-3">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">European Silicon Valley</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">Post-Study Visa</span>
                </div>
                <span className="text-xs font-bold text-red-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore New Zealand Guide →
                </span>
              </Link>

            </div>
          </section>

          {/* ── Section: Student FAQs (Rich Schema Matching) ── */}
          <section className="mt-14 sm:mt-20">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f242e] mt-3">
                Frequently Asked Questions by Students
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Everything you need to know about study abroad counselling, document preparation, and visa applications.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {studentFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex justify-between items-center gap-4 hover:bg-gray-50/60 transition-colors cursor-pointer"
                    aria-expanded={openFaq === idx}
                  >
                    <span className="font-bold text-sm sm:text-base text-gray-900">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 text-xs flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 bg-red-50 text-red-600' : ''
                        }`}
                    >
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Section: Nearest Office & Direct Support ── */}
          <div className="mt-14 sm:mt-20 bg-gradient-to-br from-gray-900 to-[#181d24] text-white rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full">
                  Visit Our Authorized Centres
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  Prefer In-Person Counselling?
                </h2>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                  Walk in to any of our branch offices in Bareilly or Khatima for one-on-one document verification and face-to-face counselling with senior advisors.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="tel:+919759053463"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow"
                  >
                    <i className="fa-solid fa-phone"></i>
                    <span>Call +91 9759053463</span>
                  </a>
                  <a
                    href="https://wa.me/919759053463?text=Hi%2013%20Dreams,%20I%20want%20to%20apply%20for%20study%20abroad%20counselling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-red-400"></i> Bareilly Head Office
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1">
                    Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town, Bareilly, UP 243005
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-red-400"></i> Khatima Branch Office
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1">
                    Tanakpur Road, Opp. Canara Bank, Khatima, Uttarakhand 262308
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer Trust Links ── */}
          <footer className="mt-12 sm:mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
            <div>
              &copy; {new Date().getFullYear()} 13 Dreams Consultants. All rights reserved.
            </div>
            <div className="flex items-center gap-4 font-medium">
              <Link href="/privacy-policy" className="hover:text-red-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-red-600 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-red-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}
