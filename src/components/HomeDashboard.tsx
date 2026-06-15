// import React from 'react';
// import { Upload, Flame, Trophy, Crown, Target, Activity, ArrowRight, Shield, Calendar, Lock, Zap } from 'lucide-react';
// import { UserSession } from '../types';

// interface HomeDashboardProps {
//   xp: number;
//   level: string;
//   streak: number;
//   session: UserSession | null;
//   onNavigateToUpload: () => void;
//   onUpgrade?: () => void;
// }

// export function HomeDashboard({ xp, level, streak, session, onNavigateToUpload, onUpgrade }: HomeDashboardProps) {
  
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
             
//              {/* Daily Motivation Panel */}
//              <div className="bg-[#050505] border border-cyan-500/30 p-6 relative shadow-[0_0_30px_rgba(6,182,212,0.05)]">
//                 <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none"></div>
//                 <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-500 mb-6 flex items-center gap-2">
//                    <Target className="w-3 h-3" /> Daily Motivation
//                 </h3>
                
//                 <h4 className="text-sm font-sans font-bold text-white mb-2">Weakest Stat Today: <span className="text-cyan-500">Decision Speed</span></h4>
//                 <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
//                    Top 1% players in your archetype improved this metric by 12% last week using the Half-Turn Drill.
//                 </p>

//                 <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-4 flex flex-col gap-2">
//                    <span className="text-[9px] uppercase tracking-widest text-amber-500 block">Streak Bonuses Activated</span>
//                    <ul className="space-y-1">
//                      <li className="text-[10px] text-gray-400"><span className={streak >= 3 ? 'text-amber-500' : 'text-gray-600'}>3-Day:</span> XP Boost {streak >= 3 ? '✓' : ''}</li>
//                      <li className="text-[10px] text-gray-400"><span className={streak >= 7 ? 'text-amber-500' : 'text-gray-600'}>7-Day:</span> Leaderboard Boost</li>
//                      <li className="text-[10px] text-gray-400"><span className={streak >= 14 ? 'text-amber-500' : 'text-gray-600'}>14-Day:</span> Academy Unlock Bonus</li>
//                    </ul>
//                 </div>
//              </div>

//              {/* Upgrade Prompt (if not elite) */}
//              {session?.subscription_tier !== 'elite' && (
//                <div className="bg-[#080808] border border-[#1A1A1A] p-6 flex flex-col items-center text-center">
//                   <Lock className="w-6 h-6 text-gray-600 mb-4" />
//                   <h4 className="text-sm font-sans font-bold text-white mb-2">Unlock Pro Analysis</h4>
//                   <p className="text-xs text-gray-500 font-sans mb-6">Get unlimited tactical output and historical trajectory mapping.</p>
//                   <button onClick={onUpgrade} className="w-full py-2 bg-[#111] text-amber-500 text-[10px] font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors border border-[#222] flex items-center justify-center gap-2">
//                      <Zap className="w-3 h-3" /> Upgrade Plan
//                   </button>
//                </div>
//              )}

//           </div>

//        </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Upload, Flame, Trophy, Crown, Target, Activity, ArrowRight, Shield, Calendar, Lock, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { UserSession } from '../types';

interface HomeDashboardProps {
  xp: number;
  level: string;
  streak: number;
  session: UserSession | null;
  onNavigateToUpload: () => void;
  onUpgrade?: () => void;
}

export function HomeDashboard({ xp, level, streak, session, onNavigateToUpload, onUpgrade }: HomeDashboardProps) {
  const [mounted, setMounted] = useState(false);
  
  const xpMax = 1000;
  const xpPercent = Math.min((xp / xpMax) * 100, 100);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Enhanced Header */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1A1A1A] relative">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight mb-3">
            My Career Hub
          </h1>
          <p className="text-sm text-gray-400 font-medium tracking-wide">
            Track your evolution, analyze footage, and hit your next milestone.
          </p>
        </div>
        <button 
           onClick={onNavigateToUpload}
           className="group relative px-8 py-4 bg-gradient-to-br from-amber-500 to-amber-600 text-black text-xs uppercase font-bold tracking-widest hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 overflow-hidden"
        >
           <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
           <Upload className="w-5 h-5 group-hover:animate-bounce" /> 
           <span>Analyze New Match</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        <div className="col-span-1 md:col-span-8 flex flex-col gap-8">
          
          {/* Enhanced Player Identity Card */}
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#080808] border border-[#1A1A1A] p-8 md:p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start relative overflow-hidden group hover:border-amber-500/20 transition-all duration-500">
            {/* Animated Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 animate-pulse delay-1000"></div>
            
            {/* Avatar with Glow */}
            <div className="w-28 h-28 shrink-0 rounded-full border-2 border-[#333] flex items-center justify-center bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a] relative z-10 shadow-[0_0_30px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] transition-all duration-500">
               <Shield className="w-10 h-10 text-gray-400" />
               <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-500 to-amber-600 text-black text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-lg">
                  LVL 4
               </div>
            </div>
            
            <div className="flex-1 w-full relative z-10">
               <div className="flex justify-between items-start mb-3 text-center sm:text-left">
                  <div>
                     <h2 className="text-3xl font-bold text-white mb-1 italic">Central Midfielder</h2>
                     <p className="text-xs text-amber-500 uppercase tracking-[0.2em] font-bold flex items-center gap-2 justify-center sm:justify-start">
                        <Sparkles className="w-3 h-3" />
                        Progressive Playmaker
                     </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                     <span className="text-xs uppercase font-bold tracking-widest text-gray-500 flex items-center gap-2 mb-1">
                        <Flame className="w-4 h-4 text-orange-500 animate-pulse" /> 
                        Streak
                     </span>
                     <span className="text-3xl font-bold text-white">{streak}</span>
                     <span className="text-xs text-gray-600 uppercase tracking-wider">Days Active</span>
                  </div>
               </div>
               
               <p className="text-sm font-medium text-gray-400 mb-6 text-center sm:text-left leading-relaxed">
                 Last analysis indicates strong vision under pressure, but lacking defensive transition speed. Focus on physical shielding.
               </p>

               {/* Enhanced Progress Bar */}
               <div className="flex flex-col gap-3 w-full">
                  <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest">
                     <span className="text-gray-500">Season Progression</span>
                     <span className="text-amber-500 font-mono">{xp} / {xpMax} XP</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden relative">
                     <div 
                       className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-1000 ease-out relative" 
                       style={{ width: mounted ? `${xpPercent}%` : '0%' }}
                     >
                       {/* Shimmer Effect */}
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full animate-[shimmer_2s_ease-in-out_infinite]"></div>
                     </div>
                     {/* Progress Indicator Dot */}
                     <div 
                       className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-all duration-1000"
                       style={{ left: mounted ? `${xpPercent}%` : '0%', transform: 'translate(-50%, -50%)' }}
                     ></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Enhanced Visual Timeline */}
          <div className="bg-[#080808] border border-[#1A1A1A] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
            
            <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-gray-500 mb-10 flex items-center gap-3">
               <Calendar className="w-5 h-5 text-gray-400" /> 
               Recent Scout Reports
            </h3>
            
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b from-[#1A1A1A] via-[#222] to-[#1A1A1A]">
               
               {/* Timeline Item 1 */}
               <div className="relative group/timeline">
                  <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-4 border-[#080808] flex items-center justify-center shrink-0 absolute -left-8 top-1 group-hover/timeline:border-amber-500/50 transition-all duration-300 group-hover/timeline:scale-110"></div>
                  <div className="ml-4 bg-[#0F0F0F] border border-[#222] p-5 flex justify-between items-center hover:border-amber-500/40 hover:bg-[#111] transition-all duration-300 cursor-pointer group/card hover:translate-x-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                     <div>
                        <span className="text-xs font-mono text-gray-500 block mb-2">June 02, 2026</span>
                        <span className="text-base font-semibold text-white">U18 League vs City Academy</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-white group-hover/card:text-amber-500 transition-colors">78</span>
                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover/card:text-amber-500 group-hover/card:translate-x-1 transition-all" />
                     </div>
                  </div>
               </div>

               {/* Timeline Item 2 */}
               <div className="relative group/timeline">
                  <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-4 border-[#080808] flex items-center justify-center shrink-0 absolute -left-8 top-1 group-hover/timeline:border-amber-500/50 transition-all duration-300 group-hover/timeline:scale-110"></div>
                  <div className="ml-4 bg-[#0F0F0F] border border-[#222] p-5 flex justify-between items-center hover:border-amber-500/40 hover:bg-[#111] transition-all duration-300 cursor-pointer group/card hover:translate-x-2 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                     <div>
                        <span className="text-xs font-mono text-gray-500 block mb-2">May 25, 2026</span>
                        <span className="text-base font-semibold text-white">Friendly vs Sporting U18</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-white group-hover/card:text-amber-500 transition-colors">76</span>
                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover/card:text-amber-500 group-hover/card:translate-x-1 transition-all" />
                     </div>
                  </div>
               </div>

               {/* Timeline Item 3 - Awaiting */}
               <div className="relative group/timeline">
                  <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border-2 border-dashed border-[#333] flex items-center justify-center shrink-0 absolute -left-8 top-1 group-hover/timeline:border-amber-500/50 transition-all duration-300"></div>
                  <div 
                    className="ml-4 border border-dashed border-[#222] p-5 flex justify-center items-center hover:border-amber-500/40 hover:bg-[#0a0a0a] transition-all duration-300 cursor-pointer group/upload"
                    onClick={onNavigateToUpload}
                  >
                     <span className="text-sm font-medium text-gray-500 flex items-center gap-3 group-hover/upload:text-amber-500 transition-colors">
                        <Upload className="w-4 h-4 group-hover/upload:animate-bounce" /> 
                        Awaiting next match footage
                     </span>
                  </div>
               </div>

            </div>
          </div>

        </div>

        <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
          
          {/* Enhanced Daily Motivation Panel */}
          <div className="bg-gradient-to-br from-[#050505] to-[#0a0a0a] border border-cyan-500/30 p-8 relative shadow-[0_0_40px_rgba(6,182,212,0.08)] group hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_60px_rgba(6,182,212,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
            
            <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-cyan-500 mb-8 flex items-center gap-3">
               <Target className="w-4 h-4" /> 
               Daily Motivation
            </h3>
            
            <h4 className="text-base font-bold text-white mb-3">
              Weakest Stat Today: <span className="text-cyan-400">Decision Speed</span>
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
               Top 1% players in your archetype improved this metric by 12% last week using the Half-Turn Drill.
            </p>

            <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-5 flex flex-col gap-3 group-hover:border-cyan-500/20 transition-colors">
               <span className="text-xs uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                  <Trophy className="w-3 h-3" />
                  Streak Bonuses Activated
               </span>
               <ul className="space-y-2">
                 <li className="text-xs text-gray-400 flex items-center justify-between">
                    <span><span className={streak >= 3 ? 'text-amber-500 font-bold' : 'text-gray-600'}>3-Day:</span> XP Boost</span>
                    {streak >= 3 && <span className="text-green-500 text-lg">✓</span>}
                 </li>
                 <li className="text-xs text-gray-400 flex items-center justify-between">
                    <span><span className={streak >= 7 ? 'text-amber-500 font-bold' : 'text-gray-600'}>7-Day:</span> Leaderboard Boost</span>
                    {streak >= 7 && <span className="text-green-500 text-lg">✓</span>}
                 </li>
                 <li className="text-xs text-gray-400 flex items-center justify-between">
                    <span><span className={streak >= 14 ? 'text-amber-500 font-bold' : 'text-gray-600'}>14-Day:</span> Academy Unlock</span>
                    {streak >= 14 && <span className="text-green-500 text-lg">✓</span>}
                 </li>
               </ul>
            </div>
          </div>

          {/* Enhanced Upgrade Prompt */}
          {session?.subscription_tier !== 'elite' && (
            <div className="bg-gradient-to-br from-[#080808] to-[#0a0a0a] border border-[#1A1A1A] p-8 flex flex-col items-center text-center group hover:border-amber-500/20 transition-all duration-500">
               <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-7 h-7 text-gray-600 group-hover:text-amber-500 transition-colors" />
               </div>
               <h4 className="text-lg font-bold text-white mb-3">Unlock Pro Analysis</h4>
               <p className="text-sm text-gray-500 mb-8 leading-relaxed">Get unlimited tactical output and historical trajectory mapping.</p>
               <button 
                 onClick={onUpgrade} 
                 className="w-full py-3 bg-[#111] text-amber-500 text-xs font-bold uppercase tracking-widest hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 hover:text-black transition-all duration-300 border border-[#222] hover:border-amber-500 flex items-center justify-center gap-3 group/btn hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
               >
                  <Zap className="w-4 h-4 group-hover/btn:animate-pulse" /> 
                  <span>Upgrade Plan</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
               </button>
            </div>
          )}

        </div>

      </div>

      {/* Add custom keyframes for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
