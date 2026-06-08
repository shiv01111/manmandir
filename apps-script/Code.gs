/**
 * Advocate Urvish — Lead capture backend (Google Apps Script)
 * ===========================================================
 * Saves every website inquiry / WhatsApp click / call click into a
 * Google Sheet you own, and (optionally) emails you on each new lead.
 *
 * SETUP (one time) — see SETUP.md for screenshots:
 *  1. Create a new Google Sheet (this becomes your "admin" leads list).
 *  2. In the Sheet: Extensions → Apps Script. Delete any code, paste THIS file.
 *  3. (Optional) set NOTIFY_EMAIL below to get an email per lead.
 *  4. Click Deploy → New deployment → type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Copy the Web app URL.
 *  5. Paste that URL into js/config.js  →  LEADS_ENDPOINT.
 *
 * To re-deploy after editing: Deploy → Manage deployments → Edit → New version.
 */

// Optional: put your email here to be alerted on every new lead. Leave "" to disable.
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

    // Write header row once.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var row = [
      new Date(),
      data.type || "form",
      data.name || "",
      data.phone || "",
      data.service || "",
      data.message || "",
      data.page || "",
      data.language || "",
      data.referrer || "",
      data.userAgent || "",
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "New website lead: " + (data.type || "form"),
        "Name: " + (data.name || "-") +
          "\nPhone: " + (data.phone || "-") +
          "\nService: " + (data.service || "-") +
          "\nMessage: " + (data.message || "-") +
          "\nType: " + (data.type || "-") +
          "\nPage: " + (data.page || "-")
      );
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the Web app URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput("Advocate Urvish lead endpoint is running.");
}
