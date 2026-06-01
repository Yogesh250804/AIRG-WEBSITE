"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Coffee,
  Zap,
  Heart,
  Star,
  Search,
  Rocket,
  Globe,
  Users
} from "lucide-react";
import Link from "next/link";

const jobs = [
  { title: "Senior AI Curriculum Developer", category: "Education", location: "Bangalore / Remote", type: "Full-time", salary: "₹25L – ₹40L" },
  { title: "Full Stack Engineer (Next.js)", category: "Engineering", location: "Remote", type: "Full-time", salary: "₹18L – ₹30L" },
  { title: "Student Success Manager", category: "Operations", location: "Mumbai", type: "Full-time", salary: "₹12L – ₹18L" },
  { title: "Content Marketing Lead", category: "Marketing", location: "Remote", type: "Full-time", salary: "₹15L – ₹25L" },
  { title: "Mobile App Developer (React Native)", category: "Engineering", location: "Remote", type: "Full-time", salary: "₹20L – ₹35L" },
];

const perks = [
  { icon: Zap, title: "Work with AI", desc: "Access to the latest LLMs and AI tools for your daily work.", gradient: "from-violet-500 to-purple-500" },
  { icon: Heart, title: "Health First", desc: "Comprehensive insurance for you and your dependent family.", gradient: "from-rose-500 to-pink-500" },
  { icon: Coffee, title: "Flexible Work", desc: "Work from anywhere in the world or our modern hubs.", gradient: "from-amber-500 to-orange-500" },
  { icon: Star, title: "Learning Fund", desc: "₹50k annual budget for your own personal growth.", gradient: "from-emerald-500 to-teal-500" },
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[5%] right-[10%] w-[400px] h-[400px] bg-[#EE2C3C]/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-20 text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 bg-[#EE2C3C]/10 text-[#EE2C3C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                We're Hiring
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-[#1a1a2e] tracking-tight leading-[0.95]">
                Build the<br /><span className="text-[#EE2C3C]">Future</span> of Learning.
              </h1>
              <p className="text-lg md:text-xl text-[#1a1a2e]/50 max-w-2xl mx-auto mt-6 leading-relaxed font-light">
                Join a team of visionaries, educators, and engineers working to make quality education free for 100 million people.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Perks */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-20">
          <div className="grid md:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-black/5 hover:shadow-xl hover:border-[#EE2C3C]/20 transition-all group"
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${perk.gradient} flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform`}>
                  <perk.icon className="h-6 w-6" />
                </div>
                <h3 className="font-black text-lg text-[#1a1a2e] mb-2">{perk.title}</h3>
                <p className="text-sm text-[#1a1a2e]/40 leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Job Listings */}
        <section className="bg-[#f8f8fa] py-28">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#1a1a2e] tracking-tight">Open Roles</h2>
                <p className="text-[#1a1a2e]/40 mt-1 font-light">Find your next big challenge.</p>
              </div>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1a2e]/30" />
                <input placeholder="Search roles..." className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-black/5 text-sm focus:outline-none focus:border-[#EE2C3C]/30 transition-colors" />
              </div>
            </div>

            <div className="space-y-4">
              {jobs.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-white p-6 md:p-8 rounded-2xl border border-black/5 hover:border-[#EE2C3C]/20 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#f8f8fa] text-[#1a1a2e]/60 text-[9px] font-black uppercase tracking-widest rounded-full">{job.category}</span>
                      <span className="px-3 py-1 bg-[#EE2C3C]/5 text-[#EE2C3C] text-[9px] font-black uppercase tracking-widest rounded-full">{job.type}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-[#1a1a2e] group-hover:text-[#EE2C3C] transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-[#1a1a2e]/40 font-medium">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Posted 2 days ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="text-[9px] font-black text-[#1a1a2e]/30 uppercase tracking-widest">Salary</p>
                      <p className="text-xl font-black text-[#EE2C3C]">{job.salary}</p>
                    </div>
                    <button className="px-8 py-3 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex items-center gap-2">
                      Apply <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-28">
          <div className="rounded-[3rem] bg-[#1a1a2e] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Not seeing a match?</h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
                We're always looking for exceptional talent. Drop your resume in our talent pool and we'll reach out when the right role opens up.
              </p>
              <Link href="/contact" className="inline-block px-10 py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red">
                Join Talent Pool
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
