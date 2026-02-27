import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const resumeContext = `
I am Arslan AI Lite, an AI assistant that knows everything about Muhammad Arslan Toor's professional background.

Key Information:
- 6+ years of experience in AI/ML engineering
- Senior AI Engineer specializing in Agentic Workflows and Neural Frameworks
- Selected for MIT Club/Hack-Nation Global AI Hackathon 2026
- 1st Place Winner at Agentic Commerce on Arc competition
- Creator of NeuralAI Unified Framework

Technical Expertise:
- LLM Orchestration, RAG Systems, Multi-Agent Architectures
- Python, FastAPI, Node.js, TypeScript
- AWS, GCP, Kubernetes, Docker
- PyTorch, TensorFlow, LangChain, LlamaIndex

Notable Projects:
- Agentic Commerce Platform (1st place) - AI-powered e-commerce with autonomous shopping agents
- NeuralAI Framework - Comprehensive neural network deployment and scaling framework
- Autonomous RAG Pipeline - Self-optimizing retrieval system
- Multi-Modal Agent Studio - Visual IDE for AI agents

Experience:
- Led AI initiatives at multiple startups and enterprises
- Deployed 50+ AI models to production
- Processed over 100M+ data points
- Maintained 99.9% system uptime
`;

const suggestedQuestions = [
  "What are your top skills?",
  "Tell me about Arc project",
  "Years of experience?",
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Arslan AI Lite 👋 I can answer questions about Arslan's experience, skills, and projects. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes('skill') || q.includes('expertise') || q.includes('good at')) {
      return "Arslan specializes in **LLM Orchestration**, **RAG Systems**, **Multi-Agent Architectures**, and **Neural Framework Development**. He's proficient in Python, FastAPI, PyTorch, and cloud platforms like AWS and GCP.";
    }
    if (q.includes('arc') || q.includes('commerce') || q.includes('1st place') || q.includes('first place')) {
      return "**Agentic Commerce on Arc** won 1st place! It's an AI-powered e-commerce platform featuring autonomous shopping agents that learn user preferences and execute complex purchasing workflows using LLM orchestration and multi-agent systems.";
    }
    if (q.includes('experience') || q.includes('years')) {
      return "Arslan has **6+ years** of experience in AI/ML engineering, working on everything from startup MVPs to enterprise-scale AI systems.";
    }
    if (q.includes('neural') || q.includes('framework')) {
      return "The **NeuralAI Unified Framework** is an open-source project for building, deploying, and scaling neural network architectures with built-in MLOps pipelines. It supports PyTorch, Kubernetes, MLFlow, and ONNX.";
    }
    if (q.includes('mit') || q.includes('hackathon')) {
      return "Arslan was selected for the **MIT Club/Hack-Nation Global AI Hackathon 2026** - a prestigious competition recognizing top AI talent worldwide.";
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('reach')) {
      return "You can reach out through the contact form on this portfolio or connect via LinkedIn! Arslan is always open to discussing interesting AI projects.";
    }
    if (q.includes('project')) {
      return "Key projects include: **Agentic Commerce** (1st place winner), **NeuralAI Framework** (open source), **Autonomous RAG Pipeline**, and **Multi-Modal Agent Studio**. Each showcases different aspects of AI engineering expertise.";
    }
    
    return "That's a great question! Based on Arslan's profile, he's a Senior AI Engineer with deep expertise in agentic workflows and neural systems. Feel free to ask about specific skills, projects, or experience!";
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = generateResponse(messageText);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 xl:bottom-10 xl:right-10 2xl:bottom-12 2xl:right-12 z-50 p-3 sm:p-4 lg:p-5 xl:p-6 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow animate-glow-pulse"
          >
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
            }}
            style={{
              height: isMinimized ? 'auto' : undefined,
              maxHeight: isMinimized ? 'auto' : 'min(600px, calc(100vh - 8rem))',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] lg:w-[480px] xl:w-[520px] 2xl:w-[560px] 3xl:w-[600px] max-w-[calc(100vw-2rem)] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] 2xl:max-w-[560px] 3xl:max-w-[600px] glass-card border border-primary/20 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm lg:text-base text-foreground">Arslan AI Lite</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Online • Ask me anything</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm lg:text-base ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-secondary text-foreground rounded-bl-md'
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length <= 2 && (
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about skills, projects..."
                      className="flex-1 bg-secondary rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm lg:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className="p-2.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
