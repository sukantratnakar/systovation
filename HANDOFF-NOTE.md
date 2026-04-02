# Systovation Publishing Website - Project Handoff

**Date:** March 25, 2026
**Status:** MVP Live, awaiting assets
**Live URL:** https://systovation.pages.dev
**Local Path:** ~/clawd/systovation/

---

## Project Overview

Systovation Publishing is an independent publishing house website for Quantraz Inc. The site showcases books, authors, and invites new authors to get published.

**Design Direction:** Modern minimalist west coast style (inspired by McSweeney's, Chronicle Books)
- Warm whites (#FAFAF8)
- Sage green accent (#2D5A4A)
- Playfair Display (headings) + Inter (body) fonts
- Generous white space
- 3D book mockups

---

## What's Been Built

### Pages Created

| Page | URL | Purpose |
|------|-----|---------|
| **Homepage** | /index.html | Hero, featured books, about section, CTA |
| **Books Catalog** | /books.html | Filterable grid of all books (by genre) |
| **Book Detail** | /book/{slug}.html | Individual book page with cover, description, preview button |
| **Flipbook Reader** | /reader/{slug}.html | PDF.js-based 10-page preview with page navigation |
| **Authors Gallery** | /authors.html | "Galaxy of authors" - featured + all authors grid |
| **Get Published** | /get-published.html | Services, process steps, inquiry form, booking link |
| **Admin Panel** | /admin.html | Manage books, view leads, toggle downloads |

### Features Implemented

1. **Book Catalog System**
   - JSON-driven (`data/books.json`)
   - Genre filtering (Business, Personal Development, Philosophy, Memoir, Children)
   - Automatic page generation via `scripts/generate-pages.js`

2. **Flipbook Preview**
   - PDF.js integration for rendering
   - Limited to first 10 pages (configurable per book)
   - Keyboard navigation (arrow keys)
   - Touch/swipe support for mobile
   - Fullscreen mode
   - "Buy Full Book" CTA on last page

3. **Lead Capture**
   - Modal form before flipbook access (name, email, phone)
   - Stores to localStorage (can connect to API)
   - Admin panel shows all captured leads with export to CSV

4. **Author Management**
   - JSON-driven (`data/authors.json`)
   - Featured authors section
   - Author cards with initials fallback for missing photos

5. **Get Published Flow**
   - Inquiry form (name, book title, genre, stage, message)
   - Cal.com booking integration: cal.com/sukant-ratnakar/45min
   - Services showcase (Editorial, Design, Distribution, Marketing, Royalties)
   - 4-step publishing journey visualization

6. **Admin Panel**
   - Password protected (Sambhav@2000)
   - Add/edit books
   - View leads with export
   - Toggle download access per book
   - Stats dashboard (total books, leads, today's leads)

---

## Data Structure

### books.json (10 books populated)
```json
{
  "id": "custodian",
  "title": "CUSTODIAN: How To Lead, Grow And Win In The Age Of AI",
  "slug": "custodian",
  "author": "Chris Black",
  "authorBio": "...",
  "description": "...",
  "cover": "/assets/covers/custodian.jpg",
  "pages": 216,
  "genre": "Business",
  "isbn": "1998440435",
  "publishDate": "2026-02-13",
  "buyLinks": {
    "amazon": "https://www.amazon.ca/...",
    "amazonUs": "https://www.amazon.com/..."
  },
  "pdfPath": "/assets/pdfs/custodian.pdf",
  "previewPages": 10,
  "downloadEnabled": false,
  "featured": true,
  "badge": "New"
}
```

### Books Currently in Catalog

| # | Title | Author | Genre | ISBN |
|---|-------|--------|-------|------|
| 1 | CUSTODIAN | Chris Black | Business | 1998440435 |
| 2 | THE FLIP EFFECT | TBD | Personal Dev | 1998440362 |
| 3 | STILL HERE | Sukant Ratnakar | Memoir | 1998440389 |
| 4 | One Match, One Brick, One Life | Ryan Myers | Personal Dev | 1998440494 |
| 5 | I'm More Than Just A Warthog | Tanya Eklund | Children | 1998440168 |
| 6 | Quantraz: A Force Within | Sukant Ratnakar | Personal Dev | 1777545021 |
| 7 | Quantraz 3.0 | Sukant Ratnakar | Philosophy | 1777858852 |
| 8 | Quantraz 6.0 | Sukant Ratnakar | Philosophy | 1990779182 |
| 9 | The Kinetic Energy of Ideas | Multiple Authors | Business | 1777545005 |
| 10 | I-Knetix | Sukant Ratnakar | Business | 1777456878 |

### authors.json (11 authors)
- Sukant Ratnakar (Founder & Author) - Featured
- Chris Black - Featured
- Ryan Myers - Featured
- Tanya Eklund (Children's Author)
- Nitin Rakesh
- Jerry Wind
- Dr. Hans Erlings
- Jamie Clarke
- Wendy Quan
- Adam Kolozetti
- Kayelyn Bullock

---

## Tech Stack

- **Frontend:** Static HTML/CSS/JS (no framework)
- **Flipbook:** PDF.js (CDN)
- **Fonts:** Google Fonts (Playfair Display, Inter)
- **Hosting:** Cloudflare Pages
- **Data:** JSON files (books.json, authors.json)
- **Storage:** localStorage for leads (can upgrade to API)

---

## File Structure

```
~/clawd/systovation/
├── data/
│   ├── books.json          # Book catalog data
│   └── authors.json        # Author profiles
├── public/
│   ├── index.html          # Homepage
│   ├── books.html          # Book catalog
│   ├── authors.html        # Authors gallery
│   ├── get-published.html  # Publishing inquiry
│   ├── admin.html          # Admin panel
│   ├── book/
│   │   ├── template.html   # Book detail template
│   │   └── {slug}.html     # Generated book pages
│   ├── reader/
│   │   ├── template.html   # Flipbook template
│   │   └── {slug}.html     # Generated reader pages
│   ├── data/
│   │   ├── books.json      # Public copy for JS
│   │   └── authors.json    # Public copy for JS
│   └── assets/
│       ├── covers/         # Book cover images (NEEDED)
│       ├── pdfs/           # Book PDFs for preview (NEEDED)
│       └── authors/        # Author headshots (NEEDED)
├── scripts/
│   └── generate-pages.js   # Generates book & reader pages from JSON
├── package.json
├── SPEC.md                 # Original specification
└── HANDOFF-NOTE.md         # This file
```

---

## What's Still Needed

### Assets (Upload to Google Drive)
- [ ] Book cover images (high-res JPG/PNG) for all 10 books
- [ ] Book PDFs (at least first 10-20 pages for preview)
- [ ] Author headshots
- [ ] THE FLIP EFFECT - who is the author?

### Links to Add
- [ ] Ingram Spark buy links
- [ ] Quantraz.com store links (direct sales)

### Optional Enhancements
- [ ] Connect lead capture to email/CRM
- [ ] Add more books as published
- [ ] Author detail pages (individual author pages)
- [ ] Book reviews/testimonials
- [ ] Newsletter signup
- [ ] Search functionality

---

## Deployment

**Current:** https://systovation.pages.dev (Cloudflare Pages)

**To Deploy Updates:**
```bash
cd ~/clawd/systovation
npm run generate                    # Regenerate book pages from JSON
cd public
npx wrangler pages deploy . --project-name=systovation --commit-dirty=true
```

**To Point Custom Domain:**
1. Add custom domain in Cloudflare Pages dashboard
2. Update DNS: CNAME systovation.com → systovation.pages.dev

---

## Admin Access

- **URL:** https://systovation.pages.dev/admin.html
- **Password:** Sambhav@2000

---

## Design Tokens

```css
--bg: #FAFAF8;           /* Warm white background */
--bg-alt: #F5F4F0;       /* Alternate background */
--text: #1A1A1A;         /* Primary text */
--text-muted: #6B7280;   /* Secondary text */
--accent: #2D5A4A;       /* Sage green (primary) */
--accent-light: #3D7A6A; /* Sage green (hover) */
--gold: #B8860B;         /* Badge/highlight color */
--border: #E5E5E3;       /* Border color */
--shadow: 0 4px 20px rgba(0,0,0,0.08);
--radius: 12px;
```

---

## Key Integrations

- **Booking:** Cal.com (cal.com/sukant-ratnakar/45min)
- **Analytics:** Not yet added (recommend Google Analytics)
- **Email:** publish@systovation.com (shown on site, not yet connected)

---

## Notes for Enhancement

1. **Flipbook could be upgraded** to use Turn.js for realistic page-flip animations
2. **Lead capture** could POST to a Cloudflare Worker or Zapier webhook
3. **Book covers** currently show Unsplash placeholders - need real images
4. **SEO** meta tags are basic - could add Open Graph, Twitter cards
5. **PWA** could be added for offline reading of previews

---

*Document prepared by Rakul for handoff/enrichment on March 25, 2026*
