import { motion } from 'framer-motion';

const affiliations = [
  {
    name: 'Lablab.ai',
    logo: '/assets/logos/lablab.webp',
    url: 'https://lablab.ai/u/@arslantoor',
    description: 'AI Hackathon & Creator Community'
  },
  {
    name: 'Hack-Nation',
    logo: '/assets/logos/hack-natio.png',
    url: 'https://projects.hack-nation.ai/#/winners?project=fcf14248-3f94-4ac7-9574-0d5d220d69b9&details=true',
    description: 'Global AI Engineering Network'
  },
  {
    name: 'Devpost',
    logo: '/assets/logos/devpost.svg',
    url: 'https://devpost.com/arslantoor',
    description: 'The Home for Hackathons'
  },
  {
    name: 'MITit',
    logo: '/assets/logos/mit.png',
    url: 'https://mitit.org/contest/login',
    description: 'MIT Technical Innovation Competitions'
  }
];

export const CommunitySection = () => {
  return (
    <section id="community" className="relative py-24 sm:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-7xl relative z-10">
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-[-0.04em]"
          >
            Community Affiliations.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '100px' }}
            viewport={{ once: true }}
            className="h-[1px] bg-primary/40"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {affiliations.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative block aspect-[4/3] sm:aspect-square overflow-hidden rounded-3xl glass-card-hover border border-primary/10 hover:border-primary/30 p-8 flex flex-col items-center justify-center text-center"
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-auto max-h-[140px] object-contain opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10 blur-3xl" />

                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <p className="text-primary font-mono text-[10px] uppercase tracking-[0.2em]">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
