import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, Lock, User, Plus, Trash2, FolderOpen, Menu, LayoutTemplate, Briefcase, Tag } from 'lucide-react';
import { useData } from '../context';
import { generateCreativeContent } from '../services/geminiService';
import { Project, Brand } from '../types';

const Admin: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data
  const { 
    content, services, brands, projects, 
    updateContent, updateService, 
    addBrand, updateBrand, deleteBrand,
    addProject, updateProject, deleteProject 
  } = useData();

  // Navigation Tabs (Matching Public Pages + Evidence)
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'brands' | 'contact' | 'evidence'>('home');
  
  // State for adding items
  const [newProject, setNewProject] = useState<Partial<Project>>({ title: '', description: '', images: [], serviceId: services[0]?.id, brandId: brands[0]?.id, mainButton: { label: '', link: '' } });
  const [newBrand, setNewBrand] = useState<Partial<Brand>>({ name: '', description: '' });
  
  // Helper for Project Images (simple comma separated for now)
  const [imageInput, setImageInput] = useState('');

  // Local Content State (Form Buffers)
  const [localContent, setLocalContent] = useState(content);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@mahmoudosama.com' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      setLoginError('Access Denied');
    }
  };

  const handleSaveContent = () => {
    updateContent(localContent);
    alert("Protocol Updated");
  };

  const handleAddBrand = () => {
    if (newBrand.name) {
        addBrand({ id: Date.now().toString(), name: newBrand.name!, description: newBrand.description || '' });
        setNewBrand({ name: '', description: '' });
    }
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.serviceId && newProject.brandId) {
        const imgs = imageInput.split(',').map(s => s.trim()).filter(s => s);
        addProject({
            id: Date.now().toString(),
            title: newProject.title!,
            description: newProject.description || '',
            images: imgs.length > 0 ? imgs : ['https://picsum.photos/800/600'],
            serviceId: newProject.serviceId!,
            brandId: newProject.brandId!,
            mainButton: newProject.mainButton
        });
        setNewProject({ title: '', description: '', serviceId: services[0]?.id, brandId: brands[0]?.id, mainButton: { label: '', link: '' } });
        setImageInput('');
    }
  };

  if (!isAuthenticated) {
     // Login Screen (Same as before)
     return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
          <div className="scanlines"></div>
          <div className="bg-noise"></div>
          <div className="relative z-10 w-full max-w-md p-8 bg-zinc-900/50 border border-zinc-800 backdrop-blur-md">
              <div className="flex justify-center mb-6 text-alert"><Lock size={48} /></div>
              <h2 className="text-3xl font-display text-center uppercase text-white mb-2">Restricted Access</h2>
              <form onSubmit={handleLogin} className="space-y-6">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-alert focus:outline-none" placeholder="Identifier" />
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-alert focus:outline-none" placeholder="Passcode" />
                  {loginError && <p className="text-alert text-xs text-center">{loginError}</p>}
                  <button type="submit" className="w-full bg-alert text-white py-3 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">Authenticate</button>
              </form>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col overflow-y-auto">
          <div className="mb-8 flex items-center gap-3">
            <Lock className="text-alert" />
            <h2 className="text-xl font-stencil font-bold uppercase tracking-widest text-white leading-none">Warden<br/><span className="text-zinc-600 text-sm font-sans">Control</span></h2>
          </div>
          
          <nav className="space-y-1 flex-1">
            <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-2 mt-4">Pages</p>
            <button onClick={() => setActiveTab('home')} className={`w-full flex items-center gap-3 text-left px-3 py-2 text-xs uppercase tracking-wide rounded ${activeTab === 'home' ? 'bg-zinc-900 text-white border-l-2 border-alert' : 'text-zinc-500 hover:text-white'}`}>Gate (Home)</button>
            <button onClick={() => setActiveTab('about')} className={`w-full flex items-center gap-3 text-left px-3 py-2 text-xs uppercase tracking-wide rounded ${activeTab === 'about' ? 'bg-zinc-900 text-white border-l-2 border-alert' : 'text-zinc-500 hover:text-white'}`}>Warden (About)</button>
            <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 text-left px-3 py-2 text-xs uppercase tracking-wide rounded ${activeTab === 'services' ? 'bg-zinc-900 text-white border-l-2 border-alert' : 'text-zinc-500 hover:text-white'}`}>Blocks (Services)</button>
            <button onClick={() => setActiveTab('brands')} className={`w-full flex items-center gap-3 text-left px-3 py-2 text-xs uppercase tracking-wide rounded ${activeTab === 'brands' ? 'bg-zinc-900 text-white border-l-2 border-alert' : 'text-zinc-500 hover:text-white'}`}>Inmates (Brands)</button>
            <button onClick={() => setActiveTab('contact')} className={`w-full flex items-center gap-3 text-left px-3 py-2 text-xs uppercase tracking-wide rounded ${activeTab === 'contact' ? 'bg-zinc-900 text-white border-l-2 border-alert' : 'text-zinc-500 hover:text-white'}`}>Parole (Contact)</button>
            
            <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest mb-2 mt-6">Content</p>
            <button onClick={() => setActiveTab('evidence')} className={`w-full flex items-center gap-3 text-left px-3 py-2 text-xs uppercase tracking-wide rounded ${activeTab === 'evidence' ? 'bg-zinc-900 text-white border-l-2 border-alert' : 'text-zinc-500 hover:text-white'}`}>
                <FolderOpen size={14} /> Evidence (Projects)
            </button>
          </nav>

          <Link to="/" className="flex items-center gap-2 text-zinc-600 hover:text-alert mt-auto font-mono text-xs uppercase tracking-widest">
            <ArrowLeft size={14} /> Exit Facility
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
          
          {/* HEADER */}
          <header className="mb-10 border-b border-zinc-800 pb-6">
            <h1 className="text-3xl font-display uppercase text-white">
                {activeTab.toUpperCase()} CONFIGURATION
            </h1>
          </header>

          {/* HOME TAB */}
          {activeTab === 'home' && (
             <div className="space-y-6 max-w-2xl">
                 <div className="group">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Main Headline</label>
                    <input value={localContent.heroTitle} onChange={e => setLocalContent({...localContent, heroTitle: e.target.value})} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 mt-1 text-white focus:border-alert focus:outline-none" />
                 </div>
                 <div className="group">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Sub-Headline</label>
                    <input value={localContent.heroSubtitle} onChange={e => setLocalContent({...localContent, heroSubtitle: e.target.value})} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 mt-1 text-white focus:border-alert focus:outline-none" />
                 </div>
                 <button onClick={handleSaveContent} className="bg-alert text-white px-6 py-2 uppercase font-bold text-sm hover:bg-red-700">Save Changes</button>
             </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
             <div className="space-y-6 max-w-2xl">
                 <div className="group">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Warden's Bio</label>
                    <textarea rows={6} value={localContent.aboutText} onChange={e => setLocalContent({...localContent, aboutText: e.target.value})} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 mt-1 text-white focus:border-alert focus:outline-none" />
                 </div>
                 <div className="group">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Philosophy Quote</label>
                    <input value={localContent.aboutPhilosophy} onChange={e => setLocalContent({...localContent, aboutPhilosophy: e.target.value})} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 mt-1 text-white focus:border-alert focus:outline-none" />
                 </div>
                 <button onClick={handleSaveContent} className="bg-alert text-white px-6 py-2 uppercase font-bold text-sm hover:bg-red-700">Save Changes</button>
             </div>
          )}

           {/* SERVICES TAB */}
           {activeTab === 'services' && (
             <div className="space-y-4">
                 {services.map(s => (
                     <div key={s.id} className="bg-zinc-900/30 border border-zinc-800 p-4">
                         <div className="flex items-center gap-4 mb-2">
                             <span className="font-stencil text-zinc-600">{s.id}</span>
                             <input value={s.title} onChange={e => updateService(s.id, {title: e.target.value})} className="bg-transparent text-lg font-bold uppercase w-full border-b border-zinc-800 focus:border-alert focus:outline-none" />
                         </div>
                         <textarea value={s.details} onChange={e => updateService(s.id, {details: e.target.value})} className="w-full bg-transparent text-sm text-zinc-400 border border-transparent focus:border-zinc-700 focus:outline-none p-2" rows={2} />
                     </div>
                 ))}
             </div>
          )}

          {/* BRANDS TAB */}
          {activeTab === 'brands' && (
             <div>
                 <div className="bg-zinc-900 border border-zinc-800 p-6 mb-8">
                     <h3 className="text-sm font-mono uppercase text-alert mb-4">Process New Inmate</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Brand Name" value={newBrand.name} onChange={e => setNewBrand({...newBrand, name: e.target.value})} className="bg-black border border-zinc-700 p-3 text-white focus:outline-none" />
                        <input placeholder="Description (Industry)" value={newBrand.description} onChange={e => setNewBrand({...newBrand, description: e.target.value})} className="bg-black border border-zinc-700 p-3 text-white focus:outline-none" />
                     </div>
                     <button onClick={handleAddBrand} className="mt-4 bg-white text-black px-4 py-2 uppercase font-bold text-xs hover:bg-zinc-200">Add Brand</button>
                 </div>

                 <div className="grid grid-cols-3 gap-4">
                     {brands.map(b => (
                         <div key={b.id} className="border border-zinc-800 p-4 relative group">
                             <input value={b.name} onChange={e => updateBrand(b.id, {name: e.target.value})} className="bg-transparent font-bold uppercase w-full mb-1 focus:outline-none" />
                             <input value={b.description} onChange={e => updateBrand(b.id, {description: e.target.value})} className="bg-transparent text-xs text-zinc-500 w-full focus:outline-none" />
                             <button onClick={() => deleteBrand(b.id)} className="absolute top-2 right-2 text-zinc-600 hover:text-alert"><Trash2 size={14} /></button>
                         </div>
                     ))}
                 </div>
             </div>
          )}

          {/* EVIDENCE (PROJECTS) TAB */}
          {activeTab === 'evidence' && (
             <div>
                 <div className="bg-zinc-900 border border-zinc-800 p-6 mb-10">
                     <h3 className="text-sm font-mono uppercase text-alert mb-6">File New Evidence</h3>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <input placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-black border border-zinc-700 p-3 text-white focus:outline-none" />
                            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-black border border-zinc-700 p-3 text-white focus:outline-none" rows={3} />
                        </div>
                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] uppercase text-zinc-500">Cell Block (Service)</label>
                                    <select value={newProject.serviceId} onChange={e => setNewProject({...newProject, serviceId: e.target.value})} className="w-full bg-black border border-zinc-700 p-3 text-white focus:outline-none">
                                        {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase text-zinc-500">Inmate (Brand)</label>
                                    <select value={newProject.brandId} onChange={e => setNewProject({...newProject, brandId: e.target.value})} className="w-full bg-black border border-zinc-700 p-3 text-white focus:outline-none">
                                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <input placeholder="Image URLs (comma separated)" value={imageInput} onChange={e => setImageInput(e.target.value)} className="w-full bg-black border border-zinc-700 p-3 text-white focus:outline-none" />
                            <div className="grid grid-cols-2 gap-2">
                                <input placeholder="Button Label" value={newProject.mainButton?.label} onChange={e => setNewProject({...newProject, mainButton: {...newProject.mainButton!, label: e.target.value}})} className="bg-black border border-zinc-700 p-3 text-white focus:outline-none" />
                                <input placeholder="Button Link" value={newProject.mainButton?.link} onChange={e => setNewProject({...newProject, mainButton: {...newProject.mainButton!, link: e.target.value}})} className="bg-black border border-zinc-700 p-3 text-white focus:outline-none" />
                            </div>
                        </div>
                     </div>
                     <button onClick={handleAddProject} className="mt-6 bg-white text-black px-6 py-3 uppercase font-bold text-xs hover:bg-zinc-200">Create Project Record</button>
                 </div>

                 {/* Projects List */}
                 <div className="space-y-4">
                     {projects.map(p => {
                         const pBrand = brands.find(b => b.id === p.brandId);
                         const pService = services.find(s => s.id === p.serviceId);
                         return (
                            <div key={p.id} className="flex gap-4 p-4 bg-black border border-zinc-800 relative group">
                                <img src={p.images[0]} className="w-24 h-24 object-cover border border-zinc-800" alt="thumb" />
                                <div className="flex-1">
                                    <div className="flex gap-2 mb-2">
                                        <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-1 uppercase">{pService?.title}</span>
                                        <span className="text-[10px] bg-alert/10 text-alert px-2 py-1 uppercase">{pBrand?.name}</span>
                                    </div>
                                    <input value={p.title} onChange={e => updateProject(p.id, {title: e.target.value})} className="bg-transparent font-bold uppercase text-lg w-full focus:outline-none" />
                                    <textarea value={p.description} onChange={e => updateProject(p.id, {description: e.target.value})} className="bg-transparent text-sm text-zinc-500 w-full focus:outline-none mt-1" />
                                </div>
                                <button onClick={() => deleteProject(p.id)} className="text-zinc-600 hover:text-alert self-start"><Trash2 size={16} /></button>
                            </div>
                         );
                     })}
                 </div>
             </div>
          )}

           {/* CONTACT TAB */}
           {activeTab === 'contact' && (
             <div className="space-y-6 max-w-2xl">
                 <div className="group">
                    <label className="text-xs font-mono text-zinc-500 uppercase">Contact Email</label>
                    <input value={localContent.contactEmail} onChange={e => setLocalContent({...localContent, contactEmail: e.target.value})} className="w-full bg-zinc-900/50 border border-zinc-700 p-3 mt-1 text-white focus:border-alert focus:outline-none" />
                 </div>
                 <button onClick={handleSaveContent} className="bg-alert text-white px-6 py-2 uppercase font-bold text-sm hover:bg-red-700">Save Changes</button>
             </div>
          )}

        </main>
    </div>
  );
};

export default Admin;