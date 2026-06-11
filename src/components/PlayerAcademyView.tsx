import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, BrainCircuit, Target, CheckCircle2, Circle, Dumbbell, Flag, AlertCircle, ChevronRight, Activity } from 'lucide-react';
import { ReportData, AcademyPlan, UserSession } from '../types';
import { FeatureLock } from './FeatureLock';

interface PlayerAcademyViewProps {
  report: ReportData | null;
  session: UserSession | null;
  onUpgrade?: () => void;
}

const defaultAcademyPlan: AcademyPlan = {
  weekly_focus: "Decision Making Under Pressure",
  modules: [
    {
      title: "Scanning Before Receiving",
      type: "awareness",
      duration: "10 min",
      goal: "Improve first touch awareness",
      drill: "Wall pass + shoulder scan every 2 seconds before reception",
      game_application: "Improves midfield control under pressure and pre-plans next action",
      difficulty: 3,
      completed: false
    },
    {
      title: "Half-Turn Reception",
      type: "technical",
      duration: "15 min",
      goal: "Receive the ball ready to play forward",
      drill: "Receive firm passes from a wall or partner on the back foot, open body to the field",
      game_application: "Evade incoming pressure from behind and quickly transition to attack",
      difficulty: 4,
      completed: false
    }
  ],
  match_transfer_tasks: [
    "Attempt 5 physical shoulder scans before every reception",
    "Avoid first-touch directional mistakes in central midfield"
  ],
  progress_conditions: [
    "Complete 3 sessions before next match analysis",
    "Show 15% reduction in pressured turnovers"
  ]
};

export function PlayerAcademyView({ report, session, onUpgrade }: PlayerAcademyViewProps) {
  const plan = report?.academy_plan || defaultAcademyPlan;

  const [completedModules, setCompletedModules] = useState<number[]>([]);

  if (!session || session.subscription_tier === 'free') {
    return (
      <div className="relative w-full max-w-6xl mx-auto min-h-[60vh] flex flex-col justify-center items-center">
         <FeatureLock 
           title="Weekly AI Academy Plans Locked" 
           description="Transform your match weaknesses into actionable, step-by-step training modules with our Pro Academy." 
           requiredTier="pro" 
           onUpgrade={onUpgrade || (() => {})} 
         />
      </div>
    );
  }

  const toggleModule = (idx: number) => {
    if (completedModules.includes(idx)) {
      setCompletedModules(completedModules.filter(i => i !== idx));
    } else {
      setCompletedModules([...completedModules, idx]);
    }
  };

  const completionRate = Math.round((completedModules.length / plan.modules.length) * 100) || 0;

  return (
    <div className="max-w-6xl mx-auto w-full pt-4 pb-24 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500 mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Personal Training Engine
        </span>
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
          Player <span className="font-serif italic text-cyan-500">Academy.</span>
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl">
          Your dynamically generated curriculum based on your real match mistakes. We don't do generic fitness here; we fix what you do wrong on the pitch.
        </p>
      </motion.div>

      {/* Training Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
           className="lg:col-span-2 bg-[#050505] border border-cyan-500/20 p-8 flex flex-col justify-center relative overflow-hidden group"
        >
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
          <h2 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-4 flex items-center gap-2 relative z-10"><Target className="w-4 h-4 text-cyan-500" /> Current Weekly Focus</h2>
          <h3 className="text-3xl font-serif italic text-white mb-4 relative z-10">{plan.weekly_focus}</h3>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex-1 bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${completionRate}%` }}
                 className="bg-cyan-500 h-full"
               ></motion.div>
            </div>
            <span className="text-xs font-mono text-cyan-500">{completionRate}% Completed</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-[#1A1A1A] p-6 flex flex-col"
        >
           <h3 className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 mb-4 flex items-center gap-2"><BrainCircuit className="w-4 h-4" /> AI Academy Coach</h3>
           <p className="text-sm text-gray-300 font-sans italic flex-1 flex items-center">
             "Based on your latest match analysis, you're hesitating under pressure and losing possession. This curriculum rebuilds your scanning and receiving mechanics to fix it."
           </p>
           <div className="mt-4 pt-4 border-t border-[#1AA] border-opacity-20 flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-widest text-gray-500">Status</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500 animate-pulse">Awaiting Execution</span>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Modules List */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2 border-b border-[#1A1A1A] pb-2 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-cyan-500" /> Prescribed Training Modules
           </h3>
           
           {plan.modules.map((module, idx) => {
             const isCompleted = completedModules.includes(idx);
             return (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 + (idx * 0.1) }}
                 className={`border ${isCompleted ? 'border-cyan-500/20 bg-[#050505]' : 'border-[#222] bg-[#0A0A0A] hover:border-[#444]'} p-6 transition-all group`}
               >
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <div className="flex items-center gap-3 mb-2">
                       <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 border ${isCompleted ? 'text-cyan-500 border-cyan-500/30 bg-cyan-500/10' : 'text-gray-400 border-gray-600'}`}>
                         {module.type}
                       </span>
                       <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1"><Activity className="w-3 h-3" /> Lvl {module.difficulty}</span>
                       <span className="text-[10px] text-gray-500 font-mono">{module.duration}</span>
                     </div>
                     <h4 className={`text-xl font-serif ${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>{module.title}</h4>
                   </div>
                   <button 
                     onClick={() => toggleModule(idx)}
                     className={`flex items-center justify-center p-2 rounded-full transition-colors ${isCompleted ? 'text-cyan-500' : 'text-gray-600 hover:text-white'}`}
                   >
                     {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                   </button>
                 </div>
                 
                 <div className={`space-y-4 ${isCompleted ? 'opacity-40 grayscale' : 'opacity-100'}`}>
                   <div className="bg-[#111] border-l-2 border-amber-500/50 p-4">
                     <span className="text-[9px] uppercase tracking-widest text-amber-500 block mb-2">The Drill</span>
                     <p className="text-sm text-gray-300 font-sans">{module.drill}</p>
                   </div>
                   
                   <div className="bg-[#111] border border-[#222] p-4 flex gap-4 items-start">
                     <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0 mt-1">
                        <Target className="w-4 h-4 text-cyan-500" />
                     </div>
                     <div>
                       <span className="text-[9px] uppercase tracking-widest text-cyan-500 block mb-1">Match Application</span>
                       <p className="text-xs text-gray-400 font-sans">{module.game_application}</p>
                     </div>
                   </div>
                 </div>
               </motion.div>
             );
           })}
        </div>
        
        {/* Sidebar: Match Transfer & Tasks */}
        <div className="lg:col-span-1 space-y-6">
           
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-[#050505] border border-[#1A1A1A] p-6"
           >
             <h3 className="text-[10px] uppercase font-bold tracking-widest text-amber-500 mb-6 border-b border-[#1A1A1A] pb-2 flex items-center gap-2">
                <Flag className="w-4 h-4" /> Match Transfer Tasks
             </h3>
             <p className="text-xs text-gray-400 font-sans mb-4">You must attempt these specific actions in your next real match to prove adaptation.</p>
             <ul className="space-y-3">
               {plan.match_transfer_tasks.map((task, i) => (
                 <li key={i} className="flex gap-3 text-sm text-white font-sans bg-[#111] p-3 border border-[#222]">
                   <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> 
                   <span className="leading-tight">{task}</span>
                 </li>
               ))}
             </ul>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 }}
             className="bg-[#050505] border border-[#1A1A1A] p-6"
           >
             <h3 className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 mb-6 border-b border-[#1A1A1A] pb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Progress Conditions
             </h3>
             <p className="text-xs text-gray-400 font-sans mb-4">Requirements to advance to the next level of training.</p>
             <ul className="space-y-3">
               {plan.progress_conditions.map((task, i) => (
                 <li key={i} className="flex gap-3 text-sm text-gray-300 font-sans items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0"></div>
                   <span className="leading-tight">{task}</span>
                 </li>
               ))}
             </ul>
           </motion.div>

        </div>

      </div>
    </div>
  );
}
