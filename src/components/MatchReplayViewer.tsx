import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ActivitySquare, Crosshair, BrainCircuit, Target, Video, Trophy, Lock, Volume2, VolumeX, ScanLine, RotateCcw } from 'lucide-react';
import { MatchReplay, MatchMoment, UserSession } from '../types';
import { FeatureLock } from './FeatureLock';

interface MatchReplayViewerProps {
  replay: MatchReplay;
  videoFile: File | null;
  session: UserSession | null;
  onUpgrade?: () => void;
}

// Optional per-moment coaching point. If a moment doesn't carry one,
// we fall back to a sensible default so nothing ever breaks.
// Expected shape (all optional, 0-100 = % of frame width/height):
//   moment.focus_point = { x: 55, y: 62, radius: 18 }
const DEFAULT_FOCUS = { x: 50, y: 58, radius: 20 };

export function MatchReplayViewer({ replay, videoFile, session, onUpgrade }: MatchReplayViewerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeMoment, setActiveMoment] = useState<MatchMoment | null>(null);
  const [dismissedMoments, setDismissedMoments] = useState<Set<number>>(new Set());
  const [hoverPct, setHoverPct] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isLocked = !session || session.subscription_tier === 'free';

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

  const formatTime = (t: number) => {
    if (!isFinite(t) || t < 0) t = 0;
    return `${Math.floor(t / 60)}:${(Math.floor(t % 60)).toString().padStart(2, '0')}`;
  };

  // Get the focus point for a moment, with safe fallback
  const getFocusPoint = (moment: MatchMoment | null) => {
    const fp = (moment as any)?.focus_point;
    if (fp && typeof fp.x === 'number' && typeof fp.y === 'number') {
      return {
        x: fp.x,
        y: fp.y,
        radius: typeof fp.radius === 'number' ? fp.radius : DEFAULT_FOCUS.radius,
      };
    }
    return DEFAULT_FOCUS;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Don't re-evaluate while a moment is already on screen
    if (activeMoment) return;

    const momentIdx = replay.moments.findIndex((m) => {
      const start = parseTimestamp(m.timestamp_start);
      const end = parseTimestamp(m.timestamp_end);
      return time >= start && time <= end;
    });

    if (momentIdx === -1) return;

    // Already shown this one during this playthrough — let it pass through
    if (dismissedMoments.has(momentIdx)) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setActiveMoment(replay.moments[momentIdx]);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlayPosition = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // If resuming from a freeze frame, mark this moment as dismissed
      // so it won't immediately re-trigger and lock playback again.
      if (activeMoment) {
        const idx = replay.moments.indexOf(activeMoment);
        if (idx !== -1) {
          setDismissedMoments((prev) => new Set(prev).add(idx));
        }
        setActiveMoment(null);
      }
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const seekToMoment = (moment: MatchMoment, idx: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = parseTimestamp(moment.timestamp_start);
    videoRef.current.pause();
    setIsPlaying(false);
    setActiveMoment(moment);
    // Mark as "seen" right away so resuming play doesn't re-trap on it
    setDismissedMoments((prev) => new Set(prev).add(idx));
  };

  const replayMoment = (moment: MatchMoment, idx: number) => {
    if (!videoRef.current) return;
    // Allow re-watching this beat: un-dismiss it temporarily and seek slightly before it
    setDismissedMoments((prev) => {
      const next = new Set(prev);
      next.delete(idx);
      return next;
    });
    const start = Math.max(0, parseTimestamp(moment.timestamp_start) - 0.4);
    videoRef.current.currentTime = start;
    setActiveMoment(null);
    videoRef.current.play();
    setIsPlaying(true);
  };

  const progressPct = (currentTime / (duration || 1)) * 100;
  const focus = getFocusPoint(activeMoment);

  return (
    <div className="w-full bg-[#080808] border border-[#1A1A1A] p-6 shadow-[0_0_40px_rgba(245,158,11,0.05)] relative z-10 flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
        <h3 className="text-[10px] uppercase font-bold tracking-widest text-amber-500 flex items-center gap-2">
          <Video className="w-4 h-4" /> Tactical Video Replay Engine
        </h3>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 border border-amber-500/20 flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
          </span>
          AI Analysis Overlay Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-6 items-start">

        {/* Main Video Player - vertical phone-frame canvas */}
        <div className="flex flex-col gap-4 mx-auto w-full max-w-[360px] lg:max-w-none">
          <div className="relative w-full aspect-[9/16] bg-black border border-[#222] overflow-hidden group">

            {/* Corner HUD brackets */}
            <div className="absolute inset-3 pointer-events-none z-30">
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-amber-500/50"></div>
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-amber-500/50"></div>
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-amber-500/50"></div>
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-amber-500/50"></div>
            </div>

            {/* Video layer - zooms in toward the focus point during freeze frame */}
            <motion.div
              className="absolute inset-0"
              animate={activeMoment ? {
                scale: 1.5,
                x: `${(50 - focus.x) * 1.5}%`,
                y: `${(50 - focus.y) * 1.5}%`,
              } : { scale: 1, x: '0%', y: '0%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ transformOrigin: `${focus.x}% ${focus.y}%` }}
            >
              {videoUrl && (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={togglePlayPosition}
                />
              )}
            </motion.div>

            {/* Live scan sweep while playing */}
            <AnimatePresence>
              {isPlaying && !activeMoment && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                >
                  <motion.div
                    animate={{ y: ['-10%', '110%'] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
                    className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
                  />
                  <motion.div
                    animate={{ y: ['-10%', '110%'] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
                    className="absolute left-0 right-0 h-px bg-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center gap-2 text-[9px] uppercase tracking-widest text-cyan-300/80 font-mono">
                    <ScanLine className="w-3 h-3" />
                    Tracking player movement
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center play button when paused & no active moment */}
            {!isPlaying && !activeMoment && (
              <button
                onClick={togglePlayPosition}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 hover:bg-black/35 transition-colors"
                aria-label="Play"
              >
                <span className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-7 h-7 text-amber-400 ml-0.5" fill="currentColor" />
                </span>
              </button>
            )}

            {/* Freeze Frame Coaching Overlay */}
            <AnimatePresence>
              {activeMoment && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/75"></div>

                  {/* Focus ring on the exact action point */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      initial={{ scale: 1.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="absolute"
                      style={{
                        left: `${focus.x}%`,
                        top: `${focus.y}%`,
                        width: `${focus.radius * 2}%`,
                        height: `${focus.radius * 2}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="w-full h-full rounded-full border-2 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.5)]"></div>
                      <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full border border-amber-400/60"
                      ></motion.div>
                      <Crosshair className="absolute inset-0 m-auto w-1/2 h-1/2 text-amber-300/70" strokeWidth={1} />
                    </motion.div>

                    {/* Coaching arrow pointing into the focus area */}
                    <motion.svg
                      initial={{ opacity: 0, x: -10, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                      className="absolute"
                      style={{
                        left: `${Math.max(2, focus.x - focus.radius - 18)}%`,
                        top: `${Math.max(2, focus.y - focus.radius - 12)}%`,
                        width: '22%',
                        height: '22%',
                      }}
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <path
                        d="M8 8 C 30 14, 55 35, 80 75"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="6 6"
                      />
                      <path d="M80 75 L 68 64 M80 75 L 72 88" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                    </motion.svg>
                  </div>

                  {/* Top bar: status + timestamp */}
                  <div className="relative z-10 flex items-center justify-between p-3">
                    <div className="bg-red-500 text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> Freeze Frame
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-amber-300 font-mono bg-black/50 px-2 py-1 border border-amber-500/30">
                      {activeMoment.timestamp_start}
                    </div>
                  </div>

                  {/* Bottom: situation caption + replay control */}
                  <div className="relative z-10 p-3 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <span className="block text-[9px] uppercase tracking-widest text-gray-300 mb-1">Detected</span>
                      <p className="text-sm font-serif italic text-white leading-snug">{activeMoment.situation}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = replay.moments.indexOf(activeMoment);
                        replayMoment(activeMoment, idx);
                      }}
                      className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/50 border border-amber-500/30 text-amber-300 text-[9px] uppercase tracking-widest font-bold hover:bg-amber-500/10 hover:border-amber-500 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Replay
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom controls bar */}
            <div className="absolute bottom-0 left-0 right-0 z-30 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center gap-3">
              <button onClick={togglePlayPosition} className="text-white hover:text-amber-500 transition-colors shrink-0">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <div
                className="flex-1 h-1.5 bg-[#333] relative rounded-full cursor-pointer group/scrub"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoverPct(((e.clientX - rect.left) / rect.width) * 100);
                }}
                onMouseLeave={() => setHoverPct(null)}
                onClick={(e) => {
                  if (videoRef.current) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    videoRef.current.currentTime = pos * duration;
                  }
                }}
              >
                <div className="absolute top-0 left-0 bottom-0 bg-amber-500 rounded-full" style={{ width: `${progressPct}%` }}></div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-300 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)] -translate-x-1/2 opacity-0 group-hover/scrub:opacity-100 transition-opacity"
                  style={{ left: `${progressPct}%` }}
                ></div>

                {/* Moment markers */}
                {replay.moments.map((moment, idx) => {
                  const time = parseTimestamp(moment.timestamp_start);
                  const leftOffset = duration > 0 ? (time / duration) * 100 : 0;
                  return (
                    <div
                      key={idx}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full border border-black shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10"
                      style={{ left: `${leftOffset}%` }}
                    ></div>
                  );
                })}

                {/* Hover time tooltip */}
                {hoverPct !== null && (
                  <div
                    className="absolute -top-7 -translate-x-1/2 text-[9px] font-mono text-white bg-[#111] border border-[#333] px-1.5 py-0.5 rounded pointer-events-none"
                    style={{ left: `${hoverPct}%` }}
                  >
                    {formatTime((hoverPct / 100) * duration)}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-white font-mono shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <button onClick={toggleMute} className="text-white hover:text-amber-500 transition-colors shrink-0">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Moments list - vertical stack to suit tall video */}
          <div className="flex flex-col gap-2 relative">
            {isLocked && (
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
                onClick={() => seekToMoment(moment, idx)}
                className={`flex items-center gap-3 p-3 border text-left transition-colors group ${activeMoment === moment ? 'bg-amber-500/10 border-amber-500/50' : 'bg-[#0A0A0A] border-[#222] hover:border-[#444]'}`}
              >
                <span className="text-[10px] font-mono font-bold text-amber-500 shrink-0 w-10">{moment.timestamp_start}</span>
                <div className="text-xs text-gray-300 font-sans truncate flex-1 group-hover:text-white transition-colors">{moment.situation}</div>
                <ActivitySquare className={`w-3 h-3 shrink-0 ${activeMoment === moment ? 'text-amber-500' : 'text-gray-600'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* AI Overlay Panel - always mirrors activeMoment exactly */}
        <div className="bg-[#0A0A0A] border border-[#222] p-6 relative overflow-hidden flex flex-col min-h-[400px] lg:min-h-[560px]">
          <AnimatePresence mode="wait">
            {activeMoment ? (
              <motion.div
                key={`${activeMoment.timestamp_start}-${activeMoment.timestamp_end}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
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

                <button
                  onClick={() => {
                    const idx = replay.moments.indexOf(activeMoment);
                    replayMoment(activeMoment, idx);
                  }}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-[#333] bg-[#111] text-[10px] uppercase tracking-widest font-bold text-amber-500 hover:border-amber-500/50 transition-colors relative z-10"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Replay This Moment
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center opacity-60 relative z-10"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                  className="absolute w-32 h-32 border border-dashed border-[#222] rounded-full"
                ></motion.div>
                <BrainCircuit className="w-12 h-12 text-gray-600 mb-4 relative z-10" />
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2 relative z-10">Awaiting Moment Selection</p>
                <p className="text-[10px] text-gray-600 max-w-[220px] relative z-10">Play the video or select a tactical marker to view deep AI insights.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>
        </div>

      </div>
    </div>
  );
}

