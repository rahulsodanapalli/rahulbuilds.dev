import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUpRight, Send, Check, AlertCircle, MessageSquareCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import MagneticButton from '../components/MagneticButton';

interface ContactFormInput {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormInput>();

  const onSubmit = async (data: ContactFormInput) => {
    setFormStatus('submitting');
    console.log("Submitting secure contact request:", data);

    try {
      // Simulate API lag
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      setFormStatus('submitted');

      // Trigger luxury golden confetti burst
      const count = 150;
      const defaults = {
        origin: { y: 0.6 },
        colors: ['#C5A880', '#151515', '#ECE8DD', '#FAF8F5']
      };

      function fire(particleRatio: number, opts: any) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });

      // Reset form after delay
      setTimeout(() => {
        reset();
        setFormStatus('idle');
      }, 5000);

    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-32 bg-cream-light overflow-hidden px-6 md:px-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Greeting & Info */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquareCode size={16} className="text-luxury-gold animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-charcoal/60">
              Initiate Contact
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-luxury-black leading-[1.18] mb-6 font-sans">
            Let's build <br />
            something <span className="font-serif italic text-luxury-gold font-normal">incredible</span>.
          </h2>

          <p className="text-xs md:text-sm text-luxury-charcoal/60 leading-relaxed font-normal mb-12 max-w-sm">
            I am currently open to Frontend Architect directives, enterprise consulting roles, and collaborations. Let's start the dialogue.
          </p>

          {/* Contact Methods */}
          <div className="space-y-6 mb-12 border-t border-luxury-black/5 pt-10">
            <a 
              href="mailto:rahulsodanapalli@gmail.com" 
              className="flex items-center gap-4 group interactive focus:outline-none"
            >
              <div className="p-3.5 bg-cream border border-luxury-black/5 rounded-2xl shadow-luxury group-hover:border-luxury-gold/30 transition-all duration-300">
                <Mail size={16} className="text-luxury-gold" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/40 block mb-0.5">Send direct email</span>
                <span className="text-sm font-semibold text-luxury-black flex items-center gap-1.5 group-hover:text-luxury-gold transition-colors duration-300">
                  rahulsodanapalli@gmail.com
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-luxury-gold" />
                </span>
              </div>
            </a>

            <a 
              href="https://linkedin.com/in/rahul-sodanapalli-0a49062b3" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-4 group interactive focus:outline-none"
            >
              <div className="p-3.5 bg-cream border border-luxury-black/5 rounded-2xl shadow-luxury group-hover:border-luxury-gold/30 transition-all duration-300 flex items-center justify-center">
                <svg className="w-4 h-4 text-luxury-gold fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/40 block mb-0.5">Connect on professional platform</span>
                <span className="text-sm font-semibold text-luxury-black flex items-center gap-1.5 group-hover:text-luxury-gold transition-colors duration-300">
                  linkedin.com/in/rahul-sodanapalli
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-luxury-gold" />
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Luxury Form Panel */}
        <div className="lg:col-span-7 w-full bg-cream border border-luxury-black/[0.03] p-8 md:p-12 rounded-3xl shadow-luxury">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 font-sans">
            
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Rahul Sodanapalli"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full px-4 py-3 bg-cream-light/60 border rounded-xl text-xs focus:outline-none transition-all duration-300 font-medium ${
                    errors.name ? 'border-red-400 focus:border-red-400' : 'border-luxury-black/5 focus:border-luxury-gold focus:bg-cream-light'
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="rahul@example.com"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email structure"
                    }
                  })}
                  className={`w-full px-4 py-3 bg-cream-light/60 border rounded-xl text-xs focus:outline-none transition-all duration-300 font-medium ${
                    errors.email ? 'border-red-400 focus:border-red-400' : 'border-luxury-black/5 focus:border-luxury-gold focus:bg-cream-light'
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Directive / Project Type selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60" htmlFor="projectType">
                Project Directive
              </label>
              <select
                id="projectType"
                {...register("projectType", { required: "Please select a category" })}
                className="w-full px-4 py-3 bg-cream-light/60 border border-luxury-black/5 rounded-xl text-xs focus:outline-none transition-all duration-300 font-medium text-luxury-charcoal focus:border-luxury-gold focus:bg-cream-light focus:text-luxury-black"
              >
                <option value="regulatory">Permits / Regulatory Portal Integration</option>
                <option value="dashboard">Compliance / Analytics Telemetry Dashboard</option>
                <option value="performance">Lighthouse Performance Optimization</option>
                <option value="ai">AI Chat / LLM Orchestration</option>
                <option value="other">General Engineering Engagement</option>
              </select>
            </div>

            {/* Row 3: Message Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest font-bold text-luxury-charcoal/60" htmlFor="message">
                Context details
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Detail your request or engineering challenge..."
                {...register("message", { required: "Message details are required" })}
                className={`w-full px-4 py-3 bg-cream-light/60 border rounded-xl text-xs focus:outline-none transition-all duration-300 font-medium resize-none ${
                  errors.message ? 'border-red-400 focus:border-red-400' : 'border-luxury-black/5 focus:border-luxury-gold focus:bg-cream-light'
                }`}
              />
              {errors.message && (
                <span className="text-[10px] text-red-500 flex items-center gap-1">
                  <AlertCircle size={10} /> {errors.message.message}
                </span>
              )}
            </div>

            {/* Row 4: Submit Button with Morphing Animation */}
            <div className="pt-2 flex justify-start items-center">
              <MagneticButton>
                <motion.button
                  type="submit"
                  disabled={formStatus === 'submitting' || formStatus === 'submitted'}
                  layout
                  className={`relative flex items-center justify-center font-semibold uppercase tracking-widest text-[10px] rounded-full h-12 shadow-luxury transition-all duration-300 disabled:pointer-events-none interactive ${
                    formStatus === 'submitted' 
                      ? 'w-12 bg-luxury-gold text-cream border-luxury-gold' 
                      : 'w-48 bg-luxury-black text-cream hover:bg-luxury-charcoal border-luxury-black'
                  }`}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
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
                        Transmit Directive <Send size={10} />
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
                        {/* Loading spinner */}
                        <span className="w-3.5 h-3.5 border-2 border-cream/35 border-t-cream rounded-full animate-spin block" />
                        Transmitting...
                      </motion.span>
                    )}
                    {formStatus === 'submitted' && (
                      <motion.span 
                        key="submitted"
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-cream"
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
    </section>
  );
}
