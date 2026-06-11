import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, User, Activity, Zap, Flame, History, Target, Shield, BrainCircuit, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const mockProfile = {
  player_name: "Alex Sterling",
  current_level: "Academy Prospect",
  xp: 1450,
  streak_days: 12,
  primary_position: "Central Midfielder",
  preferred_role: "Progressive Playmaker"
};

const mockHistory = [
  { match_id: "m5", date: "Oct 12", overall_rating: 81, result: "improving" },
  { match_id: "m4", date: "Oct 05", overall_rating: 79, result: "improving" },
  { match_id: "m3", date: "Sep 28", overall_rating: 76, result: "declining" },
  { match_id: "m2", date: "Sep 21", overall_rating: 78, result: "stable" },
  { match_id: "m1", date: "Sep 14", overall_rating: 77, result: "improving" }
];

const mockMemorySummary = {
  player_progress_analysis: "You have shown a +6% improvement in your dribbling execution since last match, but decision-making has regressed slightly under pressure.",
  repeating_mistakes: ["Attacking the inside channel when the outside is open"],
  improvement_areas: ["Dribbling success rate in final third"],
  next_priority_focus: "Decision making under pressure",
  confidence_trend: "improving"
};

export function PlayerEvolutionHubView() {
  return (
    <div className="max-w-6xl mx-auto w-full pt-4 pb-24 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500 mb-2 flex items-center gap-2">
          <History className="w-4 h-4" /> Performance History
        </span>
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
          Player <span className="font-serif italic text-cyan-500">Evolution Hub.</span>
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl">
          Your persistent football identity. We remember every touch, track your long-term progression, and identify true growth trends across all analyzed matches.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Player Identity Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-[#050505] border border-[#1A1A1A] p-6 flex flex-col relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
           <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#111] border border-[#333] flex items-center justify-center">
                 <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                 <h2 className="text-xl font-bold font-sans text-white">{mockProfile.player_name}</h2>
                 <p className="text-[10px] uppercase tracking-widest text-cyan-500">{mockProfile.current_level}</p>
              </div>
           </div>
           
           <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
                 <span className="text-[10px] uppercase tracking-widest text-gray-500">Position</span>
                 <span className="text-xs font-bold text-white">{mockProfile.primary_position}</span>
              </div>
              <div className="flex justify-between items-center bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
                 <span className="text-[10px] uppercase tracking-widest text-gray-500">Role</span>
                 <span className="text-xs font-bold text-white">{mockProfile.preferred_role}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="bg-[#111] border border-[#222] p-4 text-center">
                    <Zap className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                    <span className="block text-xl font-mono text-white mb-1">{mockProfile.xp}</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500">Total XP</span>
                 </div>
                 <div className="bg-[#111] border border-[#222] p-4 text-center">
                    <Flame className="w-5 h-5 text-red-500 mx-auto mb-2" />
                    <span className="block text-xl font-mono text-white mb-1">{mockProfile.streak_days}</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500">Day Streak</span>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Progress Timeline */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#050505] border border-[#1A1A1A] p-6 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Recent Performance (Last 5)
            </h3>
            <button className="text-[9px] uppercase tracking-widest text-cyan-500 hover:text-cyan-400 transition-colors">
              View All History
            </button>
          </div>

          <div className="relative h-64 flex items-end justify-between px-4 pb-8">
             {/* Chart grid background */}
             <div className="absolute inset-0 border-b border-[#222] border-l pointer-events-none mt-10 ml-8 mb-8" style={{ background: 'linear-gradient(0deg, rgba(26,26,26,0.5) 1px, transparent 1px) 0 100% / 100% 20%' }}></div>
             
             {/* Axis labels */}
             <div className="absolute left-0 top-10 bottom-8 w-6 flex flex-col justify-between text-[9px] text-gray-600 font-mono items-end">
                <span>90</span>
                <span>80</span>
                <span>70</span>
                <span>60</span>
             </div>

             {/* Bars */}
             {mockHistory.slice().reverse().map((match, idx) => {
               const heightPct = Math.max(0, (match.overall_rating - 60) / 30) * 100;
               return (
                 <div key={match.match_id} className="relative z-10 w-16 flex flex-col items-center justify-end h-full">
                    <span className="text-xs font-mono font-bold text-white mb-2 absolute -top-6">{match.overall_rating}</span>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ delay: 0.3 + (idx * 0.1), duration: 0.8, ease: "easeOut" }}
                      className={`w-12 ${idx === 4 ? 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-[#222]'} transition-colors relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-10 bg-white transition-opacity"></div>
                    </motion.div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-4 absolute -bottom-6 whitespace-nowrap">{match.date}</span>
                 </div>
               );
             })}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weakness Tracker */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#050505] border border-[#1A1A1A] p-6"
        >
          <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-6 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Weakness Tracker
          </h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#1A1A1A]">
                <div>
                   <h4 className="text-sm font-bold text-white mb-1">Weak Foot Receiving</h4>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest">Identified: 3 wks ago</p>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                   <ArrowUpRight className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-widest">Improving</span>
                </div>
             </div>
             
             <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#1A1A1A]">
                <div>
                   <h4 className="text-sm font-bold text-white mb-1">Decision Making (Pressure)</h4>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest">Identified: 1 wk ago</p>
                </div>
                <div className="flex items-center gap-2 text-amber-500">
                   <Minus className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-widest">Inconsistent</span>
                </div>
             </div>

             <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#1A1A1A]">
                <div>
                   <h4 className="text-sm font-bold text-white mb-1">Defensive Positioning</h4>
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest">Identified: 4 wks ago</p>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                   <Minus className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-widest">Stable</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* AI Coach Summary Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-cyan-500/30 p-6 relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
             <BrainCircuit className="w-64 h-64" />
          </div>
          <h3 className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 mb-6 flex items-center gap-2 relative z-10">
            <BrainCircuit className="w-4 h-4" /> AI Coach Memory Analysis
          </h3>
          
          <div className="relative z-10 space-y-6">
             <div>
                <p className="text-lg font-serif italic text-white leading-relaxed">
                   "{mockMemorySummary.player_progress_analysis}"
                </p>
             </div>
             
             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1A1A1A]">
                <div>
                   <span className="text-[9px] uppercase tracking-widest text-green-500 block mb-2">Growth Detected</span>
                   <ul className="space-y-2">
                     {mockMemorySummary.improvement_areas.map((item, i) => (
                       <li key={i} className="text-xs text-gray-300 font-sans flex items-start gap-2">
                         <TrendingUp className="w-3 h-3 text-green-500 shrink-0 mt-0.5" /> {item}
                       </li>
                     ))}
                   </ul>
                </div>
                <div>
                   <span className="text-[9px] uppercase tracking-widest text-red-500 block mb-2">Repeating Flaws</span>
                   <ul className="space-y-2">
                     {mockMemorySummary.repeating_mistakes.map((item, i) => (
                       <li key={i} className="text-xs text-gray-300 font-sans flex items-start gap-2">
                         <Target className="w-3 h-3 text-red-500 shrink-0 mt-0.5" /> {item}
                       </li>
                     ))}
                   </ul>
                </div>
             </div>
             
             <div className="bg-[#111] border border-cyan-500/20 p-4 mt-6 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Next Priority Focus</span>
                  <span className="text-sm font-bold text-white">{mockMemorySummary.next_priority_focus}</span>
                </div>
                <button className="px-4 py-2 bg-cyan-500/10 text-cyan-500 text-[10px] uppercase tracking-widest font-bold hover:bg-cyan-500/20 transition-colors">
                  Generate Plan
                </button>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
