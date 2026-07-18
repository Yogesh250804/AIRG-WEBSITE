"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckoutModal } from "@/components/store/CheckoutModal";
import { 
  Cpu, Sprout, Milestone, GraduationCap, Users, ShieldCheck, 
  ArrowRight, Lightbulb, MapPin, Award, CheckCircle2, ChevronRight,
  TrendingUp, Globe, FileText, Settings
} from "lucide-react";

export default function GrampanchayatAILabPage() {
  const [activeZone, setActiveZone] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ name: string; price: number; image?: string; category?: string } | null>(null);

  const labImages = [
    "/pratham/PHOTO-2026-07-14-20-49-29.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-30.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-31.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-32.jpg",
    "/pratham/PHOTO-2026-07-14-20-50-11.jpg",
    "/indian_pdet_lab.png"
  ];

  useEffect(() => {
    if (labImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % labImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [labImages.length]);

  const [zones, setZones] = useState([
    {
      name: "Rural AI & Digital Literacy Zone",
      icon: "school",
      image: "/lab-smartlearning.png",
      items: [
        { name: "Local Language AI Assistants & LMS Platforms", qty: 0, unitCost: 1500, isLot: false },
        { name: "Computing Terminals & Mini PCs", qty: 0, unitCost: 18000, isLot: false },
        { name: "Digital Literacy Training Manuals (Regional Languages)", qty: 0, unitCost: 500, isLot: false },
        { name: "Edge Computing & local AI Nodes", qty: 0, unitCost: 12000, isLot: false }
      ]
    },
    {
      name: "Agricultural IoT & Sensor Tech Station",
      icon: "agriculture",
      image: "/lab-electronics.png",
      items: [
        { name: "Smart Soil Moisture & Temperature Sensor Kits", qty: 0, unitCost: 1500, isLot: false },
        { name: "Automatic Irrigation Controller Kits", qty: 0, unitCost: 3500, isLot: false },
        { name: "Weather Station Monitoring Modules", qty: 0, unitCost: 8500, isLot: false },
        { name: "LoRaWAN long-range communication nodes", qty: 0, unitCost: 5000, isLot: false }
      ]
    },
    {
      name: "Grassroots Robotics & Automation Corner",
      icon: "precision_manufacturing",
      image: "/lab-robotics.png",
      items: [
        { name: "Robotics Assembly & Starter Kits", qty: 0, unitCost: 4500, isLot: false },
        { name: "Microcontroller Board Packs (Arduino/Raspberry Pi)", qty: 0, unitCost: 3000, isLot: false },
        { name: "Basic Electronic Component Starter Sets", qty: 0, unitCost: 8000, isLot: true }
      ]
    },
    {
      name: "Grampanchayat Resource Hub & Smart Display",
      icon: "domain",
      image: "/lab-smartlearning.png",
      items: [
        { name: "Interactive Smart Panel Display (65”)", qty: 0, unitCost: 95000, isLot: false },
        { name: "Lab Branding, Guidelines, & Informative Wall Art", qty: 0, unitCost: 15000, isLot: true }
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

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  const processSteps = [
    {
      step: "01",
      title: "Local Needs Assessment",
      desc: "We analyze rural community needs and prepare the Grampanchayat room blueprint for optimal layout and power setup.",
      image: "/lab-robotics.png"
    },
    {
      step: "02",
      title: "Infrastructure Installation",
      desc: "Our engineers install smart panels, computing terminals, agricultural IoT kits, and local language AI assets.",
      image: "/hardware_procurement_new.png"
    },
    {
      step: "03",
      title: "Local Youth Enablement",
      desc: "We train local operators and educators to run training modules, ensuring independence and long-term utility.",
      image: "/lab-electronics.png"
    },
    {
      step: "04",
      title: "Community Program Launch",
      desc: "The lab opens for students, farmers (agricultural IoT testing), and youth seeking technical skills certifications.",
      image: "/lab-smartlearning.png"
    }
  ];

  return (
    <main className="bg-[#FAFBFD] min-h-screen text-[#1a1a2e] relative overflow-x-hidden font-sans pt-20">
      <Navbar />

      {/* Decorative Grid and Ambient Glow Objects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-96 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Hero section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 pt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left relative">
            {/* Design Element: Accent Line */}
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block rounded-full" />
            
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Grassroots Tech Revolution
            </span>
            <h1 className="font-headline text-5xl sm:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#1a1a2e]">
              Grampanchayat <br />
              <span className="text-primary text-glow-red">AI Labs</span>
            </h1>
            <p className="text-base sm:text-xl text-[#1a1a2e]/70 font-light leading-relaxed max-w-2xl">
              Pioneering the democratization of high-compute artificial intelligence, coding, precision IoT, and modern tech skills at the very foundation of local self-governance.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <Award className="w-4 h-4" />
                <span>India's 1st Grassroots AI Initiative</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a1a2e]/60 bg-black/5 px-3 py-1.5 rounded-lg border border-black/5 hover:border-black/10 transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Empowering Rural Communities</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-[3.1rem] blur opacity-15" />
            <div className="glass-premium rounded-[3rem] border border-black/5 overflow-hidden p-3 shadow-2xl bg-white/70 relative">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-900 group">
                <img
                  src={labImages[currentImageIndex]}
                  alt="Grampanchayat AI Lab Setup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">Active Site Showcase</span>
                    <p className="text-sm font-bold text-white font-headline uppercase mt-0.5">Grassroots Innovation Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Spotlight: First AI Lab in Grampanchayat */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-20 border-t border-black/5">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] rounded-[3.5rem] text-white overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(238,44,60,0.15),transparent_45%)]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 sm:p-12 md:p-16 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                <Milestone className="w-3.5 h-3.5" />
                Historic Milestone
              </div>
              <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none">
                India's First AI Lab <br />
                <span className="text-primary text-glow-red">In A Grampanchayat</span>
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
                Breaking technology barriers where they matter most. We established the country's first-ever Grampanchayat AI Lab, demonstrating that state-of-the-art technologies like local generative AI models, edge compute nodes, and IoT-driven farming systems aren't just for tech hubs—they belong in our villages.
              </p>
              
              {/* Highlight list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-lg bg-primary/20 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-white">Local Language Access</h4>
                    <p className="text-[11px] text-white/50 font-light mt-0.5">Generative AI training in regional languages for accessibility.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-lg bg-primary/20 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-white">Smart Farming Integration</h4>
                    <p className="text-[11px] text-white/50 font-light mt-0.5">Real IoT sensors predicting soil and moisture health locally.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-lg bg-primary/20 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-white">Self-Sustaining Model</h4>
                    <p className="text-[11px] text-white/50 font-light mt-0.5">Managed by local youth operators trained in advanced modules.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-lg bg-primary/20 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-white">Coding & Drones corner</h4>
                    <p className="text-[11px] text-white/50 font-light mt-0.5">Exposing rural school students to physical automation early.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-left hover:border-primary/30 transition-all hover:scale-[1.02] duration-300">
                <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">Global Reach</span>
                <div className="text-3xl sm:text-4xl font-black font-headline text-white mt-2">50,000+</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Students Empowered</div>
                <p className="text-[10px] text-white/40 font-light mt-2">Across global schools and advanced training networks.</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-left hover:border-primary/30 transition-all hover:scale-[1.02] duration-300">
                <span className="text-[9px] font-mono text-[#4ade80] font-bold uppercase tracking-wider bg-[#4ade80]/10 px-2 py-0.5 rounded">Local Village</span>
                <div className="text-3xl sm:text-4xl font-black font-headline text-primary mt-2">1,500+</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Villagers Connected</div>
                <p className="text-[10px] text-white/40 font-light mt-2">Trained on local language AI assistants and digital tools.</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-left hover:border-primary/30 transition-all hover:scale-[1.02] duration-300">
                <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">Global Reach</span>
                <div className="text-3xl sm:text-4xl font-black font-headline text-white mt-2">50+</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Labs Established</div>
                <p className="text-[10px] text-white/40 font-light mt-2">Innovation and deep tech lab centers built globally.</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-left hover:border-primary/30 transition-all hover:scale-[1.02] duration-300">
                <span className="text-[9px] font-mono text-[#4ade80] font-bold uppercase tracking-wider bg-[#4ade80]/10 px-2 py-0.5 rounded">Local Village</span>
                <div className="text-3xl sm:text-4xl font-black font-headline text-white mt-2">5+</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/70 mt-1">Active IoT Nodes</div>
                <p className="text-[10px] text-white/40 font-light mt-2">Soil and crop telemetry nodes deployed in the area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars of Grampanchayat AI Labs */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-16 text-left">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Empowering Rural Minds</span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              How AIRG Teaches Children & Opens AI Labs in Villages
            </h2>
            <p className="text-sm sm:text-base text-[#1a1a2e]/60 font-light leading-relaxed max-w-3xl">
              By setting up physical AI and Robotics Labs inside Gram Panchayats, AIRG is bringing cutting-edge technology directly to rural schools. We empower local students with practical coding, hardware engineering, and automation skills to solve regional challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-black/5 hover:border-primary/20 p-6 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Bharat AI Engine</h3>
              <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                Rural kids interact with the Bharat AI Engine, learning generative AI concepts, coding logic, and regional language translation offline without requiring high-speed internet.
              </p>
            </div>

            <div className="bg-white border border-black/5 hover:border-primary/20 p-6 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Robotics & Robots</h3>
              <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                Students construct physical robots, wire microcontrollers like Arduino, and program smart motors to build automation models like automatic streetlights.
              </p>
            </div>

            <div className="bg-white border border-black/5 hover:border-primary/20 p-6 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Drones & Aviation</h3>
              <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                Introducing kids to aerodynamics, model glider assembly, and smart flight controllers. Students simulate drone mapping and crop survey runs.
              </p>
            </div>

            <div className="bg-white border border-black/5 hover:border-primary/20 p-6 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Hands-on IoT</h3>
              <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                Teaching kids how to interface soil moisture, weather sensors, and solar telemetry kits to build real precision farming aids for their own family fields.
              </p>
            </div>
          </div>
        </div>
      </section>      {/* Rural AI Infrastructure Kit Showcase */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-20 border-t border-black/5 text-left bg-gradient-to-b from-transparent to-[#FAFBFD]">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Physical Objects & Hardware</span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              Rural AI Infrastructure Kit
            </h2>
            <p className="text-sm sm:text-base text-[#1a1a2e]/60 font-light leading-relaxed max-w-3xl">
              Inside every Grampanchayat AI Lab, kids get hands-on access to custom hardware built specifically for offline, durable educational use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Object 1 */}
            <div className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md border border-black/5 bg-white relative p-2 flex items-center justify-center">
                <img
                  src="/extracted-images/bharat_ai_engine_v4.png"
                  alt="Bharat AI Engine Hardware"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">Offline Server Node</span>
                </div>
                <h3 className="font-headline text-xl font-black uppercase text-[#1a1a2e] group-hover:text-primary transition-colors">Bharat AI Engine™</h3>
                <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                  A high-durability local edge host serving interactive LMS, generative AI chat, and regional language models without requiring active internet connectivity.
                </p>
                <ul className="text-[11px] text-[#1a1a2e]/70 space-y-1 font-mono">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Offline LLM Pipeline (Llama/Gemma)</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> MESH Network (Up to 20 client nodes)</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Voice-Activated Regional Translation</li>
                </ul>
              </div>
            </div>

            {/* Object 2 */}
            <div className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md border border-black/5 bg-slate-900 relative">
                <img
                  src="/lab-robotics.png"
                  alt="AIR Robotics Base Board"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-500 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">Tactile Assembly</span>
                </div>
                <h3 className="font-headline text-xl font-black uppercase text-[#1a1a2e] group-hover:text-blue-500 transition-colors">AIR Robotics Base Boards</h3>
                <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                  Tactile block connectors, microcontrollers (Arduino/Raspberry Pi compatible), smart stepper motor modules, and sensors for building autonomous robots.
                </p>
                <ul className="text-[11px] text-[#1a1a2e]/70 space-y-1 font-mono">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Solderless Kids-Safe Connections</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Dual Arduino & Raspberry Pi Support</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Multi-Servo & Active Sensor Ports</li>
                </ul>
              </div>
            </div>

            {/* Object 3 */}
            <div className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md border border-black/5 bg-slate-900 relative">
                <img
                  src="/lab-drone.png"
                  alt="Aviation Drone Kit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-500 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">Aero Simulator</span>
                </div>
                <h3 className="font-headline text-xl font-black uppercase text-[#1a1a2e] group-hover:text-purple-500 transition-colors">Aviation & Flight Kits</h3>
                <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                  Aerodynamic wing configurations, high-density foam model gliders, and smart miniature flight controller boards to teach kids structural design and survey math.
                </p>
                <ul className="text-[11px] text-[#1a1a2e]/70 space-y-1 font-mono">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Lightweight Aerodynamic Foam Gliders</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Wireless Flight Telemetry Tracking</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Rudder & Surface Servo Configurations</li>
                </ul>
              </div>
            </div>

            {/* Object 4 */}
            <div className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md border border-black/5 bg-slate-900 relative">
                <img
                  src="/lab-electronics.png"
                  alt="NPK Telemetry Soil Probe"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">Agri-IoT Module</span>
                </div>
                <h3 className="font-headline text-xl font-black uppercase text-[#1a1a2e] group-hover:text-emerald-500 transition-colors">NPK Telemetry Probes</h3>
                <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                  Field-ready soil chemistry sensors, humidity/temperature probes, and long-range solar transmitters built to teach kids environmental data logging.
                </p>
                <ul className="text-[11px] text-[#1a1a2e]/70 space-y-1 font-mono">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Capacitive NPK Level Analysis Sensors</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Long-Range LoRa Telemetry Transmitter</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Weather-Resistant Battery Case Module</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Steps Section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24 border-t border-black/5 text-left">
        <div className="space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Deployment Workflow</span>
            <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              How We Set Up the Lab
            </h2>
            <p className="text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
              Our structured approach guarantees a fully functional, self-sustaining ecosystem within the village.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="group relative glass-premium p-6 rounded-[2rem] border border-black/5 hover:border-primary/20 hover:shadow-lg transition-all duration-300 flex flex-col bg-white overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
                <span className="text-4xl font-mono font-black text-primary/25 group-hover:text-primary/45 transition-colors mb-4">{step.step}</span>
                <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">{step.title}</h3>
                <p className="text-xs text-[#1a1a2e]/55 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grassroots Activity Gallery Section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24 border-t border-black/5 text-left bg-gradient-to-b from-transparent to-slate-50/50">
        <div className="space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Grassroots Showcase</span>
            <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              Rural Lab Activity Gallery
            </h2>
            <p className="text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
              Real-world documentation of children, mentors, and local leaders collaborating, creating, and learning in our Grampanchayat AI Labs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/pratham/PHOTO-2026-07-14-20-49-29.jpg",
              "/pratham/PHOTO-2026-07-14-20-49-29 (1).jpg",
              "/pratham/PHOTO-2026-07-14-20-49-30.jpg",
              "/pratham/PHOTO-2026-07-14-20-49-30 (1).jpg",
              "/pratham/PHOTO-2026-07-14-20-49-30 (2).jpg",
              "/pratham/PHOTO-2026-07-14-20-49-31.jpg",
              "/pratham/PHOTO-2026-07-14-20-49-32.jpg",
              "/pratham/PHOTO-2026-07-14-20-50-11.jpg",
              "/pratham/PHOTO-2026-07-14-20-50-11 (1).jpg"
            ].map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-2.5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-900">
                  <img
                    src={img}
                    alt={`Rural Lab Activity ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl bg-primary/80 p-4 rounded-full scale-75 group-hover:scale-100 transition-all duration-300">visibility</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Print receipt template (hidden on screen) */}
      <div id="pdet-receipt-print-root" className="hidden print:block p-8 bg-white max-w-[800px] mx-auto">
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            #pdet-receipt-print-root {
              display: block !important;
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
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Grampanchayat AI Lab Setup Customization</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Official Infrastructure Setup Quotation Estimate</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#333' }}>ESTIMATE / QUOTATION</div>
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
                Zone {String(zIdx + 1).padStart(2, '0')}: {zone.name}
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
                Zone Subtotal: ₹{formatCurrency(calculateZoneTotal(zIdx))}
              </div>
            </div>
          );
        })}

        {/* Grand Total */}
        <div style={{ marginTop: '24px', borderTop: '3px solid #EE2C3C', paddingTop: '20px', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', fontSize: '12px' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '16px', color: '#111' }}>GRAND TOTAL COST</td>
                <td style={{ textAlign: 'right', fontWeight: 900, fontSize: '28px', color: '#EE2C3C', letterSpacing: '-1px' }}>
                  ₹{formatCurrency(calculateGrandTotal())}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          item={checkoutItem}
        />
      )}
    </main>
  );
}
