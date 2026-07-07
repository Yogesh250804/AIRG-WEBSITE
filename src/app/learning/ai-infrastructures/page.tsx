"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const infrastructureZones = [
  {
    id: "ai-ml",
    tab: "AI & ML Lab",
    icon: "smart_toy",
    title: "Artificial Intelligence & Machine Learning Lab",
    image: "/lab-ai.png",
    description: "A high-performance computing environment equipped with NVIDIA Jetson platforms, GPU-accelerated workstations, and cloud-connected AI frameworks for real-world model training and edge deployment.",
    features: [
      { label: "NVIDIA Jetson Nano & Orin Kits", icon: "memory" },
      { label: "GPU Cloud Computing Credits", icon: "cloud" },
      { label: "Edge AI Deployment Nodes", icon: "hub" },
      { label: "TensorFlow & PyTorch Environments", icon: "code" }
    ],
    stats: { capacity: "40 Students", area: "1,200 sq.ft", tier: "Advanced" }
  },
  {
    id: "robotics",
    tab: "Robotics Zone",
    icon: "precision_manufacturing",
    title: "Robotics & Industrial Automation Zone",
    image: "/lab-robotics.png",
    description: "From robotic arms to autonomous rovers, this zone provides hands-on experience with industrial-grade robotics platforms, actuators, and programmable controllers.",
    features: [
      { label: "Dobot Magician Robotic Arms", icon: "precision_manufacturing" },
      { label: "TurtleBot3 Autonomous Platforms", icon: "smart_toy" },
      { label: "Custom Rover Chassis & Motors", icon: "settings" },
      { label: "Pneumatic Automation Systems", icon: "air" }
    ],
    stats: { capacity: "30 Students", area: "1,500 sq.ft", tier: "Advanced" }
  },
  {
    id: "drone",
    tab: "Drone Tech",
    icon: "flight",
    title: "Drone Technology & Aerial Robotics Zone",
    image: "/lab-drone.png",
    description: "Build, program, and fly custom drones in a dedicated airspace. Students learn flight controller programming, autonomous navigation, and aerial data collection.",
    features: [
      { label: "Custom Drone Assembly Kits", icon: "build" },
      { label: "DJI Tello EDU Fleet", icon: "flight" },
      { label: "Flight Controllers & Transmitters", icon: "settings_remote" },
      { label: "Indoor Flight Testing Arena", icon: "stadium" }
    ],
    stats: { capacity: "20 Students", area: "2,000 sq.ft", tier: "Specialized" }
  },
  {
    id: "3dprint",
    tab: "3D Printing",
    icon: "print",
    title: "3D Printing & Rapid Prototyping Zone",
    image: "/lab-3dprinting.png",
    description: "A complete additive manufacturing studio with FDM and resin printers, CAD workstations, and post-processing tools for transforming digital designs into physical prototypes.",
    features: [
      { label: "FDM 3D Printers (Creality/Prusa)", icon: "print" },
      { label: "Resin Printer (Anycubic/Elegoo)", icon: "water_drop" },
      { label: "Multi-Material Filaments & Resins", icon: "palette" },
      { label: "Post-Processing & Finishing Tools", icon: "construction" }
    ],
    stats: { capacity: "15 Students", area: "800 sq.ft", tier: "Production" }
  },
  {
    id: "vr-cv",
    tab: "VR & CV Lab",
    icon: "visibility",
    title: "Virtual Reality & Computer Vision Lab",
    image: "/lab-vr.png",
    description: "Explore immersive realities and visual intelligence. Equipped with VR headsets, depth cameras, and high-performance workstations for 3D simulation and visual AI.",
    features: [
      { label: "Meta Quest 3 VR Headsets", icon: "view_in_ar" },
      { label: "Intel RealSense Depth Cameras", icon: "camera" },
      { label: "High-Performance GPU Workstations", icon: "computer" },
      { label: "Unity & Unreal Engine Licenses", icon: "videogame_asset" }
    ],
    stats: { capacity: "20 Students", area: "1,000 sq.ft", tier: "Immersive" }
  },
  {
    id: "iot",
    tab: "IoT Hub",
    icon: "memory",
    title: "Electronics & IoT Development Hub",
    image: "/lab-electronics.png",
    description: "A comprehensive electronics workspace with Arduino, ESP32, Raspberry Pi, and sensor networks for building connected embedded systems and IoT solutions.",
    features: [
      { label: "Arduino Dev Kits (Nano, Uno, Mega)", icon: "developer_board" },
      { label: "ESP32 IoT Development Boards", icon: "wifi" },
      { label: "Raspberry Pi 4 Computing Kits", icon: "memory" },
      { label: "Multi-Sensor Experimentation Kits", icon: "sensors" }
    ],
    stats: { capacity: "40 Students", area: "1,200 sq.ft", tier: "Foundational" }
  },
  {
    id: "smart",
    tab: "Smart Learning",
    icon: "lightbulb",
    title: "Innovation & Smart Learning Zone",
    image: "/lab-smartlearning.png",
    description: "An interactive learning environment featuring smart panels, digital collaboration tools, and modular seating for project-based and team-driven innovation sessions.",
    features: [
      { label: "86\" Interactive Smart Panel", icon: "tv" },
      { label: "Branded Innovation Workspace", icon: "design_services" },
      { label: "Collaborative Workstations", icon: "groups" },
      { label: "Digital Curriculum Access", icon: "menu_book" }
    ],
    stats: { capacity: "60 Students", area: "2,000 sq.ft", tier: "Collaborative" }
  }
];

export default function AIInfrastructuresB2BPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    phone: "",
    requirements: ""
  });

  useEffect(() => {
    fetch("/api/copy-pdet-image").catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const names = formData.name.trim().split(" ");
      const firstName = names[0] || "B2B";
      const lastName = names.slice(1).join(" ") || "Partner";

      const payload = {
        firstName,
        lastName,
        email: formData.email,
        subject: `B2B Lab Request: ${formData.institution}`,
        message: `Institution: ${formData.institution}\nPhone: ${formData.phone}\n\nRequirements:\n${formData.requirements || "None specified."}`
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", institution: "", email: "", phone: "", requirements: "" });
      } else {
        setSubmitStatus("error");
        alert("Failed to submit request: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeZone = infrastructureZones[activeTab];

  return (
    <main className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary overflow-x-hidden text-[#1a1a2e] font-sans">
      <Navbar />

      {/* Subtle geometric background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(238,44,60,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(238,44,60,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-primary/3 rounded-full blur-[180px] pointer-events-none" />

      {/* Scattered Telemetry HUD Decor on Left & Right */}
      <div className="absolute left-6 top-[25%] font-mono text-[9px] text-primary/25 uppercase tracking-[0.25em] space-y-4 select-none pointer-events-none hidden xl:block z-20">
        <div className="space-y-1">
          <div>[ PARTNERSHIP ENGINE: ACTIVE ]</div>
          <div>// STAGE_COORD: AIG-B2B-NET</div>
          <div>// FLOW: INITIATED</div>
        </div>
        <div className="h-[120px] w-[1px] bg-gradient-to-b from-primary/25 to-transparent ml-2" />
      </div>

      <div className="absolute right-6 top-[40%] font-mono text-[9px] text-primary/25 uppercase tracking-[0.25em] space-y-4 select-none pointer-events-none hidden xl:block z-20">
        <div className="space-y-1 text-right">
          <div>[ NODE CONNECTED ]</div>
          <div>INTEGRATION: TIER-1</div>
          <div>ESTIMATED SETUP: 6-8 WEEKS</div>
        </div>
        <div className="h-[120px] w-[1px] bg-gradient-to-b from-primary/25 to-transparent mr-2 ml-auto" />
      </div>

      {/* Hero Section */}
      <div className="pt-40 pb-28 relative overflow-hidden bg-gradient-to-b from-[#f8f8fb] via-white to-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            
            {/* Left Column: Big Bold Typography */}
            <div className="flex-1 w-full text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Institutional Collaboration
              </motion.div>
              
              <h1 className="font-headline text-5xl sm:text-7xl lg:text-[84px] font-black tracking-tighter leading-[0.95] mb-8 uppercase text-left text-[#1a1a2e]">
                <span className="block overflow-hidden py-1">
                  <motion.span 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    Build A
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-1">
                  <motion.span 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="block text-primary font-black"
                  >
                    State-Of-The-Art
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-1.5">
                  <motion.span 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e] to-primary/80 font-black"
                  >
                    AIR Lab Setup
                  </motion.span>
                </span>
              </h1>
              
              <div className="overflow-hidden mb-10 max-w-xl">
                <motion.p 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  className="text-xl text-[#1a1a2e]/60 font-medium leading-relaxed text-left"
                >
                  Equip your college, university, or corporate campus with an advanced AI and Robotics infrastructure designed to future-proof your students and workforce.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button 
                  onClick={() => document.getElementById("proposal-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-10 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d42535] transition-all duration-300 shadow-lg shadow-primary/25 hover:scale-[1.03] active:scale-95"
                >
                  Get A Proposal
                </button>
                <button 
                  onClick={() => document.getElementById("facility-showcase")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-10 py-4 bg-[#1a1a2e]/5 border border-[#1a1a2e]/10 text-[#1a1a2e] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#1a1a2e]/10 transition-all duration-300 hover:scale-[1.03] active:scale-95"
                >
                  View Facility Map
                </button>
              </motion.div>
            </div>

            {/* Right Column: Dynamic Abstract Layout */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full relative max-w-xl lg:max-w-none"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-[#f5f5f8] border border-black/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                <img 
                  src="/labs_hero_collage.png" 
                  alt="AIR G Lab Infrastructure" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Embedded HUD telemetry on image */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-black/5 rounded-2xl p-4 text-left z-20 shadow-lg">
                  <div className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">// CAMPUS MODEL: INTEGRATED</div>
                  <div className="text-[#1a1a2e] font-extrabold text-lg mt-1">Interactive Innovation Nodes</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Why Build an AIR Lab */}
      <div className="py-32 bg-[#f8f8fb] relative overflow-hidden">
        {/* Glows */}
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          <div className="text-left mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              INNOVATION EDGE
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight uppercase font-headline">Why Partner With AIR G?</h2>
            <div className="w-32 h-[3px] bg-gradient-to-r from-primary to-[#ff4b5c] mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Future-Proof Curriculum",
                desc: "Integrate Industry 4.0 & 5.0 technologies directly into your educational framework.",
                icon: "school",
                telemetry: "// NODE_CLASS: ACADEMIC_ADVANCED"
              },
              {
                title: "Hands-On R&D Platforms",
                desc: "Provide students and employees with real-world, kinetic hardware and AI software.",
                icon: "precision_manufacturing",
                telemetry: "// HARDWARE: KINETIC_DEPLOYED"
              },
              {
                title: "Global Tech Ecosystem",
                desc: "Become a verified AIR G Node, connecting your institution to a global tech ecosystem.",
                icon: "public",
                telemetry: "// NETWORK: GLOBAL_MESH_CONNECT"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-black/5 rounded-3xl p-10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group text-left relative"
              >
                <div className="absolute top-6 right-8 font-mono text-[8px] text-[#1a1a2e]/15 uppercase tracking-widest">{feature.telemetry}</div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-[#1a1a2e] font-headline">{feature.title}</h3>
                <p className="text-[#1a1a2e]/50 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Infrastructure Showcase ========== */}
      <div id="facility-showcase" className="py-32 relative overflow-hidden bg-white">
        {/* Ambient glow effects */}
        <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[120px] pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Infrastructure Gallery
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight mb-4 uppercase font-headline">
                Explore Our <span className="text-primary">Lab Facilities</span>
              </h2>
              <p className="text-[#1a1a2e]/40 text-lg font-medium max-w-2xl mx-auto">
                Browse through our world-class lab zones — each designed and equipped for specific deep-tech disciplines.
              </p>
            </motion.div>
          </div>

          {/* Tab Navigation Bar */}
          <div className="relative mb-12">
            <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, white 2%, white 98%, transparent)', maskImage: 'linear-gradient(to right, transparent, white 2%, white 98%, transparent)' }}>
              {infrastructureZones.map((zone, idx) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative flex items-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 select-none shrink-0 border ${
                    activeTab === idx
                      ? 'bg-primary text-white border-primary shadow-[0_0_25px_rgba(238,44,60,0.2)] scale-[1.02]'
                      : 'bg-[#f5f5f8] text-[#1a1a2e]/50 border-black/[0.04] hover:bg-[#eee] hover:text-[#1a1a2e] hover:border-black/10'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg ${activeTab === idx ? 'text-white' : 'text-primary/70 group-hover:text-primary'}`}>
                    {zone.icon}
                  </span>
                  <span>{zone.tab}</span>
                  {activeTab === idx && (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse ml-1" />
                  )}
                </button>
              ))}
            </div>
            {/* Bottom gradient line */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent mt-2" />
          </div>

          {/* Active Zone Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Large Hero Image Card */}
              <div className="relative rounded-[2.5rem] overflow-hidden mb-8 group border border-black/[0.06] shadow-xl">
                <div className="aspect-[21/9] relative">
                  <img
                    src={activeZone.image}
                    alt={activeZone.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/60 to-transparent" />

                  {/* HUD corner markers */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg pointer-events-none" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-lg pointer-events-none" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg pointer-events-none" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg pointer-events-none" />

                  {/* Top-right HUD badge */}
                  <div className="absolute top-6 right-14 font-mono text-[9px] text-white/40 uppercase tracking-widest pointer-events-none select-none text-right">
                    <div>ZONE {String(activeTab + 1).padStart(2, '0')} / {String(infrastructureZones.length).padStart(2, '0')}</div>
                    <div className="text-primary/60">STATUS: DEPLOYED</div>
                  </div>

                  {/* Bottom content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div className="max-w-2xl text-left">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/90 backdrop-blur-md flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white text-2xl">{activeZone.icon}</span>
                          </div>
                          <span className="font-mono text-[10px] text-primary tracking-widest uppercase font-bold">
                            Zone {String(activeTab + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-lg uppercase font-headline leading-tight mb-3">
                          {activeZone.title}
                        </h3>
                        <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
                          {activeZone.description}
                        </p>
                      </div>

                      {/* Stats badges */}
                      <div className="flex flex-wrap gap-3 shrink-0">
                        {Object.entries(activeZone.stats).map(([key, value]) => (
                          <div key={key} className="bg-white/15 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
                            <span className="text-white font-bold text-sm block">{value}</span>
                            <span className="text-white/40 text-[9px] font-mono uppercase tracking-wider">{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeZone.features.map((feature, i) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="group relative bg-[#f8f8fb] border border-black/[0.04] rounded-2xl p-6 hover:bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden text-left"
                  >
                    {/* Hover accent */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
                    </div>

                    <div className="relative z-10">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <span className="material-symbols-outlined text-primary text-xl">{feature.icon}</span>
                      </div>
                      <h4 className="font-bold text-[#1a1a2e] text-sm tracking-tight leading-snug">{feature.label}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA Bar */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-8 rounded-[2rem] border border-black/[0.06] bg-[#f8f8fb]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">verified</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[#1a1a2e]/35 text-[10px] font-mono uppercase tracking-widest block">Ready to Deploy</span>
                    <span className="text-[#1a1a2e] font-semibold text-sm">Get this zone customized for your institution</span>
                  </div>
                </div>
                <button 
                  onClick={() => document.getElementById("proposal-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d42535] transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-3 select-none hover:scale-[1.03] active:scale-95"
                >
                  <span>Request This Setup</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* About AIR Lab Section */}
      <div className="py-32 bg-[#f8f8fb] border-t border-b border-black/5 relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 z-10 relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="flex-1 text-left space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                // EDUCATION EVOLUTION
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] font-headline uppercase leading-tight">
                About AIR Lab <span className="text-primary">(एआईआर)</span>
              </h2>
              <h3 className="text-xl md:text-2xl text-[#1a1a2e]/80 font-bold">
                Advanced Artificial Intelligence & Robotics Labs
              </h3>
              <p className="text-[#1a1a2e]/55 text-lg leading-relaxed font-light">
                AIR Lab is a pioneering B2B campus setup model designed to bring hands-on, forward-thinking AI and robotics training environments straight to your institution. Through a robust blend of interdisciplinary hardware zones, modular prototyping systems, and state-of-the-art training parameters, the AIR Lab acts as a transformative force in shaping the technical capabilities of future engineers.
              </p>
            </div>
            
            {/* Right Image */}
            <div className="flex-1 w-full">
              <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl relative bg-[#f5f5f8]">
                <img 
                  src="/air-lab-about.png" 
                  alt="About AIR Lab System" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What the AIR Lab Will Deliver (5 Card Grid) */}
      <div className="py-32 bg-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em]">
              CORE OBJECTIVES
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight uppercase font-headline">
              An AIR Lab Setup <span className="text-primary">will:</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#ff4b5c] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Offer Undergraduate Support",
                desc: "Deliver applied modules in core AI, robotics, and aerial drone engineering disciplines.",
                icon: "school"
              },
              {
                title: "Provide Robust Hardware",
                desc: "Train students using advanced industrial automation kits and modular controller nodes.",
                icon: "memory"
              },
              {
                title: "Promote Ethical AI",
                desc: "Integrate responsible, creative, and secure deployment guidelines into every lab project.",
                icon: "verified_user"
              },
              {
                title: "Serve as R&D Hub",
                desc: "Host interdisciplinary student projects, rapid prototyping sessions, and patent filings.",
                icon: "hub"
              },
              {
                title: "Forge Strategic Partnering",
                desc: "Connect campuses directly to corporate anchors and local technology incubation pipelines.",
                icon: "handshake"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-black/5 rounded-2xl p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#1a1a2e] mb-3 tracking-tight">{card.title}</h4>
                </div>
                <p className="text-[#1a1a2e]/45 text-xs font-light leading-relaxed mt-2">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision & Mission Sections */}
      <div className="py-32 bg-[#f8f8fb] text-center px-6 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10 text-left">
          {/* Vision */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight uppercase font-headline">Vision</h2>
            <p className="text-[#1a1a2e]/60 text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto text-center">
              To build world-class interdisciplinary tech environments that empower academic and corporate institutions to understand, innovate, and lead in the rapidly evolving world of Artificial Intelligence and Robotics.
            </p>
          </div>

          {/* Mission Red Block */}
          <div className="border border-primary/10 bg-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-xl shadow-primary/5 hover:border-primary/20 transition-all duration-300">
            {/* Top diagnostic line */}
            <div className="flex justify-between items-center mb-8 font-mono text-[9px] text-[#1a1a2e]/30 uppercase tracking-widest border-b border-black/5 pb-4 select-none">
              <div>// MISSION PARAMETERS</div>
              <div>TIER-1 DEPLOYMENT</div>
            </div>

            <h3 className="text-3xl font-black text-[#1a1a2e] uppercase font-headline mb-10 text-center">Mission</h3>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                {
                  title: "Deploy Advanced Hardware Infrastructure",
                  desc: "Assemble industry-standard electronics, robotic units, drone sets, and high-performance GPU systems directly in the institution."
                },
                {
                  title: "Cultivate Ethical & Entrepreneurial Leadership",
                  desc: "Integrate frameworks that inspire students to design AI solutions addressing real-world economic, social, and industrial challenges."
                },
                {
                  title: "Foster Interdisciplinary Innovation",
                  desc: "Encourage critical thinking, cross-department collaboration, and creative research breakthroughs."
                },
                {
                  title: "Empower Members with Future Skills",
                  desc: "Deliver practical curriculum templates, training materials, and international placement linkages for sustainable professional growth."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="material-symbols-outlined text-primary text-base font-bold">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e] text-base mb-1">{item.title}</h4>
                    <p className="text-[#1a1a2e]/55 text-xs font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* B2B Partnership proposal form */}
      <div id="proposal-section" className="py-32 bg-white relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, rgba(238,44,60,0.12) 1px, transparent 1px), 
                            linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px'
        }}></div>

        <div className="max-w-[900px] mx-auto px-6 relative z-10 text-left">
          <div className="border border-primary/10 bg-[#fafafa] backdrop-blur-sm p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden shadow-xl shadow-primary/5 hover:border-primary/20 transition-all duration-300">
            {/* Top diagnostic element */}
            <div className="flex justify-between items-center mb-10 font-mono text-[9px] text-[#1a1a2e]/30 uppercase tracking-widest border-b border-black/5 pb-4 select-none">
              <div>// OBJECTIVE: B2B LEAD INTAKE</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>SECURE INTAKE ACTIVE</span>
              </div>
            </div>

            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] tracking-tight uppercase font-headline mb-3">Partner With Us</h2>
              <p className="text-[#1a1a2e]/45 font-light text-sm md:text-base">Fill out the form below to request a customized proposal and lab blueprint for your campus.</p>
            </div>

            {submitStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-black text-[#1a1a2e] mb-2 uppercase font-headline">Request Received!</h3>
                <p className="text-[#1a1a2e]/50 font-light">Our partnership director will contact you within 24 hours to schedule a consultation.</p>
                <button 
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 px-6 py-2 border border-black/10 rounded-lg hover:bg-black/5 transition-colors font-semibold uppercase text-xs tracking-wider text-[#1a1a2e]"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Full Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Institution / Company</label>
                    <input required type="text" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="University Name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Email Address</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="john@university.edu" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Additional Requirements (Optional)</label>
                  <textarea rows={4} value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="Tell us about your campus size, student count, or specific technology interests..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-[#d42535] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Request Proposal"
                  )}
                </button>
              </form>
            )}

            {/* Bottom Accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide utility */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}
