import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, SiteContent, Service, Project, Brand, Industry } from './types';

const defaultContent: SiteContent = {
  heroTitle: "LOCKDOWN LIFTED",
  heroSubtitle: "Most brands are serving a life sentence in mediocrity. I engineer the breakout.",
  aboutText: "Creativity is dangerous. That's why they try to contain it. I don't just visit the prison; I run the operations. I identify the weak points in the market and blow the walls open.",
  aboutPhilosophy: "Safe ideas stay in their cells. Bold ideas start riots. My mission is to liberate your brand from the ordinary.",
  contactEmail: "warden@mahmoudosama.com",
  socials: {
    instagram: "@mahmoud.breakout",
    linkedin: "mahmoud-osama",
    behance: "mahmoudosama"
  }
};

const defaultServices: Service[] = [
  { id: 'A', title: 'Content Creation', description: 'Visual evidence that demands attention.', details: 'We manufacture contraband content that smugglers into the minds of your audience.', iconName: 'Camera' },
  { id: 'B', title: 'Strategy', description: 'The escape plan.', details: 'Every breakout needs a blueprint. We analyze the security systems of your market.', iconName: 'Map' },
  { id: 'C', title: 'Video Editing', description: 'Narrative manipulation.', details: 'Cutting the footage to frame the narrative exactly how we want it.', iconName: 'Film' },
  { id: 'D', title: 'Brand Design', description: 'Identity reform.', details: 'Stripping away the old inmate number and giving your brand a new, powerful identity.', iconName: 'PenTool' },
];

const defaultBrands: Brand[] = [
  { id: '1', name: 'BMW Local', description: 'Automotive Giant' },
  { id: '2', name: 'StreetWare', description: 'Urban Fashion' },
  { id: '3', name: 'Skyline', description: 'Real Estate Moguls' },
];

const defaultIndustries: Industry[] = [
    { id: '1', name: 'Automotive', iconName: 'Car', brands: ['BMW Local', 'Mercedes', 'Toyota'] },
    { id: '2', name: 'Real Estate', iconName: 'Building', brands: ['Skyline', 'Emaar', 'Damac'] },
    { id: '3', name: 'Tech', iconName: 'Cpu', brands: ['Logitech', 'Razer', 'Intel'] },
    { id: '4', name: 'Fashion', iconName: 'Shirt', brands: ['StreetWare', 'Adidas', 'Zara'] }
];

const defaultProjects: Project[] = [
  { 
    id: '1', 
    title: 'Operation: Neon', 
    description: 'A high-speed chase through the city streets at night.',
    images: ['https://picsum.photos/800/600?random=1', 'https://picsum.photos/800/600?random=11'],
    mainButton: { label: 'View Commercial', link: '#' },
    serviceId: 'A',
    brandId: '1'
  },
  { 
    id: '2', 
    title: 'The Breakout Collection', 
    description: 'Launching the winter line with a prison-break theme.',
    images: ['https://picsum.photos/800/600?random=2'],
    mainButton: { label: 'View Lookbook', link: '#' },
    serviceId: 'D',
    brandId: '2'
  },
];

const DataContext = createContext<AppState | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [brands, setBrands] = useState<Brand[]>(defaultBrands);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [industries] = useState<Industry[]>(defaultIndustries);

  const updateContent = (newContent: Partial<SiteContent>) => setContent(prev => ({ ...prev, ...newContent }));
  const updateService = (id: string, newService: Partial<Service>) => setServices(prev => prev.map(s => s.id === id ? { ...s, ...newService } : s));

  // Brand CRUD
  const addBrand = (brand: Brand) => setBrands(prev => [...prev, brand]);
  const updateBrand = (id: string, newBrand: Partial<Brand>) => setBrands(prev => prev.map(b => b.id === id ? { ...b, ...newBrand } : b));
  const deleteBrand = (id: string) => setBrands(prev => prev.filter(b => b.id !== id));

  // Project CRUD
  const addProject = (project: Project) => setProjects(prev => [...prev, project]);
  const updateProject = (id: string, newProject: Partial<Project>) => setProjects(prev => prev.map(p => p.id === id ? { ...p, ...newProject } : p));
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));

  return (
    <DataContext.Provider value={{ 
      content, services, brands, projects, industries,
      updateContent, updateService, 
      addBrand, updateBrand, deleteBrand,
      addProject, updateProject, deleteProject 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};