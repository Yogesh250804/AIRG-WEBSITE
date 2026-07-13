import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { labsData } from "@/data/labs";
import { Navbar } from "@/components/demo-navbar";
import ImageSlider from "@/components/ImageSlider";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LabDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lab = labsData.find((l) => l.slug === slug);

  if (!lab) {
    notFound();
  }

  return (
    <main className="w-full h-screen overflow-y-auto custom-scrollbar bg-[#fcfcfc] text-[#1a1a2e] relative selection:bg-primary/30 selection:text-[#1a1a2e]">
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[5%] w-[45%] h-[45%] bg-[#EE2C3C]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[45%] h-[45%] bg-blue-500/5 rounded-full blur-[140px]" />
      </div>

      <Navbar />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 pt-32 pb-24">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-[#1a1a2e]/40 uppercase tracking-widest font-mono mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#labs" className="hover:text-primary transition-colors">Innovation Labs</Link>
          <span>/</span>
          <span className="text-[#EE2C3C] font-bold">{lab.name}</span>
        </div>

        {/* Hero Section - Title block & Stats on the right to fill empty space */}
        <div className="grid lg:grid-cols-5 gap-16 items-start mb-16">
          <div className="lg:col-span-3 space-y-6">
            <span className="px-3.5 py-1 bg-[#EE2C3C]/15 border-2 border-[#EE2C3C]/40 rounded-full text-[9px] font-extrabold text-[#EE2C3C] uppercase tracking-widest inline-flex items-center gap-1.5 font-sans">
              <span className="material-symbols-outlined text-[12px]">{lab.icon}</span>
              {lab.status}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] tracking-tight uppercase font-sans leading-none">
              {lab.name}
            </h1>
            <p className="text-lg md:text-xl text-[#1a1a2e]/60 leading-relaxed font-light font-sans max-w-2xl">
              {lab.desc}
            </p>
          </div>

          {/* Quick Metrics on the right side of the Title block */}
          <div className="lg:col-span-2 space-y-6 border-l-2 border-[#EE2C3C]/20 pl-8 pt-2">
            <div className="text-[10px] font-black text-[#EE2C3C] tracking-widest uppercase mb-4">
              Lab Performance & Scope
            </div>
            <div className="space-y-6">
              {lab.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-[9px] text-[#1a1a2e]/40 uppercase tracking-wider font-mono">{stat.label}</div>
                  <div className="text-2xl font-black text-[#1a1a2e] tracking-tight font-sans">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CLASSROOM GALLERY SWIPER COMES FIRST (Large & Centered directly under the title area) */}
        <div className="w-full mb-16">
          <ImageSlider images={lab.images} name={lab.name} />
          <div className="text-[9px] text-[#1a1a2e]/40 uppercase tracking-widest font-mono text-right mt-2 mr-2">
            Interactive Classroom View Gallery // Swipe or Click Arrows to Navigate
          </div>
        </div>

        {/* Detailed Information & Technical Specs */}
        <div className="grid lg:grid-cols-12 gap-16 items-start border-t border-black/5 pt-16">
          {/* Left Column: Description & Directives */}
          <div className="lg:col-span-7 space-y-12">
            {/* Mission Dossier */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-sans">
                <span className="w-1 h-5 bg-[#EE2C3C] rounded-full" />
                Mission Overview
              </h2>
              <p className="text-base text-[#1a1a2e]/65 leading-relaxed font-sans text-justify">
                {lab.detailedDesc}
              </p>
            </div>

            {/* Core Research Directives */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-sans">
                <span className="w-1 h-5 bg-[#EE2C3C] rounded-full" />
                Key Focus & Projects
              </h2>
              <ul className="space-y-4 font-sans">
                {lab.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#EE2C3C]/10 flex items-center justify-center text-[10px] font-bold text-[#EE2C3C] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[#1a1a2e]/65 leading-relaxed">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Equipment & Action */}
          <div className="lg:col-span-5 space-y-12">
            {/* Technology Stack Panel */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1a1a2e]/80 font-mono">
                Equipment & Tools Configured
              </div>
              <div className="flex flex-wrap gap-2">
                {lab.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl border border-black/5 bg-slate-100/50 font-mono text-[9px] font-bold text-[#1a1a2e]/60 uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Collaboration Action Panel */}
            <div className="space-y-6 pt-6 border-t border-black/5">
              <div className="space-y-2">
                <h3 className="font-sans text-lg font-black text-[#1a1a2e] uppercase tracking-tight">Academic Collaboration</h3>
                <p className="text-[#1a1a2e]/50 text-xs font-sans leading-relaxed">
                  Connect with this school's lab center to request student project portfolios, schedule visits, or coordinate STEM showcases.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button className="w-full px-6 py-3.5 bg-[#EE2C3C] text-white font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] glow-red font-sans text-center">
                  Contact Lab Center
                </button>
                <Link 
                  href="/#labs" 
                  className="w-full px-6 py-3.5 border border-black/10 text-[#1a1a2e]/60 hover:text-[#1a1a2e] font-extrabold text-[10px] uppercase tracking-widest rounded-xl hover:border-black/30 transition-all duration-300 flex items-center justify-center gap-2 font-sans text-center"
                >
                  Return to Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* PDEA - AIR G GLOBAL AI TRANSFORMATION PROGRAM Section */}
        <div className="mt-24 border-t border-black/5 pt-20 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tight leading-none">
              PDEA - AIR G <span className="text-primary text-glow-red">Global AI</span> Transformation Program
            </h2>
            <p className="text-xs md:text-sm text-primary font-bold tracking-[0.25em] uppercase font-mono">
              Today's Learning, Tomorrow's Leaders!
            </p>
          </div>

          {/* Curriculum / What Students Will Learn */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-mono justify-center">
              <span className="material-symbols-outlined text-primary">school</span>
              Students Will Learn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "AI & Data", desc: "Understand and use AI to solve real problems", icon: "psychology" },
                { title: "Drone Technology", desc: "Build, fly and program drones", icon: "flight_takeoff" },
                { title: "VR Technology", desc: "Explore virtual worlds and learn by experience", icon: "vrpano" },
                { title: "Robotics", desc: "Design, build and automate robots", icon: "precision_manufacturing" },
                { title: "Innovation & Projects", desc: "Work on real-life projects and build solutions", icon: "hub" }
              ].map((item, idx) => (
                <div key={idx} className="glass-premium p-6 rounded-2xl border border-black/5 hover:border-primary/30 transition-all flex flex-col items-center text-center justify-between group h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <div className="mt-4 flex-grow">
                    <h4 className="text-sm font-bold text-[#1a1a2e] uppercase tracking-tight font-sans">{item.title}</h4>
                    <p className="text-xs text-[#1a1a2e]/55 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Services We Provide */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-mono justify-center">
              <span className="material-symbols-outlined text-primary">design_services</span>
              School Services We Provide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Physical Lab Setup", desc: "Turnkey layout configuration, secure power lines management, safety branding, and ergonomic workstation setups built for group learning.", icon: "room" },
                { title: "Teacher Training (FDP)", desc: "Intensive 3-5 days Faculty Development Programs, ongoing monthly webinars, and continuous technical support with complete manuals.", icon: "group" },
                { title: "Curriculum Integration", desc: "Grade-specific activity booklets, video lessons libraries, and evaluation rubrics designed to blend with CBSE/ICSE or global curricula.", icon: "menu_book" },
                { title: "Advanced Kit Logistics", desc: "Direct delivery of certified drone assembly components, 3D printing filaments, VR headsets, and micro-controller modules.", icon: "local_shipping" },
                { title: "Global Certifications", desc: "Providing authorized certificates in AI, Drones, and IoT upon course completions to build students' academic profiles.", icon: "workspace_premium" },
                { title: "Club Hosting & Hackathons", desc: "Providing project mentors to run intra-school competitions, regional robotics tournaments, and science exhibitions.", icon: "emoji_events" }
              ].map((service, idx) => (
                <div key={idx} className="glass-premium p-6 rounded-[2rem] border border-black/5 hover:border-primary/20 transition-all duration-300 text-left flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-xl">{service.icon}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-[#1a1a2e] uppercase tracking-wide leading-tight">{service.title}</h4>
                    <p className="text-xs text-[#1a1a2e]/55 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Students Need Bharat AI Engine & How It Works */}
          <div className="glass-premium p-8 md:p-12 rounded-[2.5rem] border border-primary/20 bg-gradient-to-r from-primary/5 via-transparent to-transparent text-left">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Why & Detailing */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest font-mono">
                  // THE ENGINE OF STEM EDUCATION
                </span>
                <h3 className="font-headline text-2xl md:text-3xl font-black text-[#1a1a2e] uppercase tracking-tight">
                  Why Students Need the Bharat AI Engine
                </h3>
                <p className="text-sm text-[#1a1a2e]/65 leading-relaxed font-light">
                  Artificial Intelligence is reshaping the world, yet true hands-on AI learning is often limited by expensive cloud dependencies, security threats, and lack of specialized hardware. The <strong>Bharat AI Engine</strong> changes this by providing a localized, hardware-integrated AI cluster right in the school lab.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">verified_user</span>
                    <div>
                      <h4 className="font-bold text-[#1a1a2e] text-sm uppercase tracking-wide">100% Safe Offline Sandbox</h4>
                      <p className="text-[#1a1a2e]/55 text-xs font-medium">Students can interact with large language models, image generators, and robotics controllers locally without internet access—preventing exposure to online hazards.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">hardware</span>
                    <div>
                      <h4 className="font-bold text-[#1a1a2e] text-sm uppercase tracking-wide">Direct Hardware Integration</h4>
                      <p className="text-[#1a1a2e]/55 text-xs font-medium">Allows students to write code that controls physical hardware—drones, smart sensors, and automated robotics arms—in real-time through the local Edge GPU engine.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: How it works step-by-step */}
              <div className="lg:col-span-5 space-y-6 border-l border-black/5 pl-0 lg:pl-8">
                <h4 className="text-xs font-mono font-black text-primary uppercase tracking-[0.2em]">
                  How Does It Work?
                </h4>
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Local Edge Host", desc: "The Bharat AI Engine acts as a central offline server node deployed directly in the school computer lab." },
                    { step: "02", title: "MESH Connection", desc: "Multiple student workstations connect to the server over a high-speed local network with zero lag." },
                    { step: "03", title: "Interactive Experiments", desc: "Students load pre-configured offline labs (SIA chat, vision recognition, drone automation) and execute code." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-mono font-bold text-xs shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h5 className="font-bold text-[#1a1a2e] text-xs uppercase tracking-wide">{item.title}</h5>
                        <p className="text-[#1a1a2e]/50 text-[11px] leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Grid: Importance vs Good News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Column 1: Why Is This Important? */}
            <div className="glass-premium p-8 md:p-10 rounded-[2.5rem] border border-black/5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-mono mb-8">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  Why Is This Important?
                </h3>
                <div className="space-y-6">
                  {[
                    { text: "Future Ready Skills for the 21st Century", icon: "school" },
                    { text: "Builds Confidence, Creativity & Innovation", icon: "person" },
                    { text: "Better Career Opportunities", icon: "trending_up" },
                    { text: "Prepares Students to Compete in a Global World", icon: "public" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <p className="text-sm text-[#1a1a2e]/70 leading-relaxed font-sans mt-1">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Good News for Parents */}
            <div className="glass-premium p-8 md:p-10 rounded-[2.5rem] border border-black/5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold uppercase tracking-widest text-[#1a1a2e] flex items-center gap-2.5 font-mono mb-8">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  Good News for Parents
                </h3>
                <div className="space-y-6">
                  {[
                    { num: "01", text: "Students learning cutting-edge technology at school" },
                    { num: "02", text: "Being ready for the future" },
                    { num: "03", text: "Learning coding, get certification & inspiration from school age" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-mono font-bold text-xs shrink-0">
                        {item.num}
                      </div>
                      <p className="text-sm text-[#1a1a2e]/70 leading-relaxed font-sans mt-1">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
