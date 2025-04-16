
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { HeroSection } from '@/components/ui/hero-section';
import { FeaturesSection } from '@/components/ui/features-section';
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { HowItWorksSection } from '@/components/ui/how-it-works-section';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-6 pt-24">
          <HeroSection />
        </section>
        <HowItWorksSection />
        <FeaturesSection />
      </main>
      <Footer />
      <AiChatAssistant />
    </div>
  );
};

export default Index;
