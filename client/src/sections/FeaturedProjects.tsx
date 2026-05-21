import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, Activity, Award, Cpu } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { useGetProjectsQuery } from '../api/projectsApi';
import type { ProjectItem } from '../types/project.types';
import MagneticButton from '../components/MagneticButton';

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

  // Stop Lenis smooth scroll + lock body when drawer is open so the drawer can scroll natively
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (selectedProject) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
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
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col justify-between bg-card-white border border-border-cream rounded-2xl p-8 shadow-minimal hover:scale-[1.015] hover:border-burnt-orange/30 hover:shadow-minimal-hover transition-all duration-500 relative overflow-hidden text-left"
            >
              <div>
                {/* Visual Category Pill */}
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 rounded-lg bg-cream text-[10px] font-semibold uppercase tracking-wider text-burnt-orange border border-border-cream/80">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-semibold text-muted/50 tracking-wider">
                    PROJ_0{index + 1}
                  </span>
                </div>

                {/* Typography Header */}
                <h3 className="text-2xl md:text-3xl font-display font-light text-deep-black mb-1 group-hover:text-burnt-orange transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-burnt-orange/80 mb-6">{project.subtitle}</p>
                
                <p className="text-xs md:text-sm text-body leading-relaxed font-sans font-light mb-8 max-w-lg">
                  {project.desc}
                </p>

                {/* Premium Redesigned Telemetry Mockup Panels */}
                <div className="w-full h-48 bg-cream rounded-xl border border-border-cream/60 p-5 flex flex-col justify-between relative overflow-hidden mb-8 shadow-inner select-none font-mono">
                  {project.imageMockup === 'doe' ? (
                    // Abu Dhabi Department of Energy Dashboard Mockup
                    <div className="h-full w-full flex flex-col justify-between text-deep-black text-[10px]">
                      <div className="flex justify-between items-center border-b border-border-cream pb-2">
                        <div className="flex items-center gap-1.5 font-bold text-burnt-orange">
                          <ShieldCheck size={14} />
                          <span className="tracking-wide">DOE_GATEWAY_V3.4</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-burnt-orange/10 text-burnt-orange font-bold border border-burnt-orange/20 text-[8px] tracking-wider">
                          ACTIVE // SECURED
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 my-2.5 text-center">
                        <div className="bg-card-white p-2 rounded border border-border-cream flex flex-col gap-1">
                          <span className="text-muted/60 text-[8px] font-semibold">SECURITY</span>
                          <span className="font-bold text-burnt-orange">100% PASS</span>
                        </div>
                        <div className="bg-card-white p-2 rounded border border-border-cream flex flex-col gap-1">
                          <span className="text-muted/60 text-[8px] font-semibold">APPROVAL</span>
                          <span className="font-bold text-deep-black">COMPLETED</span>
                        </div>
                        <div className="bg-card-white p-2 rounded border border-border-cream flex flex-col gap-1">
                          <span className="text-muted/60 text-[8px] font-semibold">LOGINS</span>
                          <span className="font-bold text-secondary-gray">FEDERATED</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-card-white p-2 rounded border border-border-cream">
                        <span className="text-secondary-gray text-[8px] font-semibold">INTELLIGENT COMPLIANCE ENGINE</span>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange animate-pulse" />
                          <span className="text-[8px] text-burnt-orange italic">Auditing telemetry logs</span>
                        </div>
                      </div>
                    </div>
                  ) : project.imageMockup === 'taqa' ? (
                    // TAQA Water solutions compliance pH monitoring
                    <div className="h-full w-full flex flex-col justify-between text-deep-black text-[10px]">
                      <div className="flex justify-between items-center border-b border-border-cream pb-2">
                        <div className="flex items-center gap-1.5 font-bold text-burnt-orange">
                          <Activity size={14} className="animate-pulse" />
                          <span className="tracking-wide">TAQA_COMPLIANCE_METER</span>
                        </div>
                        <span className="text-secondary-gray font-bold text-[8px] tracking-wider uppercase">NOMINAL METRICS</span>
                      </div>

                      {/* Redesigned solid color minimalist bar charts */}
                      <div className="flex items-end justify-between h-20 px-2 my-1">
                        {[40, 75, 55, 90, 60, 45, 80, 95, 65, 85, 50, 75, 90].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [`${h - 10}%`, `${h + 3}%`, `${h - 10}%`] }}
                            transition={{ repeat: Infinity, duration: 1.8 + (i * 0.1), ease: "easeInOut" }}
                            className={`w-[5%] rounded-t-sm ${i % 3 === 0
                                ? 'bg-burnt-orange'
                                : 'bg-secondary-gray'
                              }`}
                          />
                        ))}
                      </div>

                      <div className="flex justify-between text-muted/80 pt-2 border-t border-border-cream text-[8px] font-semibold">
                        <span>pH SCALE: 7.35 [SECURE]</span>
                        <span>TURBIDITY: 0.12 NTU</span>
                        <span>RATE: 124 L/S</span>
                      </div>
                    </div>
                  ) : (
                    // High-end visual telemetry default card
                    <div className="h-full w-full flex flex-col justify-between text-deep-black text-[10px]">
                      <div className="flex justify-between items-center border-b border-border-cream pb-2">
                        <div className="flex items-center gap-1.5 font-bold text-burnt-orange">
                          <Cpu size={14} />
                          <span className="tracking-wide">SYSTEM_TELEMETRY_NODE</span>
                        </div>
                        <span className="text-burnt-orange font-bold text-[8px] tracking-wider">ONLINE</span>
                      </div>

                      <div className="my-2 p-2.5 bg-card-white rounded border border-border-cream space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted/60 text-[8px]">API ENDPOINT GATEWAY</span>
                          <span className="font-bold text-burnt-orange">200 OK</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted/60 text-[8px]">COMPILATION SPEED</span>
                          <span className="font-bold text-deep-black">42ms [STABLE]</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted/60 text-[8px]">REDUX STATE CACHE</span>
                          <span className="font-bold text-secondary-gray font-mono">RTK CONNECTED</span>
                        </div>
                      </div>

                      <div className="text-[8px] text-muted/40 text-center uppercase tracking-wider font-bold">
                        SECURE INTEGRATED DATABASES ACTIVE
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-2">
                <MagneticButton>
                  <button
                    onClick={() => handleExamineClick(project._id)}
                    className="px-6 py-3 bg-deep-black text-cream hover:bg-burnt-orange font-bold uppercase tracking-wider text-[10px] rounded-full flex items-center gap-2.5 transition-all duration-300"
                  >
                    Examine Case Study <ArrowRight size={12} className="text-cream" />
                  </button>
                </MagneticButton>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Details Slide Drawer Panel */}
      <AnimatePresence>
        {selectedProject && activeProject && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-[60] bg-deep-black/30 backdrop-blur-sm"
            />

            {/* Centered Modal Container */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="w-full max-w-4xl max-h-[90vh] bg-cream border border-border-cream rounded-2xl shadow-2xl p-6 md:p-12 overflow-y-auto bg-noise text-left pointer-events-auto"
              >
              <div className="relative z-10 flex flex-col min-h-full justify-between">
                <div>
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-border-cream/80">
                    <div className="flex items-center gap-2 font-sans text-[10px] uppercase font-bold text-burnt-orange tracking-wider">
                      <Award size={14} />
                      <span>CASE DOSSIER DETAILS</span>
                    </div>
                    <MagneticButton>
                      <button
                        onClick={handleCloseModal}
                        className="p-3 border border-border-cream rounded-full text-secondary-gray hover:text-burnt-orange hover:bg-card-white focus:outline-none transition-all"
                        aria-label="Close case study details"
                      >
                        <X size={16} />
                      </button>
                    </MagneticButton>
                  </div>

                  {/* Project Meta */}
                  <span className="px-3.5 py-1.5 rounded-lg bg-card-white text-[10px] font-semibold uppercase tracking-wider text-burnt-orange border border-border-cream mb-6 inline-block">
                    {activeProject.category}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-display font-light text-deep-black mb-2">
                    {activeProject.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted mb-10">{activeProject.subtitle}</p>

                  {/* Case Study Details Content */}
                  <div className="space-y-10 font-sans">

                    {/* Challenge */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange">01 // THE CHALLENGE</span>
                      <p className="md:col-span-3 text-sm text-body leading-relaxed font-light">
                        {activeProject.specs.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange">02 // THE SOLUTION</span>
                      <p className="md:col-span-3 text-sm text-body leading-relaxed font-light">
                        {activeProject.specs.solution}
                      </p>
                    </div>

                    {/* Architecture */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange">03 // ARCHITECTURE</span>
                      <div className="md:col-span-3 text-xs md:text-sm text-deep-black leading-relaxed font-mono bg-card-white p-5 rounded-xl border border-border-cream shadow-inner relative overflow-hidden">
                        <div className="absolute top-2 right-3 text-[8px] text-muted/40 uppercase tracking-widest font-bold font-sans">STRUCTURE DEPLOYMENT</div>
                        <span className="whitespace-pre-line leading-relaxed block">{activeProject.specs.architecture}</span>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange">04 // OPTIMIZATIONS</span>
                      <p className="md:col-span-3 text-sm text-body leading-relaxed font-light">
                        {activeProject.specs.performance}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange">05 // IMPACT</span>
                      <p className="md:col-span-3 text-sm text-body leading-relaxed font-light">
                        {activeProject.specs.impact}
                      </p>
                    </div>

                    {/* Tech Stack used */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-b border-border-cream/80 py-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange">06 // STACK DETAILS</span>
                      <div className="md:col-span-3 flex flex-wrap gap-2">
                        {activeProject.specs.tech.map((t: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-card-white border border-border-cream text-[10px] font-mono uppercase tracking-wider text-secondary-gray rounded-md hover:border-burnt-orange hover:text-burnt-orange transition-colors cursor-default"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom bar */}
                <div className="flex justify-between items-center pt-8 mt-12 border-t border-border-cream/80 text-[10px] font-sans text-muted/60">
                  <span>Sodanapalli Rahul</span>
                  <span>CONFIDENTIAL</span>
                </div>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
