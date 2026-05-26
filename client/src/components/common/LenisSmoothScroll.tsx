import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisSmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Scroll restoration control
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      lerp: 0.15,             // Highly responsive linear interpolation (no artificial duration lag)
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
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
