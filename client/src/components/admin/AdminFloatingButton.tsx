import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Shield, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from '../common/MagneticButton';

export default function AdminFloatingButton() {
  const { isAdmin } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // STAGE 1 CRITICAL GATE: Do not compile/render in DOM if user is not authenticated.
  // This satisfies the security criteria: no DOM presence or hint of admin buttons for general public.
  if (!isAdmin) {
    return null;
  }

  const isDashboard = location.pathname.startsWith('/admin');

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-auto">
      <MagneticButton>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Link
            to={isDashboard ? '/' : '/admin'}
            className="w-14 h-14 bg-deep-black text-cream hover:bg-burnt-orange border border-deep-black hover:border-burnt-orange rounded-full flex items-center justify-center shadow-minimal hover:scale-105 transition-all duration-300 relative group"
            title={isDashboard ? 'Return to Home Portfolio' : 'Go to Admin Dashboard'}
          >
            {isDashboard ? <Home size={20} /> : <Shield size={20} />}
            
            {/* Tooltip */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-deep-black text-cream text-[9px] uppercase tracking-widest font-bold border border-deep-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {isDashboard ? 'Return Home' : 'Admin Dashboard'}
            </span>
          </Link>
        </motion.div>
      </MagneticButton>
    </div>
  );
}
