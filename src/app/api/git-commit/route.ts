import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const results: string[] = [];
    const { searchParams } = new URL(request.url);
    const commitMsg = searchParams.get("msg") || "Fix global hubs layout, stats display, and alignment";
    const cwd = process.cwd();
    results.push("cwd: " + cwd);

    // Check git status first
    try {
      const statusRes = await execAsync("git status", { cwd });
      results.push("git status: " + statusRes.stdout);
    } catch (statusErr: any) {
      results.push("git status error: " + statusErr.message + " | " + statusErr.stderr);
    }

    // 1. Stage changes
    try {
      const addRes = await execAsync("git add .", { cwd });
      results.push("git add: " + (addRes.stdout || "done"));
    } catch (addErr: any) {
      results.push("git add error: " + addErr.message + " | " + addErr.stderr);
    }

    // 2. Commit changes
    try {
      const commitRes = await execAsync(`git commit -m "${commitMsg}"`, { cwd });
      results.push("git commit: " + (commitRes.stdout || "done"));
    } catch (commitErr: any) {
      results.push("git commit error: " + commitErr.message + " | " + commitErr.stderr);
    }

    // 3. Push changes
    try {
      const pushRes = await execAsync("git push", { cwd });
      results.push("git push: " + (pushRes.stdout || pushRes.stderr || "done"));
    } catch (pushErr: any) {
      results.push("git push error: " + pushErr.message + " | " + pushErr.stderr);
    }

    return NextResponse.json({ success: true, results }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, stderr: err.stderr });
  }
}
