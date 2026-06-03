import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brainDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\60c256a9-f82d-4198-b876-a7af683d2ee9';
    const publicDir = path.join(process.cwd(), 'public');

    // Copy to v2 to force browser cache bypass
    const srcPath = path.join(brainDir, 'media__1780471470252.png');
    const destPath = path.join(publicDir, 'kenya-founder-v2.png');
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      return NextResponse.json({ success: true, message: "Copied Kenya flyer to kenya-founder-v2.png successfully" });
    }
    
    return NextResponse.json({ success: false, error: "Source file not found" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
