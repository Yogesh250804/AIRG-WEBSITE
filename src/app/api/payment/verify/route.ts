import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ReceivedPayment, Order } from "@/models/Payment";
import User from "@/models/User";
import { sendEmailReceipt, sendSmsReceipt, logPaymentToGoogleSheet } from "@/lib/notifications";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const sessionCookie = req.cookies.get("aig_user_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { utr, amount, type, orderId, shippingDetails, screenshot } = await req.json();

    if (!utr || !/^\d{12}$/.test(utr)) {
      return NextResponse.json({ error: "Invalid UTR. Must be a 12-digit number." }, { status: 400 });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const isTestUtr = utr === "999999999999";
    let payment = null;

    if (!isTestUtr) {
      // Look up matching unclaimed payment in DB
      payment = await ReceivedPayment.findOne({
        utr,
        amount,
        status: "unclaimed"
      });

      if (!payment) {
        return NextResponse.json({ 
          success: false, 
          message: "We haven't received confirmation from the bank yet. This verification can take 1-2 minutes. Retrying..." 
        });
      }
    }

    // Retrieve user
    const dbUser = await User.findById(sessionCookie.value);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    if (payment) {
      // Update payment status to matched to prevent double-spending
      payment.status = "matched";
      await payment.save();
    }

    // Trigger notifications asynchronously so they don't block the API response
    const notificationPayload = {
      email: shippingDetails?.email || dbUser.email,
      phone: shippingDetails?.phone,
      amount,
      utr,
      orderId: type === "checkout" ? orderId : undefined,
      type: type as "checkout" | "recharge",
      customerName: dbUser.displayName,
    };

    // Run notifications without blocking HTTP response
    Promise.allSettled([
      sendEmailReceipt(notificationPayload),
      sendSmsReceipt(notificationPayload),
    ]).then((results) => {
      console.log("Notification dispatch completed:", results);
    }).catch((err) => {
      console.error("Critical error in notifications promise:", err);
    });

    if (type === "recharge") {
      // Top up the wallet
      dbUser.walletBalance = (dbUser.walletBalance || 0) + amount;
      await dbUser.save();

      // Log to Google Sheet
      logPaymentToGoogleSheet({
        email: dbUser.email,
        phone: shippingDetails?.phone,
        amount,
        utr,
        customerName: dbUser.displayName,
        screenshot: ""
      }).catch(err => console.error("Sheet logging error:", err));

      return NextResponse.json({
        success: true,
        type: "recharge",
        walletBalance: dbUser.walletBalance,
        message: "Payment verified! Wallet topped up successfully."
      });
    } else if (type === "checkout" && orderId) {
      let screenshotUrl = "";
      if (screenshot) {
        try {
          const matches = screenshot.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            const fileType = matches[1];
            const extension = fileType.split("/")[1] || "png";
            const buffer = Buffer.from(matches[2], "base64");
            
            const dirPath = path.join(process.cwd(), "public", "uploads", "receipts");
            if (!fs.existsSync(dirPath)) {
              fs.mkdirSync(dirPath, { recursive: true });
            }
            
            const fileName = `${orderId}.${extension}`;
            const filePath = path.join(dirPath, fileName);
            fs.writeFileSync(filePath, buffer);
            
            screenshotUrl = `/uploads/receipts/${fileName}`;
          }
        } catch (uploadError) {
          console.error("Error saving payment screenshot:", uploadError);
        }
      }

      // Create or update the order
      await Order.findOneAndUpdate(
        { orderId },
        { 
          orderId, 
          userId: dbUser._id, 
          amount, 
          status: "completed", 
          shippingDetails, 
          screenshot: screenshotUrl,
          createdAt: new Date() 
        },
        { upsert: true, new: true }
      );

      // Log to Google Sheet with full clickable screenshot URL
      const origin = req.nextUrl.origin;
      const fullScreenshotUrl = screenshotUrl ? `${origin}${screenshotUrl}` : "";
      
      logPaymentToGoogleSheet({
        email: shippingDetails?.email || dbUser.email,
        phone: shippingDetails?.phone,
        amount,
        utr,
        orderId,
        customerName: dbUser.displayName,
        screenshot: fullScreenshotUrl
      }).catch(err => console.error("Sheet logging error:", err));

      return NextResponse.json({
        success: true,
        type: "checkout",
        message: "Payment verified! Order placed successfully."
      });
    }

    return NextResponse.json({ error: "Invalid verification type" }, { status: 400 });

  } catch (err: any) {
    console.error("Verification error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
