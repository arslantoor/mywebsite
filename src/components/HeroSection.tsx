import { motion } from 'framer-motion';
import { Award, Sparkles, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-16 sm:-left-32 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem] bg-primary/20 rounded-full blur-[64px] sm:blur-[96px] md:blur-[128px] lg:blur-[160px] animate-float" />
      <div className="absolute bottom-1/4 -right-16 sm:-right-32 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem] bg-glow-purple/20 rounded-full blur-[64px] sm:blur-[96px] md:blur-[128px] lg:blur-[160px] animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 relative z-10">
        <div className="max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto text-center">
          {/* MIT Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-6 sm:mb-8 animate-glow-pulse"
          >
            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              <span className="hidden sm:inline">MIT Club/Hack-Nation Global AI Hackathon (2026) Selection</span>
              <span className="sm:hidden">MIT Hackathon 2026 Selection</span>
            </span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-[10rem] 4xl:text-[12rem] font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="text-foreground">Muhammad </span>
            <span className="gradient-text glow-text">Arslan Toor</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl text-muted-foreground mb-4 sm:mb-6 font-light px-4"
          >
            Architecting <span className="text-primary font-medium">Agentic Systems</span> & 
            <span className="text-primary font-medium"> Neural Frameworks</span>
          </motion.p>

          {/* Experience badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 px-4"
          >
            <span className="font-mono text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground">
              <span className="text-primary font-semibold">6+</span> Years Experience
            </span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary hidden sm:inline" />
            <span className="font-mono text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground">
              Senior AI Engineer
            </span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary hidden sm:inline" />
            <span className="font-mono text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground">
              LLM Specialist
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg xl:text-xl rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 text-center"
            >
              View Projects
            </a>
            <a
              href="#chatbot"
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg xl:text-xl rounded-lg glass-card border border-primary/30 text-primary font-medium hover:bg-primary/10 transition-all text-center"
            >
              Chat with AI
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-3 sm:gap-4"
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#contact', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2.5 sm:p-3 lg:p-4 rounded-lg glass-card text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs font-mono">scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
