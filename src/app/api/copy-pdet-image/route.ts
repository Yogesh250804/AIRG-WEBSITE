import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brainDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\3cdb48ab-3a89-422e-9bab-8ba893d63a04';
    const publicDir = path.join(process.cwd(), 'public');

    const copyOperations = [
      { src: 'indian_pdet_lab_1782714591811.png', dest: 'indian_pdet_lab.png', isAbsolute: false },
      { src: 'indian_lab_iot_1782718645576.png', dest: 'lab-electronics.png', isAbsolute: false },
      { src: 'indian_lab_3d_1782718662738.png', dest: 'lab-3dprinting.png', isAbsolute: false },
      { src: 'indian_lab_drone_1782718680413.png', dest: 'lab-drone.png', isAbsolute: false },
      { src: 'indian_lab_vr_1782718698079.png', dest: 'lab-vr.png', isAbsolute: false },
      { src: 'indian_lab_ai_1782718713446.png', dest: 'lab-ai.png', isAbsolute: false },
      { src: 'indian_lab_robot_1782718731297.png', dest: 'lab-robotics.png', isAbsolute: false },
      { src: 'indian_pdet_lab_1782714591811.png', dest: 'lab-smartlearning.png', isAbsolute: false },
      { src: 'media__1782715454517.png', dest: 'logos/moe.png', isAbsolute: false },
      { src: 'media__1782715454517.png', dest: 'logos/moe.jpeg', isAbsolute: false },
      { src: 'air_lab_about_1783061799646.png', dest: 'air-lab-about.png', isAbsolute: false },
      { 
        src: 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\5c7dbb00-5e35-49e4-894f-69d843d913f2\\bharat_ai_server_1783511274520.png', 
        dest: 'extracted-images/bharat_ai_server.png', 
        isAbsolute: true 
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\scratch\\pmo_extracted\\extracted_pmo_page2_img_0.jpeg',
        dest: 'extracted-images/moe_pradhan.png',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\AIR G INTERNATIONAL PDEA.pdf',
        dest: 'brochure.pdf',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\scratch\\pmo_all_extracted\\page_4_img_1_xref_254.jpeg',
        dest: 'extracted-images/kaduna_uni.png',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\scratch\\pmo_all_extracted\\page_4_img_2_xref_257.jpeg',
        dest: 'extracted-images/iairesco_global.png',
        isAbsolute: true
      },
      {
        src: 'y:\\PROJECTS\\AIG-WEBSITE\\scratch\\pmo_all_extracted\\page_4_img_6_xref_310.jpeg',
        dest: 'extracted-images/cambodia_school.png',
        isAbsolute: true
      }
    ];
    
    if (!fs.existsSync(brainDir)) {
      return NextResponse.json({ success: false, error: `brainDir does not exist at path: ${brainDir}` });
    }

    const copied: string[] = [];
    const missing: string[] = [];

    for (const op of copyOperations) {
      const srcPath = op.isAbsolute ? op.src : path.join(brainDir, op.src);
      const destPath = path.join(publicDir, op.dest);
      
      // Ensure folder structure in public exists
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

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
