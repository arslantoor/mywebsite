import { Terminal, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="relative py-16 sm:py-24 border-t border-primary/10 overflow-hidden bg-background">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <a href="#hero" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <span className="font-mono text-xl font-bold tracking-tight text-foreground">
                arslan<span className="text-primary">.ai</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Engineering the future of autonomous systems and neural decision frameworks. 
              6+ years of building production AI that scales from prototype to global infrastructure.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: 'https://github.com/arslantoor', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/arslantoor', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Mail, href: 'mailto:hello@arslan.ai', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-semibold mb-6 text-sm tracking-wide uppercase opacity-75">Services</h4>
            <ul className="space-y-3">
              {[
                'AI System Architecture',
                'MLOps & Infrastructure',
                'Technical Consulting',
                'Agent Framework Design',
                'Custom Neural Solutions',
              ].map((service) => (
                <li key={service} className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation */}
          <div>
            <h4 className="text-foreground font-semibold mb-6 text-sm tracking-wide uppercase opacity-75">Get in Touch</h4>
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Open for consulting engagements, technical partnerships, and strategic AI initiatives.
              </p>
              <div className="space-y-2">
                <p className="text-xs font-mono text-primary">hello@arslan.ai</p>
                <p className="text-xs text-muted-foreground">Berlin, Germany / Remote</p>
              </div>
              <a
                href="mailto:hello@arslan.ai?subject=Consultation%20Request"
                className="inline-block mt-4 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Tech Stack */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <p className="text-xs text-muted-foreground font-mono">
              © 2026 Muhammad Arslan Toor
            </p>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground/30 font-mono">
              <span>GDPR Compliant</span>
              <span>•</span>
              <span>Encrypted Data</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-mono flex items-center gap-2">
            Engineered with <span className="text-primary italic animate-pulse">Neural Logic</span> 
            <span className="opacity-30">|</span> 
            <span>React + Three.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
