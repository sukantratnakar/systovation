# Systovation Publishing - Website Spec

## Project Overview
**Domain:** systovation.com
**Hosting:** Cloudflare Pages
**Style:** Modern minimalist west coast (McSweeney's/Chronicle Books inspired)

## Core Features

### 1. Homepage
- Hero with featured book
- Book catalog grid
- About section
- CTA to browse/request

### 2. Book Catalog
- Grid of book covers
- Filter by genre/author (future)
- Click → Book detail page

### 3. Book Detail Page
- Large cover image / 3D mockup
- Title, author, description
- **"Read Preview" button** → Request form → Flipbook
- **"Buy Now" button** → Amazon/Quantraz links

### 4. Flipbook Reader
- First 10 pages only (preview mode)
- Page flip animation
- Fullscreen option
- Download disabled by default
- Admin toggle to enable full access

### 5. Request Form (Pre-Flipbook)
- Required before reading
- Fields: Name, Email, Phone (optional)
- Purpose: Lead capture
- Stores in JSON/DB
- Then redirects to flipbook

### 6. Admin Panel
- Simple password-protected page
- View/export lead list
- Toggle download access per book
- Add/edit books

## Tech Stack
- Static site (HTML/CSS/JS)
- Turn.js or pdf.js for flipbook
- Cloudflare Pages hosting
- JSON data storage (books, leads)
- No database needed initially

## Pages
- /index.html (Homepage)
- /books.html (Catalog)
- /book/{slug}.html (Detail pages)
- /reader/{slug}.html (Flipbook)
- /admin.html (Admin panel)

## Color Palette (West Coast Minimal)
- Background: #FAFAF8 (warm white)
- Text: #1A1A1A (soft black)
- Accent: #2D5A4A (sage green)
- Secondary: #B8860B (golden)
- Muted: #6B7280 (gray)

## Typography
- Headlines: Playfair Display (elegant serif)
- Body: Inter (clean sans-serif)

## Status
- [ ] Homepage design
- [ ] Book catalog
- [ ] Book detail pages
- [ ] Flipbook reader
- [ ] Request form
- [ ] Admin panel
- [ ] Deploy to Cloudflare

## Timeline
Target: Complete by tomorrow morning (March 26, 2026)
