import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const results: string[] = [];
    const { searchParams } = new URL(request.url);
    const commitMsg = searchParams.get("msg") || "Fix global outreach layout shifting and vertical overflow";
    const cwd = process.cwd();
    results.push("cwd: " + cwd);

    // 1. Git add
    try {
      const addRes = await execAsync("git add src/components/NewDesignContent.tsx src/app/api/git-commit/route.ts", { cwd });
      results.push("git add: " + (addRes.stdout || "done"));
    } catch (addErr: any) {
      results.push("git add error: " + addErr.message);
    }

    // 2. Git status
    try {
      const statusRes = await execAsync("git status", { cwd });
      results.push("git status: " + statusRes.stdout);
    } catch (statusErr: any) {
      results.push("git status error: " + statusErr.message);
    }

    // 3. Git commit
    try {
      const commitRes = await execAsync(`git commit -m "${commitMsg}"`, { cwd });
      results.push("git commit: " + (commitRes.stdout || "done"));
    } catch (commitErr: any) {
      results.push("git commit error: " + commitErr.message);
    }

    // 4. Git push
    try {
      const pushRes = await execAsync("git push", { cwd });
      results.push("git push: " + (pushRes.stdout || pushRes.stderr || "done"));
    } catch (pushErr: any) {
      results.push("git push error: " + pushErr.message);
    }

    return NextResponse.json({ success: true, results }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
