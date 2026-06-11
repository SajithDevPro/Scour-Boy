import React from 'react';
import { Play, TrendingUp, Cpu, Shield, ArrowRight } from 'lucide-react';

interface LandingViewProps {
  onGetStarted: () => void;
  onViewPricing: () => void;
}

export function LandingView({ onGetStarted, onViewPricing }: LandingViewProps) {
  return (
    <div className="w-full flex flex-col pt-8 md:pt-16">
      <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Elite Scout Engine Live</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight leading-[1.1] mb-6">
          Your personal AI football coach <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 italic font-serif">watching every touch.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
          Upload your match footage, understand your weaknesses, compare with elite professional solutions, and track your actual improvement over time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={onViewPricing}
            className="w-full sm:w-auto px-8 py-4 bg-[#0A0A0A] border border-[#222] text-white font-bold uppercase tracking-widest text-xs hover:border-amber-500/50 transition-colors"
          >
            View Pricing Tiers
          </button>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-4 mb-32 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="aspect-video w-full bg-[#050505] border-y border-[#1A1A1A] md:border md:rounded-2xl flex items-center justify-center overflow-hidden relative group">
           
           {/* Animated Pitch Background */}
           <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
              {/* Fake pitch lines */}
              <div className="w-3/4 h-[90%] border-2 border-white/20 rounded-md relative flex items-center justify-center" style={{ transform: 'perspective(500px) rotateX(60deg)' }}>
                <div className="w-full h-px bg-white/20 absolute top-1/2"></div>
                <div className="w-24 h-24 border-2 border-white/20 rounded-full"></div>
                <div className="w-32 h-16 border-2 border-white/20 absolute top-0"></div>
                <div className="w-32 h-16 border-2 border-white/20 absolute bottom-0"></div>
              </div>
           </div>

           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
           
           {/* Fake UI Overlay for hero visual */}
           <div className="absolute left-6 top-6 bottom-6 w-1/4 border-r border-amber-500/20 hidden md:flex flex-col gap-4">
              <div className="h-4 w-1/2 bg-amber-500/20 rounded"></div>
              <div className="h-4 w-3/4 bg-amber-500/10 rounded"></div>
              <div className="h-20 w-full mt-4 bg-[#0A0A0A]/50 border border-[#1A1A1A] rounded flex flex-col p-2 gap-2">
                 <div className="h-2 w-1/3 bg-amber-500/40 rounded"></div>
                 <div className="h-2 w-full bg-gray-500/20 rounded"></div>
                 <div className="h-2 w-2/3 bg-gray-500/20 rounded"></div>
              </div>
              <div className="mt-auto h-32 w-full border border-amber-500/20 bg-amber-500/5 backdrop-blur"></div>
           </div>
           
           <div className="z-10 flex flex-col items-center">
             <div className="w-20 h-20 rounded-full border border-amber-500/50 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-center cursor-not-allowed group-hover:scale-110 transition-transform shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                <Play className="w-8 h-8 text-amber-500 ml-1" />
             </div>
             <span className="text-[10px] text-amber-500 font-bold tracking-widest mt-6 uppercase">View Coach Analysis Demo</span>
           </div>

           {/* Scanning line effect */}
           <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-amber-500/20 shadow-[0_2px_20px_rgba(245,158,11,0.5)] animate-scan pointer-events-none"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 z-10">
         <div className="bg-[#080808] border border-[#1A1A1A] p-8 flex flex-col items-start relative overflow-hidden group">
            <span className="text-[64px] font-sans font-bold text-[#111] absolute -top-4 -right-4 -z-0">1</span>
            <div className="relative z-10">
              <Cpu className="w-6 h-6 text-amber-500 mb-6" />
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-amber-500 mb-2">Upload</h3>
              <h4 className="text-xl font-serif italic text-white mb-3">Feed The Engine</h4>
              <p className="text-gray-400 font-sans leading-relaxed text-sm">
                Upload your match or training footage safely. Our AI processes the mechanics and decisions behind your game.
              </p>
            </div>
         </div>
         <div className="bg-[#080808] border border-[#1A1A1A] p-8 flex flex-col items-start relative overflow-hidden group">
            <span className="text-[64px] font-sans font-bold text-[#111] absolute -top-4 -right-4 -z-0">2</span>
            <div className="relative z-10">
              <Shield className="w-6 h-6 text-amber-500 mb-6" />
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-amber-500 mb-2">AI Analysis</h3>
              <h4 className="text-xl font-serif italic text-white mb-3">Tactical Breakdown</h4>
              <p className="text-gray-400 font-sans leading-relaxed text-sm">
                Get timestamps of exactly where you made mistakes, and see Elite references (like De Bruyne) making the right choice.
              </p>
            </div>
         </div>
         <div className="bg-[#080808] border border-[#1A1A1A] p-8 flex flex-col items-start relative overflow-hidden group">
            <span className="text-[64px] font-sans font-bold text-[#111] absolute -top-4 -right-4 -z-0">3</span>
            <div className="relative z-10">
              <TrendingUp className="w-6 h-6 text-amber-500 mb-6" />
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-amber-500 mb-2">Improve</h3>
              <h4 className="text-xl font-serif italic text-white mb-3">Growth & Tracking</h4>
              <p className="text-gray-400 font-sans leading-relaxed text-sm">
                Engage in targeted drills and talk to your AI Coach to fix recurring issues and visualize your rating climb.
              </p>
            </div>
         </div>
      </div>
      
      <div className="py-20 bg-[#0A0A0A] border-y border-[#1A1A1A] z-10 relative">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500 mb-2 block">Social Proof</span>
            <h2 className="text-3xl font-sans font-bold text-white mb-6">Built for players who want academy-level feedback.</h2>
            <p className="text-gray-400 text-sm font-sans mb-10 max-w-xl mx-auto">
              Join thousands of prospects using professional-grade intelligence to evolve their game from Sunday League to semi-pro and beyond.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
               <div className="p-6 bg-[#050505] border border-[#1A1A1A]">
                  <p className="text-gray-300 italic font-serif mb-4">"It pointed out a flaw in my half-space receiving that my coach had been complaining about for months. Seeing the video side-by-side with Bernardo Silva fixed it."</p>
                  <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">— U18 Academy Midfielder</p>
               </div>
               <div className="p-6 bg-[#050505] border border-[#1A1A1A]">
                  <p className="text-gray-300 italic font-serif mb-4">"The progress tracking makes me want to upload every match. It feels like real-life FIFA career mode, but I’m actually getting better."</p>
                  <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">— Semi-Pro Winger</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
