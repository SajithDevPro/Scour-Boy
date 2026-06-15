import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, TrendingUp, Activity, Medal, Star, Share2, Users, Download, ArrowUpRight, ArrowDownRight, GitCompare, PlayCircle, Lock, ChevronRight, Sparkles, Zap } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'comparison' | 'feed'>('comparison');
  
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto w-full pt-6 pb-24 text-white px-4 md:px-6"
    >
      {/* Enhanced Header */}
      <motion.div variants={itemVariants} className="mb-10 relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">
          <Users className="w-3 h-3" /> Competitive Global Network
        </span>
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
          Community <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Evolution.</span>
        </h1>
        <p className="text-base text-gray-400 font-medium max-w-2xl leading-relaxed">
          A competitive ecosystem driven by progression. Rise through the tiers by out-improving your peers in real-time.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Current Tier", value: communityData.tier, color: "text-white", icon: Trophy },
          { label: "Global Standing", value: `#${communityData.global_rank}`, color: "text-cyan-400", icon: Medal },
          { label: "Improvement Rate", value: communityData.improvement_rank, color: "text-green-400", icon: TrendingUp },
          { label: "Active Challenge", value: `${communityData.challenge_score} PTS`, color: "text-amber-400", icon: Star, highlight: true }
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-[#080808] border ${stat.highlight ? 'border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-[#1A1A1A]'} p-5 rounded-xl relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="w-12 h-12" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-2 font-bold">{stat.label}</span>
            <span className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Col: Main Content */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Tab Switcher for Mobile/Tablet if needed, or just visual separator */}
          <div className="flex items-center gap-4 mb-2">
             <button 
               onClick={() => setActiveTab('comparison')}
               className={`text-xs uppercase font-bold tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'comparison' ? 'border-cyan-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
             >
               AI Matchmaking
             </button>
             <button 
               onClick={() => setActiveTab('feed')}
               className={`text-xs uppercase font-bold tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'feed' ? 'border-cyan-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
             >
               Live Feed
             </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'comparison' && (
              <motion.div 
                key="comparison"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#080808] border border-[#1A1A1A] p-8 rounded-2xl relative overflow-hidden group"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-cyan-500 flex items-center gap-3">
                    <GitCompare className="w-5 h-5" /> 
                    AI Comparative Matchmaking
                  </h3>
                  {!isElite && (
                    <span className="text-[10px] uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                      Elite Feature
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* Your Profile Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#0F0F0F] border border-[#222] p-6 rounded-xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                          <Users className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Your Profile</h4>
                      </div>
                      <span className="text-2xl font-mono text-cyan-400 font-bold">{report?.overallRating || 70} <span className="text-xs text-gray-500">OVR</span></span>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-[#1A1A1A]">
                      <span className="text-[10px] uppercase tracking-widest text-green-500 font-bold flex items-center gap-2">
                        <ArrowUpRight className="w-3 h-3"/> Your Advantages
                      </span>
                      {isElite ? (
                        comparisonData.gap_analysis.advantage.map((adv, idx) => (
                          <div key={idx} className="text-sm text-gray-300 font-medium bg-green-500/5 p-2 rounded border border-green-500/10">{adv}</div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 italic">Upgrade to view advantages</div>
                      )}
                    </div>
                  </motion.div>

                  {/* Target Profile Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#0F0F0F] border border-[#222] p-6 rounded-xl relative overflow-hidden"
                  >
                     <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)] pointer-events-none"></div>
                     
                     <div className="flex justify-between items-center mb-6 relative z-10">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                           <Sparkles className="w-5 h-5 text-gray-400" />
                         </div>
                         <h4 className="text-lg font-bold text-gray-300">{comparisonData.name}</h4>
                       </div>
                       <span className="text-2xl font-mono text-white font-bold">{comparisonData.ovr} <span className="text-xs text-gray-500">OVR</span></span>
                     </div>
                     
                     <div className="space-y-3 pt-4 border-t border-[#1A1A1A] relative z-10">
                       <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold flex items-center gap-2">
                         <ArrowDownRight className="w-3 h-3"/> Areas Behind Target
                       </span>
                       
                       {isElite ? (
                         comparisonData.gap_analysis.strength_gap.map((gap, idx) => (
                           <div key={idx} className="text-sm text-gray-300 font-medium bg-red-500/5 p-2 rounded border border-red-500/10">{gap}</div>
                         ))
                       ) : (
                         <div className="space-y-2 select-none">
                           <div className="h-8 bg-[#1A1A1A] rounded animate-pulse"></div>
                           <div className="h-8 bg-[#1A1A1A] rounded animate-pulse delay-75"></div>
                         </div>
                       )}
                     </div>

                     {!isElite && (
                       <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#080808]/80 backdrop-blur-sm rounded-xl"
                       >
                         <Lock className="w-8 h-8 text-amber-500 mb-3" />
                         <button 
                           onClick={onUpgrade} 
                           className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs uppercase tracking-widest font-bold rounded-full hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105"
                         >
                           Unlock Elite Comparison
                         </button>
                       </motion.div>
                     )}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'feed' && (
              <motion.div 
                key="feed"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#080808] border border-[#1A1A1A] p-8 rounded-2xl"
              >
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-gray-500 mb-8 flex items-center gap-3">
                   <Activity className="w-5 h-5" /> Global Improvement Feed
                </h3>
                <div className="space-y-4">
                   {mockFeed.map((item, idx) => (
                     <motion.div 
                       key={item.id} 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: idx * 0.1 }}
                       whileHover={{ x: 5, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                       className="bg-[#0F0F0F] border border-[#1A1A1A] p-5 flex gap-5 rounded-xl transition-all cursor-pointer group"
                     >
                       <div className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center font-bold text-sm font-mono text-gray-400 shrink-0 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors border border-[#222] group-hover:border-cyan-500/30">
                         {item.rating}
                       </div>
                       <div className="flex-1">
                         <div className="flex justify-between items-start mb-2">
                           <div>
                             <span className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{item.user}</span>
                             <span className="text-[10px] font-normal text-gray-500 font-sans uppercase tracking-widest ml-3 bg-[#1A1A1A] px-2 py-0.5 rounded">{item.archetype}</span>
                           </div>
                           <span className="text-[10px] text-gray-600 font-mono">{item.time}</span>
                         </div>
                         <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.content}</p>
                       </div>
                     </motion.div>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Right Col: Sidebar */}
        <div className="xl:col-span-1 space-y-8">
          
          {/* Weekly Challenge Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-cyan-500/30 p-6 rounded-2xl relative overflow-hidden group shadow-[0_0_30px_rgba(6,182,212,0.05)]"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
            
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-500 mb-6 flex items-center gap-2 relative z-10">
              <Star className="w-4 h-4 fill-cyan-500" /> Event: Week of Decision Speed
            </h3>
            
            <div className="relative z-10">
              <h4 className="text-xl font-serif italic text-white mb-3 leading-tight">Reduce Scanning Hesitation</h4>
              <p className="text-xs text-gray-400 font-medium mb-6 leading-relaxed">Lower your pre-reception latency below 0.8s on average to dominate this week's global bracket.</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                  <span>Your Score</span>
                  <span className="text-cyan-400">{communityData.challenge_score} PTS</span>
                </div>
                <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, communityData.challenge_score)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative"
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                </div>
              </div>
              
              <button className="w-full py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs uppercase font-bold tracking-widest rounded-lg hover:bg-cyan-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                View Challenge Details
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Mini Leaderboard */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#080808] border border-[#1A1A1A] rounded-2xl overflow-hidden"
          >
            <div className="flex bg-[#0F0F0F] p-4 border-b border-[#1A1A1A] items-center justify-between">
               <div className="flex items-center gap-2">
                 <Trophy className="w-4 h-4 text-amber-500" />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Live Ranks</span>
               </div>
               <span className="text-[10px] text-green-500 flex items-center gap-1"><Zap className="w-3 h-3" /> Live</span>
            </div>
            <div className="divide-y divide-[#1A1A1A]">
              {leaderboard.map((player, idx) => (
                <motion.div 
                  key={player.rank} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (idx * 0.1) }}
                  className={`flex items-center p-4 text-xs hover:bg-[#111] transition-colors ${player.isUser ? 'bg-cyan-500/5 border-l-2 border-cyan-500' : ''}`}
                >
                  <span className={`w-8 font-mono font-bold ${player.rank <= 3 ? 'text-amber-500' : 'text-gray-500'}`}>#{player.rank}</span>
                  <div className="flex-1">
                    <span className={`block font-bold ${player.isUser ? 'text-cyan-400' : 'text-gray-200'}`}>{player.name}</span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-wider">{player.archetype}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-gray-300 font-bold block">{player.currentOvr} OVR</span>
                    <span className="text-[9px] text-green-500">{player.improvement}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full p-3 bg-[#0F0F0F] text-[10px] uppercase tracking-widest text-cyan-500 hover:bg-[#151515] transition-colors border-t border-[#1A1A1A] font-bold flex items-center justify-center gap-2">
               View Full Standings <ArrowUpRight className="w-3 h-3" />
            </button>
          </motion.div>

          {/* Viral Sharing Engine */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#080808] border border-[#1A1A1A] p-6 rounded-2xl"
          >
             <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-6 flex items-center gap-2">
               <Share2 className="w-4 h-4" /> Share Progress
             </h3>
             <p className="text-[10px] text-gray-400 font-medium mb-5">Export algorithm-ready 9:16 vertical clips for social media.</p>
             
             <div className="grid grid-cols-3 gap-3">
                {[
                  { src: shareAssets.highlight_card, label: "Insight", icon: Download },
                  { src: shareAssets.mistake_clip, label: "Clip", icon: PlayCircle },
                  { src: shareAssets.progress_badge, label: "Badge", icon: Download }
                ].map((asset, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="relative aspect-[9/16] bg-[#111] overflow-hidden group cursor-pointer border border-[#222] hover:border-cyan-500/50 rounded-lg shadow-lg"
                  >
                     <img src={asset.src} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" alt={asset.label} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                     <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <asset.icon className="w-6 h-6 text-white mb-2 drop-shadow-lg" />
                       <span className="text-[9px] uppercase tracking-widest text-white font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{asset.label}</span>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>

        </div>
      </div>
      
      {/* Custom Styles for Shimmer */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
}