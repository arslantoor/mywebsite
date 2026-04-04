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

  const getBentoClass = (index: number) => {
    // Desktop (12 cols) / Tablet (6 cols) / Mobile (1 col)
    if (index === 0) return 'col-span-12 md:col-span-8 row-span-2 aspect-[16/10] md:aspect-auto';
    if (index === 1) return 'col-span-12 md:col-span-4 row-span-1 aspect-square md:aspect-auto';
    if (index === 2) return 'col-span-12 md:col-span-4 row-span-1 aspect-square md:aspect-auto';
    if (index === 3) return 'col-span-12 md:col-span-6 row-span-1 aspect-video md:aspect-auto';
    if (index === 4) return 'col-span-12 md:col-span-6 row-span-1 aspect-video md:aspect-auto';
    return 'col-span-12 md:col-span-4 aspect-square';
  };

  const projectImages = selectedProject ? getProjectImages(selectedProject.id) : [];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-6">
            <Cpu className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
            <span className="text-xs sm:text-sm lg:text-base font-mono text-muted-foreground uppercase tracking-[0.2em]">The Portfolio</span>
          </div>
          <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold mb-8 leading-[0.9] tracking-tighter text-foreground">
            Engineering<br />Outcomes.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Every line of code is a design decision. A curated collection of AI systems and neural frameworks built for scale.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-[2rem]">
            <Cpu className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">No projects yet</h3>
            <p className="text-muted-foreground">The lab is currently empty. Check back soon.</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-4 lg:gap-6 xl:gap-8 auto-rows-[280px] lg:auto-rows-[320px] xl:auto-rows-[380px]"
          >
            {projects.map((project, index) => {
              const images = getProjectImages(project.id);
              const coverImage = images[0]?.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2560';

              return (
                <motion.div
                  key={project.id}
                  variants={item}
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentImageIndex(0);
                  }}
                  className={`group relative rounded-[2rem] overflow-hidden cursor-pointer bg-zinc-900 shadow-2xl transition-all duration-700 hover:shadow-primary/5 ${getBentoClass(index)}`}
                >
                  {/* Full-bleed background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center origin-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${coverImage})` }}
                  />
                  
                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/20 transition-all duration-500" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10 flex flex-col justify-end h-full">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4 backdrop-blur-md">
                          <Trophy className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">{project.badge}</span>
                        </div>
                      )}

                      <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-white/60 line-clamp-2 max-w-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                        {project.tech_stack.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white backdrop-blur-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-6 right-6 p-3 rounded-full bg-black/20 border border-white/10 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
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
