import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Map, Film, PenTool, Car, Building, Cpu, Shirt, ArrowRight, Siren } from 'lucide-react';
import { useData } from '../context';

// Icon mapping helper (Copied from Home to ensure availability)
const getIcon = (name: string, size = 24) => {
  const props = { size, className: "text-zinc-400 group-hover:text-alert transition-colors duration-300" };
  switch (name) {
    case 'Camera': return <Camera {...props} />;
    case 'Map': return <Map {...props} />;
    case 'Film': return <Film {...props} />;
    case 'PenTool': return <PenTool {...props} />;
    case 'Car': return <Car {...props} />;
    case 'Building': return <Building {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Shirt': return <Shirt {...props} />;
    default: return <Siren {...props} />;
  }
};

const Services: React.FC = () => {
  const { services } = useData();

  return (
    <section className="min-h-screen pt-32 pb-20 bg-prison-black relative">
        <div className="container mx-auto px-6">
             <div className="mb-20 relative border-l-4 border-alert pl-8">
                <span className="font-mono text-xs text-alert uppercase tracking-widest mb-2 block">Zone: B-02</span>
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl md:text-7xl font-display font-bold uppercase text-white tracking-tighter"
                >
                    Cell Blocks
                </motion.h2>
                <p className="font-tech text-zinc-500 uppercase tracking-widest mt-2 max-w-md">Operational Units</p>
             </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link to={`/service/${service.id}`} key={service.id} className="block h-full">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative h-full bg-prison-concrete border border-zinc-800 p-8 hover:bg-zinc-800 transition-colors duration-500 overflow-hidden"
                >
                    {/* Cell Bars Visual */}
                    <div className="absolute top-0 right-0 w-16 h-full flex justify-between pointer-events-none opacity-20 group-hover:opacity-5 transition-opacity">
                        <div className="w-1 h-full bg-black"></div>
                        <div className="w-1 h-full bg-black"></div>
                        <div className="w-1 h-full bg-black"></div>
                    </div>

                    <div className="mb-12 flex justify-between items-start">
                        <div className="p-3 border border-zinc-700 rounded-sm group-hover:border-alert transition-colors">
                            {getIcon(service.iconName)}
                        </div>
                        <span className="font-stencil text-4xl text-zinc-800 group-hover:text-zinc-700 transition-colors">0{index + 1}</span>
                    </div>

                    <h3 className="text-xl font-display font-bold uppercase mb-4 text-white group-hover:text-alert transition-colors">
                        Block {service.id}: {service.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-mono">{service.description}</p>
                    
                    <div className="flex items-center gap-2 text-alert text-xs font-bold uppercase tracking-widest opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Open Cell <ArrowRight size={14} />
                    </div>

                    <div className="absolute inset-0 bg-alert/5 mix-blend-overlay opacity-0 group-hover:animate-flicker pointer-events-none"></div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Services;