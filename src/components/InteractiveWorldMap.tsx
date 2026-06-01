"use client";

import { useState } from "react";
import worldMapPaths from "./worldMapPaths.json";

interface Hub {
  id: string;
  name: string;
  location: string;
  stats: { label: string; value: string }[];
  description: string;
  coordinates: { x: number; y: number }; // Tooltip position on SVG
  coordinator?: string;
}

interface InteractiveWorldMapProps {
  onSelectHub: (hub: Hub | null) => void;
}

export const globalHubs: Record<string, Hub> = {
  in: {
    id: "in",
    name: "India Core Hub",
    location: "Satara / Pune, MH",
    stats: [
      { label: "Active Centres", value: "15 Centres" },
      { label: "Students Reached", value: "3,500+" },
      { label: "Focus", value: "Robotics Labs" }
    ],
    description: "The primary operational and development center hosting curriculum development, engineering workshops, and IoT school deployments.",
    coordinates: { x: 719, y: 207 },
    coordinator: "Dr. Rajesh Patil"
  },
  us: {
    id: "us",
    name: "United States Outreach",
    location: "San Francisco, CA",
    stats: [
      { label: "Partnerships", value: "3 Universities" },
      { label: "Research Nodes", value: "2 Active" },
      { label: "Focus", value: "AI & CAD Design" }
    ],
    description: "Focusing on curriculum alignment with global academic standards and collaborating with educational technology researchers.",
    coordinates: { x: 234, y: 174 },
    coordinator: "Prof. Alan Vance"
  },
  gb: {
    id: "gb",
    name: "United Kingdom Hub",
    location: "London, England",
    stats: [
      { label: "Partner Schools", value: "8 Institutions" },
      { label: "Certifications", value: "UK Standard Alignment" },
      { label: "Focus", value: "Coding Paths" }
    ],
    description: "Aligning digital literacy training pathways with international frameworks and providing accredited certifications.",
    coordinates: { x: 495, y: 137 },
    coordinator: "Sarah Jenkins"
  },
  sg: {
    id: "sg",
    name: "Singapore ASEAN Center",
    location: "Singapore City",
    stats: [
      { label: "Exchange Programs", value: "Annual Event" },
      { label: "Students Enrolled", value: "400+ Active" },
      { label: "Focus", value: "Smart Nation Tech" }
    ],
    description: "Southeast Asian technology exchange hub, importing smart electronics design modules and hosting innovation exhibits.",
    coordinates: { x: 788, y: 246 },
    coordinator: "Tan Wei Kiat"
  },
  ae: {
    id: "ae",
    name: "United Arab Emirates Hub",
    location: "Dubai City",
    stats: [
      { label: "Active Labs", value: "4 Centres" },
      { label: "Students Trained", value: "850+ Trained" },
      { label: "Focus", value: "Robotics Core" }
    ],
    description: "Collaborating with local academic nodes to deploy custom intelligent learning modules.",
    coordinates: { x: 650, y: 198 },
    coordinator: "Faisal Al Mansour"
  },
  kh: {
    id: "kh",
    name: "Cambodia Core Hub",
    location: "Western International School, Phnom Penh",
    stats: [
      { label: "Active Centres", value: "4 Centres" },
      { label: "Students Reached", value: "1,200+" },
      { label: "Focus", value: "Robotics Labs" }
    ],
    description: "Deploying high-quality modular educational kits and training local teachers.",
    coordinates: { x: 791, y: 226 },
    coordinator: "Mr. Sokha Mean"
  },
  ke: {
    id: "ke",
    name: "Kenya Outreach Hub",
    location: "Nairobi Academy, Nairobi",
    stats: [
      { label: "Active Centres", value: "3 Centres" },
      { label: "Students Reached", value: "850+" },
      { label: "Focus", value: "AgriTech & Coding" }
    ],
    description: "Empowering rural students with IoT sensor deployment and drone navigation.",
    coordinates: { x: 605, y: 250 },
    coordinator: "Mr. David Ndwiga"
  }
};


export default function InteractiveWorldMap({ onSelectHub }: InteractiveWorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredCountryName, setHoveredCountryName] = useState<string | null>(null);
  const [activeHubId, setActiveHubId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleSelect = (id: string) => {
    const hub = globalHubs[id];
    if (hub) {
      setActiveHubId(id);
      onSelectHub(hub);
    }
  };

  return (
    <div 
      className="relative w-full aspect-[2/1] bg-slate-50/50 rounded-[3rem] border border-black/5 p-2 flex items-center justify-center overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* Geographically Accurate Outlined SVG World Map */}
      <svg
        viewBox={worldMapPaths.viewBox}
        className="w-full h-auto drop-shadow-[0_0_80px_rgba(235,0,40,0.06)] select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* State Hover Gradient */}
          <linearGradient id="state-hover-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5c6c" />
            <stop offset="100%" stopColor="#EB0028" />
          </linearGradient>
        </defs>

        {/* World Countries political boundaries */}
        <g strokeWidth="0.5" className="transition-all duration-300">
          {worldMapPaths.features.map((feature) => {
            const countryId = feature.id.toLowerCase();
            const isHovered = hoveredCountry === countryId;
            
            // Check if this country is a hub region and should be highlighted
            const isHub = globalHubs[countryId] !== undefined;
            const isActive = activeHubId === countryId;

            return (
              <path
                key={feature.id}
                d={feature.path}
                fill={
                  isHovered
                    ? "url(#state-hover-gradient)"
                    : isHub || isActive
                      ? "rgba(235, 0, 40, 0.10)"
                      : "rgba(0,0,0,0.04)"
                }
                stroke={
                  isHovered
                    ? "#ff5c6c"
                    : isHub || isActive
                      ? "rgba(235, 0, 40, 0.70)"
                      : "rgba(0,0,0,0.22)"
                }
                strokeWidth={isHovered ? "2.2" : isHub || isActive ? "1.6" : "0.8"}
                className="transition-all duration-150"
                style={{
                  cursor: isHub ? "pointer" : "default",
                  transform: isHovered ? "scale(1.005)" : "scale(1)",
                  transformOrigin: "center",
                  transformBox: "fill-box",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={() => {
                  setHoveredCountry(countryId);
                  setHoveredCountryName(feature.name);
                }}
                onMouseLeave={() => {
                  setHoveredCountry(null);
                  setHoveredCountryName(null);
                }}
                onClick={() => {
                  if (isHub) {
                    handleSelect(countryId);
                  }
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Floating Tooltip for Country Hover */}
      {hoveredCountry && hoveredCountryName && (
        <div
          className="absolute z-[200] pointer-events-none"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 10,
          }}
        >
          <div className="px-5 py-4 rounded-xl border border-black/10 shadow-xl min-w-[200px] bg-white text-[#1a1a2e] font-sans">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-[#1a1a2e]/40 uppercase tracking-widest">
                {hoveredCountry.toUpperCase()}
              </span>
            </div>
            <h4 className="text-sm font-headline font-bold text-[#1a1a2e] uppercase tracking-tight">
              {hoveredCountryName}
            </h4>
            {globalHubs[hoveredCountry] && (
              <div className="mt-2 pt-2 border-t border-black/10">
                <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[10px]">touch_app</span>
                  Click to view hub profile
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
