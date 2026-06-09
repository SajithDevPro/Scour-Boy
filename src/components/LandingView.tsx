// import React from 'react';
// import { Play, TrendingUp, Cpu, Shield, ArrowRight } from 'lucide-react';

// interface LandingViewProps {
//   onGetStarted: () => void;
//   onViewPricing: () => void;
// }

// export function LandingView({ onGetStarted, onViewPricing }: LandingViewProps) {
//   return (
//     <div className="w-full flex flex-col pt-8 md:pt-16">
//       <div className="text-center max-w-4xl mx-auto px-4">
//         <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
//           <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
//           <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Elite Scout Engine Live</span>
//         </div>
//         <h1 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight leading-[1.1] mb-6">
//           Turn your footage into <br/>
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 italic font-serif">professional intelligence.</span>
//         </h1>
//         <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
//           The ultimate platform for player development. AI-powered scanning, elite academy tactical feedback, and a structured growth roadmap to evolve your game.
//         </p>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
//           <button 
//             onClick={onGetStarted}
//             className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
//           >
//             Enter The Dashboard <ArrowRight className="w-4 h-4" />
//           </button>
//           <button 
//             onClick={onViewPricing}
//             className="w-full sm:w-auto px-8 py-4 bg-[#0A0A0A] border border-[#222] text-white font-bold uppercase tracking-widest text-xs hover:border-amber-500/50 transition-colors"
//           >
//             View Pricing Tiers
//           </button>
//         </div>
//       </div>

//       <div className="relative max-w-6xl mx-auto w-full px-4 mb-32">
//         <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>
//         <div className="aspect-video w-full bg-[#050505] border-y border-[#1A1A1A] md:border md:rounded-2xl flex items-center justify-center overflow-hidden relative group">
//            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale mix-blend-overlay"></div>
//            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
           
//            {/* Fake UI Overlay for hero visual */}
//            <div className="absolute left-6 top-6 bottom-6 w-1/4 border-r border-amber-500/20 hidden md:flex flex-col gap-4">
//               <div className="h-4 w-1/2 bg-amber-500/20 rounded"></div>
//               <div className="h-4 w-3/4 bg-gray-500/20 rounded"></div>
//               <div className="h-4 w-2/3 bg-gray-500/20 rounded"></div>
//               <div className="mt-auto h-32 w-full border border-amber-500/20 bg-amber-500/5 backdrop-blur"></div>
//            </div>
           
//            <div className="z-10 flex flex-col items-center">
//              <div className="w-20 h-20 rounded-full border border-amber-500/50 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-center cursor-not-allowed group-hover:scale-110 transition-transform shadow-[0_0_50px_rgba(245,158,11,0.2)]">
//                 <Play className="w-8 h-8 text-amber-500 ml-1" />
//              </div>
//              <span className="text-[10px] text-amber-500 font-bold tracking-widest mt-6 uppercase">Play Concept Demo</span>
//            </div>

//            {/* Scanning line effect */}
//            <div className="absolute top-0 left-0 right-0 h-px bg-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-scan"></div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
//          <div className="bg-[#080808] border border-[#1A1A1A] p-8 flex flex-col">
//             <Cpu className="w-8 h-8 text-amber-500 mb-6" />
//             <h3 className="text-xl font-serif italic text-white mb-3">AI Tactical Engine</h3>
//             <p className="text-gray-400 font-sans leading-relaxed text-sm">
//               We process your footage simulating Hudl/Wyscout analytical models to extract raw performance data, biomechanical strengths, and hidden flaws.
//             </p>
//          </div>
//          <div className="bg-[#080808] border border-[#1A1A1A] p-8 flex flex-col">
//             <Shield className="w-8 h-8 text-amber-500 mb-6" />
//             <h3 className="text-xl font-serif italic text-white mb-3">Player DNA Profile</h3>
//             <p className="text-gray-400 font-sans leading-relaxed text-sm">
//               Discover your true archetype. Uncover exactly what role you fit best, your tactical risk profile, and an AI-matched professional comparison.
//             </p>
//          </div>
//          <div className="bg-[#080808] border border-[#1A1A1A] p-8 flex flex-col">
//             <TrendingUp className="w-8 h-8 text-amber-500 mb-6" />
//             <h3 className="text-xl font-serif italic text-white mb-3">Growth Roadmap</h3>
//             <p className="text-gray-400 font-sans leading-relaxed text-sm">
//               Stop guessing. Get a prioritized 3-step action plan with specific drills and match scenarios tailored precisely to your weaknesses.
//             </p>
//          </div>
//       </div>
      
//       <div className="py-20 bg-[#0A0A0A] border-t border-[#1A1A1A]">
//          <div className="max-w-4xl mx-auto px-4 text-center">
//             <h2 className="text-3xl font-sans font-bold text-white mb-6">Trusted by players seeking truth.</h2>
//             <p className="text-gray-400 text-sm font-sans mb-10 max-w-xl mx-auto">
//               Join thousands of academy prospects and amateur players using professional-grade intelligence to evolve their game.
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
//                <div className="p-6 bg-[#050505] border border-[#1A1A1A]">
//                   <p className="text-gray-300 italic font-serif mb-4">"It pointed out a flaw in my half-space receiving that my coach had been complaining about for months. The drill recommendation fixed it."</p>
//                   <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">— U18 Academy Midfielder</p>
//                </div>
//                <div className="p-6 bg-[#050505] border border-[#1A1A1A]">
//                   <p className="text-gray-300 italic font-serif mb-4">"The progress tracking makes me want to upload every match. It feels like real-life FIFA career mode, but I’m actually getting better."</p>
//                   <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">— Semi-Pro Winger</p>
//                </div>
//             </div>
//          </div>
//       </div>
//     </div>
//   );
// }



import { motion } from 'framer-motion';
import { Play, TrendingUp, Cpu, Shield, ArrowRight, Sparkles, Users, Award } from 'lucide-react';

interface LandingViewProps {
  onGetStarted: () => void;
  onViewPricing: () => void;
}

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

export function LandingView({ onGetStarted, onViewPricing }: LandingViewProps) {
  return (
    <motion.div 
      className="w-full flex flex-col pt-8 md:pt-16 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <div className="text-center max-w-5xl mx-auto px-4 relative">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-full mb-8 backdrop-blur-sm">
          <motion.span 
            className="w-2 h-2 rounded-full bg-amber-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Elite Scout Engine v2.0 Live</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[0.9] mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Transform Your
          <br />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 italic">
              Football Journey
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          The ultimate AI-powered platform for player development. Get professional-grade tactical analysis, 
          personalized growth roadmaps, and track your evolution towards elite academy standards.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold uppercase tracking-wider text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-3 rounded-lg shadow-lg shadow-amber-500/20"
          >
            Enter Dashboard
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={onViewPricing}
            whileHover={{ scale: 1.02, borderColor: "rgba(245, 158, 11, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-semibold uppercase tracking-wider text-sm hover:bg-white/10 transition-all duration-300 rounded-lg backdrop-blur-sm"
          >
            View Pricing
          </motion.button>
        </motion.div>
      </div>

      {/* Hero Video Preview */}
      <motion.div 
        variants={itemVariants}
        className="relative max-w-6xl mx-auto w-full px-4 mb-32"
      >
        <div className="aspect-video w-full bg-gradient-to-br from-gray-900 to-black border border-white/10 md:border md:rounded-2xl flex items-center justify-center overflow-hidden relative group shadow-2xl shadow-black/50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Scanning line effect */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_20px_rgba(245,158,11,1)]"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <motion.div 
            className="z-10 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-24 h-24 rounded-full border-2 border-amber-500/50 bg-black/60 backdrop-blur-md flex items-center justify-center cursor-pointer group-hover:border-amber-400 transition-colors shadow-[0_0_60px_rgba(245,158,11,0.3)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-10 h-10 text-amber-400 ml-1" />
            </motion.div>
            <span className="text-xs text-amber-400 font-semibold tracking-widest mt-6 uppercase">Watch Demo</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        variants={itemVariants}
        className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
      >
        {[
          {
            icon: Cpu,
            title: "AI Tactical Engine",
            description: "Advanced machine learning models process your footage, extracting biomechanical data and tactical patterns used by top academies.",
            color: "amber"
          },
          {
            icon: Shield,
            title: "Player DNA Profile",
            description: "Discover your unique playing archetype with detailed positional analysis and AI-matched professional player comparisons.",
            color: "cyan"
          },
          {
            icon: TrendingUp,
            title: "Smart Growth Roadmap",
            description: "Get personalized training recommendations based on your weaknesses, with specific drills and measurable milestones.",
            color: "green"
          }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 rounded-xl backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300 group"
          >
            <div className={`w-14 h-14 rounded-lg bg-${feature.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials */}
      <motion.div 
        variants={itemVariants}
        className="py-24 bg-gradient-to-b from-transparent to-white/[0.02]"
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Rising Stars</h2>
            <p className="text-gray-400 mb-12">Join thousands of players transforming their game with data-driven insights</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              {
                quote: "The AI identified a positioning flaw I'd been struggling with for months. After following the recommended drills, my coach noticed immediate improvement.",
                author: "U18 Academy Midfielder",
                rating: 5
              },
              {
                quote: "It's like having a personal analyst. The progression tracking keeps me motivated, and the tactical insights are genuinely professional-grade.",
                author: "Semi-Pro Winger",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Award key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
