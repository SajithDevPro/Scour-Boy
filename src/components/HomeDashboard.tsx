import React from 'react';
import { Upload, Flame, Trophy, Crown, Target, Activity, ArrowRight, Shield, Calendar, Lock, Zap } from 'lucide-react';
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
  
  const xpMax = 1000;
  const xpPercent = Math.min((xp / xpMax) * 100, 100);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
       
       <header className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#1A1A1A]">
          <div>
            <h1 className="text-3xl font-sans font-bold text-white tracking-tight mb-2">My Career Hub</h1>
            <p className="text-sm text-gray-400 font-sans">Track your evolution, analyze footage, and hit your next milestone.</p>
          </div>
          <button 
             onClick={onNavigateToUpload}
             className="px-6 py-3 bg-amber-500 text-black text-[10px] uppercase font-bold tracking-widest hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
             <Upload className="w-4 h-4" /> Analyze New Match
          </button>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="col-span-1 md:col-span-8 flex flex-col gap-8">
             
             {/* Player Identity Card */}
             <div className="bg-[#080808] border border-[#1A1A1A] p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                
                <div className="w-24 h-24 shrink-0 rounded-full border-2 border-[#333] flex items-center justify-center bg-[#0F0F0F] relative z-10">
                   <Shield className="w-8 h-8 text-gray-400" />
                   <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">
                      LVL 4
                   </div>
                </div>
                
                <div className="flex-1 w-full relative z-10">
                   <div className="flex justify-between items-start mb-2 text-center sm:text-left">
                      <div>
                         <h2 className="text-2xl font-serif italic text-white">Central Midfielder</h2>
                         <p className="text-xs text-amber-500 uppercase tracking-widest font-bold">Progressive Playmaker</p>
                      </div>
                      <div className="hidden sm:flex flex-col items-end">
                         <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500" /> Streak</span>
                         <span className="text-xl font-mono text-white">{streak} <span className="text-[10px] text-gray-600 font-sans uppercase">Days</span></span>
                      </div>
                   </div>
                   
                   <p className="text-sm font-sans text-gray-400 mb-6 text-center sm:text-left">
                     Last analysis indicates strong vision under pressure, but lacking defensive transition speed. Focus on physical shielding.
                   </p>

                   <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                         <span className="text-gray-500">Season Progression</span>
                         <span className="text-amber-500">{xp} / {xpMax} XP</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                         <div className="h-full bg-amber-500 transition-all duration-1000 relative" style={{ width: `${xpPercent}%` }}>
                           <div className="absolute inset-0 bg-white/20 w-full animate-[pulse_2s_ease-in-out_infinite]"></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Visual Timeline / History */}
             <div className="bg-[#080808] border border-[#1A1A1A] p-8">
                <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-8 flex items-center gap-2">
                   <Calendar className="w-4 h-4 text-gray-400" /> Recent Scout Reports
                </h3>
                
                <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-[#1A1A1A]">
                   
                   <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center">
                      <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-4 border-[#080808] flex items-center justify-center shrink-0 absolute -left-6 sm:static sm:mr-2"></div>
                      <div className="flex-1 bg-[#0F0F0F] border border-[#222] p-4 flex justify-between items-center hover:border-amber-500/30 transition-colors cursor-pointer">
                         <div>
                            <span className="text-[10px] font-mono text-gray-500 block mb-1">June 02, 2026</span>
                            <span className="text-sm font-sans text-white font-medium">U18 League vs City Academy</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-lg font-serif italic text-white">78</span>
                            <ArrowRight className="w-4 h-4 text-gray-600" />
                         </div>
                      </div>
                   </div>

                   <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center">
                      <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-4 border-[#080808] flex items-center justify-center shrink-0 absolute -left-6 sm:static sm:mr-2"></div>
                      <div className="flex-1 bg-[#0F0F0F] border border-[#222] p-4 flex justify-between items-center hover:border-amber-500/30 transition-colors cursor-pointer">
                         <div>
                            <span className="text-[10px] font-mono text-gray-500 block mb-1">May 25, 2026</span>
                            <span className="text-sm font-sans text-white font-medium">Friendly vs Sporting U18</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-lg font-serif italic text-white">76</span>
                            <ArrowRight className="w-4 h-4 text-gray-600" />
                         </div>
                      </div>
                   </div>

                   <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:items-center">
                      <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border-2 border-dashed border-[#333] flex items-center justify-center shrink-0 absolute -left-6 sm:static sm:mr-2"></div>
                      <div className="flex-1 border border-dashed border-[#222] p-4 flex justify-center items-center hover:border-[#444] transition-colors cursor-pointer" onClick={onNavigateToUpload}>
                         <span className="text-xs font-sans text-gray-500 flex items-center gap-2"><Upload className="w-3 h-3" /> Awaiting next match footage</span>
                      </div>
                   </div>

                </div>
             </div>

          </div>

          <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
             
             {/* Daily Motivation Panel */}
             <div className="bg-[#050505] border border-cyan-500/30 p-6 relative shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full pointer-events-none"></div>
                <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-500 mb-6 flex items-center gap-2">
                   <Target className="w-3 h-3" /> Daily Motivation
                </h3>
                
                <h4 className="text-sm font-sans font-bold text-white mb-2">Weakest Stat Today: <span className="text-cyan-500">Decision Speed</span></h4>
                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
                   Top 1% players in your archetype improved this metric by 12% last week using the Half-Turn Drill.
                </p>

                <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-4 flex flex-col gap-2">
                   <span className="text-[9px] uppercase tracking-widest text-amber-500 block">Streak Bonuses Activated</span>
                   <ul className="space-y-1">
                     <li className="text-[10px] text-gray-400"><span className={streak >= 3 ? 'text-amber-500' : 'text-gray-600'}>3-Day:</span> XP Boost {streak >= 3 ? '✓' : ''}</li>
                     <li className="text-[10px] text-gray-400"><span className={streak >= 7 ? 'text-amber-500' : 'text-gray-600'}>7-Day:</span> Leaderboard Boost</li>
                     <li className="text-[10px] text-gray-400"><span className={streak >= 14 ? 'text-amber-500' : 'text-gray-600'}>14-Day:</span> Academy Unlock Bonus</li>
                   </ul>
                </div>
             </div>

             {/* Upgrade Prompt (if not elite) */}
             {session?.subscription_tier !== 'elite' && (
               <div className="bg-[#080808] border border-[#1A1A1A] p-6 flex flex-col items-center text-center">
                  <Lock className="w-6 h-6 text-gray-600 mb-4" />
                  <h4 className="text-sm font-sans font-bold text-white mb-2">Unlock Pro Analysis</h4>
                  <p className="text-xs text-gray-500 font-sans mb-6">Get unlimited tactical output and historical trajectory mapping.</p>
                  <button onClick={onUpgrade} className="w-full py-2 bg-[#111] text-amber-500 text-[10px] font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors border border-[#222] flex items-center justify-center gap-2">
                     <Zap className="w-3 h-3" /> Upgrade Plan
                  </button>
               </div>
             )}

          </div>

       </div>
    </div>
  );
}
