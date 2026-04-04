import { NeuralBrain3D } from '@/components/BrainEgg3D';
import { SideNav } from '@/components/SideNav';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { VideoSection } from '@/components/VideoSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { TechStackSection } from '@/components/TechStackSection';
import { CommunitySection } from '@/components/CommunitySection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';
import { ChatBot } from '@/components/ChatBot';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden max-w-full">
      {/* 3D Neural Brain Background */}
      <NeuralBrain3D />
      
      {/* Interactive Side Scale-Nav */}
      <SideNav />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <VideoSection />
        <ProjectsSection />
        <TechStackSection />
        <CommunitySection />
        <BlogSection />
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
