# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## Project overview
A **single-purpose marketing/portfolio website** for **Advocate Urvish**, a
court-marriage advocate in Ahmedabad. It is a **static site** (no build step, no
backend, no framework) designed to be opened directly in a browser or served as
static files. The goal is lead generation: visitors call, WhatsApp, or submit an
inquiry form that opens a pre-filled WhatsApp chat.

- **Repo:** https://github.com/shiv01111/manmadir (`main` branch)
- **Tech:** Plain HTML + Tailwind CSS (CDN) + vanilla JavaScript
- **Languages:** Bilingual — English + Gujarati (in-page toggle)
- **Hosting:** Local demo for now; ready for GitHub Pages / Netlify / Vercel

## Business details (single source of truth)
- **Name:** Advocate Urvish — qualifications **B.Com, LL.B**
- **Tagline:** "One of the best court marriage advocates in Ahmedabad"
- **Phone / WhatsApp:** `6355475659` → intl `+91 6355475659` → `wa.me/916355475659`
- **Office:** Chandkheda, Alpha Square Society, Near Highway Mall, Ahmedabad, Gujarat
- **Business listing / map:** "Manmandir Marriage Point, Chandkheda, Ahmedabad"
- **Experience shown:** 4+ years
- **Instagram:** link is a placeholder (`href="#"`) in the footer — to be filled in
- **Hours:** Mon–Sat, 9:00 AM – 8:00 PM

If any of these change, update them in `index.html`, `blog.html`, and
`js/translations.js` (the phone/WhatsApp number also lives in `js/main.js`).

## File structure
```
index.html          # Home: nav, hero slider, services, about, process, blog preview, contact, footer
blog.html           # Full blog listing page
css/styles.css      # Custom styles: brand colors, hero slider, animations, floating buttons
js/translations.js  # EN + GU dictionary (keyed by data-i18n attributes)
js/posts.js         # Blog posts array — EDIT THIS to add daily law updates
js/main.js          # Language toggle, slider, WhatsApp form, scroll reveal, blog render
images/             # Photos (see "Images" below)
.claude/launch.json # Preview server config (npx serve on port 4321)
```

## Key constants / where things live
- **Phone + WhatsApp number:** `PHONE` and `WA_NUMBER` in `js/main.js` (also hard-coded
  in `tel:`/`wa.me` links and the visible text in `index.html`/`blog.html`).
- **Brand colors:** defined twice — once as CSS vars in `css/styles.css`
  (`--navy`, `--maroon`, `--gold`, `--cream`) and once in the inline
  `tailwind.config` `<script>` in each HTML file (so `bg-navy/95` opacity utilities
  work). Keep both in sync.
- **Fonts:** Playfair Display (headings), Poppins (body), Noto Sans/Serif Gujarati
  (Gujarati) — loaded via Google Fonts in each HTML `<head>`.

## How common tasks work
### Add / edit a blog post
Edit `js/posts.js`. Copy a block in the `BLOG_POSTS` array and put the newest at the
TOP. Fields: `date` (YYYY-MM-DD), `title`, `excerpt`, `body` (use blank lines for
paragraphs), `tag`. Home shows the latest 3; `blog.html` shows all.

### Bilingual text
Any element with `data-i18n="some.key"` is translated from `js/translations.js`
(`en` and `gu` objects). Placeholders use `data-i18n-ph`. To add new translatable
text: add the key to BOTH `en` and `gu`, then reference it via `data-i18n`.
Legal service bullet items are intentionally left in English (standard legal terms).

### Services
Six categorized cards in `index.html` (#services): Marriage & Registration; Divorce &
Separation; Matrimonial Crimes & Protection; Maintenance, Alimony & Custody; High Court
& Supreme Court; Registration & Documentation. Each card's "Inquire on WhatsApp" link
uses `data-wa-service="..."` which `main.js` turns into a pre-filled wa.me link. The
contact-form dropdown options mirror these categories.

### Contact form
`#inquiryForm` in `index.html`. On submit, `initForm()` in `main.js` builds a WhatsApp
message (Name/Phone/Service/Message) and opens `wa.me/916355475659`. **No backend** —
nothing is stored or emailed.

### Floating buttons & CTAs
`data-wa` → pre-filled WhatsApp link; `data-call` → `tel:` link; `data-wa-service` →
service-specific WhatsApp link. All wired in `initServiceLinks()` in `main.js`.

## Images
Photos live in `images/`. The site references these exact names:
- `hero-1.webp` … `hero-4.webp` — hero slider (client's real wedding photos)
- `advocate.png` — Advocate Urvish portrait (About section)
- `advocate.webp` — fallback used if `advocate.png` is missing

**Robust fallback:** `<img data-fallback="...">` swaps to the fallback file if the
primary is missing (handled in `initImageFallbacks()` in `main.js`), so the site never
shows a broken-image box. Hero slides use `data-bg` + a JS preloader with a gradient
fallback.

**Important – image quality:** the hero is a **two-column layout with a framed 4:5
portrait slider on the right** specifically because the client's photos are portrait
phone photos. Earlier full-bleed versions looked blurry because the supplied photos
were low-resolution (~280–510px). For best results, replace with higher-resolution
originals using the same filenames — no code change needed.

There may be a stray `images/advocate urvish.enc` file (incomplete/encrypted upload);
it is unused and safe to delete.

## Analytics, leads & SEO (free stack)
Added in the second phase. All driven by `js/config.js` (`window.SITE_CONFIG`) which holds
`SITE_URL`, `LEADS_ENDPOINT`, `GA4_ID`, `CLARITY_ID`. `config.js` is loaded in the `<head>`
of every page BEFORE `main.js` and lazy-loads GA4/Clarity only when IDs are present.
- **Lead capture:** `logLead()` in `main.js` POSTs (mode `no-cors`) to a Google Apps
  Script web app (`apps-script/Code.gs`) that appends a row to a Google Sheet. The script
  is the source of truth the client pastes into Apps Script.
- **Analytics events:** `track()` in `main.js` sends GA4 events. `recordContact(type,info)`
  does both (event + sheet) and is called from `initForm()` (type `form`) and from the
  click handlers in `initServiceLinks()` (types `whatsapp` / `call`). Event names:
  `form_contact`, `whatsapp_contact`, `call_contact`.
- **All helpers are safe no-ops when the config IDs are blank** — never break the site.
- **SEO:** each HTML `<head>` has keyword title/description, Open Graph + Twitter tags,
  canonical, and JSON-LD `LegalService` schema. `sitemap.xml` + `robots.txt` at root.
  Hero slides have `role="img"` + `aria-label`. **The placeholder domain
  `https://advocate-urvish.netlify.app` appears in head tags, `sitemap.xml`, `robots.txt`
  and `config.js` — find/replace it everywhere when the real domain is known.**
- **Client setup** (creating GA4 / Sheet / Netlify / Search Console / Business Profile) is
  documented step-by-step in `SETUP.md`. Hosting target is Netlify (`netlify.toml`).

## Run / preview
Static site — open `index.html` directly, OR serve it:
```
npx serve -l 4321 .
```
(`.claude/launch.json` defines a "site" preview server on port 4321.)
Note: the embedded Google Maps iframe keeps a network connection open, which can make
automated full-page screenshot tools time out — verify via DOM inspection instead.

## Deploy (when ready)
- **GitHub Pages:** repo → Settings → Pages → Branch `main` / root → site at
  `https://shiv01111.github.io/manmadir/`.
- **Netlify / Vercel:** drag-and-drop the folder or connect the repo; no build command
  needed (publish directory = root).

## Conventions / gotchas
- No build tooling — do not introduce a bundler unless asked.
- Keep brand colors synced between `css/styles.css` and the inline `tailwind.config`.
- When changing the phone number, update `js/main.js`, the `tel:`/`wa.me` hrefs, AND
  the visible text in both HTML files.
- This is a real small-business client demo — favor clear, professional, conversion-
  focused copy; keep the bilingual toggle working for any new UI text.
