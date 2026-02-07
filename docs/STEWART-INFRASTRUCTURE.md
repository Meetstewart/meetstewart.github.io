# Stewart Infrastructure Documentation
**Last Updated:** 2026-02-07 12:53 PM PST

## CURRENT STATUS - ALL SYSTEMS OPERATIONAL

### Stewart Phone Line: (805) 556-4204 ✅ LIVE
- **Provider:** Twilio → ElevenLabs Conversational AI
- **ElevenLabs Agent ID:** agent_5801kgwv2c9qen3tcn9v264erj3w
- **Voice:** Eric (cjVigY5qzO86Huf0OWal)
- **LLM Backend:** GPT-4o-mini (swap to Beast when HTTP endpoint ready)
- **Inbound:** ✅ **Outbound:** ✅

---

## PHONE NUMBERS

| Number | Name | Owner | Status |
|--------|------|-------|--------|
| (805) 556-4204 | Stewart | Public | ✅ Live |
| (949) 807-2320 | Bob | Jeff | Checking |
| (805) 519-7403 | Abby | Jonathan | Checking |

---

## HARDWARE ARCHITECTURE

| Machine | Specs | Role | IP |
|---------|-------|------|-----|
| M3 Ultra (New) | 32-core, 256GB RAM, 4TB SSD | Primary Inference - 230B models | 192.168.1.10 |
| Beast (Existing) | Mac Studio | Routing + Small Models | 98.148.232.204 |

### Model Memory (230B)

| Quantization | VRAM Needed | Fits in 256GB? |
|--------------|-------------|----------------|
| Q4_K_M | ~115GB | ✅ Yes |
| Q5_K_M | ~160GB | ✅ Yes |
| Q6_K | ~180GB | ✅ Yes |
| Q8 | ~230GB | ⚠️ Tight |

---

## KEY CONTACTS

| Name | Phone | Role |
|------|-------|------|
| Nick | (818) 212-1359 | Admin |
| Jonathan | (702) 506-2820 | CFO, Abby |
| Jeff | (949) 400-4213 | Bob |

---

## LEGAL

- **Company:** Casablanca Express, Inc.
- **Address:** 2248 Townsgate Rd, Unit 1, Westlake Village, CA 91361
- **Phone:** 800-315-2065
