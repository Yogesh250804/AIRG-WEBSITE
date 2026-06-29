import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brainDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\53135b68-8372-41bf-bd41-1766a873e4da';
    const publicDir = path.join(process.cwd(), 'public');

    const copyOperations = [
      { src: 'indian_pdet_lab_1782714591811.png', dest: 'indian_pdet_lab.png' },
      { src: 'indian_lab_iot_1782718645576.png', dest: 'lab-electronics.png' },
      { src: 'indian_lab_3d_1782718662738.png', dest: 'lab-3dprinting.png' },
      { src: 'indian_lab_drone_1782718680413.png', dest: 'lab-drone.png' },
      { src: 'indian_lab_vr_1782718698079.png', dest: 'lab-vr.png' },
      { src: 'indian_lab_ai_1782718713446.png', dest: 'lab-ai.png' },
      { src: 'indian_lab_robot_1782718731297.png', dest: 'lab-robotics.png' },
      { src: 'indian_pdet_lab_1782714591811.png', dest: 'lab-smartlearning.png' },
      { src: 'media__1782715454517.png', dest: 'logos/moe.png' },
      { src: 'media__1782715454517.png', dest: 'logos/moe.jpeg' }
    ];
    
    if (!fs.existsSync(brainDir)) {
      return NextResponse.json({ success: false, error: `brainDir does not exist at path: ${brainDir}` });
    }

    const copied: string[] = [];
    const missing: string[] = [];

    for (const op of copyOperations) {
      const srcPath = path.join(brainDir, op.src);
      const destPath = path.join(publicDir, op.dest);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        copied.push(op.dest);
      } else {
        missing.push(op.src);
      }
    }

    return NextResponse.json({ 
      success: true, 
      copied, 
      missing,
      message: `Copied ${copied.length} images successfully.` 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
