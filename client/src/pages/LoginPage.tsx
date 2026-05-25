import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setApiError(null);
      const res = await login(values);
      if (res.success) {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setApiError((err as any)?.data?.message || 'Invalid administrative credentials');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="min-h-screen w-full flex bg-cream overflow-hidden font-sans selection:bg-burnt-orange/20">

      {/* Left Panel - Branding/Visuals (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-deep-black flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none z-10" />

        {/* Animated Background Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full border border-white/5 opacity-20 pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full border border-burnt-orange/10 opacity-30 pointer-events-none"
        />

        <div className="relative z-20">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-white/50 hover:text-white transition-colors duration-300">
            <ArrowLeft size={14} className="text-burnt-orange" />
            Return to Portfolio
          </Link>
        </div>

        <div className="relative z-20 max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
              <ShieldCheck size={32} className="text-burnt-orange" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6 font-display tracking-tight leading-tight">
              Secure <br /><span className="text-burnt-orange italic">System Access</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              This area is restricted to authorized personnel. Please authenticate to manage portfolio content, review analytics, and access administrative tools.
            </p>
          </motion.div>
        </div>

        <div className="relative z-20">
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
            &copy; {new Date().getFullYear()} Rahul Builds. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-cream bg-noise">
        {/* Mobile Return Button */}
        <Link
          to="/"
          className="lg:hidden absolute top-8 left-6 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-secondary-gray hover:text-deep-black transition-all z-10"
        >
          <ArrowLeft size={14} className="text-burnt-orange" />
          Return
        </Link>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative z-10"
        >
          {/* Header (Mobile Only) */}
          <motion.div variants={itemVariants} className="lg:hidden text-center mb-10">
            <div className="w-12 h-12 bg-card-white border border-border-cream rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-minimal">
              <Lock size={20} className="text-burnt-orange" />
            </div>
            <h1 className="text-2xl font-light tracking-tight text-deep-black uppercase font-display">
              Admin <span className="italic font-normal text-burnt-orange">Access</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-2xl font-display text-deep-black hidden lg:block mb-2">Welcome Back</h3>
            <p className="text-secondary-gray text-sm hidden lg:block">Please enter your credentials to proceed.</p>
          </motion.div>

          <AnimatePresence>
            {apiError && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-start gap-3 text-xs leading-relaxed shadow-sm">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{apiError}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2 group">
              <label className="text-[10px] uppercase font-bold tracking-widest text-secondary-gray block group-focus-within:text-deep-black transition-colors">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-gray/40 group-focus-within:text-burnt-orange transition-colors duration-300">
                  <Mail size={16} />
                </span>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@rahulbuilds.dev"
                  className="w-full pl-11 pr-4 py-3.5 bg-card-white border border-border-cream rounded-xl text-sm text-deep-black placeholder-secondary-gray/30 focus:outline-none focus:border-burnt-orange focus:ring-4 focus:ring-burnt-orange/10 transition-all duration-300 shadow-sm"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-burnt-orange font-medium tracking-wide mt-1">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2 group">
              <label className="text-[10px] uppercase font-bold tracking-widest text-secondary-gray block group-focus-within:text-deep-black transition-colors">
                Access Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-gray/40 group-focus-within:text-burnt-orange transition-colors duration-300">
                  <Lock size={16} />
                </span>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-card-white border border-border-cream rounded-xl text-sm text-deep-black placeholder-secondary-gray/30 focus:outline-none focus:border-burnt-orange focus:ring-4 focus:ring-burnt-orange/10 transition-all duration-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-gray/40 hover:text-deep-black transition-colors duration-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-burnt-orange font-medium tracking-wide mt-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-deep-black hover:bg-burnt-orange text-white disabled:opacity-70 disabled:cursor-not-allowed font-semibold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin text-white" />
                    Authenticating...
                  </>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </motion.div>
          </form>

          {/* <motion.div variants={itemVariants} className="mt-10 pt-6 border-t border-border-cream relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cream px-4 text-[10px] uppercase tracking-widest text-secondary-gray font-bold">
              Test Credentials
            </div>
            <div className="bg-card-white/50 rounded-xl p-4 border border-border-cream/50 text-center flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 hover:bg-card-white transition-colors duration-300">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-gray/70 mb-1">Email</span>
                <span className="text-xs text-deep-black font-medium">guest@rahulbuilds.dev</span>
              </div>
              <div className="hidden sm:block w-px bg-border-cream/50"></div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary-gray/70 mb-1">Password</span>
                <span className="text-xs text-deep-black font-medium">guest</span>
              </div>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </div>
  );
}
