import { motion } from 'framer-motion';
import { Linkedin, Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Share2 } from 'lucide-react';

const insights = [
  {
    id: '1',
    content: `Just shipped a multi-agent system that reduced our e-commerce checkout abandonment by 34%.

The secret? Letting each agent specialize:
→ 🛒 Cart Agent: Handles item management
→ 💳 Payment Agent: Optimizes payment flow  
→ 🎁 Personalization Agent: Real-time recommendations

Stop building monolithic agents. Start orchestrating specialists.

#AI #Agents #Ecommerce`,
    likes: 2847,
    comments: 156,
    reposts: 342,
    timestamp: '2d',
  },
  {
    id: '2',
    content: `Hot take: RAG is NOT about vector similarity.

It's about understanding INTENT.

The best RAG systems I've built:
1. Parse user intent first
2. Route to specialized retrievers
3. Re-rank based on context
4. Generate with citations

Vector search is just one piece of the puzzle.

#RAG #LLM #AI`,
    likes: 1523,
    comments: 89,
    reposts: 201,
    timestamp: '4d',
  },
  {
    id: '3',
    content: `Excited to announce: Selected for the MIT Club/Hack-Nation Global AI Hackathon 2026! 🎉

Looking forward to collaborating with brilliant minds on the next generation of agentic systems.

The future of AI isn't about bigger models—it's about smarter orchestration.

#MIT #AIHackathon #Agents`,
    likes: 4521,
    comments: 287,
    reposts: 523,
    timestamp: '1w',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const LinkedInInsights = () => {
  return (
    <section id="insights" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 neural-grid opacity-10" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Linkedin className="w-4 h-4 text-[#0077B5]" />
            <span className="text-sm font-mono text-muted-foreground">Recent Insights</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2 mb-4">
            <Share2 className="w-6 h-6 text-primary" />
            <span>LinkedIn Feed</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts on AI engineering, industry trends, and lessons learned from building production systems.
          </p>
        </motion.div>

        {/* Posts Feed */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {insights.map((post) => (
            <motion.article
              key={post.id}
              variants={item}
              className="glass-card p-6 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-glow-purple/20 flex items-center justify-center text-lg font-bold text-primary">
                    MA
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Muhammad Arslan Toor</h4>
                    <p className="text-xs text-muted-foreground">Senior AI Engineer • {post.timestamp}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-4 text-foreground text-sm leading-relaxed whitespace-pre-line">
                {post.content}
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors group/btn">
                  <Heart className="w-4 h-4 group-hover/btn:fill-current" />
                  <span className="text-sm">{formatNumber(post.likes)}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(post.comments)}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-green-400 transition-colors">
                  <Repeat2 className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(post.reposts)}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View Profile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0077B5] text-white font-medium hover:bg-[#0077B5]/90 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            Follow on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};
