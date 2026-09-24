import { blogsData } from './blogsData.js';

export const initialBlogs = blogsData.map((b) => ({
  ...b,
  publishedAt: new Date(b.publishedAt),
}));

import successStories from './successStoriesData.js';

export const initialSuccessStories = successStories;

export const destinationsData = [
  {
    id: "australia",
    name: "Study in Australia",
    slug: "study-in-australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    description: "Australia has a well-deserved reputation as one of the leading educational destinations. It is the world's third most popular choice for international students.",
  },
  {
    id: "canada",
    name: "Study in Canada",
    slug: "study-in-canada",
    image: "https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=80",
    description: "Canada has been rated the world's third-best country for education. The country's cost of living is lower than most English-speaking nations with great PR pathways.",
  },
  {
    id: "uk",
    name: "Study in UK",
    slug: "study-in-uk",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    description: "The United Kingdom, or Great Britain, has been regarded as a hub of knowledge and quality education with 1-year Master's programs and Graduate Route visas.",
  },
  {
    id: "usa",
    name: "Study in USA",
    slug: "study-in-usa",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80",
    description: "The majority of students across the world dream about studying in the US of A, which tops the list of the 10 most popular countries for global academia.",
  },
  {
    id: "new-zealand",
    name: "Study in New Zealand",
    slug: "study-in-new-zealand",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80",
    description: "We all know New Zealand is a gorgeous place, but there's a lot more to it than its scenic scenery. Top universities and welcoming student visas make it a favorite.",
  },
  {
    id: "germany",
    name: "Study in Germany",
    slug: "study-in-germany",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    description: "There is so much more Germany has to offer to international students. Tuition fees are negligible in public universities with 18 months post-study work permits.",
  },
  {
    id: "malta",
    name: "Study in Malta",
    slug: "study-in-malta",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80",
    description: "Malta is one of the world's most tranquil countries, providing a great atmosphere for overseas students with Schengen access and English-taught courses.",
  },
  {
    id: "singapore",
    name: "Study in Singapore",
    slug: "study-in-singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    description: "Singapore's education system is considered world-class. The degrees provided at the world universities' Singapore campuses offer top Asian industry exposure.",
  },
  {
    id: "ireland",
    name: "Study in Ireland",
    slug: "study-in-ireland",
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=1200&q=80",
    description: "Europe's leading tech hub with world-renowned universities like Trinity College, 2-year post-study work rights, and high quality of living.",
  },
  {
    id: "switzerland",
    name: "Study in Switzerland",
    slug: "study-in-switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    description: "Global epicenter of hospitality management, scientific research, and luxury business education in the heart of Europe.",
  },
];

export const servicesData = [
  {
    id: "comprehensive-counselling",
    title: "Comprehensive Counselling",
    slug: "comprehensive-counselling",
    description: "We have professional counsellors, who are experienced in effectively assisting students in their course and country of study selection.",
    icon: "fa-podcast",
  },
  {
    id: "application-processing",
    title: "Application Processing",
    slug: "application-processing",
    description: "Students often find the application process to be intimidating. Hence our team of skilled counsellors provides extensive hand-holding to help them.",
    icon: "fa-file-lines",
  },
  {
    id: "advice-on-program-selection",
    title: "Advice on Selection of Programs",
    slug: "advice-on-program-selection",
    description: "We maintain frequent contact with the colleges we represent and remain up to speed on the various courses and programs of study they provide.",
    icon: "fa-graduation-cap",
  },
  {
    id: "assistance-with-scholarship-applications",
    title: "Scholarship Application Assistance",
    slug: "assistance-with-scholarship-applications",
    description: "Identify and secure university scholarships and bursaries that lighten the financial load of international higher studies.",
    icon: "fa-award",
  },
  {
    id: "advice-on-student-visas",
    title: "Student Visa Guidance",
    slug: "advice-on-student-visas",
    description: "End-to-end documentation scrutiny, financial sponsorship arrangement verification, and mock interview preparations for high visa success.",
    icon: "fa-passport",
  },
  {
    id: "pre-departure-assistance",
    title: "Pre-departure Support",
    slug: "pre-departure-assistance",
    description: "Briefing sessions on culture, accommodation bookings, transit arrangements, foreign exchange cards, and what to pack.",
    icon: "fa-plane-departure",
  },
  {
    id: "value-added-services",
    title: "Value Added Services",
    slug: "value-added-services",
    description: "SIM cards, student bank account setup assistance, forex transfers, and airport pickup arrangements with overseas partner bodies.",
    icon: "fa-handshake",
  },
  {
    id: "visa-counseling",
    title: "Visa Counseling",
    slug: "visa-counseling",
    description: "Specialized visa assessment tailored to applicant profiles, addressing education gaps and previous visa histories strategically.",
    icon: "fa-comments",
  },
  {
    id: "visa-processing",
    title: "Visa Processing",
    slug: "visa-processing",
    description: "Accurate filing on official high commission portals with rigorous SOP review and timely biometric and medical scheduling.",
    icon: "fa-stamp",
  },
  {
    id: "admission-assistance",
    title: "Admission Assistance",
    slug: "admission-assistance",
    description: "Direct university tie-ups enabling application fee waivers, rapid offer letters, and prompt CAS / COE issuances.",
    icon: "fa-university",
  },
  {
    id: "finance-assistance",
    title: "Finance Assistance",
    slug: "finance-assistance",
    description: "Assistance with non-collateral and collateral education loans through trusted national and private banking partners.",
    icon: "fa-coins",
  },
  {
    id: "scholarship-guidance",
    title: "Scholarship Guidance",
    slug: "scholarship-guidance",
    description: "Maximize your chances of bagging merit scholarships ranging from 10% to 50% tuition discounts across premier universities.",
    icon: "fa-file-invoice-dollar",
  },
  {
    id: "study-visa-consultants-bareilly",
    title: "Study Visa Consultants Bareilly",
    slug: "study-visa-consultants-bareilly",
    description: "Your local trusted visa office in Bareilly at Luthra Tower, Ekta Nagar, delivering international education counseling with 15+ years of excellence.",
    icon: "fa-location-dot",
  },
];
