# Meet Stewart - Virtual Executive Platform

**Live Site:** https://meetstewart.com

## Overview

Stewart is an AI-powered Virtual Executive (VE) platform that provides businesses with intelligent assistants for task management, communication, and business operations.

## Site Structure

| Page | URL | Description |
|------|-----|-------------|
| **Homepage** | `/index.html` | Marketing landing page with pricing, features, StewBox section |
| **Login** | `/login.html` | Authentication portal (Sign In / Sign Up tabs) |
| **Dashboard** | `/dashboard.html` | User dashboard with VE interaction, calendar, tasks |
| **Privacy Policy** | `/privacy.html` | Privacy policy for compliance |
| **Terms & Conditions** | `/terms.html` | Terms of service |
| **SMS Opt-in** | `/sms/` | SMS consent page for Twilio A2P compliance |

## Backend API

**Base URL:** `https://casablancaexpress.com/api/`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/login.php` | POST | User authentication |
| `/signup.php` | POST | New user registration |
| `/verify.php` | POST | Session token verification |
| `/logout.php` | POST | Session termination |

**Database:** MySQL on InMotion Hosting (`casabl14_stew`)

## Pricing (Updated Feb 6, 2026)

| Plan | Price |
|------|-------|
| **Stewart** | $199/mo ($99 intro rate for 90 days) |
| **Admin** | $80/mo |
| **Specialist** | $120/mo |
| **Dedicated Phone Line** | +$100/mo |
| **Dedicated Server** | +$200/mo |
| **StewBox Support** | +$300/mo |

## Features

### Homepage
- Hero section with waving Stew Memoji
- 5 skill-based traits with green checkmarks
- Integration logos grid (Stewart centered)
- StewBox hardware section
- Voice trial section with call button (+1 805-261-5972)
- Pre-Launch Beta badge
- Team section (Engineer & Designer roles)

### Login Page
- Mobile-optimized, iPhone responsive
- Tabbed interface (Sign In / Sign Up)
- Forgot password functionality
- Dark theme with gold accents
- API integration with InMotion backend

### Dashboard
- **Layout:** VE response area (2/3) + collapsible cards (1/3)
- **Mobile:** Hamburger menu with slide-out drawer
- **Stats Bar:** Trial days, tasks done, hours saved, stewdays
- **Collapsible Cards:** Schedule, Projects, Tasks, Activity
- **Customization:**
  - Full Avataaars avatar builder with live preview
  - Voice selection (8+ ElevenLabs voices)
  - Speech settings (speed, stability, clarity)
  - Bot name input with suggestions
- **Calendar View:** Today → Week → Month (3 tabs)
- **People Management:** Contact cards with personality descriptions
- **Chat:** Contextual demo responses based on keywords
- **Auth Required:** Redirects to login if no valid session

### Mobile Optimizations
- Viewport-fit with safe area insets
- Touch-friendly hamburger menu (44x44px target)
- iOS Safari touch event handling
- 16px font size (prevents zoom on focus)
- GPU-accelerated fixed positioning

## Changelog

### Feb 6, 2026
- ✅ Migrated API from Beast/Cloudflare tunnel to InMotion Hosting
- ✅ Fixed login.html to use new API endpoint
- ✅ Added auth check to dashboard (redirects if not logged in)
- ✅ Implemented contextual chat responses (calendar, email, tasks, reports)
- ✅ Fixed hamburger menu for iOS Safari
- ✅ Added send button to chat input
- ✅ Updated pricing structure
- ✅ Removed non-functional quick action buttons
- ✅ Fixed safe-area-inset for iPhone home indicator

### Feb 5, 2026
- ✅ Dashboard v6 deployed with full customization
- ✅ Avataaars avatar builder integrated
- ✅ Calendar component with 3 view modes
- ✅ People management section
- ✅ Beta banner added

### Feb 4, 2026
- ✅ Privacy policy and Terms pages deployed
- ✅ SMS opt-in page for Twilio compliance
- ✅ Voice trial section on homepage

### Earlier
- ✅ Initial site launch
- ✅ Login page created
- ✅ Dashboard v1-v5 iterations
- ✅ Integration logos section
- ✅ StewBox hardware section

## Technical Stack

- **Frontend:** Static HTML/CSS/JavaScript (GitHub Pages)
- **Backend:** PHP 8.x on InMotion Hosting
- **Database:** MySQL (casabl14_stew)
- **Hosting:** GitHub Pages (frontend), InMotion Dedicated Server (API)
- **SSL:** Cloudflare (frontend), InMotion (API)
- **Voice:** Retell AI + Twilio + ElevenLabs

## User Accounts

| User | Role | Bot Name |
|------|------|----------|
| Nick | Admin | Stewart |
| Jonathan | Client | Abby |
| Jeff | Client | Bob |

## Development Notes

- Use `Virtual Exec` in public-facing content
- Use `VE` for internal/dashboard references
- All tasks require user attribution (no anonymous tasks)
- Session tokens expire after 24 hours
- Passwords hashed with PHP `password_hash()` (bcrypt)

## Contact

- **Support:** nick@casablancaexpress.com
- **Phone:** +1 805-261-5972 (Stewart)
