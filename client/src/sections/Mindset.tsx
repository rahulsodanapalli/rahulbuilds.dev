import { motion } from 'framer-motion';
import { Eye, ShieldAlert, Sliders, Milestone, Compass } from 'lucide-react';

const MINDSETS = [
  {
    icon: <Sliders size={20} />,
    title: "Performance Excellence",
    desc: "Rigorous attention to sub-1.5 second initial load paint cycles. Keeping layouts completely layout-shift-free (CLS) and executing smooth, hardware-accelerated animations at continuous 60fps.",
    metrics: "INITIAL PAINT < 1.2S // 60FPS STABLE"
  },
  {
    icon: <Eye size={20} />,
    title: "Accessibility Standards",
    desc: "Achieving a flawless 100/100 score in Lighthouse compliance. Implementing robust keyboard focus loops, semantic HTML5 structures, and comprehensive WAI-ARIA descriptions.",
    metrics: "100% LIGHTHOUSE A11Y // ARIA_MAPPED"
  },
  {
    icon: <Milestone size={20} />,
    title: "Enterprise Decoupling",
    desc: "Structuring decoupled, highly-scalable global caches and async pipelines with RTK Query and Zustand. Creating dry, custom frontend templates designed for high-load operations.",
    metrics: "DECOUPLED CACHE // REDUX_ACTIVE"
  },
  {
    icon: <Compass size={20} />,
    title: "Developer Efficiency",
    desc: "Leveraging structured AI codeflows, static typings, and automated build pipelines to deliver clean, modern codebases that facilitate immediate developer onboarding.",
    metrics: "STATIC TYPES // AI_PIPELINE_READY"
  },
  {
    icon: <ShieldAlert size={20} />,
    title: "Strict Payload Safety",
    desc: "Validating client payload contracts via strict Zod schemas, enforcing sanitized API parameters, and establishing secure password-protected administrator gateways.",
    metrics: "ZOD SCHEMAS // SECURE GATEWAY"
  }
];

export default function Mindset() {
  return (
    <section
      id="mindset"
      className="relative min-h-screen py-32 bg-cream border-b border-border-cream overflow-hidden px-6 md:px-12 flex items-center bg-noise"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Section Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans">
              ENGINEERING CORE VALUES
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black mb-6">
            Architectural <span className="italic font-normal text-burnt-orange">Mindset</span>
          </h2>
          <p className="text-sm md:text-base text-body font-sans font-light leading-relaxed">
            The values, strict coding conventions, and optimization goals applied to every software deployment in our pipeline.
          </p>
        </div>

        {/* Mindset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINDSETS.map((item, idx) => {
            const isFullWidth = idx === MINDSETS.length - 1;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                className={`p-8 md:p-10 rounded-2xl bg-card-white border border-border-cream flex flex-col justify-between hover:scale-[1.015] hover:shadow-minimal-hover hover:border-burnt-orange/20 transition-all duration-500 group relative overflow-hidden text-left ${isFullWidth ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-cream/60">
                    <div className="p-3 bg-cream rounded-xl text-burnt-orange shrink-0 group-hover:bg-burnt-orange group-hover:text-cream transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-sans text-muted/50 font-semibold uppercase tracking-wider">
                      VALUE_0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-semibold text-deep-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-body leading-relaxed font-sans font-light mb-8">
                    {item.desc}
                  </p>
                </div>

                <div className="bg-cream/40 border border-border-cream/80 p-3.5 rounded-xl text-[9px] font-mono text-burnt-orange uppercase tracking-wider font-bold text-center">
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
