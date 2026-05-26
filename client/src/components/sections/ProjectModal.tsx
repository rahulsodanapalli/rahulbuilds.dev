import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award } from 'lucide-react';
import type { ProjectItem } from '../../types/project.types';
import MagneticButton from '../common/MagneticButton';

interface ProjectModalProps {
  isOpen: boolean;
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-deep-black/30 backdrop-blur-sm"
          />

          {/* Centered Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-full max-w-4xl max-h-[90vh] bg-cream border border-border-cream rounded-2xl shadow-2xl p-6 md:p-12 overflow-y-auto bg-noise text-left pointer-events-auto"
              data-lenis-prevent="true"
            >
              <div className="relative z-10 flex flex-col min-h-full justify-between">
                <div>
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-border-cream/80">
                    <div className="flex items-center gap-2 font-sans text-[10px] uppercase font-bold text-burnt-orange tracking-wider">
                      <Award size={14} />
                      <span>CASE DOSSIER DETAILS</span>
                    </div>
                    <MagneticButton>
                      <button
                        onClick={onClose}
                        className="p-3 border border-border-cream rounded-full text-secondary-gray hover:text-burnt-orange hover:bg-card-white focus:outline-none transition-all"
                        aria-label="Close case study details"
                      >
                        <X size={16} />
                      </button>
                    </MagneticButton>
                  </div>

                  {/* Project Meta */}
                  <span className="px-3.5 py-1.5 rounded-lg bg-card-white text-[10px] font-semibold uppercase tracking-wider text-burnt-orange border border-border-cream mb-6 inline-block">
                    {project.category}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-display font-light text-deep-black mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted mb-10">{project.subtitle}</p>

                  {/* Case Study Details Content */}
                  <div className="space-y-10 font-sans">

                    {/* Challenge */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange mt-1">01 // THE CHALLENGE</span>
                      <p className="md:col-span-3 text-sm text-body leading-relaxed font-light">
                        {project.specs.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange mt-1">02 // THE SOLUTION</span>
                      <p className="md:col-span-3 text-sm text-body leading-relaxed font-light">
                        {project.specs.solution}
                      </p>
                    </div>

                    {/* Architecture */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange mt-5">03 // ARCHITECTURE</span>
                      <div className="md:col-span-3 text-xs md:text-sm text-deep-black leading-relaxed font-mono bg-card-white p-5 rounded-xl border border-border-cream shadow-inner relative overflow-hidden">
                        <div className="absolute top-2 right-3 text-[8px] text-muted/40 uppercase tracking-widest font-bold font-sans">STRUCTURE DEPLOYMENT</div>
                        <span className="whitespace-pre-line leading-relaxed block">{project.specs.architecture}</span>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange mt-1">04 // OPTIMIZATIONS</span>
                      <p className="md:col-span-3 text-sm text-body leading-relaxed font-light">
                        {project.specs.performance}
                      </p>
                    </div>

                    {/* Impact */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-border-cream/80 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange mt-1">05 // IMPACT</span>
                      <p className="md:col-span-3 text-sm text-body leading-relaxed font-light">
                        {project.specs.impact}
                      </p>
                    </div>

                    {/* Tech Stack used */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 border-t border-b border-border-cream/80 py-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-burnt-orange mt-1.5">06 // STACK DETAILS</span>
                      <div className="md:col-span-3 flex flex-wrap gap-2">
                        {project.specs.tech.map((t: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-card-white border border-border-cream text-[10px] font-mono uppercase tracking-wider text-secondary-gray rounded-md hover:border-burnt-orange hover:text-burnt-orange transition-colors cursor-default"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom bar */}
                <div className="flex justify-between items-center pt-8 mt-12 border-t border-border-cream/80 text-[10px] font-sans text-muted/60">
                  <span>Sodanapalli Rahul</span>
                  <span>CONFIDENTIAL</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
