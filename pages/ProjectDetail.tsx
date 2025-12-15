import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useData } from '../context';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const { projects } = useData();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-prison-black pt-32 pb-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-zinc-500 hover:text-alert transition-colors uppercase font-mono text-xs tracking-widest mb-10">
            <ArrowLeft size={16} /> Return to Evidence
        </button>

        <div className="max-w-4xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-display font-bold uppercase text-white mb-8"
            >
                {project.title}
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl text-zinc-300 font-sans leading-relaxed mb-12 border-l-4 border-zinc-800 pl-6"
            >
                {project.description}
            </motion.p>

            {project.mainButton && (
                <div className="mb-16">
                    <a 
                        href={project.mainButton.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 bg-alert text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
                    >
                        {project.mainButton.label} <ExternalLink size={18} />
                    </a>
                </div>
            )}

            <div className="space-y-12">
                {project.images.map((img, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="border border-zinc-800 p-2 bg-zinc-900"
                    >
                        <img src={img} alt={`Evidence ${i}`} className="w-full h-auto" />
                        <div className="bg-black p-2 flex justify-between items-center mt-2">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase">Evidence #{i + 1}</span>
                            <span className="font-mono text-[10px] text-alert uppercase">Verified</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;