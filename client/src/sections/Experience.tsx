import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Shield, Briefcase } from 'lucide-react';
import { useGetExperiencesQuery } from '../services/api/experienceApi';

export default function Experience() {
  const { data: experiences = [], isLoading } = useGetExperiencesQuery();

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
        <div className="max-w-md border border-border-cream bg-card-white p-8 rounded-2xl shadow-minimal mx-auto">
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
      className="relative min-h-screen py-32 bg-cream px-6 md:px-12 flex items-start bg-noise border-b border-border-cream"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

        {/* Left Column - Sticky Header */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-6 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans">
              PROFESSIONAL HISTORY
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black">
            Career <span className="italic font-normal text-burnt-orange">Timeline</span>
          </h2>
          <p className="text-sm text-body font-sans font-light leading-relaxed max-w-sm">
            A history of technical leadership, architecting strategic web platforms and elevating digital experiences.
          </p>
        </div>

        {/* Right Column - Vertical Timeline */}
        <div className="lg:w-2/3 relative flex flex-col gap-12 w-full pt-8 lg:pt-0">

          {/* Vertical Line */}
          <div className="absolute left-[15px] top-8 bottom-8 w-px bg-border-cream hidden sm:block" />

          {experiences.map((experience: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex flex-col sm:flex-row gap-6 sm:gap-10"
            >
              {/* Timeline Node */}
              <div className="hidden sm:flex flex-col items-center mt-8 shrink-0 z-10">
                <div className="w-8 h-8 rounded-full bg-cream border-[3px] border-burnt-orange flex items-center justify-center shadow-sm">
                  <Briefcase size={12} className="text-burnt-orange" />
                </div>
              </div>

              {/* Experience Card */}
              <div className="w-full bg-card-white border border-border-cream rounded-2xl p-8 md:p-10 shadow-minimal hover:shadow-minimal-hover hover:border-burnt-orange/30 transition-all duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border-cream/60">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-burnt-orange uppercase tracking-wider">
                    <Calendar size={12} />
                    <span>{experience.period}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-display font-light text-deep-black mb-2 leading-tight">
                  {experience.role}
                </h3>
                <div className="flex items-center gap-2 mb-8 flex-wrap">
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
                      <li key={dIdx} className="flex items-start gap-3.5 text-xs text-body leading-relaxed">
                        <CheckCircle2 size={13} className="text-burnt-orange shrink-0 mt-0.5" />
                        <span className="font-sans leading-normal font-light">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Chips */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-border-cream/60">
                  {experience.tech.map((techName: string, tIdx: number) => (
                    <span key={tIdx} className="px-2.5 py-1 bg-cream/40 border border-border-cream/80 text-[9px] uppercase font-sans font-medium text-secondary-gray tracking-wider rounded-md">
                      {techName}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
