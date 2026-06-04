import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { labsData } from "@/data/labs";
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

      {/* Futuristic Header */}
      <header className="relative z-10 w-full bg-white/95 border-b border-black/5">
        <nav className="flex justify-between items-center max-w-[1440px] mx-auto px-6 md:px-20 h-20">
          <Link href="/#hero" className="flex items-center gap-4 group cursor-pointer">
            <div className="flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform duration-300 py-1 select-none">
              <div className="flex flex-col items-center leading-none select-none font-sans">
                <div className="flex items-baseline justify-center gap-1.5 leading-none">
                  <span className="font-serif text-[17px] font-black text-[#EE2C3C] tracking-wide">AIR</span>
                  <span className="font-serif text-[17px] font-black text-[#EE2C3C] tracking-wide">GURUJI</span>
                </div>
                <span className="text-[6.5px] font-sans font-bold text-[#EE2C3C] tracking-[0.05em] mt-0.5 uppercase leading-none">
                  AIR G INNOVATION
                </span>
                <span className="text-[8px] font-sans font-black text-[#1a1a2e] tracking-[0.38em] mt-0.5 uppercase leading-none">
                  INTERNATIONAL
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex gap-10 items-center">
            {['hero', 'learning', 'store', 'labs', 'workshops', 'centres'].map((item) => {
              const labels: Record<string, string> = {
                hero: 'Home',
                learning: 'Learning',
                store: 'Store',
                labs: 'Innovation Labs',
                workshops: 'Workshops',
                centres: 'Global Centres'
              };
              return (
                <Link
                  key={item}
                  href={`/#${item}`}
                  className={`nav-link font-semibold transition-colors text-xs uppercase tracking-widest font-sans ${
                    item === 'labs' ? 'text-[#EE2C3C]' : 'text-[#1a1a2e]/40 hover:text-[#1a1a2e]'
                  }`}
                >
                  {labels[item] || item}
                </Link>
              );
            })}
          </div>

          <Link
            href="/#labs"
            className="px-5 py-2.5 rounded-xl border border-black/5 bg-white/40 backdrop-blur-md hover:border-[#EE2C3C]/50 text-[#1a1a2e]/60 hover:text-[#1a1a2e] transition-all duration-300 flex items-center gap-2 text-xs font-bold uppercase tracking-widest font-mono shadow-sm"
          >
            <span className="material-symbols-outlined text-xs">arrow_back</span>
            Back to Labs
          </Link>
        </nav>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 pt-16 pb-24">
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
            <span className="px-3.5 py-1 bg-[#EE2C3C]/10 rounded-full text-[9px] font-extrabold text-[#EE2C3C] uppercase tracking-widest inline-flex items-center gap-1.5 font-sans">
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
      </div>
    </main>
  );
}
