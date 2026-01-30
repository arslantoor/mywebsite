import { motion } from 'framer-motion';
import { Trophy, Cpu, Layers, ExternalLink, Github, Zap } from 'lucide-react';

const projects = [
  {
    title: 'Agentic Commerce on Arc',
    description: 'AI-powered e-commerce platform with autonomous shopping agents that learn user preferences and execute complex purchasing workflows.',
    badge: '1st Place Winner',
    badgeIcon: Trophy,
    techStack: ['LLM Orchestration', 'RAG', 'FastMCP', 'Multi-Agent'],
    featured: true,
    size: 'large',
  },
  {
    title: 'NeuralAI Unified Framework',
    description: 'Comprehensive framework for building, deploying, and scaling neural network architectures with built-in MLOps pipelines.',
    badge: 'Open Source',
    badgeIcon: Layers,
    techStack: ['PyTorch', 'Kubernetes', 'MLFlow', 'ONNX'],
    featured: true,
    size: 'large',
  },
  {
    title: 'Autonomous RAG Pipeline',
    description: 'Self-optimizing retrieval system that automatically tunes embeddings and reranking based on usage patterns.',
    badge: null,
    badgeIcon: null,
    techStack: ['Vector DB', 'LangChain', 'Embeddings'],
    featured: false,
    size: 'medium',
  },
  {
    title: 'Multi-Modal Agent Studio',
    description: 'Visual IDE for designing and testing multi-modal AI agents with real-time debugging.',
    badge: null,
    badgeIcon: null,
    techStack: ['Vision AI', 'WebRTC', 'React'],
    featured: false,
    size: 'medium',
  },
  {
    title: 'LLM Cost Optimizer',
    description: 'Intelligent routing layer that optimizes LLM usage costs by 60%.',
    badge: null,
    badgeIcon: null,
    techStack: ['API Gateway', 'Analytics'],
    featured: false,
    size: 'small',
  },
  {
    title: 'Agentic Workflow Engine',
    description: 'Production-grade orchestration for complex AI workflows.',
    badge: null,
    badgeIcon: null,
    techStack: ['Temporal', 'FastAPI'],
    featured: false,
    size: 'small',
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

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of AI systems, agentic workflows, and neural frameworks built to solve real-world challenges.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {projects.map((project, index) => {
            const sizeClasses = {
              large: 'md:col-span-2 md:row-span-2',
              medium: 'md:col-span-2 lg:col-span-1 md:row-span-1',
              small: 'md:col-span-1 md:row-span-1',
            };

            return (
              <motion.div
                key={project.title}
                variants={item}
                className={`group relative glass-card-hover p-6 flex flex-col justify-between overflow-hidden ${sizeClasses[project.size as keyof typeof sizeClasses]}`}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Badge */}
                  {project.badge && project.badgeIcon && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4">
                      <project.badgeIcon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary">{project.badge}</span>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  {project.size !== 'small' && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="relative z-10">
                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, project.size === 'small' ? 2 : 4).map((tech) => (
                      <span key={tech} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Corner decoration for featured */}
                {project.featured && (
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 to-transparent" />
                    <Zap className="absolute top-3 right-3 w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
