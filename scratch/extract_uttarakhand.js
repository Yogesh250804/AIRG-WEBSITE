const fs = require("fs");
const path = require("path");
const https = require("https");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
        return;
      }
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => { rawData += chunk; });
      res.on("end", () => { resolve(rawData); });
    }).on("error", (e) => { reject(e); });
  });
}

async function main() {
  try {
    const url = "https://raw.githubusercontent.com/shuklaneerajdev/IndiaStateTopojsonFiles/master/Uttarakhand.geojson";
    console.log("Fetching GeoJSON from:", url);
    const rawFile = await fetchUrl(url);
    const geojson = JSON.parse(rawFile);
    console.log("GeoJSON fetched successfully. Features count:", geojson.features.length);

    // Calculate GPS bounding box
    let gpsMinLon = Infinity;
    let gpsMaxLon = -Infinity;
    let gpsMinLat = Infinity;
    let gpsMaxLat = -Infinity;

    const parseCoordsBBox = (coords) => {
      if (typeof coords[0] === "number") {
        const [lon, lat] = coords;
        if (lon < gpsMinLon) gpsMinLon = lon;
        if (lon > gpsMaxLon) gpsMaxLon = lon;
        if (lat < gpsMinLat) gpsMinLat = lat;
        if (lat > gpsMaxLat) gpsMaxLat = lat;
      } else {
        coords.forEach(parseCoordsBBox);
      }
    };

    geojson.features.forEach((f) => {
      parseCoordsBBox(f.geometry.coordinates);
    });

    console.log("GPS BBox:", { gpsMinLon, gpsMaxLon, gpsMinLat, gpsMaxLat });

    // BBox limits for SVG mapping
    const svgMinX = 40;
    const svgMaxX = 560;
    const svgMinY = 40;
    const svgMaxY = 460;

    const projectX = (lon) => {
      return svgMinX + ((lon - gpsMinLon) / (gpsMaxLon - gpsMinLon)) * (svgMaxX - svgMinX);
    };

    const projectY = (lat) => {
      return svgMinY + ((gpsMaxLat - lat) / (gpsMaxLat - gpsMinLat)) * (svgMaxY - svgMinY);
    };

    const regionsList = [];

    const formatCoord = (c) => {
      return `${projectX(c[0]).toFixed(1)},${projectY(c[1]).toFixed(1)}`;
    };

    geojson.features.forEach((f) => {
      const distName = f.properties.Dist_Name || f.properties.district || "";
      const formattedName = distName.trim();
      const id = `ut-${formattedName.toLowerCase().replace(/\s+/g, "-")}`;
      
      let pathString = "";

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

      regionsList.push({
        id,
        name: formattedName,
        path: pathString
      });
    });

    const regionsStr = regionsList.map(r => {
      return `      { id: "${r.id}", name: "${r.name}", path: "${r.path}" }`;
    }).join(",\n");

    const utEntry = `  ut: {
    label: "Uttarakhand",
    viewBox: "0 0 600 500",
    regions: [
${regionsStr}
    ],
    labs: []
  }`;

    const mapFilePath = path.join(__dirname, "../src/components/InteractiveIndiaMap.tsx");
    const mapContent = fs.readFileSync(mapFilePath, "utf8");

    const oldUtTarget = `  ut: {
    label: "Uttarakhand",
    viewBox: "0 0 600 500",
    regions: [
      { id: "ut-north", name: "Garhwal Highlands (Uttarkashi/Chamoli)", path: "M 100,50 L 400,50 L 450,220 L 200,220 Z" },
      { id: "ut-west", name: "Garhwal Plains (Dehradun/Haridwar)", path: "M 50,220 L 200,220 L 250,350 L 50,350 Z" },
      { id: "ut-east", name: "Kumaon Highlands (Pithoragarh/Almora)", path: "M 400,50 L 550,50 L 550,280 L 450,220 Z" },
      { id: "ut-south", name: "Kumaon Plains (Nainital/US Nagar)", path: "M 200,220 L 450,220 L 550,280 L 500,450 L 200,450 L 250,350 Z" }
    ],
    labs: []
  }`;

    if (!mapContent.includes(oldUtTarget)) {
      console.warn("Could not find the exact oldUtTarget block. Checking if already replaced or format is different.");
      // Let's do a more generic search or fail gracefully
      const utStartIdx = mapContent.indexOf("  ut: {");
      if (utStartIdx === -1) {
        console.error("Could not find ut entry in InteractiveIndiaMap.tsx at all!");
        return;
      }
      const utEndIdx = mapContent.indexOf("},", utStartIdx) + 2; // approximation or matching braces
      // Since it's nested, let's find the closing brace.
    } else {
      let newMapContent = mapContent.replace(oldUtTarget, utEntry);
      fs.writeFileSync(mapFilePath, newMapContent, "utf8");
      console.log("InteractiveIndiaMap.tsx updated successfully with Uttarakhand coordinates!");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
