
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { HeroSection } from '@/components/ui/hero-section';
import { FeaturesSection } from '@/components/ui/features-section';
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { HowItWorksSection } from '@/components/ui/how-it-works-section';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Terminal, Code, Zap } from 'lucide-react';
import { SignUpButton } from '@clerk/clerk-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-6 pt-32 pb-24 relative">
          {/* Decorative elements */}
          <div className="absolute top-20 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium mb-4">
                Launching Soon
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Deploy your projects with AI-powered speed
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-8">
                HostIT gives you the power to deploy applications instantly with one click.
                Connect your GitHub repositories and let our AI handle the rest.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90">
                    <Github className="mr-2 h-5 w-5" />
                    Sign up with GitHub
                  </Button>
                </SignUpButton>
                <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Preview Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 rounded-xl" style={{ height: '30%', top: 'auto' }}></div>
            <div className="rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="HostIT Dashboard Preview"
                className="w-full h-auto object-cover"
                style={{ minHeight: '300px' }}
              />
            </div>
          </motion.div>
        </section>
        
        {/* Stats Section */}
        <section className="border-t border-b border-white/10 bg-black/30 backdrop-blur-sm py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Deployments", value: "10K+" },
                { label: "Users", value: "5,000+" },
                { label: "Avg. Deploy Time", value: "1.2s" },
                { label: "Uptime", value: "99.9%" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-24 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Deploy smarter, not harder</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our platform combines the power of AI with modern deployment tools to create the fastest development workflow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Github className="h-10 w-10 text-blue-400 mb-4" />,
                title: "GitHub Integration",
                description: "Connect your GitHub repositories directly and deploy with a single click."
              },
              {
                icon: <Terminal className="h-10 w-10 text-blue-400 mb-4" />,
                title: "CLI Support",
                description: "Use our powerful command-line tools for automated and customized deployments."
              },
              {
                icon: <Zap className="h-10 w-10 text-blue-400 mb-4" />,
                title: "AI Optimization",
                description: "Let our AI analyze your code and optimize deployments automatically."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-blue-500/20 transition-all"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
