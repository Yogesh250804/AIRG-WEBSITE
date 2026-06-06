import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    // Create a transporter using environment variables or a default configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER || "airgdatalab@gmail.com",
        pass: process.env.SMTP_PASS, // App password
      },
    });

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: "airgdatalab@gmail.com",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    if (process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: "Email sent successfully" });
    } else {
      console.warn("SMTP_PASS is not configured. Logged form submission:", mailOptions);
      // Fallback for development/testing so it works without crashing
      return NextResponse.json({ 
        success: true, 
        message: "Logged form submission (SMTP_PASS not set in environment variables)" 
      });
    }
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
