// import React from 'react';
// import { Upload, Flame, Trophy, Crown, Target, Activity, ArrowRight, Shield, Swords, TrendingUp, Calendar, Lock } from 'lucide-react';

// interface HomeDashboardProps {
//   xp: number;
//   level: string;
//   streak: number;
//   onNavigateToUpload: () => void;
// }

// export function HomeDashboard({ xp, level, streak, onNavigateToUpload }: HomeDashboardProps) {
  
//   const xpMax = 1000;
//   const xpPercent = Math.min((xp / xpMax) * 100, 100);

//   return (
//     <div className="flex flex-col w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
       
//        <header className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#1A1A1A]">
//           <div>
//             <h1 className="text-3xl font-sans font-bold text-white tracking-tight mb-2">My Career Hub</h1>
//             <p className="text-sm text-gray-400 font-sans">Track your evolution, analyze footage, and hit your next milestone.</p>
//           </div>
//           <button 
//              onClick={onNavigateToUpload}
//              className="px-6 py-3 bg-amber-500 text-black text-[10px] uppercase font-bold tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
//           >
//              <Upload className="w-4 h-4" /> Analyze New Match
//           </button>
//        </header>

//        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
//           <div className="col-span-1 md:col-span-8 flex flex-col gap-8">
             
//              {/* Player Identity Card */}
//              <div className="bg-[#080808] border border-[#1A1A1A] p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                
//                 <div className="w-24 h-24 shrink-0 rounded-full border-2 border-[#333] flex items-center justify-center bg-[#0F0F0F] relative z-10">
//                    <Shield className="w-8 h-8 text-gray-400" />
//                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">
//                       LVL 4
//                    </div>
//                 </div>
                
//                 <div className="flex-1 w-full relative z-10">
//                    <div className="flex justify-between items-start mb-2 text-center sm:text-left">
//                       <div>
//                          <h2 className="text-2xl font-serif italic text-white">Central Midfielder</h2>
//                          <p className="text-xs text-amber-500 uppercase tracking-widest font-bold">Progressive Playmaker</p>
//                       </div>
//                       <div className="hidden sm:flex flex-col items-end">
//                          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" /> Streak</span>
//                          <span className="text-xl font-mono text-white">{streak} <span className="text-[10px] text-gray-600 font-sans uppercase">Days</span></span>
//                       </div>
//                    </div>
                   
//                    <p className="text-sm font-sans text-gray-400 mb-6 text-center sm:text-left">
//                      Last analysis indicates strong vision under pressure, but lacking defensive transition speed. Focus on physical shielding.
//                    </p>

//                    <div className="flex flex-col gap-2 w-full">
//                       <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
//                          <span className="text-gray-500">Season Progression</span>
//                          <span className="text-amber-500">{xp} / {xpMax} XP</span>
//                       </div>
//                       <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
//                          <div className="h-full bg-amber-500 transition-all duration-1000 relative" style={{ width: `${xpPercent}%` }}>
//                            <div className="absolute inset-0 bg-white/20 w-full animate-[pulse_2s_ease-in-out_infinite]"></div>
//                          </div>
//                       </div>
//                    </div>
//                 </div>
//              </div>

//              {/* Visual Timeline / History */}
//              <div className="bg-[#080808] border border-[#1A1A1A] p-8">
//                 <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-8 flex items-center gap-2">
//                    <Calendar className="w-4 h-4 text-gray-400" /> Recent Scout Reports
//                 </h3>
                
//                 <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-[#1A1A1A]">
                   
//                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center">
//                       <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-4 border-[#080808] flex items-center justify-center shrink-0 absolute -left-6 sm:static sm:mr-2"></div>
//                       <div className="flex-1 bg-[#0F0F0F] border border-[#222] p-4 flex justify-between items-center hover:border-amber-500/30 transition-colors cursor-pointer">
//                          <div>
//                             <span className="text-[10px] font-mono text-gray-500 block mb-1">June 02, 2026</span>
//                             <span className="text-sm font-sans text-white font-medium">U18 League vs City Academy</span>
//                          </div>
//                          <div className="flex items-center gap-2">
//                             <span className="text-lg font-serif italic text-white">78</span>
//                             <ArrowRight className="w-4 h-4 text-gray-600" />
//                          </div>
//                       </div>
//                    </div>

//                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center">
//                       <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-4 border-[#080808] flex items-center justify-center shrink-0 absolute -left-6 sm:static sm:mr-2"></div>
//                       <div className="flex-1 bg-[#0F0F0F] border border-[#222] p-4 flex justify-between items-center hover:border-amber-500/30 transition-colors cursor-pointer">
//                          <div>
//                             <span className="text-[10px] font-mono text-gray-500 block mb-1">May 25, 2026</span>
//                             <span className="text-sm font-sans text-white font-medium">Friendly vs Sporting U18</span>
//                          </div>
//                          <div className="flex items-center gap-2">
//                             <span className="text-lg font-serif italic text-white">76</span>
//                             <ArrowRight className="w-4 h-4 text-gray-600" />
//                          </div>
//                       </div>
//                    </div>

//                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center">
//                       <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-2 border-dashed border-[#333] flex items-center justify-center shrink-0 absolute -left-6 sm:static sm:mr-2"></div>
//                       <div className="flex-1 border border-dashed border-[#222] p-4 flex justify-center items-center hover:border-[#444] transition-colors cursor-pointer" onClick={onNavigateToUpload}>
//                          <span className="text-xs font-sans text-gray-500 flex items-center gap-2"><Upload className="w-3 h-3" /> Awaiting next match footage</span>
//                       </div>
//                    </div>

//                 </div>
//              </div>

//           </div>

//           <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
             
//              {/* Next Upgrade Goal */}
//              <div className="bg-[#050505] border border-amber-500/30 p-6 relative shadow-[0_0_30px_rgba(245,158,11,0.05)]">
//                 <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none"></div>
//                 <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500 mb-6 flex items-center gap-2">
//                    <Target className="w-3 h-3" /> Next Upgrade Goal
//                 </h3>
                
//                 <h4 className="text-lg font-serif italic text-white mb-2">Master Physical Shielding</h4>
//                 <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
//                    Your ball retention under pressure is currently costing you 12% progression rate. Improve back-to-goal shielding to unlock reliable central pivot status.
//                 </p>

//                 <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-4 mb-6">
//                    <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-2">Recommended Drill</span>
//                    <span className="text-sm text-gray-300 font-sans block">Back-to-goal active resistance (4-6 weeks)</span>
//                 </div>

//                 <button className="w-full py-3 bg-[#0A0A0A] border border-[#222] text-xs font-bold uppercase tracking-widest text-gray-300 hover:border-amber-500 transition-colors">
//                    View Full Roadmap
//                 </button>
//              </div>

//              {/* Elite Status Prompt */}
//              <div className="bg-[#080808] border border-[#1A1A1A] p-6 flex flex-col items-center text-center">
//                 <Lock className="w-6 h-6 text-gray-600 mb-4" />
//                 <h4 className="text-sm font-sans font-bold text-white mb-2">Unlock Pro Analysis</h4>
//                 <p className="text-xs text-gray-500 font-sans mb-6">Get unlimited tactical output and historical trajectory mapping.</p>
//                 <button className="w-full py-2 bg-[#111] text-amber-500 text-[10px] font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors border border-[#222]">
//                    Upgrade Plan
//                 </button>
//              </div>

//           </div>

//        </div>
//     </div>
//   );
// }


import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Flame, Trophy, Crown, Target, Activity, ArrowRight, Shield, Swords, TrendingUp, Calendar, Lock, Sparkles, Zap } from 'lucide-react';

interface HomeDashboardProps {
  xp: number;
  level: string;
  streak: number;
  onNavigateToUpload: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function HomeDashboard({ xp, level, streak, onNavigateToUpload }: HomeDashboardProps) {
  const xpMax = 1000;
  const xpPercent = Math.min((xp / xpMax) * 100, 100);

  return (
    <motion.div 
      className="flex flex-col w-full max-w-6xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.header 
        variants={itemVariants}
        className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 relative"
      >
        <div className="relative">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            My Career Hub
          </motion.h1>
          <motion.div 
            className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
        
        <motion.button
          onClick={onNavigateToUpload}
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(245, 158, 11, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs uppercase font-bold tracking-widest hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center gap-3 shadow-lg shadow-amber-500/20 rounded-lg group"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Upload className="w-4 h-4" />
          </motion.div>
          Analyze New Match
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </motion.button>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column - Main Content */}
        <motion.div 
          variants={itemVariants}
          className="col-span-1 md:col-span-8 flex flex-col gap-8"
        >
          {/* Player Identity Card */}
          <motion.div 
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start relative overflow-hidden rounded-xl backdrop-blur-sm group hover:border-amber-500/30 transition-all duration-500"
            whileHover={{ y: -4 }}
          >
            {/* Animated background glow */}
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 group-hover:bg-amber-500/10 transition-all duration-700"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Avatar Section */}
            <motion.div 
              className="w-24 h-24 shrink-0 rounded-full border-2 border-white/20 flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent relative z-10 group-hover:border-amber-500/50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-8 h-8 text-gray-400 group-hover:text-amber-400 transition-colors" />
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                LVL 4
              </motion.div>
            </motion.div>

            {/* Info Section */}
            <div className="flex-1 w-full relative z-10">
              <div className="flex justify-between items-start mb-2 text-center sm:text-left">
                <div>
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Central Midfielder
                  </motion.h2>
                  <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    Progressive Playmaker
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" /> Streak
                  </span>
                  <span className="text-2xl font-mono text-white">{streak} <span className="text-[10px] text-gray-600 font-sans uppercase">Days</span></span>
                </div>
              </div>

              <p className="text-sm font-sans text-gray-400 mb-6 text-center sm:text-left leading-relaxed">
                Last analysis indicates strong vision under pressure, but lacking defensive transition speed. Focus on physical shielding.
              </p>

              {/* XP Progress Bar */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-gray-500">Season Progression</span>
                  <span className="text-amber-400">{xp} / {xpMax} XP</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 relative rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Timeline / History */}
          <motion.div 
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 rounded-xl backdrop-blur-sm"
          >
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-8 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" /> Recent Scout Reports
            </h3>
            
            <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b from-amber-500/50 via-white/10 to-transparent">
              {[
                { date: 'June 02, 2026', match: 'U18 League vs City Academy', rating: 78, isCurrent: true },
                { date: 'May 25, 2026', match: 'Friendly vs Sporting U18', rating: 76, isCurrent: false }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center group"
                >
                  <motion.div 
                    className={`w-6 h-6 rounded-full border-4 flex items-center justify-center shrink-0 absolute -left-6 sm:static sm:mr-4 transition-all duration-300 ${
                      item.isCurrent 
                        ? 'bg-amber-500 border-black shadow-[0_0_20px_rgba(245,158,11,0.5)]' 
                        : 'bg-white/10 border-black group-hover:bg-amber-500/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="flex-1 bg-white/5 border border-white/10 p-4 flex justify-between items-center hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 cursor-pointer rounded-lg group-hover:shadow-lg group-hover:shadow-amber-500/5"
                    whileHover={{ x: 4 }}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 block mb-1">{item.date}</span>
                      <span className="text-sm font-sans text-white font-medium">{item.match}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white">{item.rating}</span>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Upload Prompt */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center"
              >
                <motion.div 
                  className="w-6 h-6 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center shrink-0 absolute -left-6 sm:static sm:mr-4 group-hover:border-amber-500/50 transition-colors"
                  whileHover={{ scale: 1.2, borderColor: "rgba(245, 158, 11, 0.5)" }}
                />
                <motion.div 
                  className="flex-1 border border-dashed border-white/10 p-4 flex justify-center items-center hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 cursor-pointer rounded-lg"
                  onClick={onNavigateToUpload}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-xs font-sans text-gray-500 flex items-center gap-2">
                    <Upload className="w-3 h-3" /> Awaiting next match footage
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Sidebar */}
        <motion.div 
          variants={itemVariants}
          className="col-span-1 md:col-span-4 flex flex-col gap-8"
        >
          {/* Next Upgrade Goal */}
          <motion.div 
            className="bg-gradient-to-br from-amber-500/10 to-white/[0.02] border border-amber-500/30 p-6 relative rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.05)] group hover:border-amber-500/50 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <motion.div 
              className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-400 mb-6 flex items-center gap-2">
              <Target className="w-3 h-3" /> Next Upgrade Goal
            </h3>
            
            <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Master Physical Shielding
            </h4>
            
            <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
              Your ball retention under pressure is currently costing you 12% progression rate. Improve back-to-goal shielding to unlock reliable central pivot status.
            </p>

            <div className="bg-white/5 border border-white/10 p-4 mb-6 rounded-lg">
              <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-2">Recommended Drill</span>
              <span className="text-sm text-gray-300 font-sans block">Back-to-goal active resistance (4-6 weeks)</span>
            </div>

            <motion.button 
              className="w-full py-3 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-gray-300 hover:border-amber-500 hover:text-amber-400 transition-all duration-300 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Full Roadmap
            </motion.button>
          </motion.div>

          {/* Elite Status Prompt */}
          <motion.div 
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 flex flex-col items-center text-center rounded-xl backdrop-blur-sm group hover:border-cyan-500/30 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <Lock className="w-6 h-6 text-gray-600 mb-4 group-hover:text-cyan-400 transition-colors" />
            </motion.div>
            
            <h4 className="text-sm font-bold text-white mb-2">Unlock Pro Analysis</h4>
            <p className="text-xs text-gray-500 font-sans mb-6">Get unlimited tactical output and historical trajectory mapping.</p>
            
            <motion.button 
              className="w-full py-2 bg-white/5 text-amber-400 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300 border border-white/10 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Upgrade Plan
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
