/**
 * Google Apps Script to log payments and upload screenshots to Google Drive.
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
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#e82e32").setFontColor("#ffffff");
    }
    
    var timestamp = new Date();
    var orderTypeLabel = data.orderId ? data.orderId : "Wallet Recharge";
    var customerName = data.customerName || "N/A";
    var email = data.email || "N/A";
    var phone = data.phone || "N/A";
    var amount = data.amount || 0;
    var utr = data.utr || "N/A";
    var screenshotUrl = "";
    
    // If screenshot contains Base64 image data, upload it to Google Drive
    if (data.screenshot && data.screenshot.indexOf("data:") === 0) {
      try {
        var parts = data.screenshot.split(",");
        var meta = parts[0]; // e.g. "data:image/png;base64"
        var base64Data = parts[1];
        
        var contentType = meta.split(":")[1].split(";")[0];
        var extension = contentType.split("/")[1] || "png";
        
        var decoded = Utilities.base64Decode(base64Data);
        var blob = Utilities.newBlob(decoded, contentType, (data.orderId || "payment") + "_" + utr + "." + extension);
        
        // Save to your Google Drive root folder (or you can create a specific folder)
        var file = DriveApp.createFile(blob);
        
        // Enable sharing so anyone with link can view the receipt screenshot
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        screenshotUrl = file.getUrl();
      } catch (uploadError) {
        screenshotUrl = "Upload Error: " + uploadError.toString();
      }
    } else {
      screenshotUrl = data.screenshot || "";
    }
    
    // Add the payment row
    sheet.appendRow([
      timestamp,
      orderTypeLabel,
      customerName,
      email,
      phone,
      amount,
      utr,
      screenshotUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Logged to sheet and uploaded successfully" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
