import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisSmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Scroll restoration control
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Expose Lenis globally to allow other scroll components (e.g. GSAP ScrollTrigger) to interface with it
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <>{children}</>;
}
