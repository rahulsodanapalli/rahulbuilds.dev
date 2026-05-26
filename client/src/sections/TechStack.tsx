import { motion } from 'framer-motion';
import { Layers, Command, CircleDot, Workflow, Activity, Cpu } from 'lucide-react';
import MagneticButton from '../components/common/MagneticButton';
import { useGetSkillsQuery } from '../services/api/skillsApi';
import type { SkillItem } from '../types/skill.types';

const CATEGORY_META: Record<string, { icon: React.ReactNode; desc: string }> = {
  "Frontend Core": {
    icon: <Layers size={18} className="text-burnt-orange" />,
    desc: "Architecting modular, responsive layouts with strict TS typings, clean interface contracts, and robust state models."
  },
  "State Management": {
    icon: <CircleDot size={18} className="text-burnt-orange" />,
    desc: "Orchestrating scalable global caches, asynchronous state pipelines, and RTK Query synchronization."
  },
  "Forms & Schema": {
    icon: <Command size={18} className="text-burnt-orange" />,
    desc: "Framer-enhanced layouts utilizing rigorous Zod schemas and React Hook Form validation checks."
  },
  "Data Viz & Charts": {
    icon: <Activity size={18} className="text-burnt-orange" />,
    desc: "Beautiful custom telemetry charts, interactive data flows, and real-time monitoring canvases."
  },
  "Performance tuning": {
    icon: <Workflow size={18} className="text-burnt-orange" />,
    desc: "Rigorous attention to sub-1.5s paint times, 100% Lighthouse targets, and zero layout shift metrics."
  },
  "AI Tools & Workflow": {
    icon: <Cpu size={18} className="text-burnt-orange" />,
    desc: "Integrating contextual chat pipelines, dynamic completions, and secure LLM routing mechanisms."
  }
};

export default function TechStack() {
  const { data: skills = [], isLoading } = useGetSkillsQuery();

  // Group skills dynamically
  const groupedSkills = skills.reduce((acc: Record<string, string[]>, skill: SkillItem) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const categories = Object.keys(groupedSkills).map((catName) => {
    const meta = CATEGORY_META[catName] || {
      icon: <Workflow size={18} className="text-burnt-orange" />,
      desc: `Advanced configurations and professional systems implementation inside ${catName}.`
    };
    return {
      title: catName,
      icon: meta.icon,
      skills: groupedSkills[catName],
      desc: meta.desc
    };
  });

  if (isLoading) {
    return (
      <section id="tech" className="py-32 bg-cream text-center px-6 min-h-[60vh] flex items-center justify-center bg-noise">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-2 border-burnt-orange/20 border-t-burnt-orange rounded-full animate-spin" />
          <span className="text-xs font-medium tracking-widest text-muted font-sans">Compiling technical capabilities...</span>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section id="tech" className="py-32 bg-cream text-center px-6 min-h-[50vh] flex items-center justify-center bg-noise">
        <div className="max-w-md border border-border-cream bg-card-white p-8 rounded-2xl shadow-minimal">
          <h2 className="text-2xl font-display font-light text-deep-black mb-4">Technical Stack</h2>
          <p className="text-sm text-muted leading-relaxed font-sans font-light">
            No capabilities loaded yet. Please configure the technical stack in the Admin Control Console.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="tech" 
      className="relative min-h-screen py-32 bg-cream overflow-hidden px-6 md:px-12 flex items-center bg-noise"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans">
              ENGINEERING NODES & SYSTEMS
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black mb-6">
            Technical <span className="italic font-normal text-burnt-orange">Armament</span>
          </h2>
          <p className="text-sm md:text-base text-body font-sans font-light leading-relaxed">
            A curated suite of architectures, frameworks, and optimization tools engineered to construct resilient, enterprise-grade digital products.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, catIdx) => {
            const simulatedLoad = (85 + catIdx * 3) % 100;
            // Bento grid rules: make specific index cards occupy 2 columns for asymmetric visual elegance
            const isLargeCard = catIdx === 0 || catIdx === 3 || catIdx === 5;
            const gridClass = isLargeCard ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: catIdx * 0.05 }}
                className={`${gridClass} p-8 md:p-10 rounded-2xl bg-card-white border border-border-cream flex flex-col justify-between hover:scale-[1.015] hover:shadow-minimal-hover transition-all duration-500 relative overflow-hidden text-left group`}
              >
                <div>
                  {/* Card Header: Icon + Category Title */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-cream/60">
                    <div className="p-3 bg-cream rounded-xl border border-border-cream/80 text-burnt-orange group-hover:bg-burnt-orange group-hover:text-cream transition-colors duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-sm font-display font-semibold tracking-wider uppercase text-deep-black">
                      {category.title}
                    </h3>
                  </div>

                  {/* Clean solid capability meter */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted/80 mt-1 mb-2">
                    <span className="tracking-wider uppercase font-sans font-medium text-[9px]">CAPABILITY INDEX</span>
                    <span className="text-burnt-orange font-bold text-xs">{simulatedLoad}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-border-cream/40 rounded-full overflow-hidden mb-6">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${simulatedLoad}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-burnt-orange rounded-full"
                    />
                  </div>

                  <p className="text-xs md:text-sm text-body leading-relaxed font-sans font-light mb-8">
                    {category.desc}
                  </p>
                </div>

                {/* Skills Chips - Minimal luxury styling */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill: string, skillIdx: number) => (
                    <MagneticButton key={skillIdx}>
                      <motion.span
                        whileHover={{ scale: 1.03 }}
                        className="px-3.5 py-1.5 text-[10px] font-sans font-medium uppercase tracking-wider rounded-lg bg-cream/40 border border-border-cream/80 text-secondary-gray hover:text-burnt-orange hover:border-burnt-orange hover:bg-card-white transition-all duration-300 block"
                      >
                        {skill}
                      </motion.span>
                    </MagneticButton>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
