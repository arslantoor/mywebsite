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
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto text-center">
          {/* Main Title - Simple bold Outfit */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold mb-8 leading-[0.85] tracking-[-0.06em] text-foreground">
              Arslan<br />Toor.
            </h1>
          </motion.div>

          {/* Minimalist Professional Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light tracking-widest uppercase">
              Senior AI Systems Engineer
            </p>

            <div className="w-12 h-[1px] bg-primary/40" />

            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground/60 leading-relaxed font-light">
              6+ years of engineering autonomous agents and neural frameworks.
              Bridging the gap between frontier research and production infrastructure.
            </p>
          </motion.div>

          {/* Simple CTA and Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col items-center gap-10"
          >
            <a
              href="#projects"
              className="text-xs uppercase tracking-[0.3em] font-bold text-primary group flex flex-col items-center gap-4 py-4"
            >
              <span>Explore Work</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </a>

            <div className="flex items-center gap-8">
              {[
                { icon: Github, href: 'https://github.com/arslantoor' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-arslan-toor' },
                { icon: Mail, href: 'mailto:muhammadarslantoor@gmail.com' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
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
