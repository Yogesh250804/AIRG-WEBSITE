"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Loader2 } from "lucide-react";

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Login Successful (Demo)");
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0F172A] rounded-[2rem] border border-white/5 p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-8 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">AIR G Portal</span>
              </div>
              <h2 className="text-3xl font-heading font-bold mb-2 tracking-tight">Welcome back</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Sign in to access the AIR G ecosystem.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all text-sm placeholder:text-slate-600"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    className="w-full bg-slate-900/60 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all text-sm placeholder:text-slate-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Options row */}
              <div className="flex items-center justify-between text-xs font-medium pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors">
                  <input type="checkbox" className="accent-primary rounded" />
                  Remember me
                </label>
                <button type="button" className="text-primary hover:text-blue-400 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                disabled={isLoading}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-blue-600 shadow-lg shadow-blue-500/10 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Signing in…</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
