import { useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import { useGetProjectsQuery } from '../services/api/projectsApi';
import type { ProjectItem } from '../types/project.types';
import ProjectCard from '../components/sections/ProjectCard';
import ProjectModal from '../components/sections/ProjectModal';

export default function FeaturedProjects() {
  const { selectedProject, setSelectedProject } = useStore();
  const { data: projects = [], isLoading } = useGetProjectsQuery();

  const activeProject = projects.find((p: ProjectItem) => p._id === selectedProject);

  const handleExamineClick = (id: string) => {
    setSelectedProject(id);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Lock body when drawer is open so the drawer can scroll natively
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedProject]);

  if (isLoading) {
    return (
      <section id="projects" className="py-32 bg-cream text-center px-6 min-h-[60vh] flex items-center justify-center bg-noise">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-2 border-burnt-orange/20 border-t-burnt-orange rounded-full animate-spin" />
          <span className="text-xs font-medium tracking-widest text-muted font-sans">Accessing case dossiers...</span>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-32 bg-cream text-center px-6 min-h-[50vh] flex items-center justify-center bg-noise">
        <div className="max-w-md border border-border-cream bg-card-white p-8 rounded-2xl shadow-minimal">
          <h2 className="text-2xl font-display font-light text-deep-black mb-4">Featured Projects</h2>
          <p className="text-sm text-muted leading-relaxed font-sans font-light">
            No projects added yet. Please use the Admin Control Console to configure dynamic case studies.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative min-h-screen py-32 bg-cream border-b border-border-cream px-6 md:px-12 flex items-center bg-noise"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Section Title */}
        <div className="mb-24 text-center md:text-left max-w-3xl">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans">
              ENGINEERING ARCHIVES & CASE STUDIES
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black mb-6">
            Featured <span className="italic font-normal text-burnt-orange">Case Studies</span>
          </h2>
          <p className="text-sm md:text-base text-body font-sans font-light leading-relaxed">
            A comprehensive review of selected software projects, showcasing structural decisions, frontend paradigms, and performance optimizations.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project: ProjectItem, index: number) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              onExamine={handleExamineClick}
            />
          ))}
        </div>

      </div>

      {/* Case Study Details Slide Drawer Panel */}
      <ProjectModal
        isOpen={!!selectedProject}
        project={activeProject || null}
        onClose={handleCloseModal}
      />
    </section>
  );
}
