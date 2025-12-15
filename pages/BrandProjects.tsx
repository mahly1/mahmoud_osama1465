import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderOpen, AlertTriangle } from 'lucide-react';
import { useData } from '../context';

const BrandProjects: React.FC = () => {
  const { serviceId, brandId } = useParams();
  const { services, brands, projects } = useData();
  
  const service = services.find(s => s.id === serviceId);
  const brand = brands.find(b => b.id === brandId);
  
  // Filter projects for this specific Service AND Brand
  const brandProjects = projects.filter(p => p.serviceId === serviceId && p.brandId === brandId);

  if (!service || !brand) return <div>Data not found</div>;

  return (
    <div className="min-h-screen bg-prison-black pt-32 pb-20 relative">
        <div className="container mx-auto px-6 relative z-10">
            <Link to={`/service/${serviceId}`} className="inline-flex items-center gap-2 text-zinc-500 hover:text-alert transition-colors uppercase font-mono text-xs tracking-widest mb-12">
                <ArrowLeft size={16} /> Return to Brand List
            </Link>

            <div className="mb-16 border-b border-zinc-800 pb-8 flex flex-col md:flex-row justify-between items-end">
                <div>
                    <span className="text-alert font-mono text-xs uppercase tracking-widest mb-2 block">Inmate File: {brand.name}</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold uppercase text-white">Criminal Record</h1>
                </div>
                <div className="text-right mt-6 md:mt-0">
                    <p className="text-zinc-500 font-mono text-sm uppercase">Charge: {service.title}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {brandProjects.map((project, i) => (
                    <Link key={project.id} to={`/project/${project.id}`}>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer border border-zinc-800 bg-black hover:border-alert transition-colors duration-500"
                        >
                            <div className="overflow-hidden relative h-[300px]">
                                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                                
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                                    <span className="text-alert font-stencil text-2xl uppercase tracking-widest border-2 border-alert px-8 py-4 mb-2">View Evidence</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-2xl font-bold uppercase font-display text-white mb-2">{project.title}</h4>
                                <p className="text-zinc-500 text-sm font-sans line-clamp-2">{project.description}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
                
                {brandProjects.length === 0 && (
                    <div className="col-span-2 flex flex-col items-center justify-center py-20 border border-zinc-800 bg-zinc-900/20">
                        <AlertTriangle className="text-zinc-600 mb-4" size={48} />
                        <h3 className="text-xl font-display uppercase text-zinc-500">No Evidence Found</h3>
                        <p className="text-zinc-600 font-mono text-xs mt-2">This inmate has a clean record in this block.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default BrandProjects;