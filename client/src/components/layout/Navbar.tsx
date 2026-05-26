import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, Github, Linkedin, FileText } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { NAV_LINKS, SOCIAL_LINKS } from '../../constants';
import MagneticButton from '../common/MagneticButton';

export default function Navbar() {
  const { activeSection, setActiveSection } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(id);

    const lenis = (window as any).lenis;
    const targetElement = document.getElementById(id);
    if (lenis && targetElement) {
      lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 w-full ${isScrolled
          ? 'py-3.5 bg-cream/70 backdrop-blur-md border-b border-border-cream/80 shadow-minimal'
          : 'py-6 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Minimal Luxury Logo */}
          <motion.button
            onClick={() => handleNavClick('hero')}
            className="text-base font-bold tracking-tight text-deep-black flex items-center gap-1 focus:outline-none interactive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-2 h-2 bg-burnt-orange rounded-full block animate-pulse" />
            <span className="font-display font-bold uppercase tracking-wider text-[11px] text-deep-black">rahul</span>
            <span className="text-burnt-orange font-serif italic text-sm">s.</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-white/40 p-1 rounded-full border border-border-cream/60 backdrop-blur-md shadow-minimal">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 text-[9px] font-display font-bold uppercase tracking-widest transition-colors duration-300 rounded-full focus:outline-none interactive ${isActive ? 'text-burnt-orange' : 'text-secondary-gray/70 hover:text-deep-black'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white border border-border-cream/50 shadow-minimal z-0"
                      style={{ borderRadius: 9999 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Buttons (Admin + Socials + Talk) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admin"
              className="px-4 py-2 border border-border-cream text-[9px] font-display font-bold uppercase tracking-widest text-secondary-gray hover:text-deep-black hover:bg-white transition-all duration-300 interactive rounded-full flex items-center gap-1.5 shadow-minimal"
            >
              <Shield size={10} className="text-burnt-orange" />
              Admin
            </Link>

            <div className="w-[1px] h-4 bg-border-cream/60 mx-1" />

            <div className="flex items-center gap-2">
              <MagneticButton>
                <a
                  href={SOCIAL_LINKS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border-cream bg-white/50 hover:bg-white text-secondary-gray hover:text-burnt-orange rounded-full transition-all duration-300 interactive shadow-minimal flex items-center justify-center"
                  title="Resume PDF"
                  aria-label="Resume PDF"
                >
                  <FileText size={11} />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border-cream bg-white/50 hover:bg-white text-secondary-gray hover:text-burnt-orange rounded-full transition-all duration-300 interactive shadow-minimal flex items-center justify-center"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github size={11} />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border-cream bg-white/50 hover:bg-white text-secondary-gray hover:text-burnt-orange rounded-full transition-all duration-300 interactive shadow-minimal flex items-center justify-center"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={11} />
                </a>
              </MagneticButton>
            </div>

            <MagneticButton>
              <button
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2 text-[9px] font-display font-bold uppercase tracking-widest text-white bg-deep-black hover:bg-burnt-orange transition-all duration-300 rounded-full shadow-minimal interactive"
              >
                Let's Talk
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-deep-black hover:text-burnt-orange focus:outline-none interactive flex items-center gap-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-[60px] bg-cream/98 backdrop-blur-2xl z-30 lg:hidden flex flex-col p-8 border-t border-border-cream/80"
          >
            <div className="flex flex-col gap-5 my-auto text-center">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                    className={`text-base font-display font-bold tracking-widest uppercase transition-colors interactive ${isActive ? 'text-burnt-orange font-serif italic' : 'text-secondary-gray/70'
                      }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}

              {/* Mobile Social & Resume Action Cards */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.03 + 0.1 }}
                className="grid grid-cols-3 gap-2 mt-4"
              >
                <a
                  href={SOCIAL_LINKS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 bg-white border border-border-cream/80 text-[9px] font-display font-bold uppercase tracking-widest text-secondary-gray rounded-xl flex flex-col items-center justify-center gap-0.5 interactive shadow-minimal"
                >
                  <span>Resume</span>
                  <span className="text-[7px] text-burnt-orange font-mono">PDF ↗</span>
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 bg-white border border-border-cream/80 text-[9px] font-display font-bold uppercase tracking-widest text-secondary-gray rounded-xl flex flex-col items-center justify-center gap-0.5 interactive shadow-minimal"
                >
                  <span>GitHub</span>
                  <span className="text-[7px] text-burnt-orange font-mono">CODE ↗</span>
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 bg-white border border-border-cream/80 text-[9px] font-display font-bold uppercase tracking-widest text-secondary-gray rounded-xl flex flex-col items-center justify-center gap-0.5 interactive shadow-minimal"
                >
                  <span>LinkedIn</span>
                  <span className="text-[7px] text-burnt-orange font-mono">CONN ↗</span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.03 + 0.2 }}
                className="mt-6 pt-6 border-t border-border-cream flex flex-col gap-3"
              >
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3.5 text-xs font-display font-bold uppercase tracking-widest text-white bg-deep-black rounded-xl interactive"
                >
                  Initiate Discussion
                </button>

                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 border border-border-cream text-center text-xs font-display font-bold uppercase tracking-widest text-secondary-gray rounded-xl bg-white hover:text-deep-black transition-all duration-300 interactive flex items-center justify-center gap-2"
                >
                  <Shield size={12} className="text-burnt-orange" />
                  Admin Panel
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
