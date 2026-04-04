import { motion } from 'framer-motion';
import { Award, Sparkles, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 neural-grid opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 relative z-10">
        <div className="max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto text-center">
          {/* MIT Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              <span className="hidden sm:inline">MIT Club/Hack-Nation Global AI Hackathon (2026) Selection</span>
              <span className="sm:hidden">MIT Hackathon 2026 Selection</span>
            </span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[8rem] font-bold mb-6 leading-[1.05] tracking-tight"
          >
            <span className="text-foreground">Muhammad </span>
            <span className="gradient-text">Arslan Toor</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground mb-6 font-light tracking-wide"
          >
            Architecting <span className="text-primary font-normal">Agentic Systems</span> &
            <span className="text-primary font-normal"> Neural Frameworks</span>
          </motion.p>

          {/* Experience badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10"
          >
            {[
              { highlight: '6+', text: 'Years Experience' },
              { highlight: '', text: 'Senior AI Engineer' },
              { highlight: '', text: 'LLM Specialist' },
            ].map(({ highlight, text }, i) => (
              <span key={text} className="flex items-center gap-2">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-primary/40 hidden sm:block" />}
                <span className="font-mono text-xs sm:text-sm lg:text-base text-muted-foreground">
                  {highlight && <span className="text-primary font-semibold">{highlight} </span>}
                  {text}
                </span>
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-3 lg:py-3.5 text-sm sm:text-base rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 text-center"
            >
              View Projects
            </a>
            <a
              href="#chatbot"
              className="w-full sm:w-auto px-8 py-3 lg:py-3.5 text-sm sm:text-base rounded-xl glass-card border border-primary/20 text-primary font-medium hover:bg-primary/5 transition-all duration-300 text-center"
            >
              Chat with AI
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center justify-center gap-3"
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
                className="p-3 rounded-xl glass-card text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
