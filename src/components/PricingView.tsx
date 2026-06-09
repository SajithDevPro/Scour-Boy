// import React from 'react';
// import { Check, X, Shield, Lock, Zap } from 'lucide-react';

// interface PricingViewProps {
//   onUpgrade: () => void;
// }

// export function PricingView({ onUpgrade }: PricingViewProps) {
//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 pt-12 pb-24">
//       <div className="text-center mb-16">
//         <h1 className="text-4xl md:text-5xl font-sans font-bold text-white tracking-tight mb-4">
//           Choose your <span className="font-serif italic text-amber-500">evolution path.</span>
//         </h1>
//         <p className="text-gray-400 font-sans max-w-xl mx-auto">
//           From basic tactical scanning to elite academy-level coaching. Access the intelligence level you need to level up.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
        
//         {/* Tier: Basic */}
//         <div className="bg-[#050505] border border-[#1A1A1A] p-8 flex flex-col">
//            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Free Core</h3>
//            <p className="text-3xl font-serif text-white mb-6">$0<span className="text-sm text-gray-500 font-sans not-italic">/mo</span></p>
//            <p className="text-xs text-gray-400 mb-8 pb-8 border-b border-[#1A1A1A]">Basic tactical identity scanning and static reports.</p>
           
//            <ul className="space-y-4 mb-8 flex-1">
//              <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-green-500 shrink-0" /> 1 Match Analysis/mo</li>
//              <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-green-500 shrink-0" /> Identity Archetype</li>
//              <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-green-500 shrink-0" /> Radar Chart Output</li>
//              <li className="flex gap-3 text-sm text-gray-600 font-sans"><X className="w-4 h-4 shrink-0" /> <span className="line-through">Progression Tracking</span></li>
//              <li className="flex gap-3 text-sm text-gray-600 font-sans"><X className="w-4 h-4 shrink-0" /> <span className="line-through">Actionable Growth Plan</span></li>
//            </ul>

//            <button onClick={onUpgrade} className="w-full py-3 bg-[#0A0A0A] border border-[#222] text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
//              Current Plan
//            </button>
//         </div>

//         {/* Tier: Pro */}
//         <div className="bg-[#0A0A0A] border border-amber-500/50 p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
//            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] uppercase font-bold tracking-widest px-4 py-1">
//              Recommended
//            </div>
//            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-2"><Zap className="w-4 h-4" /> Pro Analyst</h3>
//            <p className="text-4xl font-serif text-white mb-6">$14<span className="text-sm text-gray-500 font-sans not-italic">/mo</span></p>
//            <p className="text-xs text-gray-400 mb-8 pb-8 border-b border-[#222]">Full intelligence access for ambitious players aiming for the academy.</p>
           
//            <ul className="space-y-4 mb-8 flex-1">
//              <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> 5 Match Analyses/mo</li>
//              <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> Full Tactical Output</li>
//              <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> 3-Step Growth Roadmap</li>
//              <li className="flex gap-3 text-sm text-white font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> Dashboard Progression (XP)</li>
//              <li className="flex gap-3 text-sm text-gray-600 font-sans"><X className="w-4 h-4 shrink-0" /> <span className="line-through">1-on-1 AI Tactical Chat</span></li>
//            </ul>

//            <button onClick={onUpgrade} className="w-full py-4 bg-amber-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors">
//              Upgrade to Pro
//            </button>
//         </div>

//         {/* Tier: Elite */}
//         <div className="bg-[#050505] border border-[#1A1A1A] p-8 flex flex-col relative overflow-hidden">
//            <Lock className="absolute -right-4 -bottom-4 w-32 h-32 text-gray-800/10 pointer-events-none" />
//            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-gray-400" /> Elite Academy</h3>
//            <p className="text-3xl font-serif text-gray-300 mb-6">$49<span className="text-sm text-gray-600 font-sans not-italic">/mo</span></p>
//            <p className="text-xs text-gray-500 mb-8 pb-8 border-b border-[#1A1A1A]">Professional scout-level data and limitless interaction.</p>
           
//            <ul className="space-y-4 mb-8 flex-1 relative z-10">
//              <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-gray-500 shrink-0" /> Unlimited Analyses</li>
//              <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-gray-500 shrink-0" /> Prioritized Processing</li>
//              <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-gray-500 shrink-0" /> Detailed Event Mapping</li>
//              <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> Interactive AI Coach Chat</li>
//              <li className="flex gap-3 text-sm text-gray-300 font-sans"><Check className="w-4 h-4 text-amber-500 shrink-0" /> Opponent Team Scouting</li>
//            </ul>

//            <button onClick={onUpgrade} className="w-full py-3 bg-[#0A0A0A] border border-[#222] text-gray-300 text-xs font-bold uppercase tracking-widest hover:border-gray-500 transition-colors">
//              Apply for Elite
//            </button>
//         </div>

//       </div>
//     </div>
//   );
// }

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Lock, Zap, Crown, ArrowRight, Sparkles } from 'lucide-react';

interface PricingViewProps {
  onUpgrade: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const tiers = [
  {
    name: "Free Core",
    price: "$0",
    period: "/mo",
    description: "Basic tactical identity scanning and static reports.",
    icon: null,
    color: "gray",
    features: [
      { text: "1 Match Analysis/mo", included: true },
      { text: "Identity Archetype", included: true },
      { text: "Radar Chart Output", included: true },
      { text: "Progression Tracking", included: false },
      { text: "Actionable Growth Plan", included: false }
    ],
    cta: "Current Plan",
    highlighted: false
  },
  {
    name: "Pro Analyst",
    price: "$14",
    period: "/mo",
    description: "Full intelligence access for ambitious players aiming for the academy.",
    icon: Zap,
    color: "amber",
    features: [
      { text: "5 Match Analyses/mo", included: true },
      { text: "Full Tactical Output", included: true },
      { text: "3-Step Growth Roadmap", included: true },
      { text: "Dashboard Progression (XP)", included: true },
      { text: "1-on-1 AI Tactical Chat", included: false }
    ],
    cta: "Upgrade to Pro",
    highlighted: true
  },
  {
    name: "Elite Academy",
    price: "$49",
    period: "/mo",
    description: "Professional scout-level data and limitless interaction.",
    icon: Shield,
    color: "cyan",
    features: [
      { text: "Unlimited Analyses", included: true },
      { text: "Prioritized Processing", included: true },
      { text: "Detailed Event Mapping", included: true },
      { text: "Interactive AI Coach Chat", included: true },
      { text: "Opponent Team Scouting", included: true }
    ],
    cta: "Apply for Elite",
    highlighted: false
  }
];

export function PricingView({ onUpgrade }: PricingViewProps) {
  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto px-4 pt-16 pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center mb-20 relative">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
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
        
        <motion.span 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm"
          whileHover={{ borderColor: "rgba(245, 158, 11, 0.3)" }}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs uppercase tracking-widest text-gray-300 font-semibold">Choose Your Evolution Path</span>
        </motion.span>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
          Invest in your
          <br />
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            football future.
          </span>
        </h1>
        
        <p className="text-lg text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
          From basic tactical scanning to elite academy-level coaching. Access the intelligence level you need to level up your game.
        </p>
      </motion.div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {tiers.map((tier, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={`relative flex flex-col p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 group ${
              tier.highlighted
                ? 'bg-gradient-to-br from-amber-500/10 via-white/5 to-white/[0.02] border-2 border-amber-500/50 shadow-[0_0_60px_rgba(245,158,11,0.15)] md:-translate-y-4'
                : 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20'
            }`}
          >
            {/* Recommended Badge */}
            {tier.highlighted && (
              <motion.div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] uppercase font-bold tracking-widest px-6 py-2 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown className="w-3 h-3" />
                Most Popular
              </motion.div>
            )}

            {/* Tier Icon */}
            {tier.icon && (
              <motion.div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  tier.color === 'amber' ? 'bg-amber-500/10' : 'bg-cyan-500/10'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <tier.icon className={`w-6 h-6 ${
                  tier.color === 'amber' ? 'text-amber-400' : 'text-cyan-400'
                }`} />
              </motion.div>
            )}

            {/* Tier Name & Price */}
            <div className="mb-6">
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-3 ${
                tier.highlighted ? 'text-amber-400' : 'text-gray-400'
              }`}>
                {tier.name}
              </h3>
              
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-serif text-white font-bold">{tier.price}</span>
                <span className="text-sm text-gray-500 font-sans">{tier.period}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-8 pb-8 border-b border-white/10 leading-relaxed">
              {tier.description}
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map((feature, fIdx) => (
                <motion.li 
                  key={fIdx}
                  className={`flex gap-3 text-sm font-sans ${
                    feature.included ? 'text-gray-300' : 'text-gray-600'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (fIdx * 0.1) }}
                >
                  {feature.included ? (
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                    >
                      <Check className={`w-4 h-4 shrink-0 ${
                        tier.highlighted ? 'text-amber-400' : 'text-green-400'
                      }`} />
                    </motion.div>
                  ) : (
                    <X className="w-4 h-4 shrink-0 text-gray-700" />
                  )}
                  <span className={feature.included ? '' : 'line-through'}>
                    {feature.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.button
              onClick={onUpgrade}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                tier.highlighted
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {tier.cta}
              {!tier.highlighted && <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />}
            </motion.button>

            {/* Decorative Elements for Elite Tier */}
            {tier.name === "Elite Academy" && (
              <motion.div 
                className="absolute -right-8 -bottom-8 text-white/5 pointer-events-none"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Lock className="w-40 h-40" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div 
        variants={itemVariants}
        className="mt-24 text-center"
      >
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-8">Trusted by 10,000+ players worldwide</p>
        <div className="flex items-center justify-center gap-8 opacity-50">
          {['Premier League Academies', 'MLS Next', 'UEFA Licensed Coaches'].map((partner, idx) => (
            <motion.span 
              key={idx}
              className="text-sm text-gray-400 font-semibold"
              whileHover={{ opacity: 1, scale: 1.05 }}
            >
              {partner}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
