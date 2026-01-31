import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Linkedin, Share2, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const POSTS_PER_PAGE = 6;

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

const Blog = () => {
  const { data: posts = [], isLoading } = useBlogPosts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sharePreview, setSharePreview] = useState<string | null>(null);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const generateLinkedInPost = (post: BlogPost) => {
    return `🚀 New Post: ${post.title}

${post.excerpt}

Read more on my blog →

#AI #${post.tags.join(' #')} #TechLeadership`;
  };

  const handleShare = (postId: string) => {
    setSharePreview(sharePreview === postId ? null : postId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralBackground />
      <Navigation />

      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-muted-foreground">The Daily Log</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="gradient-text">All Posts</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} on AI engineering
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>
            </div>
          </motion.div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="h-4 bg-secondary rounded w-1/3 mb-4" />
                  <div className="h-6 bg-secondary rounded w-3/4 mb-2" />
                  <div className="h-4 bg-secondary rounded w-full mb-4" />
                  <div className="h-4 bg-secondary rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No posts found</h2>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try a different search term' : 'Check back soon for new content'}
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={item}
                  className="glass-card-hover p-6 flex flex-col group"
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tech-chip text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.read_time}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(post.id)}
                      className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                      title="Share to LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/blog/${post.id}`}
                      className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* LinkedIn Share Preview */}
                  {sharePreview === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border/50"
                    >
                      <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                        <Share2 className="w-4 h-4 text-primary" />
                        <span>LinkedIn Post Preview</span>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-4 font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                        {generateLinkedInPost(post)}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="px-4 py-2 rounded-lg bg-[#0077B5] text-white text-sm font-medium hover:bg-[#0077B5]/90 transition-colors">
                          Share on LinkedIn
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(generateLinkedInPost(post))}
                          className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                        >
                          Copy Text
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
