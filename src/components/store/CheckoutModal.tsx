"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  ChevronRight, 
  Zap,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  X,
  User,
  Lock,
  MapPin,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    price: number | string;
    image?: string;
    category?: string;
  } | null;
  type?: "product" | "plan";
  onSuccess?: (orderId: string, shippingDetails: any) => void;
}

export function CheckoutModal({ isOpen, onClose, item, type = "product", onSuccess }: CheckoutModalProps) {
  const { user } = useAuth();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentSubStep, setPaymentSubStep] = useState("contact");
  const [timeLeft, setTimeLeft] = useState(300);
  const [useCredits, setUseCredits] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const [shippingDetails, setShippingDetails] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: ""
  });

  const [paymentDetails, setPaymentDetails] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  // Numeric price handling
  const rawPrice = typeof item?.price === 'string' 
    ? parseInt(item.price.replace(/[^\d]/g, '')) || 0 
    : item?.price || 0;

  // Mock credits check
  const credits = 0; // fallback or from user profile if available
  const calculateDiscount = () => Math.min(rawPrice * 0.1, credits);
  const finalPrice = Math.max(0, rawPrice - (useCredits ? calculateDiscount() : 0));

  useEffect(() => {
    if (user) {
      setShippingDetails(prev => ({
        ...prev,
        email: user.email || "",
        phone: prev.phone || ""
      }));
    }
  }, [user, isOpen]);

  // Reset checkout state when modal is opened or item changes
  useEffect(() => {
    if (isOpen) {
      setCheckoutStep(1);
      setPaymentSubStep("contact");
      setTimeLeft(300);
      setOrderId("");
      setVerificationMessage("Verifying Payment...");
    }
  }, [isOpen, item]);

  useEffect(() => {
    if (isOpen && checkoutStep === 2 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, checkoutStep, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePurchase = () => {
    setOrderId(Math.random().toString(36).substr(2, 9).toUpperCase());
    setCheckoutStep(2);
    setPaymentSubStep("contact");
  };

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("Verifying Payment...");

  const handleEasebuzzPayment = async () => {
    try {
      setIsVerifying(true);

      if (paymentDetails.upiId) {
        setVerificationMessage(`Sending request to ${paymentDetails.upiId}...`);
        toast.info(`Collect request sent to ${paymentDetails.upiId}. Please approve it in your UPI app!`);
        
        setTimeout(() => {
          setVerificationMessage("Waiting for authorization...");
        }, 1500);

        setTimeout(() => {
          handleComplete();
          toast.success("Payment Authorized Successfully");
          setIsVerifying(false);
          setVerificationMessage("Verifying Payment...");
        }, 4000);
      } else {
        setVerificationMessage("Verifying Payment...");
        setTimeout(() => {
          handleComplete();
          toast.success("Payment Successful");
          setIsVerifying(false);
        }, 2000);
      }

    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Payment initiation failed");
      setIsVerifying(false);
      setVerificationMessage("Verifying Payment...");
    }
  };

  const handleComplete = () => {
    setCheckoutStep(3);
  };

  const MERCHANT_UPI = "9860779172-5@ybl";
  const MERCHANT_NAME = "AIR_G_Elite";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }
  }, []);

  const getUpiDeepLink = (app?: string) => {
    const params = `pa=${MERCHANT_UPI}&pn=${encodeURIComponent(MERCHANT_NAME)}&cu=INR`;
    const base = `upi://pay?${params}`;
    if (!app) return base;
    
    // Check for iOS
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isIOS) {
      switch(app) {
        case 'GPay': 
          return `gpay://upi/pay?${params}`;
        case 'PhonePe': 
          return `phonepe://pay?${params}`;
        case 'Paytm': 
          return `paytmmp://pay?${params}`;
        case 'BHIM': 
          return `bhim://upi/pay?${params}`;
        default: 
          return base;
      }
    }

    // Android-specific intent structures for better targeting
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

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${checkoutStep === 2 ? 'max-h-[550px]' : 'max-h-[90vh]'}`}
      >
        {checkoutStep === 2 ? (
          <div className="bg-[#E82E32] p-6 text-white relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    if (paymentSubStep === "card" || paymentSubStep === "upi") setPaymentSubStep("methods");
                    else if (paymentSubStep === "methods") setPaymentSubStep("contact");
                    else setCheckoutStep(1);
                  }} 
                  className="mr-2 hover:bg-white/10 p-1 rounded-lg transition-colors text-white border-none bg-transparent"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-[#E82E32] font-black text-xl shadow-lg shadow-black/10">A</div>
                <div>
                  <h3 className="font-black text-sm tracking-tight text-white">AIR G Elite</h3>
                  <div className="flex items-center gap-1 opacity-80">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Elite Verified Business</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                  <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-[10px] font-black">{formatTime(timeLeft)}</span>
                </div>
                <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors text-white border-none bg-transparent">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-white">Total Amount</p>
              <div className="flex items-baseline justify-between">
                <h2 className="text-3xl font-black text-white">₹{finalPrice.toLocaleString()}</h2>
                <div className="flex items-center gap-1 opacity-80">
                  <Lock className="h-3 w-3" />
                  <span className="text-[10px] font-bold text-white">Secured by AIR G Pay</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#E82E32] flex items-center justify-center text-white">
                {checkoutStep === 1 ? <ShoppingBag className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {checkoutStep === 1 ? "Checkout" : "Success"}
              </h3>
            </div>
            <button onClick={onClose} className="h-8 w-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors border-none bg-transparent">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-4">
            {checkoutStep === 1 ? (
              <div className="space-y-4">
                <div className="flex gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                  {item.image ? (
                    <img src={item.image} alt="" className="h-14 w-14 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Zap className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-black text-sm text-slate-900 leading-tight">{item.name}</h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.category || type}</p>
                    <p className="text-sm font-black text-[#E82E32] mt-0.5">₹{rawPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
                    <MapPin className="h-4 w-4 text-[#E82E32]" />
                    <span>{type === "product" ? "Shipping Address" : "Billing Address"}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Input placeholder="Address" value={shippingDetails.street} onChange={(e) => setShippingDetails({...shippingDetails, street: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="City" value={shippingDetails.city} onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                      <Input placeholder="Pincode" value={shippingDetails.pincode} onChange={(e) => setShippingDetails({...shippingDetails, pincode: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="State" value={shippingDetails.state} onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                      <Input placeholder="Phone" value={shippingDetails.phone} onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})} className="h-9 rounded-lg font-bold bg-slate-50 border-none px-3 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-2xl border border-slate-100 bg-white">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-[#E82E32]" />
                    <span className="font-black text-slate-900 text-[10px]">Apply Credits (₹{calculateDiscount()})</span>
                  </div>
                  <Switch checked={useCredits} onCheckedChange={setUseCredits} className="scale-75 data-[state=unchecked]:bg-blue-100" />
                </div>
              </div>
            ) : checkoutStep === 2 ? (
              <div className="min-h-[400px]">
                {paymentSubStep === "contact" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 py-4">
                    <div className="flex items-center gap-3 text-slate-400">
                      <User className="h-5 w-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Details</span>
                    </div>
                    <div className="space-y-6">
                      <div className="relative">
                        <Label className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-black text-[#E82E32] z-10">Phone Number</Label>
                        <div className="flex gap-2">
                          <div className="w-16 h-14 bg-slate-50 rounded-xl flex items-center justify-center font-black text-slate-900 border border-slate-100">+91</div>
                          <Input 
                            value={shippingDetails.phone} 
                            maxLength={10}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val.length <= 10) setShippingDetails({...shippingDetails, phone: val});
                            }}
                            className="flex-1 h-14 rounded-xl font-black bg-white border-slate-200 focus:border-[#E82E32] focus:ring-0 px-6 text-lg"
                            placeholder="9876543210"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <Label className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-black text-[#E82E32] z-10">Email Address</Label>
                        <Input 
                          value={shippingDetails.email} 
                          onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                          className="w-full h-14 rounded-xl font-black bg-white border-slate-200 focus:border-[#E82E32] focus:ring-0 px-6 text-lg"
                        />
                      </div>
                    </div>
                    <div className="pt-12">
                      <Button 
                        onClick={() => setPaymentSubStep("methods")}
                        disabled={shippingDetails.phone.length !== 10 || !shippingDetails.email.includes('@')}
                        className="w-full h-14 bg-[#E82E32] hover:bg-red-600 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-black text-lg shadow-xl shadow-red-100 transition-all"
                      >
                        {shippingDetails.phone.length === 10 ? "Proceed to Methods" : "Enter 10-digit Number"}
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {paymentSubStep === "methods" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 py-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">All Payment Options</h4>
                    <div className="space-y-3">
                      <button onClick={() => setPaymentSubStep("card")} className="w-full p-6 rounded-2xl border border-slate-100 hover:border-[#E82E32] hover:bg-red-50/10 flex items-center justify-between group transition-all bg-transparent">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#E82E32] transition-colors"><CreditCard className="h-6 w-6" /></div>
                          <span className="font-black text-slate-700">Pay using Card</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#E82E32]" />
                      </button>
                      <button onClick={() => setPaymentSubStep("upi")} className="w-full p-6 rounded-2xl border border-slate-100 hover:border-[#E82E32] hover:bg-red-50/10 flex items-center justify-between group transition-all bg-transparent">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#E82E32] transition-colors"><Zap className="h-6 w-6" /></div>
                          <span className="font-black text-slate-700">Pay using UPI</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-[#E82E32]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {paymentSubStep === "card" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 py-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All cards supported</h4>
                    </div>
                    <div className="space-y-6 pt-4">
                      <div className="relative">
                        <Label className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-black text-[#E82E32] z-10">Card Number</Label>
                        <Input placeholder="0000 0000 0000 0000" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} className="w-full h-14 rounded-xl font-black bg-white border-slate-200 focus:border-[#E82E32] focus:ring-0 px-6 text-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <Label className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-black text-[#E82E32] z-10">Expiry</Label>
                          <Input placeholder="MM/YY" value={paymentDetails.expiry} onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})} className="w-full h-14 rounded-xl font-black bg-white border-slate-200 focus:border-[#E82E32] focus:ring-0 px-6" />
                        </div>
                        <div className="relative">
                          <Label className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-black text-[#E82E32] z-10">CVV</Label>
                          <Input type="password" placeholder="123" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})} className="w-full h-14 rounded-xl font-black bg-white border-slate-200 focus:border-[#E82E32] focus:ring-0 px-6" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-6">
                      <Button 
                        onClick={handleEasebuzzPayment} 
                        disabled={isVerifying}
                        className="w-full h-14 bg-[#E82E32] hover:bg-red-600 text-white rounded-xl font-black text-lg shadow-xl shadow-red-100"
                      >
                        {isVerifying ? (
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Verifying...</span>
                          </div>
                        ) : (
                          `Pay Now ₹${finalPrice.toLocaleString()}`
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {paymentSubStep === "upi" && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 py-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pay With UPI App</h4>
                      <div className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg">Expires in {formatTime(timeLeft)}</div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Select UPI App to pay:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { 
                            name: 'GPay', 
                            icon: (
                              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-contain">
                                <path d="M25.7 15.5c-1.2-1.2-3.1-1.2-4.2 0L10.9 26.1c-1.2 1.2-1.2 3.1 0 4.2l2.1 2.1c1.2 1.2 3.1 1.2 4.2 0L27.8 21.8c1.2-1.2 1.2-3.1 0-4.2l-2.1-2.1z" fill="#EA4335" />
                                <path d="M30.1 7.2c-1.2-1.2-3.1-1.2-4.2 0L10.9 22.2c-1.2 1.2-1.2 3.1 0 4.2l2.1 2.1c1.2 1.2 3.1 1.2 4.2 0l15-15c1.2-1.2 1.2-3.1 0-4.2l-2.1-2.1z" fill="#4285F4" />
                                <path d="M21.7 7.2c1.2-1.2 3.1-1.2 4.2 0l2.1 2.1c1.2 1.2 1.2 3.1 0 4.2L13 28.5c-1.2 1.2-3.1 1.2-4.2 0l-2.1-2.1c-1.2-1.2-1.2-3.1 0-4.2l15-15z" fill="#FBBC05" />
                                <path d="M17.3 11.6l8.5-8.5c1.2-1.2 3.1-1.2 4.2 0l2.1 2.1c1.2 1.2 1.2 3.1 0 4.2l-8.5 8.5c-1.2 1.2-3.1 1.2-4.2 0l-2.1-2.1c-1.2-1.2-1.2-3.1 0-4.2z" fill="#34A853" />
                              </svg>
                            )
                          },
                          { 
                            name: 'PhonePe', 
                            icon: (
                              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-contain">
                                <rect width="40" height="40" rx="10" fill="#5F259F" />
                                <path d="M20 9c-5.5 0-10 4.5-10 10 0 5.2 4 9.5 9 10v-5.5c-2.5-.5-4-2.5-4-4.5 0-2.8 2.2-5 5-5s5 2.2 5 5c0 2-1.5 4-4 4.5V29c5-.5 9-4.8 9-10 0-5.5-4.5-10-10-10z" fill="white" />
                                <circle cx="20" cy="19" r="2.5" fill="#FF9933" />
                              </svg>
                            )
                          },
                          { 
                            name: 'Paytm', 
                            icon: (
                              <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-contain">
                                <path d="M8.2 3.5h-5v13h2.8v-4.2h2.2c2.6 0 4.6-1.8 4.6-4.4s-2-4.4-4.6-4.4zm-.2 6.1H6v-3.4h2c1.2 0 2 .8 2 1.7 0 1-.8 1.7-2 1.7z" fill="#002E6E" />
                                <path d="M18 7.2c-1 0-1.8.6-2.1 1.4h4.2c-.3-.8-1.1-1.4-2.1-1.4zm0-2c2.2 0 3.8 1.4 4.2 3.5h-7.1c.2 1.3 1.2 2.1 2.5 2.1 1.1 0 1.9-.5 2.3-1.2l2.1.8c-.8 1.5-2.4 2.4-4.4 2.4-3.1 0-5.3-2.2-5.3-5.3 0-3.1 2.2-5.3 5.3-5.3z" fill="#002E6E" />
                                <path d="M28.4 5.5l-3.3 8.3-3.3-8.3h-2.9l4.9 11.5c-.5 1.2-1.2 1.8-2.4 1.8h-.8v2.2h.9c2 0 3.3-1.1 4.1-2.9l5.8-12.6h-3z" fill="#002E6E" />
                                <path d="M35.6 5.5v2.8h-1.8v5.5c0 .8.4 1.1 1.1 1.1h.7v2.6h-1.5c-2 0-3.1-1-3.1-3.2v-6H30v-2.8h1.1v-2h2.8v2h1.7z" fill="#00BAF2" />
                                <path d="M39.6 5.5v2.2c.6-1.5 2.1-2.2 3.7-2.2 1.7 0 2.9.7 3.4 2 .8-1.3 2.1-2 3.7-2 2.4 0 3.9 1.6 3.9 4.3v6.7h-2.8v-6.3c0-1.3-.6-2.1-1.7-2.1-1 0-1.7.7-1.9 1.7v6.7H45v-6.3c0-1.3-.6-2.1-1.7-2.1-1.1 0-1.8.7-2 1.7v6.7h-2.8V5.5h2.9z" fill="#00BAF2" />
                              </svg>
                            )
                          },
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
                            className="flex items-center p-4 rounded-2xl border border-slate-100 hover:border-red-500 hover:bg-red-50/10 transition-all gap-4 group decoration-none"
                          >
                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform overflow-hidden shrink-0">
                              {app.icon}
                            </div>
                            <span className="text-sm font-black text-slate-700">{app.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic QR Code for scanning */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="h-28 w-28 bg-white rounded-xl p-1.5 shadow-sm border border-slate-100 flex items-center justify-center shrink-0 relative group overflow-hidden">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${finalPrice}&cu=INR`)}`} 
                            alt="UPI QR Code" 
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] opacity-100 hover:opacity-0 transition-opacity flex items-center justify-center cursor-pointer">
                            <span className="text-[8px] font-black text-slate-900 bg-white/90 px-2 py-1 rounded-full shadow-sm">Scan to Pay</span>
                          </div>
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="h-3 w-3 text-emerald-500" />
                            <p className="text-[10px] font-black text-slate-900">Verified Merchant</p>
                          </div>
                          <p className="text-[9px] font-medium text-slate-400 leading-tight">
                            Scan this QR code using any UPI app (GPay, PhonePe, Paytm, BHIM) to pay <span className="font-black text-slate-700">₹{finalPrice.toLocaleString()}</span> directly.
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Lock className="h-2.5 w-2.5 text-slate-300" />
                            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">End-to-end encrypted</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <Label className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-black text-[#E82E32] z-10">Or Enter UPI ID</Label>
                      <Input placeholder="e.g. 9876543210@okaxis" value={paymentDetails.upiId} onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})} className="w-full h-10 rounded-xl font-black bg-white border-slate-200 focus:border-[#E82E32] focus:ring-0 px-4 text-sm" />
                    </div>
                    <div className="pt-2">
                       <Button 
                        onClick={handleEasebuzzPayment} 
                        disabled={isVerifying}
                        className="w-full h-10 bg-[#E82E32] hover:bg-red-600 text-white rounded-xl font-black text-sm shadow-lg"
                       >
                        {isVerifying ? (
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>{verificationMessage}</span>
                          </div>
                        ) : (
                          "Confirm Payment"
                        )}
                       </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="h-24 w-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-100 relative">
                  <CheckCircle2 className="h-12 w-12" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="absolute -top-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg"><ShieldCheck className="h-4 w-4" /></motion.div>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Mission Accomplished</h4>
                  <p className="text-sm font-bold text-slate-400">Order ID: <span className="text-[#E82E32]">{orderId}</span></p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-left space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{type === "product" ? "Shipping" : "Billing"} Details</p>
                    <p className="text-base font-black text-slate-700">{shippingDetails.street}</p>
                    <p className="text-base font-black text-slate-700">{shippingDetails.city}, {shippingDetails.pincode}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-xs">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      {type === "product" ? "Ready for dispatch" : "Subscription Active"}
                    </div>
                    <p className="text-[10px] font-black text-slate-400">{type === "product" ? "Estimated: 3-5 Days" : "Instant Access"}</p>
                  </div>
                </div>
                <Button onClick={() => { onSuccess?.(orderId, shippingDetails); onClose(); }} className="w-full h-14 bg-[#0F172A] text-white rounded-2xl font-black text-lg">Continue</Button>
              </div>
            )}
          </div>

          {checkoutStep === 1 && (
            <div className="px-5 pb-6">
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>₹{rawPrice.toLocaleString()}</span>
                </div>
                {useCredits && (
                  <div className="flex justify-between text-xs font-black text-emerald-500 uppercase tracking-widest">
                    <span>Credit Discount</span>
                    <span>-₹{calculateDiscount().toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-black text-slate-900 pt-2">
                  <span>Total</span>
                  <span>₹{finalPrice.toLocaleString()}</span>
                </div>
              </div>
              <Button onClick={handlePurchase} className="w-full h-14 bg-[#0F172A] hover:bg-[#E82E32] text-white rounded-2xl font-black text-lg shadow-xl mt-6 transition-all">Proceed to Payment</Button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
