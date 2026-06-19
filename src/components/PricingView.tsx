import React from "react";
import { Check, X, Shield, Zap } from "lucide-react";
import { startPayHerePayment } from "../lib/payment";

interface PricingViewProps {
  user: {
    email: string;
    subscription_tier?: string;
  } | null;
  onRequireLogin: () => void;
}

export function PricingView({
  user,
  onRequireLogin,
}: PricingViewProps) {
  const handleUpgrade = async (plan: "free" | "pro" | "elite") => {
    try {
      // 1. Check login
      if (!user) {
        onRequireLogin();
        return;
      }

      // 2. Free plan = no payment
      if (plan === "free") return;

      // 3. Start PayHere payment
      await startPayHerePayment(plan, user.email);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-12 pb-24">
      
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4">
          Choose your <span className="text-amber-500 italic font-serif">evolution path.</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Upgrade your tactical intelligence system.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* FREE */}
        <div className="bg-[#050505] border border-[#1A1A1A] p-8 flex flex-col">
          <h3 className="text-gray-500 uppercase text-sm font-bold">Free Player</h3>
          <p className="text-3xl text-white mt-2">$0/mo</p>

          <ul className="mt-6 space-y-3 text-gray-400 text-sm flex-1">
            <li className="flex gap-2"><Check size={16} /> Basic Analysis</li>
            <li className="flex gap-2"><Check size={16} /> Radar Charts</li>
            <li className="flex gap-2 text-gray-600"><X size={16} /> AI Coaching</li>
          </ul>

          <button
            onClick={() => handleUpgrade("free")}
            className="mt-6 py-3 border border-gray-700 text-gray-400 text-xs uppercase"
          >
            Current Plan
          </button>
        </div>

        {/* PRO */}
        <div className="bg-[#0A0A0A] border border-cyan-500 p-8 flex flex-col">
          <div className="text-cyan-500 text-xs uppercase mb-2">Recommended</div>
          <h3 className="text-cyan-500 uppercase text-sm font-bold flex items-center gap-2">
            <Zap size={16} /> Pro Player
          </h3>

          <p className="text-4xl text-white mt-2">$3/mo</p>

          <ul className="mt-6 space-y-3 text-white text-sm flex-1">
            <li className="flex gap-2"><Check size={16} /> Unlimited Analysis</li>
            <li className="flex gap-2"><Check size={16} /> AI Coaching</li>
            <li className="flex gap-2"><Check size={16} /> Match Breakdown</li>
          </ul>

          <button
            onClick={() => handleUpgrade("pro")}
            className="mt-6 py-3 bg-cyan-500 text-black text-xs uppercase font-bold"
          >
            Upgrade to Pro
          </button>
        </div>

        {/* ELITE */}
        <div className="bg-[#050505] border border-[#1A1A1A] p-8 flex flex-col">
          <h3 className="text-amber-500 uppercase text-sm font-bold flex items-center gap-2">
            <Shield size={16} /> Elite Academy
          </h3>

          <p className="text-3xl text-white mt-2">$5/mo</p>

          <ul className="mt-6 space-y-3 text-gray-300 text-sm flex-1">
            <li className="flex gap-2"><Check size={16} /> Everything in Pro</li>
            <li className="flex gap-2"><Check size={16} /> Deep AI Insights</li>
            <li className="flex gap-2"><Check size={16} /> Coach Engine</li>
          </ul>

          <button
            onClick={() => handleUpgrade("elite")}
            className="mt-6 py-3 border border-amber-500 text-amber-500 text-xs uppercase"
          >
            Upgrade to Elite
          </button>
        </div>

      </div>
    </div>
  );
}