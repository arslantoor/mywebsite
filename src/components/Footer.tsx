import { Terminal, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-2">
            <a href="#hero" className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <span className="font-mono text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-foreground">
                arslan<span className="text-primary">.ai</span>
              </span>
            </a>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg max-w-sm mb-4 sm:mb-6">
              Senior AI Engineer specializing in Agentic Workflows, Neural Frameworks, and production-grade ML systems.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Mail, href: 'mailto:hello@arslan.ai', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 sm:p-2.5 lg:p-3 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg xl:text-xl">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {['Projects', 'Tech Stack', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg xl:text-xl">Get in Touch</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
              <li>Open for consulting</li>
              <li>Speaking engagements</li>
              <li>AI/ML advisory</li>
            </ul>
            <a
              href="mailto:hello@arslan.ai"
              className="inline-block mt-3 sm:mt-4 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm md:text-base font-medium hover:bg-primary/20 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 pt-4 sm:pt-5 md:pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center md:text-left">
            © 2026 Muhammad Arslan Toor. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-mono text-center md:text-right">
            Built with <span className="text-primary">React</span> + <span className="text-primary">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
