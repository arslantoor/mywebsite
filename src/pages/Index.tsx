import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { TechStackSection } from '@/components/TechStackSection';
import { BlogSection } from '@/components/BlogSection';
import { LinkedInInsights } from '@/components/LinkedInInsights';
import { ContactSection } from '@/components/ContactSection';
import { ChatBot } from '@/components/ChatBot';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Neural Network Background */}
      <NeuralBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <TechStackSection />
        <BlogSection />
        <LinkedInInsights />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
