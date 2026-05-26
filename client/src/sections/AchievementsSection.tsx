import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Milestone } from 'lucide-react';
import { useGetAchievementsQuery } from '../services/api/achievementsApi';
import type { AchievementItem } from '../types/project.types';

function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated) return;
    const node = nodeRef.current;
    if (!node) return;

    let startTime: number | null = null;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * value);
      
      node.textContent = currentValue.toString();

      if (progress < 1) {
        window.requestAnimationFrame(animateCount);
      } else {
        node.textContent = value.toString();
        setHasAnimated(true);
      }
    };

    window.requestAnimationFrame(animateCount);
  }, [value, duration, inView, hasAnimated]);

  return <span ref={nodeRef} className="font-display font-light text-burnt-orange">0</span>;
}

export default function AchievementsSection() {
  const { data: achievements = [], isLoading } = useGetAchievementsQuery();

  const parseNumber = (text: string) => {
    const match = text.match(/(\d+)/);
    if (!match) return null;
    const num = parseInt(match[1], 10);
    const idx = match.index || 0;
    const prefix = text.slice(0, idx);
    const suffix = text.slice(idx + match[1].length);
    return { num, prefix, suffix };
  };

  if (isLoading) {
    return (
      <section id="achievements" className="py-32 bg-cream text-center px-6 min-h-[40vh] flex items-center justify-center bg-noise">
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-2 border-burnt-orange/20 border-t-burnt-orange rounded-full animate-spin" />
          <span className="text-xs font-medium tracking-widest text-muted font-sans">Verifying achievements registry...</span>
        </div>
      </section>
    );
  }

  if (achievements.length === 0) {
    return null; // Silent skip if no honors are loaded in the database
  }

  return (
    <section 
      id="achievements" 
      className="relative py-32 bg-cream overflow-hidden px-6 md:px-12 border-b border-border-cream bg-noise"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans">
              ENGINEERING REGISTRY & HONORS
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black mb-6">
            Key Professional <span className="italic font-normal text-burnt-orange">Achievements</span>
          </h2>
          <p className="text-sm md:text-base text-body font-sans font-light leading-relaxed">
            Measurable milestones and technical accolades obtained through architectural contributions to complex enterprise projects.
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item: AchievementItem, idx: number) => {
            const parsed = parseNumber(item.title);

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                className="p-8 rounded-2xl bg-card-white border border-border-cream flex flex-col justify-between hover:scale-[1.015] hover:shadow-minimal-hover hover:border-burnt-orange/20 transition-all duration-500 relative overflow-hidden text-left group"
              >
                <div>
                  {/* Upper row: icon & date */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-cream/60">
                    <div className="p-3 bg-cream rounded-xl text-burnt-orange flex items-center justify-center group-hover:bg-burnt-orange group-hover:text-cream transition-colors duration-300">
                      <Trophy size={16} />
                    </div>
                    {item.date && (
                      <span className="text-[10px] font-sans font-semibold text-burnt-orange uppercase bg-cream px-3 py-1 rounded-lg border border-border-cream/80">
                        {item.date}
                      </span>
                    )}
                  </div>

                  {parsed ? (
                    <div className="mb-4">
                      {/* Animated large number display */}
                      <span className="text-4xl md:text-5xl font-display font-light text-burnt-orange tracking-tight leading-none">
                        {parsed.prefix}
                        <AnimatedCounter value={parsed.num} />
                        {parsed.suffix}
                      </span>
                    </div>
                  ) : (
                    <h3 className="text-lg font-display font-semibold tracking-wide text-deep-black mb-3">
                      {item.title}
                    </h3>
                  )}

                  <p className="text-xs md:text-sm text-body leading-relaxed font-sans font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Lower metadata tag */}
                <div className="mt-8 flex items-center gap-1.5 text-[9px] font-sans text-muted/60 font-semibold uppercase relative z-10 select-none">
                  <Milestone size={11} className="text-burnt-orange" />
                  <span>VERIFIED RECORD // SECURE DOSSIER</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
