"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AIInfrastructuresB2BPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mocking email submission for now
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0a0a14] selection:bg-primary/20 selection:text-primary overflow-x-hidden text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 relative border-b border-white/5">
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-[#0a0a14] to-[#0a0a14] pointer-events-none" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              B2B Partnerships
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              BUILD A STATE-OF-THE-ART <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff4b5c]">AIR LAB</span> AT YOUR INSTITUTION
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
              Equip your college, university, or corporate campus with an advanced AI and Robotics infrastructure designed to future-proof your students and workforce.
            </p>

            <button 
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary hover:bg-[#ff4b5c] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all glow-red hover:scale-105"
            >
              Get a Proposal
            </button>
          </motion.div>
        </div>
      </div>

      {/* Why Build an AIR Lab */}
      <div className="py-24 bg-[#0d0d1a] relative">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Partner With AIR G?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#ff4b5c] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Future-Proof Curriculum",
                desc: "Integrate Industry 4.0 & 5.0 technologies directly into your educational framework.",
                icon: "school"
              },
              {
                title: "Hands-On R&D",
                desc: "Provide students and employees with real-world, kinetic hardware and AI software.",
                icon: "precision_manufacturing"
              },
              {
                title: "Industry Recognition",
                desc: "Become a verified AIR G Node, connecting your institution to a global tech ecosystem.",
                icon: "public"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Infrastructure Details */}
      <div className="py-24 relative">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Lab Infrastructure</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                We handle the end-to-end setup of your AIR Lab, from hardware procurement to curriculum integration. Our labs are modular and scalable to fit any institution size.
              </p>
              
              <ul className="space-y-6">
                {[
                  "High-Performance Computing Units for AI Training",
                  "Modular Robotics Kits (IoT, Drones, Automation)",
                  "Customized Learning Management System (LMS) Access",
                  "Instructor Training & Certification Programs"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                    </div>
                    <span className="text-lg text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <span className="material-symbols-outlined text-7xl text-white/20">architecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact-form" className="py-24 bg-[#0d0d1a] relative">
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
              <p className="text-white/60">Fill out the form below to request a customized proposal for your institution.</p>
            </div>

            {submitStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="text-white/60">Our team will contact you shortly to discuss your AIR Lab requirements.</p>
                <button 
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 px-6 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60 uppercase tracking-wider">Full Name</label>
                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60 uppercase tracking-wider">Institution / Company</label>
                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="University Name" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60 uppercase tracking-wider">Email Address</label>
                    <input required type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@university.edu" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/60 uppercase tracking-wider">Phone Number</label>
                    <input required type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60 uppercase tracking-wider">Additional Requirements (Optional)</label>
                  <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Tell us about your campus size, student count, or specific technology interests..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-[#ff4b5c] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all glow-red disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Request Proposal"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
