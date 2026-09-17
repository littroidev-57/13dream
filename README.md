# 13 Dreams Consultants — Full-Stack Next.js Clone (Phase 1)

An accurate, high-fidelity full-stack clone of [13dreamsconsultants.com](https://13dreamsconsultants.com/) built with **Next.js**, **MongoDB & Mongoose (Local)**, and **Cloudinary** media integration.

---

## 🚀 Technology Stack

- **Framework**: Next.js 16 (App Router, Server & Client Components)
- **Styling**: Vanilla CSS (`app/globals.css`), FontAwesome 6, Poppins typography
- **Backend / APIs**: Next.js Route Handlers (`app/api/*`)
- **Database**: Local MongoDB (`mongodb://localhost:27017/13dreams`) via Mongoose ODM
- **Media & Assets**: Cloudinary SDK (`lib/cloudinary.js`) with fallback CDN handling
- **SEO**: Next.js Metadata API, dynamic `sitemap.xml`, and `robots.txt`

---

## 📂 Project Architecture

```
13dreams/
├── app/
│   ├── layout.js                 # Global Root Layout (Header, Footer, WhatsApp Floating Button)
│   ├── page.js                   # Homepage matching source section hierarchy
│   ├── about-us/page.jsx         # About Us page
│   ├── service/
│   │   ├── page.jsx              # Services overview listing
│   │   └── [slug]/page.jsx       # Dynamic service detail (13 services)
│   ├── study/
│   │   └── [slug]/page.jsx       # Dynamic study abroad destination detail (8 countries)
│   ├── countries/page.jsx        # Top Countries overview listing
│   ├── story/
│   │   ├── page.jsx              # Visa Success Stories (with filter tabs)
│   │   └── [type]/page.jsx       # Dynamic story categories (/story/ielts, /story/pte)
│   ├── blog/
│   │   ├── page.jsx              # Blog listing page (Database driven)
│   │   └── [slug]/page.jsx       # Individual dynamic blog article view
│   ├── contact/page.jsx          # Contact Us page with office locations & form
│   ├── quick-query/page.jsx      # Quick Query interactive questionnaire
│   ├── events/page.jsx           # Events & Seminars
│   │
│   │   # Backend API Route Handlers
│   ├── api/
│   │   ├── enquiries/route.js        # POST / GET Home Enquiries
│   │   ├── contact/route.js          # POST / GET Contact Submissions
│   │   ├── quick-query/route.js      # POST / GET Quick Queries
│   │   ├── blogs/route.js            # GET / POST Blog Posts
│   │   ├── blogs/[slug]/route.js     # GET / PUT / DELETE Blog Post
│   │   ├── success-stories/route.js  # GET / POST Success Stories
│   │   └── cloudinary/upload/route.js # Cloudinary Image Upload
│   │
│   ├── sitemap.js                # Auto-generated Sitemap
│   ├── robots.js                 # Auto-generated Robots.txt
│   └── not-found.jsx             # Custom branded 404 Page
│
├── components/
│   ├── Header/                   # Topbar, AnnouncementBar, Navbar, MobileMenu, SidebarPopup
│   ├── Footer/                   # 4-Column Footer matching source site
│   ├── Home/                     # Hero, Highlights, EnquiryForm, Destinations, Videos, Services, Stats
│   └── UI/                       # WhatsAppButton, PageBanner, CountryDetailTemplate, ServiceDetailTemplate
│
├── lib/
│   ├── dbConnect.js              # Cached Mongoose connection helper
│   ├── cloudinary.js             # Cloudinary upload configuration
│   └── seedData.js               # Initial seed data for blogs & stories
│
├── models/
│   ├── Enquiry.js                # Enquiry Schema
│   ├── Contact.js                # Contact Schema
│   ├── QuickQuery.js             # QuickQuery Schema
│   ├── Blog.js                   # Blog Schema
│   └── SuccessStory.js           # Success Story Schema
│
└── scripts/
    └── seed.js                   # Database seeding script
```

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- **Node.js** (v18.17+ or v20+)
- **MongoDB** (Local instance running at `mongodb://localhost:27017`)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Edit `.env.local` as needed:
```env
MONGODB_URI=mongodb://localhost:27017/13dreams
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Seed Initial Data
Populate MongoDB with the original blog posts and student success stories:
```bash
npm run seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Production Build & Commands

```bash
# Build the production bundle
npm run build

# Start the production server
npm start

# Run linter
npm run lint
```

---

## 📡 API Endpoints Summary

| Endpoint | Method | Description |
|---|---|---|
| `/api/enquiries` | POST, GET | Homepage enquiry form submissions |
| `/api/contact` | POST, GET | Contact form submissions |
| `/api/quick-query` | POST, GET | Quick query student questionnaire |
| `/api/blogs` | GET, POST | Fetch all blogs or create a post |
| `/api/blogs/:slug` | GET, PUT, DELETE | Fetch, edit, or delete a blog by slug |
| `/api/success-stories` | GET, POST | Fetch categorized success stories |
| `/api/cloudinary/upload` | POST | Upload media files to Cloudinary |

---

## 📝 Phase 1 Verification Checklist

- [x] Exact navigation structure with submenus
- [x] Topbar, red announcement bar, sidebar popup, and mobile drawer
- [x] Homepage hero banner, 15-year highlights, destinations, services, and statistics
- [x] Working enquiry form submitting to local MongoDB
- [x] Working contact form and quick query form
- [x] All 8 Country pages matching layout and copy
- [x] All 13 Service pages matching layout and copy
- [x] Dynamic database-driven blog and individual article views
- [x] Success story video cards (Visa, IELTS, PTE)
- [x] Floating pulsating WhatsApp button
- [x] SEO metadata, OpenGraph, Canonical URLs, sitemap.xml, robots.txt
- [x] Full responsive behavior across desktop, tablet, and mobile
# 13dream
