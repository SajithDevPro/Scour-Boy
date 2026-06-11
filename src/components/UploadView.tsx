import React, { useState, useEffect } from 'react';
import { Upload, FileVideo, Activity, Target, Brain, Loader2, AlertCircle, ScanLine, Radar, ActivitySquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const loadingMessages = [
    "AI Scanning Phase Initiated...",
    "Extracting Tactical Intelligence...",
    "Building Player DNA Profile...",
    "Finalizing Growth Roadmap..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUploading) {
      setLoadingPhase(0);
      interval = setInterval(() => {
        setLoadingPhase(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isUploading]);
  return (
    <div className="max-w-xl mx-auto w-full">
      <AnimatePresence mode="wait">
        {!isUploading ? (
          <motion.div 
            key="upload-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="w-full"
          >
            {/* Upload Card */}
            <div 
              className={`relative group overflow-hidden border transition-all duration-300 ease-in-out ${
                videoFile 
                  ? 'border-amber-500/50 bg-[#080808]' 
                  : 'border-[#1A1A1A] bg-[#080808] hover:border-[#333] hover:bg-[#0A0A0A]'
              }`}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <div className="p-12 text-center relative z-10 flex flex-col items-center justify-center min-h-[320px]">
                {videoFile ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-[#0F0F0F] border border-[#1A1A1A] rounded-full">
                      <FileVideo className="w-10 h-10 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-200 truncate max-w-[200px] md:max-w-xs mb-1">
                        {videoFile.name}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    
                    <button 
                      onClick={onRemoveFile}
                      className="text-[10px] text-gray-500 hover:text-amber-500 transition-colors uppercase tracking-[0.2em] font-bold mt-6"
                    >
                      Remove & Select Another
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#0F0F0F] border border-[#1A1A1A] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Upload className="w-8 h-8 text-amber-500" />
                    </div>
                    <div>
                       <p className="text-lg font-medium text-neutral-300 mb-2">Drag & Drop Protocol</p>
                       <p className="text-sm text-neutral-500">Supported formats: MP4, MOV, WEBM</p>
                    </div>
                    
                    <label className="cursor-pointer mt-6 inline-flex items-center justify-center px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-[#1A1A1A] bg-[#0F0F0F] text-amber-500 hover:bg-[#1A1A1A] transition-colors">
                      Initialize Upload
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={onFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 flex items-start space-x-3 text-red-500 bg-[#0F0F0F] p-4 border border-[#1A1A1A]"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                <p className="text-sm font-sans">{error}</p>
              </motion.div>
            )}

            {/* Action Button */}
            {videoFile && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col items-center"
              >
                <button
                  onClick={onAnalyze}
                  className="relative w-full overflow-hidden group border border-[#1A1A1A] bg-[#080808] hover:bg-[#0F0F0F] hover:border-amber-500/50 transition-all py-4 px-8"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center justify-center space-x-3 relative z-10 text-[10px] font-bold uppercase tracking-widest text-amber-500">
                    <Brain className="w-5 h-5" />
                    <span>Engage AI Scouting Protocol</span>
                  </div>
                  <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="cinematic-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center justify-center py-20 relative"
          >
             {/* Tactical pitch overlay background */}
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                 <div className="w-[400px] h-[600px] border-2 border-white rounded-[100px] relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                 </div>
             </div>

             <div className="relative">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                 className="absolute -inset-8 border border-amber-500/20 rounded-full border-dashed"
               ></motion.div>
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                 className="absolute -inset-12 border border-amber-500/10 rounded-full border-t-amber-500/40"
               ></motion.div>
               
               <div className="p-8 bg-[#0F0F0F] border border-[#1A1A1A] rounded-full relative z-10 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.1)]">
                 <motion.div 
                    animate={{ y: ["-100%", "100%"] }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent h-1/2 w-full"
                 ></motion.div>
                 <ScanLine className="w-12 h-12 text-amber-500 relative z-20" />
               </div>
             </div>

             <div className="mt-16 flex flex-col items-center relative z-10 text-center">
                 <motion.h3 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   key={loadingPhase}
                   className="text-amber-500 font-serif italic text-xl mb-4"
                 >
                   {loadingMessages[loadingPhase]}
                 </motion.h3>
                 
                 <div className="w-48 h-1 bg-[#1A1A1A] mt-2 relative overflow-hidden">
                   <motion.div 
                     className="absolute top-0 left-0 h-full bg-amber-500 w-full"
                     initial={{ x: "-100%" }}
                     animate={{ x: "100%" }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                   />
                 </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
