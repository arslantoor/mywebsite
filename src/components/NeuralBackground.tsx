import { useScroll, useTransform, motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export const NeuralBackground = () => {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();

  // Scroll-based transforms for various sections
  // 0-0.2: Hero, 0.2-0.4: Projects, 0.4-0.6: Stack, 0.6-0.8: Blog, 0.8-1.0: Contact
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 1.15, 1.05, 1.2, 1.1, 1.3]);
  const rotate = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 10, -10, 20, -20, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.06, 0.04, 0.07, 0.03, 0.06, 0.1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.02, 0.07]);
  
  // Subtle hue rotation to shift the "vibe" across sections
  const hueRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Dynamic base gradient based on theme */}
      <div
        className="absolute inset-0"
        style={{
          background: 'var(--neural-bg-gradient)',
        }}
      />

      {/* High-Tech Schematic Background - Section-Aware Animation */}
      <motion.div 
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          backgroundImage: `url('/assets/neural-bg.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: `var(--bg-image-filter) hue-rotate(${hueRotate}deg)`,
          scale,
          rotate,
          opacity,
        }}
      />

      {/* Engineering Grid - Dynamic Opacity */}
      <motion.div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        opacity: gridOpacity,
      }} />

      {/* Dynamic secondary glow points */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-primary/30 blur-[1px]"
          animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-[60%] right-[25%] w-1.5 h-1.5 rounded-full bg-accent/30 blur-[1px]"
          animate={{ scale: [1, 2.2, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-[30%] left-[40%] w-1 h-1 rounded-full bg-primary/30 blur-[1px]"
          animate={{ scale: [1, 2, 1], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Pulsing highlights for Tech Stack section (around 0.4 - 0.6 scroll) */}
      <motion.div 
        className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-x-1/2 translate-y-1/2"
        style={{ 
          opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 0.1, 0]),
          scale: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.8, 1.2, 0.8])
        }}
      />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.025]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};
