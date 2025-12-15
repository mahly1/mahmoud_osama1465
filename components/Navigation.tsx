import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Gate', path: '/' },
    { name: 'Warden', path: '/about' },
    { name: 'Cell Blocks', path: '/services' },
    { name: 'Wings', path: '/industries' },
    { name: 'Parole', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-prison-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
           <div className="border border-alert/50 p-1 group-hover:bg-alert/10 transition-colors">
              <ShieldAlert className="text-alert" size={24} />
           </div>
           <div className="flex flex-col">
             <span className="font-stencil text-xl tracking-widest text-white leading-none">M.O</span>
             <span className="font-tech text-[10px] text-alert uppercase tracking-[0.2em] leading-none">Security Level 5</span>
           </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`px-6 py-2 font-tech text-sm uppercase tracking-widest transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-alert transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            );
          })}
          
          <div className="w-[1px] h-8 bg-zinc-800 mx-4"></div>

          <Link to="/admin" className="flex items-center gap-2 text-zinc-600 hover:text-alert transition-colors px-3 py-1 border border-zinc-800 hover:border-alert/50 rounded-sm">
             <Lock size={14} />
             <span className="font-tech text-xs uppercase">Admin</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50 text-alert" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-prison-black flex flex-col items-center justify-center space-y-8 md:hidden z-40"
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
             
            {navItems.map((item, i) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display uppercase tracking-widest hover:text-alert flex items-center gap-4 text-white"
              >
                <span className="text-xs font-mono text-zinc-600">0{i+1}</span>
                {item.name}
              </Link>
            ))}
            
            <div className="mt-12 border-t border-zinc-800 pt-8 w-1/2 flex justify-center">
                 <Link 
                    to="/admin" 
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-tech text-zinc-500 flex items-center gap-2 uppercase tracking-widest hover:text-alert"
                >
                    <Lock size={14} /> Restricted Area
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;