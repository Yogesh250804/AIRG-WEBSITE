import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const targetDir = process.cwd();
    const pages = [
      "about",
      "careers",
      "blog",
      "press",
      "instructor",
      "affiliate",
      "stories",
      "help",
      "contact",
      "privacy",
      "terms"
    ];

    const modifiedFiles: string[] = [];

    pages.forEach((page) => {
      const pagePath = path.join(targetDir, "src", "app", page, "page.tsx");
      if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, "utf8");
        let modified = false;

        if (content.includes('@/components/navbar')) {
          content = content.replace(/@\/components\/navbar/g, '@/components/demo-navbar');
          modified = true;
        }
        if (content.includes('@/components/footer')) {
          content = content.replace(/@\/components\/footer/g, '@/components/demo-footer');
          modified = true;
        }
        if (content.includes('@/contexts/')) {
          content = content.replace(/@\/contexts\//g, '@/context/');
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(pagePath, content, "utf8");
          modifiedFiles.push(`src/app/${page}/page.tsx`);
        }
      }
    });

    // Also fix imports in demo-navbar.tsx and demo-footer.tsx if they use contexts
    const filesToFix = [
      path.join(targetDir, "src", "components", "demo-navbar.tsx"),
      path.join(targetDir, "src", "components", "demo-footer.tsx")
    ];

    filesToFix.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, "utf8");
        if (content.includes('@/contexts/')) {
          content = content.replace(/@\/contexts\//g, '@/context/');
          fs.writeFileSync(filePath, content, "utf8");
          modifiedFiles.push(path.relative(targetDir, filePath));
        }
      }
    });

    return NextResponse.json({
      success: true,
      modified: modifiedFiles,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack });
  }
}
