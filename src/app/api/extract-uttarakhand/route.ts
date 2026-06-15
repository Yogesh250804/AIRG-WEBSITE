import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import https from "https";
export const dynamic = 'force-dynamic';

function fetchUrl(url: string): Promise<string> {
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

export async function GET() {
  try {
    const url = "https://raw.githubusercontent.com/shuklaneerajdev/IndiaStateTopojsonFiles/master/Uttarakhand.geojson";
    const rawFile = await fetchUrl(url);
    const jsonStart = rawFile.indexOf("{");
    if (jsonStart === -1) {
      return NextResponse.json({ error: "No JSON found" }, { status: 400 });
    }
    const geojson = JSON.parse(rawFile);


    // Calculate GPS bounding box
    let gpsMinLon = Infinity;
    let gpsMaxLon = -Infinity;
    let gpsMinLat = Infinity;
    let gpsMaxLat = -Infinity;

    const parseCoordsBBox = (coords: any) => {
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

    geojson.features.forEach((f: any) => {
      parseCoordsBBox(f.geometry.coordinates);
    });

    // BBox limits for SVG mapping
    const svgMinX = 40;
    const svgMaxX = 560;
    const svgMinY = 40;
    const svgMaxY = 460;

    const projectX = (lon: number) => {
      return svgMinX + ((lon - gpsMinLon) / (gpsMaxLon - gpsMinLon)) * (svgMaxX - svgMinX);
    };

    const projectY = (lat: number) => {
      return svgMinY + ((gpsMaxLat - lat) / (gpsMaxLat - gpsMinLat)) * (svgMaxY - svgMinY);
    };

    const regionsList: any[] = [];

    const formatCoord = (c: number[]) => {
      return `${projectX(c[0]).toFixed(1)},${projectY(c[1]).toFixed(1)}`;
    };

    geojson.features.forEach((f: any) => {
      const distName = f.properties.Dist_Name || "";
      const formattedName = distName.trim();
      const id = `ut-${formattedName.toLowerCase().replace(/\s+/g, "-")}`;
      
      let pathString = "";

      if (f.geometry.type === "Polygon") {
        f.geometry.coordinates.forEach((ring: any[]) => {
          pathString += (pathString ? " " : "") + "M " + ring.map(formatCoord).join(" L ") + " Z";
        });
      } else if (f.geometry.type === "MultiPolygon") {
        f.geometry.coordinates.forEach((polygon: any[]) => {
          polygon.forEach((ring: any[]) => {
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

    const mapFilePath = path.join(process.cwd(), "src/components/InteractiveIndiaMap.tsx");
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

    let newMapContent = mapContent.replace(oldUtTarget, utEntry);
    fs.writeFileSync(mapFilePath, newMapContent, "utf8");

    return NextResponse.json({ success: true, message: "Uttarakhand map successfully updated!", regionsCount: regionsList.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, stack: err.stack });
  }
}
