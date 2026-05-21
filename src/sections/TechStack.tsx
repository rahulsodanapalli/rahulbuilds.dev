import { motion } from 'framer-motion';
import { Layers, Command, CircleDot, Workflow, Activity, Cpu } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const CATEGORIES = [
  {
    title: "Frontend Core",
    icon: <Layers size={16} className="text-luxury-gold" />,
    skills: ["React.js", "TypeScript", "Next.js", "JavaScript ES6+", "HTML5 / CSS3"],
    desc: "Crafting highly modular component architecture using strict type safety and semantic layers."
  },
  {
    title: "State Management",
    icon: <CircleDot size={16} className="text-luxury-gold" />,
    skills: ["Redux Toolkit", "RTK Query", "Zustand", "Context API"],
    desc: "Orchestrating scalable global caches, client pipelines, and optimized asynchronous data layers."
  },
  {
    title: "Forms & Schema",
    icon: <Command size={16} className="text-luxury-gold" />,
    skills: ["React Hook Form", "Zod Validators", "MUI Form Controllers", "Asynchronous validators"],
    desc: "Building dynamic multi-step permit workflows with detailed client-side schema parsing."
  },
  {
    title: "Data Viz & Charts",
    icon: <Activity size={16} className="text-luxury-gold" />,
    skills: ["Recharts", "ApexCharts", "Interactive Telemetry", "High-Density grids"],
    desc: "Transforming dense regulatory water indexes and stats into gorgeous, smooth canvas visuals."
  },
  {
    title: "Performance tuning",
    icon: <Workflow size={16} className="text-luxury-gold" />,
    skills: ["Code Splitting", "Vite Bundler", "Dynamic Imports", "Ref Re-renders optimization"],
    desc: "Achieving a 30% reduction in initial paint cycles and rock-solid 60fps scrolling states."
  },
  {
    title: "AI Tools & Workflow",
    icon: <Cpu size={16} className="text-luxury-gold" />,
    skills: ["LLM REST Integrations", "Cursor AI Workflow", "Production Chat Agents", "Prompt Engineering"],
    desc: "Integrating secure chat assistants into operational systems to guide technical user entries."
  }
];

// Helper to get gentle float orbit parameters based on card index
const getFloatTransition = (index: number) => ({
  y: {
    duration: 3 + (index % 3) * 0.8,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  },
  x: {
    duration: 4 + (index % 2) * 1.2,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  }
}) as any;

export default function TechStack() {
  return (
    <section 
      id="tech" 
      className="relative min-h-screen py-32 bg-cream overflow-hidden px-6 md:px-12 flex items-center"
    >
      {/* Floating orbital glow rings in background */}
      <div className="absolute w-[800px] h-[800px] rounded-full border border-luxury-black/[0.02] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0" />
      <div className="absolute w-[500px] h-[500px] rounded-full border border-luxury-black/[0.015] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Workflow size={16} className="text-luxury-gold" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60">
              The Engineering Ecosystem
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-luxury-black font-sans">
            Technical <span className="font-serif italic text-luxury-gold font-normal">Armament</span> & Stack
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: catIdx * 0.08 }}
              className="p-8 rounded-3xl bg-cream-light/60 border border-luxury-black/[0.03] shadow-luxury flex flex-col justify-between hover:bg-cream-light hover:border-luxury-gold/20 transition-all duration-500"
            >
              <div>
                {/* Header: Title + Icon */}
                <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-luxury-black/5">
                  <div className="p-2.5 bg-cream border border-luxury-black/5 rounded-xl shadow-luxury">
                    {category.icon}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-luxury-black">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-normal mb-8 min-h-[40px]">
                  {category.desc}
                </p>
              </div>

              {/* Skills Chips - Floating Orbitals */}
              <div className="flex flex-wrap gap-2.5 mt-auto">
                {category.skills.map((skill, skillIdx) => (
                  <MagneticButton key={skillIdx}>
                    <motion.span
                      animate={{
                        y: [0, -4, 0],
                        x: [0, 2, 0]
                      }}
                      transition={getFloatTransition(catIdx + skillIdx)}
                      className="px-3.5 py-2 text-[10px] uppercase font-bold tracking-wider rounded-xl bg-cream border border-luxury-black/[0.03] text-luxury-charcoal shadow-luxury block hover:bg-luxury-black hover:text-cream hover:border-luxury-black transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  </MagneticButton>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
