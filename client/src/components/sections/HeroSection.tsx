import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import ParticleCanvas from '../ParticleCanvas';
import MagneticButton from '../MagneticButton';

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const springConfig = { stiffness: 60, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const textParallaxX = useTransform(smoothX, (v) => v * 35);
  const textParallaxY = useTransform(smoothY, (v) => v * 35);
  const bgParallaxX = useTransform(smoothX, (v) => v * -20);
  const bgParallaxY = useTransform(smoothY, (v) => v * -20);

  const handleScrollToProjects = () => {
    const lenis = (window as any).lenis;
    const target = document.getElementById('projects');
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -60, duration: 1.5 });
    }
  };

  const handleScrollToContact = () => {
    const lenis = (window as any).lenis;
    const target = document.getElementById('contact');
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -60, duration: 1.5 });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section 
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center bg-cream px-6 md:px-12 py-24 select-none overflow-hidden bg-noise"
    >
      <ParticleCanvas />

      {/* Floating abstract gold orb behind text - Parallaxed */}
      <motion.div 
        style={{ x: bgParallaxX, y: bgParallaxY }}
        className="absolute w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-radial from-luxury-gold/5 to-transparent blur-3xl pointer-events-none z-0"
      />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ x: textParallaxX, y: textParallaxY }}
          className="flex flex-col items-center"
        >
          {/* Engineering Pill */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full block animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-charcoal">
              Specialized Frontend Architect
            </span>
          </motion.div>

          {/* Premium Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-7xl font-light tracking-tight text-luxury-black leading-[1.08] mb-6 max-w-4xl font-sans"
          >
            Building Enterprise <br />
            <span className="font-serif italic font-normal text-luxury-gold">Experiences</span> with React & AI
          </motion.h1>

          {/* Elegant Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-xl font-normal text-luxury-charcoal max-w-2xl leading-relaxed mb-12"
          >
            Crafting highly scalable, visual, and performance-driven applications for Abu Dhabi Government portals and water utility leaders.
          </motion.p>

          {/* Social Links inside Hero */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-5 mb-10 text-luxury-charcoal"
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors duration-300">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors duration-300">
              <Linkedin size={18} />
            </a>
            <a href="mailto:admin@rahulbuilds.dev" className="hover:text-luxury-gold transition-colors duration-300">
              <Mail size={18} />
            </a>
          </motion.div>

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <MagneticButton>
              <button 
                onClick={handleScrollToProjects}
                className="px-8 py-4 bg-luxury-black text-cream hover:bg-cream hover:text-luxury-black border border-white/10 font-semibold uppercase tracking-widest text-xs rounded-full flex items-center gap-3 transition-all duration-300 shadow-luxury hover:shadow-luxury-hover interactive"
              >
                View Works <ArrowRight size={14} className="text-luxury-gold" />
              </button>
            </MagneticButton>

            <MagneticButton>
              <button 
                onClick={handleScrollToContact}
                className="px-8 py-4 border border-white/10 hover:border-white/30 font-semibold uppercase tracking-widest text-xs rounded-full flex items-center gap-2 transition-all duration-300 text-cream bg-transparent hover:bg-white/[0.03] interactive"
              >
                Initiate Project
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none text-luxury-charcoal/40"
      >
        <span className="text-[9px] uppercase tracking-widest font-bold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
