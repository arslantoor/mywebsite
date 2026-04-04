import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Linkedin, Share2, ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';
import { NeuralBrain3D } from '@/components/BrainEgg3D';
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
  const navigate = useNavigate();
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
    return `🚀 New Post: ${post.title}\n\n${post.excerpt}\n\nRead more on my blog →\n\n#AI #${post.tags.join(' #')} #TechLeadership`;
  };

  const handleShare = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
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
      <NeuralBrain3D />
      <Navigation />

      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-20 sm:mb-24 lg:mb-32"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors mb-12"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-8">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Neural Log</span>
                </div>
                <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold text-foreground leading-[0.85] tracking-[-0.05em]">
                  The Log.
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-8 max-w-2xl leading-relaxed">
                  Deep dives into autonomous agents, neural architectures, and the future of engineering.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-white/5 rounded-2xl text-foreground placeholder:text-zinc-600 focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-900/20 rounded-[3rem] p-10 animate-pulse space-y-6">
                  <div className="aspect-[4/3] bg-zinc-800/40 rounded-[2rem]" />
                  <div className="h-8 bg-zinc-800/40 rounded-lg w-3/4" />
                  <div className="h-4 bg-zinc-800/40 rounded-lg w-full" />
                </div>
              ))}
            </div>
          ) : paginatedPosts.length === 0 ? (
            <div className="text-center py-32 glass-card rounded-[3rem]">
              <BookOpen className="w-20 h-20 text-zinc-800 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No insights found.</h2>
              <p className="text-muted-foreground text-lg">
                Try a different search term or check back later.
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            >
              {paginatedPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={item}
                  className="group cursor-pointer flex flex-col relative z-20 bg-zinc-900/40 border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-500 hover:bg-zinc-900/60 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] hover:border-primary/20"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  {/* Feature Image / Placeholder */}
                  <div className="relative aspect-[4/3] rounded-[2.5rem] m-3 overflow-hidden bg-zinc-950 transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                       <div className="w-full h-full border border-white/5 rounded-[2rem] flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">{post.tags[0] || 'AI Engineering'}</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                       </div>
                    </div>
                  </div>
                  
                  {/* Card Meta & Intro */}
                  <div className="px-8 pb-8 pt-4 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                       <span>{post.read_time}</span>
                       <div className="w-1 h-1 rounded-full bg-zinc-700" />
                       <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground line-clamp-2 leading-relaxed group-hover:text-foreground transition-colors font-medium">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                      <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                      <button
                        onClick={(e) => handleShare(e, post.id)}
                        className="p-2.5 rounded-full bg-zinc-950 border border-white/5 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all duration-300"
                      >
                        <Linkedin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* LinkedIn Share Preview */}
                  {sharePreview === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mx-6 mb-6 p-6 rounded-2xl bg-zinc-950 border border-white/5 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <Share2 className="w-4 h-4 text-primary" />
                        <span>LinkedIn Context</span>
                      </div>
                      <div className="bg-black/40 rounded-xl p-4 font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed mb-6">
                        {generateLinkedInPost(post)}
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-3 rounded-xl bg-[#0077B5] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#0077B5]/90 transition-colors">
                          Share Now
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(generateLinkedInPost(post))}
                          className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-700 transition-colors"
                        >
                          Copy Context
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-24"
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer text-xs font-bold uppercase tracking-widest'}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer text-xs font-bold rounded-xl"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer text-xs font-bold uppercase tracking-widest'}
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
