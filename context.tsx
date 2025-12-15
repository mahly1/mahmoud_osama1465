import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppState, SiteContent, Service, Project, Brand, Industry } from './types';
import { db } from './firebaseConfig';
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';

// Default Fallback Data (Used while loading or if DB is empty)
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

const DataContext = createContext<AppState | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [services, setServices] = useState<Service[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Real-time Data Listeners ---

  useEffect(() => {
    // 1. Fetch Site Content (Single Document 'main' in 'content' collection)
    const unsubContent = onSnapshot(doc(db, "content", "main"), (doc) => {
        if (doc.exists()) {
            setContent(doc.data() as SiteContent);
        } else {
            // Initialize DB if empty
            setDoc(doc.ref, defaultContent); 
        }
    });

    // 2. Fetch Services
    const unsubServices = onSnapshot(collection(db, "services"), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
        // Sort by ID or any field if needed
        setServices(data.sort((a,b) => a.id.localeCompare(b.id)));
    });

    // 3. Fetch Brands
    const unsubBrands = onSnapshot(collection(db, "brands"), (snapshot) => {
        setBrands(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Brand)));
    });

    // 4. Fetch Projects
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
    });

    // 5. Fetch Industries
    const unsubIndustries = onSnapshot(collection(db, "industries"), (snapshot) => {
        setIndustries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Industry)));
    });

    setLoading(false);

    return () => {
        unsubContent();
        unsubServices();
        unsubBrands();
        unsubProjects();
        unsubIndustries();
    };
  }, []);


  // --- CRUD Operations (Writing to Firestore) ---

  const updateContent = async (newContent: Partial<SiteContent>) => {
    const docRef = doc(db, "content", "main");
    await updateDoc(docRef, newContent);
  };

  const updateService = async (id: string, newService: Partial<Service>) => {
    const docRef = doc(db, "services", id);
    await updateDoc(docRef, newService);
  };

  // Brand CRUD
  const addBrand = async (brand: Brand) => {
    // We let Firestore generate ID if not provided, but here we used custom IDs in previous code. 
    // Best practice with Firestore is addDoc (auto-ID) or setDoc (custom ID).
    // Let's use addDoc for simplicity, ignoring the passed 'id' if it's a timestamp.
    await addDoc(collection(db, "brands"), { ...brand, id: undefined }); // Firestore assigns ID
  };
  
  const updateBrand = async (id: string, newBrand: Partial<Brand>) => {
    const docRef = doc(db, "brands", id);
    await updateDoc(docRef, newBrand);
  };

  const deleteBrand = async (id: string) => {
    await deleteDoc(doc(db, "brands", id));
  };

  // Project CRUD
  const addProject = async (project: Project) => {
    await addDoc(collection(db, "projects"), { ...project, id: undefined });
  };

  const updateProject = async (id: string, newProject: Partial<Project>) => {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, newProject);
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
  };

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