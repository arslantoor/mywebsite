import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Linkedin, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { NeuralBrain3D } from '@/components/BrainEgg3D';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useBlogPost(id || '');
  const [copied, setCopied] = useState(false);
  const [showSharePreview, setShowSharePreview] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const generateLinkedInPost = () => {
    if (!post) return '';
    return `🚀 New Post: ${post.title}\n\n${post.excerpt}\n\nRead more on my blog →\n\n#AI #${post.tags.join(' #')} #TechLeadership`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateLinkedInPost());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NeuralBrain3D />
        <Navigation />
        <main className="relative z-10 pt-32 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="animate-pulse space-y-8">
              <div className="h-4 bg-zinc-900 rounded w-20" />
              <div className="h-20 bg-zinc-900 rounded w-full" />
              <div className="h-6 bg-zinc-900 rounded w-1/2" />
              <div className="space-y-4 pt-12">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-4 bg-zinc-900 rounded" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NeuralBrain3D />
        <Navigation />
        <main className="relative z-10 pt-32 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-8">Post Not Found.</h1>
            <p className="text-muted-foreground text-xl mb-12">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeuralBrain3D />
      <Navigation />

      <main className="relative z-10 pt-32 pb-24">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Top Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-16"
          >
            <Link
              to="/blog"
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                 <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              <span>Insights</span>
            </Link>

            <button
              onClick={() => setShowSharePreview(!showSharePreview)}
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
            >
              <span>Share Insight</span>
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                 <Share2 className="w-3.5 h-3.5" />
              </div>
            </button>
          </motion.div>

          {/* Share Preview Overlay */}
          {showSharePreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-16 p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <Linkedin className="w-5 h-5 text-primary" />
                <span>LinkedIn Editorial Preview</span>
              </div>
              <div className="bg-black/60 rounded-2xl p-6 font-mono text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed mb-8 border border-white/5">
                {generateLinkedInPost()}
              </div>
              <div className="flex gap-4">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 rounded-xl bg-[#0077B5] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0077B5]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  Post to LinkedIn
                </a>
                <button
                  onClick={handleCopy}
                  className="flex-1 py-4 rounded-xl bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Editorial Text'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Editorial Header */}
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-20"
          >
            {/* Category/Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold mb-12 text-foreground leading-[0.9] tracking-[-0.05em]">
              {post.title}
            </h1>

            {/* Tabular Meta */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-8 py-8 border-y border-white/5">
              <div className="space-y-1">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Published</span>
                 <div className="text-sm font-medium text-muted-foreground">{formatDate(post.published_at || post.created_at)}</div>
              </div>
              <div className="space-y-1">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Reading Time</span>
                 <div className="text-sm font-medium text-muted-foreground">{post.read_time}</div>
              </div>
              <div className="space-y-1 sm:ml-auto">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Author</span>
                 <div className="text-sm font-medium text-muted-foreground">Arslan Toor</div>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="prose prose-invert prose-2xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-zinc-400 prose-p:leading-relaxed prose-strong:text-white prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2rem] prose-pre:p-8"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
          
          {/* Bottom Call to Action */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center text-center"
          >
             <h3 className="text-3xl font-bold mb-8">Enjoyed this insight?</h3>
             <Link
               to="/blog"
               className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.4em] text-primary"
             >
               <div className="w-12 h-[1px] bg-primary/20 group-hover:w-16 transition-all duration-500" />
               <span>Back to The Log</span>
               <div className="w-12 h-[1px] bg-primary/20 group-hover:w-16 transition-all duration-500" />
             </Link>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
