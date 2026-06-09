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
import { motion } from 'framer-motion';
import { BrainCircuit, Activity, Crosshair, Fingerprint, ShieldAlert, Target, Zap, Eye, Cpu, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function TacticalInsightLabView() {
  return (
    <motion.div 
      className="max-w-6xl mx-auto w-full pt-8 pb-24 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-16 relative">
        <motion.div 
          className="absolute -top-10 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500 mb-4 flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <BrainCircuit className="w-4 h-4" />
          </motion.span>
          Lab Diagnostics v2.0
        </span>
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
          Tactical
          <br />
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
            Insight Lab.
          </span>
        </h1>
        
        <p className="text-base text-gray-400 font-sans max-w-2xl leading-relaxed">
          Deep structural breakdown of your playstyle. Analyzing sub-conscious positional behaviors and phase-of-play performance variations with military-grade precision.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Phase Analysis Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 relative overflow-hidden group shadow-2xl shadow-black/20 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500"
          whileHover={{ y: -4 }}
        >
          {/* Animated background glow */}
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-1000"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-8 relative z-10 flex items-center gap-2">
            <Activity className="w-3 h-3 text-cyan-500" /> Match Phase Tendencies
          </h3>
          
          <div className="space-y-8 relative z-10">
            {[
              {
                phase: 'Buildup Phase',
                impact: 'High Impact',
                value: 85,
                color: 'cyan',
                description: 'Consistently drops into safe zones to receive and dictates tempo seamlessly.'
              },
              {
                phase: 'Final Third Penetration',
                impact: 'Medium Impact',
                value: 55,
                color: 'amber',
                description: 'Hesitates on through-ball execution when closing windows are smaller than 1.5s.'
              },
              {
                phase: 'Defensive Transition',
                impact: 'Vulnerable',
                value: 35,
                color: 'red',
                description: 'Slow reaction to initial turnover; frequently bypassed in first 3 seconds of counter.'
              }
            ].map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (idx * 0.15) }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{phase.phase}</span>
                  <span className={`text-xs font-mono font-bold ${
                    phase.color === 'cyan' ? 'text-cyan-400' : 
                    phase.color === 'amber' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {phase.impact}
                  </span>
                </div>
                
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${phase.value}%` }}
                    transition={{ delay: 0.7 + (idx * 0.2), duration: 1.2, ease: "easeOut" }}
                    className={`h-full rounded-full relative ${
                      phase.color === 'cyan' ? 'bg-cyan-500' : 
                      phase.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{
                      boxShadow: `0 0 20px rgba(${
                        phase.color === 'cyan' ? '6,182,212' : 
                        phase.color === 'amber' ? '245,158,11' : '239,68,68'
                      }, 0.5)`
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
                
                <p className="text-xs text-gray-500 font-sans leading-relaxed">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Behavioral Patterns Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 flex flex-col justify-between group rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500"
          whileHover={{ y: -4 }}
        >
          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-8 flex items-center gap-2">
              <Fingerprint className="w-3 h-3 text-cyan-500" /> Behavioral Blueprint
            </h3>
            
            <ul className="space-y-4">
              {[
                {
                  title: 'Pressure Response',
                  desc: 'Prefers vertical exit passing over shielding when pressed from behind.',
                  icon: Zap
                },
                {
                  title: 'Spatial Tendency',
                  desc: 'Drifts toward the right half-space natively when out of possession.',
                  icon: Crosshair
                },
                {
                  title: 'Scan Frequency',
                  desc: 'High scan rate pre-reception, but tunnel vision upon entering Zone 14.',
                  icon: Eye
                }
              ].map((pattern, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.1) }}
                  className="p-5 bg-white/5 border border-white/10 transition-all duration-300 group/item hover:border-cyan-500/30 hover:bg-white/10 rounded-lg cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-500/20 transition-colors">
                      <pattern.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 block mb-2">{pattern.title}</span>
                      <p className="text-sm font-sans text-gray-300 leading-relaxed">{pattern.desc}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* AI Coach Priority Frame */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-cyan-500/5 to-white/[0.02] border border-cyan-500/20 p-8 lg:p-12 shadow-[0_0_60px_rgba(6,182,212,0.05)] relative overflow-hidden rounded-xl group hover:border-cyan-500/40 transition-all duration-500"
        whileHover={{ y: -4 }}
      >
        {/* Background decoration */}
        <motion.div 
          className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <BrainCircuit className="w-64 h-64 text-cyan-500" />
        </motion.div>

        <div className="relative z-10">
          <h3 className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 mb-8 flex items-center gap-2">
            <Target className="w-3 h-3" /> AI Coach Directives
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <motion.h4 
                className="text-3xl lg:text-4xl font-serif italic text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                "Stop rushing the final pass."
              </motion.h4>
              
              <p className="text-sm text-gray-400 font-sans leading-relaxed mb-8">
                Analyzing your biometric cadence indicates a 40% increase in heart rate equivalent pacing when entering the final third. You are executing passes 0.4s faster than your buildup phase average, leading to high turnover rates in high-value areas.
              </p>
              
              <motion.div 
                className="inline-flex items-center gap-3 px-5 py-3 border border-amber-500/30 bg-amber-500/5 text-xs font-sans text-amber-400 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <ShieldAlert className="w-4 h-4" /> 
                High-Priority Correction Identified
              </motion.div>
            </div>
            
            <div className="flex flex-col justify-center border-l border-white/10 pl-0 lg:pl-12 pt-8 lg:pt-0">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 block mb-6 flex items-center gap-2">
                <Cpu className="w-3 h-3 text-cyan-400" /> Next Match Focus Area
              </span>
              
              <motion.div 
                className="bg-white/5 p-6 border border-white/10 rounded-xl group/challenge hover:border-cyan-500/30 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <span className="text-xl font-bold font-sans text-white block mb-3 group-hover/challenge:text-cyan-400 transition-colors">Pause on the Ball</span>
                <p className="text-xs font-sans text-gray-400 leading-relaxed mb-6">
                  Upon entering Zone 14, enforce a mandatory minimum 1-second retention before passing unless playing 1-touch.
                </p>
                <motion.button 
                  className="w-full relative overflow-hidden group/btn bg-white/5 border border-white/10 py-4 uppercase text-[10px] font-bold tracking-[0.2em] text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Accept Challenge Directive
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-cyan-500/10 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300"
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}