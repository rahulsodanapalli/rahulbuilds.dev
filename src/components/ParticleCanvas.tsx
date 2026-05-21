import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  phase: number;
  phaseSpeed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Scale for Retina / High-DPI screens
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Re-initialize particles relative to screen size
      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      // Density-based particle count
      const area = width * height;
      const count = Math.min(Math.floor(area / 16000), 75); // Safe particle cap
      
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.25 + 0.15,
          alpha: 0,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: Math.random() * 0.01 + 0.005
        });
      }
    };

    // Tracks mouse coordinate targets
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.touches[0].clientX - rect.left;
      mouseRef.current.targetY = e.touches[0].clientY - rect.top;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Force initial sizing
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    resizeCanvas();

    // Core Animation Frame Loop
    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Clean viewport with slight additive trail
      ctx.clearRect(0, 0, w, h);

      // Interpolate mouse coordinates (gentle spring/damping effect)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Draw Connection Lines First (Constellation effect)
      ctx.lineWidth = 0.5;
      const maxConnectDist = 95;

      for (let i = 0; i < particles.length; i++) {
        const pA = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const pB = particles[j];
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            // Proximity opacity scaling
            const alphaFactor = (1 - dist / maxConnectDist) * 0.12;
            const finalAlpha = alphaFactor * Math.min(pA.alpha, pB.alpha);
            
            ctx.strokeStyle = `rgba(197, 168, 128, ${finalAlpha})`;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }

      // Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update sine-breathing alpha
        p.phase += p.phaseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.phase) * 0.08;

        // Apply constant velocity
        p.x += p.vx;
        p.y += p.vy;

        // Add soft magnetic attraction to active cursor coordinates
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            // Stronger pull when closer, but capped to prevent clumping
            const force = (1 - dist / 180) * 0.14;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Warp bounds wrapping
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(197, 168, 128, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none bg-transparent"
    />
  );
}
