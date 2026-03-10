# Mayapada AI Initiatives

An interactive theatrical presentation showcasing how **Artificial Intelligence** unlocks the entire **Mayapada Group** ecosystem — transforming 40+ companies across 6 sectors into Indonesia's first AI-native conglomerate.

## Overview

Mayapada Group is a $11.9B diversified conglomerate with 40+ operating companies spanning banking, healthcare, property, hospitality, retail, and media. This web application presents a strategic narrative demonstrating how AI can create a cross-sector flywheel, starting with healthcare as the beachhead market.

**Live:** https://mayapada.situmorang.com

## Features

### 🎭 Interactive Showcase (`/`)
- **Theatrical presentation** with scroll-triggered animations
- Beautiful dark/gold design system with light theme toggle
- Journey through Mayapada's history, ecosystem, and AI vision
- Features Edmund Situmorang's background at Techconnect Academy & S-Quantum Engine

### 💼 Investor Deck (`/investor`)
- **12-section strategic brief** for institutional investors
- Confidential investor presentation format
- Deep dive into:
  - **The Problem**: Indonesia's structural AI opportunities (unbanked population, healthcare gaps, SME financing)
  - **The Edge**: Mayapada's unfair advantages (data depth, distribution, institutional trust, capital)
  - **The Strategy**: Healthcare AI as beachhead, cross-sector flywheel model
  - **The S-Quantum Engine**: Central Group AI innovation hub for rapid company transformation
  - **AI MedTech Company**: New venture positioned for NVIDIA-scale funding
  - **Market Opportunities**: $2.7B digital health, $11.1B fintech, $4.5B media AI markets
  - **Roadmap & Financials**: Multi-year execution plan and investment structure

### 🎨 Design System
- **Dark/Light Theme Toggle**: Accessibility-first design for diverse boardroom environments
- **CSS Custom Properties**: Flexible, maintainable styling
- **Responsive Design**: Mobile to desktop optimization with `clamp()`
- **Scroll Animations**: Intersection Observer API for smooth reveals

## Tech Stack

- **Framework**: SvelteKit 2.50 with Svelte 5 runes (`$state`, `$derived`)
- **Language**: TypeScript (strict mode)
- **Styling**: CSS with custom properties and theme system
- **Animations**: Intersection Observer API + CSS transitions
- **Build**: Vite with HMR
- **Deployment**: Coolify

## Project Structure

```
src/
├── lib/
│   └── data.ts                 # Central data file (companies, sectors, TAM, market insights)
├── routes/
│   ├── +layout.svelte          # Global layout wrapper
│   ├── +page.svelte            # Main showcase page
│   └── investor/
│       └── +page.svelte        # Investor pitch deck
└── app.css                     # Global styles & theme system
```

## Key Statistics

- **40+** operating companies
- **6** industry sectors
- **$11.9B** founder net worth (Forbes Oct 2025)
- **287M** addressable population (Indonesia)
- **170+** Bank Mayapada branches across 19 provinces, 61 cities
- **5** public listings (2 exchanges)
- **37 years** banking operations since 1989

## Market Opportunities

| Sector | Market Size | CAGR | Timeline |
|--------|------------|------|----------|
| Digital Health | $2.7B | 27% | 2030 |
| AI Fintech | $11.1B | 15% | 2033 |
| AI Media | $4.5B | 6% | 2031 |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/situmorang-com/mayapada-ai-showcase.git
cd mayapada-ai-initiatives
npm install
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:5173`

### Building

```bash
npm run build
```

Production-optimized build output in `build/` directory.

### Preview Production Build

```bash
npm run preview
```

## Features & Architecture

### Intersection Observer Animations
- **Scroll-triggered reveals**: Elements animate as they enter viewport
- **Stagger animations**: Child elements cascade in with 120ms delays
- **Counter animations**: Statistics count up over 1.8s with easing
- **Custom actions**: `observe()`, `stagger()`, `counter()` Svelte actions

### Theme System
- **CSS Variables**: `--color-dark`, `--color-gold`, `--text-primary`, etc.
- **Data attribute switching**: `document.documentElement.setAttribute('data-theme', ...)`
- **Light mode overrides**: `[data-theme="light"] { --color-bg: #f5f3f0; ... }`
- **Persistent in browser**: Toggle state saved across sessions

### OG/Twitter Meta Tags
- **Page-specific sharing**: Each route has complete Open Graph & Twitter Card metadata
- **Dynamic titles & descriptions**: Tailored for social media previews
- **Custom logos**: Mayapada branding for social shares

### Responsive Design
- **Fluid typography**: `clamp(1rem, 4vw, 2.5rem)` for adaptive text sizing
- **Mobile-first**: Progressive enhancement from mobile → desktop
- **Touch-friendly**: Larger click targets on mobile

## Fact-Checked Data

All statistics cross-referenced against verified sources:
- **World Bank Global Findex** (unbanked population)
- **IMF 2024** (MSME financing data)
- **Deloitte 2022** (telehealth adoption trends)
- **Forbes Oct 2025** (founder net worth)
- **Statista, Mordor Intelligence, IMARC Group** (market TAM data)

## S-Quantum Engine

Edmund Situmorang's innovation framework from Techconnect Academy/Sinarmas Innovation Center:

- **Centralized AI hub** for Group-wide innovation
- **"Group Innovators" model**: Upskilling IT teams across 40+ companies
- **Dual-structure approach**: Small daily-ops IT teams at each subsidiary + central breakthrough teams
- **Rapid deployment**: AI innovations cascade to all portfolio companies simultaneously

## AI MedTech Company

New venture combining:
- Healthcare data depth from Mayapada's hospital network
- AI expertise from S-Quantum Engine
- Positioned for institutional investment (NVIDIA, GIC, others)
- First AI company emerging from the ecosystem strategy

## Deployment

Deployed via **Coolify** at: https://mayapada.situmorang.com

- Automatic deployments on push to `main` branch
- Production build optimization
- SSL certificate management
- Environment-based configuration

## License

Proprietary — Mayapada Group

## Contact

**Edmund Situmorang**
Managing Director, Techconnect Academy & S-Quantum Engine
Mayapada Group

---

**"Where Tradition Meets Tomorrow's Intelligence"**
