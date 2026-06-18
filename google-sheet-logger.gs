/**
 * Google Apps Script to automatically log payments from your website.
 * 
 * HOW TO DEPLOY:
 * 1. Open a Google Sheet (blank or existing).
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete any code in the editor and paste this script.
 * 4. Click the "Save" icon (or Ctrl+S).
 * 5. Click "Deploy" (top right) > "New deployment".
 * 6. Select type: "Web app".
 * 7. Set settings:
 *    - Description: "Payment Logger API"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (crucial so your website backend can call it)
 * 8. Click "Deploy" and authorize permissions when prompted.
 * 9. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec)
 * 10. Paste this URL into your website's .env file as `GOOGLE_SHEET_WEBAPP_URL`.
 */

function doPost(e) {
  try {
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create headers if they don't exist yet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Order ID / Type", 
        "Customer Name", 
        "Email", 
        "Phone Number", 
        "Amount (INR)", 
        "UTR / Ref Number", 
        "Screenshot URL"
      ]);
      // Format headers bold
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#e82e32").setFontColor("#ffffff");
    }
    
    var timestamp = new Date();
    var orderTypeLabel = data.orderId ? data.orderId : "Wallet Recharge";
    var customerName = data.customerName || "N/A";
    var email = data.email || "N/A";
    var phone = data.phone || "N/A";
    var amount = data.amount || 0;
    var utr = data.utr || "N/A";
    var screenshot = data.screenshot || "";
    
    // Add the payment row
    sheet.appendRow([
      timestamp,
      orderTypeLabel,
      customerName,
      email,
      phone,
      amount,
      utr,
      screenshot
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Logged to sheet successfully" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
