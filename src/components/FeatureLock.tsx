import React from 'react';
import { Lock, Zap, Shield } from 'lucide-react';

interface FeatureLockProps {
  title: string;
  description: string;
  requiredTier: 'pro' | 'elite';
  onUpgrade: () => void;
}

export function FeatureLock({ title, description, requiredTier, onUpgrade }: FeatureLockProps) {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center border border-[#1A1A1A]">
      <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center mb-4 border border-[#333]">
        <Lock className="w-8 h-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-gray-400 mb-6 max-w-sm">{description}</p>
      
      <button 
        onClick={onUpgrade}
        className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
          requiredTier === 'pro' 
            ? 'bg-cyan-500 text-black hover:bg-cyan-400' 
            : 'bg-amber-500 text-black hover:bg-amber-400'
        }`}
      >
        {requiredTier === 'pro' ? <Zap className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
        Upgrade to {requiredTier === 'pro' ? 'Pro' : 'Elite'} to Unlock
      </button>
    </div>
  );
}
