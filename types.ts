export interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logoUrl?: string; // Optional logo/icon
}

export interface ProjectButton {
  label: string;
  link: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[]; // Array of image URLs
  mainButton?: ProjectButton;
  serviceId: string;
  brandId: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  aboutPhilosophy: string;
  contactEmail: string;
  socials: {
    instagram: string;
    linkedin: string;
    behance: string;
  };
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
  brands: string[];
}

export interface AppState {
  content: SiteContent;
  services: Service[];
  brands: Brand[];
  projects: Project[];
  industries: Industry[];
  
  updateContent: (newContent: Partial<SiteContent>) => void;
  
  // Service CRUD
  updateService: (id: string, newService: Partial<Service>) => void;
  
  // Brand CRUD
  addBrand: (brand: Brand) => void;
  updateBrand: (id: string, brand: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  
  // Project CRUD
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}