import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const results: string[] = [];

    // 1. Stage changes
    const addRes = await execAsync("git add .");
    results.push("git add: " + (addRes.stdout || "done"));

    // 2. Commit changes
    const commitMsg = "Update global hub founder flyers, fix cache issue, and add competition timeline column";
    const commitRes = await execAsync(`git commit -m "${commitMsg}"`);
    results.push("git commit: " + (commitRes.stdout || commitRes.stderr || "done"));

    // 3. Push changes
    const pushRes = await execAsync("git push");
    results.push("git push: " + (pushRes.stdout || pushRes.stderr || "done"));

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, stderr: err.stderr });
  }
}
