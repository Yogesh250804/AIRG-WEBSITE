const fs = require('fs');
const path = require('path');

try {
  const sourcePath = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\bf331dc2-e63b-4a4f-95f9-83b4591668ed\\.system_generated\\steps\\140\\content.md';
  const destPath = path.join(__dirname, '..', 'src', 'components', 'worldMapData.json');

  console.log('Reading from:', sourcePath);
  const data = fs.readFileSync(sourcePath, 'utf8');
  
  // Find the JSON block starting after "---"
  const marker = '---';
  const markerIndex = data.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error('Could not find YAML/Markdown boundary');
  }
  
  const rawJson = data.substring(markerIndex + marker.length).trim();
  
  // Clean up "export default" to make it valid JSON
  let cleanedJson = rawJson.replace(/^export\s+default\s+/, '');
  if (cleanedJson.endsWith(';')) {
    cleanedJson = cleanedJson.slice(0, -1);
  }
  
  // Verify it parses as JSON
  const parsed = JSON.parse(cleanedJson);
  console.log('Successfully parsed world map JSON! Map label:', parsed.label);
  
  // Save as formatted JSON
  fs.writeFileSync(destPath, JSON.stringify(parsed, null, 2), 'utf8');
  console.log('Saved to:', destPath);
} catch (err) {
  console.error('Error during copy:', err);
  process.exit(1);
}
