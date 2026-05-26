import { create } from 'zustand';

interface UIState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  selectedProject: string | null;
  setSelectedProject: (projectId: string | null) => void;
}

export const useStore = create<UIState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  selectedProject: null,
  setSelectedProject: (projectId) => set({ selectedProject: projectId }),
}));

export default useStore;
