"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Menu, X, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import AuthModal from "./AuthModal";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthModalOpen, setAuthModalOpen } = useAppContext();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Learning", href: "/#learning" },
    { name: "Store", href: "/#store" },
    { name: "Innovation Labs", href: "/#labs" },
    { name: "Workshops", href: "/#workshops" },
    { name: "Global Centres", href: "/#centres" }
  ];

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-black/5 bg-white/80 backdrop-blur-md shadow-sm">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-20">
          {/* Stacked Graduation Cap Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95">
            <img 
              src="/aig-logo.png" 
              alt="AIR GURUJI International Logo" 
              className="h-14 w-auto object-contain mix-blend-multiply" 
            />
          </Link>

          {/* Desktop Navigation Links (matching premium homepage sections) */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-xs font-semibold text-[#1a1a2e]/40 hover:text-primary transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons (matching homepage style) */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="p-3 rounded-xl border border-black/10 bg-white/40 backdrop-blur-md flex items-center justify-center text-[#1a1a2e]/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <User className="h-4 w-4" />
              </div>
            )}
            {user ? (
              <button 
                onClick={() => logout()}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest glow-red hover:scale-105 transition-all"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="bg-primary text-[#1a1a2e] px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest glow-red hover:scale-105 transition-all"
              >
                Connect Now
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-[#1a1a2e] p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-black/5 bg-white lg:hidden">
            <div className="space-y-1 px-5 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-sm font-semibold text-[#1a1a2e]/60 hover:text-primary uppercase tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Integrate global AuthModal inside subpages header */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
