// import React from 'react';
// import { motion } from 'motion/react';
// import { BrainCircuit, Activity, Crosshair, Fingerprint, ShieldAlert, Target } from 'lucide-react';

// export function TacticalInsightLabView() {
//   return (
//     <div className="max-w-6xl mx-auto w-full pt-8 pb-24 px-4 h-full text-white">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-12"
//       >
//         <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500 mb-2 flex items-center gap-2">
//           <BrainCircuit className="w-4 h-4" /> Lab Diagnostics
//         </span>
//         <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
//           Tactical <span className="font-serif italic text-cyan-500">Insight Lab.</span>
//         </h1>
//         <p className="text-sm text-gray-400 font-sans max-w-2xl">
//           Deep structural breakdown of your playstyle. Analyzing sub-conscious positional behaviors and phase-of-play performance variations.
//         </p>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
//         {/* Phase Analysis */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.1, duration: 0.5 }}
//           className="bg-[#050505] border border-[#1A1A1A] p-8 relative overflow-hidden group shadow-[0_0_40px_rgba(6,182,212,0.03)]"
//         >
//           <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl opacity-50 transition-opacity duration-1000 pointer-events-none"></div>
//           <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-6 flex items-center gap-2">
//              <Activity className="w-4 h-4 text-cyan-500" /> Match Phase Tendencies
//           </h3>
          
//           <div className="space-y-6 relative z-10">
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Buildup Phase</span>
//                 <span className="text-xs font-mono text-cyan-500">High Impact</span>
//               </div>
//               <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
//                 <motion.div 
//                   initial={{ width: 0 }} 
//                   animate={{ width: '85%' }} 
//                   transition={{ delay: 0.5, duration: 1 }}
//                   className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
//                 ></motion.div>
//               </div>
//               <p className="text-xs text-gray-500 mt-2 font-sans font-medium line-clamp-2">Consistently drops into safe zones to receive and dictates tempo seamlessly.</p>
//             </div>
            
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Final Third Penetration</span>
//                 <span className="text-xs font-mono text-amber-500">Medium Impact</span>
//               </div>
//               <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
//                 <motion.div 
//                   initial={{ width: 0 }} 
//                   animate={{ width: '55%' }} 
//                   transition={{ delay: 0.7, duration: 1 }}
//                   className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
//                 ></motion.div>
//               </div>
//               <p className="text-xs text-gray-500 mt-2 font-sans font-medium line-clamp-2">Hesitates on through-ball execution when closing windows are smaller than 1.5s.</p>
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Defensive Transition</span>
//                 <span className="text-xs font-mono text-red-500">Vulnerable</span>
//               </div>
//               <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
//                 <motion.div 
//                   initial={{ width: 0 }} 
//                   animate={{ width: '35%' }} 
//                   transition={{ delay: 0.9, duration: 1 }}
//                   className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
//                 ></motion.div>
//               </div>
//               <p className="text-xs text-gray-500 mt-2 font-sans font-medium line-clamp-2">Slow reaction to initial turnover; frequently bypassed in first 3 seconds of counter.</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Behavioral Patterns */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="bg-[#050505] border border-[#1A1A1A] p-8 flex flex-col justify-between group"
//         >
//           <div>
//             <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-6 flex items-center gap-2">
//                <Fingerprint className="w-4 h-4 text-cyan-500" /> Behavioral Blueprint
//             </h3>
//             <ul className="space-y-4">
//               <li className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] transition-colors group-hover:border-cyan-500/30">
//                  <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 block mb-1">Pressure Response</span>
//                  <p className="text-sm font-sans text-gray-300">Prefers vertical exit passing over shielding when pressed from behind.</p>
//               </li>
//               <li className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] transition-colors group-hover:border-cyan-500/30">
//                  <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 block mb-1">Spatial Tendency</span>
//                  <p className="text-sm font-sans text-gray-300">Drifts toward the right half-space natively when out of possession.</p>
//               </li>
//               <li className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] transition-colors group-hover:border-cyan-500/30">
//                  <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 block mb-1">Scan Frequency</span>
//                  <p className="text-sm font-sans text-gray-300">High scan rate pre-reception, but tunnel vision upon entering Zone 14.</p>
//               </li>
//             </ul>
//           </div>
//         </motion.div>
//       </div>

//       {/* AI Coach Priority Frame */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//         className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-cyan-500/20 p-8 shadow-[0_0_50px_rgba(6,182,212,0.05)] relative overflow-hidden"
//       >
//         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
//           <BrainCircuit className="w-64 h-64" />
//         </div>
        
//         <div className="relative z-10">
//           <h3 className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 mb-6 flex items-center gap-2">
//             <Target className="w-4 h-4" /> AI Coach Directives
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             <div>
//               <h4 className="text-3xl font-serif italic text-white mb-4 leading-tight">
//                 "Stop rushing the final pass."
//               </h4>
//               <p className="text-sm text-gray-400 font-sans leading-relaxed mb-6">
//                 Analyzing your biometric cadence indicates a 40% increase in heart rate equivalent pacing when entering the final third. You are executing passes 0.4s faster than your buildup phase average, leading to high turnover rates in high-value areas. 
//               </p>
//               <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#333] bg-[#0F0F0F] text-xs font-sans text-gray-300">
//                 <ShieldAlert className="w-4 h-4 text-amber-500" /> High-Priority Correction Identified
//               </div>
//             </div>
            
//             <div className="flex flex-col justify-center border-l border-[#1A1A1A] pl-0 md:pl-12 pt-8 md:pt-0">
//                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 block mb-4">Next Match Focus Area</span>
//                <div className="bg-[#050505] p-6 border border-[#222]">
//                   <span className="text-xl font-bold font-sans text-white block mb-2">Pause on the Ball</span>
//                   <p className="text-xs font-sans text-gray-400 leading-relaxed mb-4">
//                     Upon entering Zone 14, enforce a mandatory minimum 1-second retention before passing unless playing 1-touch. 
//                   </p>
//                   <button className="w-full relative overflow-hidden group bg-[#111] border border-[#222] py-3 uppercase text-[10px] font-bold tracking-[0.2em] text-cyan-500 hover:border-cyan-500 transition-colors">
//                      <span className="relative z-10">Accept Challenge Directive</span>
//                      <div className="absolute inset-0 bg-cyan-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform"></div>
//                   </button>
//                </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }



import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Activity, Crosshair, Fingerprint, ShieldAlert, Target, ChevronRight, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

export function TacticalInsightLabView() {
  
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto w-full pt-8 pb-24 px-4 md:px-8 h-full text-white relative overflow-hidden"
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-16 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500">
            Lab Diagnostics v2.4
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-none">
          Tactical <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Insight Lab.</span>
        </h1>
        <p className="text-lg text-gray-400 font-light max-w-2xl leading-relaxed border-l-2 border-cyan-500/30 pl-6">
          Deep structural breakdown of your playstyle. Analyzing sub-conscious positional behaviors and phase-of-play performance variations using biometric telemetry.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        
        {/* Phase Analysis Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-[#080808] border border-[#1A1A1A] p-8 rounded-2xl relative overflow-hidden group shadow-[0_0_40px_rgba(6,182,212,0.03)] hover:border-cyan-500/30 transition-colors duration-500"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-gray-400 flex items-center gap-3">
              <Activity className="w-5 h-5 text-cyan-500" /> 
              Match Phase Tendencies
            </h3>
            <span className="text-[10px] font-mono text-gray-600 bg-[#111] px-2 py-1 rounded">LIVE DATA</span>
          </div>
          
          <div className="space-y-8 relative z-10">
            {[
              { label: "Buildup Phase", value: 85, color: "cyan", status: "High Impact", desc: "Consistently drops into safe zones to receive and dictates tempo seamlessly." },
              { label: "Final Third Penetration", value: 55, color: "amber", status: "Medium Impact", desc: "Hesitates on through-ball execution when closing windows are smaller than 1.5s." },
              { label: "Defensive Transition", value: 35, color: "red", status: "Vulnerable", desc: "Slow reaction to initial turnover; frequently bypassed in first 3 seconds of counter." }
            ].map((item, idx) => (
              <div key={idx} className="group/item">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-300 group-hover/item:text-white transition-colors">{item.label}</span>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded bg-${item.color}-500/10 text-${item.color}-500 border border-${item.color}-500/20`}>
                    {item.status}
                  </span>
                </div>
                
                {/* Progress Bar Container */}
                <div className="w-full h-2 bg-[#111] rounded-full overflow-hidden relative border border-[#222]">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${item.value}%` }} 
                    transition={{ delay: 0.5 + (idx * 0.2), duration: 1.2, ease: "easeOut" }}
                    className={`h-full bg-${item.color}-500 relative`}
                  >
                    {/* Shimmer Effect on Bar */}
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                </div>
                
                <p className="text-xs text-gray-500 mt-3 font-medium leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Behavioral Patterns Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-[#080808] border border-[#1A1A1A] p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div>
            <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-cyan-500" /> 
              Behavioral Blueprint
            </h3>
            
            <ul className="space-y-4">
              {[
                { title: "Pressure Response", content: "Prefers vertical exit passing over shielding when pressed from behind.", icon: Zap },
                { title: "Spatial Tendency", content: "Drifts toward the right half-space natively when out of possession.", icon: Crosshair },
                { title: "Scan Frequency", content: "High scan rate pre-reception, but tunnel vision upon entering Zone 14.", icon: BrainCircuit }
              ].map((pattern, idx) => (
                <li key={idx} className="p-4 bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-[#111] hover:translate-x-2 group/pattern cursor-default">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#1A1A1A] rounded-lg group-hover/pattern:bg-cyan-500/10 group-hover/pattern:text-cyan-500 transition-colors">
                      <pattern.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 block mb-1">{pattern.title}</span>
                      <p className="text-sm font-sans text-gray-300 leading-relaxed">{pattern.content}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative Footer in Card */}
          <div className="mt-8 pt-6 border-t border-[#1A1A1A] flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            <span>Analysis ID: #8829-X</span>
            <span className="flex items-center gap-2"><TrendingUp className="w-3 h-3" /> Confidence: 98%</span>
          </div>
        </motion.div>
      </div>

      {/* AI Coach Priority Frame */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-cyan-500/20 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.05)] relative overflow-hidden group"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
          <BrainCircuit className="w-64 h-64 text-cyan-500" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500 mb-6 flex items-center gap-3">
              <Target className="w-4 h-4" /> 
              AI Coach Directives
            </h3>
            
            <h4 className="text-3xl md:text-4xl font-serif italic text-white mb-6 leading-tight">
              "Stop rushing the final pass."
            </h4>
            
            <p className="text-base text-gray-400 font-light leading-relaxed mb-8">
              Analyzing your biometric cadence indicates a <span className="text-white font-medium">40% increase in heart rate equivalent pacing</span> when entering the final third. You are executing passes 0.4s faster than your buildup phase average, leading to high turnover rates in high-value areas. 
            </p>
            
            <div className="inline-flex items-center gap-3 px-4 py-3 border border-amber-500/20 bg-amber-500/5 rounded-lg text-xs font-sans text-amber-500 font-bold tracking-wide">
              <ShieldAlert className="w-4 h-4" /> 
              High-Priority Correction Identified
            </div>
          </div>
          
          <div className="flex flex-col justify-center h-full">
             <div className="bg-[#080808] p-8 border border-[#1A1A1A] rounded-2xl relative overflow-hidden group/card hover:border-cyan-500/30 transition-all duration-500">
                {/* Scan Line Animation */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[20%] w-full animate-[scan_3s_linear_infinite] pointer-events-none"></div>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Next Match Focus Area</span>
                </div>

                <span className="text-2xl font-bold font-sans text-white block mb-3">Pause on the Ball</span>
                <p className="text-sm font-sans text-gray-400 leading-relaxed mb-8">
                  Upon entering Zone 14, enforce a mandatory minimum 1-second retention before passing unless playing 1-touch. 
                </p>
                
                <button className="w-full relative overflow-hidden group/btn bg-[#111] border border-[#222] py-4 uppercase text-[10px] font-bold tracking-[0.2em] text-cyan-500 hover:text-black hover:border-cyan-500 transition-all duration-300 rounded-lg">
                   <span className="relative z-10 flex items-center justify-center gap-2">
                     Accept Challenge Directive 
                     <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                   </span>
                   <div className="absolute inset-0 bg-cyan-500 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                </button>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}</style>
    </motion.div>
  );
}