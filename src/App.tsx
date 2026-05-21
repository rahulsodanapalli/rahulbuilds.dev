import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

// Lazy load the admin page so portfolio visitors don't load any administrative code
const Admin = React.lazy(() => import('./pages/Admin'));

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={
          <div className="min-h-screen bg-cream flex items-center justify-center font-sans text-xs uppercase tracking-widest text-luxury-gold animate-pulse font-bold">
            Routing System Loading...
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
