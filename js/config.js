/* ===========================================================
   SITE CONFIG  —  paste your free service IDs here
   -----------------------------------------------------------
   Fill these in after creating the free accounts (see SETUP.md).
   The site works fine even while they are blank.
   =========================================================== */
window.SITE_CONFIG = {
  // Public website address (used for SEO links). Update after deploy.
  SITE_URL: "https://advocate-urvish.netlify.app",

  // Google Apps Script Web App URL that saves inquiries to your Leads Sheet.
  // SETUP.md → Step 1.
  LEADS_ENDPOINT: "https://script.google.com/macros/s/AKfycbwyA_UAbF7Od51HiS5FWb-GZobze-yXcEVjqFrwyZzCV9D8wTQ1U7u0UiSec-bs57NEmA/exec",

  // Google Apps Script Web App URL for the SEPARATE Blog Sheet (apps-script/Blog.gs).
  // SETUP.md → Step 1b.  Paste the Blog.gs deployment URL here.
  BLOG_ENDPOINT: "https://script.google.com/macros/s/AKfycbwMj7b86s1vQhVBFDMi9XFyYY1GZgY1PZPlA5d9HFeHEqKuS5qKtFzGGuPzCRaoq4ZpSg/exec",

  // Google Analytics 4 Measurement ID.  SETUP.md → Step 2.  Example: "G-XXXXXXXXXX"
  GA4_ID: "",

  // (Optional) Microsoft Clarity project ID for heatmaps.  SETUP.md → Step 3.
  CLARITY_ID: "",
};

/* ---- Loads analytics only if IDs are provided (no errors when blank) ---- */
(function () {
  var c = window.SITE_CONFIG || {};

  // Google Analytics 4
  if (c.GA4_ID) {
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + c.GA4_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", c.GA4_ID);
  }

  // Microsoft Clarity (optional heatmaps / session recordings)
  if (c.CLARITY_ID) {
    (function (m, a) {
      m[a] = m[a] || function () { (m[a].q = m[a].q || []).push(arguments); };
      var t = document.createElement("script");
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + c.CLARITY_ID;
      document.head.appendChild(t);
    })(window, "clarity");
  }
})();
