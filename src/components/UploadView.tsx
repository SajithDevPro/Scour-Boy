
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileVideo, Brain, AlertCircle, ScanLine, CheckCircle2, X, Zap, Shield, Clock } from 'lucide-react';

const LOADING_PHASES = [
  { label: "Scanning match footage", detail: "Detecting player positions and movement vectors", pct: 22 },
  { label: "Extracting tactical intelligence", detail: "Mapping phase transitions and spatial patterns", pct: 48 },
  { label: "Building player DNA profile", detail: "Classifying behavioral archetypes and tendencies", pct: 73 },
  { label: "Finalizing growth roadmap", detail: "Generating personalized development directives", pct: 95 },
];

const CAPABILITIES = [
  { icon: Zap, label: "Instant archetype detection", sub: "Classified in under 60 seconds" },
  { icon: Shield, label: "Tactical vulnerability map", sub: "Phase-by-phase breakdown" },
  { icon: Clock, label: "Career trajectory modeling", sub: "6-month growth projection" },
];

function PitchGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245,158,11,0.06)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <ellipse cx="300" cy="200" rx="80" ry="80" fill="none" stroke="rgba(245,158,11,0.08)" strokeWidth="0.8"/>
      <line x1="300" y1="0" x2="300" y2="400" stroke="rgba(245,158,11,0.07)" strokeWidth="0.8"/>
      <rect x="40" y="120" width="80" height="160" fill="none" stroke="rgba(245,158,11,0.07)" strokeWidth="0.8"/>
      <rect x="480" y="120" width="80" height="160" fill="none" stroke="rgba(245,158,11,0.07)" strokeWidth="0.8"/>
      <rect x="8" y="152" width="32" height="96" fill="none" stroke="rgba(245,158,11,0.06)" strokeWidth="0.8"/>
      <rect x="560" y="152" width="32" height="96" fill="none" stroke="rgba(245,158,11,0.06)" strokeWidth="0.8"/>
    </svg>
  );
}

function ScannerRing({ progress }) {
  const circumference = 2 * Math.PI * 56;
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="2"/>
        <motion.circle
          cx="64" cy="64" r="56" fill="none"
          stroke="#f59e0b" strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="absolute inset-3 border border-dashed border-amber-500/20 rounded-full"
      />
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ScanLine className="w-8 h-8 text-amber-500" />
        </motion.div>
        <motion.span
          key={Math.floor(progress)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono text-amber-400 mt-1"
        >
          {Math.floor(progress)}%
        </motion.span>
      </div>
    </div>
  );
}

export function UploadView({ videoFile, isUploading, error, onFileChange, onDrop, onDragOver, onRemoveFile, onAnalyze }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isUploading) { setPhase(0); setProgress(0); return; }
    const phaseInterval = setInterval(() => {
      setPhase(p => Math.min(p + 1, LOADING_PHASES.length - 1));
    }, 3200);
    return () => clearInterval(phaseInterval);
  }, [isUploading]);

  useEffect(() => {
    if (!isUploading) return;
    const target = LOADING_PHASES[phase]?.pct || 95;
    const tick = setInterval(() => {
      setProgress(p => {
        if (p >= target) return p;
        return Math.min(p + 0.6, target);
      });
    }, 30);
    return () => clearInterval(tick);
  }, [phase, isUploading]);

  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => { setIsDragging(false); onDrop(e); };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <PitchGrid />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        
        <AnimatePresence mode="wait">
          {isUploading ? (
            /* ── ANALYSIS STATE ── */
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#080808] border border-[#1c1c1c] rounded-2xl overflow-hidden"
            >
              <div className="p-8 flex flex-col items-center">
                <ScannerRing progress={progress} />

                <div className="mt-8 w-full space-y-1">
                  {LOADING_PHASES.map((p, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: idx <= phase ? 1 : 0.25, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${idx === phase ? 'bg-amber-500/5 border border-amber-500/10' : ''}`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${idx < phase ? 'bg-amber-500 border-amber-500' : idx === phase ? 'border-amber-500' : 'border-[#333]'}`}>
                        {idx < phase
                          ? <CheckCircle2 className="w-3 h-3 text-black" />
                          : idx === phase
                          ? <motion.span animate={{ opacity: [1,0.3,1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-amber-500 rounded-full block" />
                          : <span className="w-1.5 h-1.5 bg-[#333] rounded-full block" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold truncate ${idx === phase ? 'text-white' : idx < phase ? 'text-gray-400' : 'text-gray-600'}`}>{p.label}</p>
                        {idx === phase && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-gray-500 font-sans mt-0.5 truncate">{p.detail}</motion.p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="w-full mt-6 h-px bg-[#1c1c1c] relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-amber-500 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>

          ) : (
            /* ── UPLOAD STATE ── */
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-4"
            >
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); handleDragEnter(e); }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !videoFile && inputRef.current?.click()}
                className={`relative cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden
                  ${isDragging ? 'border-amber-500 bg-amber-500/5 scale-[1.01]' : videoFile ? 'border-amber-500/40 bg-[#0a0a0a]' : 'border-[#1c1c1c] bg-[#080808] hover:border-[#2a2a2a] hover:bg-[#0a0a0a]'}
                `}
              >
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 rounded-tl" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 rounded-br" />

                <div className="py-14 px-8 flex flex-col items-center text-center">
                  <AnimatePresence mode="wait">
                    {videoFile ? (
                      <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                          <FileVideo className="w-8 h-8 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm truncate max-w-[220px]">{videoFile.name}</p>
                          <p className="text-gray-500 text-xs mt-1 font-mono">{(videoFile.size / (1024*1024)).toFixed(1)} MB</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onRemoveFile(); }}
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-600 hover:text-red-500 transition-colors mt-2"
                        >
                          <X className="w-3 h-3" /> Remove file
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                        <motion.div
                          animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="w-16 h-16 rounded-2xl bg-[#111] border border-[#222] flex items-center justify-center"
                        >
                          <Upload className="w-7 h-7 text-amber-500" />
                        </motion.div>
                        <div>
                          <p className="text-white font-semibold text-sm mb-1">
                            {isDragging ? 'Drop to upload' : 'Drop footage here'}
                          </p>
                          <p className="text-gray-600 text-xs">MP4, MOV or WEBM · up to 2GB</p>
                        </div>
                        <label className="cursor-pointer px-5 py-2 bg-[#111] border border-[#252525] rounded-lg text-[11px] font-bold uppercase tracking-widest text-amber-500 hover:bg-[#181818] hover:border-amber-500/30 transition-all">
                          Browse files
                          <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={onFileChange} />
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-3 p-4 bg-red-950/30 border border-red-500/20 rounded-xl"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm font-sans">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA */}
              <AnimatePresence>
                {videoFile && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    onClick={onAnalyze}
                    className="relative w-full py-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] rounded-xl text-black font-black text-sm uppercase tracking-widest transition-all duration-200 overflow-hidden group"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-amber-400/0 via-white/10 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
                    <span className="relative z-10 flex items-center justify-center gap-2.5">
                      <Brain className="w-4 h-4" />
                      Engage AI Scouting Protocol
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Capability pills */}
              <div className="pt-2 flex flex-col gap-2.5">
                {CAPABILITIES.map(({ icon: Icon, label, sub }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 px-4 py-3 bg-[#080808] border border-[#141414] rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#111] border border-[#1c1c1c] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-300">{label}</p>
                      <p className="text-[10px] text-gray-600 font-sans">{sub}</p>
                    </div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500/50 ml-auto shrink-0" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

