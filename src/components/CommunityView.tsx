import React from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Activity, Medal, Star, Share2, Users, Download, ArrowUpRight, ArrowDownRight, GitCompare, PlayCircle, Lock } from 'lucide-react';
import { ReportData, UserSession } from '../types';

interface CommunityViewProps {
  report: ReportData | null;
  session: UserSession | null;
  onUpgrade?: () => void;
}

const mockFeed = [
  { id: 1, user: "Marcus T.", archetype: "Box-to-Box", content: "Improved positional awareness by 15% after fixing defensive transitions.", rating: 79, time: "2h ago" },
  { id: 2, user: "Sarah J.", archetype: "Inverted Winger", content: "Completed the 'Decision Speed' weekly challenge. Turnovers reduced to 0 in final third.", rating: 82, time: "5h ago" },
  { id: 3, user: "David R.", archetype: "Target Forward", content: "Upgraded to Semi-Pro Contender tier today. Hard work pays off.", rating: 76, time: "1d ago" }
];

export function CommunityView({ report, session, onUpgrade }: CommunityViewProps) {
  const communityData = report?.community_layer || {
    global_rank: 2145,
    tier: "Academy Prospect",
    improvement_rank: "Top 32% this week",
    challenge_score: 45
  };

  const comparisonData = report?.comparison_engine?.matched_players[0] || {
    name: "Elite Prototype",
    ovr: 85,
    gap_analysis: {
      strength_gap: ["Scanning frequency (-15%)", "First touch precision (-8%)"],
      advantage: ["Work rate (+12%)"]
    }
  };

  const isElite = session?.subscription_tier === 'elite';

  const shareAssets = report?.share_assets || {
    highlight_card: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&h=600&fit=crop",
    mistake_clip: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=400&h=600&fit=crop",
    progress_badge: "https://images.unsplash.com/photo-1526232549926-21ceef1c7dd9?q=80&w=400&h=600&fit=crop"
  };

  const leaderboard = [
    { rank: 1, name: 'Liam P.', archetype: 'Advanced Playmaker', improvement: '+12%', currentOvr: 84 },
    { rank: 2, name: 'Marcus T.', archetype: 'Box-to-Box', improvement: '+10%', currentOvr: 79 },
    { rank: 3, name: 'David R.', archetype: 'Inverted Winger', improvement: '+7%', currentOvr: 76 },
    { rank: communityData.global_rank, name: 'You', archetype: report?.identity?.archetype || 'Unassigned', improvement: '+5%', currentOvr: report?.overallRating || 70, isUser: true },
  ].sort((a, b) => a.rank - b.rank);

  return (
    <div className="max-w-6xl mx-auto w-full pt-4 pb-24 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-500 mb-2 flex items-center gap-2">
          <Users className="w-4 h-4" /> Competitive Global Network
        </span>
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
          Community <span className="font-serif italic text-cyan-500">Evolution.</span>
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl">
          A competitive ecosystem driven by progression. Rise through the tiers by out-improving your peers.
        </p>
      </motion.div>

      {/* Top Banner section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#050505] border border-[#1A1A1A] p-4">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Current Tier</span>
          <span className="text-lg font-bold text-white font-serif">{communityData.tier}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#050505] border border-[#1A1A1A] p-4">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Global Standing</span>
          <span className="text-lg font-bold text-cyan-500 font-mono">#{communityData.global_rank}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#050505] border border-[#1A1A1A] p-4">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Improvement Rate</span>
          <span className="text-lg font-bold text-green-500 font-mono">{communityData.improvement_rank}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#0A0A0A] border border-cyan-500/30 p-4">
          <span className="text-[10px] uppercase tracking-widest text-cyan-500 block mb-1 flex items-center gap-1"><Star className="w-3 h-3"/> Active Challenge</span>
          <span className="text-lg font-bold text-white font-mono">{communityData.challenge_score} PTS</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        {/* Left Col: Leaderboard & Feed */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Asymmetric Matchmaking Engine */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#050505] border border-[#1A1A1A] p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-cyan-500 mb-6 flex items-center gap-2 relative z-10">
              <GitCompare className="w-4 h-4" /> AI Comparative Matchmaking
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-5">
                 <div className="flex justify-between items-center mb-4">
                   <h4 className="text-sm font-bold text-white">Your Profile</h4>
                   <span className="text-sm font-mono text-cyan-500 font-bold">{report?.overallRating || 70} OVR</span>
                 </div>
                 <div className="space-y-2 mt-4 pt-4 border-t border-[#1A1A1A] relative">
                   <span className="text-[9px] uppercase tracking-widest text-green-500 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> Your Advantages</span>
                   {isElite ? (
                     comparisonData.gap_analysis.advantage.map((adv, idx) => (
                       <div key={idx} className="text-xs text-gray-300 font-sans">{adv}</div>
                     ))
                   ) : (
                     <div className="text-xs text-gray-300 font-sans select-none filter blur-sm">Work rate (+12%)</div>
                   )}
                 </div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#222] p-5 relative">
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)] pointer-events-none"></div>
                 <div className="flex justify-between items-center mb-4 relative z-10">
                   <h4 className="text-sm font-bold text-gray-400">{comparisonData.name}</h4>
                   <span className="text-sm font-mono text-white font-bold">{comparisonData.ovr} OVR</span>
                 </div>
                 <div className="space-y-2 mt-4 pt-4 border-t border-[#1A1A1A] relative z-10">
                   <span className="text-[9px] uppercase tracking-widest text-red-500 flex items-center gap-1"><ArrowDownRight className="w-3 h-3"/> Areas Behind Target</span>
                   {isElite ? (
                     comparisonData.gap_analysis.strength_gap.map((gap, idx) => (
                       <div key={idx} className="text-xs text-gray-300 font-sans">{gap}</div>
                     ))
                   ) : (
                     <div className="space-y-2">
                       <div className="text-xs text-gray-300 font-sans select-none filter blur-sm">Scanning frequency (-15%)</div>
                       <div className="text-xs text-gray-300 font-sans select-none filter blur-sm">First touch precision (-8%)</div>
                     </div>
                   )}
                 </div>

                 {!isElite && (
                   <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/70 backdrop-blur-[2px]">
                     <Lock className="w-5 h-5 text-amber-500 mb-2" />
                     <button onClick={onUpgrade} className="px-4 py-2 bg-[#111] text-amber-500 text-[9px] uppercase tracking-widest font-bold border border-amber-500/30 hover:border-amber-500 transition-colors">
                       Unlock Elite Comparison
                     </button>
                   </div>
                 )}
              </div>
            </div>
          </motion.div>

          {/* Social Improvement Feed */}
          <div className="bg-[#050505] border border-[#1A1A1A] p-6">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-6 flex items-center gap-2">
               <Activity className="w-4 h-4" /> Global Improvement Feed
            </h3>
            <div className="space-y-4">
               {mockFeed.map((item) => (
                 <div key={item.id} className="bg-[#0A0A0A] border border-[#111] p-4 flex gap-4 transition-colors hover:border-[#222]">
                   <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center font-bold text-[10px] font-sans text-gray-400 shrink-0">
                     {item.ovr || item.rating}
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between items-start mb-1">
                       <span className="text-sm font-bold text-white">{item.user} <span className="text-[10px] font-normal text-gray-500 font-sans uppercase tracking-widest ml-2">{item.archetype}</span></span>
                       <span className="text-[9px] text-gray-600 font-mono">{item.time}</span>
                     </div>
                     <p className="text-xs text-gray-400 font-sans leading-relaxed">{item.content}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
        
        {/* Right Col: Challenges, Leaderboard & Sharing */}
        <div className="xl:col-span-1 space-y-8">
          
          {/* Weekly Challenge */}
          <div className="bg-[#0A0A0A] border z-10 relative overflow-hidden group border-cyan-500/30 p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-cyan-500 mb-6 flex items-center gap-2 relative z-10">
              <Star className="w-3 h-3" /> Event: Week of Decision Speed
            </h3>
            <div className="relative z-10">
              <h4 className="text-xl font-serif italic text-white mb-2 leading-tight">Reduce Scanning Hesitation</h4>
              <p className="text-xs text-gray-400 font-sans mb-6">Lower your pre-reception latency below 0.8s on average to dominate this week's global bracket.</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  <span>Your Score</span>
                  <span className="text-cyan-500">{communityData.challenge_score} PTS</span>
                </div>
                <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500" style={{ width: `${Math.min(100, communityData.challenge_score)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Leaderboard */}
          <div className="bg-[#050505] border border-[#1A1A1A] overflow-hidden">
            <div className="flex bg-[#0A0A0A] p-3 border-b border-[#1A1A1A]">
               <div className="flex-1 text-[9px] uppercase tracking-widest font-bold text-gray-500">Live Ranks</div>
            </div>
            <div className="divide-y divide-[#1A1A1A]">
              {leaderboard.map((player) => (
                <div key={player.rank} className={`flex items-center p-3 text-xs ${player.isUser ? 'bg-cyan-500/5' : ''}`}>
                  <span className="w-8 font-mono text-gray-500 text-[10px]">{player.rank}</span>
                  <span className={`flex-1 font-bold ${player.isUser ? 'text-cyan-500' : 'text-gray-300'}`}>{player.name}</span>
                  <span className="font-mono text-gray-400 text-[10px]">{player.currentOvr} OVR</span>
                </div>
              ))}
            </div>
            <button className="w-full p-2 bg-[#0A0A0A] text-[9px] uppercase tracking-widest text-cyan-500 hover:bg-[#111] transition-colors border-t border-[#1A1A1A]">
               View Full Standings
            </button>
          </div>

          {/* Viral Sharing Engine */}
          <div className="bg-[#050505] border border-[#1A1A1A] p-6">
             <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-6 flex items-center gap-2">
               <Share2 className="w-4 h-4" /> Share Progress
             </h3>
             <p className="text-[10px] text-gray-400 font-sans mb-4">Export algorithm-ready 9:16 vertical clips.</p>
             
             <div className="grid grid-cols-3 gap-2">
                <div className="relative aspect-[9/16] bg-[#111] overflow-hidden group cursor-pointer border border-[#222] hover:border-cyan-500 transition-colors">
                   <img src={shareAssets.highlight_card} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Highlight" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                     <Download className="w-4 h-4 text-white mb-1 shadow-lg" />
                     <span className="text-[8px] uppercase tracking-widest text-white font-bold">Insight</span>
                   </div>
                </div>
                <div className="relative aspect-[9/16] bg-[#111] overflow-hidden group cursor-pointer border border-[#222] hover:border-cyan-500 transition-colors">
                   <img src={shareAssets.mistake_clip} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Mistake breakdown" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                     <PlayCircle className="w-4 h-4 text-white mb-1 shadow-lg" />
                     <span className="text-[8px] uppercase tracking-widest text-white font-bold">Clip</span>
                   </div>
                </div>
                <div className="relative aspect-[9/16] bg-[#111] overflow-hidden group cursor-pointer border border-[#222] hover:border-cyan-500 transition-colors">
                   <img src={shareAssets.progress_badge} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Progress Badge" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                     <Download className="w-4 h-4 text-white mb-1 shadow-lg" />
                     <span className="text-[8px] uppercase tracking-widest text-white font-bold">Badge</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
