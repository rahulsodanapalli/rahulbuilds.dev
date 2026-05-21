import { create } from 'zustand';

export interface ProjectSpec {
  challenge: string;
  solution: string;
  architecture: string;
  performance: string;
  tech: string[];
  impact: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  imageMockup: string;
  specs: ProjectSpec;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  details: string[];
  tech: string[];
}

interface PortfolioState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  selectedProject: string | null;
  setSelectedProject: (projectId: string | null) => void;
  
  // Dynamic Datasets
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  
  // Actions
  addProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  addExperience: (exp: ExperienceItem) => void;
  deleteExperience: (index: number) => void;
  resetToDefault: () => void;
}

// 🏢 Initial Default Datasets
const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    role: "Software Engineer (Frontend)",
    company: "Innovatech Technology Solutions",
    location: "Hyderabad, India (Client: Abu Dhabi Govt)",
    period: "Aug 24 - Present",
    details: [
      "Architected the Abu Dhabi Department of Energy (DoE) Regulatory Portal, a multi-tier regulatory platform for permits and inspections.",
      "Integrated an AI Chat Assistant via REST API, elevating self-service support across production interfaces.",
      "Built rigorous RBAC (Role-Based Access Control) gates, securing multi-level approval workflows (Engineer → Section Head → Director).",
      "Engineered high-performance real-time data visualization charts using Recharts and ApexCharts."
    ],
    tech: ["React.js", "TypeScript", "Redux Toolkit", "RTK Query", "ApexCharts", "REST APIs", "MUI"]
  },
  {
    role: "Frontend Developer",
    company: "Innovatech Technology Solutions",
    location: "Hyderabad, India (Client: TAQA Water Solutions)",
    period: "Oct 23 - Aug 24",
    details: [
      "Engineered the TAQA Water Compliance and Monitoring Dashboard, tracking daily water parameters and metrics.",
      "Implemented a 30% performance enhancement across high-density table views through code splitting and tree-shaking.",
      "Developed fully reusable component systems, achieving 100% design system alignment and zero bundle clutter.",
      "Fixed and resolved complex compliance delay date validators and custom form submissions."
    ],
    tech: ["React.js", "TypeScript", "Redux State", "Ant Design", "ApexCharts", "Axios", "CSS Modules"]
  },
  {
    role: "Junior Frontend Engineer",
    company: "Innovatech Technology Solutions",
    location: "Hyderabad, India",
    period: "Jan 23 - Oct 23",
    details: [
      "Designed and coded responsive marketing assets and sub-modules for corporate projects, achieving 100% WCAG accessibility compliance.",
      "Assisted in refactoring legacy jQuery modules into clean, modern React hooks, decreasing code size by 25%.",
      "Integrated secure Axios REST handlers with rigorous client-side schema parsing."
    ],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Axios", "Bootstrap", "Git"]
  }
];

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "doe-portal",
    title: "DoE Regulatory Portal",
    subtitle: "Department of Energy, Abu Dhabi",
    category: "Government Enterprise",
    desc: "A mission-critical regulatory platform handling permits, inspections, and corporate licensing workflows for Abu Dhabi's utilities.",
    imageMockup: "doe",
    specs: {
      challenge: "Abu Dhabi utility regulatory workflows were manual and fragmented. The authority required a single, secure, highly performant gateway capable of managing high-volume permit approvals and inspection schedules, guarded by strict multi-level state agency controls.",
      solution: "Engineered a robust multi-step workflow portal. Developed dynamic form schemas, contextual validation architectures, and integrated an AI Chat Guide to assist corporate operators through technical filing procedures, accelerating applications.",
      architecture: "Structured around React with Redux Toolkit and RTK Query to maintain a unified client state cache. Access gates are enforced via a granular Role-Based Access Control (RBAC) mechanism tracking three-tier approvals (Engineer → Section Head → Director).",
      performance: "Leveraged route-based lazy loading, layout shift prevention, and heavy dashboard chart optimizations (ApexCharts memoization), resulting in a 30% paint speed increase and sub-1.2s initial interactive cycles.",
      tech: ["React.js", "TypeScript", "Redux Toolkit", "RTK Query", "ApexCharts", "Axios", "MUI"],
      impact: "Successfully delivered 3 production releases. Successfully processed thousands of regulatory permits across regional energy partners, reducing operational latency by 40%."
    }
  },
  {
    id: "taqa-dashboard",
    title: "Compliance Dashboard",
    subtitle: "TAQA Water Solutions, UAE",
    category: "Utility Analytics",
    desc: "Real-time compliance audit and utility parameters monitoring terminal processing operational water quality and regulatory charts.",
    imageMockup: "taqa",
    specs: {
      challenge: "Utility teams required a performant interface to aggregate water parameter compliance tests. Legacy tables suffered from massive layout shifts, slow paint times under heavy data packets, and date validator mismatches that caused submission delays.",
      solution: "Designed a lightweight monitoring cockpit featuring lazy-loaded parametrics, optimized high-frequency data grids, and a strict compliance schema date validator using custom asynchronous validation rules.",
      architecture: "Built on clean modular component design with custom React context state hooks, integrated with third-party charts. Developed a bulletproof parameters table displaying real-time compliance status (Safe, Caution, Alert).",
      performance: "Avoided unnecessary parent re-renders through local parameter caching and strict visual component encapsulation. Minimized CSS payload to improve initial load speed.",
      tech: ["React.js", "TypeScript", "Ant Design", "Redux", "ApexCharts", "Axios", "Zod"],
      impact: "Reduced operational reporting latency from 3 days to instantaneous real-time metrics. Maintained a 99.9% compliance data submission accuracy rating."
    }
  }
];

// 🚀 Helper to load initial state safely from localStorage
const getLocalData = <T>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error("Failed to parse LocalStorage data for:", key, e);
    return fallback;
  }
};

export const useStore = create<PortfolioState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  selectedProject: null,
  setSelectedProject: (projectId) => set({ selectedProject: projectId }),
  
  // Datasets loaded from LocalStorage
  projects: getLocalData<ProjectItem[]>('rb_projects', DEFAULT_PROJECTS),
  experiences: getLocalData<ExperienceItem[]>('rb_experiences', DEFAULT_EXPERIENCES),

  addProject: (project) => set((state) => {
    const updated = [...state.projects, project];
    localStorage.setItem('rb_projects', JSON.stringify(updated));
    return { projects: updated };
  }),

  deleteProject: (id) => set((state) => {
    const updated = state.projects.filter(p => p.id !== id);
    localStorage.setItem('rb_projects', JSON.stringify(updated));
    return { projects: updated };
  }),

  addExperience: (exp) => set((state) => {
    const updated = [...state.experiences, exp];
    localStorage.setItem('rb_experiences', JSON.stringify(updated));
    return { experiences: updated };
  }),

  deleteExperience: (index) => set((state) => {
    const updated = state.experiences.filter((_, idx) => idx !== index);
    localStorage.setItem('rb_experiences', JSON.stringify(updated));
    return { experiences: updated };
  }),

  resetToDefault: () => {
    localStorage.removeItem('rb_projects');
    localStorage.removeItem('rb_experiences');
    set({
      projects: DEFAULT_PROJECTS,
      experiences: DEFAULT_EXPERIENCES
    });
  }
}));
