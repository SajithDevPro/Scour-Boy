// import React, { useState, useEffect } from 'react';
// import { Upload, FileVideo, Activity, Target, Brain, Loader2, AlertCircle, ScanLine, Radar, ActivitySquare } from 'lucide-react';
// import { motion, AnimatePresence } from 'motion/react';

// interface UploadViewProps {
//   videoFile: File | null;
//   isUploading: boolean;
//   error: string | null;
//   onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onDrop: (e: React.DragEvent) => void;
//   onDragOver: (e: React.DragEvent) => void;
//   onRemoveFile: () => void;
//   onAnalyze: () => void;
// }

// export function UploadView({
//   videoFile,
//   isUploading,
//   error,
//   onFileChange,
//   onDrop,
//   onDragOver,
//   onRemoveFile,
//   onAnalyze
// }: UploadViewProps) {
  
//   const [loadingPhase, setLoadingPhase] = useState(0);
//   const loadingMessages = [
//     "AI Scanning Phase Initiated...",
//     "Extracting Tactical Intelligence...",
//     "Building Player DNA Profile...",
//     "Finalizing Growth Roadmap..."
//   ];

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isUploading) {
//       setLoadingPhase(0);
//       interval = setInterval(() => {
//         setLoadingPhase(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
//       }, 3000);
//     }
//     return () => clearInterval(interval);
//   }, [isUploading]);
//   return (
//     <div className="max-w-xl mx-auto w-full">
//       <AnimatePresence mode="wait">
//         {!isUploading ? (
//           <motion.div 
//             key="upload-form"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
//             className="w-full"
//           >
//             {/* Upload Card */}
//             <div 
//               className={`relative group overflow-hidden border transition-all duration-300 ease-in-out ${
//                 videoFile 
//                   ? 'border-amber-500/50 bg-[#080808]' 
//                   : 'border-[#1A1A1A] bg-[#080808] hover:border-[#333] hover:bg-[#0A0A0A]'
//               }`}
//               onDragOver={onDragOver}
//               onDrop={onDrop}
//             >
//               <div className="p-12 text-center relative z-10 flex flex-col items-center justify-center min-h-[320px]">
//                 {videoFile ? (
//                   <div className="flex flex-col items-center space-y-4">
//                     <div className="p-4 bg-[#0F0F0F] border border-[#1A1A1A] rounded-full">
//                       <FileVideo className="w-10 h-10 text-amber-500" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-medium text-neutral-200 truncate max-w-[200px] md:max-w-xs mb-1">
//                         {videoFile.name}
//                       </h3>
//                       <p className="text-sm text-neutral-500">
//                         {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
//                       </p>
//                     </div>
                    
//                     <button 
//                       onClick={onRemoveFile}
//                       className="text-[10px] text-gray-500 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] font-bold mt-6"
//                     >
//                       Remove & Select Another
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center space-y-4">
//                     <div className="w-16 h-16 rounded-full bg-[#0F0F0F] border border-[#1A1A1A] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
//                       <Upload className="w-8 h-8 text-amber-500" />
//                     </div>
//                     <div>
//                        <p className="text-lg font-medium text-neutral-300 mb-2">Drag & Drop Protocol</p>
//                        <p className="text-sm text-neutral-500">Supported formats: MP4, MOV, WEBM</p>
//                     </div>
                    
//                     <label className="cursor-pointer mt-6 inline-flex items-center justify-center px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-[#1A1A1A] bg-[#0F0F0F] text-amber-500 hover:bg-[#1A1A1A] transition-colors">
//                       Initialize Upload
//                       <input 
//                         type="file" 
//                         accept="video/*" 
//                         className="hidden" 
//                         onChange={onFileChange}
//                       />
//                     </label>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 className="mt-6 flex items-start space-x-3 text-red-500 bg-[#0F0F0F] p-4 border border-[#1A1A1A]"
//               >
//                 <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
//                 <p className="text-sm font-sans">{error}</p>
//               </motion.div>
//             )}

//             {/* Action Button */}
//             {videoFile && (
//               <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-8 flex flex-col items-center"
//               >
//                 <button
//                   onClick={onAnalyze}
//                   className="relative w-full overflow-hidden group border border-[#1A1A1A] bg-[#080808] hover:bg-[#0F0F0F] hover:border-amber-500/50 transition-all py-4 px-8"
//                 >
//                   <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                   <div className="flex items-center justify-center space-x-3 relative z-10 text-[10px] font-bold uppercase tracking-widest text-amber-500">
//                     <Brain className="w-5 h-5" />
//                     <span>Engage AI Scouting Protocol</span>
//                   </div>
//                   <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </button>
//               </motion.div>
//             )}
//           </motion.div>
//         ) : (
//           <motion.div
//             key="cinematic-loader"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="w-full flex flex-col items-center justify-center py-20 relative"
//           >
//              {/* Tactical pitch overlay background */}
//              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
//                  <div className="w-[400px] h-[600px] border-2 border-white rounded-[100px] relative">
//                     <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2"></div>
//                     <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//                  </div>
//              </div>

//              <div className="relative">
//                <motion.div 
//                  animate={{ rotate: 360 }}
//                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
//                  className="absolute -inset-8 border border-amber-500/20 rounded-full border-dashed"
//                ></motion.div>
//                <motion.div 
//                  animate={{ rotate: -360 }}
//                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
//                  className="absolute -inset-12 border border-amber-500/10 rounded-full border-t-amber-500/40"
//                ></motion.div>
               
//                <div className="p-8 bg-[#0F0F0F] border border-[#1A1A1A] rounded-full relative z-10 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.1)]">
//                  <motion.div 
//                     animate={{ y: ["-100%", "100%"] }} 
//                     transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
//                     className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent h-1/2 w-full"
//                  ></motion.div>
//                  <ScanLine className="w-12 h-12 text-amber-500 relative z-20" />
//                </div>
//              </div>

//              <div className="mt-16 flex flex-col items-center relative z-10 text-center">
//                  <motion.h3 
//                    initial={{ opacity: 0, y: 10 }}
//                    animate={{ opacity: 1, y: 0 }}
//                    key={loadingPhase}
//                    className="text-amber-500 font-serif italic text-xl mb-4"
//                  >
//                    {loadingMessages[loadingPhase]}
//                  </motion.h3>
                 
//                  <div className="w-48 h-1 bg-[#1A1A1A] mt-2 relative overflow-hidden">
//                    <motion.div 
//                      className="absolute top-0 left-0 h-full bg-amber-500 w-full"
//                      initial={{ x: "-100%" }}
//                      animate={{ x: "100%" }}
//                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//                    />
//                  </div>
//              </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileVideo, AlertCircle, ScanLine, Brain, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface UploadViewProps {
  videoFile: File | null;
  isUploading: boolean;
  error: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onRemoveFile: () => void;
  onAnalyze: () => void;
}

const loadingMessages = [
  "Initializing Neural Network...",
  "Extracting Biomechanical Data...",
  "Analyzing Tactical Patterns...",
  "Generating Player DNA Profile...",
  "Finalizing Growth Roadmap..."
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function UploadView({
  videoFile,
  isUploading,
  error,
  onFileChange,
  onDrop,
  onDragOver,
  onRemoveFile,
  onAnalyze
}: UploadViewProps) {
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUploading) {
      setLoadingPhase(0);
      interval = setInterval(() => {
        setLoadingPhase(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto w-full px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {!isUploading ? (
          <motion.div
            key="upload-form"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            className="w-full"
          >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="text-center mb-12 relative">
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase tracking-widest text-gray-300 font-semibold">AI Scouting Engine v2.0</span>
              </span>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                Upload. Analyze.
                <br />
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Evolve.
                </span>
              </h1>
              
              <p className="text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
                Submit match footage to the intelligence grid. Receive an academy-level tactical breakdown of your biomechanics and decision-making patterns.
              </p>
            </motion.div>

            {/* Upload Card */}
            <motion.div variants={itemVariants}>
              <div
                className={`relative group overflow-hidden border-2 transition-all duration-500 ease-in-out rounded-2xl backdrop-blur-sm ${
                  isDragging
                    ? 'border-amber-500 bg-amber-500/10 scale-[1.02]'
                    : videoFile
                    ? 'border-amber-500/50 bg-gradient-to-br from-white/5 to-white/[0.02]'
                    : 'border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-white/20'
                }`}
                onDragOver={onDragOver}
                onDrop={(e) => {
                  onDrop(e);
                  setIsDragging(false);
                }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                {/* Animated border gradient */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.1), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="p-12 md:p-16 text-center relative z-10 flex flex-col items-center justify-center min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {videoFile ? (
                      <motion.div
                        key="file-selected"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center space-y-6"
                      >
                        <motion.div 
                          className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-2xl relative"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FileVideo className="w-12 h-12 text-amber-400" />
                          <motion.div 
                            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-black" />
                          </motion.div>
                        </motion.div>
                        
                        <div>
                          <h3 className="text-xl font-medium text-white mb-2 truncate max-w-[300px]">
                            {videoFile.name}
                          </h3>
                          <p className="text-sm text-gray-400 font-mono">
                            {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        
                        <motion.button
                          onClick={onRemoveFile}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs text-gray-500 hover:text-amber-400 transition-colors uppercase tracking-widest font-bold mt-4 flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:border-amber-500/30"
                        >
                          Remove & Select Another
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload-prompt"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center space-y-6"
                      >
                        <motion.div 
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-500/30 transition-all duration-500 shadow-lg"
                          animate={{
                            y: [0, -10, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Upload className="w-10 h-10 text-amber-400" />
                        </motion.div>
                        
                        <div>
                          <p className="text-xl font-medium text-white mb-2">Drag & Drop Protocol</p>
                          <p className="text-sm text-gray-400">Supported formats: MP4, MOV, WEBM (Max 500MB)</p>
                        </div>
                        
                        <label className="cursor-pointer mt-4 inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300 rounded-lg group/btn shadow-lg">
                          Initialize Upload
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={onFileChange}
                          />
                          <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex items-start space-x-3 text-red-400 bg-red-500/5 border border-red-500/20 p-4 rounded-lg backdrop-blur-sm"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-sans">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              <AnimatePresence>
                {videoFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8 flex flex-col items-center"
                  >
                    <motion.button
                      onClick={onAnalyze}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(245, 158, 11, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-600 text-black py-5 px-8 rounded-xl shadow-lg shadow-amber-500/20"
                    >
                      <div className="flex items-center justify-center space-x-3 relative z-10 text-xs font-bold uppercase tracking-widest">
                        <Brain className="w-5 h-5" />
                        <span>Engage AI Scouting Protocol</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.button>
                    
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      <ShieldCheck className="w-3 h-3 text-green-400" />
                      <span>Secure processing • Results in ~2 minutes</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="cinematic-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center py-20 relative"
          >
            {/* Tactical pitch overlay background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <motion.div 
                className="w-[400px] h-[600px] border-2 border-white rounded-[100px] relative"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </motion.div>
            </div>

            {/* Animated rings */}
            <div className="relative mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute -inset-12 border-2 border-amber-500/20 rounded-full border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute -inset-20 border border-amber-500/10 rounded-full border-t-amber-500/40"
              />
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute -inset-28 border border-cyan-500/5 rounded-full border-b-cyan-500/20"
              />
              
              <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-full relative z-10 overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.2)] backdrop-blur-sm">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent h-1/2 w-full"
                />
                <ScanLine className="w-16 h-16 text-amber-400 relative z-20" />
              </div>
            </div>

            {/* Loading text */}
            <div className="mt-12 flex flex-col items-center relative z-10 text-center max-w-md">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={loadingPhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-amber-400 font-serif italic text-2xl mb-6"
                >
                  {loadingMessages[loadingPhase]}
                </motion.h3>
              </AnimatePresence>
              
              {/* Progress bar */}
              <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((loadingPhase + 1) / loadingMessages.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 uppercase tracking-widest">
                Processing Phase {loadingPhase + 1} of {loadingMessages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}