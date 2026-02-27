import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Cpu, Layers, ExternalLink, Github, Zap, Linkedin, Play, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useProjects, useAllProjectImages, Project, ProjectImage } from '@/hooks/useProjects';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const badgeIcons: Record<string, typeof Trophy> = {
  'trophy': Trophy,
  'layers': Layers,
  'zap': Zap,
  'cpu': Cpu,
};

export const ProjectsSection = () => {
  const { data: projects = [], isLoading } = useProjects();
  const { data: allImages = [] } = useAllProjectImages();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getProjectImages = (projectId: string) =>
    allImages.filter((img) => img.project_id === projectId);

  const getSizeClass = (index: number, total: number) => {
    if (total <= 2) return 'md:col-span-2 md:row-span-2';
    if (index < 2) return 'md:col-span-2 md:row-span-2';
    if (index < 4) return 'md:col-span-2 lg:col-span-1 md:row-span-1';
    return 'md:col-span-1 md:row-span-1';
  };

  const isLarge = (index: number, total: number) => {
    if (total <= 2) return true;
    return index < 2;
  };

  const projectImages = selectedProject ? getProjectImages(selectedProject.id) : [];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-3 sm:mb-4">
            <Cpu className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
            <span className="text-xs sm:text-sm lg:text-base font-mono text-muted-foreground">Featured Work</span>
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl font-bold mb-3 sm:mb-4 lg:mb-6">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4">
            A showcase of AI systems, agentic workflows, and neural frameworks built to solve real-world challenges.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 glass-card">
            <Cpu className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground">Projects will appear here once added via admin panel.</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 auto-rows-[180px] sm:auto-rows-[200px] lg:auto-rows-[240px] xl:auto-rows-[280px] 2xl:auto-rows-[320px]"
          >
            {projects.map((project, index) => {
              const images = getProjectImages(project.id);
              const coverImage = images[0]?.image_url;

              return (
                <motion.div
                  key={project.id}
                  variants={item}
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentImageIndex(0);
                  }}
                  className={`group relative glass-card-hover p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between overflow-hidden cursor-pointer ${getSizeClass(index, projects.length)}`}
                >
                  {/* Cover image background */}
                  {coverImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ backgroundImage: `url(${coverImage})` }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {project.badge && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4">
                        <Trophy className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">{project.badge}</span>
                      </div>
                    )}

                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {isLarge(index, projects.length) && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.slice(0, isLarge(index, projects.length) ? 4 : 2).map((tech) => (
                        <span key={tech} className="tech-chip">{tech}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.linkedin_url && (
                        <a
                          href={project.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {project.video_url && (
                        <span className="p-2 rounded-lg bg-secondary text-muted-foreground">
                          <Play className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>

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
        )}
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl 4xl:max-w-[2400px] max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <div>
              {/* Image carousel */}
              {projectImages.length > 0 && (
                <div className="relative w-full aspect-video bg-secondary">
                  <img
                    src={projectImages[currentImageIndex]?.image_url}
                    alt={`${selectedProject.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((i) => (i - 1 + projectImages.length) % projectImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((i) => (i + 1) % projectImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {projectImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? 'bg-primary' : 'bg-foreground/30'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Video embed */}
              {selectedProject.video_url && (
                <div className="w-full aspect-video">
                  <iframe
                    src={selectedProject.video_url}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                    title={`${selectedProject.title} video`}
                  />
                </div>
              )}

              <div className="p-4 sm:p-6 lg:p-8 xl:p-10 space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {selectedProject.badge && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-3">
                        <Trophy className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">{selectedProject.badge}</span>
                      </div>
                    )}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground">{selectedProject.title}</h2>
                  </div>
                </div>

                <p className="text-muted-foreground">{selectedProject.description}</p>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech_stack.map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                  {selectedProject.linkedin_url && (
                    <a
                      href={selectedProject.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Post
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
