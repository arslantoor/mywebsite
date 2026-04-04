import { motion } from 'framer-motion';
import { Play, PlayCircle, Monitor, MonitorSmartphone } from 'lucide-react';
import { useState } from 'react';

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="intro" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-4">
            <MonitorSmartphone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
            <span className="text-xs sm:text-sm lg:text-base font-mono text-muted-foreground uppercase tracking-widest">Personal Intro</span>
          </div>
          <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[8rem] 2xl:text-[10rem] font-bold mb-4 leading-none tracking-tighter text-foreground">
            The Vision
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto px-4">
            A quick deep-dive into my engineering philosophy and the future of autonomous neural systems.
          </p>
        </motion.div>

        {/* Apple Frame Video - "Studio Display" Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Bezel / Frame */}
          <div className="relative aspect-video rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 bg-zinc-900 border border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Screen */}
            <div className="relative w-full h-full rounded-[1.4rem] sm:rounded-[2.4rem] overflow-hidden bg-zinc-950 group cursor-pointer">
              {/* Placeholder Content/Video */}
              {!isPlaying ? (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2560')` }}
                >
                  {/* Overlay Scrim */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  
                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(true)}
                    className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_50px_rgba(51,153,255,0.5)]"
                  >
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 fill-current" />
                  </motion.button>
                  
                  <span className="relative z-10 mt-6 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
                    Play Introduction
                  </span>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-black">
                  {/* Actual video element would go here */}
                  <div className="text-center p-8">
                    <p className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Video Stream Initializing...</p>
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="text-primary hover:underline font-mono text-sm uppercase tracking-widest"
                    >
                      Close Video
                    </button>
                  </div>
                </div>
              )}

              {/* Reflection Highlight */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Stand (Optional - Minimalist Apple Style) */}
          <div className="mt-4 flex flex-col items-center opacity-40">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            <div className="w-32 h-16 bg-zinc-900/50 rounded-b-3xl blur-2xl" />
          </div>

          {/* Decorative Backglow */}
          <div className="absolute -inset-4 bg-primary/5 blur-[80px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
