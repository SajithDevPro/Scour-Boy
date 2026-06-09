// import React from 'react';
// import { motion } from 'motion/react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// import { TrendingUp, Calendar, ArrowUpRight, Zap, Activity, Clock } from 'lucide-react';

// const progressionData = [
//   { date: 'Jan 15', ovr: 68 },
//   { date: 'Feb 10', ovr: 70 },
//   { date: 'Mar 05', ovr: 72 },
//   { date: 'Apr 02', ovr: 75 },
//   { date: 'May 12', ovr: 76 },
//   { date: 'Jun 02', ovr: 78 },
// ];

// const timelineEvents = [
//   {
//     id: 1,
//     date: 'June 02, 2026',
//     ovr: 78,
//     archetype: 'Progressive Playmaker',
//     match: 'U18 League vs City Academy',
//     delta: { stat: 'Passing', value: '+3' },
//     status: 'current'
//   },
//   {
//     id: 2,
//     date: 'May 12, 2026',
//     ovr: 76,
//     archetype: 'Deep-Lying Pivot',
//     match: 'Friendly vs Sporting U18',
//     delta: { stat: 'Vision', value: '+2' },
//     status: 'past'
//   },
//   {
//     id: 3,
//     date: 'April 02, 2026',
//     ovr: 75,
//     archetype: 'Central Midfielder',
//     match: 'Cup Quarter-Finals',
//     delta: { stat: 'Positioning', value: '+4' },
//     status: 'past'
//   }
// ];

// export function CareerTimelineView() {
//   return (
//     <div className="max-w-6xl mx-auto w-full pt-8 pb-24 px-4 w-full h-full text-white">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-12"
//       >
//         <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-500 mb-2 flex items-center gap-2">
//           <TrendingUp className="w-4 h-4" /> Trajectory Engine
//         </span>
//         <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
//           Player Career <span className="font-serif italic text-amber-500">Timeline.</span>
//         </h1>
//         <p className="text-sm text-gray-400 font-sans max-w-2xl">
//           Tracking your evolution. Every match analyzed builds your identity, pushing your capabilities towards elite academy standards.
//         </p>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* Chart Section */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.1, duration: 0.5 }}
//           className="lg:col-span-8 bg-[#050505] border border-[#1A1A1A] p-6 relative overflow-hidden group shadow-[0_0_40px_rgba(245,158,11,0.03)]"
//         >
//            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
//            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8 relative z-10">Overall Rating Trajectory</h3>
           
//            <div className="h-64 w-full relative z-10">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={progressionData}>
//                   <defs>
//                     <linearGradient id="colorOvr" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
//                       <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
//                   <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
//                   <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#666" fontSize={10} tickLine={false} axisLine={false} orientation="right" />
//                   <Tooltip 
//                      contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A', borderRadius: '4px', fontSize: '12px' }}
//                      itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
//                      labelStyle={{ color: '#888', marginBottom: '4px' }}
//                   />
//                   <Line 
//                     type="monotone" 
//                     dataKey="ovr" 
//                     stroke="#f59e0b" 
//                     strokeWidth={3} 
//                     dot={{ fill: '#050505', stroke: '#f59e0b', strokeWidth: 2, r: 4 }} 
//                     activeDot={{ r: 6, fill: '#f59e0b' }} 
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//            </div>
//         </motion.div>

//         {/* Stats Summary */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="lg:col-span-4 flex flex-col gap-4"
//         >
//           <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 flex-1 flex flex-col justify-center backdrop-blur-md relative overflow-hidden">
//              <div className="absolute -right-4 -top-4 text-[#111] pointer-events-none transform -rotate-12">
//                <TrendingUp className="w-32 h-32" />
//              </div>
//              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 relative z-10">Total Growth</span>
//              <div className="flex items-baseline gap-2 relative z-10">
//                <span className="text-5xl font-mono text-white">+10</span>
//                <span className="text-sm font-sans text-gray-500 uppercase tracking-widest">OVR</span>
//              </div>
//              <p className="text-xs text-gray-400 mt-4 relative z-10">Over the last 6 months, you have evolved from a squad rotation prospect to a core starting orchestrator.</p>
//           </div>
//           <div className="bg-gradient-to-br from-amber-500/10 to-[#0A0A0A] border border-amber-500/30 p-6 flex-1 flex flex-col justify-center">
//              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-2">Next Milestone target</span>
//              <div className="flex items-baseline gap-2">
//                <span className="text-4xl font-serif italic text-white">80 OVR</span>
//              </div>
//              <p className="text-xs text-gray-400 mt-2 font-sans">Reach Elite Bench Status.</p>
//           </div>
//         </motion.div>

//       </div>

//       {/* Timeline List */}
//       <div className="mt-12">
//         <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-8 flex items-center gap-2">
//           <Calendar className="w-4 h-4 text-gray-400" /> Chronological Analysis History
//         </h3>
        
//         <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px before:h-full before:w-0.5 before:bg-[#1A1A1A]">
//           {timelineEvents.map((event, idx) => (
//             <motion.div 
//               key={event.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 + (idx * 0.1) }}
//               className="relative z-10 flex gap-6"
//             >
//               <div className="flex flex-col items-center shrink-0 w-12 pt-2">
//                 <div className={`w-12 h-12 rounded-full border-4 border-[#050505] flex items-center justify-center font-mono text-xs font-bold shadow-xl z-20 transition-all duration-300 ${event.status === 'current' ? 'bg-amber-500 text-black scale-110' : 'bg-[#111] text-gray-400'}`}>
//                   {event.ovr}
//                 </div>
//               </div>
              
//               <div className={`flex-1 p-6 rounded-sm border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.05)] cursor-pointer
//                 ${event.status === 'current' ? 'bg-[#0A0A0A] border-amber-500/30' : 'bg-[#050505] border-[#1A1A1A]'}
//               `}>
//                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//                   <div>
//                     <span className="text-[10px] font-mono text-gray-500 block mb-2 tracking-widest uppercase">{event.date}</span>
//                     <h4 className="text-xl font-serif italic text-white tracking-tight mb-1">{event.archetype}</h4>
//                     <p className="text-sm font-sans text-gray-400 flex items-center gap-2">
//                       <Activity className="w-3 h-3 text-gray-500" /> {event.match}
//                     </p>
//                   </div>
                  
//                   <div className="bg-[#111] border border-[#222] px-4 py-2 rounded-sm flex items-center gap-3">
//                      <span className="text-[9px] uppercase tracking-widest text-gray-500">Delta</span>
//                      <div className="text-sm font-sans text-green-400 font-bold flex items-center gap-1">
//                         <ArrowUpRight className="w-3 h-3" />
//                         {event.delta.value} {event.delta.stat}
//                      </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts';
import { TrendingUp, Calendar, ArrowUpRight, Zap, Activity, Clock, Award, Target } from 'lucide-react';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function CareerTimelineView() {
  return (
    <motion.div 
      className="max-w-6xl mx-auto w-full pt-8 pb-24 px-4 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-16 relative">
        <motion.div 
          className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"
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
        
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-500 mb-4 flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <TrendingUp className="w-4 h-4" />
          </motion.span>
          Trajectory Engine v2.0
        </span>
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
          Player Career
          <br />
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Timeline.
          </span>
        </h1>
        
        <p className="text-base text-gray-400 font-sans max-w-2xl leading-relaxed">
          Tracking your evolution. Every match analyzed builds your identity, pushing your capabilities towards elite academy standards.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Chart Section */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 relative overflow-hidden group shadow-2xl shadow-black/20 rounded-xl backdrop-blur-sm hover:border-amber-500/20 transition-all duration-500"
          whileHover={{ y: -4 }}
        >
          {/* Animated background glow */}
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-1000"
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

          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8 relative z-10 flex items-center gap-2">
            <Activity className="w-3 h-3 text-amber-500" />
            Overall Rating Trajectory
          </h3>
          
          <div className="h-72 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressionData}>
                <defs>
                  <linearGradient id="colorOvr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                />
                <YAxis 
                  domain={['dataMin - 2', 'dataMax + 2']} 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  orientation="right"
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 10, 10, 0.95)', 
                    border: '1px solid rgba(245, 158, 11, 0.3)', 
                    borderRadius: '8px', 
                    fontSize: '13px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
                  labelStyle={{ color: '#9ca3af', marginBottom: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  formatter={(value) => [`${value} OVR`, 'Rating']}
                />
                <Area
                  type="monotone"
                  dataKey="ovr"
                  stroke="none"
                  fill="url(#colorOvr)"
                  fillOpacity={1}
                />
                <Line
                  type="monotone"
                  dataKey="ovr"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ 
                    fill: '#0a0a0a', 
                    stroke: '#f59e0b', 
                    strokeWidth: 3, 
                    r: 5,
                    filter: 'url(#glow)'
                  }}
                  activeDot={{ 
                    r: 8, 
                    fill: '#f59e0b',
                    stroke: '#fff',
                    strokeWidth: 2,
                    filter: 'url(#glow)'
                  }}
                  filter="url(#glow)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <motion.div 
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 flex-1 flex flex-col justify-center backdrop-blur-sm relative overflow-hidden rounded-xl group hover:border-cyan-500/30 transition-all duration-500"
            whileHover={{ y: -4 }}
          >
            <motion.div 
              className="absolute -right-8 -top-8 text-white/5 pointer-events-none transform -rotate-12 group-hover:text-cyan-500/10 transition-colors duration-500"
              animate={{ rotate: [-12, -8, -12] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp className="w-40 h-40" />
            </motion.div>
            
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 relative z-10 flex items-center gap-2">
              <Award className="w-3 h-3 text-cyan-400" />
              Total Growth
            </span>
            
            <div className="flex items-baseline gap-3 relative z-10">
              <motion.span 
                className="text-6xl font-mono text-white font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                +10
              </motion.span>
              <span className="text-sm font-sans text-gray-500 uppercase tracking-widest">OVR</span>
            </div>
            
            <p className="text-xs text-gray-400 mt-6 relative z-10 leading-relaxed">
              Over the last 6 months, you have evolved from a squad rotation prospect to a core starting orchestrator.
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-amber-500/10 to-white/[0.02] border border-amber-500/30 p-8 flex-1 flex flex-col justify-center rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-all duration-500"
            whileHover={{ y: -4 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-3 relative z-10 flex items-center gap-2">
              <Target className="w-3 h-3" />
              Next Milestone Target
            </span>
            
            <div className="flex items-baseline gap-3 relative z-10">
              <motion.span 
                className="text-5xl font-serif italic text-white"
                whileHover={{ scale: 1.05 }}
              >
                80 OVR
              </motion.span>
            </div>
            
            <p className="text-xs text-gray-400 mt-4 font-sans relative z-10">
              Reach Elite Bench Status and unlock advanced tactical modules.
            </p>

            <motion.div 
              className="mt-6 h-1.5 bg-white/10 rounded-full overflow-hidden relative z-10"
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "80%" }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline List */}
      <motion.div variants={itemVariants} className="mt-16">
        <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-10 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" /> 
          Chronological Analysis History
        </h3>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b from-amber-500/50 via-white/10 to-transparent">
          {timelineEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (idx * 0.15) }}
              className="relative z-10 flex gap-6 group"
            >
              <div className="flex flex-col items-center shrink-0 w-12 pt-2">
                <motion.div 
                  className={`w-12 h-12 rounded-full border-4 border-black flex items-center justify-center font-mono text-xs font-bold shadow-xl z-20 transition-all duration-300 ${
                    event.status === 'current' 
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-black scale-110 shadow-[0_0_30px_rgba(245,158,11,0.5)]' 
                      : 'bg-white/10 text-gray-400 group-hover:bg-amber-500/20 group-hover:text-amber-400 group-hover:scale-105'
                  }`}
                  whileHover={{ scale: 1.15 }}
                >
                  {event.ovr}
                </motion.div>
                {event.status === 'current' && (
                  <motion.div 
                    className="absolute w-12 h-12 rounded-full border-2 border-amber-500/50"
                    animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
              
              <motion.div 
                className={`flex-1 p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  event.status === 'current' 
                    ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-amber-500/30 shadow-lg shadow-amber-500/5' 
                    : 'bg-white/5 border-white/10 hover:border-amber-500/20 hover:bg-white/10'
                }`}
                whileHover={{ x: 8, y: -2 }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block mb-2 tracking-widest uppercase flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {event.date}
                    </span>
                    <h4 className="text-2xl font-serif italic text-white tracking-tight mb-2 group-hover:text-amber-400 transition-colors">
                      {event.archetype}
                    </h4>
                    <p className="text-sm font-sans text-gray-400 flex items-center gap-2">
                      <Activity className="w-3 h-3 text-gray-500" /> 
                      {event.match}
                    </p>
                  </div>
                  
                  <motion.div 
                    className="bg-white/5 border border-white/10 px-5 py-3 rounded-lg flex items-center gap-3 group-hover:border-amber-500/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-[9px] uppercase tracking-widest text-gray-500">Delta</span>
                    <div className="text-sm font-sans text-green-400 font-bold flex items-center gap-1">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowUpRight className="w-3 h-3" />
                      </motion.div>
                      {event.delta.value} {event.delta.stat}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}