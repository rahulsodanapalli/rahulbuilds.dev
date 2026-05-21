import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles, Terminal, Activity, Layers, Cpu, ShieldCheck } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { useGetProjectsQuery } from '../api/projectsApi';
import { useGetSkillsQuery } from '../api/skillsApi';
import { useGetExperiencesQuery } from '../api/experienceApi';

const ROLES = [
  "Frontend Architect",
  "React Developer",
  "AI Integrations Developer",
  "Creative Engineer"
];

export default function Hero() {
  const { data: projects = [] } = useGetProjectsQuery();
  const { data: skills = [] } = useGetSkillsQuery();
  const { data: experiences = [] } = useGetExperiencesQuery();

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToProjects = () => {
    const lenis = (window as any).lenis;
    const target = document.getElementById('projects');
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    }
  };

  const handleScrollToContact = () => {
    const lenis = (window as any).lenis;
    const target = document.getElementById('contact');
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const nameLetters = "Rahul Sodanapalli".split("");

  return (
    <section 
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center bg-cream px-6 md:px-12 py-32 overflow-hidden bg-noise"
    >
      {/* Minimal background abstract floating outline shapes */}
      <div className="absolute top-1/4 left-10 w-48 h-48 border border-border-cream rounded-full pointer-events-none z-0 opacity-40 animate-float" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 border border-border-cream rounded-3xl pointer-events-none z-0 opacity-40 animate-float" style={{ animationDuration: '12s', rotate: '45deg' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: High-Impact Typography & Action CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Accent Pill */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 px-4 py-1.5 rounded-full bg-white border border-border-cream flex items-center gap-2 shadow-minimal"
          >
            <Sparkles size={11} className="text-burnt-orange animate-pulse" />
            <span className="text-[10px] uppercase font-display font-bold tracking-widest text-secondary-gray">
              Specialized Frontend Architect
            </span>
          </motion.div>

          {/* Large Editorial Name Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-light tracking-tight text-deep-black leading-[1.08] mb-6"
          >
            I am{" "}
            <span className="font-bold text-deep-black block md:inline font-display">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.04, duration: 0.4 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <br />
            Building{" "}
            <span className="font-serif italic font-normal text-burnt-orange">
              Enterprise
            </span>{" "}
            Architectures.
          </motion.h1>

          {/* Role Flip Switcher Panel */}
          <motion.div variants={itemVariants} className="h-10 mb-8 flex items-center overflow-hidden font-display">
            <span className="text-sm font-semibold tracking-widest uppercase text-secondary-gray mr-3">Role //</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl font-bold tracking-wider text-burnt-orange uppercase font-display"
              >
                {ROLES[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Subheadline description */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base font-sans font-normal text-secondary-gray max-w-xl leading-relaxed mb-10"
          >
            Crafting highly optimized, visually pristine, and responsive digital products with React, TypeScript, and AI integrations. Focused on luxury layouts and elite accessibility metrics.
          </motion.p>

          {/* Luxury Rounded CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <button 
                onClick={handleScrollToProjects}
                className="px-8 py-4 bg-deep-black text-white hover:bg-burnt-orange font-display font-semibold uppercase tracking-widest text-[10px] rounded-full flex items-center gap-3.5 transition-all duration-300 shadow-minimal hover:shadow-minimal-hover interactive"
              >
                Explore Works <ArrowRight size={12} className="text-white" />
              </button>
            </MagneticButton>

            <MagneticButton>
              <button 
                onClick={handleScrollToContact}
                className="px-8 py-4 border border-border-cream hover:border-burnt-orange hover:bg-white font-display font-semibold uppercase tracking-widest text-[10px] rounded-full flex items-center gap-2 transition-all duration-300 text-secondary-gray hover:text-deep-black bg-transparent shadow-minimal interactive"
              >
                Initiate Project
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Minimal Telemetry Console Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center z-10"
        >
          {/* Telemetry Console Minimal Frame */}
          <div className="w-full max-w-md rounded-[28px] bg-card-white border border-border-cream p-7 shadow-minimal hover:shadow-minimal-hover transition-all duration-500 flex flex-col justify-between select-none">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border-cream/80 mb-5">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-burnt-orange" />
                <span className="font-display text-[9px] uppercase tracking-widest text-secondary-gray font-bold">
                  Telemetry Console v4.0
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-border-cream" />
                <span className="w-2.5 h-2.5 rounded-full bg-burnt-orange/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-burnt-orange" />
              </div>
            </div>

            {/* Simulated compiler messages */}
            <div className="font-sans text-[10px] text-left text-secondary-gray/80 space-y-2.5 mb-6 leading-relaxed">
              <div className="flex items-center gap-2">
                <span className="text-burnt-orange font-bold">●</span>
                <span>SYSTEM DESIGN SYSTEM: MINIMALIST LUXURY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-burnt-orange font-bold">●</span>
                <span>INTEGRATION SCHEMA: STABLE MONGOOSE ORM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-burnt-orange font-bold">●</span>
                <span className="text-deep-black font-semibold">SECURITY: STRENGTHENED JWT & CORS ENGINE</span>
              </div>
              <div className="flex items-center gap-2 pl-4 border-l border-border-cream text-[9px] italic text-muted">
                <span>"Enforcing Credentials include parameter on all queries"</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3.5 border-t border-b border-border-cream/80 py-5 mb-5">
              <div className="bg-cream/40 border border-border-cream/50 p-3 rounded-2xl flex flex-col gap-1 items-start">
                <div className="flex items-center gap-1.5">
                  <Activity size={10} className="text-burnt-orange" />
                  <span className="text-[8px] font-display uppercase tracking-wider text-secondary-gray font-bold">Projects</span>
                </div>
                <span className="text-xl font-display font-bold text-deep-black">
                  {projects.length > 0 ? String(projects.length).padStart(2, '0') : '06'}
                </span>
              </div>

              <div className="bg-cream/40 border border-border-cream/50 p-3 rounded-2xl flex flex-col gap-1 items-start">
                <div className="flex items-center gap-1.5">
                  <Layers size={10} className="text-burnt-orange" />
                  <span className="text-[8px] font-display uppercase tracking-wider text-secondary-gray font-bold">Stack Modules</span>
                </div>
                <span className="text-xl font-display font-bold text-deep-black">
                  {skills.length > 0 ? String(skills.length).padStart(2, '0') : '24'}
                </span>
              </div>

              <div className="bg-cream/40 border border-border-cream/50 p-3 rounded-2xl flex flex-col gap-1 items-start">
                <div className="flex items-center gap-1.5">
                  <Cpu size={10} className="text-burnt-orange" />
                  <span className="text-[8px] font-display uppercase tracking-wider text-secondary-gray font-bold">Milestones</span>
                </div>
                <span className="text-xl font-display font-bold text-deep-black">
                  {experiences.length > 0 ? String(experiences.length).padStart(2, '0') : '03'}
                </span>
              </div>

              <div className="bg-cream/40 border border-border-cream/50 p-3 rounded-2xl flex flex-col gap-1 items-start">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={10} className="text-burnt-orange" />
                  <span className="text-[8px] font-display uppercase tracking-wider text-secondary-gray font-bold">A11y Score</span>
                </div>
                <span className="text-[10px] font-display font-bold text-burnt-orange tracking-widest pt-1">
                  100% WCAG
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-[8px] font-display text-muted font-bold">
              <span>LATENCY: ZERO DELAY</span>
              <span>© SODANAPALLI RAHUL</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-secondary-gray/50"
      >
        <span className="text-[8px] font-display uppercase tracking-widest font-bold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={12} className="text-burnt-orange" />
        </motion.div>
      </motion.div>
    </section>
  );
}
