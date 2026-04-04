import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Linkedin, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/useBlogPosts';

// Fallback posts when no DB posts exist
const fallbackPosts = [
  {
    id: '1',
    title: 'Building Production-Ready RAG Systems: Lessons from 50 Deployments',
    excerpt: 'After deploying RAG systems across various domains, here are the patterns that consistently deliver high-quality results...',
    created_at: '2026-01-28',
    published_at: '2026-01-28',
    read_time: '8 min read',
    tags: ['RAG', 'LLM', 'Production'],
  },
  {
    id: '2',
    title: 'Multi-Agent Orchestration: Beyond Simple Chains',
    excerpt: 'When single agents hit their limits, orchestrating multiple specialized agents becomes essential. Here\'s how...',
    created_at: '2026-01-22',
    published_at: '2026-01-22',
    read_time: '12 min read',
    tags: ['Agents', 'Architecture'],
  },
  {
    id: '3',
    title: 'The FastMCP Protocol: A New Standard for Tool Integration',
    excerpt: 'Exploring the Model Context Protocol and how it\'s changing the way we connect LLMs to external tools...',
    created_at: '2026-01-15',
    published_at: '2026-01-15',
    read_time: '6 min read',
    tags: ['MCP', 'Tools', 'Integration'],
  },
];

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

export const BlogSection = () => {
  const { data: dbPosts = [], isLoading } = useBlogPosts();
  const navigate = useNavigate();
  const [sharePreview, setSharePreview] = useState<string | null>(null);

  // Use DB posts if available, otherwise show fallback
  const posts = dbPosts.length > 0 ? dbPosts : fallbackPosts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const generateLinkedInPost = (post: any) => {
    return `🚀 New Post: ${post.title}\n\n${post.excerpt}\n\nRead more on my blog →\n\n#AI #${post.tags.join(' #')} #TechLeadership`;
  };

  const handleShare = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setSharePreview(sharePreview === postId ? null : postId);
  };

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-16 sm:mb-20 md:mb-24 lg:mb-32"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-6">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
            <span className="text-xs sm:text-sm lg:text-base font-mono text-muted-foreground uppercase tracking-[0.2em]">Neural Log</span>
          </div>
          <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold mb-8 leading-[0.9] tracking-tighter text-foreground">
            Stories &<br />Insights.
          </h2>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Exploring the intersection of frontier AI research and production-grade engineering.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
        >
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse space-y-6">
                <div className="aspect-[16/10] bg-zinc-900 rounded-[2rem]" />
                <div className="h-8 bg-zinc-900 rounded-lg w-3/4" />
                <div className="h-4 bg-zinc-900 rounded-lg w-full" />
              </div>
            ))
          ) : (
            posts.slice(0, 3).map((post) => (
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
                  <p className="text-base sm:text-lg text-muted-foreground line-clamp-2 leading-relaxed group-hover:text-foreground transition-colors">
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

                {/* Share Preview Overlay (Inline) */}
                {sharePreview === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mx-6 mb-6 p-4 rounded-2xl bg-zinc-950 border border-white/5 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2 mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <Share2 className="w-3.5 h-3.5 text-primary" />
                      <span>LinkedIn Preview</span>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed mb-4">
                      {generateLinkedInPost(post)}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 rounded-lg bg-[#0077B5] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#0077B5]/90 transition-colors">
                        Share
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generateLinkedInPost(post));
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-700 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-primary group"
          >
            <div className="w-12 h-[1px] bg-primary/20 group-hover:w-16 transition-all duration-500" />
            <span>Discover More</span>
            <div className="w-12 h-[1px] bg-primary/20 group-hover:w-16 transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
