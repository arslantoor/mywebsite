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
    color: 'from-cyan-500 to-blue-500',
    technologies: [
      'LangChain', 'LlamaIndex', 'OpenAI GPT-4', 'Claude', 
      'Hugging Face', 'PyTorch', 'TensorFlow', 'RAG Systems',
      'Vector Databases', 'Embeddings', 'Fine-tuning'
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'from-purple-500 to-pink-500',
    technologies: [
      'Python', 'FastAPI', 'Node.js', 'TypeScript',
      'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs',
      'Temporal', 'Celery', 'RabbitMQ'
    ],
  },
  {
    title: 'Cloud',
    icon: Cloud,
    color: 'from-green-500 to-emerald-500',
    technologies: [
      'AWS', 'GCP', 'Azure', 'Kubernetes',
      'Docker', 'Terraform', 'CI/CD', 'MLFlow',
      'Serverless', 'Lambda', 'Cloud Functions'
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    color: 'from-orange-500 to-red-500',
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
    <section id="stack" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Workflow className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">Technical Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building production-grade AI systems and scalable infrastructure.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="glass-card-hover p-6 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-20`}>
                  <category.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
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
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Brain, value: '50+', label: 'AI Models Deployed' },
            { icon: Database, value: '100M+', label: 'Data Points Processed' },
            { icon: Cpu, value: '99.9%', label: 'System Uptime' },
            { icon: Lock, value: '0', label: 'Security Breaches' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-colors"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
