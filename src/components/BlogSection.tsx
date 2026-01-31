import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Linkedin, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';

// Fallback posts when no DB posts exist
const fallbackPosts: Array<{
  id: string;
  title: string;
  excerpt: string;
  created_at: string;
  published_at?: string | null;
  read_time: string;
  tags: string[];
}> = [
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
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const BlogSection = () => {
  const { data: dbPosts = [] } = useBlogPosts();
  const [sharePreview, setSharePreview] = useState<string | null>(null);

  // Use DB posts if available, otherwise show fallback
  const blogPosts = dbPosts.length > 0 ? dbPosts.slice(0, 3) : fallbackPosts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const generateLinkedInPost = (post: any) => {
    return `🚀 New Post: ${post.title}

${post.excerpt}

Read more on my blog →

#AI #${post.tags.join(' #')} #TechLeadership`;
  };

  const handleShare = (postId: string) => {
    setSharePreview(sharePreview === postId ? null : postId);
  };

  return (
    <section id="blog" className="py-24 relative">
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
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">The Daily Log</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and deep-dives into AI engineering, agentic systems, and production ML.
          </p>
        </motion.div>

        {/* Blog Posts */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={item}
              className="glass-card-hover p-6 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tech-chip text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.read_time}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center gap-2">
                  <button
                    onClick={() => handleShare(post.id)}
                    className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                    title="Share to LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors group-hover:bg-primary/20 group-hover:text-primary">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
                      onClick={() => {
                        navigator.clipboard.writeText(generateLinkedInPost(post));
                      }}
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

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
