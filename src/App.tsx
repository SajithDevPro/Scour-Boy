import React, { useState, useEffect } from 'react';
import { Target, Activity, Zap, History, BrainCircuit, User } from 'lucide-react';
import { UploadView } from './components/UploadView';
import { ReportDashboard } from './components/ReportDashboard';
import { HomeDashboard } from './components/HomeDashboard';
import { LandingView } from './components/LandingView';
import { PricingView } from './components/PricingView';
import { AuthView } from './components/AuthView';
import { CareerTimelineView } from './components/CareerTimelineView';
import { TacticalInsightLabView } from './components/TacticalInsightLabView';
import { PlayerAcademyView } from './components/PlayerAcademyView';
import { CommunityView } from './components/CommunityView';
import { ReportData, UserSession } from './types';
import { playTacticalScan, playEvolutionHype } from './utils/audio';
import { AnimatePresence, motion } from 'motion/react';

import { PlayerEvolutionHubView } from './components/PlayerEvolutionHubView';

function App() {
  const [view, setView] = useState<'landing' | 'home' | 'upload' | 'report' | 'pricing' | 'evolution' | 'lab' | 'academy' | 'community' | 'auth'>('landing');
  const [session, setSession] = useState<UserSession | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Progression State
  const [xp, setXp] = useState(150);
  const [level, setLevel] = useState('Academy Prospect');
  const [streak, setStreak] = useState(3);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setError(null);
      } else {
        setError('Please upload a valid video file.');
      }
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

      // let parsedReport = typeof data.report === 'string' ? JSON.parse(data.report) : data.report;

      let parsedReport = typeof data.report === 'string' ? JSON.parse(data.report) : data.report;

      console.log("FULL REPORT:", parsedReport);

      // Give progression rewards
      setXp(prev => Math.min(prev + 250, 1000));
      if (xp + 250 >= 400) {
        setLevel('Elite Youth');
      }

      setReport(parsedReport);
      setView('report');
      playEvolutionHype();

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during processing.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#D1D1D1] font-sans selection:bg-amber-500/30 overflow-x-hidden flex flex-col relative">
      
      {/* Background ambient animations */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 to-transparent blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 to-transparent blur-[100px] rounded-full mix-blend-screen animate-float"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(26,26,26,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      {/* Top Nav */}
      <nav className="w-full border-b border-[#1A1A1A] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button onClick={() => setView('landing')} className="flex items-center gap-2 group">
            <Target className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[12px] uppercase font-bold tracking-widest text-white">Elite Scout <span className="text-amber-500">Platform</span></span>
          </button>
          
          <div className="flex items-center gap-6">
            {view !== 'landing' && (
              <div className="hidden md:flex items-center gap-6 mr-4">
                <button 
                  onClick={() => setView('home')} 
                  className={`text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-white ${view === 'home' ? 'text-white border-b-2 border-amber-500 pb-1' : 'text-gray-500'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setView('evolution')} 
                  className={`text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-white flex items-center gap-1 ${view === 'evolution' ? 'text-white border-b-2 border-amber-500 pb-1' : 'text-gray-500'}`}
                >
                  <History className="w-3 h-3" /> Evolution
                </button>
                <button 
                  onClick={() => setView('lab')} 
                  className={`text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-white flex items-center gap-1 ${view === 'lab' ? 'text-white border-b-2 border-cyan-500 pb-1' : 'text-gray-500'}`}
                >
                  <BrainCircuit className="w-3 h-3" /> Lab
                </button>
                <button 
                  onClick={() => setView('academy')} 
                  className={`text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-white ${view === 'academy' ? 'text-white border-b-2 border-amber-500 pb-1' : 'text-gray-500'}`}
                >
                  Academy
                </button>
                <button 
                  onClick={() => setView('community')} 
                  className={`text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-white ${view === 'community' ? 'text-white border-b-2 border-amber-500 pb-1' : 'text-gray-500'}`}
                >
                  Community
                </button>
              </div>
            )}
            <button onClick={() => setView('pricing')} className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-1">Pricing <Zap className="w-3 h-3 text-amber-500" /></button>
            
            {session ? (
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center">
                    <User className="w-4 h-4 text-cyan-500" />
                 </div>
                 <div className="hidden md:flex flex-col">
                    <span className="text-[10px] font-bold text-white uppercase">{session.email.split('@')[0]}</span>
                    <span className="text-[8px] uppercase tracking-widest text-amber-500 font-bold">{session.subscription_tier}</span>
                 </div>
               </div>
            ) : (
               <button onClick={() => setView('auth')} className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-white transition-colors">Login</button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setReport(null); setVideoFile(null); setView('upload'); }}
              className="text-[10px] uppercase font-bold tracking-widest text-amber-500 border border-amber-500/30 px-5 py-2 hover:bg-amber-500/10 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.1)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 w-0 bg-amber-500/20 group-hover:w-full transition-all duration-300 ease-out"></div>
              <span className="relative z-10">Analyze Footage</span>
            </motion.button>
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full max-w-7xl mx-auto pt-0 pb-12 relative z-10">
        <AnimatePresence mode="wait">
          
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full pt-12"
          >

        {view === 'landing' && (
          <LandingView 
             onGetStarted={() => setView('home')} 
             onViewPricing={() => setView('pricing')} 
          />
        )}

        {view === 'auth' && (
          <AuthView onLogin={(s) => {
            setSession(s);
            setView('home');
          }} />
        )}

        {view === 'pricing' && (
          <PricingView onUpgrade={(tier) => {
            if (session) {
               setSession({...session, subscription_tier: tier});
               setView('home');
            } else {
               setView('auth');
            }
          }} />
        )}

        {view === 'home' && (
          <div className="pt-8 md:pt-12 px-4">
            <HomeDashboard
              xp={xp}
              level={level}
              streak={streak}
              session={session}
              onNavigateToUpload={() => setView('upload')}
              onUpgrade={() => setView('pricing')}
            />
          </div>
        )}

        {view === 'evolution' && (
          <div className="pt-8 md:pt-12 px-4">
            <PlayerEvolutionHubView session={session} onUpgrade={() => setView('pricing')} />
          </div>
        )}

        {view === 'lab' && (
          <div className="pt-8 md:pt-12 px-4">
            <TacticalInsightLabView />
          </div>
        )}

        {view === 'academy' && (
          <div className="pt-8 md:pt-12 px-4">
            <PlayerAcademyView report={report} session={session} onUpgrade={() => setView('pricing')} />
          </div>
        )}

        {view === 'community' && (
          <div className="pt-8 md:pt-12 px-4">
            <CommunityView report={report} session={session} onUpgrade={() => setView('pricing')} />
          </div>
        )}

        {view === 'upload' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pt-8 md:pt-12 px-4">
            <header className="text-center mb-12 flex flex-col items-center">
              <span className="text-[10px] tracking-[0.3em] text-amber-500 font-bold uppercase mb-4">Tactical Input</span>
              <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight mb-4">
                Upload. Analyze. Evolve.
              </h1>
              <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
                Submit match footage to the intelligence grid. Receive an academy-level tactical breakdown of your biomechanics.
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

        {view === 'report' && report && (
          <div className="pt-8 md:pt-12 px-4">
            <ReportDashboard
              report={report}
              videoFile={videoFile}
              session={session}
              onUpgrade={() => setView('pricing')}
              onReset={() => {
                setReport(null);
                setVideoFile(null);
                setView('home');
              }}
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
