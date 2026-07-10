"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Award, Database, GraduationCap, MapPin, 
  Lightbulb, ChevronRight, ArrowRight
} from "lucide-react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/demo-navbar";

// CountUp Component for premium statistical animations
const CountUp = ({ value, label, subtitle }: { value: number; label: string; subtitle: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 1.5; // seconds
    const end = value;
    if (end === 0) return;
    
    const startTime = performance.now();
    
    const run = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        requestAnimationFrame(run);
      }
    };
    
    requestAnimationFrame(run);
  }, [value, hasStarted]);

  return (
    <div ref={elementRef} className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(238,44,60,0.06)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div>
        <div className="font-headline text-5xl md:text-6xl font-black text-[#1a1a2e] tracking-tighter mb-2 group-hover:text-primary transition-colors duration-300">
          {count}{label.includes("+") ? "+" : ""}
        </div>
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-black mb-1">
          {label.replace("+", "")}
        </div>
        <p className="text-xs sm:text-sm text-[#1a1a2e]/60 font-light leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default function AchievementsPartners() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>("India");
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active country inside list box
  useEffect(() => {
    if (!selectedCountry) return;
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    }
  }, [selectedCountry]);

  const row1 = [
    { name: "SYMBIOSIS", logo: "/logos/symbiosis.png" },
    { name: "Sharjah Research Park", logo: "/logos/sharjah.png" },
    { name: "UNESCO", logo: "/logos/unesco.png" },
    { name: "MIT-ADT", logo: "/logos/mitadt.png", scaleVal: 1.3 }
  ];

  const row2 = [
    { name: "DYP", logo: "/logos/dyp.png", scaleVal: 1.3 },
    { name: "Western University", logo: "/logos/western.png" },
    { name: "Cummins", logo: "/logos/cummins.png", scaleVal: 1.6 },
    { name: "Partner 5", logo: "/logos/left_5.jpg" },
    { name: "Partner 6", logo: "/logos/left_6.jpg", scaleVal: 0.7 },
    { name: "Partner 7", logo: "/logos/left_7.jpg", scaleVal: 0.8 },
    { name: "Varhad Group", logo: "/logos/varhad.jpeg", scaleVal: 1.4 }
  ];

  const countries = [
    { name: "India", code: "in", desc: "National tactical training programs, innovation labs setup, and strategic partnerships with state incubation centers.", reach: "50,000+ students, 25+ labs", details: "Core research and execution hub.", coordinates: "Satara, Pune, Mumbai, Delhi" },
    { name: "Saudi Arabia", code: "sa", desc: "Expanding innovation networks and tactical hubs under leadership nodes to build deep-tech skills.", reach: "Strategic hubs & leadership nodes", details: "Headed by MD Abdulrazaq Chubado.", coordinates: "Riyadh, Jeddah" },
    { name: "Ethiopia", code: "et", desc: "Developing future-ready academic training environments in collaboration with local ministries.", reach: "Academic collaborations & programs", details: "Headed by MD Yeabsira Mekshak.", coordinates: "Addis Ababa" },
    { name: "Nigeria", code: "ng", desc: "Strategic partnership with Kaduna State University to deploy a dedicated on-campus innovation hub.", reach: "Kaduna State University Campus Hub", details: "Empowering university students.", coordinates: "Kaduna" },
    { name: "Kenya", code: "ke", desc: "Establishing deep-tech robotics and AI training structures inside leading academic institutions.", reach: "High-tech school labs & certifications", details: "Spreading practical science.", coordinates: "Nairobi" },
    { name: "Nepal", code: "np", desc: "Integrating advanced STEM and robotics kits into school classrooms to prepare secondary students.", reach: "School integrations & kit support", details: "Practical tech education.", coordinates: "Kathmandu" },
    { name: "Cambodia", code: "kh", desc: "Strategic implementation of Hexobrain programs and custom high-tech laboratory infrastructure.", reach: "Western International School Lab", details: "State-of-the-art classroom tech.", coordinates: "Phnom Penh" }
  ];

  return (
    <main className="min-h-screen bg-white text-[#1a1a2e] relative overflow-hidden font-body selection:bg-primary/20 selection:text-primary">
      {/* GLOWING AMBIENT BACKGROUND BLOB SYSTEM */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[2%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] opacity-80 animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute top-[20%] left-[-15%] w-[700px] h-[700px] bg-primary/4 rounded-full blur-[150px] opacity-75 animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute top-[50%] right-[-20%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] opacity-90 animate-pulse" style={{ animationDuration: "10s" }} />
        <div className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] bg-primary/4 rounded-full blur-[140px]" />
      </div>

      {/* HEADER NAVBAR */}
      <Navbar />

      {/* SECTION 1: HERO */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 pt-32 pb-20 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 space-y-8 relative pl-6 sm:pl-8">
          <div className="absolute left-0 top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
            <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="absolute bottom-0 left-[-4px] w-2 h-2 bg-black/10 rounded-full" />
          </div>


          <h1 className="font-headline tracking-tighter leading-[0.9] uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-[#1a1a2e]">
            Building The <br />
            <span className="text-primary text-glow-red">Future</span> Through <br />
            <span className="text-[#1a1a2e]/30">Partnerships</span>
          </h1>
          <p className="text-sm md:text-lg text-[#1a1a2e]/60 max-w-lg font-light leading-relaxed">
            AIR G International collaborates with governments, universities, industry leaders, innovation ecosystems, and educational institutions worldwide to create future-ready learning environments.
          </p>
        </div>

        {/* Right side stats grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CountUp value={50000} label="Students+" subtitle="Empowered through global tech programs and interactive labs." />
          <CountUp value={7} label="Countries+" subtitle="Active learning programs deployed across multiple continents." />
          <CountUp value={25} label="Labs+" subtitle="State-of-the-art innovation and robotics setups implemented." />
          <CountUp value={50} label="Partners+" subtitle="Academic institutions, state incubation centers, & industry leaders." />
        </div>
      </section>

      {/* PREMIUM GRADIENT DIVIDER LINE */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/20 to-transparent" />
      </div>


      {/* SECTION 3: TRUSTED BY INDUSTRY & ACADEMIA */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto py-24 space-y-16 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto space-y-3 px-6 md:px-20">

          <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
            Trusted By Industry & <span className="text-primary text-glow-red">Academia</span>
          </h2>
          <p className="text-sm md:text-base text-[#1a1a2e]/55 font-light leading-relaxed max-w-2xl mx-auto">
            We work closely with global leaders and state institutions to develop standardized deep tech models.
          </p>
        </div>

        {/* Custom CSS for seamless marquee movement */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marquee-left 30s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marquee-right 30s linear infinite;
          }
        `}} />

        <div className="space-y-8 relative py-4">
          {/* Row 1: Moving Left */}
          <div 
            className="flex overflow-hidden w-full"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
              maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)"
            }}
          >
            <div className="animate-marquee-left gap-6 pr-6">
              {[...row1, ...row1, ...row1].map((partner, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 sm:w-52 sm:h-28 bg-white flex items-center justify-center p-1.5 border border-black/5 shadow-sm rounded-xl sm:rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    style={{ transform: `scale(${partner.scaleVal || 1.18})` }}
                    className="max-w-[95%] max-h-[90%] object-contain transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes(".png")) {
                        target.src = target.src.replace(".png", ".jpeg");
                      } else if (target.src.includes(".jpeg")) {
                        target.src = target.src.replace(".jpeg", ".jpg");
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moving Right */}
          <div 
            className="flex overflow-hidden w-full"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
              maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)"
            }}
          >
            <div className="animate-marquee-right gap-6 pr-6">
              {[...row2, ...row2, ...row2].map((partner, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 sm:w-52 sm:h-28 bg-white flex items-center justify-center p-1.5 border border-black/5 shadow-sm rounded-xl sm:rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    style={{ transform: `scale(${partner.scaleVal || 1.18})` }}
                    className="max-w-[95%] max-h-[90%] object-contain transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes(".png")) {
                        target.src = target.src.replace(".png", ".jpeg");
                      } else if (target.src.includes(".jpeg")) {
                        target.src = target.src.replace(".jpeg", ".jpg");
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM GRADIENT DIVIDER LINE */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/20 to-transparent" />
      </div>

      {/* SECTION 4: STRATEGIC PARTNERSHIPS */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24 space-y-16">
        <div className="relative max-w-3xl space-y-4 pl-6 sm:pl-8">
          <div className="absolute left-0 top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
            <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
            Strategic <span className="text-primary text-glow-red">Partnerships</span>
          </h2>
          <p className="text-sm md:text-base text-[#1a1a2e]/50 font-light leading-relaxed max-w-2xl">
            We architect integration layers with technology, academic, and incubation partners to empower learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Cloud Infrastructure Partner",
              name: "Microsoft Azure",
              desc: "Provides standard cloud technologies, cognitive service nodes, and AI ecosystem infrastructure for our curriculum deployment.",
              icon: Database
            },
            {
              title: "Curriculum & Certification Partner",
              name: "MIT ADT University",
              desc: "Collaborates on deep-tech curriculum design, student credits alignment, and joint academic certifications.",
              icon: GraduationCap
            },
            {
              title: "Innovation Partner",
              name: "Symbiosis TBI",
              desc: "Supports tech incubation, student startup pipelines, hardware accelerator workshops, and research grants.",
              icon: Lightbulb
            },
            {
              title: "Global Education Partner",
              name: "Western University",
              desc: "Enables cross-border knowledge exchange, global tech integration, and international lab setups.",
              icon: Globe
            }
          ].map((item, i) => (
            <div key={i} className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(238,44,60,0.06)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(238,44,60,0.2)] transition-all duration-300">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a1a2e]/40 font-bold block">{item.title}</span>
                  <h3 className="font-headline text-xl font-black text-[#1a1a2e] uppercase tracking-tight">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM GRADIENT DIVIDER LINE */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/20 to-transparent" />
      </div>

      {/* SECTION 5: RECOGNITION & COLLABORATIONS */}
      <section className="relative z-10 w-full bg-[#f8fafc] border-y border-black/5 py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">

            <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
              Recognition & <span className="text-primary text-glow-red">Collaborations</span>
            </h2>
            <p className="text-sm md:text-base text-[#1a1a2e]/55 font-light leading-relaxed max-w-2xl mx-auto">
              Honored and recognized by government departments and international networks for democratizing advanced technical education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ministry of Education Recognition",
                desc: "Appreciated by educational leadership and Hon. Dharmendra Pradhan Ji (Education Minister, India) for scaling technology labs access to tier 2 and tier 3 cities."
              },
              {
                title: "Global Education Collaborations",
                desc: "Cross-border partnerships to introduce standard robotics, drone programming, and IoT kits inside school curricula internationally."
              },
              {
                title: "Innovation Ecosystem Partnerships",
                desc: "Affiliation with state and university incubation centers to deploy prototype building kits, research infrastructure, and certification modules."
              },
              {
                title: "International University Partnerships",
                desc: "Bridging the gap between school innovators and global universities to enable student project evaluations and international mentorship."
              },
              {
                title: "Government Engagements",
                desc: "Working with municipal corporations, schools councils, and central departments to build sustainable future skills laboratories."
              },
              {
                title: "Corporate CSR Partnerships (Aditya Birla Carbon)",
                desc: "Collaboration to deploy state-of-the-art tech labs and hands-on robotics workshops as part of corporate community empowerment programs."
              }
            ].map((item, i) => (
              <div key={i} className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(238,44,60,0.06)] transition-all duration-500 flex flex-col justify-between overflow-hidden bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <h3 className="font-headline text-lg font-black text-[#1a1a2e] uppercase tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM GRADIENT DIVIDER LINE */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/20 to-transparent" />
      </div>

      {/* SECTION 6: SUCCESS STORIES */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24 space-y-16">
        <div className="relative max-w-3xl space-y-4 pl-6 sm:pl-8">
          <div className="absolute left-0 top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
            <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
            Ecosystem <span className="text-primary text-glow-red">Success Stories</span>
          </h2>
          <p className="text-sm md:text-base text-[#1a1a2e]/50 font-light leading-relaxed max-w-2xl">
            Real impact stories from schools, universities, and organizations that successfully integrated AIR G platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Kaduna State University, Nigeria",
              desc: "Kaduna State University, Nigeria, collaborates with us to establish an innovation hub on campus, fostering creativity and technological advancement among students.",
              img: "/extracted-images/kaduna_uni.png?v=1",
              tag: "Nigeria",
              objectPosition: "object-top"
            },
            {
              title: "Ministry Recognition (MoE, India)",
              desc: "Appreciated by the Ministry of Education, India, and Hon. Dharmendra Pradhan Ji (Education Minister, India) for outstanding contribution to technical education.",
              img: "/extracted-images/moe_pradhan.png?v=4",
              tag: "National Recognition",
              objectPosition: "object-center"
            },
            {
              title: "IAIRESCO Global Community",
              desc: "IAIRESCO, a global community, partners with Guruji AIR to spread technology education across the globe, empowering learners worldwide.",
              img: "/extracted-images/iairesco_global.png?v=1",
              tag: "Global Partner",
              objectPosition: "object-top"
            },
            {
              title: "Western International School, Cambodia",
              desc: "Western International School in Cambodia partners with us to set up a state-of-the-art hi-tech lab and integrate Hexobrain products into classrooms, enriching students' learning experiences.",
              img: "/extracted-images/cambodia_school.png?v=1",
              tag: "Cambodia",
              objectPosition: "object-top"
            }
          ].map((story, idx) => (
            <div key={idx} className="group relative glass-premium rounded-[2.5rem] !border-2 !border-[#EE2C3C]/40 hover:!border-[#EE2C3C]/70 hover:shadow-[0_20px_50px_rgba(238,44,60,0.15)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row h-full">
              <div className="relative w-full md:w-1/2 aspect-[16/10] overflow-hidden bg-slate-900 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                <img 
                  src={story.img} 
                  alt={story.title} 
                  className={`w-full h-full object-cover ${story.objectPosition || "object-center"} group-hover:scale-105 transition-transform duration-500`} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400";
                  }}
                />
                <div className="absolute bottom-4 left-6 z-20">
                  <span className="px-2 py-0.5 bg-primary/20 border border-primary/30 rounded text-[8px] font-mono text-white uppercase font-bold tracking-wider">
                    {story.tag}
                  </span>
                </div>
              </div>
              <div className="p-8 w-full md:w-1/2 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-headline text-lg font-black text-[#1a1a2e] uppercase tracking-tight leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
                    {story.desc}
                  </p>
                </div>
                <Link href="/#contact" className="inline-flex items-center gap-1 text-xs font-bold text-[#1a1a2e]/80 hover:text-primary transition-colors group-hover:translate-x-1 duration-300">
                  <span>Learn More</span>
                  <ChevronRight size={14} className="mt-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM GRADIENT DIVIDER LINE */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/20 to-transparent" />
      </div>

      {/* SECTION 7: GLOBAL PRESENCE */}
      <section className="relative z-10 w-full bg-[#f8fafc] border-y border-black/5 py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">

            <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
              Global Hubs & <span className="text-primary text-glow-red">Presence</span>
            </h2>
            <p className="text-sm md:text-base text-[#1a1a2e]/55 font-light leading-relaxed max-w-2xl mx-auto">
              Click on any country node to inspect program reach, strategic leaders, and institutional partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             {/* Countries List inside a Cool Designed Box */}
             <div 
               className="lg:col-span-4 glass-premium rounded-[3rem] p-6 !border-2 !border-[#EE2C3C]/30 shadow-xl relative overflow-hidden bg-white/70 flex flex-col h-[520px]"
             >
               {/* Header Box */}
               <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5 shrink-0">
                 <div className="flex items-center gap-2">
                   <span className="relative flex h-2.5 w-2.5">
                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                   </span>
                   <span className="font-headline font-black text-xs uppercase tracking-widest text-[#1a1a2e]/60">Select Hub</span>
                 </div>
                 <span className="font-mono text-[9px] text-primary font-black px-2 py-0.5 bg-primary/15 rounded-full border-2 border-primary/40">7 STATIONS</span>
               </div>

               {/* Scrolling Container */}
               <div 
                 ref={listRef} 
                 className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar scroll-smooth"
               >
                 {countries.map((country) => {
                   const isActive = selectedCountry === country.name;
                   return (
                     <button
                       key={country.name}
                       data-active={isActive ? "true" : "false"}
                       onClick={() => setSelectedCountry(country.name)}
                       className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group/btn relative overflow-hidden ${
                         isActive
                           ? "bg-[#1a1a2e] !border-primary text-white-force shadow-lg shadow-primary/10 translate-x-1"
                           : "glass-premium border-black/5 text-[#1a1a2e] hover:border-primary/30 hover:bg-slate-50"
                       }`}
                     >
                       {isActive && (
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary animate-pulse" />
                       )}
                       <div>
                          <h4 className={`font-headline font-black uppercase text-sm tracking-wide flex items-center gap-2.5 ${
                            isActive ? "text-white-force" : "text-[#1a1a2e]"
                          }`}>
                            <img 
                              src={`https://flagcdn.com/w40/${country.code}.png`} 
                              alt={country.name} 
                              className="w-5.5 h-4 object-cover rounded-sm border border-white/10 shadow-sm shrink-0 select-none pointer-events-none"
                            />
                            <span>{country.name}</span>
                          </h4>
                         <span className={`text-[10px] font-mono tracking-wider uppercase block mt-0.5 ${isActive ? "text-primary" : "text-[#1a1a2e]/40"}`}>
                           {country.reach.split(", ")[0]}
                         </span>
                       </div>
                       <ChevronRight 
                         size={16} 
                         className={`transition-transform duration-300 ${
                           isActive 
                             ? "text-primary translate-x-0.5" 
                             : "text-[#1a1a2e]/30 group-hover/btn:translate-x-0.5 group-hover/btn:text-primary/70"
                         }`} 
                       />
                     </button>
                   );
                 })}
               </div>
             </div>

            {/* Interactive Details Card */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {selectedCountry && (() => {
                  const current = countries.find(c => c.name === selectedCountry);
                  if (!current) return null;
                  return (
                    <motion.div
                      key={current.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="glass-premium p-10 rounded-[3rem] !border-2 !border-[#EE2C3C]/40 shadow-xl space-y-8 min-h-[420px] flex flex-col justify-between bg-white"
                    >
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-black/5 pb-6">
                          <div className="flex items-center gap-3">
                            <MapPin className="text-primary w-6 h-6" />
                             <h3 className="font-headline text-3xl font-black text-[#1a1a2e] uppercase tracking-tight flex items-center gap-3">
                               <img 
                                 src={`https://flagcdn.com/w80/${current.code}.png`} 
                                 alt={current.name} 
                                 className="w-9 h-6 object-cover rounded border border-black/10 shadow-sm shrink-0 select-none pointer-events-none"
                               />
                               <span>{current.name}</span>
                             </h3>
                          </div>
                           <span className="px-3 py-1 bg-primary/15 border-2 border-primary/40 text-primary rounded-full text-xs font-mono font-black tracking-wider uppercase">
                             Active Region
                           </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 pt-2">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#1a1a2e]/40 uppercase tracking-widest block font-bold">Initiatives Description:</span>
                            <p className="text-sm text-[#1a1a2e]/75 font-light leading-relaxed">{current.desc}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#1a1a2e]/40 uppercase tracking-widest block font-bold">Scope & Reach:</span>
                            <p className="text-sm text-primary font-bold">{current.reach}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 border-t border-black/5 pt-6">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#1a1a2e]/40 uppercase tracking-widest block font-bold">Presence Coordinators:</span>
                            <p className="text-sm text-[#1a1a2e]/70 font-semibold">{current.details}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-[#1a1a2e]/40 uppercase tracking-widest block font-bold">Active Cities / Nodes:</span>
                            <p className="text-sm text-[#1a1a2e]/70 font-semibold">{current.coordinates}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Link href="/#contact" className="group px-6 py-3 bg-[#1a1a2e] hover:bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center gap-2" style={{ color: '#ffffff' }}>
                          <span>Initiate Program Here</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM GRADIENT DIVIDER LINE */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/20 to-transparent" />
      </div>


      {/* SECTION 8: WHY ORGANIZATIONS WORK WITH AIR G */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">

          <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
            Why Organizations <span className="text-primary text-glow-red">Work With Us</span>
          </h2>
          <p className="text-sm md:text-base text-[#1a1a2e]/55 font-light leading-relaxed max-w-2xl mx-auto">
            Our end-to-end framework bridges the gap between hardware infrastructure, industrial certifications, and future career readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Future Skills Infrastructure",
              desc: "Deploying high-precision kits for artificial intelligence, robotics, IoT, drones, and emerging deep-tech technologies."
            },
            {
              title: "End-To-End Implementation",
              desc: "Providing complete physical lab blueprint design, setup installation, educator training, and curriculum deployment."
            },
            {
              title: "Global Network",
              desc: "Instant access to a cross-border ecosystem of international schools, universities, ministries, and global tech mentors."
            },
            {
              title: "Industry Integration",
              desc: "Project-based learning curricula aligned directly with corporate hiring paths and industrial standards."
            },
            {
              title: "Teacher Enablement",
              desc: "Intensive faculty development courses, teacher training manuals, and government-approved certifications."
            },
            {
              title: "Innovation Ecosystem",
              desc: "Fostering research papers support, regional robotic hackathons, deep tech competitions, and incubation modules."
            }
          ].map((item, i) => (
            <div key={i} className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(238,44,60,0.06)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <h3 className="font-headline text-lg font-black text-[#1a1a2e] uppercase tracking-tight">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM GRADIENT DIVIDER LINE */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/20 to-transparent" />
      </div>

      {/* SECTION 9: BECOME A PARTNER */}
      <section id="become-partner" className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24">
        <div className="relative glass-premium rounded-[3.5rem] border border-black/5 overflow-hidden p-8 md:p-16 text-center space-y-8">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #EE2C3C 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          

          <h2 className="font-headline text-4xl md:text-6xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none">
            Let's Build The Future <br />
            <span className="text-primary text-glow-red">Together</span>
          </h2>
          <p className="text-sm md:text-lg text-[#1a1a2e]/55 font-light leading-relaxed max-w-2xl mx-auto">
            AIR G collaborates with educational institutions, governments, technology companies, innovation hubs, and global organizations to create future-ready learning ecosystems.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/#contact" className="group relative px-6 py-4 sm:px-10 sm:py-5 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-red" style={{ color: '#ffffff' }}>
              <span className="relative z-10 flex items-center gap-2">Become A Partner</span>
            </Link>
            <Link href="/#contact" className="group px-6 py-4 sm:px-10 sm:py-5 glass-premium text-[#1a1a2e]/60 font-bold text-xs uppercase tracking-widest rounded-lg border border-black/5 hover:border-black/20 transition-all duration-300 flex items-center gap-2">
              <span>Talk To Our Team</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
