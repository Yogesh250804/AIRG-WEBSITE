"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckoutModal } from "@/components/store/CheckoutModal";

export default function GrampanchayatAILabPage() {
  const [activeZone, setActiveZone] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ name: string; price: number; image?: string; category?: string } | null>(null);

  const labImages = [
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

      {/* Hero section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Grassroots Innovation
            </span>
            <h1 className="font-headline text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[0.9] text-[#1a1a2e]">
              Grampanchayat <br />
              <span className="text-primary text-glow-red">AI Lab</span>
            </h1>
            <p className="text-base sm:text-lg text-[#1a1a2e]/65 font-light leading-relaxed max-w-xl">
              Bringing advanced technologies to rural communities. The Grampanchayat AI Lab bridges the digital divide, introducing artificial intelligence, coding, and agricultural IoT systems at the local village council level.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10" />
            <div className="glass-premium rounded-[3rem] border border-black/5 overflow-hidden p-3 shadow-2xl bg-white/70">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-900">
                <img
                  src={labImages[currentImageIndex]}
                  alt="Grampanchayat AI Lab Setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Customization Zones */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24 border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8 text-left sticky top-28">
            <div className="space-y-3">
              <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Interactive Estimator</span>
              <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
                Configure the <br />
                <span className="text-primary">Grampanchayat Lab</span>
              </h2>
              <p className="text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
                Add equipment quantities to calculate a live setup budget estimate for your local Grampanchayat.
              </p>
            </div>

            {/* Live Estimator Total Box */}
            <div className="glass-premium rounded-[2.5rem] border-2 border-primary/20 p-8 shadow-xl bg-white space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#1a1a2e]/45 uppercase">Estimated Setup Budget</span>
                <div className="text-4xl sm:text-5xl font-black text-primary tracking-tight mt-1">
                  ₹{formatCurrency(calculateGrandTotal())}
                </div>
                <p className="text-[10px] text-[#1a1a2e]/40 mt-1">Excludes local logistics, custom shipping, and site development taxes.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const total = calculateGrandTotal();
                    if (total === 0) return;
                    setCheckoutItem({
                      name: "Custom Grampanchayat AI Lab Setup",
                      price: total,
                      category: "Lab Infrastructure"
                    });
                    setIsCheckoutOpen(true);
                  }}
                  disabled={calculateGrandTotal() === 0}
                  className={`flex-1 py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all text-center ${
                    calculateGrandTotal() > 0
                      ? "bg-primary text-white hover:scale-[1.02] shadow-lg shadow-primary/20 cursor-pointer"
                      : "bg-[#1a1a2e]/10 text-[#1a1a2e]/30 cursor-not-allowed"
                  }`}
                  style={{ color: calculateGrandTotal() > 0 ? '#ffffff' : '' }}
                >
                  Request Proposal
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  disabled={calculateGrandTotal() === 0}
                  className={`py-4 px-6 rounded-2xl border transition-all ${
                    calculateGrandTotal() > 0
                      ? "border-black/10 hover:border-black/25 text-[#1a1a2e] hover:bg-slate-50 cursor-pointer"
                      : "border-black/5 text-[#1a1a2e]/20 cursor-not-allowed"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">print</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap gap-2 pb-2 border-b border-black/5">
              {zones.map((zone, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveZone(idx)}
                  className={`px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    activeZone === idx
                      ? "bg-[#1a1a2e] border-primary text-white hover:bg-[#1a1a2e]/95"
                      : "bg-white border-black/5 text-[#1a1a2e]/60 hover:bg-slate-50 hover:border-black/10"
                  }`}
                  style={{ color: activeZone === idx ? '#ffffff' : '' }}
                >
                  <span className="material-symbols-outlined text-base">{zone.icon}</span>
                  <span>Zone {String(idx + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left"
              >
                <div className="glass-premium rounded-[2.5rem] border border-black/5 p-6 sm:p-8 bg-white shadow-lg space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#1a1a2e]/40 uppercase block mb-1">Active custom Zone</span>
                    <h3 className="font-headline text-xl sm:text-2xl font-black uppercase text-[#1a1a2e]">{zones[activeZone].name}</h3>
                  </div>

                  <div className="space-y-4">
                    {zones[activeZone].items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-black/5 hover:border-black/10 transition-colors bg-white/50 gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-[#1a1a2e]">{item.name}</h4>
                          <span className="text-[10px] font-mono text-primary font-bold">
                            ₹{formatCurrency(item.unitCost)} {item.isLot ? "/ Lot" : "/ Unit"}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <button
                            onClick={() => updateQuantity(activeZone, itemIdx, -1)}
                            className="w-9 h-9 rounded-xl border border-black/10 hover:border-black/25 flex items-center justify-center text-sm font-bold text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-slate-50 transition-all select-none active:scale-95"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-mono text-sm font-bold text-[#1a1a2e]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(activeZone, itemIdx, 1)}
                            className="w-9 h-9 rounded-xl border border-black/10 hover:border-black/25 flex items-center justify-center text-sm font-bold text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-slate-50 transition-all select-none active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-black/5 flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-[#1a1a2e]/45 uppercase">Zone Subtotal</span>
                    <span className="text-lg font-bold text-primary">₹{formatCurrency(calculateZoneTotal(activeZone))}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
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
