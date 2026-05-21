import { motion } from 'framer-motion';
import { Eye, ShieldAlert, Award, Sliders, Milestone, Compass } from 'lucide-react';

const MINDSETS = [
  {
    icon: <Sliders className="text-luxury-gold" size={22} />,
    title: "100% Performance",
    desc: "Rigorous attention to sub-1.5 second initial load states. Keeping layouts shifted-free (CLS) and executing smooth, hardware-accelerated animations at continuous 60fps.",
    metrics: "Initial paint < 1.2s // 60fps render"
  },
  {
    icon: <Eye className="text-luxury-gold" size={22} />,
    title: "Accessibility (WCAG)",
    desc: "Achieving a flawless 100 score in Lighthouse audits. Implementing robust keyboard navigation, semantic HTML5 blocks, and accurate ARIA indicators.",
    metrics: "100% Lighthouse A11y // Screen Reader friendly"
  },
  {
    icon: <Milestone className="text-luxury-gold" size={22} />,
    title: "Enterprise Scalability",
    desc: "Structuring clean global state pipelines and caches using RTK Query and Zustand. Designing dynamic components to withstand high-volume agency requirements.",
    metrics: "Granular RBAC systems // Unified state cache"
  },
  {
    icon: <Compass className="text-luxury-gold" size={22} />,
    title: "Developer Experience (DX)",
    desc: "Harnessing Cursor AI workflows and robust TypeScript structures to build self-documenting, clean codebases that facilitate seamless team handovers.",
    metrics: "Self-documenting TypeScript // Cursor optimized"
  },
  {
    icon: <ShieldAlert className="text-luxury-gold" size={22} />,
    title: "Rigorous Security",
    desc: "Validating client-side user entries via Zod schemas, enforcing sanitized API parameters, and establishing secure routing gates across portals.",
    metrics: "Zod Schema validation // Granular gates"
  }
];

export default function Mindset() {
  return (
    <section 
      id="mindset" 
      className="relative min-h-screen py-32 bg-cream-light border-y border-luxury-black/[0.03] overflow-hidden px-6 md:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award size={16} className="text-luxury-gold" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60">
              The Philosophy
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-luxury-black font-sans">
            Engineering <span className="font-serif italic text-luxury-gold font-normal">Mindset</span> & Values
          </h2>
        </div>

        {/* Mindset Cards Grid - Cascading stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MINDSETS.map((item, idx) => {
            const isFullWidth = idx === MINDSETS.length - 1;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.12 }}
                whileHover={{ y: -6, boxShadow: "var(--shadow-luxury-hover)" }}
                className={`p-8 rounded-3xl bg-cream border border-luxury-black/[0.03] shadow-luxury transition-all duration-300 flex flex-col justify-between hover:bg-cream-light/40 group ${
                  isFullWidth ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-luxury-black/5">
                    <div className="p-3 bg-cream-light border border-luxury-black/5 rounded-2xl shadow-luxury shrink-0 group-hover:scale-105 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-mono text-luxury-charcoal/30 font-bold uppercase">
                      0{idx + 1} // PARADIGM
                    </span>
                  </div>

                  <h3 className="text-base font-bold uppercase tracking-wider text-luxury-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-luxury-charcoal/60 leading-relaxed font-normal mb-8">
                    {item.desc}
                  </p>
                </div>

                <div className="bg-cream-dark/30 border border-luxury-black/[0.03] p-3.5 rounded-2xl text-[9px] md:text-[10px] font-mono text-luxury-gold uppercase tracking-wider font-bold">
                  {item.metrics}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
