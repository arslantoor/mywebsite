import { motion } from 'framer-motion';
import { 
  Brain, 
  Server, 
  Cloud, 
  Shield, 
  Workflow,
  Database,
  Cpu,
  Lock
} from 'lucide-react';

const categories = [
  {
    title: 'AI & Automation',
    icon: Brain,
    technologies: [
      'LangChain', 'LlamaIndex', 'OpenAI GPT-4', 'Claude', 
      'Hugging Face', 'PyTorch', 'TensorFlow', 'RAG Systems',
      'Vector Databases', 'Embeddings', 'Fine-tuning'
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    technologies: [
      'Python', 'FastAPI', 'Node.js', 'TypeScript',
      'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs',
      'Temporal', 'Celery', 'RabbitMQ'
    ],
  },
  {
    title: 'Cloud',
    icon: Cloud,
    technologies: [
      'AWS', 'GCP', 'Azure', 'Kubernetes',
      'Docker', 'Terraform', 'CI/CD', 'MLFlow',
      'Serverless', 'Lambda', 'Cloud Functions'
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    technologies: [
      'OAuth 2.0', 'JWT', 'RBAC', 'Encryption',
      'API Security', 'Penetration Testing', 'OWASP',
      'Data Privacy', 'Compliance'
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const TechStackSection = () => {
  return (
    <section id="stack" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px] 2xl:w-[1000px] 2xl:h-[1000px] bg-primary/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[120px] xl:blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-16 sm:mb-20 md:mb-24 lg:mb-32"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-6">
            <Workflow className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
            <span className="text-xs sm:text-sm lg:text-base font-mono text-muted-foreground uppercase tracking-[0.2em]">Architecture</span>
          </div>
          <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold mb-8 leading-[0.9] tracking-tighter text-foreground">
            Capabilities<br />Without Limits.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            A production-ready stack designed for the era of autonomous agents. Scalable, secure, and neural-first.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="relative group p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden"
            >
              {/* Backglow */}
              <div className="absolute -inset-24 bg-primary/0 group-hover:bg-primary/5 blur-[80px] transition-all duration-700" />
              
              {/* Category Header */}
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-colors">
                  <category.icon className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{category.title}</h3>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.slice(0, 8).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[10px] sm:text-xs font-mono font-medium rounded-md bg-white/5 border border-white/5 text-muted-foreground group-hover:border-white/10 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12"
        >
          {[
            { value: '50+', label: 'Engines Built' },
            { value: '100M+', label: 'Neurons Simulated' },
            { value: '99.9%', label: 'Stability Rate' },
            { value: '∞', label: 'Possibilities' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-left border-l border-white/10 pl-6 lg:pl-10 group"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 tabular-nums tracking-tighter group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
