// import React, { useEffect, useState } from 'react';

// import { Target, Zap, History, BrainCircuit, User } from 'lucide-react';

// import { UploadView } from './components/UploadView';
// import { HomeDashboard } from './components/HomeDashboard';
// import { LandingView } from './components/LandingView';
// import { PricingView } from './components/PricingView';
// import { AuthView } from './components/AuthView';
// import { TacticalInsightLabView } from './components/TacticalInsightLabView';
// import { PlayerAcademyView } from './components/PlayerAcademyView';
// import { CommunityView } from './components/CommunityView';
// import { PlayerEvolutionHubView } from './components/PlayerEvolutionHubView';
// import { ReportDashboard } from './components/ReportDashboard';
// import { EmailVerified } from './components/EmailVerified';

// import { ReportData, UserSession } from './types';

// import { playTacticalScan, playEvolutionHype } from './utils/audio';

// import { AnimatePresence, motion } from 'motion/react';

// function App() {

//   const [view, setView] = useState<
//     | 'landing'
//     | 'home'
//     | 'upload'
//     | 'report'
//     | 'pricing'
//     | 'evolution'
//     | 'lab'
//     | 'academy'
//     | 'community'
//     | 'auth'
//     | 'verified'
//   >('landing');

//   // Firebase email verification redirect detection
//   useEffect(() => {
//     const path = window.location.pathname;
//     const params = new URLSearchParams(window.location.search);

//     if (path === "/auth/verified" || params.get("mode") === "verifyEmail") {
//       setView("verified");
//     }
//   }, []);

//   const [session, setSession] = useState<UserSession | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [report, setReport] = useState<ReportData | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [xp, setXp] = useState(150);
//   const [level, setLevel] = useState('Academy Prospect');
//   const [streak] = useState(3);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setVideoFile(e.target.files[0]);
//       setError(null);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => e.preventDefault();

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];

//     if (file && file.type.startsWith('video/')) {
//       setVideoFile(file);
//       setError(null);
//     } else {
//       setError('Please upload a valid video file.');
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
//         body: formData
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to analyze video.');
//       }

//       const parsedReport =
//         typeof data.report === "string"
//           ? JSON.parse(data.report)
//           : data.report;

//       setReport(parsedReport);

//       setXp((prev) => {
//         const updated = Math.min(prev + 250, 1000);
//         if (updated >= 400) setLevel('Elite Youth');
//         return updated;
//       });

//       playEvolutionHype();
//       setView('report');

//     } catch (err: any) {
//       setError(err.message || "Unexpected error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-[#D1D1D1] font-sans flex flex-col">

//       {/* NAVBAR */}
//       <nav className="w-full border-b border-[#1A1A1A] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">

//           {/* LOGO */}
//           <button onClick={() => setView('landing')} className="flex items-center gap-2">
//             <Target className="w-5 h-5 text-amber-500" />
//             <span className="text-base uppercase font-bold text-white">
//               SCOUR BOY
//             </span>
//           </button>

//           {/* NAV LINKS (RESTORED) */}
//           <div className="flex items-center gap-5 text-sm uppercase">

//             <button onClick={() => setView('home')} className="text-gray-400 hover:text-white">
//               Dashboard
//             </button>

//             <button onClick={() => setView('evolution')} className="text-gray-400 hover:text-white flex items-center gap-1">
//               <History className="w-4 h-4" />
//               Evolution
//             </button>

//             <button onClick={() => setView('lab')} className="text-gray-400 hover:text-white flex items-center gap-1">
//               <BrainCircuit className="w-4 h-4" />
//               Lab
//             </button>

//             <button onClick={() => setView('academy')} className="text-gray-400 hover:text-white">
//               Academy
//             </button>

//             <button onClick={() => setView('community')} className="text-gray-400 hover:text-white">
//               Community
//             </button>

//             <button onClick={() => setView('pricing')} className="text-amber-500 flex items-center gap-1">
//               Pricing <Zap className="w-4 h-4" />
//             </button>

//             {/* USER */}
//             {session ? (
//               <div className="flex items-center gap-2 ml-2">
//                 <User className="w-4 h-4 text-cyan-500" />
//                 <span className="text-sm text-white">
//                   {session.email.split("@")[0]}
//                 </span>
//               </div>
//             ) : (
//               <button onClick={() => setView('auth')} className="text-gray-400">
//                 Login
//               </button>
//             )}

//             {/* CTA BUTTON */}
//             <button
//               onClick={() => {
//                 setReport(null);
//                 setVideoFile(null);
//                 setView('upload');
//               }}
//               className="text-sm uppercase font-bold text-amber-500 border border-amber-500/30 px-3 py-1"
//             >
//               Analyze Footage
//             </button>

//           </div>
//         </div>
//       </nav>

//       {/* CONTENT */}
//       <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={view}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//           >

//             {view === "landing" && (
//               <LandingView
//                 onGetStarted={() => setView('home')}
//                 onViewPricing={() => setView('pricing')}
//               />
//             )}

//             {view === "auth" && (
//               <AuthView
//                 onLogin={(s) => {
//                   setSession(s);
//                   setView('home');
//                 }}
//               />
//             )}

//             {view === "verified" && <EmailVerified />}

//             {view === "pricing" && (
//               <PricingView
//                 onUpgrade={(tier) => {
//                   if (session) {
//                     setSession({ ...session, subscription_tier: tier });
//                   }
//                   setView('home');
//                 }}
//               />
//             )}

//             {view === "home" && (
//               <HomeDashboard
//                 xp={xp}
//                 level={level}
//                 streak={streak}
//                 session={session}
//                 onNavigateToUpload={() => setView('upload')}
//                 onUpgrade={() => setView('pricing')}
//               />
//             )}

//             {view === "evolution" && (
//               <PlayerEvolutionHubView session={session} onUpgrade={() => setView('pricing')} />
//             )}

//             {view === "lab" && <TacticalInsightLabView />}

//             {view === "academy" && (
//               <PlayerAcademyView report={report} session={session} onUpgrade={() => setView('pricing')} />
//             )}

//             {view === "community" && (
//               <CommunityView report={report} session={session} onUpgrade={() => setView('pricing')} />
//             )}

//             {view === "report" && report && (
//               <ReportDashboard
//                 report={report}
//                 videoFile={videoFile}
//                 session={session}
//                 onUpgrade={() => setView('pricing')}
//               />
//             )}

//             {view === "upload" && (
//               <UploadView
//                 videoFile={videoFile}
//                 isUploading={isUploading}
//                 error={error}
//                 onFileChange={handleFileChange}
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//                 onRemoveFile={() => setVideoFile(null)}
//                 onAnalyze={handleAnalyze}
//               />
//             )}

//           </motion.div>
//         </AnimatePresence>

//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';

// import { Target, Zap, History, BrainCircuit, User } from 'lucide-react';

// import { UploadView } from './components/UploadView';
// import { HomeDashboard } from './components/HomeDashboard';
// import { LandingView } from './components/LandingView';
// import { PricingView } from './components/PricingView';
// import { AuthView } from './components/AuthView';
// import { TacticalInsightLabView } from './components/TacticalInsightLabView';
// import { PlayerAcademyView } from './components/PlayerAcademyView';
// import { CommunityView } from './components/CommunityView';
// import { PlayerEvolutionHubView } from './components/PlayerEvolutionHubView';
// import { ReportDashboard } from './components/ReportDashboard';
// import { EmailVerified } from './components/EmailVerified';

// import { PrivacyView } from './components/PrivacyView';
// import { TermsView } from './components/TermsView';

// import { ReportData, UserSession } from './types';

// import { playTacticalScan, playEvolutionHype } from './utils/audio';

// import { AnimatePresence, motion } from 'motion/react';

// function App() {

//   const [view, setView] = useState<
//     | 'landing'
//     | 'home'
//     | 'upload'
//     | 'report'
//     | 'pricing'
//     | 'evolution'
//     | 'lab'
//     | 'academy'
//     | 'community'
//     | 'auth'
//     | 'verified'
//     | 'privacy'
//     | 'terms'
//   >('landing');

//   useEffect(() => {
//     const path = window.location.pathname;
//     const params = new URLSearchParams(window.location.search);

//     if (path === "/auth/verified" || params.get("mode") === "verifyEmail") {
//       setView("verified");
//     }
//   }, []);

//   const [session, setSession] = useState<UserSession | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [report, setReport] = useState<ReportData | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [xp, setXp] = useState(150);
//   const [level, setLevel] = useState('Academy Prospect');
//   const [streak] = useState(3);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setVideoFile(e.target.files[0]);
//       setError(null);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => e.preventDefault();

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];

//     if (file && file.type.startsWith('video/')) {
//       setVideoFile(file);
//       setError(null);
//     } else {
//       setError('Please upload a valid video file.');
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
//         body: formData
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to analyze video.');
//       }

//       const parsedReport =
//         typeof data.report === "string"
//           ? JSON.parse(data.report)
//           : data.report;

//       setReport(parsedReport);

//       setXp((prev) => {
//         const updated = Math.min(prev + 250, 1000);
//         if (updated >= 400) setLevel('Elite Youth');
//         return updated;
//       });

//       playEvolutionHype();
//       setView('report');

//     } catch (err: any) {
//       setError(err.message || "Unexpected error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-[#D1D1D1] font-sans flex flex-col">

//       {/* NAVBAR */}
//       <nav className="w-full border-b border-[#1A1A1A] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">

//           <button onClick={() => setView('landing')} className="flex items-center gap-2">
//             <Target className="w-5 h-5 text-amber-500" />
//             <span className="text-base uppercase font-bold text-white">
//               SCOUR BOY
//             </span>
//           </button>

//           <div className="flex items-center gap-5 text-sm uppercase">

//             <button onClick={() => setView('home')} className="text-gray-400 hover:text-white">
//               Dashboard
//             </button>

//             <button onClick={() => setView('evolution')} className="text-gray-400 hover:text-white flex items-center gap-1">
//               <History className="w-4 h-4" />
//               Evolution
//             </button>

//             <button onClick={() => setView('lab')} className="text-gray-400 hover:text-white flex items-center gap-1">
//               <BrainCircuit className="w-4 h-4" />
//               Lab
//             </button>

//             <button onClick={() => setView('academy')} className="text-gray-400 hover:text-white">
//               Academy
//             </button>

//             <button onClick={() => setView('community')} className="text-gray-400 hover:text-white">
//               Community
//             </button>

//             <button onClick={() => setView('pricing')} className="text-amber-500 flex items-center gap-1">
//               Pricing <Zap className="w-4 h-4" />
//             </button>

//             {session ? (
//               <div className="flex items-center gap-2 ml-2">
//                 <User className="w-4 h-4 text-cyan-500" />
//                 <span className="text-sm text-white">
//                   {session.email.split("@")[0]}
//                 </span>
//               </div>
//             ) : (
//               <button onClick={() => setView('auth')} className="text-gray-400">
//                 Login
//               </button>
//             )}

//             <button
//               onClick={() => {
//                 setReport(null);
//                 setVideoFile(null);
//                 setView('upload');
//               }}
//               className="text-sm uppercase font-bold text-amber-500 border border-amber-500/30 px-3 py-1"
//             >
//               Analyze Footage
//             </button>

//           </div>
//         </div>
//       </nav>

//       {/* CONTENT */}
//       <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={view}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//           >

//             {view === "landing" && (
//               <LandingView
//                 onGetStarted={() => setView('home')}
//                 onViewPricing={() => setView('pricing')}
//               />
//             )}

//             {view === "auth" && (
//               <AuthView
//                 onLogin={(s) => {
//                   setSession(s);
//                   setView('home');
//                 }}
//               />
//             )}

//             {view === "verified" && <EmailVerified />}

//             {view === "pricing" && (
//               <PricingView
//                 onUpgrade={(tier) => {
//                   if (session) {
//                     setSession({ ...session, subscription_tier: tier });
//                   }
//                   setView('home');
//                 }}
//               />
//             )}

//             {view === "home" && (
//               <HomeDashboard
//                 xp={xp}
//                 level={level}
//                 streak={streak}
//                 session={session}
//                 onNavigateToUpload={() => setView('upload')}
//                 onUpgrade={() => setView('pricing')}
//               />
//             )}

//             {view === "evolution" && (
//               <PlayerEvolutionHubView session={session} onUpgrade={() => setView('pricing')} />
//             )}

//             {view === "lab" && <TacticalInsightLabView />}

//             {view === "academy" && (
//               <PlayerAcademyView report={report} session={session} onUpgrade={() => setView('pricing')} />
//             )}

//             {view === "community" && (
//               <CommunityView report={report} session={session} onUpgrade={() => setView('pricing')} />
//             )}

//             {view === "report" && report && (
//               <ReportDashboard
//                 report={report}
//                 videoFile={videoFile}
//                 session={session}
//                 onUpgrade={() => setView('pricing')}
//               />
//             )}

//             {view === "upload" && (
//               <UploadView
//                 videoFile={videoFile}
//                 isUploading={isUploading}
//                 error={error}
//                 onFileChange={handleFileChange}
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//                 onRemoveFile={() => setVideoFile(null)}
//                 onAnalyze={handleAnalyze}
//               />
//             )}

//             {/* ✅ PRIVACY PAGE */}
//             {view === "privacy" && (
//               <div className="text-white max-w-3xl mx-auto">
//                 <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
//                 <p className="text-gray-400 text-sm">
//                   Your data is securely stored and never shared with third parties...
//                 </p>
//               </div>
//             )}

//             {/* ✅ TERMS PAGE */}
//             {view === "terms" && (
//               <div className="text-white max-w-3xl mx-auto">
//                 <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
//                 <p className="text-gray-400 text-sm">
//                   By using this platform, you agree to our terms of service...
//                 </p>
//               </div>
//             )}

//           </motion.div>
//         </AnimatePresence>

//       </div>

//       {/* ── FOOTER ── */}
//       <footer
//         style={{
//           padding: '36px 40px',
//           borderTop: '1px solid rgba(255,255,255,0.055)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           flexWrap: 'wrap',
//           gap: 16,
//         }}
//       >
//         <div>
//           <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>
//             SCOUR <span style={{ color: '#F5A623' }}>BOY</span>
//           </span>
//         </div>

//         <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>
//           © 2026 ScourBoy · All rights reserved.
//         </p>

//         <div style={{ display: 'flex', gap: 22 }}>
//           {[
//             { label: 'Privacy', view: 'privacy' },
//             { label: 'Terms', view: 'terms' }
//           ].map((item) => (
//             <button
//               key={item.label}
//               onClick={() => setView(item.view)}
//               style={{
//                 fontSize: 12,
//                 color: 'rgba(255,255,255,0.28)',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer'
//               }}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </footer>

//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';

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
import { EmailVerified } from './components/EmailVerified';

import { PrivacyView } from './components/PrivacyView';
import { TermsView } from './components/TermsView';

import { ReportData, UserSession } from './types';

import { playTacticalScan, playEvolutionHype } from './utils/audio';

import { AnimatePresence, motion } from 'motion/react';

function App() {

  const [view, setView] = useState<
    | 'landing'
    | 'home'
    | 'upload'
    | 'report'
    | 'pricing'
    | 'evolution'
    | 'lab'
    | 'academy'
    | 'community'
    | 'auth'
    | 'verified'
    | 'privacy'
    | 'terms'
  >('landing');

  useEffect(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (path === "/auth/verified" || params.get("mode") === "verifyEmail") {
      setView("verified");
    }
  }, []);

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
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze video.');
      }

      const parsedReport =
        typeof data.report === "string"
          ? JSON.parse(data.report)
          : data.report;

      setReport(parsedReport);

      setXp((prev) => {
        const updated = Math.min(prev + 250, 1000);
        if (updated >= 400) setLevel('Elite Youth');
        return updated;
      });

      playEvolutionHype();
      setView('report');

    } catch (err: any) {
      setError(err.message || "Unexpected error");
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
            <span className="text-base uppercase font-bold text-white">
              SCOUR BOY
            </span>
          </button>

          <div className="flex items-center gap-5 text-sm uppercase">

            <button onClick={() => setView('home')} className="text-gray-400 hover:text-white">
              Dashboard
            </button>

            <button onClick={() => setView('evolution')} className="text-gray-400 hover:text-white flex items-center gap-1">
              <History className="w-4 h-4" />
              Evolution
            </button>

            <button onClick={() => setView('lab')} className="text-gray-400 hover:text-white flex items-center gap-1">
              <BrainCircuit className="w-4 h-4" />
              Lab
            </button>

            <button onClick={() => setView('academy')} className="text-gray-400 hover:text-white">
              Academy
            </button>

            <button onClick={() => setView('community')} className="text-gray-400 hover:text-white">
              Community
            </button>

            <button onClick={() => setView('pricing')} className="text-amber-500 flex items-center gap-1">
              Pricing <Zap className="w-4 h-4" />
            </button>

            {session ? (
              <div className="flex items-center gap-2 ml-2">
                <User className="w-4 h-4 text-cyan-500" />
                <span className="text-sm text-white">
                  {session.email.split("@")[0]}
                </span>
              </div>
            ) : (
              <button onClick={() => setView('auth')} className="text-gray-400">
                Login
              </button>
            )}

            <button
              onClick={() => {
                setReport(null);
                setVideoFile(null);
                setView('upload');
              }}
              className="text-sm uppercase font-bold text-amber-500 border border-amber-500/30 px-3 py-1"
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

            {view === "landing" && (
              <LandingView
                setView={setView}
                onGetStarted={() => setView('home')}
                onViewPricing={() => setView('pricing')}
              />
            )}

            {view === "auth" && (
              <AuthView
                onLogin={(s) => {
                  setSession(s);
                  setView('home');
                }}
              />
            )}

            {view === "verified" && <EmailVerified />}

            {view === "pricing" && (
              <PricingView
                onUpgrade={(tier) => {
                  if (session) {
                    setSession({ ...session, subscription_tier: tier });
                  }
                  setView('home');
                }}
              />
            )}

            {view === "home" && (
              <HomeDashboard
                xp={xp}
                level={level}
                streak={streak}
                session={session}
                onNavigateToUpload={() => setView('upload')}
                onUpgrade={() => setView('pricing')}
              />
            )}

            {view === "evolution" && (
              <PlayerEvolutionHubView session={session} onUpgrade={() => setView('pricing')} />
            )}

            {view === "lab" && <TacticalInsightLabView />}

            {view === "academy" && (
              <PlayerAcademyView report={report} session={session} onUpgrade={() => setView('pricing')} />
            )}

            {view === "community" && (
              <CommunityView report={report} session={session} onUpgrade={() => setView('pricing')} />
            )}

            {view === "report" && report && (
              <ReportDashboard
                report={report}
                videoFile={videoFile}
                session={session}
                onUpgrade={() => setView('pricing')}
              />
            )}

            {view === "upload" && (
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
            )}

            {view === "privacy" && <PrivacyView />}
            {view === "terms" && <TermsView />}

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;
