const fs = require("fs");
const path = require("path");
const https = require("https");

const geojsonUrl = "https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/STATES/MAHARASHTRA/MAHARASHTRA_SUBDISTRICTS.geojson";

function parseSvgPathBoundingBox(pathStr) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const regex = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/g;
  let match;
  while ((match = regex.exec(pathStr)) !== null) {
    const x = parseFloat(match[1]);
    const y = parseFloat(match[2]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  return { minX, maxX, minY, maxY };
}

function fetchGeoJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
        return;
      }
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => { rawData += chunk; });
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", (e) => {
      reject(e);
    });
  });
}

async function main() {
  try {
    const mapFilePath = path.join(__dirname, "src/components/InteractiveIndiaMap.tsx");
    const content = fs.readFileSync(mapFilePath, "utf8");

    const mhSangliIndex = content.indexOf('id: "mh-sangli"');
    if (mhSangliIndex === -1) {
      console.error("Could not find id: 'mh-sangli' in map file");
      return;
    }

    const pathKeyword = 'path: "';
    const pathStart = content.indexOf(pathKeyword, mhSangliIndex) + pathKeyword.length;
    const pathEnd = content.indexOf('"', pathStart);
    const mhSangliPath = content.substring(pathStart, pathEnd);

    const svgBBox = parseSvgPathBoundingBox(mhSangliPath);
    console.log("Parsed SVG Bounding Box for Sangli:", svgBBox);

    console.log("Fetching GeoJSON...");
    const geojson = await fetchGeoJson(geojsonUrl);
    console.log("GeoJSON fetched successfully!");

    const sangliFeatures = geojson.features.filter((f) => {
      const dtname = f.properties.district_name || f.properties.dtname || f.properties.dt_name || "";
      return dtname.toLowerCase() === "sangli" || 
             Object.values(f.properties).some(val => typeof val === 'string' && val.toLowerCase() === 'sangli');
    });

    if (sangliFeatures.length === 0) {
      console.error("Could not find any Sangli subdistricts");
      return;
    }

    let gpsMinLon = Infinity;
    let gpsMaxLon = -Infinity;
    let gpsMinLat = Infinity;
    let gpsMaxLat = -Infinity;

    const parseCoordsBBox = (coords) => {
      if (typeof coords[0] === 'number') {
        const [lon, lat] = coords;
        if (lon < gpsMinLon) gpsMinLon = lon;
        if (lon > gpsMaxLon) gpsMaxLon = lon;
        if (lat < gpsMinLat) gpsMinLat = lat;
        if (lat > gpsMaxLat) gpsMaxLat = lat;
      } else {
        coords.forEach(parseCoordsBBox);
      }
    };

    sangliFeatures.forEach((f) => {
      parseCoordsBBox(f.geometry.coordinates);
    });

    console.log("GPS Bounding Box:", { gpsMinLon, gpsMaxLon, gpsMinLat, gpsMaxLat });

    const projectX = (lon) => {
      return svgBBox.minX + ((lon - gpsMinLon) / (gpsMaxLon - gpsMinLon)) * (svgBBox.maxX - svgBBox.minX);
    };

    const projectY = (lat) => {
      return svgBBox.minY + ((gpsMaxLat - lat) / (gpsMaxLat - gpsMinLat)) * (svgBBox.maxY - svgBBox.minY);
    };

    const regionsList = [];

    sangliFeatures.forEach((f) => {
      const sdtname = f.properties.sdtname || f.properties.subdistrict_name || f.properties.NAME_3 || "";
      const regionId = `sangli-${sdtname.toLowerCase()}`;
      
      let pathString = "";

      const formatCoord = (c) => {
        return `${projectX(c[0]).toFixed(1)},${projectY(c[1]).toFixed(1)}`;
      };

      if (f.geometry.type === "Polygon") {
        f.geometry.coordinates.forEach((ring) => {
          pathString += (pathString ? " " : "") + "M " + ring.map(formatCoord).join(" L ") + " Z";
        });
      } else if (f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach((polygon) => {
          polygon.forEach((ring) => {
            pathString += (pathString ? " " : "") + "M " + ring.map(formatCoord).join(" L ") + " Z";
          });
        });
      }

      const formattedName = sdtname.charAt(0).toUpperCase() + sdtname.slice(1).toLowerCase();

      regionsList.push({
        id: regionId,
        name: formattedName,
        path: pathString
      });
    });

    const width = svgBBox.maxX - svgBBox.minX;
    const height = svgBBox.maxY - svgBBox.minY;
    const paddingX = 15;
    const paddingY = 10;
    const vbMinX = Math.round(svgBBox.minX - paddingX);
    const vbMinY = Math.round(svgBBox.minY - paddingY);
    const vbWidth = Math.round(width + paddingX * 2);
    const vbHeight = Math.round(height + paddingY * 2);
    const viewBoxStr = `${vbMinX} ${vbMinY} ${vbWidth} ${vbHeight}`;

    const regionsStr = regionsList.map(r => {
      return `      { id: "${r.id}", name: "${r.name}", path: "${r.path}" }`;
    }).join(",\n");

    const labsStr = `      {
        name: "Swami Ramanand AIR G INNOVATION LAB",
        x: 185,
        y: 485,
        icon: "school",
        focus: "AIG Innovation Lab",
        googleMapsQuery: "Swami Ramanand Bharati Vidyamandir Tasgaon Sangli"
      }`;

    const sangliEntry = `  sangli: {
    label: "Sangli District",
    viewBox: "${viewBoxStr}",
    regions: [
${regionsStr}
    ],
    labs: [
${labsStr}
    ]
  }`;

    let newContent = content;

    // Update mh-sangli to clickable
    const sangliIdx = newContent.indexOf('id: "mh-sangli"');
    if (sangliIdx !== -1) {
      const nextBrace = newContent.indexOf('}', sangliIdx);
      const subBlock = newContent.substring(sangliIdx, nextBrace);
      if (!subBlock.includes('isClickable')) {
        const replacement = `id: "mh-sangli",\n        name: "Sangli",\n        path: "${mhSangliPath}",\n        isClickable: true,\n        targetStateOrDistrictId: "sangli"`;
        newContent = newContent.substring(0, sangliIdx) + replacement + newContent.substring(nextBrace);
      }
    }

    // Insert to STATE_MAPS
    const availableMapsIdx = newContent.indexOf("const AVAILABLE_STATE_MAPS");
    if (availableMapsIdx !== -1) {
      const searchTarget = "};";
      const lastBraceIdx = newContent.lastIndexOf(searchTarget, availableMapsIdx);
      if (lastBraceIdx !== -1) {
        newContent = newContent.substring(0, lastBraceIdx) + ",\n" + sangliEntry + "\n" + newContent.substring(lastBraceIdx);
      }
    }

    // Update AVAILABLE_STATE_MAPS to include sangli if needed, wait, AVAILABE_STATE_MAPS is for states.
    // Districts are clickable inside states. mh is already active.

    fs.writeFileSync(mapFilePath, newContent, "utf8");
    console.log("InteractiveIndiaMap.tsx updated successfully with Sangli district talukas boundaries!");
  } catch (error) {
    console.error("Error executing script:", error);
  }
}

main();
