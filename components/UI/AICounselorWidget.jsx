'use client';

import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

const SUGGESTED_PROMPTS = [
  '🇨🇦 What IELTS band is needed for Canada SDS?',
  '🇦🇺 Can I get Australia visa with PTE 58?',
  '🇩🇪 How to apply for Free Universities in Germany?',
  '🇬🇧 Can I get UK study visa without IELTS?',
  '📋 What documents are needed for student visa?',
  '📞 Talk to a Human Counselor in Bareilly',
];

export default function AICounselorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '👋 Hello! I am **Priya**, Senior Counselor at **13 Dreams Consultants**.\n\nAsk me anything about **IELTS/PTE score requirements, student visas, university admissions, or scholarships** for Canada, UK, Australia, Germany, USA, or New Zealand!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackCountry, setCallbackCountry] = useState('Canada');
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    if (!callbackPhone.trim() || callbackSubmitting) return;
    setCallbackSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: callbackName.trim() || 'AI Chat Student',
          phone: callbackPhone.trim(),
          email: `${callbackPhone.trim().replace(/\D/g, '') || 'student'}@chatlead.13dreams.com`,
          preferred_destination: callbackCountry,
          source: 'AI Counselor Callback Request',
          interest: `Student requested a priority callback via AI Counselor for ${callbackCountry}`,
          counseling: 'In Person or Phone Call',
          office: 'Bareilly',
        }),
      });
      const data = await res.json();
      if (data.success || data.msg) {
        setLeadCaptured(true);
        setShowCallbackForm(false);
        setCallbackName('');
        setCallbackPhone('');
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `🎉 **Thank you ${callbackName.trim() || 'Student'}!** Your priority callback request for **${callbackCountry}** has been received.\n\nOur senior counselor at Bareilly center will call you at **${callbackPhone.trim()}** within 24 hours for a 100% free profile evaluation.`,
            time: timeNow,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCallbackSubmitting(false);
    }
  };

  const handleSendMessage = async (userText) => {
    const text = (userText || input).trim();
    if (!text || loading) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const updatedMessages = [...messages, { role: 'user', content: text, time: currentTime }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();

      if (data.leadSaved) {
        setLeadCaptured(true);
      }

      const replyContent =
        data.reply ||
        data.fallbackReply ||
        'Thank you! You can also reach our counselors directly on WhatsApp at +91 9759053463.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: replyContent,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            '⚠️ Connection interrupted. For immediate free consultation, please call or WhatsApp our Bareilly center at **+91 9759053463**.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Sanitize cut-off or unclosed markdown tokens (e.g., dangling ** or *)
  const sanitizeMarkdown = (text) => {
    if (!text) return '';
    let str = text;

    // Auto-close dangling bold (**text with no closing **)
    const boldMatches = str.match(/\*\*/g);
    if (boldMatches && boldMatches.length % 2 !== 0) {
      str += '**';
    }

    // Auto-close dangling single asterisk
    const italicMatches = str.replace(/\*\*/g, '').match(/(?<!\*)\*(?!\*)/g);
    if (italicMatches && italicMatches.length % 2 !== 0) {
      str += '*';
    }

    return str;
  };

  // Helper to render authentic, resilient markdown (headings, bullets, numbered lists, bold, links, dividers)
  const renderFormattedContent = (content) => {
    if (!content) return '';
    const safeContent = sanitizeMarkdown(content);

    return (
      <div className="prose prose-sm max-w-none text-xs sm:text-sm text-gray-800 leading-relaxed">
        <Markdown
          options={{
            forceBlock: true,
            overrides: {
              h1: {
                component: ({ children, ...props }) => (
                  <h4 className="font-extrabold text-gray-950 text-xs sm:text-sm mt-3 mb-1 flex items-center gap-1.5" {...props}>
                    {children}
                  </h4>
                ),
              },
              h2: {
                component: ({ children, ...props }) => (
                  <h4 className="font-extrabold text-gray-950 text-xs sm:text-sm mt-2.5 mb-1 flex items-center gap-1.5" {...props}>
                    {children}
                  </h4>
                ),
              },
              h3: {
                component: ({ children, ...props }) => (
                  <h4 className="font-extrabold text-gray-950 text-xs sm:text-sm mt-2.5 mb-1 flex items-center gap-1.5" {...props}>
                    {children}
                  </h4>
                ),
              },
              h4: {
                component: ({ children, ...props }) => (
                  <h5 className="font-bold text-gray-950 text-xs sm:text-sm mt-2 mb-1" {...props}>
                    {children}
                  </h5>
                ),
              },
              p: {
                component: ({ children, ...props }) => (
                  <p className="my-1.5 leading-relaxed text-xs sm:text-sm text-gray-800" {...props}>
                    {children}
                  </p>
                ),
              },
              strong: {
                component: ({ children, ...props }) => (
                  <strong className="font-bold text-gray-950" {...props}>
                    {children}
                  </strong>
                ),
              },
              ul: {
                component: ({ children, ...props }) => (
                  <ul className="my-1.5 pl-4 list-disc space-y-1 text-xs sm:text-sm text-gray-800" {...props}>
                    {children}
                  </ul>
                ),
              },
              ol: {
                component: ({ children, ...props }) => (
                  <ol className="my-1.5 pl-4 list-decimal space-y-1 text-xs sm:text-sm text-gray-800 font-medium" {...props}>
                    {children}
                  </ol>
                ),
              },
              li: {
                component: ({ children, ...props }) => (
                  <li className="leading-relaxed" {...props}>
                    {children}
                  </li>
                ),
              },
              a: {
                component: ({ children, href, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 underline font-semibold hover:text-red-700"
                    {...props}
                  >
                    {children}
                  </a>
                ),
              },
              hr: {
                component: (props) => <hr className="my-2.5 border-t border-gray-200" {...props} />,
              },
            },
          }}
        >
          {safeContent}
        </Markdown>
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Launcher Button (Bottom Right - stacked above WhatsApp) */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-[86px] sm:right-6 z-[9995]">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white shadow-xl shadow-red-600/35 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white p-0 sm:px-4 sm:py-2.5"
            aria-label="Open AI Study Abroad Counselor"
          >
            {/* Mobile View: Sleek compact 48px round button */}
            <div className="flex sm:hidden items-center justify-center w-12 h-12 relative">
              <span className="text-xl">👩‍💼</span>
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </span>
            </div>

            {/* Desktop View: Full elegant capsule button */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Avatar with Online Dot */}
              <div className="relative w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                <span>👩‍💼</span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div className="text-left pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold tracking-wide uppercase">Ask AI Counselor</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[10px] font-bold border border-emerald-400/30">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-red-100 font-medium leading-tight">Instant IELTS, PTE &amp; Visa Answers</p>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-[99999] w-auto sm:w-[410px] max-w-[calc(100vw-24px)] sm:max-w-[410px] h-[550px] max-h-[84vh] bg-white rounded-2xl shadow-2xl border border-gray-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-red-950 to-red-900 p-4 text-white flex items-center justify-between shadow-md relative">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-rose-400 p-0.5 shadow-md flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-white text-red-600 flex items-center justify-center text-lg">
                    👩‍💼
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white leading-tight">Priya</h3>
                    <span className="text-[11px] font-semibold text-red-200">| 13 Dreams Advisor</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified Visa &amp; IELTS Intelligence
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowCallbackForm((prev) => !prev)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all shadow-sm ${
                    showCallbackForm
                      ? 'bg-white text-red-600'
                      : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                  }`}
                  title="Request Free Callback"
                >
                  <i className="fa-solid fa-phone text-[10px]"></i>
                  <span>Callback</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      {
                        role: 'assistant',
                        content: 'Chat refreshed! How may I assist your foreign education plans today?',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      },
                    ])
                  }
                  title="Clear Conversation"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors text-xs"
                >
                  <i className="fa-solid fa-arrow-rotate-right"></i>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors text-xs"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>
            </div>

            {/* Quick Callback Card Dropdown */}
            {showCallbackForm && (
              <form
                onSubmit={handleCallbackSubmit}
                className="bg-slate-900 border-b border-red-900/60 p-3 text-white space-y-2 animate-in slide-in-from-top-2 duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-red-300 flex items-center gap-1.5">
                    <i className="fa-solid fa-headset text-white"></i> Request Human Counselor Callback
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCallbackForm(false)}
                    className="text-gray-400 hover:text-white text-xs w-5 h-5 flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile (+91...)"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={callbackCountry}
                    onChange={(e) => setCallbackCountry(e.target.value)}
                    className="flex-1 px-2 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="USA">USA</option>
                    <option value="New Zealand">New Zealand</option>
                  </select>
                  <button
                    type="submit"
                    disabled={callbackSubmitting || !callbackPhone.trim()}
                    className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    {callbackSubmitting ? 'Saving...' : 'Book Call'}
                  </button>
                </div>
              </form>
            )}

            {/* Lead Captured Alert Banner */}
            {leadCaptured && (
              <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in fade-in">
                <span>🎉</span>
                <span>Contact noted! Our Bareilly team will reach out within 24 hours.</span>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm ${
                        isUser
                          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-200/80 rounded-bl-none'
                      }`}
                    >
                      {isUser ? <p className="leading-relaxed">{msg.content}</p> : renderFormattedContent(msg.content)}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })}

              {/* Typing Loader */}
              {loading && (
                <div className="flex items-center gap-2 bg-white border border-gray-200 px-3.5 py-2 rounded-2xl rounded-bl-none w-20 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills */}
            <div className="p-2.5 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  disabled={loading}
                  className="flex-shrink-0 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-[11px] font-medium border border-gray-200/80 transition-all duration-200 active:scale-95 whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about IELTS, PTE, Visas, Countries..."
                disabled={loading}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all bg-gray-50/50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-all active:scale-95 flex-shrink-0"
                aria-label="Send message"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </form>

            {/* Footer Tag */}
            <div className="py-1 px-3 bg-gray-50 text-center border-t border-gray-100">
              <p className="text-[10px] text-gray-400">
                13 Dreams Consultants • 100% Free Initial Assessment
              </p>
            </div>
          </div>
        )}
    </>
  );
}
