# CLAUDE.md — Laser Quest Boulogne Website

## Project Overview

Complete redesign and modernization of the Laser Quest Boulogne website (`boulogne.laserquest.fr`).
Built from scratch as a multi-page static HTML/CSS/JS website, optimized for Vercel deployment.

## Site Architecture

### Pages
| File | URL | Description |
|------|-----|-------------|
| `index.html` | `/` | Homepage — hero, services, how it works, pricing teaser, testimonials |
| `tarifs.html` | `/tarifs` | Pricing & opening hours, special formulas, FAQ |
| `reservation.html` | `/reservation` | Online booking form |
| `anniversaire.html` | `/anniversaire` | Birthday packages for children |
| `groupes.html` | `/groupes` | Group packages, EVG/EVJF formulas |
| `seminaires.html` | `/seminaires` | Corporate seminars & team building, Laser Road service |
| `contact.html` | `/contact` | Contact form, address, OpenStreetMap embed |
| `mentions-legales.html` | `/mentions-legales` | Legal notices, CGV, privacy policy |

### CSS Architecture
```
css/
  tokens.css      — CSS custom properties (colors, spacing, typography, shadows)
  animations.css  — Keyframes and animation utility classes, scroll reveal
  style.css       — Main component styles (navbar, hero, cards, forms, footer…)
  responsive.css  — Media queries (1280px, 1024px, 768px, 480px breakpoints)
```

### JS Architecture
```
js/
  theme-toggle.js — Dark/light mode with localStorage, runs before DOMContentLoaded
  menu.js         — Burger menu, mobile navigation, tabs, accordion
  main.js         — Navbar scroll effect, scroll reveal (IntersectionObserver),
                    back-to-top, counters, hero particles, form validation, smooth scroll
```

## Design System

### Color Palette
- **Background primary:** `#0a0a0f`
- **Background secondary:** `#111118`
- **Accent red:** `#ff2d2d` (primary CTA, highlights)
- **Accent orange:** `#ff6b35` (gradient pair)
- **Electric blue:** `#00d4ff` (secondary accent, Laser Road)
- **Text primary:** `#ffffff`
- **Text muted:** `#888899`

### Typography
- **Font:** Inter (Google Fonts), fallback to system font stack
- **Weights used:** 400, 500, 600, 700, 800, 900

### Key Design Tokens
All defined in `css/tokens.css` as CSS custom properties with `--` prefix.
Light mode overrides defined under `[data-theme="light"]` selector.

## Real Content Used

All content sourced from the actual Laser Quest Boulogne website and web searches:

### Venue Details
- Address: 83 Boulevard de la Liane, 62360 Saint-Léonard
- Phone: 03 91 18 09 73
- Email: boulogne@laserquest.fr
- Arena: 500 m² on 3 levels

### Pricing (verified)
- 1 partie: 9 €
- 2 parties: 15 €
- 3 parties: 21 €
- Soirée illimitée (mar/mer/jeu soir): 20 €
- Tarif étudiant (2 parties): 10 €
- Anniversaire enfant (2 parties + boissons + bonbons): 12 €
- EVG standard (2 parties + boisson + déguisement fluo): 22 €
- EVG Premium (+ cadeau): 25 € — futur marié gratuit dès 8 personnes

### Opening Hours (regular)
- Monday: by reservation only (min. 10 players)
- Tuesday: 14h–22h30
- Wednesday: 20h30–23h30
- Thursday: 14h–22h30
- Friday: 14h–Midnight
- Saturday: 14h–18h30
- Sunday: 14h–22h30

### Opening Hours (school holidays)
- Monday: 14h30–22h30 (open!)
- Tue–Thu: 14h–22h30
- Friday: 14h–23h30
- Saturday: 14h–Midnight
- Sunday: 14h–22h30

### Services
- Standard laser game (2–30 players simultaneously)
- Birthday parties (children, from 6 years)
- Group outings (EVG, EVJF, schools, sports clubs)
- Corporate seminars & team building
- Laser Road: mobile laser game, comes to you, inflatable structure, up to 18 simultaneous players, 50+ in 3 hours
- Reception room: 50+ seated, hi-fi & video equipment, catering partners

## Features Implemented

### Navigation
- Sticky navbar with scroll-based transparency → frosted glass effect
- Active page detection and nav link highlighting
- Burger menu with hamburger→X animation
- Mobile menu with icons and CTA

### Accessibility
- ARIA labels on all interactive elements
- Breadcrumb navigation on all inner pages
- `aria-current="page"` on active nav links
- Semantic HTML5 elements (`nav`, `header`, `main`, `section`, `footer`)
- Focus-visible styles
- `prefers-reduced-motion` support for all animations
- Screen reader text where needed (`.sr-only`)

### Performance
- No external CSS frameworks
- No external JS libraries
- System font fallbacks
- Lazy loading images (`loading="lazy"`)
- IntersectionObserver for scroll reveals (no scroll event polling)
- requestAnimationFrame for smooth animations
- CSS transitions preferred over JS animations

### SEO
- Unique `<title>` and `<meta description>` per page
- Open Graph meta tags
- Twitter Card meta tags
- `<link rel="canonical">` on each page
- JSON-LD structured data (Organization, EntertainmentBusiness, Service, ContactPage)
- `sitemap.xml` with all pages
- `robots.txt`
- Proper heading hierarchy (h1–h4)

### Dark/Light Mode
- Default: dark (gaming/neon theme)
- Toggle button in navbar (sun/moon icons)
- Persisted in `localStorage` (key: `lq-theme`)
- Respects `prefers-color-scheme` if no saved preference
- Keyboard shortcut: `Alt+T`
- Smooth transition on toggle

## Deployment (Vercel)

### vercel.json
- `cleanUrls: true` — serves `/tarifs` instead of `/tarifs.html`
- `trailingSlash: false`
- Security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- Cache headers: 1-year immutable cache for CSS/JS/assets
- Redirect: `/horaires-tarifs` → `/tarifs` (from old URL structure)

### To Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
cd /home/user/Site-Laser
vercel

# Or push to GitHub and connect to Vercel dashboard
```

## Git Branch

This work is on branch: `claude/website-analysis-redesign-Qf5oy`

## File Count Summary

- 8 HTML pages
- 4 CSS files
- 3 JS files
- 1 SVG favicon
- 1 vercel.json
- 1 robots.txt
- 1 sitemap.xml
- 1 CLAUDE.md

Total: 20 files

## Maintenance Notes

1. **Prices**: Update in `tarifs.html` and the pricing sections in `index.html`, `anniversaire.html`, `groupes.html`
2. **Opening hours**: Update in `tarifs.html` (table), footer of every page, `contact.html` sidebar
3. **Contact info**: Stored literally in every page footer — consider using a CSS variable or JS include for easy updates
4. **Structured data**: JSON-LD blocks in `index.html` and `anniversaire.html` — update if hours/prices change
5. **Sitemap**: Update `<lastmod>` dates when content changes

---
Generated by Claude Code (Anthropic) — March 2025
Branch: `claude/website-analysis-redesign-Qf5oy`
