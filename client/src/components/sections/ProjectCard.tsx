import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, Cpu } from 'lucide-react';
import type { ProjectItem } from '../../types/project.types';
import MagneticButton from '../common/MagneticButton';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onExamine: (id: string) => void;
}

export default function ProjectCard({ project, index, onExamine }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group flex flex-col justify-between bg-card-white border border-border-cream rounded-2xl p-8 shadow-minimal hover:scale-[1.015] hover:border-burnt-orange/30 hover:shadow-minimal-hover transition-all duration-500 relative overflow-hidden text-left"
    >
      <div>
        {/* Visual Category Pill */}
        <div className="flex justify-between items-start mb-6">
          <span className="px-3 py-1 rounded-lg bg-cream text-[10px] font-semibold uppercase tracking-wider text-burnt-orange border border-border-cream/80">
            {project.category}
          </span>
          <span className="text-[10px] font-semibold text-muted/50 tracking-wider">
            PROJ_0{index + 1}
          </span>
        </div>

        {/* Typography Header */}
        <h3 className="text-2xl md:text-3xl font-display font-light text-deep-black mb-1 group-hover:text-burnt-orange transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-burnt-orange/80 mb-6">{project.subtitle}</p>

        <p className="text-xs md:text-sm text-body leading-relaxed font-sans font-light mb-8 max-w-lg">
          {project.desc}
        </p>

        {/* Premium Redesigned Telemetry Mockup Panels */}
        <div className="w-full h-48 bg-cream rounded-xl border border-border-cream/60 p-5 flex flex-col justify-between relative overflow-hidden mb-8 shadow-inner select-none font-mono">
          {project.imageMockup === 'doe' ? (
            // Abu Dhabi Department of Energy Dashboard Mockup
            <div className="h-full w-full flex flex-col justify-between text-deep-black text-[10px]">
              <div className="flex justify-between items-center border-b border-border-cream pb-2">
                <div className="flex items-center gap-1.5 font-bold text-burnt-orange">
                  <ShieldCheck size={14} />
                  <span className="tracking-wide">DOE_GATEWAY_V3.4</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-burnt-orange/10 text-burnt-orange font-bold border border-burnt-orange/20 text-[8px] tracking-wider">
                  ACTIVE // SECURED
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 my-2.5 text-center">
                <div className="bg-card-white p-2 rounded border border-border-cream flex flex-col gap-1">
                  <span className="text-muted/60 text-[8px] font-semibold">SECURITY</span>
                  <span className="font-bold text-burnt-orange">100% PASS</span>
                </div>
                <div className="bg-card-white p-2 rounded border border-border-cream flex flex-col gap-1">
                  <span className="text-muted/60 text-[8px] font-semibold">APPROVAL</span>
                  <span className="font-bold text-deep-black">COMPLETED</span>
                </div>
                <div className="bg-card-white p-2 rounded border border-border-cream flex flex-col gap-1">
                  <span className="text-muted/60 text-[8px] font-semibold">LOGINS</span>
                  <span className="font-bold text-secondary-gray">FEDERATED</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-card-white p-2 rounded border border-border-cream">
                <span className="text-secondary-gray text-[8px] font-semibold">INTELLIGENT COMPLIANCE ENGINE</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange animate-pulse" />
                  <span className="text-[8px] text-burnt-orange italic">Auditing telemetry logs</span>
                </div>
              </div>
            </div>
          ) : project.imageMockup === 'taqa' ? (
            // TAQA Water solutions compliance pH monitoring
            <div className="h-full w-full flex flex-col justify-between text-deep-black text-[10px]">
              <div className="flex justify-between items-center border-b border-border-cream pb-2">
                <div className="flex items-center gap-1.5 font-bold text-burnt-orange">
                  <Activity size={14} className="animate-pulse" />
                  <span className="tracking-wide">TAQA_COMPLIANCE_METER</span>
                </div>
                <span className="text-secondary-gray font-bold text-[8px] tracking-wider uppercase">NOMINAL METRICS</span>
              </div>

              {/* Redesigned solid color minimalist bar charts */}
              <div className="flex items-end justify-between h-20 px-2 my-1">
                {[40, 75, 55, 90, 60, 45, 80, 95, 65, 85, 50, 75, 90].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h - 10}%`, `${h + 3}%`, `${h - 10}%`] }}
                    transition={{ repeat: Infinity, duration: 1.8 + (i * 0.1), ease: "easeInOut" }}
                    className={`w-[5%] rounded-t-sm ${i % 3 === 0
                      ? 'bg-burnt-orange'
                      : 'bg-secondary-gray'
                      }`}
                  />
                ))}
              </div>

              <div className="flex justify-between text-muted/80 pt-2 border-t border-border-cream text-[8px] font-semibold">
                <span>pH SCALE: 7.35 [SECURE]</span>
                <span>TURBIDITY: 0.12 NTU</span>
                <span>RATE: 124 L/S</span>
              </div>
            </div>
          ) : (
            // High-end visual telemetry default card
            <div className="h-full w-full flex flex-col justify-between text-deep-black text-[10px]">
              <div className="flex justify-between items-center border-b border-border-cream pb-2">
                <div className="flex items-center gap-1.5 font-bold text-burnt-orange">
                  <Cpu size={14} />
                  <span className="tracking-wide">SYSTEM_TELEMETRY_NODE</span>
                </div>
                <span className="text-burnt-orange font-bold text-[8px] tracking-wider">ONLINE</span>
              </div>

              <div className="my-2 p-2.5 bg-card-white rounded border border-border-cream space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted/60 text-[8px]">API ENDPOINT GATEWAY</span>
                  <span className="font-bold text-burnt-orange">200 OK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/60 text-[8px]">COMPILATION SPEED</span>
                  <span className="font-bold text-deep-black">42ms [STABLE]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted/60 text-[8px]">REDUX STATE CACHE</span>
                  <span className="font-bold text-secondary-gray font-mono">RTK CONNECTED</span>
                </div>
              </div>

              <div className="text-[8px] text-muted/40 text-center uppercase tracking-wider font-bold">
                SECURE INTEGRATED DATABASES ACTIVE
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-2">
        <MagneticButton>
          <button
            onClick={() => onExamine(project._id)}
            className="px-6 py-3 bg-deep-black text-cream hover:bg-burnt-orange font-display font-semibold uppercase tracking-widest text-[10px] rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-minimal hover:shadow-minimal-hover interactive"
          >
            Examine Case Study <ArrowRight size={12} className="text-cream" />
          </button>
        </MagneticButton>
      </div>
    </motion.div>
  );
}
