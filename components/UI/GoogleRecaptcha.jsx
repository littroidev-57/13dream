'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const GoogleRecaptcha = forwardRef(function GoogleRecaptcha(
  { onChange, onExpired, className = '' },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (
        typeof window !== 'undefined' &&
        window.grecaptcha &&
        widgetIdRef.current !== null
      ) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.warn('[reCAPTCHA] Reset error:', e);
        }
      }
      if (onChange) onChange('');
    },
  }));

  useEffect(() => {
    if (!siteKey) return;

    const callbackName = `onRecaptchaLoad_${Math.random().toString(36).substring(2, 9)}`;

    window[callbackName] = () => {
      setIsLoaded(true);
    };

    if (window.grecaptcha && window.grecaptcha.render) {
      setIsLoaded(true);
    } else {
      const existingScript = document.getElementById('google-recaptcha-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'google-recaptcha-script';
        script.src = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      } else {
        // Poll for grecaptcha readiness
        const interval = setInterval(() => {
          if (window.grecaptcha && window.grecaptcha.render) {
            clearInterval(interval);
            setIsLoaded(true);
          }
        }, 200);
        return () => clearInterval(interval);
      }
    }

    return () => {
      delete window[callbackName];
    };
  }, [siteKey]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !siteKey) return;

    // Render widget if not already rendered
    if (widgetIdRef.current === null && window.grecaptcha) {
      try {
        containerRef.current.innerHTML = '';
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => {
            if (onChange) onChange(token);
          },
          'expired-callback': () => {
            if (onExpired) onExpired();
            if (onChange) onChange('');
          },
          'error-callback': () => {
            console.error('[reCAPTCHA] Error occurred in widget');
            if (onChange) onChange('');
          },
        });
      } catch (err) {
        console.warn('[reCAPTCHA] Render error:', err);
      }
    }
  }, [isLoaded, siteKey, onChange, onExpired]);

  if (!siteKey) {
    // If user hasn't set the site key yet, render a subtle protected shield indicator
    return (
      <div className={`flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-lg px-3 py-2 ${className}`}>
        <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Protected by Anti-Spam &amp; IP Rate Limiting</span>
      </div>
    );
  }

  return (
    <div className={`my-3 overflow-x-auto ${className}`}>
      <div ref={containerRef} className="recaptcha-wrapper min-h-[78px]" />
    </div>
  );
});

export default GoogleRecaptcha;
