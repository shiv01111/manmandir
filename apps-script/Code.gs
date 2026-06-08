/**
 * Advocate Urvish — Lead capture (Google Apps Script)
 * ====================================================
 * Saves every website inquiry / WhatsApp click / call click into the
 * "Advocate Urvish — Leads" Google Sheet.
 *
 * SETUP (one time) — see SETUP.md:
 *  1. Create a new Google Sheet named "Advocate Urvish — Leads".
 *  2. Extensions → Apps Script → delete sample code → paste this file.
 *  3. (Optional) set NOTIFY_EMAIL to get an email per lead.
 *  4. Deploy → New deployment → Web app (Execute as: Me, Access: Anyone).
 *  5. Paste the Web app URL into js/config.js → LEADS_ENDPOINT.
 *
 * Blog posts use a SEPARATE sheet + script: see apps-script/Blog.gs
 */

var NOTIFY_EMAIL = "";

var HEADERS = [
  "Timestamp", "Type", "Name", "Phone", "Service",
  "Message", "Page", "Language", "Referrer", "User Agent",
];

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.type     || "form",
      data.name     || "",
      data.phone    || "",
      data.service  || "",
      data.message  || "",
      data.page     || "",
      data.language || "",
      data.referrer || "",
      data.userAgent || "",
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "New website lead: " + (data.type || "form"),
        "Name: "    + (data.name    || "-") + "\n" +
        "Phone: "   + (data.phone   || "-") + "\n" +
        "Service: " + (data.service || "-") + "\n" +
        "Message: " + (data.message || "-") + "\n" +
        "Type: "    + (data.type    || "-") + "\n" +
        "Page: "    + (data.page    || "-")
      );
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Advocate Urvish lead endpoint is running.");
}
