import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, X, ArrowRight, ShieldCheck, Activity, Award, Cpu } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import MagneticButton from '../components/MagneticButton';

export default function FeaturedProjects() {
  const { selectedProject, setSelectedProject, projects } = useStore();

  const activeProject = projects.find(p => p.id === selectedProject);

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-32 bg-cream-light text-center px-6">
        <h2 className="text-2xl font-light text-luxury-black mb-4">Featured Case Studies</h2>
        <p className="text-xs text-luxury-charcoal/50">No projects added yet. Open the Admin Console to build new dynamic cards!</p>
      </section>
    );
  }

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-32 bg-cream-light border-b border-luxury-black/[0.03] px-6 md:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Title */}
        <div className="mb-20 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <LayoutGrid size={16} className="text-luxury-gold" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60">
              Selected Works
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-luxury-black font-sans">
            Featured <span className="font-serif italic text-luxury-gold font-normal">Case Studies</span>
          </h2>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className="group flex flex-col justify-between bg-cream border border-luxury-black/[0.03] rounded-3xl p-8 shadow-luxury relative overflow-hidden"
            >
              <div>
                {/* Visual Category Pill */}
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 rounded-full bg-luxury-gold/10 text-[9px] font-bold uppercase tracking-wider text-luxury-gold border border-luxury-gold/25">
                    {project.category}
                  </span>
                  <span className="text-xs font-medium text-luxury-charcoal/40 font-mono">
                    {String(index + 1).padStart(2, '0')} // {project.imageMockup.toUpperCase()}
                  </span>
                </div>

                {/* Typography Header */}
                <h3 className="text-2xl font-light tracking-tight text-luxury-black mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs uppercase tracking-widest font-bold text-luxury-charcoal/50 mb-6">{project.subtitle}</p>
                <p className="text-xs md:text-sm text-luxury-charcoal/60 leading-relaxed font-normal mb-8 max-w-lg">
                  {project.desc}
                </p>

                {/* Dynamic Dashboards */}
                <div className="w-full h-48 bg-cream-dark/30 rounded-2xl border border-luxury-black/[0.04] p-4 flex flex-col justify-between relative overflow-hidden mb-8 shadow-inner">
                  {project.imageMockup === 'doe' ? (
                    // Department of Energy Dashboard Mockup
                    <div className="h-full w-full flex flex-col justify-between text-luxury-black font-mono text-[9px]">
                      <div className="flex justify-between items-center border-b border-luxury-black/5 pb-2">
                        <div className="flex items-center gap-1.5 font-bold">
                          <ShieldCheck size={12} className="text-luxury-gold" />
                          <span>DOE regulatory-gate v3.4</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-700 font-bold border border-green-500/20 animate-pulse">ACTIVE // SECURE</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 my-2.5">
                        <div className="bg-cream p-2 rounded border border-luxury-black/[0.03] flex flex-col gap-1">
                          <span className="text-luxury-charcoal/50">ENGINEER STATUS</span>
                          <span className="font-bold text-luxury-black">100% SUBMITTED</span>
                        </div>
                        <div className="bg-cream p-2 rounded border border-luxury-black/[0.03] flex flex-col gap-1">
                          <span className="text-luxury-charcoal/50">SECTION HEAD</span>
                          <span className="font-bold text-luxury-gold">PENDING APPROVAL</span>
                        </div>
                        <div className="bg-cream p-2 rounded border border-luxury-black/[0.03] flex flex-col gap-1">
                          <span className="text-luxury-charcoal/50">DIRECTOR RELEASE</span>
                          <span className="font-bold text-luxury-charcoal/30">WAITING STAGE 1</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-cream p-2 rounded border border-luxury-black/[0.03]">
                        <span>INTEGRATED GPT-4 ASSISTANT</span>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-ping" />
                          <span className="text-[8px] text-luxury-charcoal/60 italic font-sans">"Validating compliance checklist..."</span>
                        </div>
                      </div>
                    </div>
                  ) : project.imageMockup === 'taqa' ? (
                    // TAQA Compliance Dashboard Mockup
                    <div className="h-full w-full flex flex-col justify-between text-luxury-black font-mono text-[9px]">
                      <div className="flex justify-between items-center border-b border-luxury-black/5 pb-2">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Activity size={12} className="text-luxury-gold animate-pulse" />
                          <span>TAQA telemetry-node-09</span>
                        </div>
                        <span className="text-luxury-charcoal/50 font-bold">COMPLIANCE NOMINAL</span>
                      </div>

                      <div className="flex items-end justify-between h-20 px-2 my-1">
                        {[40, 75, 55, 90, 60, 45, 80, 95, 65, 85, 50, 75, 90].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [`${h - 10}%`, `${h + 5}%`, `${h - 10}%`] }}
                            transition={{ repeat: Infinity, duration: 1.5 + (i * 0.1), ease: "easeInOut" }}
                            className={`w-[6%] rounded-t-sm ${i % 3 === 0 ? 'bg-luxury-gold' : 'bg-luxury-black/70'}`}
                          />
                        ))}
                      </div>

                      <div className="flex justify-between text-luxury-charcoal/50 pt-2 border-t border-luxury-black/5">
                        <span>pH INDEX: 7.35 [NORMAL]</span>
                        <span>TURBIDITY: 0.12 NTU</span>
                        <span>FLOW: 124 L/S</span>
                      </div>
                    </div>
                  ) : (
                    // 🧠 Premium Default Generic Mockup for newly created custom projects
                    <div className="h-full w-full flex flex-col justify-between text-luxury-black font-mono text-[9px]">
                      <div className="flex justify-between items-center border-b border-luxury-black/5 pb-2">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Cpu size={12} className="text-luxury-gold animate-spin" />
                          <span>API node-orchestrator.ts</span>
                        </div>
                        <span className="text-luxury-gold font-bold animate-pulse">REST TELEMETRY // ONLINE</span>
                      </div>

                      <div className="my-2 p-2 bg-cream rounded border border-luxury-black/[0.03] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-luxury-charcoal/50">SERVER NODE STATUS</span>
                          <span className="font-bold text-green-600">200 OK</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-luxury-charcoal/50">TRANSLATION DELAY</span>
                          <span className="font-bold text-luxury-black">42ms [VERY FAST]</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-luxury-charcoal/50">DATABASE DRIVER</span>
                          <span className="font-bold text-luxury-gold">ZUSTAND SECURE STORE</span>
                        </div>
                      </div>

                      <div className="text-[8px] text-luxury-charcoal/40 text-center uppercase tracking-widest font-bold italic">
                        Real-time admin records active
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-2">
                <MagneticButton>
                  <button
                    onClick={() => setSelectedProject(project.id)}
                    className="px-6 py-3 border border-luxury-black/10 hover:border-luxury-black/30 font-semibold uppercase tracking-widest text-[10px] rounded-full flex items-center gap-2.5 transition-all duration-300 text-luxury-charcoal hover:bg-cream-dark/15 interactive"
                  >
                    Examine Case Study <ArrowRight size={12} className="text-luxury-gold" />
                  </button>
                </MagneticButton>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/40 backdrop-blur-md p-4 md:p-6"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] bg-cream rounded-[32px] p-6 md:p-12 overflow-y-auto shadow-2xl flex flex-col justify-between border border-luxury-black/5 scrollbar-thin"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-luxury-black/5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-luxury-charcoal/50">
                    <Award size={14} className="text-luxury-gold" />
                    <span>Detailed Technical Specs</span>
                  </div>
                  <MagneticButton>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="p-3 border border-luxury-black/10 rounded-full text-luxury-charcoal hover:text-luxury-black hover:bg-cream-dark/20 focus:outline-none transition-all interactive"
                      aria-label="Close case study details"
                    >
                      <X size={18} />
                    </button>
                  </MagneticButton>
                </div>

                <span className="px-3 py-1 rounded-full bg-luxury-gold/10 text-[9px] font-bold uppercase tracking-wider text-luxury-gold border border-luxury-gold/25 mb-4 inline-block">
                  {activeProject.category}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-light tracking-tight text-luxury-black mb-1 font-sans">
                  {activeProject.title}
                </h3>
                <p className="text-xs uppercase tracking-widest font-bold text-luxury-charcoal/50 mb-8">{activeProject.subtitle}</p>

                {/* Case Study Specs Sections Grid */}
                <div className="space-y-8 my-10 font-sans">
                  
                  {/* Challenge */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-luxury-black/5 pt-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold">01 // The Challenge</span>
                    <p className="md:col-span-3 text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-normal">
                      {activeProject.specs.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-luxury-black/5 pt-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold">02 // The Solution</span>
                    <p className="md:col-span-3 text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-normal">
                      {activeProject.specs.solution}
                    </p>
                  </div>

                  {/* Architecture */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-luxury-black/5 pt-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold">03 // Architecture</span>
                    <p className="md:col-span-3 text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-normal font-mono bg-cream-dark/30 p-4 rounded-xl border border-luxury-black/[0.04]">
                      {activeProject.specs.architecture}
                    </p>
                  </div>

                  {/* Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-luxury-black/5 pt-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold">04 // Performance Tuning</span>
                    <p className="md:col-span-3 text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-normal">
                      {activeProject.specs.performance}
                    </p>
                  </div>

                  {/* Impact */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-luxury-black/5 pt-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold">05 // Business Impact</span>
                    <p className="md:col-span-3 text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-normal">
                      {activeProject.specs.impact}
                    </p>
                  </div>

                  {/* Tech Stack used */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-b border-luxury-black/5 py-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold">06 // Technical Stack</span>
                    <div className="md:col-span-3 flex flex-wrap gap-2">
                      {activeProject.specs.tech.map((t, idx) => (
                        <span 
                          key={idx} 
                          className="px-3.5 py-1.5 bg-cream-dark/50 border border-luxury-black/[0.05] text-[10px] uppercase font-bold tracking-wider text-luxury-black rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex justify-between items-center pt-8 mt-12 border-t border-luxury-black/5 text-[10px] font-mono text-luxury-charcoal/50">
                <span>REVOLUTIONIZING UTILITY UX</span>
                <span>© RAHUL.DEV</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
