import React from 'react';
import { Check, X, Shield, Lock, Zap } from 'lucide-react';

interface PricingViewProps {
  onUpgrade: () => void;
}

export function PricingView({ onUpgrade }: PricingViewProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-12 pb-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight mb-4">
          Choose your <span className="font-serif italic text-amber-500">evolution path.</span>
        </h1>
        <p className="text-gray-400 font-sans max-w-xl mx-auto">
          From basic tactical scanning to elite academy-level coaching. Access the intelligence level you need to level up.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
        
        {/* Tier: Basic */}
        <div className="bg-[#050505] border border-[#1A1A1A] p-8 flex flex-col">
           <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Free Player</h3>
           <p className="text-3xl font-serif text-white mb-6">$0<span className="text-sm text-gray-500 font-sans not-italic">/mo</span></p>
           <p className="text-xs text-gray-400 mb-8 pb-8 border-b border-[#1A1A1A]">Basic tactical identity scanning and static reports.</p>
           
           <ul className="space-y-4 mb-8 flex-1">
             <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-green-500 shrink-0" /> 3 Match Analyses/wk</li>
             <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-green-500 shrink-0" /> Identity Archetype</li>
             <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-green-500 shrink-0" /> Radar Chart Output</li>
             <li className="flex gap-3 text-sm text-gray-600 font-sans"><X className="w-4 h-4 shrink-0" /> <span className="line-through">Full Match Replay Engine</span></li>
             <li className="flex gap-3 text-sm text-gray-600 font-sans"><X className="w-4 h-4 shrink-0" /> <span className="line-through">Weekly AI Academy Plan</span></li>
           </ul>

           <button onClick={() => onUpgrade?.('free')} className="w-full py-3 bg-[#0A0A0A] border border-[#222] text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
             Current Plan
           </button>
        </div>

        {/* Tier: Pro */}
        <div className="bg-[#0A0A0A] border border-cyan-500/50 p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] uppercase font-bold tracking-widest px-4 py-1">
             Recommended
           </div>
           <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-500 mb-2 flex items-center gap-2"><Zap className="w-4 h-4" /> Pro Player</h3>
           <p className="text-4xl font-serif text-white mb-6">$3<span className="text-sm text-gray-500 font-sans not-italic">/mo</span></p>
           <p className="text-xs text-gray-400 mb-8 pb-8 border-b border-[#222]">Full intelligence access for ambitious players aiming for the academy.</p>
           
           <ul className="space-y-4 mb-8 flex-1">
             <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-cyan-500 shrink-0" /> Unlimited Match Analyses</li>
             <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-cyan-500 shrink-0" /> Full Match Replay Engine</li>
             <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-cyan-500 shrink-0" /> Player Evolution History</li>
             <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-cyan-500 shrink-0" /> Weekly AI Academy Plans</li>
             <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-cyan-500 shrink-0" /> Shareable Highlights & Badges</li>
           </ul>

           <button onClick={() => onUpgrade?.('pro')} className="w-full py-4 bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors">
             Upgrade to Pro
           </button>
        </div>

        {/* Tier: Elite */}
        <div className="bg-[#050505] border border-[#1A1A1A] p-8 flex flex-col relative overflow-hidden">
           <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-amber-500" /> Elite Academy</h3>
           <p className="text-3xl font-serif text-white mb-6">$5<span className="text-sm text-gray-500 font-sans not-italic">/mo</span></p>
           <p className="text-xs text-gray-500 mb-8 pb-8 border-b border-[#1A1A1A]">Advanced insights. Built for tracking deep squad/personal development.</p>
           
           <ul className="space-y-4 mb-8 flex-1 relative z-10">
             <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> Everything in Pro</li>
             <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> AI Comparative Matchmaking</li>
             <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> Coach Memory Engine</li>
             <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> Deep Weakness Prediction</li>
             <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> Priority Server Processing</li>
           </ul>

           <button onClick={() => onUpgrade?.('elite')} className="w-full py-3 bg-[#0A0A0A] border border-[#222] text-gray-300 text-xs font-bold uppercase tracking-widest hover:border-amber-500 transition-colors">
             Upgrade to Elite
           </button>
        </div>

      </div>
    </div>
  );
}
