import { motion } from 'framer-motion';
import { Shield, Sparkles, Zap, Cpu } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: <Cpu className="text-luxury-gold" size={20} />,
    title: "AI Integration",
    desc: "Seamless integration of secure, contextual LLM chat interfaces into complex enterprise dashboards."
  },
  {
    icon: <Zap className="text-luxury-gold" size={20} />,
    title: "Performance Focus",
    desc: "Delivering a 30% reduction in initial paint cycles through code splitting and tree shaking."
  },
  {
    icon: <Shield className="text-luxury-gold" size={20} />,
    title: "Government Portal Standards",
    desc: "Vast experience architecting compliant systems with rigorous RBAC access gates for UAE ministries."
  },
];

const METRICS = [
  { value: "2+", label: "Years Experience" },
  { value: "30%", label: "Load Time Reduction" },
  { value: "3+", label: "Enterprise Deployments" },
  { value: "100%", label: "Responsive Layouts" },
];

export default function About() {
  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full py-32 bg-cream-light border-y border-luxury-black/[0.03] overflow-hidden px-6 md:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Typographic Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles size={16} className="text-luxury-gold" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60">
              The Storytelling
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-3xl md:text-5xl font-light tracking-tight text-luxury-black leading-[1.2] mb-8 font-sans"
          >
            Crafting beautiful, accessible <br />
            <span className="font-serif italic text-luxury-gold font-normal">government-grade</span> digital systems.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6 text-luxury-charcoal/70 text-sm md:text-base leading-relaxed max-w-xl font-normal"
          >
            <p>
              I am a Frontend Engineer dedicated to the art of "Vibe Coding" — fusing sophisticated, high-end motion choreography with strict enterprise architectural integrity. My code serves critical, real-world utility frameworks, from permit workflow platforms for the Abu Dhabi Department of Energy (DoE) to compliance dashboards for TAQA Water Solutions.
            </p>
            <p>
              Specializing in React, TypeScript, and state architectures like Redux Toolkit & Zustand, I focus heavily on bundle optimization, dynamic micro-animations, and cutting-edge AI integrations. I design with accessibility (WCAG) and security first, yielding beautiful UX that stands the test of heavy user compliance.
            </p>
          </motion.div>

          {/* Metric Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-luxury-black/5 pt-12">
            {METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-3xl md:text-4xl font-serif text-luxury-gold mb-1.5">{metric.value}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-luxury-charcoal/50">{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Value Cards Infographic */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -5, boxShadow: "var(--shadow-luxury-hover)" }}
              className="p-6 rounded-2xl bg-cream border border-luxury-black/[0.03] shadow-luxury transition-all duration-300 flex items-start gap-5 hover:bg-cream-light/60"
            >
              <div className="p-3 bg-cream-light border border-luxury-black/5 rounded-xl block shadow-luxury shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-black">{item.title}</h3>
                <p className="text-xs md:text-sm text-luxury-charcoal/60 leading-relaxed font-normal">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
