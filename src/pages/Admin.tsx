import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Eye, EyeOff, LogOut, ArrowLeft, 
  Save, X, Linkedin, Loader2, Send, BookOpen, FolderKanban
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useIsAdmin } from '@/hooks/useAuth';
import { useBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost, BlogPost } from '@/hooks/useBlogPosts';
import { NeuralBackground } from '@/components/NeuralBackground';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ProjectManagement } from '@/components/ProjectManagement';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const emptyPost = {
  title: '',
  excerpt: '',
  content: '',
  tags: [] as string[],
  read_time: '5 min read',
  is_published: false,
  published_at: null as string | null,
};

const Admin = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { data: posts = [], isLoading: postsLoading } = useBlogPosts(true);
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<typeof emptyPost & { id?: string }>(emptyPost);
  const [tagsInput, setTagsInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [linkedInPreview, setLinkedInPreview] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && user && !isAdmin) {
      toast({ title: 'Access denied', description: 'You are not an admin', variant: 'destructive' });
      navigate('/');
    }
  }, [isAdmin, adminLoading, user, navigate, toast]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTagsInput(post.tags.join(', '));
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingPost(emptyPost);
    setTagsInput('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const postData = {
      ...editingPost,
      tags,
      published_at: editingPost.is_published && !editingPost.published_at 
        ? new Date().toISOString() 
        : editingPost.published_at,
    };

    if (editingPost.id) {
      await updatePost.mutateAsync({ id: editingPost.id, ...postData });
    } else {
      await createPost.mutateAsync(postData);
    }
    
    setIsEditing(false);
    setEditingPost(emptyPost);
  };

  const handleDelete = async (id: string) => {
    await deletePost.mutateAsync(id);
    setDeleteConfirm(null);
  };

  const handleTogglePublish = async (post: BlogPost) => {
    await updatePost.mutateAsync({
      id: post.id,
      is_published: !post.is_published,
      published_at: !post.is_published ? new Date().toISOString() : post.published_at,
    });
  };

  const generateLinkedInPost = (post: BlogPost) => {
    return `🚀 New Post: ${post.title}\n\n${post.excerpt}\n\nRead more on my blog →\n\n#AI #${post.tags.join(' #')} #TechLeadership`;
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NeuralBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Tabs defaultValue="projects" className="space-y-8">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="projects" className="gap-2">
                <FolderKanban className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Blog Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <ProjectManagement />
            </TabsContent>

            <TabsContent value="blog">
              {/* Blog Actions */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Manage Posts</h2>
                <Button onClick={handleNew} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>

              {/* Posts List */}
              {postsLoading ? (
                <div className="grid gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="glass-card p-6 animate-pulse">
                      <div className="h-6 bg-secondary rounded w-1/3 mb-2" />
                      <div className="h-4 bg-secondary rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-16 glass-card">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-6">Create your first blog post to get started</p>
                  <Button onClick={handleNew} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Post
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              post.is_published 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {post.is_published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span key={tag} className="tech-chip text-xs">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setLinkedInPreview(post)} title="Share to LinkedIn">
                            <Linkedin className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleTogglePublish(post)} title={post.is_published ? 'Unpublish' : 'Publish'}>
                            {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(post.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Edit Blog Post Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost.id ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                placeholder="Post title..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Excerpt</label>
              <Textarea
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                placeholder="Brief description..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <RichTextEditor
                content={editingPost.content}
                onChange={(content) => setEditingPost({ ...editingPost, content })}
                placeholder="Start writing your blog post..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="AI, RAG, Production..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Read Time</label>
                <Input
                  value={editingPost.read_time}
                  onChange={(e) => setEditingPost({ ...editingPost, read_time: e.target.value })}
                  placeholder="5 min read"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_published"
                checked={editingPost.is_published}
                onChange={(e) => setEditingPost({ ...editingPost, is_published: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="is_published" className="text-sm font-medium">Publish immediately</label>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                className="bg-primary hover:bg-primary/90"
                disabled={createPost.isPending || updatePost.isPending}
              >
                {(createPost.isPending || updatePost.isPending) ? (
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
            <DialogTitle>Delete Post?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">This action cannot be undone.</p>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={deletePost.isPending}
            >
              {deletePost.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* LinkedIn Preview Dialog */}
      <Dialog open={!!linkedInPreview} onOpenChange={() => setLinkedInPreview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-[#0077B5]" />
              Share to LinkedIn
            </DialogTitle>
          </DialogHeader>
          {linkedInPreview && (
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm text-muted-foreground whitespace-pre-wrap">
                {generateLinkedInPost(linkedInPreview)}
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/blog/' + linkedInPreview.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#0077B5] text-white text-sm font-medium hover:bg-[#0077B5]/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Post to LinkedIn
                </a>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(generateLinkedInPost(linkedInPreview));
                    toast({ title: 'Copied to clipboard!' });
                  }}
                >
                  Copy Text
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
