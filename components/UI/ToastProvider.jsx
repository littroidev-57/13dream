'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 24,
        right: 24,
        zIndex: 999999,
      }}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#1f242e',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '500',
          borderRadius: '14px',
          padding: '12px 18px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
          maxWidth: '450px',
          lineHeight: '1.45',
        },
        success: {
          duration: 5000,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1.5px solid #10b981',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.18)',
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#ffffff',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1.5px solid #ef4444',
            boxShadow: '0 10px 30px rgba(239, 68, 68, 0.18)',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
