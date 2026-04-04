import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const navItems = [
  { id: 'hero', label: 'Overview' },
  { id: 'intro', label: 'The Vision' },
  { id: 'projects', label: 'The Lineup' },
  { id: 'stack', label: 'Capabilities' },
  { id: 'community', label: 'Affiliations' },
  { id: 'blog', label: 'Neural Log' },
  { id: 'contact', label: 'Connect' },
];

export const SideNav = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('hero');
  
  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(navItems[index].id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-6 sm:left-12 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-start gap-8">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center gap-4 outline-none"
          >
            <motion.div
              animate={{
                scale: isActive ? 1.5 : 1,
                backgroundColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
              }}
              className="w-2.5 h-2.5 rounded-full border border-primary/20 backdrop-blur-sm"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -10,
                scale: isActive ? 1 : 0.8,
              }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold"
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.span>
            
            {/* Hover label */}
            {!isActive && (
              <span className="absolute left-10 font-mono text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-opacity">
                {item.label}
              </span>
            )}
          </a>
        );
      })}
      
      {/* Scroll Progress Line */}
      <div className="absolute left-[5px] top-0 bottom-0 w-[1px] bg-primary/10 -z-10">
        <motion.div
          className="w-full bg-primary origin-top"
          style={{ scaleY: scrollYProgress }}
        />
      </div>
    </div>
  );
};
