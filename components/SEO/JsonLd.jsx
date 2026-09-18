import React from 'react';

/**
 * Renders a safe, sanitized Schema.org JSON-LD script tag.
 * @param {{ data: object | object[] }} props
 */
export default function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
