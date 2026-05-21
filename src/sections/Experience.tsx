import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import MagneticButton from '../components/MagneticButton';

export default function Experience() {
  const { experiences } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep index in safe range if items are deleted dynamically
  useEffect(() => {
    if (activeIndex >= experiences.length) {
      setActiveIndex(Math.max(0, experiences.length - 1));
    }
  }, [experiences.length, activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, experiences.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-32 bg-cream text-center px-6">
        <h2 className="text-2xl font-light text-luxury-black mb-4">Interactive Career Timeline</h2>
        <p className="text-xs text-luxury-charcoal/50">No career milestones added yet. Open the Admin Console to add experiences!</p>
      </section>
    );
  }

  return (
    <section 
      id="experience" 
      className="relative min-h-screen py-32 bg-cream overflow-hidden px-6 md:px-12 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-luxury-gold animate-bounce" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60">
                Professional Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-luxury-black font-sans">
              Interactive <span className="font-serif italic text-luxury-gold font-normal">Career</span> Timeline
            </h2>
          </div>
          
          {/* Navigation Controls */}
          {experiences.length > 1 && (
            <div className="flex items-center gap-4">
              <MagneticButton>
                <button 
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="w-12 h-12 border border-luxury-black/10 rounded-full flex items-center justify-center text-luxury-black hover:bg-cream-dark/20 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 interactive"
                  aria-label="Previous career slide"
                >
                  <ChevronLeft size={20} />
                </button>
              </MagneticButton>

              <MagneticButton>
                <button 
                  onClick={handleNext}
                  disabled={activeIndex === experiences.length - 1}
                  className="w-12 h-12 border border-luxury-black/10 rounded-full flex items-center justify-center text-luxury-black hover:bg-cream-dark/20 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 interactive"
                  aria-label="Next career slide"
                >
                  <ChevronRight size={20} />
                </button>
              </MagneticButton>
            </div>
          )}
        </div>

        {/* Outer Slider Box */}
        <div className="relative min-h-[460px] md:min-h-[380px] w-full" ref={containerRef}>
          <AnimatePresence mode="wait">
            {experiences[activeIndex] && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-cream-light/40 border border-luxury-black/[0.03] p-8 md:p-12 rounded-3xl shadow-luxury"
              >
                {/* Left Column: Context Card */}
                <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-luxury-black/5 pb-8 lg:pb-0 lg:pr-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-luxury-gold uppercase tracking-wider">
                      <Calendar size={14} />
                      <span>{experiences[activeIndex].period}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-luxury-black leading-tight">
                      {experiences[activeIndex].role}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-luxury-charcoal/80">{experiences[activeIndex].company}</p>
                      <p className="text-xs text-luxury-charcoal/50">{experiences[activeIndex].location}</p>
                    </div>
                  </div>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2 mt-8 lg:mt-0">
                    {experiences[activeIndex].tech.map((t, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-cream-dark/30 border border-luxury-black/[0.04] text-[10px] uppercase font-bold text-luxury-charcoal tracking-wide rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Achievements List */}
                <div className="lg:col-span-7 flex flex-col justify-center lg:pl-6">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-luxury-charcoal/40 mb-6">Key Directives & Impact</h4>
                  <ul className="space-y-4">
                    {experiences[activeIndex].details.map((detail, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4 text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-normal"
                      >
                        <CheckCircle2 size={16} className="text-luxury-gold shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timeline Slider Track Indicator */}
        {experiences.length > 1 && (
          <div className="w-full h-[2px] bg-luxury-black/5 mt-16 relative rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-luxury-gold rounded-full"
              animate={{ width: `${((activeIndex + 1) / experiences.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1">
              {experiences.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center focus:outline-none interactive ${
                    i <= activeIndex 
                      ? 'bg-luxury-gold border-luxury-gold scale-110 shadow-luxury' 
                      : 'bg-cream border-luxury-black/10'
                  }`}
                  aria-label={`Go to career step ${i + 1}`}
                >
                  <span className="w-1 h-1 bg-cream rounded-full" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
