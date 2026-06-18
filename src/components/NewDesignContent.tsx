"use client";
// Force recompile: 3
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const InteractiveIndiaMap = dynamic(() => import("./InteractiveIndiaMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-primary font-mono text-xs uppercase tracking-widest animate-pulse">
      Loading India Map...
    </div>
  ),
});

const InteractiveWorldMap = dynamic(() => import("./InteractiveWorldMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-primary font-mono text-xs uppercase tracking-widest animate-pulse">
      Loading World Map...
    </div>
  ),
});
import { workshopsData } from "@/data/workshops";
import { labsData } from "@/data/labs";
import { useAppContext } from "@/context/AppContext";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/auth-context";
import CertificateModal from "./CertificateModal";
import ProductDetailModal from "./ProductDetailModal";
import { CheckoutModal } from "./store/CheckoutModal";
import { Courses } from "./Courses";
import ImageSlider from "./ImageSlider";
import AppleCarousel from "./AppleCarousel";


// Premium SVG Logo - Recreated for "AIR GURUJI International" (Vertical Centered Layout)
const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer py-1 select-none">
    <img 
      src="/aig-logo.png" 
      alt="AIR GURUJI International Logo" 
      className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply" 
    />
  </div>
);


// Optimized 3D Brand Emblem Component (Declared globally to prevent React unmounting lag)
const ButterySmoothA = ({ 
  isTransitioning, 
  currentLetter = "A"
}: { 
  isTransitioning: boolean; 
  currentLetter?: string; 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const layers = isTransitioning ? 2 : (isMobile ? 4 : 12);
  
  return (
    <div 
      className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] flex items-center justify-center scale-95 sm:scale-105 md:scale-110" 
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* 3D Layered Depth Stack */}
      {[...Array(layers)].map((_, i) => {
        const isFront = i === layers - 1;
        const isBack = i === 0;
        const isFace = isFront || isBack;
        const depthZ = i * (isMobile ? 8 : 3.5) - (layers * (isMobile ? 4 : 1.75));
        
        return (
          <div 
            key={i} 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ 
              transform: `translateZ(${depthZ}px)`, 
              transformStyle: 'preserve-3d',
              opacity: isFace ? 1 : 0.6
            }}
          >
            <svg viewBox="0 0 100 100" className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] overflow-visible">
              <defs>
                <linearGradient id={`grad-hex-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5C6C" />
                  <stop offset="100%" stopColor="#E11B22" />
                </linearGradient>
                <linearGradient id={`grad-a-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.25)" />
                </linearGradient>
                {isFace && (
                  <filter id={`neon-glow-${i}`} colorInterpolationFilters="sRGB">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                )}
              </defs>
              
              {/* Solid Hexagon Core */}
              <polygon 
                points="50,22 75,36 75,64 50,78 25,64 25,36" 
                fill={isFace ? "rgba(10, 22, 40, 0.94)" : "rgba(225, 27, 34, 0.8)"}
                stroke={isFace ? `url(#grad-hex-${i})` : "transparent"}
                strokeWidth={isFace ? "2.5" : "0"}
                strokeLinejoin="round"
                style={{ filter: isFace ? `url(#neon-glow-${i})` : 'none' }}
                className={isFace ? "backdrop-blur-md" : ""}
              />

              {/* Stylized Geometric Letter inside Hexagon */}
              <text
                className="emblem-text-layer"
                x="50"
                y="51"
                dominantBaseline="central"
                textAnchor="middle"
                fill={isFace ? `url(#grad-a-${i})` : "rgba(255, 255, 255, 0.25)"}
                fontSize="34"
                fontWeight="900"
                fontFamily="var(--font-headline)"
                opacity="0.9"
              >
                {currentLetter}
              </text>
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default function NewDesignContent() {
  const { isAuthModalOpen, setAuthModalOpen, addNotification } = useAppContext();
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [activeFace, setActiveFace] = useState("hero");
  const [previousFace, setPreviousFace] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showCallButton, setShowCallButton] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string; img: string; tag: string; desc: string } | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Continuous rotation & letter cycling states
  const continuousYRef = useRef(0);
  const lastIndexRef = useRef(0);
  const lastCycleRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const letters = ["A", "I", "R", "G"];
  
  const [activeNetwork, setActiveNetwork] = useState<"india" | "global">("india");
  const [selectedGlobalHub, setSelectedGlobalHub] = useState<any>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

   // Cart state
  const [cart, setCart] = useState<{ name: string; price: string; img: string; tag: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ name: string; price: number | string; category: string; image?: string } | null>(null);
  const [showClickbaitPromo, setShowClickbaitPromo] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [shippingDetails, setShippingDetails] = useState({ name: '', email: '', address: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [orders, setOrders] = useState<{ id: string; date: string; items: { name: string; price: string; quantity: number }[]; total: number; status: string }[]>([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{ enrolled: boolean; pending: boolean; rejected: boolean; pendingDetails: any; rejectedDetails: any }>({
    enrolled: false,
    pending: false,
    rejected: false,
    pendingDetails: null,
    rejectedDetails: null
  });

  const fetchPaymentStatus = () => {
    if (user) {
      fetch("/api/payment/status")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setPaymentStatus({
              enrolled: data.enrolled,
              pending: data.pending,
              rejected: data.rejected || false,
              pendingDetails: data.pendingDetails,
              rejectedDetails: data.rejectedDetails || null
            });
          }
        })
        .catch((err) => console.error("Error loading payment status:", err));
    } else {
      setPaymentStatus({ enrolled: false, pending: false, rejected: false, pendingDetails: null, rejectedDetails: null });
    }
  };

  useEffect(() => {
    fetchPaymentStatus();
  }, [user]);

  const [userProfile, setUserProfile] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@airg.com",
    role: "Elite Developer",
    memberSince: "May 2026",
    walletBalance: 0,
    node: "Satara Mesh #04"
  });

  // Top-Up Payment Gateway States
  const [isTopUpPaymentOpen, setIsTopUpPaymentOpen] = useState(false);
  const [pendingTopUpAmount, setPendingTopUpAmount] = useState(0);
  const [topUpPaymentStep, setTopUpPaymentStep] = useState<'options' | 'processing' | 'success'>('options');
  const [topUpPaymentMethod, setTopUpPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [topUpUtr, setTopUpUtr] = useState("");
  const [isTopUpVerifying, setIsTopUpVerifying] = useState(false);
  const [topUpUtrError, setTopUpUtrError] = useState("");

  // Sync user info from auth state
  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.displayName || (user.email ? user.email.split("@")[0] : "User"),
        email: user.email || "",
        role: user.role || "Student",
        memberSince: user.metadata?.creationTime 
          ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : "June 2026",
        walletBalance: user.walletBalance ?? 0,
        node: "Satara Mesh #04"
      });
    } else {
      setUserProfile({
        name: "Rahul Sharma",
        email: "rahul.sharma@airg.com",
        role: "Elite Developer",
        memberSince: "May 2026",
        walletBalance: 0,
        node: "Satara Mesh #04"
      });
    }
  }, [user]);

  // Load orders dynamically based on current user session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ordersKey = user ? `aig_orders_${user.email}` : "aig_orders";
      const savedOrders = localStorage.getItem(ordersKey);
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (e) {
          console.error(e);
        }
      } else {
        setOrders([]);
      }
    }
  }, [user]);

  // Load transactions dynamically based on current user session
  const [transactions, setTransactions] = useState<{ id: string; date: string; amount: number; type: 'credit' | 'debit'; description: string; method: string; }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const txKey = user ? `aig_transactions_${user.email}` : "aig_transactions";
      const savedTx = localStorage.getItem(txKey);
      if (savedTx) {
        try {
          setTransactions(JSON.parse(savedTx));
        } catch (e) {
          console.error(e);
        }
      } else {
        setTransactions([]);
      }
    }
  }, [user]);

  const recordTransaction = (amount: number, type: 'credit' | 'debit', description: string, method: string) => {
    const newTx = {
      id: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      amount,
      type,
      description,
      method
    };
    setTransactions(prev => {
      const updated = [newTx, ...prev];
      const txKey = user ? `aig_transactions_${user.email}` : "aig_transactions";
      localStorage.setItem(txKey, JSON.stringify(updated));
      return updated;
    });
  };

  const handleLogout = async () => {
    await logout();
    addNotification("Logged out successfully.");
  };

  // Competition Registration States
  const [selectedComp, setSelectedComp] = useState<string | null>(null);
  const [compName, setCompName] = useState("");
  const [compEmail, setCompEmail] = useState("");
  const [compInst, setCompInst] = useState("");
  const [isSubmittingComp, setIsSubmittingComp] = useState(false);

  const getUpiDeepLink = (app?: string) => {
    const MERCHANT_UPI = "9860779172-5@ybl";
    const MERCHANT_NAME = "AIR G International";
    const params = `pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}&cu=INR`;
    const base = `upi://pay?${params}`;
    if (!app) return base;
    
    const isIOS = typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isIOS) {
      switch(app) {
        case 'GPay': return `gpay://upi/pay?${params}`;
        case 'PhonePe': return `phonepe://pay?${params}`;
        case 'Paytm': return `paytmmp://pay?${params}`;
        case 'BHIM': return `bhim://upi/pay?${params}`;
        default: return base;
      }
    }

    const intentParams = `pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}&cu=INR`;
    switch(app) {
      case 'GPay': 
        return `intent://pay?${intentParams}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;S.browser_fallback_url=${encodeURIComponent(base)};end`;
      case 'PhonePe': 
        return `intent://pay?${intentParams}#Intent;scheme=upi;package=com.phonepe.app;S.browser_fallback_url=${encodeURIComponent(base)};end`;
      case 'Paytm': 
        return `intent://pay?${intentParams}#Intent;scheme=upi;package=net.one97.paytm;S.browser_fallback_url=${encodeURIComponent(base)};end`;
      default: 
        return base;
    }
  };

  const handleVerifyTopUpUtr = async () => {
    if (!/^\d{12}$/.test(topUpUtr)) {
      setTopUpUtrError("Please enter a valid 12-digit UTR number.");
      return;
    }
    setTopUpUtrError("");
    setIsTopUpVerifying(true);

    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utr: topUpUtr,
          amount: pendingTopUpAmount,
          type: "recharge"
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addNotification(data.message || "Payment verified successfully!");
        recordTransaction(pendingTopUpAmount, 'credit', 'Wallet Top-Up', 'UPI');
        setUserProfile(prev => ({
          ...prev,
          walletBalance: data.walletBalance
        }));
        setTopUpPaymentStep('success');
        setTimeout(() => {
          setIsTopUpPaymentOpen(false);
          setTopUpUtr("");
          setTopUpUtrError("");
          setTopUpPaymentStep('options');
        }, 1800);
      } else {
        setTopUpUtrError(data.message || data.error || "Payment verification failed.");
      }
    } catch (err) {
      console.error(err);
      setTopUpUtrError("Error connecting to server. Please try again.");
    } finally {
      setIsTopUpVerifying(false);
    }
  };

  const topUpWallet = async (amount: number) => {
    recordTransaction(amount, 'credit', 'Wallet Top-Up', topUpPaymentMethod.toUpperCase());
    if (user) {
      try {
        const res = await fetch("/api/auth/topup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount })
        });
        if (res.ok) {
          const data = await res.json();
          setUserProfile(prev => ({
            ...prev,
            walletBalance: data.walletBalance
          }));
        }
      } catch (err) {
        console.error("Failed to update wallet balance", err);
      }
    } else {
      setUserProfile(prev => ({
        ...prev,
        walletBalance: prev.walletBalance + amount
      }));
    }
  };

  const addToCart = (product: { name: string; price: string; img: string; tag: string }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.name === name) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const numPrice = parseInt(item.price.replace(/[^\d]/g, ""), 10);
      return total + numPrice * item.quantity;
    }, 0);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const idleY = useMotionValue(0);
  const letterOpacity = useMotionValue(0.9);
  const xSpring = useSpring(x, { stiffness: 200, damping: 25, restDelta: 0.001 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 25, restDelta: 0.001 });
  
  const activeFaceRef = useRef(activeFace);

  useEffect(() => {
    if (activeFace) {
      setPreviousFace(activeFaceRef.current);
      activeFaceRef.current = activeFace;
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 850);
      return () => clearTimeout(timer);
    }
  }, [activeFace]);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastRotation = useRef({ x: 0, y: 0 });

  // Combined Interaction & Idle Logic
  useEffect(() => {
    let animationFrame: number;
    
    const animate = () => {
      // Continuous Y spin for auto-rotate when NOT dragging
      if (!isDragging.current) {
        const t = (Date.now() - startTimeRef.current) * 0.001; // Elapsed time in seconds starting from 0
        const T_cycle = 2.9167;          // Total time per letter (2.25s pause + 0.67s spin) - Sped up by 20%
        const T_spin = 0.6667;           // Spin transition duration - Sped up by 20%
        const T_pause = T_cycle - T_spin;
        
        const local_t = t % T_cycle;
        const current_letter_index = Math.floor(t / T_cycle);
        
        let rotationAngle = 0;
        
        if (local_t < T_pause) {
          // Keep flat-facing during pause (multiples of 180)
          rotationAngle = current_letter_index * 180;
        } else {
          // Smooth ease-in-out spin transition
          const progress = (local_t - T_pause) / T_spin;
          const smooth_progress = (1 - Math.cos(progress * Math.PI)) / 2;
          rotationAngle = (current_letter_index + smooth_progress) * 180;
        }
        
        idleY.set(rotationAngle);
        
        const prev = rotationRef.current;
        const targetX = 0;
        const targetY = 0;
        
        // Snappy spring alignment and float wave
        const baseLerpX = prev.x + (targetX - prev.x) * 0.08;
        const baseLerpY = prev.y + (targetY - prev.y) * 0.08;
        
        const time = Date.now() * 0.0015;
        const floatX = Math.sin(time * 1.2) * 3;
        const floatY = Math.cos(time) * 3;
        
        const nextX = baseLerpX + (floatX - (baseLerpX - targetX)) * 0.1;
        const nextY = baseLerpY + (floatY - (baseLerpY - targetY)) * 0.1;
        
        rotationRef.current = { x: nextX, y: nextY };
        x.set(nextX);
        y.set(nextY);
      }

      // Calculate letter cycle: uses combined angle of auto-spin (idleY) and manual spin (y)
      // Offsetting/rounding to 180 ensures the letter changes exactly halfway through the rotation (90 degrees, edge-on)
      const currentAngle = idleY.get() + y.get();
      const cycle = Math.round(currentAngle / 180);
      
      if (cycle !== lastCycleRef.current) {
        lastCycleRef.current = cycle;
        const index = ((cycle % letters.length) + letters.length) % letters.length;
        
        // Direct DOM update for instant frame-perfect text swap
        const elements = document.querySelectorAll(".emblem-text-layer");
        elements.forEach((el) => {
          el.textContent = letters[index];
          if (cycle % 2 !== 0) {
            el.setAttribute("transform", "translate(100, 0) scale(-1, 1)");
          } else {
            el.removeAttribute("transform");
          }
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      const nextX = lastRotation.current.x - deltaY * 0.5;
      const nextY = lastRotation.current.y + deltaX * 0.5;

      rotationRef.current = { x: nextX, y: nextY };
      x.set(nextX);
      y.set(nextY);
    };

    const handleWindowMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = 'default';
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [x, y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    lastRotation.current = { ...rotationRef.current };
    document.body.style.cursor = 'grabbing';
  };

  const navigateTo = (target: string) => {
    if (target !== "hero" && !user) {
      addNotification("Please login to access this section.");
      setAuthModalOpen(true);
      return;
    }
    setActiveFace(target);
    if (target === "centres") {
      setActiveNetwork("india");
    }
    if (typeof window !== "undefined") {
      window.location.hash = target;
    }
    const faceElement = document.getElementById(`${target}-face`);
    if (faceElement) {
      faceElement.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (loading) return;
    
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["hero", "labs", "centres", "workshops", "learning", "store"].includes(hash)) {
        if (hash !== "hero" && !user) {
          addNotification("Please login to access this section.");
          setAuthModalOpen(true);
          setActiveFace("hero");
          window.location.hash = "hero";
          return;
        }
        setActiveFace(hash);
        if (hash === "centres") {
          setActiveNetwork("india");
        }
      } else {
        setActiveFace("hero");
      }
    };

    handleHashChange();
    setIsMounted(true);
    
    // Automatically trigger server-side copying of generated assets on mount
    fetch("/api/copy-founder-image").catch(() => {});
    
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 50);

    const callBtnTimer = setTimeout(() => {
      setShowCallButton(true);
    }, 1300);

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearTimeout(timer);
      clearTimeout(callBtnTimer);
    };
  }, [user, loading]);

  const getCubeClass = () => {
    switch (activeFace) {
      case "hero": return "show-hero";
      case "labs": return "show-labs";
      case "centres": return "show-centres";
      case "workshops": return "show-workshops";
      case "store": return "show-store";
      case "learning": return "show-learning";
      default: return "show-hero";
    }
  };

  const getFaceClass = (faceName: string) => {
    const isActive = activeFace === faceName;
    const isPrevious = previousFace === faceName;
    if (isActive) return "active pointer-events-auto opacity-100 visible";
    if (isTransitioning && isPrevious) return "pointer-events-none opacity-40 visible";
    return "pointer-events-none opacity-0 invisible";
  };

  const labs = labsData;

  const fieldRecords = workshopsData;



  return (
    <div className="font-body bg-white text-[#1a1a2e] overflow-hidden min-h-screen select-none relative">
      <Preloader onComplete={() => {
        setIsMounted(true);
        setShowCallButton(true);
      }} />
      <header className="fixed top-0 w-full z-[100] glass-premium border-b border-black/5">
        <nav className="flex justify-between items-center max-w-[1440px] mx-auto px-5 h-20 md:px-20">
          <div onClick={() => navigateTo('hero')} className="mr-8 xl:mr-16 shrink-0">
            <Logo />
          </div>
          <div className="hidden lg:flex gap-6 xl:gap-8 items-center mr-auto">
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
                <button
                  key={item}
                  className={`nav-link font-semibold transition-colors text-xs uppercase tracking-widest ${activeFace === item ? 'text-primary' : 'text-[#1a1a2e]/40 hover:text-[#1a1a2e]'
                    }`}
                  onClick={() => navigateTo(item)}
                >
                  {labels[item] || item}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            {/* Shopping Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-xl border border-black/10 bg-white/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex items-center justify-center text-[#1a1a2e]/80 hover:text-primary shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(238,44,60,0.15)] group"
            >
              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-300">shopping_bag</span>
              {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            {/* User Profile Button */}
            <button 
              onClick={() => {
                if (user) {
                  setIsProfileOpen(true);
                } else {
                  setAuthModalOpen(true);
                }
              }}
              className="relative p-3 rounded-xl border border-black/10 bg-white/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex items-center justify-center text-[#1a1a2e]/80 hover:text-primary shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(238,44,60,0.15)] group"
            >
              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-300">person</span>
            </button>
            {/* Social Media Links */}
            <div className="hidden xl:flex items-center gap-2 border-l border-black/10 pl-3 mr-1">
              <a href="https://youtube.com/@airguruji?si=y_hiDFi8YpiePL-v" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#FF0000] hover:bg-black/5 transition-all flex items-center justify-center hover:scale-115" title="YouTube">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/gurujiair?igsh=bW8wNW5pcnIwcDU=" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#E1306C] hover:bg-black/5 transition-all flex items-center justify-center hover:scale-115" title="Instagram">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="https://wa.me/919860779172" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#25D366] hover:bg-black/5 transition-all flex items-center justify-center hover:scale-115" title="WhatsApp">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/guruji-air/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#0077B5] hover:bg-black/5 transition-all flex items-center justify-center hover:scale-115" title="LinkedIn">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
            {user ? (
              <button 
                onClick={() => handleLogout()}
                className="hidden md:block bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest glow-red hover:scale-105 transition-all"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="hidden md:block bg-primary text-[#1a1a2e] px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest glow-red hover:scale-105 transition-all"
              >
                Login
              </button>
            )}
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl border border-black/10 bg-white/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex items-center justify-center text-[#1a1a2e]/80 hover:text-primary shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              <span className="material-symbols-outlined text-lg">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-20 z-[99] lg:hidden bg-white/95 backdrop-blur-lg border-b border-black/5 shadow-lg p-6 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
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
                    <button
                      key={item}
                      className={`text-left py-2 font-bold text-sm uppercase tracking-widest border-b border-black/5 transition-colors ${
                        activeFace === item ? 'text-primary' : 'text-[#1a1a2e]/60 hover:text-[#1a1a2e]'
                      }`}
                      onClick={() => {
                        navigateTo(item);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {labels[item] || item}
                    </button>
                  );
                })}
              </div>
              
              {user ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest glow-red text-center"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary text-[#1a1a2e] py-4 rounded-xl font-bold text-xs uppercase tracking-widest glow-red text-center"
                >
                  Login
                </button>
              )}

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-black/5">
                <a href="https://youtube.com/@airguruji?si=y_hiDFi8YpiePL-v" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:scale-110 transition-transform" title="YouTube">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/gurujiair?igsh=bW8wNW5pcnIwcDU=" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:scale-110 transition-transform" title="Instagram">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
                <a href="https://wa.me/919860779172" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-110 transition-transform" title="WhatsApp">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/guruji-air/" target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:scale-110 transition-transform" title="LinkedIn">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="scene pt-10 opacity-100">
        <div className={`cube-container ${getCubeClass()} ${isInitialLoad ? 'no-transition' : ''} ${!isTransitioning && !isInitialLoad && activeFace ? 'flat-view' : ''} ${isTransitioning ? 'is-rotating' : ''}`}>
          {/* FACE 1: HERO */}
          <section className={`cube-face ${getFaceClass('hero')} flex flex-col items-center overflow-y-auto custom-scrollbar`} id="hero-face">
            <div className="relative w-full flex flex-col pt-6 pb-20">
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Glowing red ambient light blobs to eliminate emptiness */}
                <div className="absolute top-[2%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] opacity-80 animate-pulse" style={{ animationDuration: "8s" }} />
                <div className="absolute top-[20%] left-[-15%] w-[700px] h-[700px] bg-[#FF5C6C]/6 rounded-full blur-[150px] opacity-75 animate-pulse" style={{ animationDuration: "12s" }} />
                <div className="absolute top-[45%] right-[-20%] w-[800px] h-[800px] bg-primary/8 rounded-full blur-[180px] opacity-90 animate-pulse" style={{ animationDuration: "10s" }} />
                <div className="absolute top-[70%] left-[-10%] w-[600px] h-[600px] bg-[#EE2C3C]/6 rounded-full blur-[140px]" />
                <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "9s" }} />
              </div>
              <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-4 pb-16">
                <div className="space-y-8 relative">
                  {/* High-Tech UI Accents */}
                  <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                    <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="absolute bottom-0 left-[-4px] w-2 h-2 bg-white/20 rounded-full" />
                  </div>


                  <h1 className="font-headline tracking-tighter leading-[0.85] uppercase">
                    <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1a1a2e]">
                      Empowering
                    </span>
                    <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#EE2C3C] whitespace-nowrap">
                      The Next Gen
                    </span>
                    <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1a1a2e]/30">
                      Innovators
                    </span>
                  </h1>
                  
                  <p className="text-sm md:text-lg text-[#1a1a2e]/40 max-w-lg font-light leading-relaxed">
                    Equipping students across India with hands-on robotics, AI, and deep-tech skills through our network of innovation labs and tactical training programs.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                    <button 
                      onClick={() => {
                        if (!user) {
                          addNotification("Please login to access this section.");
                          setAuthModalOpen(true);
                        } else {
                          router.push("/achievements-partners");
                        }
                      }}
                      className="group relative px-6 py-4 sm:px-10 sm:py-5 bg-primary text-[#1a1a2e] font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-red inline-flex items-center"
                    >
                      <span className="relative z-10 flex items-center gap-3">Explore Our Impact <span className="material-symbols-outlined text-sm">bolt</span></span>
                    </button>
                    <button className="group px-6 py-4 sm:px-10 sm:py-5 glass-premium text-[#1a1a2e]/60 font-bold text-xs uppercase tracking-widest rounded-lg border border-black/5 hover:border-black/20 transition-all duration-300 flex items-center gap-2" onClick={() => navigateTo('workshops')}>
                      <span>View Workshops</span>
                      <span className="material-symbols-outlined text-sm">play_circle</span>
                    </button>
                  </div>

                  <div className="flex gap-6 sm:gap-12 pt-6">
                    <div>
                      <div className="text-2xl sm:text-3xl font-headline font-black text-[#1a1a2e] tracking-tighter">30000<span className="text-primary">+</span></div>
                      <div className="text-[8px] sm:text-[9px] text-[#1a1a2e]/20 font-bold uppercase tracking-[0.3em] mt-1">Students Impacted</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-headline font-black text-[#1a1a2e] tracking-tighter">{labs.length}</div>
                      <div className="text-[8px] sm:text-[9px] text-[#1a1a2e]/20 font-bold uppercase tracking-[0.3em] mt-1">Active Labs</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-headline font-black text-[#1a1a2e] tracking-tighter">3</div>
                      <div className="text-[8px] sm:text-[9px] text-[#1a1a2e]/20 font-bold uppercase tracking-[0.3em] mt-1">States Covered</div>
                    </div>
                  </div>
                </div>

                 <div className="hidden lg:flex justify-center items-center relative h-[560px] w-full rounded-[3.5rem] overflow-hidden translate-x-12 bg-white border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                  {/* Rich layered background */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a1a2e 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  
                  {/* No dynamic ambient glows - pure white background */}

                    {/* Honeycomb Hexagonal Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
                    backgroundImage: `radial-gradient(circle, #EE2C3C 1px, transparent 1px), 
                                      linear-gradient(to right, rgba(26,26,46,0.12) 1px, transparent 1px), 
                                      linear-gradient(to bottom, rgba(26,26,46,0.12) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px, 48px 48px, 48px 48px'
                  }}></div>

                  {/* Corner Diagnostic Overlays (HUD readouts) */}
                  <div className="absolute top-8 left-8 font-mono text-[8px] text-[#1a1a2e]/40 pointer-events-none space-y-1 select-none">
                    <div>SYSTEM: AIG_GRID_V2.0</div>
                    <div>STATUS: <span className="text-primary font-black animate-pulse">ONLINE</span></div>
                    <div>SECURE NODE: #04_SATARA</div>
                  </div>
                  
                  <div className="absolute top-8 right-8 font-mono text-[8px] text-[#1a1a2e]/40 pointer-events-none text-right select-none">
                    <div>LATENCY: 14ms (MESH)</div>
                    <div>FPS: 60.0 // RENDER: GPU</div>
                    <div className="flex justify-end gap-0.5 mt-1">
                      <span className="w-1.5 h-1 bg-primary/40 rounded-sm"></span>
                      <span className="w-1.5 h-1 bg-primary/40 rounded-sm"></span>
                      <span className="w-1.5 h-1 bg-primary/40 rounded-sm"></span>
                      <span className="w-1.5 h-1 bg-primary animate-pulse rounded-sm"></span>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 font-mono text-[8px] text-[#1a1a2e]/40 pointer-events-none select-none">
                    <div>COORD: 17.6805° N, 74.0183° E</div>
                    <div>CORE TEMP: 34.2°C // PASSIVE</div>
                  </div>

                  <div className="absolute bottom-8 right-8 font-mono text-[8px] text-[#1a1a2e]/40 pointer-events-none text-right select-none">
                    <div>AUTHENTICATED ACCESS</div>
                    <div>PACKETS: IN 98.4% // OUT 99.1%</div>
                  </div>

                  {/* Left HUD Vertical Index Scale */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 pointer-events-none select-none opacity-30 font-mono text-[7px] text-[#1a1a2e]/60">
                    <div>[MAX] -</div>
                    <div>080 -</div>
                    <div>060 -</div>
                    <div>040 -</div>
                    <div>020 -</div>
                    <div>[MIN] -</div>
                  </div>

                  {/* Right HUD System Load Dial */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none opacity-30 font-mono text-[7px] text-[#1a1a2e]/60">
                    <svg width="34" height="34" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#1a1a2e" strokeWidth="1.2" strokeDasharray="80 20" className="animate-spin" style={{ animationDuration: '6s' }} />
                      <circle cx="18" cy="18" r="12" fill="none" stroke="#EE2C3C" strokeWidth="1.8" strokeDasharray="50 25" className="animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                    </svg>
                    <div className="font-bold tracking-wider">LOAD: 42%</div>
                  </div>

                  {/* Bouncing Data Stream Waveform at the bottom center */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-[3px] h-[26px] pointer-events-none select-none opacity-35">
                    {[10, 22, 14, 8, 26, 12, 18, 30, 8, 16, 24, 10, 6, 20, 14, 28, 12, 6, 20].map((h, i) => (
                      <span 
                        key={i} 
                        className="w-[2px] bg-primary rounded-full"
                        style={{ 
                          height: `${h}px`,
                          animation: `pulse-bar 0.9s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      ></span>
                    ))}
                  </div>

                   {/* High-Tech Blueprint Vector Graphic Behind Logo */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <svg width="480" height="480" viewBox="0 0 500 500" className="opacity-[0.8]">
                      {/* Grid Coordinates & Axes */}
                      <path d="M 30,250 L 470,250 M 250,30 L 250,470" stroke="#EB0028" strokeWidth="0.8" strokeDasharray="3 6" strokeOpacity="0.4" />
                      <path d="M 80,80 L 420,420 M 80,420 L 420,80" stroke="#1a1a2e" strokeWidth="0.5" strokeDasharray="1 7" strokeOpacity="0.3" />

                      {/* Main Concentric Tech Blueprint Rings */}
                      <circle cx="250" cy="250" r="225" fill="none" stroke="#1a1a2e" strokeWidth="0.75" strokeOpacity="0.2" />
                      <circle cx="250" cy="250" r="215" fill="none" stroke="#EB0028" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.6" />
                      <circle cx="250" cy="250" r="185" fill="none" stroke="#1a1a2e" strokeWidth="0.5" strokeOpacity="0.3" />
                      
                      {/* Rotating Dashed Tech Hexagon Outer Ring */}
                      <g className="animate-[spin_45s_linear_infinite_reverse] origin-center">
                        <polygon 
                          points="250,85 393,167 393,333 250,415 107,333 107,167" 
                          fill="none" 
                          stroke="#EB0028" 
                          strokeWidth="0.8" 
                          strokeDasharray="8 12" 
                          strokeOpacity="0.5"
                        />
                      </g>

                      {/* Orbiting Satellite Nodes */}
                      <g className="animate-[spin_15s_linear_infinite] origin-center">
                        <circle cx="250" cy="65" r="4.5" fill="#EB0028" />
                        <circle cx="250" cy="65" r="9" fill="none" stroke="#EB0028" strokeWidth="1" className="animate-ping" opacity="0.6" />
                        <line x1="250" y1="65" x2="250" y2="85" stroke="#EB0028" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.7" />
                      </g>
                      <g className="animate-[spin_25s_linear_infinite_reverse] origin-center">
                        <circle cx="107" cy="167" r="3.5" fill="#1a1a2e" />
                        <line x1="107" y1="167" x2="140" y2="167" stroke="#1a1a2e" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.5" />
                      </g>

                      <circle cx="250" cy="250" r="145" fill="none" stroke="#1a1a2e" strokeWidth="0.75" strokeDasharray="40 10 10 10" strokeOpacity="0.4" />
                      <circle cx="250" cy="250" r="115" fill="none" stroke="#EB0028" strokeWidth="0.8" opacity="0.7" />
                      <circle cx="250" cy="250" r="85" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeDasharray="2 12" strokeLinecap="round" strokeOpacity="0.3" />

                      {/* Spinning Outer Calibration Ticks */}
                      <g className="animate-[spin_60s_linear_infinite] origin-center">
                        {[...Array(36)].map((_, index) => {
                          const angle = (index * 360) / 360 * 10;
                          const isMajor = index % 3 === 0;
                          return (
                            <line
                              key={index}
                              x1="250"
                              y1={isMajor ? "20" : "24"}
                              x2="250"
                              y2="30"
                              stroke={isMajor ? "#EB0028" : "#1a1a2e"}
                              strokeWidth={isMajor ? "1.5" : "0.75"}
                              transform={`rotate(${angle} 250 250)`}
                              strokeOpacity={isMajor ? "0.9" : "0.5"}
                            />
                          );
                        })}
                      </g>

                      {/* Concentric Sweep & Radar Arch Markers */}
                      <g className="animate-[spin_40s_linear_infinite_reverse] origin-center">
                        <path d="M 70,250 A 180,180 0 0,1 250,70" fill="none" stroke="#EB0028" strokeWidth="2" strokeDasharray="20 40" strokeLinecap="round" strokeOpacity="0.7" />
                        <path d="M 430,250 A 180,180 0 0,1 250,430" fill="none" stroke="#1a1a2e" strokeWidth="1" strokeDasharray="10 30" strokeLinecap="round" strokeOpacity="0.4" />
                      </g>

                      {/* Tech Angle Text / Info overlays mock */}
                      <text x="260" y="75" fill="#EB0028" fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.6">SYS_STATUS: ACTIVE</text>
                      <text x="70" y="244" fill="#1a1a2e" fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.4">NODE_04 // SATARA</text>
                      <text x="350" y="425" fill="#EB0028" fontSize="7" fontFamily="monospace" fontWeight="bold" opacity="0.6">R&amp;D_GRID: DEPLOYED</text>
                    </svg>
                  </div>

                  {/* Corner tech brackets */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-xl pointer-events-none"></div>
                  <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl pointer-events-none"></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-xl pointer-events-none"></div>
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-tr-xl pointer-events-none"></div>

                  {/* Floating pulsing nodes */}
                <div className="absolute top-12 right-16 w-2 h-2 bg-primary/25 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-16 left-12 w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/3 right-8 w-1 h-1 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                  {/* Inner shadow for depth */}
                  <div className="absolute inset-0 rounded-[3.5rem] shadow-[inset_0_2px_30px_rgba(0,0,0,0.03)] pointer-events-none"></div>

                  <motion.div
                    className="a-3d-container cursor-grab active:cursor-grabbing scale-135 relative z-10"
                    style={{
                      rotateX: xSpring,
                      rotateY: ySpring,
                      transformStyle: 'preserve-3d'
                    }}
                    onMouseDown={handleMouseDown}
                  >
                    <motion.div
                      style={{ rotateY: idleY, transformStyle: 'preserve-3d' }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <ButterySmoothA 
                        isTransitioning={isTransitioning} 
                        currentLetter="A"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* PREMIUM GRADIENT DIVIDER LINE */}
              <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20 relative z-10 bg-white">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/30 to-transparent" />
              </div>

              {/* WHY AIR G? SECTION */}
              <div className="w-full pt-10 pb-8 relative z-10 bg-white overflow-hidden">
                {/* Small animated tech-grid background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a1a2e 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                  backgroundImage: `linear-gradient(to right, rgba(26,26,46,0.1) 1px, transparent 1px), 
                                    linear-gradient(to bottom, rgba(26,26,46,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}></div>

                <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20 space-y-16">
                  {/* Header */}
                  <div className="relative max-w-3xl space-y-4">
                    <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                      <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase font-black block">00 // System Overview</span>
                    <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
                      Why <span className="text-primary text-glow-red">AIR G?</span>
                    </h2>
                    <p className="text-lg md:text-xl font-bold text-[#1a1a2e] uppercase tracking-tight mt-3">
                      A complete ecosystem for AI, Robotics, Innovation, and Future-Ready Education.
                    </p>
                    <p className="text-sm md:text-base text-[#1a1a2e]/50 font-light leading-relaxed max-w-2xl">
                      From curriculum design to lab deployment and educator training, AIR G provides everything institutions need to build a world-class innovation ecosystem.
                    </p>
                  </div>

                  {/* 3-Card Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(238,44,60,0.08)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="space-y-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(238,44,60,0.3)] transition-all duration-300">
                          <span className="material-symbols-outlined text-2xl text-[#EE2C3C]">school</span>
                        </div>
                        <h3 className="font-headline text-xl font-black text-[#1a1a2e] uppercase tracking-tight">Curriculum & Training</h3>
                        <p className="text-xs sm:text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
                          Industry-aligned AI, Robotics, IoT, Drone, and Emerging Technology programs designed for practical learning and real-world application.
                        </p>
                        <div className="h-[1px] bg-black/5 w-full"></div>
                        <ul className="space-y-2.5">
                          {['Structured Learning Paths', 'Student Certifications', 'Teacher Enablement Programs'].map((h, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#1a1a2e]/70">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(238,44,60,0.08)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="space-y-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(238,44,60,0.3)] transition-all duration-300">
                          <span className="material-symbols-outlined text-2xl text-[#EE2C3C]">precision_manufacturing</span>
                        </div>
                        <h3 className="font-headline text-xl font-black text-[#1a1a2e] uppercase tracking-tight">Complete Lab Setup</h3>
                        <p className="text-xs sm:text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
                          End-to-end planning, installation, equipment deployment, and infrastructure support for AI and Robotics Innovation Labs.
                        </p>
                        <div className="h-[1px] bg-black/5 w-full"></div>
                        <ul className="space-y-2.5">
                          {['Hardware & Equipment', 'Lab Design & Deployment', 'Technical Support'].map((h, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#1a1a2e]/70">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(238,44,60,0.08)] transition-all duration-500 flex flex-col justify-between overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="space-y-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(238,44,60,0.3)] transition-all duration-300">
                          <span className="material-symbols-outlined text-2xl text-[#EE2C3C]">memory</span>
                        </div>
                        <h3 className="font-headline text-xl font-black text-[#1a1a2e] uppercase tracking-tight">Industry-Aligned AI Programs</h3>
                        <p className="text-xs sm:text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
                          Future-focused programs that equip students with skills demanded by modern industries and emerging technology sectors.
                        </p>
                        <div className="h-[1px] bg-black/5 w-full"></div>
                        <ul className="space-y-2.5">
                          {['Artificial Intelligence', 'Robotics & Automation', 'Future Career Readiness'].map((h, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#1a1a2e]/70">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/* TRUSTED ACROSS INDIA SECTION */}
              <div className="w-full pt-10 pb-10 relative z-10 bg-white overflow-hidden">
                {/* Soft futuristic grid background */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #EE2C3C 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
                
                <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20 space-y-12">
                  {/* Header */}
                  <div className="relative text-center max-w-3xl mx-auto space-y-3">
                    <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase font-black block">00 // National Credibility</span>
                    <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
                      Trusted Across <span className="text-primary text-glow-red">India</span>
                    </h2>
                    <p className="text-sm md:text-base text-[#1a1a2e]/50 font-light leading-relaxed max-w-2xl mx-auto">
                      Building future-ready institutions through AI, Robotics, Innovation Labs, and industry-focused learning programs.
                    </p>
                  </div>

                  {/* 4 Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[
                      { val: "30000+", label: "Students Trained" },
                      { val: "15+", label: "Innovation Labs" },
                      { val: "3", label: "States Covered" },
                      { val: "100+", label: "Workshops Conducted" }
                    ].map((stat, i) => (
                      <div key={i} className="group relative glass-premium p-6 sm:p-8 rounded-[2rem] border border-black/5 hover:border-primary/20 hover:shadow-[0_15px_30px_rgba(238,44,60,0.04)] transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        <div className="relative z-10 space-y-2">
                          <span className="block text-4xl sm:text-5xl font-headline font-black text-[#EE2C3C] tracking-tighter group-hover:scale-105 transition-transform duration-300 text-glow-red">
                            {stat.val}
                          </span>
                          <span className="block text-[10px] sm:text-xs uppercase tracking-widest font-black text-[#1a1a2e]/60 font-mono">
                            {stat.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="flex justify-center pt-4">
                    <button className="group relative px-8 py-4 bg-primary text-[#1a1a2e] font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-red" onClick={() => window.location.href = '/contact'}>
                      <span className="relative z-10 flex items-center gap-3">Get Free Consultation <span className="material-symbols-outlined text-sm">bolt</span></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* PREMIUM GRADIENT DIVIDER LINE */}
              <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20 relative z-10 bg-white">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/30 to-transparent" />
              </div>

              {/* GALLERY / SLIDING IMAGES (Full Width Section) */}
              <div className="w-full py-6 space-y-8 relative z-10 bg-white">
                <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20">
                  <div className="relative">
                    <div className="absolute left-[-20px] top-0 h-12 w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                      <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase font-black block">00 // Operational Frontiers</span>
                    <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
                      Field Record <span className="text-primary text-glow-red">Gallery</span>
                    </h2>
                  </div>
                </div>

                <div className="w-full">
                  <AppleCarousel />
                </div>
              </div>

              {/* PREMIUM RED DIVIDER LINE */}
              <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20 relative z-10 bg-white">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/30 to-transparent" />
              </div>

              {/* REST OF SECTIONS IN PADDED CONTAINER */}
              <div className="w-full max-w-[1440px] mx-auto px-5 md:px-20 py-4 space-y-4 relative z-10">
                <div className="glass-premium p-8 md:p-12 rounded-[3rem] border border-black/5 hover:border-primary/20 transition-all duration-500 shadow-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-7 space-y-6 relative">
                      {/* Visual Accent */}
                      <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                        <div className="absolute top-0 left-[-5px] w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#EE2C3C]" />
                      </div>
                      
                      <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase font-black block">01 // Research Frontiers</span>
                      <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none">
                        Innovation <br />
                        <span className="text-primary text-glow-red">Labs</span>
                      </h2>
                      <p className="font-body text-sm md:text-base text-[#1a1a2e]/40 leading-relaxed font-light border-l-2 border-primary/20 pl-6">
                        A distributed network of 15 deep-tech facilities operating at the edge of physical possibility. Integrating neural architectures, advanced robotics, precision agriculture, and aerospace systems.
                      </p>
                      
                      <div className="flex flex-wrap gap-2.5 pt-1">
                        {["Robotics Hub", "Agri-Tech R&D", "Propulsion Lab", "Decentralized Networks"].map((tech) => (
                          <span key={tech} className="px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[#1a1a2e]/60 text-[9px] uppercase font-mono tracking-wider font-bold">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => navigateTo('labs')}
                          className="group relative px-6 py-3.5 bg-primary text-[#1a1a2e] font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-red flex items-center gap-3"
                        >
                          Explore Labs 
                          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 grid grid-cols-2 gap-4 mt-8 lg:mt-0">
                      {labs.slice(0, 4).map((lab, i) => (
                        <div 
                          key={i}
                          onClick={() => navigateTo('labs')}
                          className="glass-premium p-3.5 rounded-[2rem] border border-black/5 hover:border-primary/25 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group/item h-auto relative overflow-hidden"
                        >
                          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-black/5 bg-slate-100 shrink-0">
                            <Image 
                              src={lab.img} 
                              alt={lab.name} 
                              fill 
                              className="object-cover group-hover/item:scale-105 transition-transform duration-500" 
                              sizes="(max-width: 768px) 100vw, 200px" 
                            />
                          </div>
                          <div className="space-y-1.5 flex flex-col justify-end flex-grow pt-3.5">
                            <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[7px] font-mono text-primary uppercase font-bold tracking-wider self-start">
                              {lab.status}
                            </span>
                            <div className="text-[#1a1a2e] font-headline font-black text-xs uppercase tracking-tight line-clamp-1 group-hover/item:text-primary transition-colors">
                              {lab.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PREMIUM RED DIVIDER LINE */}
                <div className="w-full max-w-[1440px] mx-auto px-4">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/30 to-transparent" />
                </div>

                {/* PILLAR 2: OFFLINE CENTRES */}
                <div className="glass-premium p-8 md:p-12 rounded-[3rem] border border-black/5 hover:border-primary/20 transition-all duration-500 shadow-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-5 relative group rounded-3xl overflow-hidden border border-white/10 bg-[#070d19] p-2 shadow-2xl order-2 lg:order-1">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-transparent pointer-events-none z-10"></div>
                      <div className="scanning-line group-hover:translate-y-[260px] transition-transform duration-[4000ms] ease-linear"></div>
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden flex items-center justify-center p-4 select-none [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:w-auto [&_svg]:mx-auto">
                        <InteractiveIndiaMap isDark={true} isPreview={true} />
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6 relative order-1 lg:order-2 lg:pl-8">
                      {/* Visual Accent */}
                      <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                        <div className="absolute top-0 left-[-5px] w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#EE2C3C]" />
                      </div>
                      
                      <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase font-black block">02 // Physical Infrastructure</span>
                      <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none">
                        Offline <br />
                        <span className="text-primary text-glow-red">Centres</span>
                      </h2>
                      <p className="font-body text-sm md:text-base text-[#1a1a2e]/40 leading-relaxed font-light border-l-2 border-primary/20 pl-6">
                        Explore our regional footprint on the India Network Map. Drill down into active zones like Maharashtra's technology frontiers or the detailed 38-district deployment across Bihar.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-0.5">
                          <div className="text-[#1a1a2e] font-headline font-black text-base">38 Districts Mapped</div>
                          <div className="text-[#1a1a2e]/30 text-[8px] font-mono uppercase tracking-widest">State-wide boundary precision</div>
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-primary font-headline font-black text-base">7 Global Centres</div>
                          <div className="text-[#1a1a2e]/30 text-[8px] font-mono uppercase tracking-widest">UK & ASEAN Network Mapped</div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => navigateTo('centres')}
                          className="group relative px-6 py-3.5 bg-primary text-[#1a1a2e] font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-red flex items-center gap-3"
                        >
                          Open Network Map 
                          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PREMIUM RED DIVIDER LINE */}
                <div className="w-full max-w-[1440px] mx-auto px-4">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/30 to-transparent" />
                </div>

                {/* PILLAR 3: WORKSHOPS */}
                <div className="glass-premium p-8 md:p-12 rounded-[3rem] border border-black/5 hover:border-primary/20 transition-all duration-500 shadow-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-5 space-y-6 relative">
                      {/* Visual Accent */}
                      <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                        <div className="absolute top-0 left-[-5px] w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#EE2C3C]" />
                      </div>
                      
                      <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase font-black block">03 // Operational Training</span>
                      <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none">
                        Workshops & <br />
                        <span className="text-primary text-glow-red">Briefings</span>
                      </h2>
                      <p className="font-body text-sm md:text-base text-[#1a1a2e]/40 leading-relaxed font-light border-l-2 border-primary/20 pl-6">
                        A visual audit log of our industrial-grade training sessions, technical exhibitions, and tactical bootcamps. Sync with local coordinators or request custom institutional showcases.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[8px] uppercase tracking-widest text-[#1a1a2e]/50">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-base">precision_manufacturing</span>
                          <span>Industrial Expos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-base">psychology</span>
                          <span>Tech Briefings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-base">diversity_3</span>
                          <span>Bootcamps</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => navigateTo('workshops')}
                          className="group relative px-6 py-3.5 bg-primary text-[#1a1a2e] font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-red flex items-center gap-3"
                        >
                          Audit Workshops 
                          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 lg:mt-0">
                      {fieldRecords.slice(0, 6).map((record, i) => (
                        <div 
                          key={i}
                          onClick={() => navigateTo('workshops')}
                          className="glass-premium p-3.5 rounded-[2rem] border border-black/5 hover:border-primary/25 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group/item h-auto relative overflow-hidden"
                        >
                          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-black/5 bg-slate-100 shrink-0">
                            <Image 
                              src={record.url} 
                              alt={record.title} 
                              fill 
                              className="object-cover group-hover/item:scale-105 transition-transform duration-500" 
                              sizes="(max-width: 768px) 100vw, 200px" 
                            />
                          </div>
                          <div className="space-y-1.5 flex flex-col justify-end flex-grow pt-3.5">
                            <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[7px] font-mono text-primary uppercase font-bold tracking-wider self-start">
                              {record.category}
                            </span>
                            <div className="text-[#1a1a2e] font-headline font-black text-xs uppercase tracking-tight line-clamp-1 group-hover/item:text-primary transition-colors">
                              {record.title}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PREMIUM RED DIVIDER LINE */}
                <div className="w-full max-w-[1440px] mx-auto px-4">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/30 to-transparent" />
                </div>

                {/* PILLAR 4: ELITE STORE */}
                <div className="glass-premium p-8 md:p-12 rounded-[3rem] border border-black/5 hover:border-primary/20 transition-all duration-500 shadow-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-5 order-2 lg:order-1">
                      <div 
                        onClick={() => navigateTo('store')}
                        className="relative w-full h-[320px] rounded-[2.5rem] border border-black/5 shadow-2xl overflow-hidden group/storecard cursor-pointer bg-slate-900"
                      >
                        <img 
                          src="/drone-kit-elite.png" 
                          alt="Drone Kit - Full Setup" 
                          className="w-full h-full object-cover group-hover/storecard:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-6 relative order-1 lg:order-2 lg:pl-8">
                      {/* Visual Accent */}
                      <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                        <div className="absolute top-0 left-[-5px] w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#EE2C3C]" />
                      </div>
                      
                      <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase font-black block">04 // Logistics & Provisioning</span>
                      <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none">
                        Elite <br />
                        <span className="text-primary text-glow-red">Store</span>
                      </h2>
                      <p className="font-body text-sm md:text-base text-[#1a1a2e]/40 leading-relaxed font-light border-l-2 border-primary/20 pl-6">
                        Official technology kits, high-performance apparel, and deep-learning textbooks designed for engineers and institutional training programs.
                      </p>
                      
                      <div className="pt-1 text-[#1a1a2e]/40 font-light text-[10px]">
                        * Supports bulk procurement and volume licensing for academic institutions across India.
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => navigateTo('store')}
                          className="group relative px-6 py-3.5 bg-primary text-[#1a1a2e] font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-red flex items-center gap-3"
                        >
                          Enter Elite Store 
                          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PREMIUM RED DIVIDER LINE */}
                <div className="w-full max-w-[1440px] mx-auto px-4">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#EE2C3C]/30 to-transparent" />
                </div>

              </div>

              {/* FOOTER */}
              <footer className="w-full border-t border-black/5 pt-16 pb-12 relative z-10">
                <div className="max-w-[1440px] mx-auto px-5 md:px-20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-12">
                    <div className="space-y-4 sm:col-span-2 md:col-span-3 pr-0 md:pr-4">
                      <Logo />
                      <p className="text-[#1a1a2e]/40 text-xs font-light leading-relaxed max-w-xs font-body">
                        Building the digital and physical infrastructure layer for decentralized intelligence hubs and autonomous ecosystems.
                      </p>
                      <div className="flex gap-4 pt-2">
                        <a href="https://youtube.com/@airguruji?si=y_hiDFi8YpiePL-v" target="_blank" rel="noopener noreferrer" className="text-[#1a1a2e]/40 hover:text-primary transition-colors" title="YouTube">
                          <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                        <a href="https://www.instagram.com/gurujiair?igsh=bW8wNW5pcnIwcDU=" target="_blank" rel="noopener noreferrer" className="text-[#1a1a2e]/40 hover:text-primary transition-colors" title="Instagram">
                          <svg className="w-[18px] h-[18px] fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                          </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/guruji-air/" target="_blank" rel="noopener noreferrer" className="text-[#1a1a2e]/40 hover:text-primary transition-colors" title="LinkedIn">
                          <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-sans font-bold text-[#1a1a2e] mb-4 uppercase tracking-wider text-[11px]">Company</h4>
                      <ul className="space-y-2 text-xs text-[#1a1a2e]/50 font-sans font-medium">
                        <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="/careers" className="hover:text-primary transition-colors">Careers</a></li>
                        <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
                        <li><a href="/press" className="hover:text-primary transition-colors">Press</a></li>
                      </ul>
                    </div>
                    <div className="md:col-span-3">
                      <h4 className="font-sans font-bold text-[#1a1a2e] mb-4 uppercase tracking-wider text-[11px]">Community</h4>
                      <ul className="space-y-2 text-xs text-[#1a1a2e]/50 font-sans font-medium">
                        <li><a href="/instructor" className="hover:text-primary transition-colors">Become an Instructor</a></li>
                        <li><a href="/affiliate" className="hover:text-primary transition-colors">Affiliate Program</a></li>
                        <li><a href="/stories" className="hover:text-primary transition-colors">Student Stories</a></li>
                      </ul>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-sans font-bold text-[#1a1a2e] mb-4 uppercase tracking-wider text-[11px]">Support</h4>
                      <ul className="space-y-2 text-xs text-[#1a1a2e]/50 font-sans font-medium">
                        <li><a href="/help" className="hover:text-primary transition-colors">Help Center</a></li>
                        <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
                        <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                      </ul>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-sans font-bold text-[#1a1a2e] mb-4 uppercase tracking-wider text-[11px]">Mobile App</h4>
                      <div className="flex flex-col gap-2">
                        {/* App Store button */}
                        <a href="#" className="flex items-center gap-2.5 bg-black hover:bg-black/90 text-white px-3.5 py-2 rounded-lg transition-all duration-300 border border-white/10 w-[150px] hover:scale-[1.02]">
                          <svg viewBox="0 0 170 170" className="w-[18px] h-[18px] fill-white">
                            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.3-6.08-3.57-2.9-7.22-7.44-10.95-13.62C13.43 115.17 6.1 90.7 6.1 65.86c0-15.16 3.73-27.42 11.2-36.78 7.46-9.36 16.56-14.13 27.27-14.3 5.37-.08 10.95 1.5 16.74 4.74 5.8 3.23 9.87 4.79 12.21 4.79 1.83 0 5.61-1.46 11.37-4.4 5.75-2.92 11.16-4.33 16.24-4.22 17.58.33 30.65 6.78 39.22 19.38-15.7 9.53-23.33 22.33-22.92 38.4.33 12.92 5.3 23.46 14.92 31.62 9.62 8.16 20.87 12.5 33.74 13.04.42-3.4 1.25-7.04 2.5-10.88zM119.22 26.24c0-7.72 2.76-14.88 8.29-21.49.92-1.09 1.83-2.01 2.75-2.75 1-.92 1.67-1.42 2-1.5.25-.08.5-.12.75-.12.58 0 1 .29 1.25.87.5.92.75 2.21.75 3.87 0 7.42-2.75 14.54-8.25 21.34-.83.92-1.75 1.88-2.75 2.88-1 .92-1.71 1.46-2.12 1.62-.34.17-.67.25-1 .25-.67 0-1.13-.37-1.38-1.12-.37-1.13-.54-2.46-.54-3.98z" />
                          </svg>
                          <div className="flex flex-col items-start leading-none text-left">
                            <span className="text-[6.5px] uppercase tracking-wider text-white/55">Download on the</span>
                            <span className="text-[10.5px] font-semibold text-white mt-0.5 font-sans">App Store</span>
                          </div>
                        </a>
                        {/* Google Play button */}
                        <a href="#" className="flex items-center gap-2.5 bg-black hover:bg-black/90 text-white px-3.5 py-2 rounded-lg transition-all duration-300 border border-white/10 w-[150px] hover:scale-[1.02]">
                          <svg viewBox="0 0 512 512" className="w-[18px] h-[18px] fill-white">
                            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.3 60.1 60.1c11.9-19.1 11.9-42.5-2.1-53.4zM104.6 499l220.7-126.7-60.1-60.1-160.6 186.8z" />
                          </svg>
                          <div className="flex flex-col items-start leading-none text-left">
                            <span className="text-[6.5px] uppercase tracking-wider text-white/55">GET IT ON</span>
                            <span className="text-[10.5px] font-semibold text-white mt-0.5 font-sans">Google Play</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[9px] text-[#1a1a2e]/30 tracking-widest uppercase">
                    <div>© 2026 AIR G INTERNATIONAL. ALL RIGHTS RESERVED.</div>
                    <div className="flex gap-6">
                      <a href="#" className="hover:text-primary transition-colors">Security Protocols</a>
                      <span>/</span>
                      <a href="#" className="hover:text-primary transition-colors">Compliance Audits</a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </section>

          {/* FACE 2: LABS (NEXUS NODES) */}
          <section className={`cube-face ${getFaceClass('labs')} pt-16 pb-20 overflow-y-auto custom-scrollbar`} id="labs-face">
            <div className="max-w-[1440px] mx-auto px-5 md:px-20">
              <div className="mb-10 relative">
                <div className="absolute left-[-20px] top-0 h-full w-[1px] bg-black/5">
                  <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                <span className="text-primary font-black tracking-[0.4em] uppercase text-[10px] mb-4 block font-mono">Strategic Infrastructure</span>
                <h2 className="font-headline tracking-tighter leading-[0.9]">
                  <span className="block text-4xl md:text-6xl font-black text-[#1a1a2e] uppercase">
                    Innovation
                  </span>
                  <span className="block text-4xl md:text-6xl font-black bg-gradient-to-r from-[#EE2C3C] via-[#FF5C6C] to-[#BD1A29] bg-clip-text text-transparent uppercase drop-shadow-[0_2px_8px_rgba(238,44,60,0.15)]">
                    Labs
                  </span>
                </h2>
                <p className="text-[#1a1a2e]/40 mt-4 max-w-2xl text-base font-light leading-relaxed font-body border-l-2 border-primary/20 pl-6">
                  A distributed network of deep-tech facilities operating at the edge of physical possibility. Precision engineered for the kinetic horizon.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                {[
                  { label: "Verified Hubs", val: `${labs.length} Active Labs`, icon: "domain", pulse: true },
                  { label: "Coverage Area", val: "3 Active States", icon: "map" },
                  { label: "Focus Domains", val: "Deep Tech & AI", icon: "precision_manufacturing" },
                  { label: "Mission Scale", val: "State-Wide Impact", icon: "hub" }
                ].map((item) => (
                  <div key={item.label} className="p-6 glass-premium rounded-2xl border border-black/5 border-t-2 border-t-primary flex flex-col gap-2 group hover:border-primary/50 transition-all shadow-sm">
                    <div className="flex items-center gap-2">
                      {item.pulse ? <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#EE2C3C]"></span> : <span className="material-symbols-outlined text-xs text-primary">{item.icon}</span>}
                      <span className="text-[10px] font-bold text-[#1a1a2e]/40 uppercase tracking-widest font-mono">{item.label}</span>
                    </div>
                    <div className="text-sm text-[#1a1a2e] font-black font-headline uppercase tracking-tight">{item.val}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {labs.map((lab, i) => (
                  <div key={i} className="glass-premium p-5 rounded-3xl border border-black/5 border-t-4 border-t-primary group hover:border-primary/50 transition-all duration-500 relative overflow-hidden shadow-sm flex flex-col justify-between h-full">
                    <div className="scanning-line group-hover:translate-y-[380px] transition-transform duration-[3000ms] ease-linear"></div>
                    <div>


                      {/* Lab Centre Photo */}
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 border border-black/5 bg-slate-100 shrink-0">
                        <Image 
                          src={lab.img} 
                          alt={lab.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>

                      <h4 className="text-lg font-headline font-bold mb-2 text-[#1a1a2e] uppercase tracking-tight group-hover:text-primary transition-colors">{lab.name}</h4>
                      <p className="text-xs text-[#1a1a2e]/40 leading-relaxed mb-4 h-16 overflow-hidden line-clamp-3 font-body">{lab.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-black/5 flex items-center justify-between mt-auto">
                      <Link 
                        href={`/labs/${lab.slug}`}
                        className="text-[11px] font-bold text-primary flex items-center gap-2 group/btn uppercase tracking-wider font-sans hover:text-[#EE2C3C] transition-colors"
                      >
                        View Lab Details <span className="material-symbols-outlined text-xs transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FACE 3: CENTRES (TACTICAL ZOOM MAP) */}
          <section className={`cube-face ${getFaceClass('centres')} pt-24 pb-10 overflow-y-auto custom-scrollbar`} id="centres-face">
            <div className="max-w-[1440px] mx-auto px-5 md:px-12">
              
              {/* Network Toggle Switch */}
              <div className="flex justify-center mb-8">
                <div className="bg-slate-100 p-1.5 rounded-2xl border border-black/5 flex gap-2 z-20">
                  <button
                    onClick={() => {
                      setActiveNetwork("india");
                      setSelectedGlobalHub(null);
                    }}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer ${
                      activeNetwork === "india"
                        ? "bg-[#EE2C3C] text-white shadow-md"
                        : "text-[#1a1a2e]/60 hover:text-[#1a1a2e]"
                    }`}
                  >
                    India Network
                  </button>
                  <button
                    onClick={() => setActiveNetwork("global")}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer ${
                      activeNetwork === "global"
                        ? "bg-[#EE2C3C] text-white shadow-md"
                        : "text-[#1a1a2e]/60 hover:text-[#1a1a2e]"
                    }`}
                  >
                    Global Network
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Side: Info & Controls */}
                <div className="lg:col-span-4 order-2 lg:order-1 space-y-6 relative">
                  <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                    <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                  
                  {activeNetwork === "india" ? (
                    <>
                      <span className="text-primary font-bold tracking-[0.4em] uppercase text-[9px] block font-mono">National Infrastructure</span>
                      <h2 className="font-headline tracking-tighter leading-[0.9]">
                        <span className="block text-4xl md:text-5xl font-black text-[#1a1a2e] uppercase">
                          India
                        </span>
                        <span className="block text-4xl md:text-5xl font-black text-primary uppercase text-glow-red">
                          Network
                        </span>
                      </h2>
                      <p className="text-[#1a1a2e]/60 text-xs font-light leading-relaxed font-body border-l-2 border-primary/20 pl-4">
                        Advanced Tactical Interface. Use controls to zoom and drag to pan across the verified deployment registry. Click highlighted states to explore.
                      </p>

                      <div className="space-y-4 pt-4">
                        <div className="glass-premium p-5 rounded-2xl border border-black/5 flex items-center gap-4 bg-gradient-to-r from-primary/5 to-transparent">
                          <span className="material-symbols-outlined text-primary text-2xl">map</span>
                          <div>
                            <h3 className="text-xs font-headline font-bold text-[#1a1a2e] uppercase tracking-tighter">Interactive <span className="text-primary">States</span></h3>
                            <p className="text-[#1a1a2e]/40 text-[9px] leading-relaxed mt-0.5">Click highlighted states to drill into regional views.</p>
                          </div>
                        </div>
                        
                        <div className="glass-premium p-5 rounded-2xl border border-black/5 flex flex-col justify-center gap-2">
                          <div className="flex justify-between text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">
                            <span>Coverage Status</span>
                            <span className="text-primary font-bold">Expanding</span>
                          </div>
                          <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[35%] transition-all duration-500"></div>
                          </div>
                        </div>

                        <button className="w-full py-3.5 bg-primary/10 border border-primary/30 text-[#1a1a2e] font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-primary transition-all">
                          Download Full Asset
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-primary font-bold tracking-[0.4em] uppercase text-[9px] block font-mono">International Presence</span>
                      <div className="flex justify-between items-start gap-4">
                        <h2 className="font-headline tracking-tighter leading-[0.9]">
                          <span className="block text-4xl md:text-5xl font-black text-[#1a1a2e] uppercase">
                            Global
                          </span>
                          <span className="block text-4xl md:text-5xl font-black text-primary uppercase text-glow-red">
                            Outreach
                          </span>
                        </h2>
                        {selectedGlobalHub && (
                          <button 
                            onClick={() => setSelectedGlobalHub(null)}
                            className="px-3 py-1.5 rounded-lg border border-black/5 bg-slate-50 text-[10px] font-mono font-bold text-[#1a1a2e]/50 hover:text-primary hover:bg-primary/5 hover:border-primary/25 transition-all duration-300 flex items-center gap-1 uppercase tracking-wider mt-1"
                            title="Back to Overview"
                          >
                            <span className="material-symbols-outlined text-[12px]">arrow_back</span>
                            Back
                          </button>
                        )}
                      </div>
                      
                      {selectedGlobalHub ? (
                        <div className="space-y-4 pt-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                          <div className="border-l-2 border-primary/35 pl-4">
                            <h3 className="text-base font-bold text-[#1a1a2e] uppercase tracking-tight font-sans">{selectedGlobalHub.name}</h3>
                            <span className="text-[10px] font-mono text-primary font-bold block mt-0.5">{selectedGlobalHub.location}</span>
                          </div>
                          
                          <p className="text-xs text-[#1a1a2e]/60 leading-relaxed font-body">
                            {selectedGlobalHub.description}
                          </p>

                          <div className="grid grid-cols-3 gap-2">
                            {selectedGlobalHub.stats.map((stat: any, idx: number) => (
                              <div key={idx} className="glass-premium p-2.5 rounded-xl border border-black/5 flex flex-col justify-center gap-0.5 font-mono">
                                <span className="text-[7px] text-[#1a1a2e]/40 font-semibold leading-none uppercase tracking-wider">{stat.label}</span>
                                <span className="text-[#1a1a2e] font-black text-[10px] leading-tight mt-1 truncate" title={stat.value}>{stat.value}</span>
                              </div>
                            ))}
                          </div>

                          {selectedGlobalHub.flyer && (
                            <div className="rounded-2xl overflow-hidden border border-black/10 shadow-sm max-h-[260px] flex items-center justify-center bg-slate-50 transition-all duration-300">
                              <Image 
                                src={selectedGlobalHub.flyer} 
                                alt="Founder Profile" 
                                width={400} 
                                height={400}
                                className="w-full h-auto object-contain max-h-[260px]"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          <p className="text-[#1a1a2e]/60 text-xs font-light leading-relaxed font-body border-l-2 border-primary/20 pl-4">
                            Partnering with international schools and universities to align digital literacy pathways with global certification frameworks.
                          </p>

                          <div className="space-y-4 pt-4">
                            <div className="glass-premium p-5 rounded-2xl border border-black/5 flex items-center gap-4 bg-gradient-to-r from-primary/5 to-transparent">
                              <span className="material-symbols-outlined text-primary text-2xl">globe</span>
                              <div>
                                <h3 className="text-xs font-headline font-bold text-[#1a1a2e] uppercase tracking-tighter">Interactive <span className="text-primary">Hubs</span></h3>
                                <p className="text-[#1a1a2e]/40 text-[9px] leading-relaxed mt-0.5">Click highlighted hubs on the map to inspect academic profiles.</p>
                              </div>
                            </div>

                            <div className="glass-premium p-5 rounded-2xl border border-black/5 flex flex-col justify-center gap-1 font-mono text-[9px] text-[#1a1a2e]/40">
                              <div className="flex justify-between border-b border-black/5 pb-1">
                                <span>ACTIVE REGIONS</span>
                                <span>7 GLOBAL CENTRES</span>
                              </div>
                              <div className="flex justify-between pt-1">
                                <span>CERTIFICATIONS</span>
                                <span>UK & ASEAN ACCREDITED</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Right Side: Map Container */}
                <div className="lg:col-span-8 order-1 lg:order-2 relative group">
                  {/* Premium red glow behind the map container */}
                  <div className="absolute -inset-3 bg-gradient-to-tr from-[#EE2C3C]/10 to-[#FF5C6C]/5 rounded-[3.5rem] opacity-80 blur-2xl group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
                  
                  <div className="relative glass-premium rounded-[3rem] overflow-hidden border border-[#EE2C3C]/15 bg-white/70 backdrop-blur-md p-5 flex items-center justify-center shadow-[0_15px_40px_rgba(238,44,60,0.05)] hover:shadow-[0_20px_50px_rgba(238,44,60,0.12)] hover:border-[#EE2C3C]/30 transition-all duration-500">
                    {/* Fullscreen Button */}
                    <button 
                      onClick={() => setIsMapFullscreen(true)}
                      className="absolute top-6 right-6 z-40 bg-white/80 backdrop-blur-md text-[#1a1a2e] hover:bg-[#EB0028] hover:text-white transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center shadow-lg group"
                      title="View Fullscreen"
                    >
                      <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">fullscreen</span>
                    </button>
                    {activeNetwork === "india" ? (
                      <InteractiveIndiaMap />
                    ) : (
                      <InteractiveWorldMap onSelectHub={(hub) => setSelectedGlobalHub(hub)} />
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* FACE 4: WORKSHOPS */}
          <section className={`cube-face ${getFaceClass('workshops')} pt-16 pb-20 overflow-y-auto custom-scrollbar`} id="workshops-face">
            <div className="max-w-[1440px] mx-auto px-5 md:px-20">
              <div className="mb-10 relative">
                <div className="absolute left-[-20px] top-0 h-full w-[1px] bg-black/5">
                  <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block font-mono">Operational Training</span>
                <h2 className="font-headline tracking-tighter leading-[0.9]">
                  <span className="block text-4xl md:text-6xl font-black text-[#1a1a2e] uppercase">
                    Field
                  </span>
                  <span className="block text-4xl md:text-6xl font-black bg-gradient-to-r from-[#EE2C3C] via-[#FF5C6C] to-[#BD1A29] bg-clip-text text-transparent uppercase drop-shadow-[0_2px_8px_rgba(238,44,60,0.15)]">
                    Records
                  </span>
                </h2>
                <p className="text-[#1a1a2e]/40 mt-4 max-w-2xl text-base font-light leading-relaxed border-l-2 border-primary/20 pl-6">
                  A visual audit of industrial-grade training sessions, tactical bootcamps, and high-level strategic exhibitions.
                </p>
              </div>

              {/* Portfolio Showcase Gallery - Horizontal Layout */}
              <div className="space-y-10 mb-32">
                {fieldRecords.map((record, i) => (
                  <Link href={`/workshops/${record.slug}`} key={i} className="group grid lg:grid-cols-5 gap-10 items-center glass-premium p-6 rounded-[2.5rem] border border-black/5 hover:border-primary/20 transition-all duration-500 overflow-hidden relative cursor-pointer w-full">
                    {/* Image Column */}
                    <div className="lg:col-span-2 relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-black/5">
                      <Image 
                        src={record.url} 
                        alt={record.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Info Column */}
                    <div className="lg:col-span-3 space-y-4 pr-6">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[8px] font-black font-mono text-primary uppercase tracking-widest">{record.category}</span>
                        <span className="text-[10px] text-[#1a1a2e]/20 font-mono">/ MISSION DATA</span>
                      </div>
                      
                      <h4 className="text-3xl md:text-4xl font-headline font-black text-[#1a1a2e] uppercase tracking-tighter leading-none">{record.title}</h4>
                      
                      <p className="text-[#1a1a2e]/40 text-sm md:text-base font-light leading-relaxed max-w-xl">
                        {record.desc}
                      </p>

                      <div className="pt-4 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[#1a1a2e]/60">
                          <span className="material-symbols-outlined text-sm text-primary">verified</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Authenticated</span>
                        </div>
                        <div className="w-full h-[1px] bg-black/5"></div>
                      </div>
                    </div>

                    {/* Background UI Element */}
                    <div className="absolute top-[-20%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                       <span className="text-[120px] font-black text-[#1a1a2e] leading-none font-headline">0{i+1}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Engagement Pillars (Replacing Course Catalog) */}
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="p-12 glass-premium rounded-[3rem] border border-black/5 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">precision_manufacturing</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-black text-[#1a1a2e] uppercase tracking-tight mb-4">Industrial <span className="text-primary">Expos</span></h3>
                    <p className="text-[#1a1a2e]/40 leading-relaxed font-light text-sm">
                      Showcasing state-of-the-art industrial robotics and automation systems to global stakeholders and engineering communities.
                    </p>
                  </div>
                </div>

                <div className="p-12 glass-premium rounded-[3rem] border border-black/5 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-black text-[#1a1a2e] uppercase tracking-tight mb-4">Strategic <span className="text-primary">Briefings</span></h3>
                    <p className="text-[#1a1a2e]/40 leading-relaxed font-light text-sm">
                      High-level presentations and immersive demonstrations of AI-driven ecosystems and future-tech roadmaps.
                    </p>
                  </div>
                </div>

                <div className="p-12 glass-premium rounded-[3rem] border border-black/5 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">diversity_3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-black text-[#1a1a2e] uppercase tracking-tight mb-4">Tactical <span className="text-primary">Exhibitions</span></h3>
                    <p className="text-[#1a1a2e]/40 leading-relaxed font-light text-sm">
                      Public engagements designed to inspire and educate the next generation through hands-on technology interaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-20 p-12 glass-premium rounded-[3rem] border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl">
                  <h3 className="text-3xl font-headline text-[#1a1a2e] mb-4 uppercase tracking-tighter">Request a <span className="text-primary">Custom Showcase</span></h3>
                  <p className="text-[#1a1a2e]/40 text-sm font-light">Bring AIR G's tactical technology and innovation labs to your institution or corporate event.</p>
                </div>
                <button className="bg-primary text-[#1a1a2e] px-12 py-6 rounded-2xl font-bold uppercase tracking-widest glow-red whitespace-nowrap hover:scale-105 transition-all">Inquire for Collaboration</button>
              </div>
            </div>
          </section>

          {/* FACE 5: ELITE STORE */}
          <section className={`cube-face ${getFaceClass('store')} pt-16 pb-20`} id="store-face">
            <div className="max-w-[1440px] mx-auto px-5 md:px-20">
              <div className="mb-10 relative">
                <div className="absolute left-[-20px] top-0 h-full w-[1px] bg-black/5">
                  <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block font-mono">Official Merchandise</span>
                <h2 className="font-headline tracking-tighter leading-[0.9]">
                  <span className="block text-4xl md:text-6xl font-black text-[#1a1a2e] uppercase">
                    AIR G
                  </span>
                  <span className="block text-4xl md:text-6xl font-black bg-gradient-to-r from-[#EE2C3C] via-[#FF5C6C] to-[#BD1A29] bg-clip-text text-transparent uppercase drop-shadow-[0_2px_8px_rgba(238,44,60,0.15)]">
                    Store
                  </span>
                </h2>
                <p className="text-[#1a1a2e]/40 mt-4 max-w-2xl text-base font-light border-l-2 border-primary/20 pl-6">Exclusive high-performance gear and academic resources for the next generation of engineers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {[
                  { name: "Touchless Hand Dispenser Kit", price: "₹799", img: "/products/product_1.jpeg", tag: "Hardware", desc: "to dispense sanitizer without physical contact. Using sensors and a microcontroller, the device detects the presence of a hand and activates the dispenser automatically, ensuring safe, hygienic, and efficient sanitiza..." },
                  { name: "Smart Notice Board", price: "₹1,499", img: "/products/product_2.jpeg", tag: "Hardware", desc: "messages and notices to be displayed digitally using a microcontroller and wireless communication technology. Notices can be updated remotely through This project helps in fast information sharing, reduces paperwork, ..." },
                  { name: "Smart Traffic Light System", price: "₹1,499", img: "/products/product_3.jpeg", tag: "Hardware", desc: "project that controls traffic signals intelligently using sensors and a microcontroller . The system monitors vehicle density on roads and adjusts the timing of traffic lights automati cally to improve traffic flow an..." },
                  { name: "Temperature Monitoring System", price: "₹1,499", img: "/products/product_4.jpeg", tag: "Hardware", desc: "Exclusive learning kit and high-performance educational resource designed for technical training." },
                  { name: "Soil Moisture Monitoring System", price: "₹999", img: "/products/product_5.jpeg", tag: "Hardware", desc: "monitoring project used to measure the moisture level present in soil. It uses a soil moisture sensor to detect the water content in the soil and sends the data to a microcontroller for monitoring and control. The sys..." },
                  { name: "Smart Dustbin System", price: "₹1,999", img: "/products/product_6.jpeg", tag: "Hardware", desc: "sensors and a microcontroller to open the dustbin lid without physical contact. When a person’s hand approaches the sensor, the system detects the motion and automatically opens th e lid using a servo motor. This proj..." },
                  { name: "Rain Detection System Kit", price: "₹699", img: "/products/product_7.jpeg", tag: "Hardware", desc: "detects the presence of rain using a rain sensor module. When raindrops fall on the sensor surface, the system senses moisture and sends a signal to the microcontroller, which can ac tivate alarms, motors, or notifica..." },
                  { name: "Smart Parking System", price: "₹1,499", img: "/products/product_8.jpeg", tag: "Hardware", desc: "to manage vehicle parking efficiently using sensors and a microcontroller. The system detects the availability of parking slots and provides real -time information through display s, LEDs, or IoT platforms. It helps r..." },
                  { name: "Motion Detection Alert System", price: "₹1,499", img: "/products/product_9.jpeg", tag: "Hardware", desc: "detects human movement using a motion sensor and generates an alert through a buzzer, LED, or notification system. The sensor continuously monitors the surrounding area, and when m otion is detected, the microcontroll..." },
                  { name: "Gas Leakage Detection System", price: "₹1,499", img: "/products/product_10.jpeg", tag: "Hardware", desc: "to detect the presence of harmful or combustible gases in the environment. It uses a gas sensor to continuously monitor gas levels and alerts users through a buzzer, LED, or notification system when gas concentration ..." },
                  { name: "Automatic Street Light System", price: "₹699", img: "/products/product_11.jpeg", tag: "Hardware", desc: "controls street lights based on surrounding light intensity. It uses an LDR (Light Dependent Resistor) sensor to detect daylight and darkness. When the environment becomes dark, the system automatically turns ON the s..." },
                  { name: "Water Level Indicator Kit", price: "₹699", img: "/products/product_12.jpeg", tag: "Hardware", desc: "indicate the level of water in a tank or container. It uses sensors and a microcontroller to monitor different water levels and provides alerts through LEDs, buzzers, or displa ys when the water reaches specific level..." },
                  { name: "Obstacle Avoiding Robot", price: "₹3,499", img: "/products/product_13.jpeg", tag: "Robotics", desc: "An autonomous robotic system that detects and avoids obstacles automatically using ultrasonic sensors and an Arduino Uno controller." },
                  { name: "Line Following Robot", price: "₹3,499", img: "/products/product_14.jpeg", tag: "Robotics", desc: "An autonomous robotic system designed to follow a predefined path or line using infrared (IR) sensors and an Arduino Uno controller." },
                  { name: "Bluetooth Controlled Car", price: "₹2,999", img: "/products/product_15.jpeg", tag: "Robotics", desc: "A wireless robotic vehicle controlled remotely using a smartphone via Bluetooth communication and an Arduino/NodeMCU system." }
                ].map((product, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedProduct(product)}
                    className="glass-premium rounded-[2rem] overflow-hidden border border-black/5 group hover:border-primary/50 transition-all flex flex-col h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 duration-300"
                  >
                    <div className="relative w-full h-[280px] overflow-hidden bg-slate-50/50 p-6 flex items-center justify-center">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h4 className="text-lg font-headline font-black text-[#1a1a2e] mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">{product.name}</h4>
                      <p className="text-xs text-[#1a1a2e]/55 font-sans mt-1.5 mb-3 line-clamp-3 leading-relaxed min-h-[48px]">{product.desc}</p>
                      <div className="flex justify-between items-center font-mono mt-auto pt-4">
                        <span className="text-primary font-bold">{product.price}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="text-[10px] font-bold text-[#1a1a2e] uppercase tracking-widest px-5 py-2.5 bg-black/5 rounded-lg hover:bg-primary transition-all font-mono"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 p-12 glass-premium rounded-[3rem] border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl">
                  <h3 className="text-3xl font-headline text-[#1a1a2e] mb-4">Bulk Institutional Orders</h3>
                  <p className="text-[#1a1a2e]/40 text-sm">We provide specialized hardware kits and curricula for schools and colleges across Maharashtra. Connect with our procurement team for volume licensing.</p>
                </div>
                <button className="bg-primary text-[#1a1a2e] px-10 py-5 rounded-2xl font-bold uppercase tracking-widest glow-red whitespace-nowrap">Contact Sales</button>
              </div>

              <footer className="mt-40 pt-20 border-t border-black/5 grid grid-cols-1 md:grid-cols-5 gap-12 pb-10">
                <div className="space-y-6 md:col-span-2">
                  <Logo />
                  <p className="text-[10px] text-[#1a1a2e]/20 uppercase tracking-[0.2em]">© 2026 AIR G INTERNATIONAL. ALL RIGHTS RESERVED.</p>
                  <div className="flex gap-4">
                    <a href="https://youtube.com/@airguruji?si=y_hiDFi8YpiePL-v" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-[#1a1a2e] hover:bg-primary transition-all cursor-pointer group shadow-lg" title="YouTube">
                      <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/gurujiair?igsh=bW8wNW5pcnIwcDU=" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-[#1a1a2e] hover:bg-primary transition-all cursor-pointer group shadow-lg" title="Instagram">
                      <svg className="w-[16px] h-[16px] fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/guruji-air/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-[#1a1a2e] hover:bg-primary transition-all cursor-pointer group shadow-lg" title="LinkedIn">
                      <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] mb-6 uppercase tracking-widest text-[10px]">Company</h4>
                  <ul className="space-y-3 text-xs text-[#1a1a2e]/40 uppercase tracking-widest">
                    <li><a href="/about" className="hover:text-primary transition-colors text-left block">About Us</a></li>
                    <li><a href="/careers" className="hover:text-primary transition-colors text-left block">Careers</a></li>
                    <li><a href="/blog" className="hover:text-primary transition-colors text-left block">Blog</a></li>
                    <li><a href="/press" className="hover:text-primary transition-colors text-left block">Press</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] mb-6 uppercase tracking-widest text-[10px]">Community</h4>
                  <ul className="space-y-3 text-xs text-[#1a1a2e]/40 uppercase tracking-widest">
                    <li><a href="/instructor" className="hover:text-primary transition-colors text-left block">Become an Instructor</a></li>
                    <li><a href="/affiliate" className="hover:text-primary transition-colors text-left block">Affiliate Program</a></li>
                    <li><a href="/stories" className="hover:text-primary transition-colors text-left block">Student Stories</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e] mb-6 uppercase tracking-widest text-[10px]">Support</h4>
                  <ul className="space-y-3 text-xs text-[#1a1a2e]/40 uppercase tracking-widest">
                    <li><a href="/help" className="hover:text-primary transition-colors text-left block">Help Center</a></li>
                    <li><a href="/contact" className="hover:text-primary transition-colors text-left block">Contact Us</a></li>
                    <li><a href="/privacy" className="hover:text-primary transition-colors text-left block">Privacy Policy</a></li>
                    <li><a href="/terms" className="hover:text-primary transition-colors text-left block">Terms of Service</a></li>
                  </ul>
                </div>
              </footer>
            </div>
          </section>

          {/* FACE 6: LEARNING */}
          <section className={`cube-face ${getFaceClass('learning')} pt-16 pb-20 overflow-y-auto custom-scrollbar`} id="learning-face">
            <div className="max-w-[1440px] mx-auto px-5 md:px-20">
              <div className="mb-12 relative">
                <div className="absolute left-[-20px] top-0 h-full w-[1px] bg-black/5">
                  <div className="absolute top-0 left-[-4px] w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                <span className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block font-mono">Academic & Innovation Portal</span>
                <h2 className="font-headline tracking-tighter leading-[0.9]">
                  <span className="block text-4xl md:text-6xl font-black text-[#1a1a2e] uppercase">
                    Learning &
                  </span>
                  <span className="block text-4xl md:text-6xl font-black bg-gradient-to-r from-[#EE2C3C] to-[#BD1A29] bg-clip-text text-transparent uppercase drop-shadow-[0_2px_8px_rgba(238,44,60,0.15)]">
                    Competition Hub
                  </span>
                </h2>
                <p className="text-[#1a1a2e]/40 mt-4 max-w-2xl text-base font-light border-l-2 border-primary/20 pl-6">
                  Register for state-level engineering challenges, track active student nodes, and synchronize your curriculums via the official AIR G Learning App.
                </p>

              {/* Premium Implant Training Program 2026 Section */}
              <div className="space-y-6 mb-16 pt-6 relative">
                {/* Ambient glow behind cards */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4 relative z-10">
                  <h3 className="text-xl font-headline font-black text-[#1a1a2e] uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">military_tech</span>
                    Premium Implant Training 2026
                  </h3>
                </div>

                {/* Status Banners */}
                {paymentStatus.pending && (
                  <div className="relative z-10 p-6 rounded-[2rem] border border-blue-500/25 bg-blue-50/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                        <span className="material-symbols-outlined animate-pulse text-2xl">sync_saved_locally</span>
                      </div>
                      <div className="space-y-1 text-left">
                        <h4 className="font-headline font-black text-sm text-[#1a1a2e] uppercase tracking-wider">Payment Verification Pending</h4>
                        <p className="text-xs text-[#1a1a2e]/60 font-medium">
                          Your details for Order ID <span className="font-black text-[#E82E32]">{paymentStatus.pendingDetails?.orderId}</span> are under review. We will notify you via email/SMS once confirmed.
                        </p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest font-mono shadow-md animate-pulse">
                      Under Review
                    </span>
                  </div>
                )}

                {paymentStatus.enrolled && (
                  <div className="relative z-10 p-6 rounded-[2rem] border border-emerald-500/25 bg-emerald-50/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                        <span className="material-symbols-outlined text-2xl">verified</span>
                      </div>
                      <div className="space-y-1 text-left">
                        <h4 className="font-headline font-black text-sm text-[#1a1a2e] uppercase tracking-wider">Enrollment Active</h4>
                        <p className="text-xs text-[#1a1a2e]/60 font-medium">
                          You have full access to the Implant Training Program. Go to your learning dashboard to begin.
                        </p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest font-mono shadow-md">
                      Enrolled
                    </span>
                  </div>
                )}

                {paymentStatus.rejected && (
                  <div className="relative z-10 p-6 rounded-[2rem] border border-rose-500/25 bg-rose-50/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 shrink-0">
                        <span className="material-symbols-outlined text-2xl text-rose-500">cancel</span>
                      </div>
                      <div className="space-y-1 text-left">
                        <h4 className="font-headline font-black text-sm text-[#E82E32] uppercase tracking-wider">Payment Verification Failed</h4>
                        <p className="text-xs text-[#1a1a2e]/60 font-medium">
                          Your details for Order ID <span className="font-black text-[#E82E32]">{paymentStatus.rejectedDetails?.orderId}</span> were rejected. Please check your UTR number or upload a valid screenshot.
                        </p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-rose-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest font-mono shadow-md">
                      Rejected
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {/* Half Fee Card */}
                  <div className="glass-premium p-8 rounded-[2.5rem] border-2 border-primary/20 hover:border-primary/45 transition-all duration-300 relative overflow-hidden group shadow-md flex flex-col justify-between h-full bg-white/80 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-primary/10 border-b border-l border-primary/20 rounded-bl-2xl text-[8px] font-black font-mono text-primary uppercase tracking-widest">
                      Installment Plan
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                          <span className="material-symbols-outlined text-2xl">event_repeat</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-headline font-black text-[#1a1a2e] uppercase tracking-tight">Implant Training Program 2026</h4>
                          <span style={{ backgroundColor: 'rgba(225, 27, 34, 0.1)', color: '#E11B22', borderColor: 'rgba(225, 27, 34, 0.2)' }} className="px-2.5 py-0.5 border rounded-full text-[9px] font-black font-mono uppercase tracking-widest mt-1 inline-block">Half Fee Enrollment</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#1a1a2e]/60 leading-relaxed font-light font-body pt-2">
                        Get started with the official Implant Training Program by paying half of the course fee. Secure your batch slot and access phase 1 curriculum modules, live sessions, and hardware simulator workspaces. Remaining balance can be cleared mid-program.
                      </p>
                      <div className="pt-4">
                        <div className="text-3xl font-black font-mono text-primary">₹3,000</div>
                        <div className="text-[9px] font-mono text-[#1a1a2e]/30 uppercase tracking-widest mt-0.5">One-time registration installment</div>
                      </div>
                    </div>
                    <div className="pt-6 mt-8 border-t border-black/5">
                      <button 
                        onClick={() => {
                          setCheckoutItem({
                            name: "Implant Training Program 2026 (Half Fee)",
                            price: 3000,
                            category: "Training Program",
                            image: "/products/product_15.jpeg"
                          });
                          setIsCheckoutOpen(true);
                        }}
                        disabled={paymentStatus.pending || paymentStatus.enrolled}
                        style={{ color: '#E11B22' }}
                        className="w-full border-2 border-primary bg-transparent hover:bg-primary/5 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01] disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <span className="material-symbols-outlined text-sm">payments</span>
                        Pay Half Fee (₹3,000)
                      </button>
                    </div>
                  </div>

                  {/* Full Fee Card */}
                  <div className="glass-premium p-8 rounded-[2.5rem] border-2 border-primary/40 hover:border-primary/75 transition-all duration-300 relative overflow-hidden group shadow-md flex flex-col justify-between h-full bg-white/80 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-primary text-white rounded-bl-2xl text-[8px] font-black font-mono uppercase tracking-widest shadow-md">
                      Best Value / Full Access
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
                          <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-headline font-black text-[#1a1a2e] uppercase tracking-tight">Implant Training Program 2026</h4>
                          <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black font-mono text-emerald-600 uppercase tracking-widest mt-1 inline-block">Full Fee Enrollment</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#1a1a2e]/60 leading-relaxed font-light font-body pt-2">
                        Get full, unrestricted lifetime access to the complete Implant Training Program. Covers all advanced AI/Robotics curriculum phases, physical hardware development kits, certified program completions, priority doubt solving, and job placement assistance channels.
                      </p>
                      <div className="pt-4">
                        <div className="text-3xl font-black font-mono text-primary">₹6,000</div>
                        <div className="text-[9px] font-mono text-[#1a1a2e]/30 uppercase tracking-widest mt-0.5">Complete program fee coverage</div>
                      </div>
                    </div>
                    <div className="pt-6 mt-8 border-t border-black/5">
                      <button 
                        onClick={() => {
                          setCheckoutItem({
                            name: "Implant Training Program 2026 (Full Fee)",
                            price: 6000,
                            category: "Training Program",
                            image: "/products/product_15.jpeg"
                          });
                          setIsCheckoutOpen(true);
                        }}
                        disabled={paymentStatus.pending || paymentStatus.enrolled}
                        style={{ color: '#1a1a2e' }}
                        className="w-full bg-primary hover:bg-[#eb0028]/95 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01] glow-red disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <span className="material-symbols-outlined text-sm">payments</span>
                        Pay Full Fee (₹6,000)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

               {/* Free Training Courses Section (Full Width, 4 columns) */}
               <div className="space-y-6 mb-16 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
                  <h3 className="text-xl font-headline font-black text-[#1a1a2e] uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
                    Free E-Learning & Certifications
                  </h3>
                  <button 
                    onClick={() => setIsCertModalOpen(true)}
                    className="px-5 py-2.5 bg-primary hover:bg-[#eb0028]/95 text-[#1a1a2e] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl text-xs font-black uppercase tracking-widest font-mono flex items-center gap-2 shadow-md hover:shadow-lg self-start sm:self-auto cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm text-[#1a1a2e]">workspace_premium</span>
                    View Sample Certificate
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Introduction to Autonomous Drones",
                      duration: "6 Weeks",
                      level: "Beginner",
                      icon: "flight_takeoff",
                      desc: "Learn automated flight telemetry, ArduPilot configuration, and payload control using Python scripting.",
                      students: "1,450+ Enrolled"
                    },
                    {
                      title: "Edge AI & ROS2 Industrial Robotics",
                      duration: "8 Weeks",
                      level: "Intermediate",
                      icon: "precision_manufacturing",
                      desc: "Develop neural-network controllers for microcontrollers and design simulation workspaces using ROS2.",
                      students: "980+ Enrolled"
                    },
                    {
                      title: "IoT Wireless Sensor Mesh Networks",
                      duration: "4 Weeks",
                      level: "Beginner",
                      icon: "sensors",
                      desc: "Deploy smart agricultural telemetry mesh networks using ESP32 nodes and custom cloud dashboards.",
                      students: "2,100+ Enrolled"
                    },
                    {
                      title: "Embedded Systems & Firmware Dev",
                      duration: "5 Weeks",
                      level: "Advanced",
                      icon: "memory",
                      desc: "Master low-level C programming, real-time operating systems (RTOS), and hardware debugging interfaces.",
                      students: "850+ Enrolled"
                    }
                  ].map((course, idx) => (
                    <div key={idx} className="glass-premium p-6 rounded-[2rem] border border-black/5 hover:border-primary/25 transition-all duration-300 relative overflow-hidden group shadow-sm flex flex-col justify-between h-full">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="px-2.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-[9px] font-black font-mono text-green-600 uppercase tracking-widest">Free Course</span>
                          <div className="flex items-center gap-1 text-[9px] font-mono text-[#1a1a2e]/30 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[11px] text-primary">group</span>
                            <span>{course.students}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                            <span className="material-symbols-outlined text-xl">{course.icon}</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-headline font-bold text-[#1a1a2e] uppercase tracking-tight line-clamp-2 leading-snug">{course.title}</h4>
                            <div className="flex gap-2 font-mono text-[8px] text-[#1a1a2e]/40 uppercase tracking-wider mt-0.5">
                              <span>{course.duration}</span>
                              <span>•</span>
                              <span>{course.level}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs text-[#1a1a2e]/50 leading-relaxed font-light font-body pt-1">{course.desc}</p>
                      </div>
                      
                      <div className="pt-4 mt-6 border-t border-black/5 flex justify-between items-center">
                        <span className="text-[9px] font-mono text-[#1a1a2e]/30 uppercase tracking-wider">Self-Paced / Online</span>
                        <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:text-primary/80 transition-colors uppercase tracking-widest font-mono">
                          Start Learning
                          <span className="material-symbols-outlined text-[11px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* COLUMN 1: COMPETITIONS REGISTRATION (Left, 8 spans) */}
                <div className="lg:col-span-8 space-y-6">
                  <h3 className="text-xl font-headline font-black text-[#1a1a2e] uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">emoji_events</span>
                    Active Engineering Competitions
                  </h3>
                  <div className="glass-premium rounded-[2rem] border border-black/5 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto max-h-[650px] overflow-y-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                        <thead>
                          <tr className="border-b border-slate-300 bg-slate-100 font-sans text-[10px] text-slate-700 uppercase tracking-wider sticky top-0 z-10">
                            <th className="py-3 px-4 font-bold border-r border-slate-200">Program / Description</th>
                            <th className="py-3 px-4 font-bold border-r border-slate-200">Organized By</th>
                            <th className="py-3 px-4 font-bold border-r border-slate-200 text-center">Timeline / Dates</th>
                            <th className="py-3 px-4 font-bold border-r border-slate-200">Eligibility</th>
                            <th className="py-3 px-4 font-bold text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {[
                            {
                              id: "atl-marathon",
                              title: "ATL Marathon",
                              eligibility: "ATL School Students",
                              desc: "National level technology and innovation competition focusing on AI, Robotics, and STEM solutions. Benefits include national recognition and mentoring.",
                              organizedBy: "NITI Aayog",
                              level: "National",
                              timeline: "July – December",
                              link: "https://aim.gov.in/atl.php"
                            },
                            {
                              id: "sih-junior",
                              title: "Smart India Hackathon Junior",
                              eligibility: "School Students",
                              desc: "National digital product building competition for solving pressing real-life problems of government departments and ministries.",
                              organizedBy: "Government of India",
                              level: "National",
                              timeline: "August – September",
                              link: "https://www.sih.gov.in/"
                            },
                            {
                              id: "inspire-manak",
                              title: "INSPIRE Awards MANAK",
                              eligibility: "Class 6–10 Students",
                              desc: "STEM innovation scheme to foster creative thinking and original ideas in science and societal applications.",
                              organizedBy: "DST Govt. of India",
                              level: "National",
                              timeline: "June – September",
                              link: "https://www.inspireawards-dst.gov.in/"
                            },
                            {
                              id: "ignite-awards",
                              title: "Dr APJ Abdul Kalam IGNITE Awards",
                              eligibility: "School Students",
                              desc: "National competition seeking original technological ideas and innovations from children up to class 12.",
                              organizedBy: "NIF + DST",
                              level: "National",
                              timeline: "March – August",
                              link: "https://nif.org.in/ignite"
                            },
                            {
                              id: "nasa-space-apps",
                              title: "NASA Space Apps Challenge",
                              eligibility: "Open Students / Tech Teams",
                              desc: "Global hackathon where teams use NASA's open data to build solutions for real-world space and Earth challenges.",
                              organizedBy: "NASA",
                              level: "Global",
                              timeline: "July – October",
                              link: "https://www.spaceappschallenge.org/"
                            },
                            {
                              id: "samsung-solve",
                              title: "Samsung Solve for Tomorrow",
                              eligibility: "Youth Aged 14–22 Years",
                              desc: "STEM innovation competition encouraging young minds to build technology ideas addressing social and community issues.",
                              organizedBy: "Samsung India",
                              level: "National",
                              timeline: "May – July",
                              link: "https://www.samsung.com/in/solvefortomorrow/"
                            },
                            {
                              id: "vivo-ignite",
                              title: "Vivo Ignite Technology Initiative",
                              eligibility: "Class 8–12 Students",
                              desc: "Platform designed to promote scientific reasoning and technological innovation among secondary school students.",
                              organizedBy: "Vivo India",
                              level: "National",
                              timeline: "April – June",
                              link: "https://www.vivoignite.com/"
                            },
                            {
                              id: "codeavour",
                              title: "Codeavour International",
                              eligibility: "K–12 Students",
                              desc: "International AI, coding, and robotics competition that challenges students to build smart automation projects.",
                              organizedBy: "STEMpedia",
                              level: "International",
                              timeline: "September – December",
                              link: "https://codeavour.org/"
                            },
                            {
                              id: "cbse-ai",
                              title: "CBSE AI Hackathon",
                              eligibility: "CBSE School Students",
                              desc: "Competitive platform encouraging students to apply Artificial Intelligence algorithms to solve real-world problems.",
                              organizedBy: "CBSE",
                              level: "National",
                              timeline: "October – November",
                              link: "https://cbseacademic.nic.in/"
                            },
                            {
                              id: "toycathon",
                              title: "Toycathon",
                              eligibility: "School & College Students",
                              desc: "Innovative challenge targeting IoT and indigenous game conceptualization to revive cultural toys and tech designs.",
                              organizedBy: "Ministry of Education",
                              level: "National",
                              timeline: "November – December",
                              link: "https://toycathon.mic.gov.in/"
                            },
                            {
                              id: "futurex-ai",
                              title: "FutureX AI Challenge",
                              eligibility: "Grade 6–12 Students",
                              desc: "Emerging tech challenge focusing on AI & IoT implementations to solve daily lifestyle and environmental concerns.",
                              organizedBy: "Wonder Minds",
                              level: "National",
                              timeline: "September – November",
                              link: "https://aim.gov.in/"
                            },
                            {
                              id: "robocraze-stem",
                              title: "Robocraze STEM-A-Thon",
                              eligibility: "School Students",
                              desc: "Focused STEM and Robotics showcase challenge where young innovators present automated mechanical models.",
                              organizedBy: "Robocraze + Pludo",
                              level: "National",
                              timeline: "November – December",
                              link: "https://robocraze.com/"
                            },
                            {
                              id: "atl-challenges",
                              title: "Atal Tinkering Lab Challenges",
                              eligibility: "ATL School Affiliates",
                              desc: "Sectoral challenges spanning robotics, IoT, and green tech designed to promote an active innovation ecosystem.",
                              organizedBy: "NITI Aayog",
                              level: "National",
                              timeline: "Year-Round",
                              link: "https://aim.gov.in/"
                            },
                            {
                              id: "astp-olympiad",
                              title: "ASTP National Science Talent Olympiad",
                              eligibility: "Class 6–10 Students",
                              desc: "Rigorous academic examination and practical showcase evaluating advanced STEM knowledge.",
                              organizedBy: "ASTP India",
                              level: "National",
                              timeline: "November – January",
                              link: "https://astp.in/"
                            },
                            {
                              id: "vvm-science",
                              title: "Vidyarthi Vigyan Manthan (VVM)",
                              eligibility: "Class 6–11 Students",
                              desc: "National talent search program aimed at identifying and nurturing students with a keen interest in science.",
                              organizedBy: "Vigyan Prasar",
                              level: "National",
                              timeline: "August – October",
                              link: "https://vvm.org.in/"
                            },
                            {
                              id: "reliance-scholarship",
                              title: "Reliance Foundation Scholarships",
                              eligibility: "School & College Students",
                              desc: "Prestigious funding opportunity supporting students pursuing STEM and technology-based courses.",
                              organizedBy: "Reliance Foundation",
                              level: "National",
                              timeline: "August – October",
                              link: "https://www.scholarships.reliancefoundation.org/"
                            },
                            {
                              id: "hdfc-parivartan",
                              title: "HDFC Bank Parivartan Scholarship",
                              eligibility: "Underprivileged School Students",
                              desc: "Education support scheme ensuring access to smart learning and tech toolkits for meritorious students.",
                              organizedBy: "HDFC Bank",
                              level: "National",
                              timeline: "December – January",
                              link: "https://www.buddy4study.com/page/hdfc-educational-crisis-scholarship-support-ecss"
                            },
                            {
                              id: "icici-programs",
                              title: "ICICI Foundation Digital Skill Programs",
                              eligibility: "Students & Associated Schools",
                              desc: "Vocational and digital literacy training initiatives utilizing high-tech simulation packages.",
                              organizedBy: "ICICI Bank",
                              level: "National",
                              timeline: "Year-Round",
                              link: "https://www.icicifoundation.org/"
                            },
                            {
                              id: "tata-building-india",
                              title: "Tata Building India Competition",
                              eligibility: "School Students",
                              desc: "Prestigious essay and concept competition focused on nation-building topics and community tech solutions.",
                              organizedBy: "Tata Group",
                              level: "National",
                              timeline: "August – December",
                              link: "https://www.tatabuildingindia.com/"
                            },
                            {
                              id: "siemens-scholarship",
                              title: "Siemens Scholarship Program",
                              eligibility: "Engineering & STEM Students",
                              desc: "Scholarship program for first-year engineering students, offering tuition fees, books, and laptops.",
                              organizedBy: "Siemens India",
                              level: "National",
                              timeline: "July – August",
                              link: "https://www.siemens.co.in/about-us/corporate-citizenship/siemens-scholarship-program.html"
                            },
                            {
                              id: "iet-scholarship",
                              title: "IET India Scholarship Award",
                              eligibility: "Technology Pathway Students",
                              desc: "National award recognizing tech-based vision, excellence, and creative leadership in engineering.",
                              organizedBy: "IET India",
                              level: "National",
                              timeline: "June – August",
                              link: "https://scholarships.theiet.in/"
                            }
                          ].map((comp) => (
                            <tr key={comp.id} className="hover:bg-slate-50/80 even:bg-slate-50/30 transition-colors group">
                               <td className="py-5 px-5 align-top border-r border-slate-200">
                                 <div className="font-sans font-black text-slate-800 text-xs uppercase tracking-tight group-hover:text-primary transition-colors">{comp.title}</div>
                                 <div className="text-[11px] text-slate-500 mt-1 max-w-sm font-light leading-relaxed font-sans">{comp.desc}</div>
                               </td>
                               <td className="py-5 px-5 align-top border-r border-slate-200">
                                 <div className="font-sans font-bold text-slate-700 text-[10px] uppercase tracking-wide">{comp.organizedBy}</div>
                                 <div className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase tracking-wide">{comp.level}</div>
                               </td>
                               <td className="py-5 px-5 align-top border-r border-slate-200 text-center">
                                 <span 
                                   className="inline-block px-2.5 py-1 rounded-md text-[9px] font-black font-mono uppercase tracking-wide whitespace-nowrap border"
                                   style={{
                                     backgroundColor: "rgba(235, 0, 40, 0.08)",
                                     borderColor: "rgba(235, 0, 40, 0.25)",
                                     color: "#EB0028"
                                   }}
                                 >
                                   {comp.timeline}
                                 </span>
                               </td>
                               <td className="py-5 px-5 align-top border-r border-slate-200 whitespace-nowrap">
                                 <span className="inline-block px-2.5 py-1 bg-slate-100 border border-slate-300 rounded-md text-[9px] font-bold font-sans text-slate-800 uppercase tracking-wider">
                                   {comp.eligibility}
                                 </span>
                               </td>
                               <td className="py-5 px-5 text-center align-middle">
                                 <a 
                                   href={comp.link}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-white hover:bg-primary/95 rounded-xl transition-all duration-300 text-[10px] font-black uppercase tracking-wider font-mono shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                                   style={{ color: "#ffffff" }}
                                 >
                                   <span>Register</span>
                                   <span className="material-symbols-outlined text-[12px] shrink-0">open_in_new</span>
                                 </a>
                               </td>
                             </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: AIR G APP SHOWCASE (Right, 4 spans) */}
                <div className="lg:col-span-4 space-y-6 lg:pl-4">
                  <h3 className="text-xl font-headline font-black text-[#1a1a2e] uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">smartphone</span>
                    AIR G Learning App
                  </h3>

                  <div className="glass-premium p-8 rounded-[3rem] border border-black/5 flex flex-col items-center gap-8 shadow-sm">
                    {/* Device Mockup */}
                    <div className="relative w-64 aspect-[9/18] bg-black rounded-[2.5rem] p-3 shadow-2xl border-4 border-black/10 select-none overflow-hidden group">
                      {/* Notch */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-xl z-20 flex items-center justify-center">
                        <span className="w-2.5 h-2.5 bg-primary/45 rounded-full animate-pulse"></span>
                      </div>
                      
                      {/* Screen Content - EXACT DEMO APP INTERFACE */}
                      <div className="relative w-full h-full bg-[#f8fafc] rounded-[2rem] overflow-hidden p-3 flex flex-col">
                        {/* Status bar */}
                        <div className="flex justify-between items-center text-[7px] font-bold text-[#1a1a2e]/50 font-mono pt-1 pb-1 px-1 border-b border-black/5 bg-[#f8fafc] shrink-0">
                          <span>09:41 AM</span>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[8px] text-green-600">wifi</span>
                            <span>AIG_MESH_04</span>
                          </div>
                        </div>

                        {/* App Header (Sticky) */}
                        <div className="flex justify-between items-center py-2 px-1 bg-white border-b border-black/5 shrink-0">
                          <div className="flex items-center gap-0.5 text-[9px] font-black font-headline tracking-tighter">
                            <span className="text-[#1a1a2e]">AIR G</span>
                            <span className="text-primary font-black uppercase">INTERNATIONAL</span>
                          </div>
                          <span className="material-symbols-outlined text-[10px] text-amber-500 font-bold">emoji_events</span>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-grow overflow-y-auto custom-scrollbar p-1.5 space-y-4">
                          
                          {/* Hero Section */}
                          <div className="text-center py-3 px-1 space-y-2 bg-white rounded-xl border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-primary/10 rounded-full shadow-sm mx-auto">
                              <span className="material-symbols-outlined text-[7px] text-primary">auto_awesome</span>
                              <span className="text-[6.5px] font-bold text-[#1a1a2e]/80 uppercase tracking-widest font-mono">The Challenge Zone</span>
                            </div>
                            
                            <h4 className="text-[12px] font-black leading-tight text-[#1e293b] uppercase font-headline">
                              Prove Your <span className="text-primary italic font-serif lowercase">skills</span>
                            </h4>
                            
                            <p className="text-[7px] text-slate-500 max-w-[150px] mx-auto leading-relaxed">
                              Level up by completing quizzes and practicing your code! 🏆
                            </p>
                          </div>

                          {/* Choose Your Path Header */}
                          <div className="flex items-center gap-1.5 px-0.5">
                            <span className="material-symbols-outlined text-[10px] text-primary">psychology</span>
                            <span className="text-[8px] font-black text-[#1e293b] uppercase tracking-wider font-headline">Choose Your Path</span>
                          </div>

                          {/* Challenge Cards Grid */}
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { title: "AI Super Quiz", stats: "15 Questions", color: "bg-blue-500/10 text-blue-500", icon: "psychology" },
                              { title: "Coding Quest", stats: "Select Lang", color: "bg-amber-500/10 text-amber-500", icon: "bolt" },
                              { title: "Daily Problem", stats: "Daily Problem", color: "bg-emerald-500/10 text-emerald-500", icon: "calendar_today" },
                              { title: "1v1 Battles", stats: "Live Match", color: "bg-rose-500/10 text-rose-500", icon: "swords" },
                              { title: "Timed Tests", stats: "12 Questions", color: "bg-orange-500/10 text-orange-500", icon: "timer" },
                              { title: "Tournaments", stats: "Coding Champ", color: "bg-violet-500/10 text-violet-500", icon: "emoji_events" }
                            ].map((item, idx) => (
                              <div key={idx} className="bg-white p-2 rounded-lg border border-black/5 flex flex-col justify-between h-[68px] hover:border-primary/20 transition-all shadow-[0_2px_6px_rgba(0,0,0,0.01)]">
                                <div className="flex items-start justify-between">
                                  <div className={`p-1 rounded-md ${item.color} flex items-center justify-center shrink-0`}>
                                    <span className="material-symbols-outlined text-[9px] font-bold">{item.icon}</span>
                                  </div>
                                </div>
                                <div className="mt-1.5">
                                  <div className="text-[7.5px] font-black text-[#1e293b] uppercase tracking-tight truncate">{item.title}</div>
                                  <div className="flex justify-between items-center text-[5.5px] text-slate-400 font-mono mt-1">
                                    <span>{item.stats}</span>
                                    <span className="text-primary font-bold flex items-center gap-0.5">Start<span className="material-symbols-outlined text-[5px]">chevron_right</span></span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Code Playground Section Header */}
                          <div className="flex items-center gap-1.5 px-0.5 pt-1">
                            <span className="material-symbols-outlined text-[10px] text-primary">code</span>
                            <span className="text-[8px] font-black text-[#1e293b] uppercase tracking-wider font-headline">Code Playground</span>
                          </div>

                          {/* Code Playground Card */}
                          <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-black/10 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col">
                            {/* IDE Header */}
                            <div className="bg-[#1e293b] px-2.5 py-1.5 flex justify-between items-center border-b border-white/5">
                              <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[8px] text-blue-400">code</span>
                                <span className="text-[6px] font-mono text-white/70">magic_playground.py</span>
                              </div>
                              <div className="bg-emerald-500 px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                                <span className="material-symbols-outlined text-[6px] text-white">play_arrow</span>
                                <span className="text-[5px] text-white font-bold uppercase tracking-wider">Run</span>
                              </div>
                            </div>
                            {/* IDE Body */}
                            <div className="p-2 space-y-1.5 font-mono text-[5.5px] leading-tight text-white/90">
                              <div>
                                <span className="text-blue-400">print</span>
                                <span className="text-white">(</span>
                                <span className="text-amber-300">"Hello World!"</span>
                                <span className="text-white">)</span>
                              </div>
                              <div className="text-white/30 font-mono text-[5.5px]"># Type your code here...</div>
                              <div className="border-t border-white/5 pt-1.5 mt-1 text-white/40 font-mono text-[5px]">
                                // Result will output here
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* App Description & Download Redirect */}
                    <div className="space-y-4 text-center">
                      <p className="text-xs text-[#1a1a2e]/50 leading-relaxed font-light max-w-xs">
                        The AIR G Learning app provides high-fidelity simulated test beds, live lab telemetry sensors, and automated enrollment sync for institutional courses.
                      </p>
                      
                      <a 
                        href="https://gurujiair.com/app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-primary text-white py-4 px-8 rounded-2xl font-bold uppercase tracking-widest glow-red text-xs hover:scale-[1.03] transition-all flex items-center justify-center gap-3 shadow-lg"
                      >
                        <span>Download AIR G App</span>
                        <span className="material-symbols-outlined text-sm">download</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COMPETITION REGISTRATION MODAL */}
            <AnimatePresence>
              {selectedComp && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedComp(null)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-[130]"
                  />
                  <div className="fixed inset-0 overflow-y-auto z-[140] flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      className="w-full max-w-lg bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-2xl flex flex-col relative"
                    >
                      {/* Header */}
                      <div className="p-8 border-b border-black/5 flex items-center justify-between">
                        <div>
                          <h3 className="font-headline text-2xl font-black uppercase text-[#1a1a2e]">Competition Entry</h3>
                          <p className="text-xs text-primary font-mono uppercase mt-1 tracking-wider">Register student node</p>
                        </div>
                        <button 
                          onClick={() => setSelectedComp(null)}
                          className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/10 transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-8 space-y-6">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs font-bold text-primary font-mono uppercase tracking-wider">
                          Event: {selectedComp}
                        </div>

                        {isSubmittingComp ? (
                          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                              <div className="absolute inset-0 rounded-full border-4 border-black/5" />
                              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                            </div>
                            <h4 className="font-headline text-sm font-bold uppercase text-[#1a1a2e] tracking-widest animate-pulse">Syncing Lab Credentials...</h4>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <label className="text-[9px] uppercase font-bold tracking-widest text-[#1a1a2e]/50 block mb-1">Full Name</label>
                              <input 
                                type="text" 
                                value={compName}
                                onChange={(e) => setCompName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-primary text-sm transition-all" 
                                placeholder="e.g. Rahul Sharma" 
                              />
                            </div>
                            <div>
                              <label className="text-[9px] uppercase font-bold tracking-widest text-[#1a1a2e]/50 block mb-1">Email Address</label>
                              <input 
                                type="email" 
                                value={compEmail}
                                onChange={(e) => setCompEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-primary text-sm transition-all" 
                                placeholder="e.g. rahul@airg.com" 
                              />
                            </div>
                            <div>
                              <label className="text-[9px] uppercase font-bold tracking-widest text-[#1a1a2e]/50 block mb-1">Institution / Research Lab</label>
                              <input 
                                type="text" 
                                value={compInst}
                                onChange={(e) => setCompInst(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-primary text-sm transition-all" 
                                placeholder="e.g. Satara Mesh Node Hub #04" 
                              />
                            </div>

                            <button 
                              onClick={() => {
                                if (!compName || !compEmail || !compInst) {
                                  alert("Please fill in all entry credentials to register.");
                                  return;
                                }
                                setIsSubmittingComp(true);
                                setTimeout(() => {
                                  setIsSubmittingComp(false);
                                  setSelectedComp(null);
                                  
                                  // Clear states
                                  setCompName("");
                                  setCompEmail("");
                                  setCompInst("");
                                  
                                  // Success notify
                                  if (typeof window !== "undefined") {
                                    alert("Registration successful! Your node has been synced with the event registry.");
                                  }
                                }, 2500);
                              }}
                              className="w-full bg-[#1a1a2e] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all flex items-center justify-center gap-2 mt-6 shadow-md"
                            >
                              <span>Submit Registration Entry</span>
                              <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
      <CertificateModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} />
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToBag={(prod) => addToCart(prod)} 
      />

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-black/5 shadow-2xl z-[120] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
                  <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-[#1a1a2e]">Your Bag</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/10 transition-all"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <span className="material-symbols-outlined text-[#1a1a2e]/10 text-6xl">shopping_bag</span>
                    <p className="text-[#1a1a2e]/40 font-light text-sm">Your bag is empty.</p>
                    <button 
                      onClick={() => {
                        navigateTo('store');
                        setIsCartOpen(false);
                      }}
                      className="px-6 py-2 border border-primary text-primary text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
                    >
                      Browse Store
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.name} className="flex gap-4 p-4 rounded-2xl bg-black/5 border border-black/5 relative group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/10 flex-shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-headline text-sm font-bold uppercase text-[#1a1a2e] line-clamp-1">{item.name}</h4>
                          <span className="text-[10px] uppercase font-bold text-[#1a1a2e]/40 tracking-wider font-mono">{item.tag}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-primary font-bold text-sm font-mono">{item.price}</span>
                          <div className="flex items-center gap-2 border border-black/10 rounded-lg p-1 bg-white">
                            <button 
                              onClick={() => updateQuantity(item.name, -1)}
                              className="w-6 h-6 flex items-center justify-center text-[#1a1a2e]/60 hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-xs">remove</span>
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.name, 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#1a1a2e]/60 hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-xs">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.name)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#1a1a2e]/30 hover:text-primary w-6 h-6 flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-black/5 bg-black/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest text-[#1a1a2e]/60 font-bold">Total Amount</span>
                    <span className="text-xl font-black text-primary font-mono">₹{getCartTotal().toLocaleString('en-IN')}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setCheckoutStep('details');
                    }}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest glow-red text-xs hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCheckoutItem(null);
        }}
        item={checkoutItem || {
          name: cart.map(i => `${i.name} (x${i.quantity})`).join(", "),
          price: getCartTotal(),
          category: "Store Cart"
        }}
        type={checkoutItem?.category === "Training Program" ? "plan" : "product"}
        onSuccess={(orderId, shippingDetails) => {
          const isTraining = checkoutItem?.category === "Training Program";
          const orderTotal = isTraining 
            ? (typeof checkoutItem.price === 'string' ? parseInt(checkoutItem.price.replace(/[^\d]/g, '')) || 0 : checkoutItem.price)
            : getCartTotal();
          
          recordTransaction(
            orderTotal, 
            'debit', 
            isTraining ? `${checkoutItem.name} Registration` : `Store Purchase (${cart.map(i => i.name).slice(0, 2).join(', ')}${cart.length > 2 ? '...' : ''})`, 
            'WALLET'
          );

          const newOrder = {
            id: orderId,
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            items: isTraining 
              ? [{ name: checkoutItem.name, price: `₹${orderTotal}`, quantity: 1 }]
              : cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })),
            total: orderTotal,
            status: isTraining ? 'Access Granted' : 'Shipped via AIG Logistics'
          };

          setOrders(prev => {
            const updated = [newOrder, ...prev];
            const ordersKey = user ? `aig_orders_${user.email}` : "aig_orders";
            localStorage.setItem(ordersKey, JSON.stringify(updated));
            return updated;
          });

          setUserProfile(prev => ({
            ...prev,
            walletBalance: prev.walletBalance - orderTotal
          }));

          if (!isTraining) {
            setCart([]);
          }
          setCheckoutItem(null);
          fetchPaymentStatus();
        }}
      />

      {/* ORDER HISTORY / TRACK ORDERS MODAL */}
      <AnimatePresence>
        {isOrdersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOrdersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[130]"
            />
            {/* Modal Container */}
            <div className="fixed inset-0 overflow-y-auto z-[140] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-2xl flex flex-col relative max-h-[85vh]"
              >
                {/* Header */}
                <div className="p-8 border-b border-black/5 flex items-center justify-between flex-shrink-0">
                  <div>
                    <h3 className="font-headline text-2xl font-black uppercase text-[#1a1a2e]">Order History</h3>
                    <p className="text-xs text-[#1a1a2e]/40 font-mono uppercase mt-1 tracking-wider">Track your tactical shipments</p>
                  </div>
                  <button 
                    onClick={() => setIsOrdersOpen(false)}
                    className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-grow custom-scrollbar space-y-6">
                  {orders.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                      <span className="material-symbols-outlined text-[#1a1a2e]/10 text-6xl">receipt_long</span>
                      <h4 className="font-headline text-base font-bold uppercase text-[#1a1a2e]/60">No Orders Found</h4>
                      <p className="text-xs text-[#1a1a2e]/40 max-w-xs font-light">You haven't placed any orders yet. Head to the Store section to purchase official merchandise.</p>
                      <button
                        onClick={() => {
                          setIsOrdersOpen(false);
                          navigateTo('store');
                        }}
                        className="px-6 py-2 bg-primary text-white text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-primary/95 transition-all"
                      >
                        Visit Store
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="p-6 rounded-[2rem] bg-black/5 border border-black/5 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/5 pb-4 gap-2">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-[#1a1a2e]/40 font-mono block">Order ID</span>
                              <span className="text-sm font-bold text-[#1a1a2e] font-mono">{order.id}</span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-[#1a1a2e]/40 font-mono block">Date Placed</span>
                              <span className="text-xs text-[#1a1a2e]/70 font-mono">{order.date}</span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-[#1a1a2e]/40 font-mono block">Total Amount</span>
                              <span className="text-sm font-bold text-primary font-mono">₹{order.total.toLocaleString('en-IN')}</span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-[#1a1a2e]/40 font-mono block">Status</span>
                              <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-full">{order.status}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] uppercase font-bold text-[#1a1a2e]/40 tracking-wider">Purchased Items</span>
                            <div className="grid gap-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-white border border-black/5 font-mono">
                                  <span className="text-[#1a1a2e] font-bold uppercase">{item.name} <span className="text-primary font-normal">x{item.quantity}</span></span>
                                  <span className="text-[#1a1a2e]/60">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* USER PROFILE MODAL */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[130]"
            />
            {/* Modal Container */}
            <div className="fixed inset-0 overflow-y-auto z-[140] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-xl bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-2xl flex flex-col relative max-h-[85vh]"
              >
                {/* Header */}
                <div className="p-8 border-b border-black/5 flex items-center justify-between flex-shrink-0">
                  <div>
                    <h3 className="font-headline text-2xl font-black uppercase text-[#1a1a2e]">Developer Profile</h3>
                    <p className="text-xs text-[#1a1a2e]/40 font-mono uppercase mt-1 tracking-wider">AIR G Portal</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="px-4 py-2 border border-red-500/20 hover:border-red-500 text-red-600 bg-red-500/5 hover:bg-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      Logout
                    </button>
                    <button 
                      onClick={() => setIsProfileOpen(false)}
                      className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/10 transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-grow custom-scrollbar space-y-8">
                  {/* User Profile Info Card */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-black/5 border border-black/5">
                    <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-black shadow-lg relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 animate-pulse"></div>
                      <span>
                        {userProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                        <h4 className="font-headline text-lg font-bold text-[#1a1a2e] uppercase">{userProfile.name}</h4>
                        <span className="px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-[8px] font-black text-primary uppercase tracking-widest">{userProfile.role}</span>
                      </div>
                      <p className="text-xs text-[#1a1a2e]/60 font-mono">{userProfile.email}</p>
                      <p className="text-[10px] text-[#1a1a2e]/40 font-mono uppercase tracking-wider">Member Since: {userProfile.memberSince}</p>
                    </div>
                  </div>

                  {/* Wallet Balance Card */}
                  <div className="p-6 rounded-[2rem] bg-[#1a1a2e] text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block font-mono">Mock Wallet Balance</span>
                        <span className="text-3xl font-black text-primary font-mono tracking-tight">₹{userProfile.walletBalance.toLocaleString('en-IN')}</span>
                        <span className="text-[9px] block text-white/40 font-mono uppercase tracking-wide">Ready for store transactions</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-white/50 block font-mono text-center sm:text-left">Add Mock Funds</span>
                        <div className="flex gap-2">
                          {[1000, 5000, 10000].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => {
                                setPendingTopUpAmount(amt);
                                setTopUpPaymentStep('options');
                                setIsTopUpPaymentOpen(true);
                              }}
                              className="px-3 py-2 bg-white/10 hover:bg-primary hover:text-[#1a1a2e] border border-white/5 hover:border-primary rounded-xl text-[10px] font-black font-mono transition-all"
                            >
                              +₹{amt.toLocaleString('en-IN')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dedicated App Download Link */}
                  <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 flex items-center justify-between gap-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(235,0,40,0.15)]">
                        <span className="material-symbols-outlined text-2xl text-primary">rocket_launch</span>
                      </div>
                      <div>
                        <h5 className="font-headline text-xs font-bold text-white uppercase tracking-wider">AIR G App (v2.0)</h5>
                        <p className="text-[10px] text-slate-400 font-mono">Download the official client terminal</p>
                      </div>
                    </div>
                    <a 
                      href="https://gurujiair.com/app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary text-slate-300 hover:text-white text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-primary transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>Download</span>
                      <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                    </a>
                  </div>

                  {/* Transaction & Payment History */}
                  <div className="space-y-4">
                    <h4 className="font-headline text-sm font-bold uppercase text-[#1a1a2e]/80 tracking-wider">Transaction History ({transactions.length})</h4>
                    {transactions.length === 0 ? (
                      <div className="p-8 text-center rounded-2xl border border-dashed border-black/10 text-[#1a1a2e]/40 text-xs">
                        No transactions or recharges recorded.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                        {transactions.map((tx) => (
                          <div key={tx.id} className="p-4 rounded-2xl bg-black/5 border border-black/5 flex justify-between items-center text-xs">
                            <div className="space-y-1">
                              <span className="font-mono font-bold text-[#1a1a2e] block">{tx.description}</span>
                              <div className="flex gap-2 text-[9px] text-[#1a1a2e]/40 font-mono">
                                <span>{tx.id}</span>
                                <span>•</span>
                                <span>{tx.date}</span>
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <span className={`font-mono font-bold block ${tx.type === 'credit' ? 'text-green-600' : 'text-[#E82E32]'}`}>
                                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[8px] bg-slate-900/5 text-[#1a1a2e]/60 font-bold uppercase px-2 py-0.5 rounded-full">{tx.method}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Orders inside Profile */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-headline text-sm font-bold uppercase text-[#1a1a2e]/80 tracking-wider">My Recent Orders ({orders.length})</h4>
                      {orders.length > 0 && (
                        <button 
                          onClick={() => {
                            setIsProfileOpen(false);
                            setIsOrdersOpen(true);
                          }}
                          className="text-xs text-primary font-bold hover:underline"
                        >
                          View Full History
                        </button>
                      )}
                    </div>
                    {orders.length === 0 ? (
                      <div className="p-8 text-center rounded-2xl border border-dashed border-black/10 text-[#1a1a2e]/40 text-xs">
                        No orders recorded on this node.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                        {orders.slice(0, 3).map((order) => (
                          <div key={order.id} className="p-4 rounded-2xl bg-black/5 border border-black/5 flex justify-between items-center text-xs">
                            <div className="space-y-1">
                              <span className="font-mono font-bold text-[#1a1a2e]">{order.id}</span>
                              <span className="text-[9px] text-[#1a1a2e]/40 block">{order.date}</span>
                            </div>
                            <div className="text-right space-y-1">
                              <span className="font-mono font-bold text-primary block">₹{order.total.toLocaleString('en-IN')}</span>
                              <span className="text-[8px] bg-green-500/10 text-green-700 font-bold uppercase px-2 py-0.5 rounded-full">{order.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* WALLET TOP-UP PAYMENT GATEWAY MODAL */}
      <AnimatePresence>
        {isTopUpPaymentOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTopUpPaymentOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[150]"
            />
            {/* Modal Container */}
            <div className="fixed inset-0 overflow-y-auto z-[160] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative"
              >
                {/* Header */}
                <div className="bg-[#E82E32] p-6 text-white relative">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-[#E82E32] font-black text-xl shadow-lg shadow-black/10">A</div>
                      <div>
                        <h3 className="font-black text-sm tracking-tight text-white">AIR G International</h3>
                        <div className="flex items-center gap-1 opacity-80">
                          <span className="material-symbols-outlined text-[10px] text-white">verified</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Elite Verified Business</span>
                        </div>
                      </div>
                    </div>
                    {topUpPaymentStep === 'options' && (
                      <button 
                        onClick={() => setIsTopUpPaymentOpen(false)}
                        className="hover:bg-white/10 p-2 rounded-full transition-colors text-white border-none bg-transparent"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-white">Recharge Amount</p>
                    <div className="flex items-baseline justify-between">
                      <h2 className="text-3xl font-black text-white">₹{pendingTopUpAmount.toLocaleString('en-IN')}</h2>
                      <div className="flex items-center gap-1 opacity-80 font-bold">
                        <span className="material-symbols-outlined text-[12px]">lock</span>
                        <span className="text-[10px] text-white">Secured by AIR G Pay</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                  {topUpPaymentStep === 'options' && (
                    <>
                      {/* Method Details (UPI Only) */}
                      <div className="min-h-[140px] flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-100">
                        <div className="flex flex-col gap-4 w-full">
                          <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left font-mono">Select UPI App to pay:</h4>
                            <div className="grid grid-cols-2 gap-3 text-left">
                              {[
                                { name: 'GPay', icon: "/logos/gpay.png" },
                                { name: 'PhonePe', icon: "/logos/phonepe.png" },
                                { name: 'Paytm', icon: "/logos/paytm.png" },
                                { 
                                  name: 'BHIM', 
                                  icon: (
                                    <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-contain">
                                      <path d="M3 2l8 8-8 8V2z" fill="#FF9933" />
                                      <path d="M12 2l-8 8 8 8V2z" fill="#138808" opacity="0.8" />
                                      <text x="18" y="16" fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#F05A28">BH</text>
                                      <text x="41" y="16" fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#0A7A4C">IM</text>
                                    </svg>
                                  )
                                }
                              ].map((app) => (
                                <a 
                                  key={app.name} 
                                  href={getUpiDeepLink(app.name)}
                                  className="flex items-center p-4 rounded-2xl border border-slate-100 hover:border-red-500 hover:bg-red-50/10 transition-all gap-4 group decoration-none bg-white"
                                >
                                  <div className="h-8 w-8 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform overflow-hidden shrink-0">
                                    {typeof app.icon === 'string' ? (
                                      <img src={app.icon} alt={app.name} className="h-full w-full object-contain" />
                                    ) : (
                                      app.icon
                                    )}
                                  </div>
                                  <span className="text-xs font-black text-slate-700">{app.name}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                          
                          {/* Scanning section */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 text-left">
                            <div className="h-20 w-20 bg-white rounded-xl p-1 shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                              <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=9860779172-5@ybl&pn=AIR%20G%20International&am=${pendingTopUpAmount}&cu=INR`)}`} 
                                alt="UPI QR Code" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-slate-900 block">Verified Merchant</span>
                              <p className="text-[9px] text-slate-400 leading-tight font-sans">Scan this QR code using any UPI app to top up ₹{pendingTopUpAmount.toLocaleString('en-IN')} instantly.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* UTR Verification Section */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 mt-3">
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block">Enter 12-Digit UTR/Transaction ID</label>
                          <input 
                            type="text"
                            placeholder="e.g. 123456789012" 
                            maxLength={12}
                            value={topUpUtr}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val.length <= 12) setTopUpUtr(val);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-red-500/50 text-slate-700 font-mono h-10"
                          />
                        </div>

                        {topUpUtrError && (
                          <p className="text-[9px] font-black text-red-500 font-mono leading-tight text-left">{topUpUtrError}</p>
                        )}

                        <button 
                          onClick={handleVerifyTopUpUtr}
                          disabled={topUpUtr.length !== 12 || isTopUpVerifying}
                          className="w-full h-11 bg-[#E82E32] hover:bg-red-600 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold text-xs uppercase tracking-widest font-mono transition-all flex items-center justify-center gap-2 border-none"
                        >
                          {isTopUpVerifying ? (
                            <>
                              <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              <span>Verifying...</span>
                            </>
                          ) : (
                            <span>Confirm & Verify Payment</span>
                          )}
                        </button>
                      </div>
                    </>
                  )}

                  {topUpPaymentStep === 'processing' && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-2 border-t-primary animate-spin" />
                        <span className="material-symbols-outlined text-primary text-xl absolute animate-pulse">lock_open</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase text-white tracking-widest font-mono">Securing Transaction…</h4>
                        <p className="text-[9px] text-slate-400 font-mono uppercase">Please do not refresh or close this window.</p>
                      </div>
                    </div>
                  )}

                  {topUpPaymentStep === 'success' && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-bounce">
                        <span className="material-symbols-outlined text-3xl font-black">check</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase text-emerald-400 tracking-widest font-mono">Payment Successful!</h4>
                        <p className="text-[9px] text-slate-400 font-mono uppercase">₹{pendingTopUpAmount.toLocaleString('en-IN')} added to your wallet.</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* FULLSCREEN MAP MODAL */}
      <AnimatePresence>
        {isMapFullscreen && (
          <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-transparent"
              onClick={() => setIsMapFullscreen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[90vw] aspect-[2/1] bg-white rounded-[3rem] border border-black/5 p-6 flex items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.15)] z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsMapFullscreen(false)}
                className="absolute top-6 right-6 z-50 bg-slate-100 text-slate-800 hover:bg-[#EB0028] hover:text-white transition-colors duration-300 w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                title="Close Fullscreen"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
              
              {activeNetwork === "india" ? (
                <div className="w-full h-full flex items-center justify-center [&_svg]:max-h-[80vh] [&_svg]:w-auto [&_svg]:mx-auto select-none">
                  <InteractiveIndiaMap />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center [&_svg]:max-h-[80vh] [&_svg]:w-auto [&_svg]:mx-auto select-none">
                  <InteractiveWorldMap onSelectHub={(hub) => {
                    setSelectedGlobalHub(hub);
                    setIsMapFullscreen(false); // Close fullscreen to show details panel
                  }} />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Floating Pulse Call Button & Promo Widget */}
      {showCallButton && !isCartOpen && !isCheckoutOpen && !isAuthModalOpen && !isCertModalOpen && !selectedProduct && !selectedComp && !isOrdersOpen && !isProfileOpen && (
        <div className="fixed bottom-6 right-6 z-[99] flex items-center gap-3">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes phone-ring {
              0%, 100% { transform: rotate(0) scale(1); }
              5% { transform: rotate(-18deg) scale(1.12); }
              10% { transform: rotate(18deg) scale(1.12); }
              15% { transform: rotate(-18deg) scale(1.12); }
              20% { transform: rotate(18deg) scale(1.12); }
              25% { transform: rotate(-18deg) scale(1.12); }
              30% { transform: rotate(18deg) scale(1.12); }
              35% { transform: rotate(0) scale(1.12); }
              40% { transform: rotate(0) scale(1); }
            }
            .animate-phone-ring {
              animation: phone-ring 2.8s ease-in-out infinite;
            }
            @keyframes border-glow {
              0%, 100% { border-color: rgba(238, 44, 60, 0.4); box-shadow: 0 0 15px rgba(238, 44, 60, 0.2), inset 0 0 5px rgba(238, 44, 60, 0.1); }
              50% { border-color: rgba(238, 44, 60, 0.95); box-shadow: 0 0 25px rgba(238, 44, 60, 0.55), inset 0 0 10px rgba(238, 44, 60, 0.25); }
            }
            .animate-border-glow {
              animation: border-glow 2s ease-in-out infinite;
            }
            @keyframes marquee-bounce {
              0%, 15% { transform: translateX(0); }
              45%, 55% { transform: translateX(calc(-100% + 196px)); }
              85%, 100% { transform: translateX(0); }
            }
            .animate-marquee {
              display: inline-block;
              white-space: nowrap;
              animation: marquee-bounce 8s ease-in-out infinite;
            }
            @keyframes bounce-subtle {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-8px); }
            }
            .animate-bounce-subtle {
              animation: bounce-subtle 4s ease-in-out infinite;
            }
          `}} />
          <div 
            onClick={() => {
              if (!user) {
                addNotification("Please login to access this option.");
                setAuthModalOpen(true);
              }
            }}
            className="bg-white/95 backdrop-blur-md border border-[#EE2C3C]/30 rounded-full px-5 hidden sm:flex animate-border-glow select-none h-12 items-center justify-center w-[380px] min-w-[380px] text-[10px] font-black uppercase tracking-widest whitespace-nowrap gap-3 shadow-lg cursor-pointer"
          >
            <span className="text-[#1a1a2e] font-extrabold tracking-widest">Launch an AI Lab</span>
            <span className="text-[#EE2C3C]/40 font-light">|</span>
            <span className="text-[#EE2C3C] flex items-center gap-1.5 animate-pulse font-extrabold">
              📞 Talk to an Expert Now
            </span>
          </div>
          <a 
            href={user ? "https://wa.me/919860779172" : undefined}
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                addNotification("Please login to access this option.");
                setAuthModalOpen(true);
              }
            }}
            target={user ? "_blank" : undefined}
            rel={user ? "noopener noreferrer" : undefined}
            className="w-14 h-14 bg-[#EE2C3C] text-white rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(238,44,60,0.8)] hover:bg-[#d61e2e] hover:scale-110 active:scale-95 transition-all duration-300 relative group shrink-0 animate-phone-ring"
            aria-label="Contact Us on WhatsApp"
            id="floating-call-btn"
          >
            <span className="absolute inset-0 rounded-full bg-[#EE2C3C]/40 animate-ping pointer-events-none" />
            <span className="material-symbols-outlined text-2xl relative z-10 text-white">call</span>
          </a>
        </div>
      )}

      {/* Clickbait Floating Promo Card for CEO Payments */}
      {showClickbaitPromo && user && (
        <div className="fixed bottom-6 left-6 z-[120] w-[340px] bg-slate-900 border-2 border-primary rounded-3xl p-5 shadow-[0_20px_50px_rgba(238,44,60,0.3)] animate-bounce-subtle flex flex-col gap-4 text-white overflow-hidden text-left">
          {/* Subtle glowing animated border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse"></div>
          
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-black tracking-tight text-[#EE2C3C] uppercase font-headline">IMPLANT TRAINING 2026</h4>
            <button 
              onClick={() => setShowClickbaitPromo(false)} 
              className="text-white/40 hover:text-white p-1 rounded-full transition-colors bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <div className="space-y-1">
            {paymentStatus.pending ? (
              <p className="text-[10.5px] text-blue-400 font-bold uppercase tracking-wider leading-relaxed">
                ⏳ Verification Pending (Order ID: {paymentStatus.pendingDetails?.orderId})
              </p>
            ) : paymentStatus.enrolled ? (
              <p className="text-[10.5px] text-emerald-400 font-bold uppercase tracking-wider leading-relaxed">
                ✅ Enrollment Active
              </p>
            ) : (
              <p className="text-[10.5px] text-white/70 leading-relaxed font-light font-body">
                🔥 School slot allocations are closing tonight. Select your registration fee option below to secure immediate enrollment:
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button 
              onClick={() => {
                setCheckoutItem({
                  name: "Implant Training Program 2026 (Full Fee)",
                  price: 6000,
                  category: "Training Program",
                  image: "/products/product_15.jpeg"
                });
                setIsCheckoutOpen(true);
              }}
              disabled={paymentStatus.pending || paymentStatus.enrolled}
              className="w-full bg-[#EE2C3C] hover:bg-[#d61e2e] text-white py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(238,44,60,0.4)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-xs">workspace_premium</span>
              Pay Full Fee (₹6,000)
            </button>
            <button 
              onClick={() => {
                setCheckoutItem({
                  name: "Implant Training Program 2026 (Half Fee)",
                  price: 3000,
                  category: "Training Program",
                  image: "/products/product_15.jpeg"
                });
                setIsCheckoutOpen(true);
              }}
              disabled={paymentStatus.pending || paymentStatus.enrolled}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-white/25 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-xs">payments</span>
              Pay Half Fee (₹3,000)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
