import { motion } from 'framer-motion';
import { Shield, Sparkles, Zap, Cpu, Activity, Info } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: <Cpu className="text-burnt-orange" size={18} />,
    title: "AI Integration Modules",
    desc: "Developing secure, contextual LLM interfaces, custom agent workflows, and smart prompt routing engines for enterprise users."
  },
  {
    icon: <Zap className="text-burnt-orange" size={18} />,
    title: "High-Performance Speed Index",
    desc: "Enforcing aggressive bundle splitting, memoized rendering nodes, and layout shift prevention to guarantee sub-1.2s initial paint triggers."
  },
  {
    icon: <Shield className="text-burnt-orange" size={18} />,
    title: "Government-Grade Security",
    desc: "Architecting secure, fully accessible portals (WCAG & RBAC compliant) deployed across utility leaders and regulatory bodies."
  },
];

const METRICS = [
  { value: "02+", label: "Years Experience", percent: 85 },
  { value: "30%", label: "Latency Deficit", percent: 95 },
  { value: "03+", label: "Enterprise Projects", percent: 75 },
  { value: "100%", label: "Lighthouse Score", percent: 100 },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-32 bg-cream border-b border-border-cream/80 overflow-hidden px-6 md:px-12 flex items-center bg-noise"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* Left Column: Typographic Narrative & Editorial Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles size={12} className="text-burnt-orange animate-spin-slow" />
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-secondary-gray/80">
              SYSTEM PROFILE // THE ARCHITECT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-light tracking-tight text-deep-black leading-[1.2] mb-8"
          >
            Crafting beautiful, robust <br />
            <span className="font-serif italic text-burnt-orange font-normal">government-grade</span> frontend engines.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-body text-xs md:text-sm leading-relaxed max-w-xl font-normal font-sans"
          >
            <p>
              I am a Frontend Engineer dedicated to the art of <span className="text-deep-black font-semibold">"Vibe Coding"</span> — fusing highly optimized visual animations, micro-interactions, and premium motion choreography with strict enterprise-grade architectural patterns. My contributions power core regulatory portals for the Abu Dhabi Department of Energy (DoE) and compliance dashboards for TAQA Water Solutions.
            </p>
            <p>
              Specializing in React, TypeScript, and state management (Redux Toolkit, Zustand), my engineering focus centers on robust compilation systems, secure HttpOnly cookie setups, and seamless AI workflow tools. I develop accessible (WCAG compliant) software, yielding UI that remains extremely elegant under heavy operational use.
            </p>
          </motion.div>

          {/* Metric Stats Grid - Re-engineered HUD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 border-t border-border-cream/80 pt-12">
            {METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-start gap-1 p-4 bg-white border border-border-cream/50 rounded-2xl relative overflow-hidden shadow-minimal"
              >
                {/* Visual indicator dot */}
                <div className="absolute top-3.5 right-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange block animate-pulse" />
                </div>

                <span className="text-2xl md:text-3xl font-display font-bold text-deep-black pl-0.5">{metric.value}</span>
                <span className="text-[8px] uppercase tracking-wider font-display font-bold text-secondary-gray/60 mb-2">{metric.label}</span>

                {/* Horizontal dynamic loading meter */}
                <div className="w-full h-1 bg-cream rounded-full overflow-hidden mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="h-full bg-burnt-orange rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Value Cards Infographic */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-white border border-border-cream/80 transition-all duration-300 flex items-start gap-5 hover:border-burnt-orange/50 shadow-minimal hover:shadow-minimal-hover interactive"
            >
              <div className="p-3 bg-cream/40 border border-border-cream/60 rounded-xl block shrink-0 text-burnt-orange">
                {item.icon}
              </div>
              <div className="space-y-1.5 text-left">
                <h3 className="text-xs font-display font-bold uppercase tracking-wider text-deep-black flex items-center gap-1.5">
                  {item.title}
                  <Activity size={10} className="text-burnt-orange" />
                </h3>
                <p className="text-[11px] md:text-xs text-secondary-gray/80 leading-relaxed font-normal font-sans">{item.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Quick Info Decal block */}
          <div className="p-4 bg-white/40 border border-dashed border-border-cream rounded-2xl flex items-center gap-3 font-display text-[9px] text-secondary-gray/50 font-semibold leading-normal">
            <Info size={14} className="text-burnt-orange shrink-0" />
            <span className="text-left">
              ALL frontend parameters are performance checked, audited, and strictly WCAG compliant.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
