import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
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
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setApiError(null);
      const res = await login(values);
      if (res.success) {
        navigate('/admin');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setApiError(err?.data?.message || 'Invalid administrative credentials');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream px-6 select-none relative overflow-hidden bg-noise">
      {/* Abstract elegant background geometry */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-border-cream/40 pointer-events-none -top-20 -left-20 z-0" />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-border-cream/40 pointer-events-none -bottom-20 -right-20 z-0" />

      {/* Floating Return Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-xs uppercase font-sans font-bold tracking-widest text-secondary-gray hover:text-deep-black transition-all duration-300 interactive z-10"
      >
        <ArrowLeft size={14} className="text-burnt-orange" />
        Return to Site
      </Link>

      {/* Luxury Editorial Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-card-white border border-border-cream shadow-minimal relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-cream border border-border-cream rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={20} className="text-burnt-orange" />
          </div>
          <h1 className="text-xl md:text-2xl font-light tracking-tight text-deep-black uppercase font-display">
            Administrative <span className="italic font-normal text-burnt-orange text-2xl md:text-3xl">Access</span>
          </h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-secondary-gray/60 mt-1">
            Authorization Required
          </p>
        </div>

        {/* API Error Notification */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/5 border border-red-500/20 text-red-600 rounded-2xl flex items-start gap-3 text-xs leading-relaxed"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{apiError}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-sans font-bold tracking-widest text-secondary-gray block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-gray/40">
                <Mail size={16} />
              </span>
              <input
                {...register('email')}
                type="email"
                placeholder="admin@rahulbuilds.dev"
                className="w-full pl-12 pr-4 py-3.5 bg-cream/50 border border-border-cream rounded-2xl text-xs text-deep-black placeholder-secondary-gray/45 focus:outline-none focus:border-burnt-orange transition-all duration-300 font-sans"
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-burnt-orange font-medium tracking-wide">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-sans font-bold tracking-widest text-secondary-gray block">
              Access Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-gray/40">
                <Lock size={16} />
              </span>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-cream/50 border border-border-cream rounded-2xl text-xs text-deep-black placeholder-secondary-gray/45 focus:outline-none focus:border-burnt-orange transition-all duration-300 font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-gray/40 hover:text-deep-black transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] text-burnt-orange font-medium tracking-wide">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-deep-black hover:bg-burnt-orange text-cream disabled:opacity-50 disabled:cursor-not-allowed font-semibold uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 interactive mt-8 shadow-minimal font-sans"
          >
            {loading ? (
              <>
                <RefreshCw size={14} className="animate-spin text-cream" />
                Authorizing Session...
              </>
            ) : (
              'Confirm Clearance'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
