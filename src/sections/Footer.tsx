import { ArrowUp, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

export default function Footer() {
  const handleScrollTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-cream border-t border-luxury-black/5 py-12 px-6 md:px-12 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 font-sans">
        
        {/* Left Side: Copyright credits */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <div className="text-[10px] uppercase font-bold text-luxury-charcoal/40 tracking-wider flex items-center justify-center md:justify-start gap-1">
            <span>Designed & Engineered with</span>
            <Heart size={8} className="text-luxury-gold animate-pulse fill-luxury-gold" />
            <span>by Rahul</span>
          </div>
          <p className="text-[10px] text-luxury-charcoal/30 font-mono flex items-center justify-center md:justify-start gap-1 flex-wrap">
            <span>© 2026 Sodanapalli Rahul. All rights reserved. //</span>
            <Link 
              to="/admin" 
              className="hover:text-luxury-gold transition-colors tracking-wide underline decoration-dotted decoration-luxury-gold/30 hover:decoration-solid cursor-pointer interactive uppercase font-semibold"
            >
              System Console
            </Link>
          </p>
        </div>

        {/* Middle Side: Social icons row */}
        <div className="flex items-center gap-6">
          <MagneticButton>
            <a 
              href="https://github.com/rahulsodanapalli" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 text-luxury-charcoal/50 hover:text-luxury-black transition-colors interactive flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a 
              href="https://linkedin.com/in/rahul-sodanapalli-0a49062b3" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 text-luxury-charcoal/50 hover:text-luxury-black transition-colors interactive flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a 
              href="mailto:rahulsodanapalli@gmail.com" 
              className="p-2 text-luxury-charcoal/50 hover:text-luxury-black transition-colors interactive flex items-center justify-center"
              aria-label="Send Email"
            >
              <Mail size={16} />
            </a>
          </MagneticButton>
        </div>

        {/* Right Side: Back to Top */}
        <div className="flex items-center">
          <MagneticButton>
            <button
              onClick={handleScrollTop}
              className="px-4 py-2 border border-luxury-black/10 hover:border-luxury-black/35 rounded-full flex items-center gap-2 text-[9px] uppercase font-bold text-luxury-charcoal tracking-widest transition-all duration-300 interactive"
              aria-label="Scroll to top of page"
            >
              Back To Top <ArrowUp size={10} className="text-luxury-gold animate-bounce" />
            </button>
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
}
