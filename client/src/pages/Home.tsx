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
const Footer = React.lazy(() => import('../components/layout/Footer'));
const AchievementsSection = React.lazy(() => import('../sections/AchievementsSection'));

// Elegant content-placeholder skeleton to prevent Cumulative Layout Shifts (CLS)
const SectionSkeleton = ({ height = "h-screen" }: { height?: string }) => (
  <div className={`w-full ${height} bg-cream flex items-center justify-center bg-noise`}>
    <div className="flex flex-col items-center gap-5">
      {/* Pulsing accent line */}
      <div className="w-16 h-[1.5px] bg-burnt-orange/30 rounded-full overflow-hidden">
        <div className="w-full h-full bg-burnt-orange rounded-full animate-pulse" />
      </div>
      {/* Placeholder shimmer blocks */}
      <div className="flex flex-col items-center gap-2.5">
        <div className="w-48 h-2 bg-border-cream/60 rounded-full animate-pulse" />
        <div className="w-32 h-2 bg-border-cream/40 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
      </div>
    </div>
  </div>
);

export default function Home() {
  const { setActiveSection } = useStore();

  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'achievements', 'tech', 'mindset', 'code', 'contact'];
    
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
        <AchievementsSection />
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
