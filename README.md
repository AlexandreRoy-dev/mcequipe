# mcequipe

Site statique MC Équipe (`mcequipe.ca`).

## Questionnaire timing (`timing-vente.html`)

Interactive CDF-style quiz (landing → Q&A → score → lead). Leads go to GHL via `api/lead.js` (upsert + tags + notes). Location: `Y8Re2KAEZ8qraFHn5Ll1`.

### Local

```bash
# optional: copy .env.example → .env.local and set GHL_PIT
node scripts/timing-server.mjs
# → http://127.0.0.1:4173/timing-vente.html
# → POST /api/lead
```

Without `GHL_PIT`, the quiz UI works; lead submit returns `Server not configured`.

### Production

Point `MC_LEAD_ENDPOINT` at `https://leads.devis-expert.ca/mcequipe/api/lead` (already set for non-localhost). Deploy `api/lead.js` on that host with env:

- `GHL_PIT`
- `GHL_LOCATION_ID=Y8Re2KAEZ8qraFHn5Ll1`

Tags applied: `form-eval`, `évaluation-timing`, `Lead Vendeur`, `verdict-*`.

The simple ACM form remains on `evaluation.html` (Formspree), with a link to this quiz.
