import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Activity, Crosshair, Fingerprint, ShieldAlert, Target } from 'lucide-react';

export function TacticalInsightLabView() {
  return (
    <div className="max-w-6xl mx-auto w-full pt-8 pb-24 px-4 h-full text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500 mb-2 flex items-center gap-2">
          <BrainCircuit className="w-4 h-4" /> Lab Diagnostics
        </span>
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
          Tactical <span className="font-serif italic text-cyan-500">Insight Lab.</span>
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl">
          Deep structural breakdown of your playstyle. Analyzing sub-conscious positional behaviors and phase-of-play performance variations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Phase Analysis */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-[#050505] border border-[#1A1A1A] p-8 relative overflow-hidden group shadow-[0_0_40px_rgba(6,182,212,0.03)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl opacity-50 transition-opacity duration-1000 pointer-events-none"></div>
          <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-6 flex items-center gap-2">
             <Activity className="w-4 h-4 text-cyan-500" /> Match Phase Tendencies
          </h3>
          
          <div className="space-y-6 relative z-10">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Buildup Phase</span>
                <span className="text-xs font-mono text-cyan-500">High Impact</span>
              </div>
              <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '85%' }} 
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                ></motion.div>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-sans font-medium line-clamp-2">Consistently drops into safe zones to receive and dictates tempo seamlessly.</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Final Third Penetration</span>
                <span className="text-xs font-mono text-amber-500">Medium Impact</span>
              </div>
              <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '55%' }} 
                  transition={{ delay: 0.7, duration: 1 }}
                  className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                ></motion.div>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-sans font-medium line-clamp-2">Hesitates on through-ball execution when closing windows are smaller than 1.5s.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Defensive Transition</span>
                <span className="text-xs font-mono text-red-500">Vulnerable</span>
              </div>
              <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '35%' }} 
                  transition={{ delay: 0.9, duration: 1 }}
                  className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                ></motion.div>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-sans font-medium line-clamp-2">Slow reaction to initial turnover; frequently bypassed in first 3 seconds of counter.</p>
            </div>
          </div>
        </motion.div>

        {/* Behavioral Patterns */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#050505] border border-[#1A1A1A] p-8 flex flex-col justify-between group"
        >
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-6 flex items-center gap-2">
               <Fingerprint className="w-4 h-4 text-cyan-500" /> Behavioral Blueprint
            </h3>
            <ul className="space-y-4">
              <li className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] transition-colors group-hover:border-cyan-500/30">
                 <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 block mb-1">Pressure Response</span>
                 <p className="text-sm font-sans text-gray-300">Prefers vertical exit passing over shielding when pressed from behind.</p>
              </li>
              <li className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] transition-colors group-hover:border-cyan-500/30">
                 <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 block mb-1">Spatial Tendency</span>
                 <p className="text-sm font-sans text-gray-300">Drifts toward the right half-space natively when out of possession.</p>
              </li>
              <li className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] transition-colors group-hover:border-cyan-500/30">
                 <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 block mb-1">Scan Frequency</span>
                 <p className="text-sm font-sans text-gray-300">High scan rate pre-reception, but tunnel vision upon entering Zone 14.</p>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* AI Coach Priority Frame */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-cyan-500/20 p-8 shadow-[0_0_50px_rgba(6,182,212,0.05)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <BrainCircuit className="w-64 h-64" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 mb-6 flex items-center gap-2">
            <Target className="w-4 h-4" /> AI Coach Directives
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-3xl font-serif italic text-white mb-4 leading-tight">
                "Stop rushing the final pass."
              </h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed mb-6">
                Analyzing your biometric cadence indicates a 40% increase in heart rate equivalent pacing when entering the final third. You are executing passes 0.4s faster than your buildup phase average, leading to high turnover rates in high-value areas. 
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#333] bg-[#0F0F0F] text-xs font-sans text-gray-300">
                <ShieldAlert className="w-4 h-4 text-amber-500" /> High-Priority Correction Identified
              </div>
            </div>
            
            <div className="flex flex-col justify-center border-l border-[#1A1A1A] pl-0 md:pl-12 pt-8 md:pt-0">
               <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 block mb-4">Next Match Focus Area</span>
               <div className="bg-[#050505] p-6 border border-[#222]">
                  <span className="text-xl font-bold font-sans text-white block mb-2">Pause on the Ball</span>
                  <p className="text-xs font-sans text-gray-400 leading-relaxed mb-4">
                    Upon entering Zone 14, enforce a mandatory minimum 1-second retention before passing unless playing 1-touch. 
                  </p>
                  <button className="w-full relative overflow-hidden group bg-[#111] border border-[#222] py-3 uppercase text-[10px] font-bold tracking-[0.2em] text-cyan-500 hover:border-cyan-500 transition-colors">
                     <span className="relative z-10">Accept Challenge Directive</span>
                     <div className="absolute inset-0 bg-cyan-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform"></div>
                  </button>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
