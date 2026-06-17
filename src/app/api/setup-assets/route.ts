import { NextResponse } from "next/server";

export async function GET() {
  const results: any = {};
  const libs = ["sharp", "jimp", "canvas", "pngjs", "jpeg-js", "images", "image-size"];
  for (const lib of libs) {
    try {
      require(lib);
      results[lib] = "Available";
    } catch (err: any) {
      results[lib] = `Not Available: ${err.message}`;
    }
  }
  return NextResponse.json(results);
}
