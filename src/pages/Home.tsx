import React, { Suspense, useEffect } from 'react';
import { useStore } from '../hooks/useStore';

// Highly optimized dynamic code-splitting for sub-1.5s paint times
const Hero = React.lazy(() => import('../sections/Hero'));
const About = React.lazy(() => import('../sections/About'));
const Experience = React.lazy(() => import('../sections/Experience'));
const FeaturedProjects = React.lazy(() => import('../sections/FeaturedProjects'));
const TechStack = React.lazy(() => import('../sections/TechStack'));
const Mindset = React.lazy(() => import('../sections/Mindset'));
const CodeShowcase = React.lazy(() => import('../sections/CodeShowcase'));
const Contact = React.lazy(() => import('../sections/Contact'));
const Footer = React.lazy(() => import('../sections/Footer'));

// Premium, height-preserving skeleton mockups to prevent Cumulative Layout Shifts (CLS)
const SectionSkeleton = ({ height = "h-screen" }: { height?: string }) => (
  <div className={`w-full ${height} bg-cream flex items-center justify-center`}>
    <div className="flex flex-col items-center gap-4">
      <span className="w-6 h-6 border-2 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin" />
      <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-charcoal/20">Compiling asset chunk...</span>
    </div>
  </div>
);

export default function Home() {
  const { setActiveSection } = useStore();

  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'tech', 'mindset', 'code', 'contact'];
    
    // Core scroll watcher using zero-overhead IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -40% 0px', // Triggers when section is centered
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [setActiveSection]);

  return (
    <div className="w-full">
      {/* Dynamic Sections with precise lazy compilation */}
      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <FeaturedProjects />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <TechStack />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <Mindset />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <CodeShowcase />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-screen" />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
