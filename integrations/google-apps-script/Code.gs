/**
 * Ace Bathroom Renovations Brisbane — quote form relay
 *
 * Purpose: deliver website enquiries straight to a Gmail inbox from that same
 * Gmail account, so delivery does not depend on a third-party sender's domain
 * reputation (the reason `onboarding@resend.dev` was landing in spam).
 *
 * What it does, per submission:
 *   1. Verifies a shared token taken from the web app URL. Fails closed: the
 *      script refuses every request until CONFIG.sharedToken is changed.
 *   2. Appends the enquiry to a Google Sheet (a permanent backup of every lead).
 *      Works whether the script is standalone or bound to a sheet.
 *   3. Emails the enquiry to the address in CONFIG.toEmail, from that account.
 *
 * Setup: see docs/DEPLOYMENT.md §3.8 "Gmail relay (Google Apps Script)".
 */

var CONFIG = {
  // Where enquiries are emailed. Must be the account that owns this script
  // (or an address it is allowed to send to).
  toEmail: 'AceBathroomRenovationsBrisbane@gmail.com',

  // Sheet that stores a permanent copy of every enquiry.
  sheetName: 'Enquiries',

  // Shared secret. Must match the ?token= value in the web app URL you paste
  // into QUOTE_WEBHOOK_URL. Change it before deploying — while it still reads
  // CHANGE-ME the script rejects every request.
  sharedToken: 'CHANGE-ME-TO-A-LONG-RANDOM-STRING',

  // Optional: send a short confirmation to the enquirer when they gave an email.
  sendConfirmation: false
};

var DEFAULT_TOKEN = 'CHANGE-ME-TO-A-LONG-RANDOM-STRING';

function doPost(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};

    // Fail closed. An unset token must not turn the endpoint into an open relay.
    if (!CONFIG.sharedToken || CONFIG.sharedToken === DEFAULT_TOKEN) {
      return jsonOut({ ok: false, error: 'sharedToken not configured' });
    }
    if (String(params.token || '') !== CONFIG.sharedToken) {
      return jsonOut({ ok: false, error: 'unauthorised' });
    }

    var data = parseBody(e);
    if (!data.name && !data.phone) {
      return jsonOut({ ok: false, error: 'empty submission' });
    }

    // A sheet problem must never lose the lead: email first, then archive.
    var sheetStatus = 'ok';
    try {
      appendToSheet(data);
    } catch (error) {
      sheetStatus = 'failed: ' + String(error && error.message ? error.message : error);
    }

    sendEnquiryEmail(data);

    return jsonOut({ ok: true, id: data.receivedAt, sheet: sheetStatus });
  } catch (error) {
    // Still return 200 with ok:false so the caller logs a useful reason.
    return jsonOut({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function doGet() {
  return jsonOut({ ok: true, service: 'ace-quote-relay' });
}

function parseBody(e) {
  var raw = (e && e.postData && e.postData.contents) || '';
  var parsed = {};
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      // Fall back to url-encoded form posts.
      raw.split('&').forEach(function (pair) {
        var bits = pair.split('=');
        if (bits[0]) parsed[decodeURIComponent(bits[0])] = decodeURIComponent((bits[1] || '').replace(/\+/g, ' '));
      });
    }
  }
  var pick = function (key) { return String(parsed[key] == null ? '' : parsed[key]).trim(); };
  return {
    receivedAt: pick('receivedAt') || new Date().toISOString(),
    name: pick('name'),
    phone: pick('phone'),
    email: pick('email'),
    suburb: pick('suburb'),
    property: pick('property'),
    project: pick('project'),
    budget: pick('budget'),
    timeline: pick('timeline'),
    message: pick('message'),
    source: pick('source') || 'website',
    ipAddress: pick('ipAddress'),
    consent: parsed.consent === true || parsed.consent === 'yes' || parsed.consent === 'on'
  };
}

/**
 * The script may be standalone (script.google.com → New project), in which case
 * SpreadsheetApp.getActiveSpreadsheet() returns null. On first use we create a
 * spreadsheet and remember its id in Script Properties, so later submissions
 * keep landing in the same file.
 */
function getSheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SPREADSHEET_ID') || '';
  var ss = null;

  if (id) {
    ss = SpreadsheetApp.openById(id);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      ss = SpreadsheetApp.create('Ace Bathroom Renovations — enquiries');
      props.setProperty('SPREADSHEET_ID', ss.getId());
    }
  }

  var sheet = ss.getSheetByName(CONFIG.sheetName);
  if (!sheet) sheet = ss.insertSheet(CONFIG.sheetName);
  return sheet;
}

function appendToSheet(data) {
  var sheet = getSheet_();
  var baseHeaders = [
    'Received', 'Name', 'Phone', 'Email', 'Suburb', 'Property',
    'Project', 'Budget', 'Timeline', 'Message', 'Source', 'Consent'
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(baseHeaders);
    sheet.setFrozenRows(1);
  }

  // Add the new column without disrupting an existing sheet or its old rows.
  var lastColumn = Math.max(sheet.getLastColumn(), baseHeaders.length);
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  var ipColumn = headers.indexOf('IP Address') + 1;
  if (!ipColumn) {
    ipColumn = lastColumn + 1;
    sheet.getRange(1, ipColumn).setValue('IP Address');
  }
  sheet.getRange(1, 1, 1, Math.max(ipColumn, baseHeaders.length)).setFontWeight('bold');

  var row = [
    data.receivedAt, data.name, data.phone, data.email, data.suburb, data.property,
    data.project, data.budget, data.timeline, data.message, data.source,
    data.consent ? 'yes' : 'no'
  ];
  while (row.length < ipColumn - 1) row.push('');
  row[ipColumn - 1] = data.ipAddress || '';
  sheet.appendRow(row);
}

function sendEnquiryEmail(data) {
  var lines = [
    'New website enquiry — ' + data.source,
    '',
    'Name: ' + data.name,
    'Phone: ' + data.phone,
    'Email: ' + (data.email || 'Not provided'),
    'Suburb: ' + data.suburb,
    data.property ? 'Property: ' + data.property : '',
    data.project ? 'Project: ' + data.project : '',
    data.budget ? 'Budget: ' + data.budget : '',
    data.timeline ? 'Timeline: ' + data.timeline : '',
    '',
    'Message:',
    data.message || '(none)',
    '',
    'Received: ' + data.receivedAt,
    '',
    'Reply to this email to contact the enquirer.'
  ].filter(Boolean).join('\n');

  var options = {
    name: 'Ace Bathroom Renovations Brisbane — website',
    subject: 'Website enquiry: ' + (data.name || 'Unknown') + ' — ' + (data.suburb || 'Brisbane')
  };
  if (data.email) options.replyTo = data.email;

  MailApp.sendEmail(CONFIG.toEmail, options.subject, lines, options);

  if (CONFIG.sendConfirmation && data.email) {
    MailApp.sendEmail(
      data.email,
      'We received your enquiry — Ace Bathroom Renovations Brisbane',
      'Hi ' + (data.name || 'there') + ',\n\n' +
        'Thanks for your enquiry about ' + (data.project || 'your bathroom') + ' in ' + (data.suburb || 'Brisbane') + '.\n' +
        'Our team will call you on ' + (data.phone || 'the number you provided') + ' between 7am and 10pm, seven days.\n\n' +
        'If it is urgent, call (07) 8590 6941.\n\n' +
        'Ace Bathroom Renovations Brisbane'
    );
  }
}

function jsonOut(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
