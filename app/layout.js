import './globals.css';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import Footer from '@/components/Footer/Footer';
import WhatsAppButton from '@/components/UI/WhatsAppButton';
import JourneyCtaBanner from '@/components/UI/JourneyCtaBanner';

export const metadata = {
  title: 'Best Study Abroad Consultants in India | Visa Consultant',
  description:
    'Get expert guidance from the best study visa consultant in India. 13Dreams Consultants helps you achieve your dream of studying abroad with complete support.',
  keywords:
    'Study Abroad Consultants in Bareilly, Study Abroad, Overseas Education Consultants, Higher Education, Foreign Education, Study Consultants, Abroad Education Consultants, IELTS, PTE, Canada Visa, UK Visa, Australia Visa, Germany Visa',
  authors: [{ name: '13 Dreams Consultants Private Limited' }],
  metadataBase: new URL('https://13dreamsconsultants.com'),
  alternates: {
    canonical: 'https://13dreamsconsultants.com/',
  },
  openGraph: {
    title: '13 Dreams Consultants Private Limited',
    description:
      'Looking for the best Study Abroad Consultants? 13 Dream Consultants – Trusted Study Visa Consultants in Bareilly and Khatima providing end-to-end assistance to study in Canada, Australia, New Zealand, the USA and UK.',
    url: 'https://13dreamsconsultants.com/',
    siteName: '13 Dreams Consultants Private Limited',
    images: [
      {
        url: 'https://13dreamsconsultants.com/img/dreams/about-1.png',
        width: 1200,
        height: 630,
        alt: '13 Dreams Consultants',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '13 Dreams Consultants Private Limited',
    creator: '@13dreamsconsultants',
    images: ['https://13dreamsconsultants.com/img/dreams/about-1.png'],
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/icon.png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body id="bg">
        <div id="page" className="site">
          <HeaderWrapper />
          <main>{children}</main>
          <JourneyCtaBanner />
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
