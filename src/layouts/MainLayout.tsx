import React from 'react';
import Navbar from '../components/Navbar';
// import CustomCursor from '../components/CustomCursor';
import LenisSmoothScroll from '../components/LenisSmoothScroll';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <LenisSmoothScroll>
      <div className="relative min-h-screen bg-cream text-luxury-black font-sans selection:bg-luxury-gold/20 selection:text-luxury-black bg-noise">
        {/* Cursor Glow */}
        {/* <CustomCursor /> */}
        
        {/* Dynamic Nav Header */}
        <Navbar />
        
        {/* Page Container */}
        <main className="relative z-10 w-full">
          {children}
        </main>
      </div>
    </LenisSmoothScroll>
  );
}
