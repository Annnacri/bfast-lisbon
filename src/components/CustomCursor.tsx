import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    >
      <div className="relative">
        {/* Steam */}
        <motion.div
          animate={{
            y: [-5, -25],
            x: [0, 2, -2, 0],
            opacity: [0, 0.3, 0],
            scale: [0.5, 1.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-8 left-3 w-1.5 h-4 bg-primary/20 rounded-full blur-[2px]"
        />
        <motion.div
          animate={{
            y: [-3, -20],
            x: [0, -1, 1, 0],
            opacity: [0, 0.2, 0],
            scale: [0.6, 1.3],
          }}
          transition={{
            duration: 3.5,
            delay: 1.2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-7 left-5 w-1 h-3 bg-primary/10 rounded-full blur-[2px]"
        />

        {/* Coffee Cup Icon */}
        <motion.div
          animate={{
            rotate: isPointer ? [0, -5, 5, 0] : 0
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill={isPointer ? "rgba(140, 75, 62, 0.1)" : "none"}
            stroke="#8C4B3E" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-colors duration-300 drop-shadow-sm"
          >
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" y1="2" x2="6" y2="4" />
            <line x1="10" y1="2" x2="10" y2="4" />
            <line x1="14" y1="2" x2="14" y2="4" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
