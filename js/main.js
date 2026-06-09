/* ===========================================================
   Advocate Urvish — site behaviour
   - language toggle (EN / Gujarati)
   - hero slider
   - WhatsApp inquiry form
   - scroll reveal animations
   - blog rendering (home preview + full blog page)
   - mobile menu
   =========================================================== */

const PHONE = "6355475659";
const WA_NUMBER = "916355475659"; // wa.me uses country code, no '+'

/* ----------------------------------------------------------
   0. ANALYTICS + LEAD LOGGING (free: GA4 + Google Sheet)
   ----------------------------------------------------------
   track()   -> sends a Google Analytics 4 event (if GA4 is set up)
   logLead() -> saves a row to your Google Sheet (if endpoint is set up)
   recordContact() -> does both at once for every reach-out
   All are safe no-ops when the IDs in js/config.js are blank. */
function track(eventName, params) {
  try {
    if (typeof window.gtag === "function") window.gtag("event", eventName, params || {});
  } catch (e) {}
}

function logLead(data) {
  try {
    const cfg = window.SITE_CONFIG || {};
    if (!cfg.LEADS_ENDPOINT) return; // not configured yet -> skip silently
    const payload = Object.assign(
      {
        page: location.pathname,
        language: document.documentElement.getAttribute("lang") || "en",
        referrer: document.referrer || "",
        userAgent: navigator.userAgent || "",
      },
      data || {}
    );
    // no-cors: the request still reaches Apps Script; we don't need the response.
    fetch(cfg.LEADS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    }).catch(function () {});
  } catch (e) {}
}

/* Record a customer reach-out: fires the GA4 event AND saves to the Sheet. */
function recordContact(type, info) {
  const data = Object.assign({ type: type }, info || {});
  track(type + "_contact", { service: data.service || "", source: data.source || "" });
  logLead(data);
}

/* ----------------------------------------------------------
   1. LANGUAGE
   ---------------------------------------------------------- */
function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // placeholders
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  // update the toggle button label to show the OTHER language
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.textContent = lang === "en" ? "ગુજરાતી" : "English";
  });

  localStorage.setItem("site_lang", lang);
}

function initLanguage() {
  const saved = localStorage.getItem("site_lang") || "en";
  applyLanguage(saved);

  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("lang") || "en";
      applyLanguage(current === "en" ? "gu" : "en");
    });
  });
}

/* helper: current dictionary */
function t(key) {
  const lang = document.documentElement.getAttribute("lang") || "en";
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
}

/* ----------------------------------------------------------
   2. HERO SLIDER
   ---------------------------------------------------------- */
function initSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dotsWrap = document.querySelector(".hero-dots");
  if (slides.length === 0) return;

  let index = 0;
  let timer = null;

  // build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "hero-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Slide " + (i + 1));
    dot.addEventListener("click", () => go(i, true));
    dotsWrap && dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  function render() {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }
  function go(i, reset) {
    index = (i + slides.length) % slides.length;
    render();
    if (reset) restart();
  }
  function next() { go(index + 1); }
  function prev() { go(index - 1); }
  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  const nextBtn = document.querySelector(".hero-arrow.next");
  const prevBtn = document.querySelector(".hero-arrow.prev");
  nextBtn && nextBtn.addEventListener("click", () => go(index + 1, true));
  prevBtn && prevBtn.addEventListener("click", () => go(index - 1, true));

  render();
  restart();
}

/* image fallback: if a real photo is missing, show a branded gradient
   so the demo never looks broken */
function initImageFallbacks() {
  const grads = [
    "linear-gradient(135deg,#0f1c3f 0%,#1b2c5a 50%,#7a1f2b 100%)",
    "linear-gradient(135deg,#7a1f2b 0%,#0f1c3f 100%)",
    "linear-gradient(135deg,#1b2c5a 0%,#c9a14a 140%)",
  ];
  document.querySelectorAll(".hero-slide").forEach((slide, i) => {
    const url = slide.getAttribute("data-bg");
    if (!url) return;
    const img = new Image();
    img.onload = () => { slide.style.backgroundImage = `url('${url}')`; };
    img.onerror = () => { slide.style.backgroundImage = grads[i % grads.length]; };
    img.src = url;
  });

  // If a real photo is missing, swap to the fallback image named in
  // data-fallback so the spot always shows a real picture (never a
  // broken-image box). When the client adds the proper file, it wins.
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    let tried = false;
    const swap = () => {
      if (tried) return; // avoid loops if the fallback is also missing
      tried = true;
      const fb = img.getAttribute("data-fallback");
      if (fb) img.src = fb;
      else {
        img.style.background = "linear-gradient(135deg,#0f1c3f,#7a1f2b)";
        img.removeAttribute("src");
      }
    };
    img.addEventListener("error", swap);
    // the image may have already failed before this script ran
    if (img.complete && img.naturalWidth === 0) swap();
  });
}

/* ----------------------------------------------------------
   3. WHATSAPP INQUIRY FORM
   ---------------------------------------------------------- */
function initForm() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = (form.name.value || "").trim();
    const phone = (form.phone.value || "").trim();
    const service = form.service.value || "";
    const message = (form.message.value || "").trim();

    let text = "Namaste Advocate Urvish,%0A%0A";
    text += "I would like to inquire about your services.%0A%0A";
    if (name) text += "Name: " + encodeURIComponent(name) + "%0A";
    if (phone) text += "Phone: " + encodeURIComponent(phone) + "%0A";
    if (service) text += "Service: " + encodeURIComponent(service) + "%0A";
    if (message) text += "Message: " + encodeURIComponent(message) + "%0A";

    // Save the lead (Google Sheet) + analytics event BEFORE opening WhatsApp.
    recordContact("form", { name: name, phone: phone, service: service, message: message, source: "contact_form" });

    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
  });
}

/* a generic "inquire about X" whatsapp link builder for service cards */
function waLink(serviceName) {
  const text = encodeURIComponent(
    `Namaste Advocate Urvish, I would like to inquire about ${serviceName}.`
  );
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}
function initServiceLinks() {
  document.querySelectorAll("[data-wa-service]").forEach((a) => {
    const service = a.getAttribute("data-wa-service");
    a.href = waLink(service);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", () =>
      recordContact("whatsapp", { service: service, source: "service_card" })
    );
  });
  // generic whatsapp / call links
  document.querySelectorAll("[data-wa]").forEach((a) => {
    const msg = a.getAttribute("data-wa") || "Namaste Advocate Urvish, I need legal help.";
    a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", () =>
      recordContact("whatsapp", { message: msg, source: "whatsapp_button" })
    );
  });
  document.querySelectorAll("[data-call]").forEach((a) => {
    a.href = `tel:+${WA_NUMBER}`;
    a.addEventListener("click", () =>
      recordContact("call", { source: "call_button" })
    );
  });
}

/* ----------------------------------------------------------
   4. SCROLL REVEAL
   ---------------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
}

/* ----------------------------------------------------------
   5. BLOG RENDERING
   ---------------------------------------------------------- */
function formatDate(iso) {
  const s = String(iso || "").trim();
  // Try YYYY-MM-DD first; fall back to parsing the raw string (e.g. full JS Date string from sheet)
  const d = s.length >= 10 && s[4] === "-"
    ? new Date(s.slice(0, 10) + "T00:00:00")
    : new Date(s);
  if (isNaN(d)) return s;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function postCard(post, withBody) {
  const bodyHtml = withBody
    ? `<div class="mt-4 text-gray-600 space-y-3 leading-relaxed">${post.body
        .split("\n\n")
        .map((p) => `<p>${escapeHtml(p)}</p>`)
        .join("")}</div>`
    : `<p class="mt-3 text-gray-600 leading-relaxed">${escapeHtml(post.excerpt)}</p>`;

  return `
    <article class="reveal bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition">
      <div class="flex items-center gap-3 text-sm">
        <span class="bg-cream text-maroon font-semibold px-3 py-1 rounded-full">${escapeHtml(
          post.tag || "Update"
        )}</span>
        <span class="text-gray-400">${formatDate(post.date)}</span>
      </div>
      <h3 class="font-serif-brand text-xl font-bold text-navy mt-4">${escapeHtml(
        post.title
      )}</h3>
      ${bodyHtml}
    </article>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ── Blog post cache (localStorage, 10-min TTL) ──────────────
   Instant load on every visit; sheet refreshes silently in background. */
const BLOG_CACHE_KEY = "av_blog_v1";
const BLOG_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCachedPosts() {
  try {
    const s = localStorage.getItem(BLOG_CACHE_KEY);
    if (!s) return null;
    const obj = JSON.parse(s);
    if (Date.now() - obj.ts > BLOG_CACHE_TTL) return null; // stale
    return obj.posts || null;
  } catch (e) { return null; }
}

function setCachedPosts(posts) {
  try { localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify({ ts: Date.now(), posts })); }
  catch (e) {}
}

function initBlogPreview() {
  const wrap = document.getElementById("blogPreview");
  if (!wrap) return;
  // Show instantly: cache → static → empty
  const instant = getCachedPosts() || window.BLOG_POSTS || [];
  wrap.innerHTML = instant.slice(0, 3).map((p) => postCard(p, false)).join("");
  initReveal();
  // Refresh from sheet silently; update + re-cache if newer data arrives
  fetchSheetPosts((posts) => {
    setCachedPosts(posts);
    wrap.innerHTML = posts.slice(0, 3).map((p) => postCard(p, false)).join("");
    initReveal();
  });
}

function initBlogFull() {
  const wrap = document.getElementById("blogFull");
  if (!wrap) return;
  const instant = getCachedPosts() || window.BLOG_POSTS || [];
  wrap.innerHTML = instant.map((p) => postCard(p, true)).join("");
  initReveal();
  fetchSheetPosts((posts) => {
    setCachedPosts(posts);
    wrap.innerHTML = posts.map((p) => postCard(p, true)).join("");
    initReveal();
  });
}

function fetchSheetPosts(callback) {
  const cfg = window.SITE_CONFIG || {};
  if (!cfg.BLOG_ENDPOINT) return;
  // Reuse the fetch that config.js already started — don't open a second request
  const promise = window._blogFetch || (function () {
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    if (ctrl) setTimeout(() => ctrl.abort(), 7000);
    return fetch(cfg.BLOG_ENDPOINT + "?action=posts", ctrl ? { signal: ctrl.signal } : {})
      .then((r) => r.json()).catch(() => null);
  })();
  window._blogFetch = null; // consume once
  promise.then((posts) => {
    if (Array.isArray(posts) && posts.length) callback(posts);
  }).catch(() => {});
}

/* ----------------------------------------------------------
   6. MOBILE MENU + NAV
   ---------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => menu.classList.remove("open"))
  );
}

function initNavShadow() {
  const nav = document.getElementById("topnav");
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add("shadow-lg");
    else nav.classList.remove("shadow-lg");
  };
  window.addEventListener("scroll", onScroll);
  onScroll();
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initSlider();
  initImageFallbacks();
  initForm();
  initServiceLinks();
  initBlogPreview();
  initBlogFull();
  initMobileMenu();
  initNavShadow();
  initReveal();
  // set footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
