import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, FastForward, Rewind, Maximize, ActivitySquare, Crosshair, BrainCircuit, Target, Video, Trophy, Lock } from 'lucide-react';
import { MatchReplay, MatchMoment, UserSession } from '../types';
import { FeatureLock } from './FeatureLock';

interface MatchReplayViewerProps {
  replay: MatchReplay;
  videoFile: File | null;
  session: UserSession | null;
  onUpgrade?: () => void;
}

export function MatchReplayViewer({ replay, videoFile, session, onUpgrade }: MatchReplayViewerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeMoment, setActiveMoment] = useState<MatchMoment | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (replay.videoUrl) {
      setVideoUrl(replay.videoUrl);
    } else {
      // Fallback placeholder
      setVideoUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'); 
    }
  }, [videoFile, replay.videoUrl]);

  // Handle parsing timestamp like "00:07" to seconds (7)
  const parseTimestamp = (timestamp: string) => {
    const parts = timestamp.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 0;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Check if we hit a moment
      if (!activeMoment) {
        const foundMoment = replay.moments.find(m => {
          const start = parseTimestamp(m.timestamp_start);
          const end = parseTimestamp(m.timestamp_end);
          return videoRef.current!.currentTime >= start && videoRef.current!.currentTime <= end;
        });
        
        if (foundMoment && isPlaying) {
          // Pause and show freeze frame
          videoRef.current.pause();
          setIsPlaying(false);
          setActiveMoment(foundMoment);
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlayPosition = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setActiveMoment(null); // Clear active moment when playing manually
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekToMoment = (moment: MatchMoment) => {
    if (videoRef.current) {
      videoRef.current.currentTime = parseTimestamp(moment.timestamp_start);
      videoRef.current.pause();
      setIsPlaying(false);
      setActiveMoment(moment);
    }
  };

  return (
    <div className="w-full bg-[#080808] border border-[#1A1A1A] p-6 shadow-[0_0_40px_rgba(245,158,11,0.05)] relative z-10 flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
        <h3 className="text-[10px] uppercase font-bold tracking-widest text-amber-500 flex items-center gap-2">
          <Video className="w-4 h-4" /> Tactical Video Replay Engine
        </h3>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 border border-amber-500/20">
          AI Analysis Overlay Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Video Player */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="relative w-full aspect-video bg-black border border-[#222] overflow-hidden group">
             {videoUrl && (
               <video
                 ref={videoRef}
                 src={videoUrl}
                 className="w-full h-full object-cover"
                 onTimeUpdate={handleTimeUpdate}
                 onLoadedMetadata={handleLoadedMetadata}
                 onClick={togglePlayPosition}
               />
             )}
             
             {/* Freeze Frame Overlay Layer */}
             <AnimatePresence>
               {activeMoment && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px] border-2 border-amber-500/50 flex flex-col"
                 >
                   <div className="absolute top-4 left-4 bg-red-500/80 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 flex items-center gap-2 backdrop-blur-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> Freeze Frame
                   </div>

                   {/* Directional Hints / Fake canvas drawing */}
                   <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                     <Crosshair className="w-24 h-24 text-amber-500/40" strokeWidth={1} />
                     <div className="absolute w-1/3 h-px bg-amber-500/50 rotate-45 transform origin-left left-1/2 top-1/2"></div>
                   </div>

                 </motion.div>
               )}
             </AnimatePresence>

             {/* Simple Custom Controls overlay on hover */}
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center gap-4">
                <button onClick={togglePlayPosition} className="text-white hover:text-amber-500 transition-colors">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <div className={`flex-1 h-1 bg-[#333] relative ${(!session || session.subscription_tier === 'free') ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`} onClick={(e) => {
                  if (videoRef.current) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    videoRef.current.currentTime = pos * duration;
                  }
                }}>
                  <div className="absolute top-0 left-0 bottom-0 bg-amber-500" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}></div>
                  {/* Render moment markers on the timeline */}
                  {replay.moments.map((moment, idx) => {
                    const time = parseTimestamp(moment.timestamp_start);
                    const leftOffset = duration > 0 ? (time / duration) * 100 : 0;
                    return (
                      <div 
                        key={idx} 
                        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-200 rounded-full border border-black shadow-[0_0_10px_rgba(245,158,11,0.8)] z-10"
                        style={{ left: `${leftOffset}%` }}
                      ></div>
                    );
                  })}
                </div>
                <span className="text-[10px] text-white font-mono">
                  {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
                </span>
             </div>
          </div>
          
          {/* Moments Timeline Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide relative">
            {(!session || session.subscription_tier === 'free') && (
               <div className="absolute inset-0 bg-[#080808]/80 backdrop-blur-[1px] z-20 flex items-center justify-center border border-[#1A1A1A]">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-white text-amber-500 transition-colors" onClick={onUpgrade}>
                     <Lock className="w-4 h-4" />
                     <span className="text-[10px] uppercase font-bold tracking-widest">Pro Required to Scrub Timeline</span>
                  </div>
               </div>
            )}
            {replay.moments.map((moment, idx) => (
              <button
                key={idx}
                onClick={() => seekToMoment(moment)}
                className={`flex flex-col items-start min-w-[200px] p-3 border ${activeMoment === moment ? 'bg-amber-500/10 border-amber-500/50' : 'bg-[#0A0A0A] border-[#222] hover:border-[#444]'} transition-colors text-left group`}
              >
                <div className="flex justify-between w-full mb-2">
                  <span className="text-[10px] font-mono font-bold text-amber-500">{moment.timestamp_start}</span>
                  <ActivitySquare className={`w-3 h-3 ${activeMoment === moment ? 'text-amber-500' : 'text-gray-600'}`} />
                </div>
                <div className="text-xs text-gray-300 font-sans truncate w-full group-hover:text-white transition-colors">{moment.situation}</div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Overlay Panel */}
        <div className="lg:col-span-1 bg-[#0A0A0A] border border-[#222] p-6 relative overflow-hidden flex flex-col min-h-[400px]">
           {activeMoment ? (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex flex-col h-full relative z-10"
             >
               <h4 className="text-[10px] uppercase font-bold tracking-widest text-amber-500 mb-6 flex items-center justify-between">
                 Analysis <span className="px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20">{activeMoment.severity} Severity</span>
               </h4>
               
               <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                 {/* Layer 1: What Happened */}
                 <div>
                   <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-2 border-b border-[#222] pb-1">1. What Happened</span>
                   <p className="text-xs text-white font-sans font-medium">{activeMoment.user_action}</p>
                 </div>

                 {/* Layer 2: Why it was wrong */}
                 <div className="bg-red-500/5 border-l-2 border-red-500/50 p-3">
                   <span className="text-[9px] uppercase tracking-widest text-red-400 block mb-1">2. Tactical Flaw</span>
                   <p className="text-xs text-gray-300 font-sans">{activeMoment.problem}</p>
                 </div>

                 {/* Layer 3: Better Decision */}
                 <div className="bg-green-500/5 border-l-2 border-green-500/50 p-3">
                   <span className="text-[9px] uppercase tracking-widest text-green-400 block mb-1">3. Better Decision</span>
                   <p className="text-xs text-gray-300 font-sans">{activeMoment.better_decision}</p>
                 </div>

                 {/* Layer 4: Elite Reference & Coaching */}
                 <div className="bg-[#111] border border-[#333] p-4 mt-auto">
                   <div className="flex items-center gap-2 mb-3">
                     <Trophy className="w-4 h-4 text-amber-500" />
                     <span className="text-xs font-serif italic text-amber-500">{activeMoment.elite_reference}</span>
                   </div>
                   <ul className="space-y-2">
                     {activeMoment.coaching_overlay.map((tip, idx) => (
                       <li key={idx} className="text-[10px] uppercase tracking-wider text-gray-400 flex items-start gap-2">
                         <Target className="w-3 h-3 text-cyan-500 shrink-0 mt-0.5" />
                         <span className="leading-tight">{tip}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
             </motion.div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 relative z-10">
               <BrainCircuit className="w-12 h-12 text-gray-600 mb-4 animate-pulse" />
               <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Awaiting Moment Selection</p>
               <p className="text-[10px] text-gray-600 max-w-[200px]">Play the video or click a timeline marker to view deep tactical insights.</p>
             </div>
           )}
           
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>
        </div>
        
      </div>
    </div>
  );
}
