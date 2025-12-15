import React from 'react';
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-prison-black text-gray-300 selection:bg-alert selection:text-white">
      {!isAdmin && <Navigation />}
      
      {/* Visual FX Layers */}
      <div className="bg-noise"></div>
      <div className="scanlines"></div>
      
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      <main className="relative z-10">
        {children}
      </main>

      {!isAdmin && (
        <footer className="py-12 border-t border-white/5 relative z-10 bg-prison-black">
          <div className="container mx-auto px-6 flex flex-col items-center">
             <div className="w-16 h-1 bg-alert mb-6"></div>
             <h4 className="font-stencil text-2xl mb-2 tracking-widest text-zinc-600 uppercase">Detention Center</h4>
            <p className="font-tech text-zinc-500 text-sm tracking-widest uppercase">
              © {new Date().getFullYear()} Mahmoud Osama. All Rights Reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;