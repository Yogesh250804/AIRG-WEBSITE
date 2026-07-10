"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SchoolLabsPage() {
  const [activeZone, setActiveZone] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [galleryFilter, setGalleryFilter] = useState("all");

  const gradesList = [
    { 
      id: "1", 
      label: "Grade 1", 
      file: "Grade 1 Book.pdf", 
      active: true, 
      desc: "Introduction to visual block coding (Scratch Jr), simple structural robotics assemblies, and understanding fundamental mechanical concepts like gears, axles, and levers.", 
      kitName: "AIR Junior Starter Kit", 
      previews: ["/extracted-images/page_10_img_1_69.png", "/extracted-images/page_12_img_2_79.png"],
      projects: ["Animating Sprites (Scratch Jr)", "Gear-Driven Spinning Top", "Mechanical Seesaw & Pivot"],
      hardware: ["AIR Junior Blocks & Connectors", "Spur Gears & Turning Axles", "Pulleys & Wheel Hub Units"]
    },
    { 
      id: "2", 
      label: "Grade 2", 
      file: "Grade 2 Book.pdf", 
      active: true, 
      desc: "Exploring electrical circuits, basic sensor integrations (such as IR obstacle sensors), active block-programming, and building simple autonomous model systems.", 
      kitName: "AIR Robotics Explorer Kit", 
      previews: ["/extracted-images/page_15_img_1_88.jpeg", "/extracted-images/page_16_img_1_91.jpeg"],
      projects: ["Simple LED Flashlight", "Traffic Light Signal Controller", "IR Obstacle Detection Buggy"],
      hardware: ["Robotics Controller Board", "IR Obstacle Sensor", "Battery Pack & Jumper Cables"]
    },
    { id: "3", label: "Grade 3", active: false, desc: "Curriculum expansion for advanced block coding and smart device inputs.", kitName: "Coming Soon", previews: [], projects: [], hardware: [] },
    { id: "4", label: "Grade 4", active: false, desc: "Curriculum expansion for algorithmic thinking and simple logic loop arrays.", kitName: "Coming Soon", previews: [], projects: [], hardware: [] },
    { 
      id: "5", 
      label: "Grade 5", 
      file: "Grade 5 Book.pdf", 
      active: true, 
      desc: "Transition to physical computing with Arduino, interfacing multiple sensor matrices (ultrasonic, temperature), learning structural 3D design, and printing custom shapes.", 
      kitName: "AIR IoT & Creator 3D Kit", 
      previews: ["/extracted-images/page_18_img_1_99.jpeg", "/extracted-images/page_19_img_1_105.jpeg"],
      projects: ["Automatic Hand Sanitizer Stand", "Smart Soil Moisture Monitor", "3D Custom Pen Cup Model"],
      hardware: ["Arduino Microcontroller Board", "Ultrasonic & Soil Sensors", "PLA 3D Printing Filament"]
    },
    { id: "6", label: "Grade 6", active: false, desc: "Curriculum expansion for edge AI computation and smart cities prototypes.", kitName: "Coming Soon", previews: [], projects: [], hardware: [] },
    { id: "7", label: "Grade 7", active: false, desc: "Curriculum expansion for telemetry, agricultural drones, and smart automation.", kitName: "Coming Soon", previews: [], projects: [], hardware: [] },
    { id: "8", label: "Grade 8", active: false, desc: "Curriculum expansion for Python scripting, data structures, and vision AI nodes.", kitName: "Coming Soon", previews: [], projects: [], hardware: [] },
    { id: "9", label: "Grade 9", active: false, desc: "Curriculum expansion for mechanical design, flight mechanics, and advanced rovers.", kitName: "Coming Soon", previews: [], projects: [], hardware: [] },
    { id: "10", label: "Grade 10", active: false, desc: "Curriculum expansion for machine learning models and industrial IoT meshes.", kitName: "Coming Soon", previews: [], projects: [], hardware: [] }
  ];

  const labImages = [
    "/attachments/PHOTO-2026-07-10-14-56-30.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-30_1.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-30_2.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-31.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-31_1.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-31_2.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-32.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-32_1.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-32_2.jpg",
    "/attachments/PHOTO-2026-07-10-14-56-32_3.jpg"
  ];

  useEffect(() => {
    if (labImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % labImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [labImages.length]);

  // Initialize state with default items and quantities matching the PDF proposal
  const [zones, setZones] = useState([
    {
      name: "AI Computing & Software Department",
      shortName: "AI & Computing",
      icon: "memory",
      image: "/lab-ai.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-31_2.jpg", "/attachments/PHOTO-2026-07-10-14-56-31.jpg"],
      items: [
        { name: "Bharat AI Engine (Education Edition) AI Platform with models, Local Server, LMS, Coding, Vision AI (10 System Software)", qty: 0, unitCost: 236000, isLot: false },
        { name: "Computer Systems (Intel Core i7, 8GB RAM, 512GB SSD, 22\" LED, Keyboard & Mouse)", qty: 0, unitCost: 30000, isLot: false },
        { name: "Smart TV (55\" 4K Samsung Vision AI)", qty: 0, unitCost: 55000, isLot: false },
        { name: "HD Webcam (Full HD)", qty: 0, unitCost: 2500, isLot: false },
        { name: "Pendrive (64GB)", qty: 0, unitCost: 800, isLot: false }
      ]
    },
    {
      name: "Robotics & Electronics Department",
      shortName: "Robotics",
      icon: "precision_manufacturing",
      image: "/lab-robotics.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-30_2.jpg", "/attachments/PHOTO-2026-07-10-14-56-32_3.jpg", "/attachments/PHOTO-2026-07-10-14-56-31.jpg"],
      items: [
        { name: "AIR Robotics Learning Kits", qty: 0, unitCost: 4000, isLot: false },
        { name: "Arduino UNO Boards (Controller Board)", qty: 0, unitCost: 400, isLot: false },
        { name: "Breadboards", qty: 0, unitCost: 100, isLot: false },
        { name: "Jumper Wire Kits", qty: 0, unitCost: 100, isLot: false },
        { name: "Digital Multimeters", qty: 0, unitCost: 900, isLot: false },
        { name: "Soldering Gun", qty: 0, unitCost: 250, isLot: false },
        { name: "Tool Kit (sockets, ratchets, wrenches, screwdrivers)", qty: 0, unitCost: 1000, isLot: false },
        { name: "Motor Driver Modules", qty: 0, unitCost: 200, isLot: false }
      ]
    },
    {
      name: "Electronic Sensors Subcategory",
      shortName: "Sensors",
      icon: "sensors",
      image: "/lab-electronics.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-32_3.jpg"],
      items: [
        { name: "Ultrasonic Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "PIR Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "IR Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "DHT11 Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "Soil Moisture Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "Rain Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "RFID Modules", qty: 0, unitCost: 100, isLot: false },
        { name: "Relay Modules", qty: 0, unitCost: 150, isLot: false },
        { name: "LDR Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "Buzzers", qty: 0, unitCost: 50, isLot: false },
        { name: "LED Kit (500+ LEDs)", qty: 0, unitCost: 1500, isLot: false },
        { name: "Resistor Kit (500+ Resistors)", qty: 0, unitCost: 1000, isLot: false },
        { name: "Capacitor Kit (500+ Capacitors)", qty: 0, unitCost: 1000, isLot: false }
      ]
    },
    {
      name: "Drone & VR Technologies",
      shortName: "Drone & VR",
      icon: "flight",
      image: "/lab-drone.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-32_2.jpg"],
      items: [
        { name: "Drone Simulator Software with TX-RX Remote", qty: 0, unitCost: 6000, isLot: false },
        { name: "Meta Oculus Quest 3s (VR Technology)", qty: 0, unitCost: 45000, isLot: false }
      ]
    },
    {
      name: "3D Printing Technology",
      shortName: "3D Printing",
      icon: "print",
      image: "/lab-3dprinting.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-32.jpg", "/attachments/PHOTO-2026-07-10-14-56-32_1.jpg", "/attachments/PHOTO-2026-07-10-14-56-30_1.jpg"],
      items: [
        { name: "Bambu Lab A1 Printer with Assembly", qty: 0, unitCost: 35000, isLot: false },
        { name: "Anycubic Printer with Assembly", qty: 0, unitCost: 25000, isLot: false },
        { name: "Filament PLA Pro+", qty: 0, unitCost: 1000, isLot: false }
      ]
    },
    {
      name: "Branding & Display Department",
      shortName: "Branding",
      icon: "stars",
      image: "/lab-smartlearning.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-30.jpg", "/attachments/PHOTO-2026-07-10-14-56-31_1.jpg"],
      items: [
        { name: "Acrylic Lab Name (Entry)", qty: 0, unitCost: 6000, isLot: false },
        { name: "Acrylic Names, Stickers for Dept.", qty: 0, unitCost: 1200, isLot: false },
        { name: "Technology Acrylic Posters", qty: 0, unitCost: 2000, isLot: false },
        { name: "Information Boards PVC Foam", qty: 0, unitCost: 2000, isLot: false },
        { name: "Information Books Set", qty: 0, unitCost: 200, isLot: false }
      ]
    },
    {
      name: "Display Technology Models",
      shortName: "Models",
      icon: "smart_toy",
      image: "/lab-robotics.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-30_2.jpg"],
      items: [
        { name: "Height Meter", qty: 0, unitCost: 8000, isLot: false },
        { name: "Smart Irrigation System", qty: 0, unitCost: 12000, isLot: false },
        { name: "Human Following Robot", qty: 0, unitCost: 6000, isLot: false },
        { name: "Touchless Sanitizer", qty: 0, unitCost: 4000, isLot: false },
        { name: "Obstacle Avoiding Robot", qty: 0, unitCost: 6000, isLot: false },
        { name: "Line Following Robot", qty: 0, unitCost: 6000, isLot: false },
        { name: "WiFi Controlled Robot", qty: 0, unitCost: 6000, isLot: false },
        { name: "Robotics ARM", qty: 0, unitCost: 6000, isLot: false }
      ]
    }
  ]);

  const updateQuantity = (zoneIdx: number, itemIdx: number, delta: number) => {
    setZones(prevZones => {
      const newZones = JSON.parse(JSON.stringify(prevZones));
      const item = newZones[zoneIdx].items[itemIdx];
      item.qty = Math.max(0, item.qty + delta);
      return newZones;
    });
  };

  const calculateZoneTotal = (zoneIdx: number) => {
    return zones[zoneIdx].items.reduce((sum, item) => sum + (item.qty * item.unitCost), 0);
  };

  const calculateGrandTotal = () => {
    return zones.reduce((sum, _, zoneIdx) => sum + calculateZoneTotal(zoneIdx), 0);
  };

  const calculateBaseCost = () => {
    return Math.round(calculateGrandTotal() / 1.18);
  };

  const calculateGST = () => {
    return calculateGrandTotal() - calculateBaseCost();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  const processSteps = [
    {
      step: "01",
      title: "Consultation & Architecture",
      desc: "Our engineering leads work with your academic team to survey school space and architect a customized lab floorplan.",
      icon: "architecture"
    },
    {
      step: "02",
      title: "Procurement & Delivery",
      desc: "AIR G sources industry-standard development boards, robotics, sensors, and 3D printing tech for dispatch.",
      icon: "local_shipping"
    },
    {
      step: "03",
      title: "Deployment & Commissioning",
      desc: "Certified field engineers complete physical installations, configuration of local servers, software, and LMS.",
      icon: "construction"
    },
    {
      step: "04",
      title: "Faculty Training & Curriculums",
      desc: "We run deep-dive bootcamps for your teaching faculty and supply complete books and classroom project sets.",
      icon: "school"
    }
  ];

  const outcomes = [
    "Artificial Intelligence & LLMs",
    "Prompt Engineering (Bharat AI)",
    "Python & C++ Coding",
    "Robotics Engineering",
    "IoT & Embedded Telemetry",
    "Computer Vision Models",
    "Drone Flying & Assembly",
    "3D Designing & Printing"
  ];

  const sampleProjects = [
    "AI Smart Dustbin",
    "Human Following Robot",
    "RFID Attendance System",
    "Smart Irrigation System",
    "Automatic Street Lights",
    "AI Face Attendance",
    "Laser Security System",
    "Voice Controlled Robot"
  ];

  return (
    <main className="relative min-h-screen bg-white selection:bg-primary/20 selection:text-primary overflow-x-hidden text-[#111827]">
      <Navbar />

      <div id="pdet-page-content-wrapper" className="print:hidden">

        {/* Redesigned Premium Cyberpunk Hero Section */}
        <div 
          className="pt-40 pb-28 relative overflow-hidden border-b border-white/[0.04]"
          style={{
            background: 'radial-gradient(circle at 80% 20%, rgba(238, 44, 60, 0.15), transparent 50%), radial-gradient(circle at 10% 80%, rgba(37, 99, 235, 0.08), transparent 50%), #0B0F19'
          }}
        >
          {/* Cyberpunk Grid Background Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              {/* Left Content */}
              <div className="flex-1 w-full text-left">
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/90 text-xs font-mono uppercase tracking-widest mb-8"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>FUTURE READY EDUCATION</span>
                  </motion.div>
                  
                  <h1 className="font-headline text-5xl md:text-6xl lg:text-[76px] font-black tracking-tighter leading-[0.9] mb-8 uppercase text-white text-left">
                    <span className="block overflow-hidden py-1">
                      <motion.span 
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="block"
                      >
                        AIR G
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden py-1.5">
                      <motion.span 
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="block bg-gradient-to-r from-primary to-[#ff6b6b] text-transparent bg-clip-text text-glow-red"
                      >
                        INNOVATION LAB
                      </motion.span>
                    </span>
                  </h1>
                  
                  <div className="overflow-hidden mb-10 max-w-xl">
                    <motion.p 
                       initial={{ y: "100%", opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                       className="text-lg md:text-xl text-white/60 font-light leading-relaxed"
                    >
                      Complete AI, Robotics, IoT &amp; Emerging Technology Lab Proposal. Build your custom deployment quotation below.
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Right Hero Cyberpunk Telemetry Image Card */}
              <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] blur-2xl pointer-events-none" />
                
                <div className="aspect-[4/3] rounded-[3rem] bg-slate-950 border border-white/[0.08] shadow-2xl overflow-hidden relative group p-3">
                  <div className="w-full h-full rounded-[2.3rem] overflow-hidden relative border border-white/[0.04]">
                    <img 
                      src={labImages[currentImageIndex]} 
                      alt="AIR G Innovation Lab" 
                      className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8 text-left flex justify-between items-end">
                      <div>
                        <h3 className="font-headline text-2xl font-black text-white uppercase tracking-tight">Ecosystem Architecture</h3>
                      </div>
                      <span className="text-[10px] font-mono text-white/50 bg-slate-950/60 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                        PROPOSAL REV. 4
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Customization Workspace Section */}
        <div className="py-24 bg-white border-b border-slate-100">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Live Calculator ]</span>
              <h2 className="text-4xl md:text-5xl font-headline font-black text-[#111827] uppercase tracking-tight">Configure Your School Lab</h2>
              <p className="text-[#111827]/60 text-lg mt-4">Select items to dynamically estimate base costs, GST (18%), and compile a downloadable official quotation proposal.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Department List & Items Editor */}
              <div className="lg:col-span-7 space-y-6">
                {/* Zone Select Tabs */}
                <div className="flex flex-wrap gap-2.5 pb-5 border-b border-[#111827]/5">
                  {zones.map((zone, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveZone(idx)}
                      className={`px-5 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeZone === idx 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-slate-150 text-slate-700 hover:bg-slate-200"
                      }`}
                      style={{ 
                        backgroundColor: activeZone === idx ? '#EE2C3C' : '#f1f5f9',
                        color: activeZone === idx ? '#ffffff' : '#334155' 
                      }}
                    >
                      {zone.shortName}
                    </button>
                  ))}
                </div>

                {/* Active Department Panel */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 text-left">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#111827]/5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{zones[activeZone].icon}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-primary font-mono uppercase tracking-widest block">Selected Sector</span>
                      <h3 className="font-headline text-2xl font-black text-[#111827] uppercase tracking-tight">{zones[activeZone].name}</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {zones[activeZone].items.map((item, idx) => (
                      <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-sm transition-all">
                        <div className="flex-1">
                          <h4 className="font-bold text-[#111827] text-sm md:text-base leading-snug">{item.name}</h4>
                          <span className="text-xs text-[#111827]/40 mt-1 block">Unit Price: ₹{formatCurrency(item.unitCost)}</span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(activeZone, idx, -1)}
                              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 font-bold transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-bold text-slate-800 text-sm tabular-nums">{item.qty}</span>
                            <button 
                              onClick={() => updateQuantity(activeZone, idx, 1)}
                              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right min-w-[90px]">
                            <span className="text-xs text-[#111827]/40 block">Subtotal</span>
                            <span className="font-extrabold text-slate-900 text-sm md:text-base tabular-nums">
                              ₹{formatCurrency(item.qty * item.unitCost)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Summary & Checkout */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl border border-white/[0.04] text-left">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div className="relative z-10 space-y-6">
                    <h3 className="font-headline text-2xl font-black uppercase tracking-tight border-b border-white/[0.08] pb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">analytics</span>
                      Quotation Summary
                    </h3>

                    {/* Department subtotals breakdown */}
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                      {zones.map((zone, idx) => {
                        const total = calculateZoneTotal(idx);
                        if (total === 0) return null;
                        return (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-white/60 truncate mr-4">{zone.name}</span>
                            <span className="font-mono text-white/90 shrink-0 font-bold">₹{formatCurrency(total)}</span>
                          </div>
                        );
                      })}
                      {calculateGrandTotal() === 0 && (
                        <div className="text-xs text-white/40 italic py-4 text-center">No items selected yet. Adjust quantities to calculate.</div>
                      )}
                    </div>

                    {/* Pricing Totals */}
                    <div className="border-t border-white/[0.08] pt-6 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">Base Price (Exclusive of GST)</span>
                        <span className="font-mono font-bold text-white/90">₹{formatCurrency(calculateBaseCost())}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">GST (18%)</span>
                        <span className="font-mono font-bold text-white/90">₹{formatCurrency(calculateGST())}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-white/[0.08] pt-4">
                        <div>
                          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block">Grand Total Cost</span>
                          <span className="text-[9px] text-primary block mt-0.5">// Setup &amp; Installation Exempted</span>
                        </div>
                        <span className="text-2xl font-extrabold font-headline tracking-tighter text-primary tabular-nums">
                          ₹{formatCurrency(calculateGrandTotal())}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const hasItems = zones.some(z => z.items.some(item => item.qty > 0));
                        if (!hasItems) {
                          alert("Please add at least one item before generating a quotation.");
                          return;
                        }
                        window.print();
                      }}
                      className="w-full py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-3 select-none hover:scale-[1.02] active:scale-95 mt-6"
                    >
                      <span>Download Quotation</span>
                      <span className="material-symbols-outlined text-sm">download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REDESIGNED SECTION: Premium Class Wise Curriculum & Book Downloads */}
        <div className="py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 text-left overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">
            <div className="max-w-3xl mb-16">
              <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Class Wise Curriculum ]</span>
              <h2 className="text-4xl md:text-5xl font-headline font-black text-[#111827] uppercase tracking-tight">Academic Lab Publications</h2>
              <p className="text-[#111827]/60 text-lg mt-4">Select a standard grade below to preview curriculum focal points, associate hardware kits, and download official textbook publications.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: Futuristic Grade Selector Cards Grid */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5">
                  {gradesList.map((grade) => (
                    <button
                      key={grade.id}
                      onClick={() => {
                        if (grade.active) {
                          setSelectedGrade(grade.id);
                        }
                      }}
                      className={`relative overflow-hidden group p-5 rounded-[1.5rem] border text-left transition-all duration-500 flex flex-col justify-between min-h-[110px] select-none ${
                        !grade.active 
                          ? "bg-slate-50/60 border-slate-200/40 opacity-55 cursor-not-allowed" 
                          : selectedGrade === grade.id 
                            ? "bg-gradient-to-br from-primary to-[#9B1C26] border-primary shadow-xl shadow-primary/20 text-white scale-[1.02]" 
                            : "bg-white border-slate-200/80 text-slate-700 hover:border-primary/40 hover:shadow-md hover:scale-[1.01]"
                      }`}
                      disabled={!grade.active}
                      style={{
                        backgroundColor: !grade.active ? '#fafafa' : undefined,
                        borderColor: selectedGrade === grade.id ? '#EE2C3C' : undefined
                      }}
                    >
                      {/* Decorative corner tag for active state */}
                      {selectedGrade === grade.id && grade.active && (
                        <span className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-bl-3xl flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </span>
                      )}

                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${
                          !grade.active 
                            ? "text-slate-400" 
                            : selectedGrade === grade.id 
                              ? "text-white/70" 
                              : "text-primary font-bold"
                        }`}>
                          {!grade.active ? "Pipeline" : "Active Syllabus"}
                        </span>
                        {!grade.active && (
                          <span className="material-symbols-outlined text-[14px] text-slate-300">lock</span>
                        )}
                      </div>

                      <div className="mt-4">
                        <h4 className={`font-headline text-xl font-black uppercase tracking-tight ${
                          selectedGrade === grade.id && grade.active ? "text-white" : "text-slate-800"
                        }`}>
                          {grade.label}
                        </h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Immersive Glassmorphic Preview Dashboard */}
              <div className="lg:col-span-7 bg-slate-950 text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between border border-white/[0.04] shadow-2xl">
                {/* Background glow effects */}
                <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                {(() => {
                  const currentGrade = gradesList.find(g => g.id === selectedGrade) || gradesList[0];
                  
                  // Extract tech badges dynamically for visual premium feel
                  const badges = currentGrade.id === "1" 
                    ? ["Block Coding", "Scratch Jr", "Assemblies", "Gears", "Mechanics"]
                    : currentGrade.id === "2"
                      ? ["Circuits", "Sensors", "Automation", "LogicGates", "Robotics"]
                      : ["Arduino", "Python", "IoT", "3D Printing", "Telemetry"];

                  return (
                    <div className="h-full flex flex-col justify-between gap-8 relative z-10">
                      
                      {/* Top Row: Title, Badge, Description */}
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                          <div>
                            <span className="text-[10px] text-primary font-mono uppercase tracking-widest block font-bold">// Standard Syllabus Profile</span>
                            <h3 className="font-headline text-3xl font-black uppercase tracking-tight text-white mt-1">
                              {currentGrade.label} Publications
                            </h3>
                          </div>
                        </div>

                        {/* Enlarged Book mockup (Centered Layout) */}
                        <div className="flex justify-center items-center w-full py-8">
                          
                          {/* 3D-Like Enlarged CSS Book Cover Mockup */}
                          <div className="relative group/book shrink-0">
                            {/* Book shadow glow */}
                            <div className="absolute inset-0 bg-primary/20 rounded-r-[2.5rem] blur-3xl group-hover/book:scale-105 transition-transform duration-500" />
                            
                            {/* Realistic Book structure */}
                            <div 
                              className="w-80 h-[26rem] rounded-r-[2.5rem] relative overflow-hidden flex flex-col justify-between p-8 border-l-[8px] border-primary shadow-2xl transition-all duration-500 group-hover/book:translate-x-2 group-hover/book:rotate-1 border border-white/[0.08]"
                              style={{ 
                                perspective: '1200px',
                                backgroundImage: 'url(/book-cover-template.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            >
                              {/* Page edges mockup */}
                              <div className="absolute right-0 top-0 bottom-0 w-[8px] bg-slate-100 rounded-r-xl shadow-inner" />
                              
                              {/* Book Spine reflection */}
                              <div className="absolute left-0 top-0 bottom-0 w-[16px] bg-white/5" />
                              
                              {/* Embossed Corner Borders */}
                              <div className="border border-white/10 rounded-[2rem] p-6 h-full flex flex-col justify-between items-center text-center relative z-10 bg-slate-950/40 backdrop-blur-[1px]">
                                
                                <div className="space-y-1.5">
                                  <div className="text-[10px] font-mono text-primary font-bold tracking-[0.25em]">AIR G LABS</div>
                                  <div className="text-[8px] text-white/60 uppercase tracking-widest">Official Curriculum</div>
                                </div>

                                <div className="my-auto flex flex-col items-center">
                                  <h4 className="text-4xl font-headline font-black text-white uppercase tracking-tight leading-none text-glow-red">
                                    {currentGrade.label}
                                  </h4>
                                </div>

                                <div className="w-full border-t border-white/15 pt-4 flex justify-between items-center">
                                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-wider">NGO EDITION</span>
                                  <span className="text-[8px] font-bold bg-primary/20 text-primary border border-primary/30 px-2.5 py-1 rounded-md uppercase tracking-widest">
                                    ACTIVE
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Bottom Row: Download Button */}
                      <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-4">
                        <a 
                          href={`/class/${currentGrade.file}`} 
                          download
                          className="px-8 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-primary/25 select-none hover:scale-[1.02] active:scale-95 shrink-0"
                        >
                          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                          <span>Download {currentGrade.label} Book (PDF)</span>
                        </a>
                      </div>

                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>

        {/* NEW SECTION: Deployed Lab Infrastructure Moving Track (Dark Cinematic Theme) */}
        <div className="py-24 bg-[#0B0F19] border-y border-white/[0.04] overflow-hidden relative text-left">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Live Deployments ]</span>
            <h2 className="text-4xl md:text-5xl font-headline font-black text-white uppercase tracking-tight">Ecosystem Spotlight</h2>
            <p className="text-white/60 text-lg mt-4">Actual photos of physical laboratory assets and students actively building Industry 4.0 innovations. Hover to focus.</p>
          </div>

          {/* Scrolling Track bounded by two borders */}
          <div className="w-full relative overflow-x-hidden border-y border-primary/50 py-12 bg-slate-950">
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-left {
                display: flex;
                width: max-content;
                animation: marquee-left 45s linear infinite;
              }
              .animate-marquee-left:hover {
                animation-play-state: paused;
              }
            `}} />

            {/* Slide Row Container (duplicated to loop infinitely) */}
            <div className="animate-marquee-left gap-8 py-6">
              {labImages.concat(labImages).map((imgUrl, idx) => (
                <div 
                  key={idx}
                  className="w-[300px] sm:w-[420px] aspect-[4/3] rounded-[2.5rem] bg-white border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden relative shrink-0 transition-all duration-500 hover:-translate-y-3 hover:border-primary/20 group cursor-pointer mr-8"
                >
                  <img 
                    src={imgUrl} 
                    alt="AIR G Setup" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BRAND NEW SECTION: Learning Outcomes & Projects Showcase (Warm Linen Theme) */}
        <div className="py-24 bg-gradient-to-b from-[#FAF6F0] to-white text-left border-b border-slate-100">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Learning Outcomes list */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Syllabus &amp; Outcomes ]</span>
                  <h2 className="text-4xl font-headline font-black text-[#111827] uppercase tracking-tight">Student Learning Outcomes</h2>
                  <p className="text-slate-500 mt-4">Setting up an AIR G lab provides students with structured, hand-on engineering pathways:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      <span className="text-[#111827] font-bold text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Sample projects students can build */}
              <div className="lg:col-span-7 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl border border-white/[0.04]">
                <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Build 50+ Projects ]</span>
                  <h3 className="text-3xl font-headline font-black uppercase tracking-tight mb-8">Real-World Student Inventions</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sampleProjects.map((project, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] p-4 rounded-2xl hover:bg-white/[0.05] transition-all">
                        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-mono text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-white/80 font-bold text-sm">{project}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BRAND NEW SECTION: Implant Faculty Training Program (Redesigned & Positioned at the End) */}
        <div className="py-24 bg-[#0a0d16] border-t border-white/[0.04] text-left relative overflow-hidden">
          {/* Cyberpunk Grid Background Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
            <div className="max-w-3xl mb-16">
              <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Faculty Accreditation ]</span>
              <h2 className="text-4xl md:text-5xl font-headline font-black text-white uppercase tracking-tight">Implant Training Program 2026</h2>
              <p className="text-white/60 text-lg mt-4">
                Ensure your teaching faculty are fully certified to instruct. Register for the official teacher training program. Secure slots by paying half fee, or clear full fee for lifetime curriculum access and physical lab hardware kits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              
              {/* Option 1: Half Fee Card */}
              <div className="bg-slate-950/60 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block">// SECURE SLOT</span>
                  <h4 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Phase 1 (Half Fee)</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    Secure your batch slot immediately and get instant access to the phase 1 curriculum modules, live coaching sessions, and online hardware simulator workspaces.
                  </p>
                  <div className="pt-4">
                    <span className="text-3xl font-headline font-black text-white">₹3,000</span>
                    <span className="text-white/40 text-xs font-mono ml-2">/ Half Registration</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/15">
                  <a 
                    href="https://wa.me/919860779172?text=Hello%2C%20I%20want%20to%20register%20for%20the%20AIR%20G%20Implant%20Training%20Program%20by%20paying%20the%20Half%20Fee%20(₹3%2C000)."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/25 hover:scale-[1.02] active:scale-95 text-center"
                  >
                    <span className="material-symbols-outlined text-sm">payments</span>
                    <span>Register Half Fee</span>
                  </a>
                </div>
              </div>

              {/* Option 2: Full Fee Card */}
              <div className="bg-slate-950 border border-primary/50 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl shadow-primary/10 relative hover:border-primary transition-all duration-300">
                <div className="absolute top-6 right-6">
                  <span className="text-[8px] font-bold bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded uppercase tracking-widest">RECOMMENDED</span>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block">// FULL PROGRAM ACCREDITATION</span>
                  <h4 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Lifetime Access (Full Fee)</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    Get unrestricted lifetime access to all advanced curriculum phases, official training physical hardware kits dispatched to your location, priority doubt solving, and certified completions.
                  </p>
                  <div className="pt-4">
                    <span className="text-3xl font-headline font-black text-white">₹6,000</span>
                    <span className="text-white/40 text-xs font-mono ml-2">/ Complete Course</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/15">
                  <a 
                    href="https://wa.me/919860779172?text=Hello%2C%20I%20want%20to%20register%20for%20the%20AIR%20G%20Implant%20Training%20Program%20by%20paying%20the%20Full%20Fee%20(₹6%2C000)."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-95 text-center"
                  >
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    <span>Register Full Fee</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* PRINT-ONLY QUOTATION TEMPLATE */}
      <div id="pdet-receipt-print-root" style={{ display: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @page {
            size: A4;
            margin: 15mm;
          }
          @media print {
            #pdet-page-content-wrapper,
            nav,
            .print\\:hidden {
              display: none !important;
            }
            #pdet-receipt-print-root {
              display: block !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              background: white !important;
              color: black !important;
              font-family: Arial, Helvetica, sans-serif !important;
              font-size: 11px !important;
              line-height: 1.5 !important;
            }
            #pdet-receipt-print-root * {
              color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}} />
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #EE2C3C', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#EE2C3C', letterSpacing: '-0.5px' }}>AIR G INTERNATIONAL</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>AI, Robotics, IoT &amp; Emerging Technology Lab Setup (NGO Proposal)</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Official Infrastructure Setup Proposal &amp; Quotation</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#333' }}>LAB SETUP QUOTATION</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Date: {new Date().toLocaleDateString("en-IN")}</div>
          </div>
        </div>

        {/* Zone Tables */}
        {zones.map((zone, zIdx) => {
          const selectedItems = zone.items.filter(item => item.qty > 0);
          if (selectedItems.length === 0) return null;

          return (
            <div key={zIdx} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '16px', pageBreakInside: 'avoid' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#EE2C3C', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                Department {String(zIdx + 1).padStart(2, '0')}: {zone.name}
              </div>
              <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ textAlign: 'left', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Equipment Item</th>
                    <th style={{ width: '60px', textAlign: 'center', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Qty</th>
                    <th style={{ width: '100px', textAlign: 'right', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Unit Price</th>
                    <th style={{ width: '110px', textAlign: 'right', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, iIdx) => (
                    <tr key={iIdx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '6px 0', color: '#333' }}>{item.name}</td>
                      <td style={{ padding: '6px 0', textAlign: 'center', color: '#444' }}>{item.isLot ? `${item.qty} Lot` : item.qty}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', color: '#444' }}>₹{formatCurrency(item.unitCost)}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600, color: '#222' }}>₹{formatCurrency(item.qty * item.unitCost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '12px', fontWeight: 700, color: '#333' }}>
                Department Subtotal: ₹{formatCurrency(calculateZoneTotal(zIdx))}
              </div>
            </div>
          );
        })}

        {/* ═══════ GRAND TOTAL ═══════ */}
        <div style={{ marginTop: '24px', borderTop: '3px solid #EE2C3C', paddingTop: '20px', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', fontSize: '12px' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '12px', color: '#111' }}>BASE COST (EXCL. GST)</td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '14px', color: '#555' }}>
                  ₹{formatCurrency(calculateBaseCost())}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '12px', color: '#111' }}>GST (18%)</td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '14px', color: '#555' }}>
                  ₹{formatCurrency(calculateGST())}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '16px', color: '#111', paddingTop: '10px' }}>GRAND TOTAL COST (INCL. GST)</td>
                <td style={{ textAlign: 'right', fontWeight: 900, fontSize: '28px', color: '#EE2C3C', letterSpacing: '-1px', paddingTop: '10px' }}>
                  ₹{formatCurrency(calculateGrandTotal())}
                </td>
              </tr>
              <tr>
                <td style={{ color: '#888', fontSize: '10px' }}>All configured department(s) included</td>
                <td style={{ textAlign: 'right', color: '#888', fontSize: '10px' }}>Setup &amp; Installation: Exempted</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms & Footer */}
        <div style={{ marginTop: '24px', paddingTop: '12px', borderTop: '1px solid #eee', fontSize: '9px', color: '#999', pageBreakInside: 'avoid' }}>
          <div style={{ fontWeight: 700, color: '#555', marginBottom: '4px' }}>Terms & Conditions:</div>
          <div>1. This PDF quotation is generated based on selected lab customizations.</div>
          <div>2. Pricing includes 18% GST as per statutory guidelines for NGO/educational projects.</div>
          <div>3. Standard installation, setup, and commissioning of the lab are fully exempted from additional costs.</div>
          <div>4. Valid for 30 days from generation date.</div>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '9px', color: '#aaa' }}>
          <div>AIR G International — Designing, Building, and Empowering Industry 4.0 Ecosystems Globally.</div>
          <div style={{ marginTop: '2px' }}>For support or proposal requests, contact: support@airg.international</div>
        </div>
      </div>
    </main>
  );
}
