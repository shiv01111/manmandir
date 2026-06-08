# SETUP GUIDE — Advocate Urvish website (free tools)

This guide turns the website into a lead-capturing, measurable, SEO-ready site using
**only free services**. Do the steps once. After each step you paste an ID/URL into
**`js/config.js`**. The site keeps working even if you do these later.

---

## STEP 1 — Save customer inquiries to a Google Sheet (free)
1. Go to https://sheets.google.com and create a **new blank sheet**. Name it
   "Advocate Urvish — Leads". This sheet is your **admin list of customers**.
2. In the sheet menu: **Extensions → Apps Script**.
3. Delete any sample code. Open `apps-script/Code.gs` from this project, copy ALL of it,
   and paste it into the Apps Script editor.
   - (Optional) To get an email for every new lead, set `NOTIFY_EMAIL = "you@gmail.com"`.
4. Click **Deploy → New deployment**. Click the gear → choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, allow the permissions it asks for.
5. Copy the **Web app URL** (ends with `/exec`).
6. Open **`js/config.js`** and paste it into `LEADS_ENDPOINT`.

✅ Now every form submission and WhatsApp/Call click is saved as a row in your sheet
(Timestamp, Type, Name, Phone, Service, Message, Page, Language…).

---

## STEP 2 — See how many viewers (Google Analytics 4, free)
1. Go to https://analytics.google.com → **Admin → Create → Property**. Enter a name,
   country **India**, currency **INR**.
2. Create a **Web** data stream with your site URL.
3. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`).
4. Paste it into **`js/config.js`** → `GA4_ID`.

✅ In GA4 you can now see: total **viewers**, where they're from, device, traffic source,
and **events** (`whatsapp_contact`, `call_contact`, `form_contact`) = how many customers
reached out. Look under **Reports → Realtime** and **Reports → Engagement → Events**.

---

## STEP 3 — (Optional) Heatmaps & recordings (Microsoft Clarity, free)
1. Go to https://clarity.microsoft.com → create a project with your site URL.
2. Copy the **Project ID** → paste into **`js/config.js`** → `CLARITY_ID`.
✅ See exactly how visitors scroll/click (helps improve the page).

---

## STEP 4 — Put the site online for free (Netlify)
1. Go to https://app.netlify.com → **Add new site → Import from GitHub** → pick the
   `manmandir` repo. No build command needed; publish directory = `/` (root). Deploy.
2. You get a free address like `https://advocate-urvish.netlify.app`.
3. **Update the address everywhere:** in `js/config.js` set `SITE_URL`, and replace
   `https://advocate-urvish.netlify.app` in `index.html`, `blog.html`, `sitemap.xml`,
   and `robots.txt` with your real Netlify URL (or your custom domain later).
4. Every time you `git push`, Netlify re-deploys automatically.

> Custom domain later: in Netlify → Domain settings → add your domain (~₹800/yr from any
> registrar). Better for branding + SEO.

---

## STEP 5 — Get found on Google (free SEO)
1. **Google Search Console:** https://search.google.com/search-console → add your site →
   verify (Netlify makes this easy with a DNS/HTML method) → **submit `sitemap.xml`**.
2. **Bing Webmaster Tools** (optional): https://www.bing.com/webmasters → submit sitemap.
3. Use Google's **Rich Results Test** on your URL to confirm the business info shows.

---

## STEP 6 — Google Business Profile (the BIGGEST free booster)
You already have a listing. Optimize it:
1. https://business.google.com → open your profile.
2. Set the primary **category** to "Family law attorney" (add "Marriage license bureau",
   "Legal services").
3. Add **services** (Court Marriage, Love Marriage, Marriage Registration, Divorce…),
   **photos**, working hours, and your **website link** (the Netlify/custom URL).
4. **Ask every happy client for a Google review** — this is the #1 thing that makes you
   rank above competitors for "court marriage advocate near me".
5. Post updates weekly (offers, tips) — same topics as your blog.

---

## STEP 7 — Keep ranking (ongoing, free)
- Add a **blog post** regularly: edit `js/posts.js` (newest at top). Write about local
  topics like "documents for court marriage in Ahmedabad" — these bring search traffic.
- Share each post on **Instagram/WhatsApp status** (add your real Instagram link in the
  footer of `index.html`).
- List your business on **JustDial / Sulekha** with the SAME name, address, phone (NAP).

---

## Where to see everything (your "admin")
| You want to know… | Look here |
|---|---|
| Customer names/phones/messages | Your **Google Sheet** (Sheets app on phone) |
| How many people visited | **GA4 → Reports → Realtime / Engagement** |
| How many clicked WhatsApp / Call | **GA4 → Events** (`whatsapp_contact`, `call_contact`) |
| How visitors use the page | **Microsoft Clarity** (if enabled) |
| Search ranking & keywords | **Google Search Console** |

## Better photos (quality)
The current hero/about photos are low-resolution. For a crisper site, replace the files
in `images/` with **higher-resolution originals** using the same names
(`hero-1.webp` … `hero-4.webp`, `advocate.png`). No code change needed.
