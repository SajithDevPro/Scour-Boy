// import React, { useRef } from 'react';
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
// import { Download, Share2, Flame, ShieldAlert, Cpu, Trophy, ActivitySquare, BrainCircuit, Lock, Map, Fingerprint, Target, TrendingUp, AlertTriangle } from 'lucide-react';
// import { ReportData } from '../types';
// import html2canvas from 'html2canvas';

// interface ReportDashboardProps {
//   report: ReportData;
//   onReset: () => void;
// }

// export function SocialCard({ report, innerRef }: { report: ReportData, innerRef: React.RefObject<HTMLDivElement | null> }) {
//   return (
//     <div ref={innerRef} className="w-[1080px] h-[1920px] bg-[#050505] text-[#D1D1D1] relative flex flex-col p-16 font-sans overflow-hidden">
//       {/* Background Graphic */}
//       <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10">
//         <div className="w-[150%] h-[150%] aspect-square rounded-full border-[1px] border-amber-500 blur-3xl absolute"></div>
//         <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-black absolute inset-0 z-10"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 mt-12 mb-16 flex flex-col items-center">
//         <span className="text-3xl tracking-[0.4em] text-amber-500 font-bold uppercase mb-2">Player Identity</span>
//         <h1 className="text-8xl font-serif italic text-white tracking-tight text-center leading-none">
//           {report.overallRating} <span className="text-5xl text-gray-500 ml-4 font-normal not-italic">OVR</span>
//         </h1>
//         <p className="text-4xl text-gray-400 mt-6 font-serif italic text-center max-w-2xl leading-snug">"{report.identity.archetype}"</p>
//       </header>

//       {/* Radar Section */}
//       <div className="w-full aspect-square relative z-10 my-12 bg-[#080808] border-2 border-[#1A1A1A] flex items-center justify-center rounded-full p-20 shadow-[0_0_100px_rgba(245,158,11,0.15)]">
//         <ResponsiveContainer width="100%" height="100%">
//           <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
//             { subject: 'TEC', A: report.reality.attributes.technical, fullMark: 100 },
//             { subject: 'TAC', A: report.reality.attributes.tactical, fullMark: 100 },
//             { subject: 'PHY', A: report.reality.attributes.physical, fullMark: 100 },
//             { subject: 'MEN', A: report.reality.attributes.mental, fullMark: 100 },
//             { subject: 'CRE', A: report.reality.attributes.creativity, fullMark: 100 },
//             { subject: 'DEF', A: report.reality.attributes.defensive, fullMark: 100 },
//             { subject: 'ATT', A: report.reality.attributes.attacking, fullMark: 100 },
//             { subject: 'CON', A: report.reality.attributes.consistency, fullMark: 100 }
//           ]}>
//             <PolarGrid stroke="#333" strokeWidth={3} />
//             <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 36, fontWeight: 'bold' }} />
//             <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
//             <Radar name="Player" dataKey="A" stroke="#f59e0b" strokeWidth={8} fill="#f59e0b" fillOpacity={0.3} />
//           </RadarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Stats Section */}
//       <div className="relative z-10 grid grid-cols-2 gap-12 mt-auto mb-16">
//          <div className="bg-[#0A0A0A] border-2 border-[#1A1A1A] p-10 flex flex-col justify-center items-center">
//             <span className="text-gray-500 uppercase tracking-widest text-2xl font-bold mb-4">Role</span>
//             <span className="text-4xl font-serif italic text-amber-500 text-center">{report.identity.role}</span>
//          </div>
//          <div className="bg-[#0A0A0A] border-2 border-[#1A1A1A] p-10 flex flex-col items-center justify-center">
//             <span className="text-gray-500 uppercase tracking-widest text-xl font-bold mb-6 text-center">Plays Like</span>
//             <span className="text-3xl text-white font-serif italic text-center leading-tight">{report.identity.comparisonPlayer}</span>
//          </div>
//       </div>
      
//       {/* Footer */}
//       <footer className="relative z-10 mt-auto border-t-4 border-[#1A1A1A] pt-12 flex justify-between items-center px-8">
//          <div className="text-3xl text-gray-600 font-bold tracking-widest uppercase">Player Progression System</div>
//          <div className="text-3xl text-amber-500 font-bold tracking-widest uppercase">Identity Established</div>
//       </footer>
//     </div>
//   );
// }

// export function ReportDashboard({ report, onReset }: ReportDashboardProps) {
//   const cardRef = useRef<HTMLDivElement>(null);

//   const radarData = [
//     { subject: 'Technical', A: report.reality.attributes.technical, fullMark: 100 },
//     { subject: 'Tactical', A: report.reality.attributes.tactical, fullMark: 100 },
//     { subject: 'Physical', A: report.reality.attributes.physical, fullMark: 100 },
//     { subject: 'Mental', A: report.reality.attributes.mental, fullMark: 100 },
//     { subject: 'Creativity', A: report.reality.attributes.creativity, fullMark: 100 },
//     { subject: 'Defensive', A: report.reality.attributes.defensive, fullMark: 100 },
//     { subject: 'Attacking', A: report.reality.attributes.attacking, fullMark: 100 },
//     { subject: 'Consistency', A: report.reality.attributes.consistency, fullMark: 100 },
//   ];

//   const handleExport = async () => {
//     if (!cardRef.current) return;
//     try {
//        // Briefly show the element, render it, then hide it again. 
//        // For a truly background render, it needs to be visible to the DOM temporarily.
//        cardRef.current.style.display = 'flex';
//        const canvas = await html2canvas(cardRef.current, { scale: 1 });
//        cardRef.current.style.display = 'none';
       
//        const url = canvas.toDataURL('image/jpeg', 0.9);
//        const a = document.createElement('a');
//        a.href = url;
//        a.download = `elite-scout-card-${report.overallRating}.jpg`;
//        a.click();
//     } catch(err) {
//       console.error('Error generating card', err);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
//       {/* Hidden Card for export */}
//       <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0">
//          <SocialCard report={report} innerRef={cardRef} />
//       </div>

//       {/* Main Stats Header */}
//       <div className="bg-[#080808] border border-[#1A1A1A] p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 z-10 group">
//         <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -space-x-1/2 translate-x-[-100%] group-hover:translate-x-[100%] z-0 pointer-events-none"></div>
//         <div className="absolute top-0 right-0 p-3 pr-8 border-b border-[#1A1A1A] border-l bg-[#0F0F0F] text-[10px] text-gray-600 font-bold uppercase tracking-widest hidden md:block z-20">
//           CONFIDENTIAL
//         </div>

//         <div className="flex items-center gap-8 relative z-10">
//           <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 border-2 border-amber-500/30 rounded-full flex items-center justify-center bg-[#050505] shadow-[0_0_40px_rgba(245,158,11,0.2)]">
//             <span className="text-6xl md:text-8xl font-serif text-amber-500">{report.overallRating}</span>
//           </div>
//           <div className="flex flex-col">
//              <span className="text-[10px] tracking-[0.3em] text-amber-500 font-bold uppercase mb-2">Player Overall Rating</span>
//              <h1 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight mb-2">
//                {report.identity.archetype}
//              </h1>
//              <div className="flex items-center gap-4 text-xs md:text-sm text-gray-400 font-mono tracking-wider uppercase mt-2">
//                 <span>ROLE: <span className="text-white">{report.identity.role}</span></span>
//              </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3 relative z-10 min-w-[200px]">
//            <button onClick={handleExport} className="w-full flex items-center justify-center gap-2 bg-amber-500 text-black px-6 py-3 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-amber-400 transition-colors">
//               <Share2 className="w-4 h-4" /> Export Card
//            </button>
//            <button onClick={onReset} className="w-full flex items-center justify-center gap-2 bg-[#0F0F0F] border border-[#1A1A1A] text-gray-400 hover:text-white px-6 py-3 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#1A1A1A] transition-colors">
//               Analyze Another
//            </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
//         {/* Left Column - Core Identity */}
//         <section className="col-span-1 md:col-span-4 flex flex-col gap-8">
          
//           <div className="bg-[#080808] border border-[#1A1A1A] p-6 flex flex-col">
//             <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
//               <Fingerprint className="w-3 h-3" /> Identity Summary
//             </h3>
//             <p className="text-sm font-sans text-white leading-relaxed mb-6">
//               {report.identity.summary}
//             </p>

//             <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 pt-4 border-t border-[#1A1A1A]">
//               Plays Like
//             </h3>
//             <div className="flex flex-col gap-2">
//               <span className="text-lg font-serif italic text-white flex items-end">
//                 {report.identity.comparisonPlayer}
//               </span>
//               <p className="text-xs text-gray-400 font-sans leading-relaxed">
//                 {report.identity.comparisonReason}
//               </p>
//             </div>
//           </div>

//           <div className="bg-[#080808] border border-[#1A1A1A] p-6 flex flex-col items-center justify-center">
//             <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-full mb-6">Attribute Map</h3>
//             <div className="w-full aspect-square">
//               <ResponsiveContainer width="100%" height="100%">
//                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
//                   <PolarGrid stroke="#1A1A1A" />
//                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} />
//                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
//                   <Radar name="Player" dataKey="A" stroke="#f59e0b" strokeWidth={2} fill="#f59e0b" fillOpacity={0.2} />
//                 </RadarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </section>

//         {/* Center Column - Reality & Growth */}
//         <section className="col-span-1 md:col-span-8 flex flex-col gap-8">
          
//           {/* Reality Layer */}
//           <div className="bg-[#080808] border border-[#1A1A1A] p-6">
//             <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
//               <Target className="w-3 h-3" /> Reality Layer: Tactical & Decision Making
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Tactical Intelligence</h4>
//                 <p className="text-sm text-gray-300 font-sans leading-relaxed">
//                   {report.reality.tacticalIntelligence}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Decision Making</h4>
//                 <p className="text-sm text-gray-300 font-sans leading-relaxed">
//                   {report.reality.decisionMaking}
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#1A1A1A] pt-6">
//               <div className="bg-[#0F0F0F] border-l-2 border-green-500/50 p-4">
//                 <p className="text-[9px] uppercase tracking-widest text-green-500 mb-3">Core Strengths</p>
//                 <ul className="space-y-2">
//                   {report.reality.strengths.map((s, i) => (
//                     <li key={i} className="text-xs text-gray-300 font-sans leading-relaxed pb-2 border-b border-[#1A1A1A] last:border-0 last:pb-0">
//                       {s}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="bg-[#0F0F0F] border-l-2 border-amber-500/50 p-4">
//                 <p className="text-[9px] uppercase tracking-widest text-amber-500 mb-3">Areas for Growth</p>
//                 <ul className="space-y-2">
//                   {report.reality.weaknesses.map((w: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
//                     <li key={i} className="text-xs text-gray-300 font-sans leading-relaxed pb-2 border-b border-[#1A1A1A] last:border-0 last:pb-0">
//                       {w}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Growth Layer */}
//           <div className="bg-[#080808] border border-[#1A1A1A] flex flex-col md:flex-row shadow-[0_0_40px_rgba(245,158,11,0.05)]">
//              <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-[#1A1A1A]">
//                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
//                    <TrendingUp className="w-3 h-3" /> Growth Layer: Priority Action Plan
//                  </h3>
//                  <div className="space-y-4">
//                    {report.growth.priorities.map((priority: { focus: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; timeframe: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; drill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; matchScenario: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
//                      <div key={idx} className="p-4 border-l-2 border-amber-500 bg-[#0F0F0F] relative overflow-hidden group">
//                        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-3 flex items-center justify-between">
//                          <span className="text-amber-500">{priority.focus}</span>
//                          <span>{priority.timeframe}</span>
//                        </p>
//                        <div className="space-y-2">
//                          <div>
//                            <span className="text-[9px] text-gray-500 uppercase tracking-widest border-b border-[#222] pb-0.5 inline-block mb-1">Drill</span>
//                            <p className="text-xs text-gray-300 leading-relaxed font-sans">{priority.drill}</p>
//                          </div>
//                          <div>
//                            <span className="text-[9px] text-gray-500 uppercase tracking-widest border-b border-[#222] pb-0.5 inline-block mb-1">Match Scenario</span>
//                            <p className="text-xs text-gray-300 leading-relaxed font-sans">{priority.matchScenario}</p>
//                          </div>
//                        </div>
//                      </div>
//                    ))}
//                  </div>
//              </div>
             
//              <div className="p-6 md:p-8 md:w-1/3 flex flex-col justify-center bg-[#050505]">
//                  <div>
//                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-4 flex items-center gap-2">
//                       <Lock className="w-3 h-3" /> Next Level Unlock
//                     </h3>
//                     <div className="relative pl-4 border-l-2 border-amber-500/30">
//                         <p className="text-sm font-sans text-gray-300 leading-relaxed italic border-l border-[#1A1A1A] pl-3 py-1">
//                           "{report.growth.nextLevelUnlock}"
//                         </p>
//                     </div>
//                  </div>
//              </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }



import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Download, Share2, Flame, ShieldAlert, Cpu, Trophy, ActivitySquare, BrainCircuit, Lock, Map, Fingerprint, Target, TrendingUp, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { ReportData } from '../types';
import html2canvas from 'html2canvas';

interface ReportDashboardProps {
  report: ReportData;
  onReset: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

export function SocialCard({ report, innerRef }: { report: ReportData, innerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={innerRef} className="w-[1080px] h-[1920px] bg-[#050505] text-[#D1D1D1] relative flex flex-col p-16 font-sans overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10">
        <div className="w-[150%] h-[150%] aspect-square rounded-full border-[1px] border-amber-500 blur-3xl absolute"></div>
        <div className="w-full h-full bg-gradient-to-t from-black via-transparent to-black absolute inset-0 z-10"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 mt-12 mb-16 flex flex-col items-center">
        <span className="text-3xl tracking-[0.4em] text-amber-500 font-bold uppercase mb-2">Player Identity</span>
        <h1 className="text-8xl font-serif italic text-white tracking-tight text-center leading-none">
          {report.overallRating} <span className="text-5xl text-gray-500 ml-4 font-normal not-italic">OVR</span>
        </h1>
        <p className="text-4xl text-gray-400 mt-6 font-serif italic text-center max-w-2xl leading-snug">"{report.identity.archetype}"</p>
      </header>

      {/* Radar Section */}
      <div className="w-full aspect-square relative z-10 my-12 bg-[#080808] border-2 border-[#1A1A1A] flex items-center justify-center rounded-full p-20 shadow-[0_0_100px_rgba(245,158,11,0.15)]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
            { subject: 'TEC', A: report.reality.attributes.technical, fullMark: 100 },
            { subject: 'TAC', A: report.reality.attributes.tactical, fullMark: 100 },
            { subject: 'PHY', A: report.reality.attributes.physical, fullMark: 100 },
            { subject: 'MEN', A: report.reality.attributes.mental, fullMark: 100 },
            { subject: 'CRE', A: report.reality.attributes.creativity, fullMark: 100 },
            { subject: 'DEF', A: report.reality.attributes.defensive, fullMark: 100 },
            { subject: 'ATT', A: report.reality.attributes.attacking, fullMark: 100 },
            { subject: 'CON', A: report.reality.attributes.consistency, fullMark: 100 }
          ]}>
            <PolarGrid stroke="#333" strokeWidth={3} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 36, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Player" dataKey="A" stroke="#f59e0b" strokeWidth={8} fill="#f59e0b" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 grid grid-cols-2 gap-12 mt-auto mb-16">
        <div className="bg-[#0A0A0A] border-2 border-[#1A1A1A] p-10 flex flex-col justify-center items-center">
          <span className="text-gray-500 uppercase tracking-widest text-2xl font-bold mb-4">Role</span>
          <span className="text-4xl font-serif italic text-amber-500 text-center">{report.identity.role}</span>
        </div>
        <div className="bg-[#0A0A0A] border-2 border-[#1A1A1A] p-10 flex flex-col items-center justify-center">
          <span className="text-gray-500 uppercase tracking-widest text-xl font-bold mb-6 text-center">Plays Like</span>
          <span className="text-3xl text-white font-serif italic text-center leading-tight">{report.identity.comparisonPlayer}</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t-4 border-[#1A1A1A] pt-12 flex justify-between items-center px-8">
        <div className="text-3xl text-gray-600 font-bold tracking-widest uppercase">Player Progression System</div>
        <div className="text-3xl text-amber-500 font-bold tracking-widest uppercase">Identity Established</div>
      </footer>
    </div>
  );
}

export function ReportDashboard({ report, onReset }: ReportDashboardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const radarData = [
    { subject: 'Technical', A: report.reality.attributes.technical, fullMark: 100 },
    { subject: 'Tactical', A: report.reality.attributes.tactical, fullMark: 100 },
    { subject: 'Physical', A: report.reality.attributes.physical, fullMark: 100 },
    { subject: 'Mental', A: report.reality.attributes.mental, fullMark: 100 },
    { subject: 'Creativity', A: report.reality.attributes.creativity, fullMark: 100 },
    { subject: 'Defensive', A: report.reality.attributes.defensive, fullMark: 100 },
    { subject: 'Attacking', A: report.reality.attributes.attacking, fullMark: 100 },
    { subject: 'Consistency', A: report.reality.attributes.consistency, fullMark: 100 },
  ];

  const handleExport = async () => {
    if (!cardRef.current) return;
    try {
      cardRef.current.style.display = 'flex';
      const canvas = await html2canvas(cardRef.current, { scale: 1 });
      cardRef.current.style.display = 'none';
      const url = canvas.toDataURL('image/jpeg', 0.9);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elite-scout-card-${report.overallRating}.jpg`;
      a.click();
    } catch(err) {
      console.error('Error generating card', err);
    }
  };

  return (
    <motion.div 
      className="flex flex-col w-full max-w-6xl mx-auto space-y-8 pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hidden Card for export */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0">
        <SocialCard report={report} innerRef={cardRef} />
      </div>

      {/* Main Stats Header */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 z-10 group rounded-xl backdrop-blur-sm hover:border-amber-500/30 transition-all duration-500"
      >
        {/* Animated background glow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full z-0 pointer-events-none"
        />
        
        <div className="absolute top-0 right-0 p-3 pr-8 border-b border-white/10 border-l bg-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-widest hidden md:block z-20 flex items-center gap-2">
          <Lock className="w-3 h-3" /> CONFIDENTIAL
        </div>

        <div className="flex items-center gap-8 relative z-10">
          <motion.div 
            className="w-32 h-32 md:w-48 md:h-48 shrink-0 border-2 border-amber-500/30 rounded-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-[0_0_40px_rgba(245,158,11,0.2)] relative"
            whileHover={{ scale: 1.05, borderColor: "rgba(245, 158, 11, 0.6)" }}
          >
            <motion.span 
              className="text-6xl md:text-8xl font-serif text-amber-500"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {report.overallRating}
            </motion.span>
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-amber-500/20"
              animate={{ scale: [1, 1.2], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.3em] text-amber-500 font-bold uppercase mb-2 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Player Overall Rating
            </span>
            <h1 className="text-3xl md:text-5xl font-serif italic text-white tracking-tight mb-2">
              {report.identity.archetype}
            </h1>
            <div className="flex items-center gap-4 text-xs md:text-sm text-gray-400 font-mono tracking-wider uppercase mt-2">
              <span>ROLE: <span className="text-white">{report.identity.role}</span></span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 relative z-10 min-w-[200px]">
          <motion.button 
            onClick={handleExport}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 text-[10px] uppercase font-bold tracking-[0.2em] hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20 rounded-lg"
          >
            <Share2 className="w-4 h-4" /> Export Card
          </motion.button>
          <motion.button 
            onClick={onReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-gray-400 hover:text-white px-6 py-3 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white/10 hover:border-white/30 transition-all duration-300 rounded-lg"
          >
            Analyze Another
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column - Core Identity */}
        <motion.section 
          variants={itemVariants}
          className="col-span-1 md:col-span-4 flex flex-col gap-8"
        >
          <motion.div 
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 flex flex-col rounded-xl backdrop-blur-sm group hover:border-amber-500/30 transition-all duration-500"
            whileHover={{ y: -4 }}
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
              <Fingerprint className="w-3 h-3" /> Identity Summary
            </h3>
            <p className="text-sm font-sans text-white leading-relaxed mb-6">
              {report.identity.summary}
            </p>
            
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 pt-4 border-t border-white/10">
              Plays Like
            </h3>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-serif italic text-white flex items-end group-hover:text-amber-400 transition-colors">
                {report.identity.comparisonPlayer}
              </span>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                {report.identity.comparisonReason}
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm group hover:border-cyan-500/30 transition-all duration-500"
            whileHover={{ y: -4 }}
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-full mb-6">Attribute Map</h3>
            <div className="w-full aspect-square">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <defs>
                    <filter id="glow-radar">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar 
                    name="Player" 
                    dataKey="A" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    fill="#f59e0b" 
                    fillOpacity={0.2}
                    filter="url(#glow-radar)"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.section>

        {/* Center Column - Reality & Growth */}
        <motion.section 
          variants={itemVariants}
          className="col-span-1 md:col-span-8 flex flex-col gap-8"
        >
          {/* Reality Layer */}
          <motion.div 
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-xl backdrop-blur-sm group hover:border-amber-500/20 transition-all duration-500"
            whileHover={{ y: -4 }}
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
              <Target className="w-3 h-3" /> Reality Layer: Tactical & Decision Making
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Tactical Intelligence</h4>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  {report.reality.tacticalIntelligence}
                </p>
              </div>
              <div>
                <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Decision Making</h4>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  {report.reality.decisionMaking}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <motion.div 
                className="bg-green-500/5 border-l-2 border-green-500/50 p-4 rounded-r-lg"
                whileHover={{ x: 4 }}
              >
                <p className="text-[9px] uppercase tracking-widest text-green-500 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3" /> Core Strengths
                </p>
                <ul className="space-y-2">
                  {report.reality.strengths.map((s: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
                    <li key={i} className="text-xs text-gray-300 font-sans leading-relaxed pb-2 border-b border-white/5 last:border-0 last:pb-0">
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-amber-500/5 border-l-2 border-amber-500/50 p-4 rounded-r-lg"
                whileHover={{ x: 4 }}
              >
                <p className="text-[9px] uppercase tracking-widest text-amber-500 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> Areas for Growth
                </p>
                <ul className="space-y-2">
                  {report.reality.weaknesses.map((w, i) => (
                    <li key={i} className="text-xs text-gray-300 font-sans leading-relaxed pb-2 border-b border-white/5 last:border-0 last:pb-0">
                      {w}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Growth Layer */}
          <motion.div 
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex flex-col md:flex-row shadow-[0_0_40px_rgba(245,158,11,0.05)] rounded-xl backdrop-blur-sm group hover:border-amber-500/20 transition-all duration-500"
            whileHover={{ y: -4 }}
          >
            <div className="p-6 md:p-8 flex-1 border-b md:border-b-0 md:border-r border-white/10">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> Growth Layer: Priority Action Plan
              </h3>
              
              <div className="space-y-4">
                {report.growth.priorities.map((priority: { focus: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; timeframe: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; drill: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; matchScenario: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                  <motion.div 
                    key={idx} 
                    className="p-4 border-l-2 border-amber-500 bg-white/5 relative overflow-hidden group/item rounded-r-lg"
                    whileHover={{ x: 4, backgroundColor: "rgba(245, 158, 11, 0.05)" }}
                  >
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-3 flex items-center justify-between">
                      <span className="text-amber-500">{priority.focus}</span>
                      <span>{priority.timeframe}</span>
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest border-b border-white/10 pb-0.5 inline-block mb-1">Drill</span>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{priority.drill}</p>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest border-b border-white/10 pb-0.5 inline-block mb-1">Match Scenario</span>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{priority.matchScenario}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="p-6 md:p-8 md:w-1/3 flex flex-col justify-center bg-white/5">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-4 flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Next Level Unlock
                </h3>
                <div className="relative pl-4 border-l-2 border-amber-500/30">
                  <p className="text-sm font-sans text-gray-300 leading-relaxed italic border-l border-white/10 pl-3 py-1">
                    "{report.growth.nextLevelUnlock}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}