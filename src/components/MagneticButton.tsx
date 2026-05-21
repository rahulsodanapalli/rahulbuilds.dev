import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick,
  role,
  ariaLabel
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Compute center coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate mouse delta from center
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Pull factor (dampen movement to 30% of actual delta)
    const pullFactor = 0.3;
    setOffset({ x: deltaX * pullFactor, y: deltaY * pullFactor });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.1 }}
      className={`relative inline-block ${className}`}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </motion.div>
  );
}
