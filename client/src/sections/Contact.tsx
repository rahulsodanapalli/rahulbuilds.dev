import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUpRight, Send, Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import MagneticButton from '../components/common/MagneticButton';
import { useSendContactMessageMutation } from '../services/api/contactApi';
import { showSuccessToast, showErrorToast } from '../utils/alert';

interface ContactFormInput {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [sendContactMessage] = useSendContactMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInput>();

  const onSubmit = async (data: ContactFormInput) => {
    setFormStatus('submitting');
    console.log("Submitting secure contact request via encrypted payload:", data);

    try {
      // Execute the real server transmission request
      await sendContactMessage(data).unwrap();

      setFormStatus('submitted');
      showSuccessToast('Engineering brief successfully dispatched!');

      // Trigger luxury warm burnt orange and black confetti burst
      const count = 180;
      const defaults = {
        origin: { y: 0.6 },
        colors: ['#C76B37', '#111111', '#FFFFFF', '#6D645B']
      };

      function fire(particleRatio: number, opts: any) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 30, startVelocity: 60 });
      fire(0.2, { spread: 75 });
      fire(0.35, { spread: 110, decay: 0.92, scalar: 0.8 });
      fire(0.1, { spread: 130, startVelocity: 30, decay: 0.93, scalar: 1.2 });
      fire(0.1, { spread: 135, startVelocity: 50 });

      // Reset form after delay
      setTimeout(() => {
        reset();
        setFormStatus('idle');
      }, 5000);

    } catch (err) {
      console.error('Failed to submit engineering brief:', err);
      setFormStatus('error');
      showErrorToast('Failed to dispatch contact brief. Please try again.');
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-32 bg-cream overflow-hidden px-6 md:px-12 flex items-center bg-noise border-b border-border-cream"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* Left Column: Greeting & Info */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-burnt-orange font-sans">
              INITIATE COMMUNICATIONS
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight text-deep-black leading-[1.12] mb-6">
            Let's build <br />
            something <span className="italic font-normal text-burnt-orange">legendary</span>.
          </h2>

          <p className="text-sm md:text-base text-body font-sans font-light leading-relaxed mb-12 max-w-sm">
            I am actively open to frontend architectural consultations, bespoke design-to-code initiatives, and technical leadership engagements.
          </p>

          {/* Contact Methods */}
          <div className="space-y-6 mb-12 border-t border-border-cream/80 pt-10">
            <a
              href="mailto:rahulsodanapalli@gmail.com"
              className="flex items-center gap-4 group focus:outline-none"
            >
              <div className="p-3.5 bg-card-white border border-border-cream rounded-xl shadow-minimal group-hover:border-burnt-orange/40 transition-all duration-300">
                <Mail size={18} className="text-burnt-orange" />
              </div>
              <div>
                <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-muted/60 block mb-0.5">DIRECT ENQUIRY</span>
                <span className="text-sm font-sans font-semibold text-deep-black flex items-center gap-1 group-hover:text-burnt-orange transition-colors duration-300">
                  rahulsodanapalli@gmail.com
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-burnt-orange" />
                </span>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/rahul-sodanapalli-0a49062b3"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 group focus:outline-none"
            >
              <div className="p-3.5 bg-card-white border border-border-cream rounded-xl shadow-minimal group-hover:border-burnt-orange/40 transition-all duration-300 flex items-center justify-center">
                <svg className="w-[18px] h-[18px] text-burnt-orange fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <div>
                <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-muted/60 block mb-0.5">NETWORKING CHANNEL</span>
                <span className="text-sm font-sans font-semibold text-deep-black flex items-center gap-1 group-hover:text-burnt-orange transition-colors duration-300">
                  linkedin.com/in/rahul-sodanapalli
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-burnt-orange" />
                </span>
              </div>
            </a>
          </div>

          {/* Secure Audit Protocol status indicator */}
          <div className="flex items-center gap-2 bg-card-white border border-border-cream py-2.5 px-4 rounded-xl max-w-xs shadow-minimal select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange animate-pulse" />
            <span className="text-[9px] font-sans text-secondary-gray tracking-wider font-semibold uppercase">
              Secure Communications Active
            </span>
          </div>
        </div>

        {/* Right Column: Premium Form Container */}
        <div className="lg:col-span-7 w-full relative">
          <div className="relative w-full bg-card-white border border-border-cream p-8 md:p-12 rounded-2xl shadow-minimal flex flex-col justify-between overflow-hidden text-left">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border-cream/80 mb-8">
              <span className="font-sans text-[10px] uppercase tracking-wider text-secondary-gray font-semibold">
                DIRECT INTAKE BRIEF
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-sans text-muted/60">
                <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange animate-pulse" />
                <span>ONLINE PORT</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[10px] font-sans uppercase tracking-wider font-bold text-secondary-gray" htmlFor="name">
                    01 // Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Sodanapalli Rahul"
                    {...register("name", { required: "Name or identity matrix is required" })}
                    className="w-full bg-transparent border-b border-border-cream py-3 text-sm focus:outline-none focus:border-burnt-orange transition-all duration-300 font-sans font-light text-deep-black placeholder-muted/40"
                  />
                  {errors.name && (
                    <span className="text-[10px] font-sans text-burnt-orange flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle size={12} /> {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[10px] font-sans uppercase tracking-wider font-bold text-secondary-gray" htmlFor="email">
                    02 // Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="rahul@example.com"
                    {...register("email", {
                      required: "Valid email address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email structure"
                      }
                    })}
                    className="w-full bg-transparent border-b border-border-cream py-3 text-sm focus:outline-none focus:border-burnt-orange transition-all duration-300 font-sans font-light text-deep-black placeholder-muted/40"
                  />
                  {errors.email && (
                    <span className="text-[10px] font-sans text-burnt-orange flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle size={12} /> {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Project Type selection */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] font-sans uppercase tracking-wider font-bold text-secondary-gray" htmlFor="projectType">
                  03 // Project Focus
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    {...register("projectType", { required: "Please select a focus module" })}
                    className="w-full bg-transparent border-b border-border-cream py-3 text-sm focus:outline-none focus:border-burnt-orange transition-all duration-300 font-sans font-light text-deep-black appearance-none rounded-none"
                  >
                    <option className="bg-card-white text-deep-black" value="regulatory">Enterprise Portal Redesign / React Architecting</option>
                    <option className="bg-card-white text-deep-black" value="dashboard">Compliance & Data Visualization Telemetry</option>
                    <option className="bg-card-white text-deep-black" value="performance">Lighthouse Performance Optimization (LCP / CLS)</option>
                    <option className="bg-card-white text-deep-black" value="ai">AI Integration & LLM Orchestration</option>
                    <option className="bg-card-white text-deep-black" value="other">Bespoke Strategic Technical Partnership</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-burnt-orange">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 3: Message Textarea */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-[10px] font-sans uppercase tracking-wider font-bold text-secondary-gray" htmlFor="message">
                  04 // Project Description
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Detail your engineering specifications or platform scope..."
                  {...register("message", { required: "Description message is required" })}
                  className="w-full bg-transparent border-b border-border-cream py-3 text-sm focus:outline-none focus:border-burnt-orange transition-all duration-300 font-sans font-light text-deep-black placeholder-muted/40 resize-none"
                />
                {errors.message && (
                  <span className="text-[10px] font-sans text-burnt-orange flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.message.message}
                  </span>
                )}
              </div>

              {/* Row 4: Submit Button with Elegant Loading State */}
              <div className="pt-4 flex justify-start items-center">
                <MagneticButton>
                  <motion.button
                    type="submit"
                    disabled={formStatus === 'submitting' || formStatus === 'submitted'}
                    layout
                    className={`relative flex items-center justify-center font-sans font-bold uppercase tracking-wider text-[10px] rounded-full h-12 shadow-minimal transition-all duration-300 disabled:pointer-events-none ${formStatus === 'submitted'
                        ? 'w-12 bg-burnt-orange text-cream'
                        : 'w-56 bg-deep-black text-cream hover:bg-burnt-orange'
                      }`}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  >
                    <AnimatePresence mode="wait">
                      {formStatus === 'idle' && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          Send Brief <Send size={11} />
                        </motion.span>
                      )}
                      {formStatus === 'submitting' && (
                        <motion.span
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span className="w-3.5 h-3.5 border-2 border-cream/35 border-t-cream rounded-full animate-spin block" />
                          Submitting...
                        </motion.span>
                      )}
                      {formStatus === 'submitted' && (
                        <motion.span
                          key="submitted"
                          initial={{ opacity: 0, scale: 0.3 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Check size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </MagneticButton>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
