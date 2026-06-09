// import React, { useState, useEffect } from 'react';
// import { Target, Activity, Zap, History, BrainCircuit } from 'lucide-react';
// import { UploadView } from './components/UploadView';
// import { ReportDashboard } from './components/ReportDashboard';
// import { HomeDashboard } from './components/HomeDashboard';
// import { LandingView } from './components/LandingView';
// import { PricingView } from './components/PricingView';
// import { CareerTimelineView } from './components/CareerTimelinwView';
// import { TacticalInsightLabView } from './components/TacticalInsightLabView';
// import { ReportData } from './types';
// import { playTacticalScan, playEvolutionHype } from './utils/audio';
// import { AnimatePresence, motion } from 'motion/react';

// function App() {
//   const [view, setView] = useState<'landing' | 'home' | 'upload' | 'report' | 'pricing' | 'history' | 'lab'>('landing');
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [report, setReport] = useState<ReportData | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Progression State
//   const [xp, setXp] = useState(150);
//   const [level, setLevel] = useState('Academy Prospect');
//   const [streak, setStreak] = useState(3);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setVideoFile(e.target.files[0]);
//       setError(null);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       if (file.type.startsWith('video/')) {
//         setVideoFile(file);
//         setError(null);
//       } else {
//         setError('Please upload a valid video file.');
//       }
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!videoFile) return;

//     playTacticalScan();
//     setIsUploading(true);
//     setError(null);
//     setReport(null);

//     const formData = new FormData();
//     formData.append('video', videoFile);

//     try {
//       const response = await fetch('/api/analyze', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to analyze video.');
//       }

//       // let parsedReport = typeof data.report === 'string' ? JSON.parse(data.report) : data.report;

//       let parsedReport = typeof data.report === 'string' ? JSON.parse(data.report) : data.report;

//       console.log("FULL REPORT:", parsedReport);

//       // Give progression rewards
//       setXp(prev => Math.min(prev + 250, 1000));
//       if (xp + 250 >= 400) {
//         setLevel('Elite Youth');
//       }

//       setReport(parsedReport);
//       setView('report');
//       playEvolutionHype();

//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || 'An unexpected error occurred during processing.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-[#D1D1D1] font-sans selection:bg-amber-500/30 overflow-x-hidden flex flex-col relative">
      
//       {/* Background ambient animations */}
//       <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
//         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 to-transparent blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"></div>
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 to-transparent blur-[100px] rounded-full mix-blend-screen animate-float"></div>
//       </div>

//       <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(26,26,26,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.2)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

//       {/* Top Nav */}
//       <nav className="w-full border-b border-[#1A1A1A] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
//           <button onClick={() => setView('landing')} className="flex items-center gap-2 group">
//             <Target className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
//             <span className="text-[12px] uppercase font-bold tracking-widest text-white">Elite Scout <span className="text-amber-500">Platform</span></span>
//           </button>
          
//           <div className="flex items-center gap-6">
//             {view !== 'landing' && (
//               <div className="hidden md:flex items-center gap-6 mr-4">
//                 <button 
//                   onClick={() => setView('home')} 
//                   className={`text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-white ${view === 'home' ? 'text-white border-b-2 border-amber-500 pb-1' : 'text-gray-500'}`}
//                 >
//                   Dashboard
//                 </button>
//                 <button 
//                   onClick={() => setView('history')} 
//                   className={`text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-white flex items-center gap-1 ${view === 'history' ? 'text-white border-b-2 border-amber-500 pb-1' : 'text-gray-500'}`}
//                 >
//                   <History className="w-3 h-3" /> Timeline
//                 </button>
//                 <button 
//                   onClick={() => setView('lab')} 
//                   className={`text-[10px] uppercase font-bold tracking-widest transition-colors hover:text-white flex items-center gap-1 ${view === 'lab' ? 'text-white border-b-2 border-cyan-500 pb-1' : 'text-gray-500'}`}
//                 >
//                   <BrainCircuit className="w-3 h-3" /> Lab
//                 </button>
//               </div>
//             )}
//             <button onClick={() => setView('pricing')} className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-1">Pricing <Zap className="w-3 h-3 text-amber-500" /></button>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => { setReport(null); setVideoFile(null); setView('upload'); }}
//               className="text-[10px] uppercase font-bold tracking-widest text-amber-500 border border-amber-500/30 px-5 py-2 hover:bg-amber-500/10 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.1)] relative overflow-hidden group"
//             >
//               <div className="absolute inset-0 w-0 bg-amber-500/20 group-hover:w-full transition-all duration-300 ease-out"></div>
//               <span className="relative z-10">Analyze Footage</span>
//             </motion.button>
//           </div>
//         </div>
//       </nav>

//       <div className="flex-1 w-full max-w-7xl mx-auto pt-0 pb-12 relative z-10">
//         <AnimatePresence mode="wait">
          
//           <motion.div
//             key={view}
//             initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
//             animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
//             exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
//             transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//             className="w-full h-full pt-12"
//           >

//         {view === 'landing' && (
//           <LandingView 
//              onGetStarted={() => setView('home')} 
//              onViewPricing={() => setView('pricing')} 
//           />
//         )}

//         {view === 'pricing' && (
//           <PricingView onUpgrade={() => setView('home')} />
//         )}

//         {view === 'home' && (
//           <div className="pt-8 md:pt-12 px-4">
//             <HomeDashboard
//               xp={xp}
//               level={level}
//               streak={streak}
//               onNavigateToUpload={() => setView('upload')}
//             />
//           </div>
//         )}

//         {view === 'history' && (
//           <div className="pt-8 md:pt-12 px-4">
//             <CareerTimelineView />
//           </div>
//         )}

//         {view === 'lab' && (
//           <div className="pt-8 md:pt-12 px-4">
//             <TacticalInsightLabView />
//           </div>
//         )}

//         {view === 'upload' && (
//           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pt-8 md:pt-12 px-4">
//             <header className="text-center mb-12 flex flex-col items-center">
//               <span className="text-[10px] tracking-[0.3em] text-amber-500 font-bold uppercase mb-4">Tactical Input</span>
//               <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight mb-4">
//                 Upload. Analyze. Evolve.
//               </h1>
//               <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
//                 Submit match footage to the intelligence grid. Receive an academy-level tactical breakdown of your biomechanics.
//               </p>
//             </header>
//             <UploadView
//               videoFile={videoFile}
//               isUploading={isUploading}
//               error={error}
//               onFileChange={handleFileChange}
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onRemoveFile={() => setVideoFile(null)}
//               onAnalyze={handleAnalyze}
//             />
//           </div>
//         )}

//         {view === 'report' && report && (
//           <div className="pt-8 md:pt-12 px-4">
//             <ReportDashboard
//               report={report}
//               onReset={() => {
//                 setReport(null);
//                 setVideoFile(null);
//                 setView('home');
//               }}
//             />
//           </div>
//         )}

//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Activity, Zap, History, BrainCircuit, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';

// Import your components
import { UploadView } from './components/UploadView';
import { ReportDashboard } from './components/ReportDashboard';
import { HomeDashboard } from './components/HomeDashboard';
import { LandingView } from './components/LandingView';
import { PricingView } from './components/PricingView';
import { CareerTimelineView } from './components/CareerTimelinwView';
import { TacticalInsightLabView } from './components/TacticalInsightLabView';

// Types (Assuming this exists in your project)
import { ReportData } from './types';

// Audio utilities (Optional - keep if you have them, otherwise remove)
// import { playTacticalScan, playEvolutionHype } from './utils/audio';

type ViewType = 'landing' | 'home' | 'upload' | 'report' | 'pricing' | 'history' | 'lab';

function App() {
  const [view, setView] = useState<ViewType>('landing');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Progression State
  const [xp, setXp] = useState(150);
  const [level, setLevel] = useState('Academy Prospect');
  const [streak, setStreak] = useState(3);

  // Mock API Call for demonstration
  const handleAnalyze = async () => {
    if (!videoFile) return;
    
    // playTacticalScan(); // Uncomment if you have audio
    setIsUploading(true);
    setError(null);
    setReport(null);

    // Simulate API delay
    setTimeout(() => {
      // Mock Data Response
      const mockReport: ReportData = {
        overallRating: 78,
        identity: {
          archetype: "Progressive Playmaker",
          role: "Central Midfielder",
          summary: "Shows exceptional vision in transition phases but lacks defensive recovery speed.",
          comparisonPlayer: "Kevin De Bruyne",
          comparisonReason: "Similar passing range and ability to dictate tempo from deep positions."
        },
        reality: {
          attributes: {
            technical: 82, tactical: 79, physical: 65, mental: 74,
            creativity: 85, defensive: 58, attacking: 76, consistency: 72
          },
          tacticalIntelligence: "High awareness of space in Zone 14. Tends to drift right to receive.",
          decisionMaking: "Excellent in buildup, occasionally rushes final third passes under pressure.",
          strengths: ["Through balls", "Long passing", "Set piece delivery"],
          weaknesses: ["Defensive tracking", "Physical shielding", "Left foot usage"]
        },
        growth: {
          priorities: [
            {
              focus: "Defensive Transition",
              timeframe: "Weeks 1-2",
              drill: "Rondo 4v2 with immediate counter-press constraint",
              matchScenario: "Recover position within 3 seconds of turnover"
            },
            {
              focus: "Physical Shielding",
              timeframe: "Weeks 3-4",
              drill: "Back-to-goal hold-up play against resistance",
              matchScenario: "Retain possession for 5+ seconds under pressure"
            }
          ],
          nextLevelUnlock: "Reach 80 OVR to unlock Elite Academy Scouting Network access."
        },
        roleProfile: '',
        position: '',
        tacticalFunction: undefined,
        riskProfile: '',
        radar: undefined,
        observations: [],
        tacticalFit: undefined,
        developmentModel: undefined,
        comparison: undefined,
        heatmap: undefined,
        scoutVerdict: ''
      };

      setReport(mockReport);
      setXp(prev => Math.min(prev + 250, 1000));
      if (xp + 250 >= 400) setLevel('Elite Youth');
      
      setIsUploading(false);
      setView('report');
      // playEvolutionHype(); // Uncomment if you have audio
    }, 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setError(null);
    }
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Navigation Items
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Activity },
    { id: 'history', label: 'Timeline', icon: History },
    { id: 'lab', label: 'Tactical Lab', icon: BrainCircuit },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#D1D1D1] font-sans selection:bg-amber-500/30 overflow-x-hidden flex flex-col relative">
      
      {/* Premium Background Ambiance */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Animated Gradients */}
        <motion.div 
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>

      {/* Enhanced Navbar */}
      <nav className="w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <motion.button 
            onClick={() => setView('landing')} 
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <Target className="w-6 h-6 text-amber-500 group-hover:rotate-180 transition-transform duration-700" />
              <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm uppercase font-bold tracking-widest text-white leading-none">Elite Scout</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-amber-500/80 font-medium">Platform v2.0</span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {view !== 'landing' && view !== 'pricing' && (
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id as ViewType)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 flex items-center gap-2 ${
                      view === item.id 
                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-3 h-3" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <div className="h-6 w-px bg-white/10"></div>

            <button 
              onClick={() => setView('pricing')} 
              className={`text-[10px] uppercase font-bold tracking-widest transition-colors flex items-center gap-2 ${
                view === 'pricing' ? 'text-amber-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Pricing <Zap className="w-3 h-3" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { 
                setReport(null); 
                setVideoFile(null); 
                setView('upload'); 
              }}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] uppercase font-bold tracking-widest rounded-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center gap-2 group"
            >
              <Activity className="w-3 h-3 group-hover:animate-pulse" />
              Analyze Footage
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#0a0a0a]"
            >
              <div className="px-4 py-6 space-y-4">
                {view !== 'landing' && view !== 'pricing' && navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id as ViewType);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-xs uppercase font-bold tracking-widest flex items-center gap-3 ${
                      view === item.id 
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setView('pricing');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-xs uppercase font-bold tracking-widest text-gray-400 hover:bg-white/5 flex items-center gap-3"
                >
                  <Zap className="w-4 h-4" /> Pricing
                </button>
                <button
                  onClick={() => {
                    setView('upload');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-4 py-3 bg-amber-500 text-black text-xs uppercase font-bold tracking-widest rounded-lg flex items-center justify-center gap-2"
                >
                  Analyze Footage
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto relative z-10 px-4 md:px-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full pt-8 md:pt-12"
          >
            {view === 'landing' && (
              <LandingView
                onGetStarted={() => setView('home')}
                onViewPricing={() => setView('pricing')}
              />
            )}

            {view === 'pricing' && (
              <PricingView onUpgrade={() => setView('home')} />
            )}

            {view === 'home' && (
              <HomeDashboard
                xp={xp}
                level={level}
                streak={streak}
                onNavigateToUpload={() => setView('upload')}
              />
            )}

            {view === 'history' && (
              <CareerTimelineView />
            )}

            {view === 'lab' && (
              <TacticalInsightLabView />
            )}

            {view === 'upload' && (
              <div className="max-w-3xl mx-auto">
                 {/* Header for Upload Page */}
                 <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Secure Upload Protocol</span>
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                    Upload. Analyze. <span className="font-serif italic text-amber-500">Evolve.</span>
                  </h1>
                  <p className="text-base text-gray-400 max-w-xl mx-auto">
                    Submit match footage to the intelligence grid. Receive an academy-level tactical breakdown of your biomechanics.
                  </p>
                </div>

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
              <ReportDashboard
                report={report}
                onReset={() => {
                  setReport(null);
                  setVideoFile(null);
                  setView('home');
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#050505] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] uppercase tracking-widest text-gray-500">© 2026 Elite Scout Platform</span>
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Support'].map((item) => (
              <a key={item} href="#" className="text-[10px] uppercase tracking-widest text-gray-600 hover:text-amber-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;