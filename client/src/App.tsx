import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import AdminRoute from './guards/AdminRoute';
import AdminFloatingButton from './components/admin/AdminFloatingButton';

// Lazy load the admin dashboard and login pages so portfolio visitors don't load any administrative code
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

// Premium inline loading screen for route-level Suspense
const RouteLoader = () => (
  <div className="min-h-screen bg-cream flex flex-col items-center justify-center bg-noise gap-6">
    <div className="relative">
      <div className="w-14 h-14 rounded-full border border-border-cream" />
      <div className="absolute inset-0 w-14 h-14 rounded-full border-t-2 border-burnt-orange animate-spin" />
      <span className="absolute inset-0 flex items-center justify-center text-deep-black font-display text-sm font-light tracking-widest">SR</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-deep-black font-display">Loading</span>
      <div className="w-24 h-[1.5px] bg-border-cream rounded-full overflow-hidden">
        <div className="w-full h-full bg-burnt-orange rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

function App() {
  // Dismiss the HTML intro loader after React mounts
  useEffect(() => {
    const loader = document.getElementById('intro-loader');
    if (loader) {
      // Small delay so the transition feels intentional
      const timer = setTimeout(() => {
        loader.classList.add('hide');
        // Remove from DOM after fade-out completes
        setTimeout(() => loader.remove(), 600);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Routes>
        </Suspense>
        <AdminFloatingButton />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
