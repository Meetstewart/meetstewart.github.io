# Stewart System Documentation

## Product Overview

**Stewart** is an AI virtual executive service. Casual name: "Stew". Users are called "Stewsers".

**Core Positioning:** "We do one thing: create value through virtual staff members."

**Brand Voice:** Clean, smart, sophisticated, fun on vacation while professional and charismatic in the boardroom. Easy to talk to, unassuming, smartest person in room but humble. No hype, no "revolutionary", no "10x" - results speak louder than claims.

---

## Product Structure

### Stewart (The Manager) - $500/mo
- AI virtual executive
- Execution agent + light work in all areas
- Manages up to 10 total staff (human OR virtual combined)
- Orchestrates all work across team
- Communicates on user's behalf via all channels
- *"That's a $60k/year executive assistant. For $500/month."*

### 5 Specialists - Stewart's Team

| Specialist | Role | Price |
|-----------|------|-------|
| **Voice** | Brand Ambassador | $400/mo |
| **Builder** | Technical/Coding | $400/mo |
| **Creator** | Design/Content | $400/mo |
| **Analyst** | Data/Efficiency | $400/mo |
| **Support** | Task/Coordination | $300/mo |

### Package Tiers

| Package | Monthly | Includes |
|---------|---------|----------|
| **Solo** | $500 | Stewart only |
| **Dream Team Bundle** | $2,000 | Stewart + 4 specialists + Support FREE |

---

## Free Trial Structure

**Duration:** 14 days  
**Card Required:** Yes (collected upfront via Accept.js)

### Free Trial Access
✅ Web UI chat only  
✅ 10-minute voice widget demo (browser-based)  
❌ NO text messaging (paid only)  
❌ NO phone calls (paid only)

### Trial Deliverables (Smart Friction)
- **WE keep the deliverables**
- **They get VIEW ONLY access**
- **Copy/paste is PLAIN TEXT ONLY** (no formatting, no styling)
- They see the value but have to pay to use it productively

### Billing Timeline
- Card collected on signup
- **First charge:** Day 15
- **Then:** Monthly recurring

---

## $500/mo Paid Package Details

### Core Components
- **Managed virtual AI shared workstation** - Their Stewart agent has actual VM access
- **Text messaging** - Tasklet handles directly for paid users
- **Voice phone line** - Direct line to their Stewart
- **AI training wizards** - Human support team helps them **instruct** their virtual team (NOT "we build it for you")

### Custom Workstation Setup
- **Choice of OS:** Mac, Windows, or Linux
- **Company email:** stewart@theirclient.com (their domain)
- **Phone extension:** Forwarded to Stewart direct line
- **Custom software:** Any specialized software installed
- **Custom API/skill connections:** They learn to command, Stewart executes

### Onboarding Timeline

| Phase | When | What |
|-------|------|------|
| **Immediate** | Day 1 | Email, calendar, number crunching |
| **Immediate** | Day 1 | Intros to team and family |
| **Full Deployment** | 7-10 days | Custom VM with specialized software |

**Key Messaging:**
- *"Your AI employee shows up Day 1. Their corner office is ready in a week."*
- *"We don't just give you tools. We teach you to run your AI team."*
- *"There is no company out there that builds custom APIs for $500 a month"*

---

## Payment Integration

### Platform: Authorize.net ARB (Automated Recurring Billing)

### Payment Flow
1. Collect card via Accept.js on checkout page
2. Create ARB subscription with 14-day trial period
3. First charge hits on day 15
4. Monthly recurring after that

### California Auto-Renewal Law Compliance

**Before Purchase (Checkout Page):**
- Clear disclosure of price, trial length, auto-renewal terms
- Explicit consent checkbox
- Cancellation instructions visible
- No buried or confusing language

**After Purchase:**
- Confirmation email with full terms
- How to cancel instructions
- Easy cancellation method provided

**Cancellation Method:**
- One-click cancellation in account dashboard
- Must be as easy as signup
- "Manage subscription" with cancel button (like Apple does)

**Note:** Trial under 31 days = no advance reminder email required

---

## Phone System Architecture

**Stewart's Number:** (805) 600-8901

**Correct Flow:**
```
Twilio → ElevenLabs Conversational AI → Beast (LLM) → back
```

**NOT using Retell** - Direct integration only.

### Beast (LLM Brain)
- **Websocket:** `wss://98.148.232.204:8091/llm-websocket` ✅ Works
- |
 **HTTP endpoint needed:** `/v1/chat/completions` (OpenAI-compatible)
- **Health check:** `http://98.148.232.204:8091/health`
- **Docs:** `http://98.148.232.204:8091/docs`

### ElevenLabs
- **Stewart's Voice:** Eric (used in all voice widgets and samples)
- **Conversational AI:** Needs HTTP endpoint from Beast for integration

---

## Database (Caspio)

**Base URL:** `https://c3afw288.caspio.com/rest/v2/`  
**Token URL:** `https://c3afw288.caspio.com/oauth/token`

**Key Tables:**
- `CB_Payments_Setup` - Stores payment credentials
- `rims_data` - Main data table

---

## GitHub / Website

**Organization:** github.com/meetstewart  
**Live Site:** meetstewart.github.io  
**Domain:** meetstewart.com

**Deployment Note:** GitHub Pages has 1-5 minute cache delay

### Current Pages
- `/` - Homepage with animated robot
- `/subscribe.html` - Lead capture / checkout
- `/terms.html` - Terms of service
- `/privacy.html` - Privacy policy
- `/voice-widget/` - Voice demo widget

---

## Legal Entity

**Company:** Casablanca Express, Inc.  
**Address:** 2248 Townsgate Rd, Unit 1, Westlake Village, CA 91361  
**Phone:** 800-315-2065  
**Privacy Requests:** optout@casablancaexpress.com

All terms and privacy pages must reference "Stewart is a service of Casablanca Express, Inc."

---

## StewBox (Hardware)

Future hardware product line:

| Model | Description | Price |
|-------|-------------|-------|
| **StewBox Lite** | Base model Mac Mini workstation | $1,500 |
| **StewBox Ultra** | High-end M3 Ultra chip | TBD |