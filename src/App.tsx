import React, { useState } from 'react';
import { Target, Zap, History, BrainCircuit, User } from 'lucide-react';
import { UploadView } from './components/UploadView';
import { HomeDashboard } from './components/HomeDashboard';
import { LandingView } from './components/LandingView';
import { PricingView } from './components/PricingView';
import { AuthView } from './components/AuthView';
import { TacticalInsightLabView } from './components/TacticalInsightLabView';
import { PlayerAcademyView } from './components/PlayerAcademyView';
import { CommunityView } from './components/CommunityView';
import { PlayerEvolutionHubView } from './components/PlayerEvolutionHubView';
import { ReportDashboard } from './components/ReportDashboard';

import { ReportData, UserSession } from './types';
import { playTacticalScan, playEvolutionHype } from './utils/audio';
import { AnimatePresence, motion } from 'motion/react';

function App() {
  const [view, setView] = useState<
    'landing' | 'home' | 'upload' | 'report' | 'pricing' | 'evolution' | 'lab' | 'academy' | 'community' | 'auth'
  >('landing');

  const [session, setSession] = useState<UserSession | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [xp, setXp] = useState(150);
  const [level, setLevel] = useState('Academy Prospect');
  const [streak] = useState(3);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setVideoFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];

    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setError(null);
    } else {
      setError('Please upload a valid video file.');
    }
  };

  const handleAnalyze = async () => {
    if (!videoFile) return;

    playTacticalScan();
    setIsUploading(true);
    setError(null);
    setReport(null);

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze video.');
      }

      const parsedReport =
        typeof data.report === 'string'
          ? JSON.parse(data.report)
          : data.report;

      setReport(parsedReport);

      // FIXED XP LOGIC (state-safe)
      setXp((prev) => {
        const updated = Math.min(prev + 250, 1000);
        if (updated >= 400) setLevel('Elite Youth');
        return updated;
      });

      playEvolutionHype();

      // ✅ IMPORTANT FIX: go to report view
      setView('report');
    } catch (err: any) {
      setError(err.message || 'Unexpected error during analysis.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#D1D1D1] font-sans flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full border-b border-[#1A1A1A] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">

          <button onClick={() => setView('landing')} className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            <span className="text-[14px] uppercase font-bold text-white">
              Elite Scout
            </span>
          </button>

          <div className="flex items-center gap-6">

            <button onClick={() => setView('home')} className="text-gray-400 hover:text-white text-[12px] uppercase">
              Dashboard
            </button>

            <button onClick={() => setView('evolution')} className="text-gray-400 hover:text-white text-[12px] uppercase flex items-center gap-1">
              <History className="w-4 h-4" /> Evolution
            </button>

            <button onClick={() => setView('lab')} className="text-gray-400 hover:text-white text-[12px] uppercase flex items-center gap-1">
              <BrainCircuit className="w-4 h-4" /> Lab
            </button>

            <button onClick={() => setView('academy')} className="text-gray-400 hover:text-white text-[12px] uppercase">
              Academy
            </button>

            <button onClick={() => setView('community')} className="text-gray-400 hover:text-white text-[12px] uppercase">
              Community
            </button>

            <button onClick={() => setView('pricing')} className="text-amber-500 text-[12px] uppercase flex items-center gap-1">
              Pricing <Zap className="w-4 h-4" />
            </button>

            {session ? (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-500" />
                <span className="text-[11px] text-white">
                  {session.email.split('@')[0]}
                </span>
              </div>
            ) : (
              <button onClick={() => setView('auth')} className="text-gray-400 text-[12px] uppercase">
                Login
              </button>
            )}

            <button
              onClick={() => {
                setReport(null);
                setVideoFile(null);
                setView('upload');
              }}
              className="text-[12px] uppercase font-bold text-amber-500 border border-amber-500/30 px-4 py-2"
            >
              Analyze Footage
            </button>

          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >

            {view === 'landing' && (
              <LandingView
                onGetStarted={() => setView('home')}
                onViewPricing={() => setView('pricing')}
              />
            )}

            {view === 'auth' && (
              <AuthView onLogin={(s) => { setSession(s); setView('home'); }} />
            )}

            {view === 'pricing' && (
              <PricingView
                onUpgrade={(tier) => {
                  if (session) setSession({ ...session, subscription_tier: tier });
                  setView('home');
                }}
              />
            )}

            {view === 'home' && (
              <HomeDashboard
                xp={xp}
                level={level}
                streak={streak}
                session={session}
                onNavigateToUpload={() => setView('upload')}
                onUpgrade={() => setView('pricing')}
              />
            )}

            {view === 'evolution' && (
              <PlayerEvolutionHubView session={session} onUpgrade={() => setView('pricing')} />
            )}

            {view === 'lab' && <TacticalInsightLabView />}

            {view === 'academy' && (
              <PlayerAcademyView report={report} session={session} onUpgrade={() => setView('pricing')} />
            )}

            {view === 'community' && (
              <CommunityView report={report} session={session} onUpgrade={() => setView('pricing')} />
            )}

            {/* ✅ THIS IS THE CRITICAL FIX */}
            {view === 'report' && report && (
              <ReportDashboard
                report={report}
                videoFile={videoFile}
                session={session}
                onUpgrade={() => setView('pricing')}
              />
            )}

            {/* {view === 'upload' && (
              <UploadView
                videoFile={videoFile}
                isUploading={isUploading}
                error={error}
                onFileChange={handleFileChange}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onRemoveFile={() => setVideoFile(null)}
                onAnalyze={handleAnalyze}
              />
            )} */}


                         {view === 'upload' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pt-8 px-4">

                <header className="text-center mb-12 flex flex-col items-center">
                  <span className="text-[10px] tracking-[0.3em] text-amber-500 font-bold uppercase mb-4">
                    Tactical Input
                  </span>

                  <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight mb-4">
                    Upload. Analyze. Evolve.
                  </h1>

                  <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
                    Submit match footage to the intelligence grid.
                  </p>
                </header>

                <UploadView
                  videoFile={videoFile}
                  isUploading={isUploading}
                  error={error}
                  onFileChange={handleFileChange}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onRemoveFile={() => setVideoFile(null)}
                  onAnalyze={handleAnalyze}
                />

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;


