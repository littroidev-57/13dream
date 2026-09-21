'use client';

import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const stepsData = [
  {
    step: 1,
    number: '01',
    phase: 'PHASE 01 • COUNSELING',
    title: 'Education Counseling',
    description:
      'One-on-one personalized counseling with our certified country specialists. Shortlist your ideal destination, institution, and career program with data-backed guidance.',
    highlights: [
      'Comprehensive Academic & Career Profile Evaluation',
      'Country, University & Program Best-Fit Matching',
      'Cost Estimation & Personalized Application Roadmap',
    ],
    badge: '15,000+ Students Guided',
  },
  {
    step: 2,
    number: '02',
    phase: 'PHASE 02 • ADMISSIONS',
    title: 'University Applications',
    description:
      'End-to-end guidance to submit winning applications to your dream university. Our expert team ensures error-free documentation and rapid offer letter turnaround.',
    highlights: [
      'Professional SOP & LOR Drafting & Polishing Support',
      'Application Fee Waiver Assistance at Partner Universities',
      'Direct University Portal Submission & Real-Time Tracking',
    ],
    badge: '300+ Partner Universities',
  },
  {
    step: 3,
    number: '03',
    phase: 'PHASE 03 • FINANCIAL AID',
    title: 'Loans & Scholarships',
    description:
      'Explore tailored financial solutions to make your global education affordable. We help you identify lucrative scholarships and secure fast education loans.',
    highlights: [
      'Merit & Need-Based Global Scholarship Identification',
      'Collateral & Non-Collateral Education Loan Assistance',
      'Fast-Track Loan Sanctioning with Trusted Banking Partners',
    ],
    badge: 'Up to 100% Scholarship Aid',
  },
  {
    step: 4,
    number: '04',
    phase: 'PHASE 04 • VISA & TRAVEL',
    title: 'Visa Processing',
    description:
      'Hassle-free visa filing backed by an industry-leading 99% approval track record. Complete end-to-end preparation from document compilation to mock interviews.',
    highlights: [
      'High-Precision Visa Filing & Strict Document Checklist Audit',
      'Rigorous One-on-One Mock Visa Interview Preparation',
      'Pre-Departure Briefings, Forex Support & Accommodation Help',
    ],
    badge: '99% Proven Visa Approval Rate',
  },
];

export default function StepProcessSection() {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStepTitle, setSelectedStepTitle] = useState('Education Counseling');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'Australia',
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  // ── True Scroll-Linked Bottom-to-Top Card Overlap ──
  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrameId = null;
    let isRunning = true;

    const onScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const winH = window.innerHeight;
        const stickyTop = 125;
        const totalScrollDistance = containerRef.current.offsetHeight - winH;

        if (totalScrollDistance > 0) {
          const currentScrolled = stickyTop - rect.top;
          targetProgress = Math.max(0, Math.min(1, currentScrolled / totalScrollDistance));
        }
      }
    };

    const renderLoop = () => {
      if (!isRunning) return;

      // Smooth damping interpolation (0.12 factor for responsive momentum)
      currentProgress += (targetProgress - currentProgress) * 0.12;

      // Card 1 (Step 2) slides from bottom (105%) to top (0%) over Card 0
      if (card1Ref.current) {
        const p1 = Math.max(0, Math.min(1, (currentProgress - 0.05) / 0.28));
        const y1 = (1 - p1) * 105;
        card1Ref.current.style.transform = `translate3d(0px, ${y1.toFixed(2)}%, 0px)`;
      }

      // Card 2 (Step 3) slides from bottom (105%) to top (0%) over Card 1
      if (card2Ref.current) {
        const p2 = Math.max(0, Math.min(1, (currentProgress - 0.36) / 0.28));
        const y2 = (1 - p2) * 105;
        card2Ref.current.style.transform = `translate3d(0px, ${y2.toFixed(2)}%, 0px)`;
      }

      // Card 3 (Step 4) slides from bottom (105%) to top (0%) over Card 2
      if (card3Ref.current) {
        const p3 = Math.max(0, Math.min(1, (currentProgress - 0.67) / 0.28));
        const y3 = (1 - p3) * 105;
        card3Ref.current.style.transform = `translate3d(0px, ${y3.toFixed(2)}%, 0px)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    renderLoop();

    return () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleOpenModal = (stepTitle) => {
    setSelectedStepTitle(stepTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStatusMsg({ text: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      const valError = 'Please complete all required fields';
      toast.error(valError);
      setStatusMsg({ text: valError, type: 'error' });
      return;
    }
    setLoading(true);
    setStatusMsg({ text: '', type: '' });
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          preferred_destination: formData.country,
          qualification: `Consultation for ${selectedStepTitle}`,
          preferredintake: 'Upcoming Intake',
        }),
      });
      const data = await res.json();
      if (data.success || data.msg) {
        const returnText = data.message || 'We will get back to you shortly';
        toast.success(returnText, { duration: 6000 });
        setStatusMsg({
          text: returnText,
          type: 'success',
        });
        setFormData({ name: '', phone: '', email: '', country: 'Australia' });
        setTimeout(() => {
          setIsModalOpen(false);
          setStatusMsg({ text: '', type: '' });
        }, 2500);
      } else {
        const apiError = data.error || 'Failed to submit enquiry';
        toast.error(apiError);
        setStatusMsg({ text: apiError, type: 'error' });
      }
    } catch (err) {
      const netError = 'Error connecting to server. Please try again.';
      toast.error(netError);
      setStatusMsg({ text: netError, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Helper to render card inner content matching 13 Dreams Theme
  const renderCardContent = (step) => (
    <>
      <div>
        <div className="flex items-center justify-between gap-4 mb-3.5">
          {/* Theme Red Phase Tag */}
          <span className="text-xs font-bold tracking-wider text-red-600 bg-red-50 border border-red-200/80 px-3 py-1 rounded-full uppercase">
            {step.phase}
          </span>
          <span className="text-3xl md:text-4xl font-extralight text-gray-900 tracking-tight">
            {step.number}
          </span>
        </div>

        <h3 className="text-2xl md:text-[25px] font-bold text-gray-900 mb-2.5 leading-tight">
          {step.title}
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
          {step.description}
        </p>

        {/* Key Highlights / Feature Checkmarks in Theme Red */}
        <div className="space-y-2 mb-4">
          {step.highlights.map((highlight, hIdx) => (
            <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-gray-700">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center mt-0.5 text-[10px]">
                <i className="fa-solid fa-check"></i>
              </span>
              <span className="font-medium">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Bottom: Roomy Bottom Padding with Brand Red Button */}
      <div className="pt-3.5 pb-1 border-t border-slate-200/90 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          id={`openPopup${step.step}`}
          onClick={() => handleOpenModal(step.title)}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 transition-all duration-200 active:scale-95"
          style={{ color: '#ffffff' }}
        >
          <span style={{ color: '#ffffff' }}>Free Expert Consultation</span>
          <i
            className="fa-solid fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: '#ffffff' }}
          ></i>
        </button>

        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
          <i className="fa-solid fa-shield-halved text-red-600"></i>
          {step.badge}
        </span>
      </div>
    </>
  );

  return (
    <>
      {/* ── Scroll Track: Keeps screen locked in the viewport across 4 steps ── */}
      <section
        ref={containerRef}
        className="relative bg-gradient-to-b from-white via-slate-50 to-white"
        style={{ height: '360vh' }}
      >
        {/* ── Sticky Pinned Viewport: Screen stays fixed showing Title + Cards + Image ── */}
        <div
          className="sticky flex flex-col justify-center"
          style={{
            top: '125px',
            height: 'calc(100vh - 125px)',
            minHeight: '620px',
            maxHeight: '940px',
          }}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            {/* ── Section Header (Permanently Visible in the Viewport) ── */}
            <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                <span className="text-red-600">4 Steps</span> to Your Dream Destination
              </h2>
              <p className="mt-2.5 text-sm md:text-base text-gray-600">
                Our proven step-by-step roadmap turns your study abroad aspiration into an official university acceptance.
              </p>
            </div>

            {/* ── Main Two-Column Layout ── */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative max-w-6xl mx-auto">
              {/* ── Left Column: Overlapping Cards with Height 430px & Roomy Padding ── */}
              <div
                className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden"
                style={{
                  height: '430px',
                  boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.12)',
                }}
              >
                {/* ── Card 0: Base Step 1 ── */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl p-7 md:p-8 pb-7 md:pb-8 flex flex-col justify-between"
                  style={{
                    background: 'linear-gradient(145deg, #f8fafc 0%, #edf3f9 100%)',
                    border: '2px solid #dce5f0',
                    zIndex: 1,
                    transform: 'translate3d(0px, 0px, 0px)',
                  }}
                >
                  {renderCardContent(stepsData[0])}
                </div>

                {/* ── Card 1: Step 2 ── */}
                <div
                  ref={card1Ref}
                  className="absolute inset-0 w-full h-full rounded-3xl p-7 md:p-8 pb-7 md:pb-8 flex flex-col justify-between will-change-transform"
                  style={{
                    background: 'linear-gradient(145deg, #f8fafc 0%, #edf3f9 100%)',
                    border: '2px solid #dce5f0',
                    zIndex: 2,
                    boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.12), 0 16px 36px -6px rgba(15, 23, 42, 0.12)',
                    transform: 'translate3d(0px, 105%, 0px)',
                  }}
                >
                  {renderCardContent(stepsData[1])}
                </div>

                {/* ── Card 2: Step 3 ── */}
                <div
                  ref={card2Ref}
                  className="absolute inset-0 w-full h-full rounded-3xl p-7 md:p-8 pb-7 md:pb-8 flex flex-col justify-between will-change-transform"
                  style={{
                    background: 'linear-gradient(145deg, #f8fafc 0%, #edf3f9 100%)',
                    border: '2px solid #dce5f0',
                    zIndex: 3,
                    boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.12), 0 16px 36px -6px rgba(15, 23, 42, 0.12)',
                    transform: 'translate3d(0px, 105%, 0px)',
                  }}
                >
                  {renderCardContent(stepsData[2])}
                </div>

                {/* ── Card 3: Step 4 ── */}
                <div
                  ref={card3Ref}
                  className="absolute inset-0 w-full h-full rounded-3xl p-7 md:p-8 pb-7 md:pb-8 flex flex-col justify-between will-change-transform"
                  style={{
                    background: 'linear-gradient(145deg, #f8fafc 0%, #edf3f9 100%)',
                    border: '2px solid #dce5f0',
                    zIndex: 4,
                    boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.12), 0 16px 36px -6px rgba(15, 23, 42, 0.12)',
                    transform: 'translate3d(0px, 105%, 0px)',
                  }}
                >
                  {renderCardContent(stepsData[3])}
                </div>
              </div>

              {/* ── Right Column: Matching Height 430px Sticky Hero Image ── */}
              <div
                className="w-full lg:w-1/2 relative"
                style={{ height: '430px' }}
              >
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[#dce5f0] shadow-2xl flex flex-col justify-end"
                  style={{
                    background: '#0c1a30',
                  }}
                >
                  {/* Background Student Journey Image */}
                  <img
                    src="/img/homepage/study-abroad-student-journey.jpg"
                    alt="International student ready for study abroad journey with travel luggage and passport"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />

                  {/* Subtle Gradient Overlays for High Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top-Right Floating Badge (Cross-Side 1) */}
                  <div className="absolute top-5 right-5 pointer-events-none z-10">
                    <div className="bg-red-600 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg text-[11px] font-bold border border-red-400/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      13 Dreams Journey
                    </div>
                  </div>

                  {/* Bottom-Left Floating Stat Card (Cross-Side 2) */}
                  <div className="absolute bottom-5 left-5 pointer-events-none z-10">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-base flex-shrink-0">
                        <i className="fa-solid fa-passport"></i>
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-gray-900 leading-none mb-1">99% Success</div>
                        <div className="text-[11px] text-gray-500 font-medium leading-tight">Visa Approvals</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Consultation Modal ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-7 md:p-8 shadow-2xl relative border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center text-base transition-colors"
              aria-label="Close Modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="mb-5">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-md">
                13 Dreams Guidance
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                Book Consultation
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Selected: <span className="font-semibold text-gray-800">{selectedStepTitle}</span>
              </p>
            </div>

            {statusMsg.text && (
              <div
                className={`p-3 rounded-xl mb-4 text-xs font-medium ${statusMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
              >
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Destination</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-all"
                >
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Malta">Malta</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ color: '#ffffff' }}
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                    <span style={{ color: '#ffffff' }}>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: '#ffffff' }}>Schedule Free Call</span>
                    <i className="fa-solid fa-arrow-right text-xs" style={{ color: '#ffffff' }}></i>
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-2">
                100% Confidential • No spam • Expert response within 24 hours
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
