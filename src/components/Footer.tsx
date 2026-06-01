"use client";

import { motion } from "framer-motion";
import { Globe, Cpu, Network } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-obsidian-base border-t border-glass-border">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col md:flex-row justify-between gap-16">
        <div className="space-y-6">
          <div className="font-heading text-4xl text-primary font-bold tracking-tighter">AIR G</div>
          <p className="max-w-xs font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant leading-relaxed">
            © 2026 AIR G INTERNATIONAL. SECURING THE FUTURE THROUGH INTELLIGENCE.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Globe size={20} />
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Cpu size={20} />
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Network className="w-5 h-5" />
            </a>
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-white">Company</h5>
            <ul className="space-y-2 font-body text-sm text-on-surface-variant">
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/press" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-white">Community</h5>
            <ul className="space-y-2 font-body text-sm text-on-surface-variant">
              <li><a href="/instructor" className="hover:text-primary transition-colors">Become an Instructor</a></li>
              <li><a href="/affiliate" className="hover:text-primary transition-colors">Affiliate Program</a></li>
              <li><a href="/stories" className="hover:text-primary transition-colors">Student Stories</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-white">Support</h5>
            <ul className="space-y-2 font-body text-sm text-on-surface-variant">
              <li><a href="/help" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-glass-border/30 py-8 px-margin-mobile md:px-margin-desktop text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/50">
          TRANSFORMING HUMANITY THROUGH AUTONOMOUS EXCELLENCE.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

