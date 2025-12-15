import React from 'react';
import { motion } from 'framer-motion';
import { Car, Building, Cpu, Shirt, Fingerprint, Siren } from 'lucide-react';
import { useData } from '../context';

const getIcon = (name: string, size = 24) => {
  const props = { size, className: "text-zinc-400 group-hover:text-alert transition-colors duration-300" };
  switch (name) {
    case 'Car': return <Car {...props} />;
    case 'Building': return <Building {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Shirt': return <Shirt {...props} />;
    default: return <Siren {...props} />;
  }
};

const Industries: React.FC = () => {
  const { industries } = useData();

  return (
    <section className="min-h-screen pt-32 pb-20 bg-prison-wall relative overflow-hidden">
        {/* Floor marking */}
        <div className="absolute inset-0 flex justify-center pointer-events-none opacity-10">
            <div className="w-[1px] h-full bg-yellow-500"></div>
            <div className="w-[1px] h-full bg-yellow-500 ml-2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
             <div className="mb-20 relative border-l-4 border-alert pl-8">
                <span className="font-mono text-xs text-alert uppercase tracking-widest mb-2 block">Zone: C-03</span>
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl md:text-7xl font-display font-bold uppercase text-white tracking-tighter"
                >
                    Wings
                </motion.h2>
                <p className="font-tech text-zinc-500 uppercase tracking-widest mt-2 max-w-md">Detention Sectors</p>
             </div>
          
          <div className="grid md:grid-cols-2 gap-0 border border-zinc-800 bg-prison-black">
            {industries.map((ind, i) => (
                <motion.div 
                    key={ind.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-zinc-800 p-10 group hover:bg-zinc-900 transition-colors relative"
                >
                    <div className="absolute top-4 right-4 font-mono text-xs text-zinc-700 group-hover:text-white transition-colors">
                        SEC-0{i+1}
                    </div>

                    <div className="flex items-center gap-6 mb-8">
                        {getIcon(ind.iconName, 40)}
                        <div>
                            <h3 className="text-3xl font-display uppercase text-white group-hover:text-alert transition-colors">{ind.name}</h3>
                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Clearance Level {i + 2}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        {ind.brands.map((brand, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-zinc-800 group-hover:border-zinc-700 transition-colors">
                                <span className="font-tech text-zinc-400 group-hover:text-white transition-colors uppercase">{brand}</span>
                                <Fingerprint size={14} className="text-zinc-700 group-hover:text-alert opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Industries;