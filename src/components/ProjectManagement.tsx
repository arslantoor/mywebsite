import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Edit, Trash2, Save, X, Loader2, Upload, Image as ImageIcon, Star, StarOff,
} from 'lucide-react';
import {
  useProjects, useCreateProject, useUpdateProject, useDeleteProject,
  useUploadProjectMedia, useProjectImages, useAddProjectImage, useDeleteProjectImage,
  Project,
} from '@/hooks/useProjects';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const emptyProject = {
  title: '',
  description: '',
  badge: '' as string | null,
  tech_stack: [] as string[],
  featured: false,
  live_url: '' as string | null,
  github_url: '' as string | null,
  linkedin_url: '' as string | null,
  video_url: '' as string | null,
  display_order: 0,
};

export const ProjectManagement = () => {
  const { data: projects = [], isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const uploadMedia = useUploadProjectMedia();
  const addImage = useAddProjectImage();
  const deleteImage = useDeleteProjectImage();

  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<typeof emptyProject & { id?: string }>(emptyProject);
  const [techInput, setTechInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // For image management in edit dialog
  const { data: editImages = [], refetch: refetchImages } = useProjectImages(editingProject.id ?? null);

  const handleNew = () => {
    setEditingProject(emptyProject);
    setTechInput('');
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject({
      ...project,
      badge: project.badge ?? '',
      live_url: project.live_url ?? '',
      github_url: project.github_url ?? '',
      linkedin_url: project.linkedin_url ?? '',
      video_url: project.video_url ?? '',
    });
    setTechInput(project.tech_stack.join(', '));
    setIsEditing(true);
  };

  const handleSave = async () => {
    const tech_stack = techInput.split(',').map((t) => t.trim()).filter(Boolean);
    const data = {
      ...editingProject,
      tech_stack,
      badge: editingProject.badge || null,
      live_url: editingProject.live_url || null,
      github_url: editingProject.github_url || null,
      linkedin_url: editingProject.linkedin_url || null,
      video_url: editingProject.video_url || null,
    };

    if (editingProject.id) {
      await updateProject.mutateAsync({ id: editingProject.id, ...data });
    } else {
      await createProject.mutateAsync(data);
    }
    setIsEditing(false);
    setEditingProject(emptyProject);
  };

  const handleDelete = async (id: string) => {
    await deleteProject.mutateAsync(id);
    setDeleteConfirm(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !editingProject.id) return;
    const file = e.target.files[0];
    const path = `${editingProject.id}/${Date.now()}-${file.name}`;
    const url = await uploadMedia.mutateAsync({ file, path });
    await addImage.mutateAsync({
      project_id: editingProject.id,
      image_url: url,
      display_order: editImages.length,
    });
    refetchImages();
  };

  const handleDeleteImage = async (id: string) => {
    await deleteImage.mutateAsync(id);
    refetchImages();
  };

  const isSaving = createProject.isPending || updateProject.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold gradient-text">Manage Projects</h2>
        <Button onClick={handleNew} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-6 bg-secondary rounded w-1/3 mb-2" />
              <div className="h-4 bg-secondary rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6">Add your first project to showcase your work</p>
          <Button onClick={handleNew} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold truncate">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        Featured
                      </span>
                    )}
                    {project.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech) => (
                      <span key={tech} className="tech-chip text-xs">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteConfirm(project.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject.id ? 'Edit Project' : 'New Project'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                placeholder="Project title..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                placeholder="Short project description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Badge Label</label>
                <Input
                  value={editingProject.badge ?? ''}
                  onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                  placeholder="e.g. 1st Place Winner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tech Stack (comma-separated)</label>
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, LLM, RAG..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Live Demo URL</label>
                <Input
                  value={editingProject.live_url ?? ''}
                  onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  value={editingProject.github_url ?? ''}
                  onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn Post URL</label>
                <Input
                  value={editingProject.linkedin_url ?? ''}
                  onChange={(e) => setEditingProject({ ...editingProject, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Video Embed URL</label>
                <Input
                  value={editingProject.video_url ?? ''}
                  onChange={(e) => setEditingProject({ ...editingProject, video_url: e.target.value })}
                  placeholder="https://youtube.com/embed/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Order</label>
                <Input
                  type="number"
                  value={editingProject.display_order}
                  onChange={(e) => setEditingProject({ ...editingProject, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Featured project</span>
                </label>
              </div>
            </div>

            {/* Image management - only for existing projects */}
            {editingProject.id && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Project Images</label>
                <div className="flex flex-wrap gap-3">
                  {editImages.map((img) => (
                    <div key={img.id} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-border">
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label className="w-24 h-24 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center cursor-pointer transition-colors">
                    {uploadMedia.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    ) : (
                      <Upload className="w-5 h-5 text-muted-foreground" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadMedia.isPending}
                    />
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">Save the project first to upload images.</p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90"
                disabled={isSaving || !editingProject.title || !editingProject.description}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">This will permanently delete this project and all its images.</p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={deleteProject.isPending}
            >
              {deleteProject.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
