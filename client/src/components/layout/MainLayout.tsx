import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import LenisSmoothScroll from '../common/LenisSmoothScroll';
import CustomCursor from '../common/CustomCursor';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Routes where the portfolio navbar should be hidden
const HIDDEN_NAVBAR_ROUTES = ['/login', '/admin'];

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const showNavbar = !HIDDEN_NAVBAR_ROUTES.includes(location.pathname);

  return (
    <LenisSmoothScroll>
      <div className="relative min-h-screen bg-cream text-deep-black font-sans selection:bg-burnt-orange/20 selection:text-deep-black bg-noise">
        <CustomCursor />

        {/* Portfolio Nav — hidden on login/admin pages */}
        {showNavbar && <Navbar />}

        {/* Page Container */}
        <main className="relative z-10 w-full">
          {children}
        </main>
      </div>
    </LenisSmoothScroll>
  );
}
