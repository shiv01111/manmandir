/**
 * Advocate Urvish — Blog CMS (separate Google Apps Script)
 * =========================================================
 * This script lives in its OWN Google Sheet called "Advocate Urvish — Blog".
 * It is separate from the Leads sheet.
 *
 * SETUP (one time):
 *  1. Create a NEW blank Google Sheet. Name it "Advocate Urvish — Blog".
 *  2. Extensions → Apps Script → delete sample code → paste this file.
 *  3. Click Deploy → New deployment → Web app
 *       Execute as: Me  |  Who has access: Anyone
 *  4. Copy the Web app URL → paste into js/config.js → BLOG_ENDPOINT
 *
 * HOW URVISH ADDS A BLOG POST (no developer needed):
 *  - Open this Google Sheet on phone or computer
 *  - Go to the "Blog Posts" tab (created automatically on first use)
 *  - Add a new row:
 *      Column A (Published): TRUE
 *      Column B (Date):      today's date  e.g. 2026-06-08
 *      Column C (Title):     title of the post
 *      Column D (Tag):       Court Marriage / Divorce / Guidance / Awareness / Legal Rights
 *      Column E (Excerpt):   1–2 line summary
 *      Column F (Body):      full article text
 *  - Save. Website updates within seconds. Done!
 *
 * To hide a post: change Published column from TRUE to FALSE.
 * To edit a post: just edit the row and save.
 */

var BLOG_HEADERS = ["Published", "Date", "Title", "Tag", "Excerpt", "Body"];

/* ── POST: save a new blog post from admin.html ────────────── */
function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    // Simple PIN check so only Urvish can publish
    var cfg   = PropertiesService.getScriptProperties();
    var pin   = cfg.getProperty("ADMIN_PIN") || "";
    if (pin && data.pin !== pin) {
      return jsonOut({ ok: false, error: "Wrong PIN" });
    }

    var sheet = getOrCreateBlogSheet();

    sheet.appendRow([
      true,
      data.date    || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd"),
      data.title   || "",
      data.tag     || "Update",
      data.excerpt || "",
      data.body    || "",
    ]);

    return jsonOut({ ok: true });

  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

/* ── GET: return published posts to the website ────────────── */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "";
  if (action === "posts") return servePosts();
  return ContentService.createTextOutput("Blog endpoint is running.");
}

function servePosts() {
  try {
    var sheet = getOrCreateBlogSheet();
    var rows  = sheet.getDataRange().getValues();
    var posts = [];

    for (var i = 1; i < rows.length; i++) {
      var r   = rows[i];
      var pub = String(r[0]).toUpperCase().trim();
      if (pub !== "TRUE") continue;

      posts.push({
        date:    toDateStr(r[1]),
        title:   String(r[2] || "").trim(),
        tag:     String(r[3] || "Update").trim(),
        excerpt: String(r[4] || "").trim(),
        body:    String(r[5] || "").trim(),
      });
    }

    posts.sort(function (a, b) { return b.date.localeCompare(a.date); });
    return jsonOut(posts);

  } catch (err) {
    return jsonOut([]);
  }
}

/* ── Helpers ───────────────────────────────────────────────── */
function getOrCreateBlogSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Blog Posts");
  if (!sheet) {
    sheet = ss.insertSheet("Blog Posts");
    sheet.appendRow(BLOG_HEADERS);
    sheet.getRange(1, 1, 1, BLOG_HEADERS.length).setFontWeight("bold").setBackground("#0f1c3f").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 100);
    sheet.setColumnWidth(2, 110);
    sheet.setColumnWidth(3, 260);
    sheet.setColumnWidth(4, 130);
    sheet.setColumnWidth(5, 260);
    sheet.setColumnWidth(6, 400);
  }
  return sheet;
}

function toDateStr(val) {
  if (!val) return "";
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(val).trim();
}

function jsonOut(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
