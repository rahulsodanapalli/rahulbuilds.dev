import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Timeline' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'mindset', label: 'Mindset' },
  { id: 'code', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
];

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
    
    // Smooth scroll using Lenis
    const lenis = (window as any).lenis;
    const targetElement = document.getElementById(id);
    if (lenis && targetElement) {
      lenis.scrollTo(targetElement, { offset: -60, duration: 1.5 });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled 
            ? 'py-3 bg-cream/70 backdrop-blur-md border-b border-luxury-black/5 shadow-luxury' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.button 
            onClick={() => handleNavClick('hero')}
            className="text-lg font-bold tracking-tight text-luxury-black flex items-center gap-1.5 focus:outline-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-2.5 h-2.5 bg-luxury-black rounded-full block animate-pulse-slow" />
            <span className="font-sans">rahul</span>
            <span className="text-luxury-gold font-serif italic">builds</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-cream-dark/30 p-1.5 rounded-full border border-luxury-black/[0.03] backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300 rounded-full focus:outline-none ${
                    isActive ? 'text-luxury-black' : 'text-luxury-charcoal/60 hover:text-luxury-black'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-cream-light border border-luxury-black/5 shadow-luxury z-0"
                      style={{ borderRadius: 9999 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Buttons (Console + Talk) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/admin"
              className="px-4 py-2 border border-luxury-black/10 hover:border-luxury-black/35 rounded-full text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal transition-all duration-300 interactive bg-cream-light shadow-sm"
            >
              Console
            </Link>
            
            <MagneticButton>
              <button 
                onClick={() => handleNavClick('contact')}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-cream bg-luxury-black hover:bg-luxury-charcoal transition-all duration-300 rounded-full shadow-luxury interactive"
              >
                Let's Talk
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-luxury-black hover:text-luxury-gold focus:outline-none interactive"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="fixed inset-0 top-[60px] bg-cream/95 backdrop-blur-lg z-40 lg:hidden flex flex-col p-8 border-t border-luxury-black/5"
          >
            <div className="flex flex-col gap-6 my-auto text-center">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className={`text-2xl font-semibold tracking-wide uppercase transition-colors ${
                      isActive ? 'text-luxury-gold font-serif italic' : 'text-luxury-charcoal/70'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-luxury-black/5 flex flex-col gap-4"
              >
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-4 text-sm font-bold uppercase tracking-widest text-cream bg-luxury-black rounded-xl"
                >
                  Initiate Discussion
                </button>
                
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 border border-luxury-black/10 text-center text-xs font-bold uppercase tracking-widest text-luxury-charcoal rounded-xl bg-cream-light font-semibold"
                >
                  System Console
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
