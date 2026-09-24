'use client';

import React, { useState, useRef, useEffect } from 'react';

/**
 * ResponsiveSelectField
 * - On Desktop (sm: >= 640px): Standard native select element for seamless desktop browser support.
 * - On Mobile (< 640px): Custom in-container dropdown that never overflows the viewport, with
 *   sleek white background, smooth rounded corners, active red checkmark, and outside-click dismissal.
 */
export default function ResponsiveSelectField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  options = [],
  placeholder = 'Select',
  className = '',
  buttonClassName = '',
  selectClassName = '',
  labelClassName = '',
  style,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, []);

  // Normalize options array of strings or objects { value, label }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value));
  const displayText = selectedOption && selectedOption.value ? selectedOption.label : placeholder;

  return (
    <div className={`relative ${isOpen ? 'z-30' : 'z-0'} ${className}`} ref={dropdownRef} style={style}>
      {label && (
        <label
          htmlFor={id}
          className={labelClassName || 'block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5'}
        >
          {label}
        </label>
      )}

      {/* ── Desktop View (>= 640px): Native Select untouched ── */}
      <div className="hidden sm:block">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={
            selectClassName ||
            `w-full px-3.5 py-2.5 sm:py-3 bg-white border ${
              error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
            } rounded-md text-sm text-gray-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer`
          }
        >
          {placeholder && <option value="">{placeholder}</option>}
          {normalizedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Mobile View (< 640px): In-Container Custom Dropdown ── */}
      <div className="block sm:hidden relative">
        <button
          type="button"
          id={`${id}-mobile-btn`}
          onClick={() => setIsOpen((prev) => !prev)}
          className={
            buttonClassName ||
            `w-full px-3.5 py-2.5 bg-white border ${
              error
                ? 'border-red-500 ring-1 ring-red-500'
                : isOpen
                ? 'border-red-600 ring-1 ring-red-600'
                : 'border-gray-300'
            } rounded-md text-sm flex items-center justify-between text-left transition-colors cursor-pointer active:bg-gray-50`
          }
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={`truncate pr-2 ${value ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            {displayText}
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
              isOpen ? 'rotate-180 text-red-600' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div
            className="absolute left-0 right-0 top-[calc(100%+4px)] w-full z-50 bg-white rounded-xl border border-gray-200 overflow-hidden"
            style={{
              boxShadow: '0 14px 28px rgba(0,0,0,0.18), 0 6px 10px rgba(0,0,0,0.08)',
            }}
          >
            <ul
              role="listbox"
              className="max-h-56 overflow-y-auto py-1 divide-y divide-gray-50 custom-dropdown-scroll"
            >
              {normalizedOptions.map((opt) => {
                const isSelected = String(value) === String(opt.value);
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange({ target: { name, value: opt.value } });
                      setIsOpen(false);
                    }}
                    className={`px-3.5 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-red-50 text-red-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-red-600 flex-shrink-0 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
