const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log("Running git status...");
  const output = execSync('git status', { cwd: 'Y:\\PROJECTS\\AIG-WEBSITE' });
  console.log("SUCCESS:\n" + output.toString());
} catch (error) {
  console.error("ERROR:\n" + error.message);
  if (error.stdout) console.error("STDOUT:\n" + error.stdout.toString());
  if (error.stderr) console.error("STDERR:\n" + error.stderr.toString());
}
