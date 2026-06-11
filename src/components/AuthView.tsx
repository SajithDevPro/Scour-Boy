import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target } from 'lucide-react';
import { UserSession } from '../types';

interface AuthViewProps {
  onLogin: (session: UserSession) => void;
}

export function AuthView({ onLogin }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup
    onLogin({
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email || 'player@elitescout.ai',
      subscription_tier: 'free'
    });
  };

  return (
    <div className="w-full max-w-md mx-auto pt-24 pb-24 px-4 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#050505] border border-[#1A1A1A] p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Target className="w-6 h-6 text-cyan-500" />
          <span className="text-xl font-bold font-serif italic tracking-wider">Elite Scout.</span>
        </div>

        <h2 className="text-2xl font-bold font-sans text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-xs text-gray-500 text-center mb-8 font-sans">
          {isLogin ? 'Enter your details to access your intelligence dashboard.' : 'Start your elite football development journey.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#222] p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
              placeholder="player@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Password</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#222] p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-cyan-500 text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-cyan-400 transition-colors mt-4"
          >
            {isLogin ? 'Access Dashboard' : 'Create Identity'}
          </button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-white transition-colors"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
