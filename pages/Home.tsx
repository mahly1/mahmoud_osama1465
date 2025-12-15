import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useData } from '../context';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { content } = useData();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div ref={containerRef} className="overflow-hidden bg-prison-black min-h-screen">
      
      {/* HERO SECTION - THE GATE */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background Grime */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-t from-prison-black via-transparent to-black z-10" />
           <img 
            src="https://images.unsplash.com/photo-1579294294021-d1c8760205b3?q=80&w=2670&auto=format&fit=crop" 
            alt="Prison Gate" 
            className="w-full h-full object-cover grayscale contrast-125 brightness-50"
           />
        </motion.div>
        
        {/* Vertical Bars Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 12%)' }}>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="mb-8"
          >
             <div className="inline-block border border-alert/50 px-4 py-1 bg-alert/10 backdrop-blur-md mb-6">
                 <p className="font-mono text-alert text-xs md:text-sm tracking-widest uppercase animate-pulse-fast">Warning: Creative Breach In Progress</p>
             </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-9xl font-display font-bold uppercase leading-none tracking-tighter mb-6 text-white text-shadow-lg">
              {content.heroTitle}
            </h1>
            <h2 className="text-xl md:text-2xl font-tech text-zinc-400 max-w-3xl mx-auto tracking-wide uppercase border-t border-b border-zinc-800 py-4">
              {content.heroSubtitle}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <Link 
              to="/about"
              className="group inline-flex items-center gap-4 border border-zinc-700 bg-black/50 px-8 py-4 uppercase tracking-widest font-bold hover:bg-alert hover:text-white hover:border-alert transition-all duration-300"
            >
              Enter Facility <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-600 flex flex-col items-center gap-2 z-20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Authorized Personnel Only</span>
          <ArrowDown size={16} />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;