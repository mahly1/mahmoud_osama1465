import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context';

const About: React.FC = () => {
  const { content } = useData();

  return (
    <div className="min-h-screen bg-prison-wall pt-32 pb-20 relative border-t border-zinc-800">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-alert to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="aspect-[3/4] bg-black overflow-hidden relative border border-zinc-800">
                <img src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2670&auto=format&fit=crop" alt="The Warden" className="w-full h-full object-cover grayscale opacity-60 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-t from-prison-wall via-transparent to-transparent"></div>
                
                {/* HUD Elements */}
                <div className="absolute top-4 left-4 border border-alert/30 px-2 py-1">
                    <span className="text-[10px] font-mono text-alert">CAM_02 [REC]</span>
                </div>
                <div className="absolute bottom-10 right-4 text-right">
                    <p className="font-display text-4xl text-white uppercase opacity-80">M. Osama</p>
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Warden ID: 394-A</p>
                </div>
             </div>
          </div>

          <div>
             <div className="mb-12 relative border-l-4 border-alert pl-8">
                <div className="absolute -left-[13px] -top-2 w-6 h-6 bg-prison-black border-2 border-alert rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-alert rounded-full animate-pulse-fast"></div>
                </div>
                <span className="font-mono text-xs text-alert uppercase tracking-widest mb-2 block">Zone: A-01</span>
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl md:text-7xl font-display font-bold uppercase text-white tracking-tighter"
                >
                    The Warden
                </motion.h2>
                <p className="font-tech text-zinc-500 uppercase tracking-widest mt-2 max-w-md">Controlling the Chaos</p>
             </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-sans text-xl text-zinc-400 leading-relaxed space-y-8"
            >
              <p>
                {content.aboutText}
              </p>
              
              <div className="bg-black/50 border-l-2 border-white p-6 relative">
                 <p className="font-display text-2xl text-white uppercase italic tracking-wide">
                    "{content.aboutPhilosophy}"
                 </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-8">
                  <div>
                      <span className="block text-3xl font-display text-white">50+</span>
                      <span className="text-xs font-mono text-zinc-600 uppercase">Brands Liberated</span>
                  </div>
                  <div>
                      <span className="block text-3xl font-display text-white">100%</span>
                      <span className="text-xs font-mono text-zinc-600 uppercase">Success Rate</span>
                  </div>
                  <div>
                      <span className="block text-3xl font-display text-white">24/7</span>
                      <span className="text-xs font-mono text-zinc-600 uppercase">Surveillance</span>
                  </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
  );
};

export default About;