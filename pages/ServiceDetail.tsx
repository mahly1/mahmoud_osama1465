import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Shield } from 'lucide-react';
import { useData } from '../context';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const { services, brands, projects } = useData();
  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) return <div className="text-white">Loading...</div>;

  // Find brands that have projects in this service
  const activeBrandIds = Array.from(new Set(projects.filter(p => p.serviceId === id).map(p => p.brandId)));
  const relatedBrands = brands.filter(b => activeBrandIds.includes(b.id));

  // If a brand has no projects yet but exists, we might still want to show it or not. 
  // For now, let's show ALL brands to allow the user to explore "Potential Inmates" if the list is empty? 
  // No, let's stick to logic: Service -> Brands with Projects in that service.
  // If list is empty, show all brands as fallback or empty state.
  const displayBrands = relatedBrands.length > 0 ? relatedBrands : brands;

  return (
    <div className="min-h-screen bg-prison-black pt-32 pb-20 relative">
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <Link to="/services" className="inline-flex items-center gap-2 text-zinc-500 hover:text-alert transition-colors uppercase font-mono text-xs tracking-widest mb-12">
            <ArrowLeft size={16} /> Return to Cell Blocks
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
            <h1 className="text-6xl md:text-8xl font-display font-bold uppercase text-white mb-6">{service.title}</h1>
            <p className="text-xl text-zinc-400 font-sans max-w-2xl border-l-2 border-alert pl-6">{service.details}</p>
        </motion.div>

        <h3 className="text-2xl font-display uppercase mb-10 flex items-center gap-3 text-white border-b border-zinc-800 pb-4">
            <Users className="text-alert" size={24} /> 
            Associated Inmates (Brands)
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
            {displayBrands.map((brand, i) => (
                <Link key={brand.id} to={`/service/${service.id}/brand/${brand.id}`}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group border border-zinc-800 bg-zinc-900/50 p-8 hover:bg-zinc-900 hover:border-alert transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-2 opacity-50">
                            <Shield size={40} className="text-zinc-800 group-hover:text-alert/20 transition-colors" />
                        </div>
                        <h4 className="text-3xl font-display uppercase text-white group-hover:text-alert transition-colors mb-2">{brand.name}</h4>
                        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{brand.description}</p>
                        
                        <div className="mt-8 flex items-center gap-2 text-zinc-600 group-hover:text-white text-xs font-mono uppercase tracking-widest">
                            Access File <ArrowLeft className="rotate-180" size={12} />
                        </div>
                    </motion.div>
                </Link>
            ))}
            {displayBrands.length === 0 && (
                 <div className="col-span-3 text-center py-20 border border-dashed border-zinc-800">
                    <p className="text-zinc-500 font-mono uppercase">No Inmates Found in this Block.</p>
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;