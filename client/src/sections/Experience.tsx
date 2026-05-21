import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, Shield } from 'lucide-react';
import { useGetExperiencesQuery } from '../api/experienceApi';
import MagneticButton from '../components/MagneticButton';

export default function Experience() {
  const { data: experiences = [], isLoading } = useGetExperiencesQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Monitor scroll positioning to update active dot index
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.7));
      if (index >= 0 && index < experiences.length) {
        setActiveIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const cardWidth = 480; // approximate card width + gap
      const scrollTo = direction === 'left' 
        ? scrollLeft - cardWidth 
        : scrollLeft + cardWidth;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const scrollToItem = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 480;
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  if (isLoading) {
    return (
      <section id="experience" className="py-32 bg-cream text-center px-6 min-h-[60vh] flex items-center justify-center bg-noise">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-2 border-burnt-orange/20 border-t-burnt-orange rounded-full animate-spin" />
          <span className="text-xs font-medium tracking-widest text-muted font-sans">Synthesizing professional background...</span>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-32 bg-cream text-center px-6 min-h-[50vh] flex items-center justify-center bg-noise">
        <div className="max-w-md border border-border-cream bg-card-white p-8 rounded-2xl shadow-minimal">
          <h2 className="text-2xl font-display font-light text-deep-black mb-4">Professional Chronicle</h2>
          <p className="text-sm text-muted leading-relaxed font-sans font-light">
            No professional milestones configured. Please open the Admin Control Console to seed experiences.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="experience" 
      className="relative min-h-screen py-32 bg-cream overflow-hidden px-6 md:px-12 flex items-center bg-noise border-b border-border-cream"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans">
                PROFESSIONAL HISTORY & TIMELINE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black mb-4">
              Career <span className="italic font-normal text-burnt-orange">Timeline</span>
            </h2>
            <p className="text-sm text-body font-sans font-light leading-relaxed">
              A history of technical leadership, architecting strategic web platforms for government bureaus and utility enterprises.
            </p>
          </div>
          
          {/* Navigation Controls */}
          {experiences.length > 1 && (
            <div className="flex items-center gap-4">
              <MagneticButton>
                <button 
                  onClick={() => scroll('left')}
                  disabled={activeIndex === 0}
                  className="w-12 h-12 border border-border-cream bg-card-white hover:border-burnt-orange rounded-full flex items-center justify-center text-secondary-gray hover:text-burnt-orange disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                  aria-label="Previous career milestone"
                >
                  <ChevronLeft size={20} />
                </button>
              </MagneticButton>

              <MagneticButton>
                <button 
                  onClick={() => scroll('right')}
                  disabled={activeIndex === experiences.length - 1}
                  className="w-12 h-12 border border-border-cream bg-card-white hover:border-burnt-orange rounded-full flex items-center justify-center text-secondary-gray hover:text-burnt-orange disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                  aria-label="Next career milestone"
                >
                  <ChevronRight size={20} />
                </button>
              </MagneticButton>
            </div>
          )}
        </div>

        {/* Horizontal scroll track container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-8 pb-10 scrollbar-none snap-x snap-mandatory horizontal-scroll-container scroll-smooth"
        >
          {experiences.map((experience: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="snap-start shrink-0 w-[88vw] sm:w-[500px] bg-card-white border border-border-cream rounded-2xl p-8 md:p-10 shadow-minimal hover:shadow-minimal-hover hover:border-burnt-orange/20 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-border-cream/60">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-burnt-orange uppercase tracking-wider">
                    <Calendar size={12} />
                    <span>{experience.period}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-muted/50 tracking-wider">STAGE_0{idx + 1}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-light text-deep-black mb-1 leading-tight">
                  {experience.role}
                </h3>
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-sm font-semibold text-secondary-gray">{experience.company}</span>
                  <span className="w-1 h-1 rounded-full bg-border-cream" />
                  <span className="text-xs text-muted/80">{experience.location}</span>
                </div>

                {/* Achievements List */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-[9px] uppercase font-bold tracking-widest text-muted/60 font-sans flex items-center gap-1.5">
                    <Shield size={12} className="text-burnt-orange" />
                    VERIFIED CONTRIBUTIONS & ACTIONS
                  </h4>
                  <ul className="space-y-3.5">
                    {experience.details.map((detail: string, dIdx: number) => (
                      <li 
                        key={dIdx}
                        className="flex items-start gap-3.5 text-xs text-body leading-relaxed"
                      >
                        <CheckCircle2 size={13} className="text-burnt-orange shrink-0 mt-0.5" />
                        <span className="font-sans leading-normal font-light">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Chips */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border-cream/60">
                {experience.tech.map((techName: string, tIdx: number) => (
                  <span 
                    key={tIdx} 
                    className="px-2.5 py-1 bg-cream/40 border border-border-cream/80 text-[9px] uppercase font-sans font-medium text-secondary-gray tracking-wider rounded-md"
                  >
                    {techName}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Slider Track Indicator */}
        {experiences.length > 1 && (
          <div className="w-full h-[2px] bg-border-cream/60 mt-12 relative rounded-full select-none">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-burnt-orange rounded-full"
              animate={{ width: `${((activeIndex + 1) / experiences.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 pointer-events-none">
              {experiences.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => scrollToItem(i)}
                  className={`w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center pointer-events-auto ${
                    i <= activeIndex 
                      ? 'bg-burnt-orange border-burnt-orange scale-110' 
                      : 'bg-cream border-border-cream'
                  }`}
                  aria-label={`Go to career step ${i + 1}`}
                >
                  <span className={`w-1 h-1 rounded-full ${i <= activeIndex ? 'bg-cream' : 'bg-secondary-gray'}`} />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
