/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '13dreamsconsultants.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/countries.php',
        destination: '/countries',
        permanent: true,
      },
      {
        source: '/blog.php',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/service.php',
        destination: '/service',
        permanent: true,
      },
      {
        source: '/contact.php',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/about.php',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/apply.php',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/study-in-:slug.php',
        destination: '/study/:slug',
        permanent: true,
      },
      // ── Old service pages → /service/[slug] ──────────────────────
      { source: '/comprehensive-counselling', destination: '/service/comprehensive-counselling', permanent: true },
      { source: '/application-processing', destination: '/service/application-processing', permanent: true },
      { source: '/advice-on-program-selection', destination: '/service/advice-on-program-selection', permanent: true },
      { source: '/assistance-with-scholarship-applications', destination: '/service/assistance-with-scholarship-applications', permanent: true },
      { source: '/advice-on-student-visas', destination: '/service/advice-on-student-visas', permanent: true },
      { source: '/pre-departure-assistance', destination: '/service/pre-departure-assistance', permanent: true },
      { source: '/value-added-services', destination: '/service/value-added-services', permanent: true },
      { source: '/visa-counseling', destination: '/service/visa-counseling', permanent: true },
      { source: '/visa-processing', destination: '/service/visa-processing', permanent: true },
      { source: '/admission-assistance', destination: '/service/admission-assistance', permanent: true },
      { source: '/finance-assistance', destination: '/service/finance-assistance', permanent: true },
      { source: '/scholarship-guidance', destination: '/service/scholarship-guidance', permanent: true },
      { source: '/study-visa-consultants-bareilly', destination: '/service/study-visa-consultants-bareilly', permanent: true },
      // ── Old country pages → /study/[slug] ────────────────────────
      { source: '/study-in-australia', destination: '/study/australia', permanent: true },
      { source: '/study-in-canada', destination: '/study/canada', permanent: true },
      { source: '/study-in-uk', destination: '/study/uk', permanent: true },
      { source: '/study-in-usa', destination: '/study/usa', permanent: true },
      { source: '/study-in-new-zealand', destination: '/study/new-zealand', permanent: true },
      { source: '/study-in-germany', destination: '/study/germany', permanent: true },
      { source: '/study-in-malta', destination: '/study/malta', permanent: true },
      { source: '/study-in-singapore', destination: '/study/singapore', permanent: true },
      { source: '/study-in-ireland', destination: '/study/ireland', permanent: true },
      { source: '/study-in-switzerland', destination: '/study/switzerland', permanent: true },
      // ── Old story pages → /story/[type] ──────────────────────────
      { source: '/ielts-success-story', destination: '/story/ielts', permanent: true },
      { source: '/pte-success-story', destination: '/story/pte', permanent: true },
    ];
  },
};

export default nextConfig;

