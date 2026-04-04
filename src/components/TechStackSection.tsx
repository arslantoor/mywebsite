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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-3 sm:mb-4">
            <Workflow className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
            <span className="text-xs sm:text-sm lg:text-base font-mono text-muted-foreground">Technical Expertise</span>
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl font-bold mb-3 sm:mb-4 lg:mb-6">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4">
            A comprehensive toolkit for building production-grade AI systems and scalable infrastructure.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="glass-card-hover p-4 sm:p-5 md:p-6 lg:p-8 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 lg:p-4 rounded-xl bg-primary/10">
                  <category.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-foreground" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-foreground">{category.title}</h3>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="tech-chip"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8"
        >
          {[
            { icon: Brain, value: '50+', label: 'AI Models Deployed' },
            { icon: Database, value: '100M+', label: 'Data Points Processed' },
            { icon: Cpu, value: '99.9%', label: 'System Uptime' },
            { icon: Lock, value: '0', label: 'Security Breaches' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 text-center group hover:border-primary/30 transition-colors"
            >
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-primary mx-auto mb-2 sm:mb-3" />
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
