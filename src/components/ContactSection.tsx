import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, Loader2, Zap } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message too long (max 1000 chars)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate with zod
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate submission (replace with actual email service later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success state after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card mb-8">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-primary" />
              <span className="text-xs sm:text-sm lg:text-base font-mono text-muted-foreground uppercase tracking-[0.2em]">Contact</span>
            </div>
            <h2 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold mb-8 leading-[0.85] tracking-[-0.05em] text-foreground">
              Say Hello.
            </h2>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed">
              Whether you have a breakthrough idea or just want to discuss the future of AI engineering, my inbox is always open.
            </p>
            
            <div className="mt-12 space-y-6">
               <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-all">
                     <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">arslan@neuralcommand.ai</span>
               </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:mt-32"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 rounded-[2.5rem] bg-zinc-900 border border-white/5 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Message Sent.</h3>
                  <p className="text-muted-foreground text-lg">
                    Expect a response within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-10">
                    {/* Name */}
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl sm:text-2xl text-foreground placeholder:text-zinc-700 focus:outline-none focus:border-primary transition-colors peer"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 peer-focus:w-full" />
                      {errors.name && (
                        <p className="absolute -bottom-6 left-0 text-[10px] uppercase tracking-widest font-bold text-destructive">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl sm:text-2xl text-foreground placeholder:text-zinc-700 focus:outline-none focus:border-primary transition-colors peer"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 peer-focus:w-full" />
                      {errors.email && (
                        <p className="absolute -bottom-6 left-0 text-[10px] uppercase tracking-widest font-bold text-destructive">{errors.email}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={1}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl sm:text-2xl text-foreground placeholder:text-zinc-700 focus:outline-none focus:border-primary transition-colors peer resize-none overflow-hidden"
                        onInput={(e) => {
                           const target = e.target as HTMLTextAreaElement;
                           target.style.height = 'auto';
                           target.style.height = `${target.scrollHeight}px`;
                        }}
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 peer-focus:w-full" />
                      {errors.message && (
                        <p className="absolute -bottom-6 left-0 text-[10px] uppercase tracking-widest font-bold text-destructive">{errors.message}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-full bg-white px-8 py-6 text-black font-bold uppercase tracking-[0.2em] text-xs transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </div>
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
