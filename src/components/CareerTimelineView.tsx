import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Calendar, ArrowUpRight, Zap, Activity, Clock } from 'lucide-react';

const progressionData = [
  { date: 'Jan 15', ovr: 68 },
  { date: 'Feb 10', ovr: 70 },
  { date: 'Mar 05', ovr: 72 },
  { date: 'Apr 02', ovr: 75 },
  { date: 'May 12', ovr: 76 },
  { date: 'Jun 02', ovr: 78 },
];

const timelineEvents = [
  {
    id: 1,
    date: 'June 02, 2026',
    ovr: 78,
    archetype: 'Progressive Playmaker',
    match: 'U18 League vs City Academy',
    delta: { stat: 'Passing', value: '+3' },
    status: 'current'
  },
  {
    id: 2,
    date: 'May 12, 2026',
    ovr: 76,
    archetype: 'Deep-Lying Pivot',
    match: 'Friendly vs Sporting U18',
    delta: { stat: 'Vision', value: '+2' },
    status: 'past'
  },
  {
    id: 3,
    date: 'April 02, 2026',
    ovr: 75,
    archetype: 'Central Midfielder',
    match: 'Cup Quarter-Finals',
    delta: { stat: 'Positioning', value: '+4' },
    status: 'past'
  }
];

export function CareerTimelineView() {
  return (
    <div className="max-w-6xl mx-auto w-full pt-8 pb-24 px-4 w-full h-full text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-500 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Trajectory Engine
        </span>
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
          Player Career <span className="font-serif italic text-amber-500">Timeline.</span>
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl">
          Tracking your evolution. Every match analyzed builds your identity, pushing your capabilities towards elite academy standards.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Chart Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-8 bg-[#050505] border border-[#1A1A1A] p-6 relative overflow-hidden group shadow-[0_0_40px_rgba(245,158,11,0.03)]"
        >
           <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8 relative z-10">Overall Rating Trajectory</h3>
           
           <div className="h-64 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressionData}>
                  <defs>
                    <linearGradient id="colorOvr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
                  <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#666" fontSize={10} tickLine={false} axisLine={false} orientation="right" />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A', borderRadius: '4px', fontSize: '12px' }}
                     itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                     labelStyle={{ color: '#888', marginBottom: '4px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ovr" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    dot={{ fill: '#050505', stroke: '#f59e0b', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: '#f59e0b' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
           </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 flex-1 flex flex-col justify-center backdrop-blur-md relative overflow-hidden">
             <div className="absolute -right-4 -top-4 text-[#111] pointer-events-none transform -rotate-12">
               <TrendingUp className="w-32 h-32" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 relative z-10">Total Growth</span>
             <div className="flex items-baseline gap-2 relative z-10">
               <span className="text-5xl font-mono text-white">+10</span>
               <span className="text-sm font-sans text-gray-500 uppercase tracking-widest">OVR</span>
             </div>
             <p className="text-xs text-gray-400 mt-4 relative z-10">Over the last 6 months, you have evolved from a squad rotation prospect to a core starting orchestrator.</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-[#0A0A0A] border border-amber-500/30 p-6 flex-1 flex flex-col justify-center">
             <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-2">Next Milestone target</span>
             <div className="flex items-baseline gap-2">
               <span className="text-4xl font-serif italic text-white">80 OVR</span>
             </div>
             <p className="text-xs text-gray-400 mt-2 font-sans">Reach Elite Bench Status.</p>
          </div>
        </motion.div>

      </div>

      {/* Timeline List */}
      <div className="mt-12">
        <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-8 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" /> Chronological Analysis History
        </h3>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px before:h-full before:w-0.5 before:bg-[#1A1A1A]">
          {timelineEvents.map((event, idx) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="relative z-10 flex gap-6"
            >
              <div className="flex flex-col items-center shrink-0 w-12 pt-2">
                <div className={`w-12 h-12 rounded-full border-4 border-[#050505] flex items-center justify-center font-mono text-xs font-bold shadow-xl z-20 transition-all duration-300 ${event.status === 'current' ? 'bg-amber-500 text-black scale-110' : 'bg-[#111] text-gray-400'}`}>
                  {event.ovr}
                </div>
              </div>
              
              <div className={`flex-1 p-6 rounded-sm border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.05)] cursor-pointer
                ${event.status === 'current' ? 'bg-[#0A0A0A] border-amber-500/30' : 'bg-[#050505] border-[#1A1A1A]'}
              `}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block mb-2 tracking-widest uppercase">{event.date}</span>
                    <h4 className="text-xl font-serif italic text-white tracking-tight mb-1">{event.archetype}</h4>
                    <p className="text-sm font-sans text-gray-400 flex items-center gap-2">
                      <Activity className="w-3 h-3 text-gray-500" /> {event.match}
                    </p>
                  </div>
                  
                  <div className="bg-[#111] border border-[#222] px-4 py-2 rounded-sm flex items-center gap-3">
                     <span className="text-[9px] uppercase tracking-widest text-gray-500">Delta</span>
                     <div className="text-sm font-sans text-green-400 font-bold flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        {event.delta.value} {event.delta.stat}
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
