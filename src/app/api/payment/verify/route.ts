import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ReceivedPayment, Order } from "@/models/Payment";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const sessionCookie = req.cookies.get("aig_user_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { utr, amount, type, orderId, shippingDetails } = await req.json();

    if (!utr || !/^\d{12}$/.test(utr)) {
      return NextResponse.json({ error: "Invalid UTR. Must be a 12-digit number." }, { status: 400 });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    // Look up matching unclaimed payment in DB
    const payment = await ReceivedPayment.findOne({
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

    // Retrieve user
    const dbUser = await User.findById(sessionCookie.value);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Update payment status to matched to prevent double-spending
    payment.status = "matched";
    await payment.save();

    if (type === "recharge") {
      // Top up the wallet
      dbUser.walletBalance = (dbUser.walletBalance || 0) + amount;
      await dbUser.save();

      return NextResponse.json({
        success: true,
        type: "recharge",
        walletBalance: dbUser.walletBalance,
        message: "Payment verified! Wallet topped up successfully."
      });
    } else if (type === "checkout" && orderId) {
      // Create or update the order
      await Order.findOneAndUpdate(
        { orderId },
        { orderId, userId: dbUser._id, amount, status: "completed", shippingDetails, createdAt: new Date() },
        { upsert: true, new: true }
      );

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
