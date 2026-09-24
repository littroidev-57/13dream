/**
 * Centralized Site Configuration for 13 Dreams Consultants
 * Guarantees production canonical URLs, structured data, and business facts.
 */

export const siteConfig = {
  siteName: '13 Dreams Consultants Private Limited',
  shortName: '13 Dreams',
  tagline: 'Best Study Abroad Consultants & Visa Experts in India',
  siteUrl: 'https://13dreamsconsultants.com', // Strict canonical production URL
  phone: '+91 96347 77761',
  phoneAlt: '+91 96347 77762',
  whatsapp: '+91 97590 53463',
  email: 'info@13dreamsconsultants.com',
  director: 'Mr. Harpreet Singh',
  foundingYear: 2011,
  offices: [
    {
      city: 'Bareilly',
      name: '13 Dreams Consultants - Bareilly Head Office',
      streetAddress: 'Luthra Tower 2nd Floor C 56 Ekta Nagar, Opp. LIC Office, Model Town',
      addressLocality: 'Bareilly',
      addressRegion: 'Uttar Pradesh',
      postalCode: '243005',
      addressCountry: 'IN',
      telephone: '+91 96347 77761',
      latitude: '28.3670',
      longitude: '79.4304',
      openingHours: 'Mo-Sa 09:30-18:30',
    },
    {
      city: 'Khatima',
      name: '13 Dreams Consultants - Khatima Branch',
      streetAddress: 'Tanakpur Road, Opp. Canara Bank',
      addressLocality: 'Khatima',
      addressRegion: 'Uttarakhand',
      postalCode: '262308',
      addressCountry: 'IN',
      telephone: '+91 96347 77762',
      latitude: '28.9213',
      longitude: '79.9678',
      openingHours: 'Mo-Sa 09:30-18:30',
    },
  ],
  socials: {
    instagram: 'https://www.instagram.com/13dreamsconsultants/',
    youtube: 'https://www.youtube.com/channel/UC2ysHlAkujP6vUzpn7ZE-tA/featured',
    facebook: 'https://www.facebook.com/13Dreamsconsultants',
    whatsapp: 'https://wa.me/+919759053463',
  },
};

/**
 * Returns an absolute URL based on the canonical domain
 * @param {string} path 
 * @returns {string}
 */
export function getCanonicalUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') return siteConfig.siteUrl;
  return `${siteConfig.siteUrl}${cleanPath.replace(/\/$/, '')}`;
}
