import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cwd = process.cwd();
    const destDir = path.join(cwd, "public", "extracted-hi");
    const labsFilePath = path.join(cwd, "src", "data", "labs.ts");

    if (!fs.existsSync(destDir)) {
      return NextResponse.json({ success: false, error: "extracted-hi directory not found" });
    }

    if (!fs.existsSync(labsFilePath)) {
      return NextResponse.json({ success: false, error: "labs.ts file not found" });
    }

    // Get all extracted images
    const images = fs.readdirSync(destDir)
      .filter(f => f.toLowerCase().endsWith(".jpeg") || f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png"))
      .map(file => `/extracted-hi/${file}`);

    if (images.length === 0) {
      return NextResponse.json({ success: false, error: "No images found in extracted-hi" });
    }

    // Read the labs.ts content
    let labsContent = fs.readFileSync(labsFilePath, "utf8");

    // We will parse the labsData block and replace images
    // Let's read the current labsData
    const labsDataModule = await import("@/data/labs");
    const labsData = labsDataModule.labsData;

    // Distribute images. We have 27 images and 15 labs.
    // Each lab will get 3 images, cycling through the 27 images.
    const updatedLabs = labsData.map((lab, index) => {
      const startIdx = (index * 2) % images.length;
      // take 3 images per lab
      const labImages = [
        images[startIdx],
        images[(startIdx + 1) % images.length],
        images[(startIdx + 2) % images.length]
      ];

      return {
        ...lab,
        img: labImages[0],
        images: labImages
      };
    });

    // Generate a fresh labs.ts file content
    const fileHeader = `export interface Lab {
  slug: string;
  name: string;
  icon: string;
  sIcon: string;
  desc: string;
  detailedDesc: string;
  status: string;
  img: string;
  images: string[];
  techStack: string[];
  stats: { label: string; value: string }[];
  highlights: string[];
}

export const labsData: Lab[] = `;

    const newContent = fileHeader + JSON.stringify(updatedLabs, null, 2) + ";\n";
    fs.writeFileSync(labsFilePath, newContent, "utf8");

    return NextResponse.json({ 
      success: true, 
      message: `Successfully mapped ${images.length} photos to ${updatedLabs.length} labs.`,
      sampleImages: updatedLabs[0].images
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
