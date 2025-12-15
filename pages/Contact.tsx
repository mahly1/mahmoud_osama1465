import React from 'react';
import { motion } from 'framer-motion';
import { Siren, ArrowRight } from 'lucide-react';
import { useData } from '../context';

const Contact: React.FC = () => {
  const { content } = useData();

  return (
    <section className="min-h-screen bg-black relative flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 border border-zinc-800 bg-prison-concrete/30 backdrop-blur-sm relative overflow-hidden"
                >
                    {/* Animated Siren Light Background */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-alert shadow-[0_0_20px_#ff3b30] animate-pulse-fast"></div>
                    
                    <div className="mb-8 flex justify-center text-alert animate-pulse">
                        <Siren size={48} />
                    </div>

                    <h2 className="text-5xl md:text-8xl font-display font-bold uppercase mb-6 text-white tracking-tighter">
                        Request <span className="text-transparent bg-clip-text bg-gradient-to-t from-alert to-red-500">Parole</span>
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 font-tech tracking-wide uppercase">
                        Ready to break your brand out of solitary confinement?
                    </p>
                    
                    <a 
                        href={`mailto:${content.contactEmail}`}
                        className="group relative inline-flex items-center gap-4 bg-transparent border-2 border-white px-10 py-5 text-lg font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <span className="relative z-10">Initiate Escape</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" />
                    </a>

                    <div className="mt-16 flex justify-center gap-12 border-t border-zinc-800 pt-8">
                        <a href="#" className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-alert transition-colors">Instagram [Surveillance]</a>
                        <a href="#" className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-alert transition-colors">LinkedIn [Record]</a>
                    </div>
                </motion.div>
            </div>
        </div>
       </section>
  );
};

export default Contact;