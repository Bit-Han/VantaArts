# Sheffex Arts — Artist Portfolio & CMS

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

**A full-stack artist portfolio platform with a custom-built headless CMS.**
*Built so a working artist never has to touch code again.*

[Live Demo](#) · [Admin Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## What Is This?

Sheffex Arts is a production-ready portfolio and booking platform built for a professional artist specialising in face painting, body art, and special effects makeup. What makes this project stand out is not just the frontend — it's the complete content management system built behind it.

The artist can log into a private admin dashboard and update **every single word, image, price, and section** on their live website. No Wordpress. No plugins. No developer needed after handoff.

This was built as a complete freelance product — from database schema design to deployment — and represents a real-world example of a modern fullstack web application.

---

## The Problem It Solves

Most artist websites are either:
- **Static** — beautiful but frozen in time, requiring a developer for every update
- **CMS-built** — flexible but generic, slow, and hard to customise

This project solves both problems by pairing a handcrafted, high-performance frontend with a purpose-built admin CMS that gives the artist complete control — without sacrificing design quality or performance.

---

## Features

### Public Portfolio Site
- 🎬 **Cinematic hero section** with scrubable video slides and smooth transitions
- 🖼️ **Masonry portfolio gallery** with category filtering and fullscreen lightbox
- 🎨 **Work categories grid** with 3D scroll-triggered tilt animations
- ✨ **Featured projects** section with alternating layout and scroll reveals
- 💬 **Accordion testimonials** with hover-to-expand client reviews
- 👤 **About the artist** section with clip-path image reveal animation
- 📱 **Fully responsive** across all screen sizes
- ⚡ **Server-side rendering** — pages load with data, zero layout shift

### Admin CMS Dashboard
- 🔐 **Single-admin authentication** — only one email can ever access the dashboard
- 🖊️ **Hero editor** — update heading, subtext, and manage video slides
- 👤 **About editor** — edit bio paragraphs, heading, eyebrow, and upload artist photo
- 🗂️ **Category editor** — update the 3 homepage category cards independently
- 📌 **Featured works manager** — full CRUD with accordion UI and inline image upload
- ⭐ **Testimonials manager** — add, edit, delete reviews with star rating picker
- 🛠️ **Services editor** — tab-based editor for each service with dynamic pricing tiers and icon bullets
- 🖼️ **Gallery manager** — bulk image upload, per-image category tagging, inline title editing
- ⚙️ **Site settings** — WhatsApp number, CTA text, studio brand name — all editable
- 🔍 **Global search** — search any admin section with `⌘K` keyboard shortcut

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 App Router | Server components, file-based routing, ISR |
| Language | TypeScript (strict) | End-to-end type safety, zero `any` |
| Database | Supabase (PostgreSQL) | Row Level Security, realtime, storage |
| Auth | Supabase Auth | Single-admin session, middleware protection |
| Storage | Supabase Storage | Image/video uploads with public CDN URLs |
| Styling | Tailwind CSS | Utility-first, no CSS files needed |
| Animations | GSAP + ScrollTrigger | Production-grade scroll animations |
| Images | Next.js Image | Automatic optimisation, lazy loading |

---

## Architecture Decisions

### Server Components for Data Fetching
All public pages are async Server Components that fetch data directly from Supabase at request time. This means:
- No loading spinners on the public site
- Data is always fresh without client-side fetching
- The HTML that ships to the browser already contains real content

### Service Role Client for Admin Writes
Admin API routes use Supabase's service role key which bypasses Row Level Security. The security boundary is the `verifyAdmin()` middleware check at the top of every route — not RLS. The service role key never touches the browser.

### Single Source of Truth for Types
All database row shapes live in `lib/types/database.ts`. Every API route, fetch function, and component imports from there. This means a schema change requires updating one file, and TypeScript catches every breakage at compile time.

### Props-Down Data Pattern
Server pages fetch data and pass it as props to Client Components. Client Components contain zero data fetching logic — only UI logic. This keeps animations, interactions, and GSAP code fully in the client while keeping data concerns fully on the server.

---

## Database Schema

The CMS manages 11 tables across two concerns — content and configuration:

```
site_settings      → Key-value store for global config (WhatsApp, CTA, brand name)
hero_slides        → Video slides for the hero section
hero_content       → Hero heading and subtext
about_section      → Artist bio, paragraphs, and photo
categories         → The 3 homepage work category cards
featured_works     → Selected projects on the homepage
testimonials       → Client reviews with star ratings
services           → Service pages (face painting, body art, SFX)
service_details    → Icon + text bullet points per service
service_pricing    → Pricing tiers per service
gallery_items      → Portfolio images with category tags
```

All tables have Row Level Security enabled with public read and authenticated write policies.

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sheffex-arts.git
cd sheffex-arts
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_EMAIL=admin@yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=780097654678
```

### 4. Set up the database
Copy the contents of `supabase/schema.sql` and run it in your Supabase SQL Editor. This creates all 11 tables, enables RLS, and seeds initial data.

### 5. Create the storage bucket
In your Supabase dashboard go to **Storage → New Bucket** and create a public bucket named `media`. Then run the storage policies from the schema file.

### 6. Create the admin account
In your Supabase dashboard go to **Authentication → Users → Invite User** and invite the email you set as `ADMIN_EMAIL`.

### 7. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the portfolio site and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) | ✅ |
| `ADMIN_EMAIL` | The only email allowed to access `/admin` | ✅ |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number with country code, no `+` | ✅ |

---

## Key Implementation Highlights

### Scroll Animations
Every section uses GSAP's ScrollTrigger for entrance animations. The pattern used throughout — `gsap.context()` with cleanup via `ctx.revert()` — ensures animations don't leak between navigations in the App Router:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(".element", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1,
      scrollTrigger: { trigger: section, start: "top 80%" }
    });
  }, sectionRef);

  return () => ctx.revert(); // cleanup on unmount
}, []);
```

### Video Scrubbing
The hero section supports drag-to-scrub video playback using `requestAnimationFrame` and pointer events — giving the feel of an interactive film reel.

### Type-Safe Database Layer
The fetch layer maps raw database column names (snake_case) to component-friendly prop names (camelCase) in one place:

```typescript
// lib/data/fetch.ts — mapping happens once here
return services.map((s: ServiceRow) => ({
  slug: s.slug,
  heroImage: s.hero_image_url,       // snake_case → camelCase
  longDescription: s.long_description,
  ...
}));
```

Components always receive clean camelCase props. If the database schema changes, only `fetch.ts` needs updating.

---

## What I Learned Building This

- Designing a CMS from scratch forces you to think about data relationships before writing a single line of frontend code
- The boundary between Server and Client Components in Next.js App Router is a genuine architectural decision, not just a performance hint
- Supabase's Row Level Security is powerful but you need to understand when to bypass it (admin writes via service role) versus when to respect it (public reads)
- TypeScript's `null` vs `undefined` distinction matters enormously when your data comes from a PostgreSQL database via a JavaScript ORM
- GSAP's `context()` API is essential in React — without it, ScrollTrigger instances accumulate across renders and cause subtle animation bugs

---

## Roadmap

- [ ] Email notifications when a booking inquiry comes in via WhatsApp link
- [ ] Image optimisation pipeline — auto-compress uploads before sending to Supabase Storage
- [ ] Drag-and-drop reordering for gallery items and featured works
- [ ] Preview mode — see CMS changes before publishing
- [ ] Analytics dashboard showing most-visited portfolio pieces

---

## License

MIT — feel free to use this as a reference for your own projects. If you build something with it, I'd love to see it.

---

## Author

Built by **Ovuoba Emmanuel** — a fullstack developer focused on building polished, production-ready web applications.

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](#)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](#)

---

<div align="center">

*If this project helped you, consider giving it a ⭐ — it helps others find it.*

</div>