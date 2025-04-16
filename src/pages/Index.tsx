import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { Button } from '@/components/ui/button';
import { FeaturesSection } from '@/components/ui/features-section';
import { Footer } from '@/components/ui/footer';
import { HeroSection } from '@/components/ui/hero-section';
import { HowItWorksSection } from '@/components/ui/how-it-works-section';
import { Navbar } from '@/components/ui/navbar';
import { SignUpButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Github, Sparkles, Terminal, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section with Enhanced Animated Background */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
          {/* Enhanced animated background elements */}
          <div className="absolute inset-0 z-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-3xl"
                style={{
                  width: `${Math.random() * 400 + 100}px`,
                  height: `${Math.random() * 400 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.2, 0.4, 0.2], 
                  scale: [1, 1.3, 1],
                  x: [0, Math.random() * 150 - 75, 0],
                  y: [0, Math.random() * 150 - 75, 0], 
                }}
                transition={{ 
                  duration: Math.random() * 15 + 10, 
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* Enhanced Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-10"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-500/40 rounded-full backdrop-blur-sm shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 text-blue-400 mr-2 animate-pulse" />
                <span className="text-blue-300 font-medium">Launching Soon • Join the Waitlist</span>
              </motion.div>

              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                  <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent pb-4">
                    Deploy your projects
                  </span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    with one click
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Experience lightning-fast deployments with HostIT. 
                  <span className="block mt-2 text-gray-400">
                    Connect your GitHub repositories and watch your projects go live instantly.
                  </span>
                </p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <SignUpButton mode="modal">
                  <Button 
                    size="lg" 
                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Start Deploying
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </SignUpButton>
                <a href="/docs">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="group relative border-white/20 bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-sm shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                  >
                    Learn more 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Enhanced Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative mt-24 mx-auto max-w-5xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10 rounded-xl"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur-3xl opacity-70"></div>
              <div className="relative rounded-xl border border-white/20 shadow-2xl shadow-blue-500/20 overflow-hidden bg-black/40 backdrop-blur-sm hover:border-white/30 transition-colors duration-300">
                <img 
                  src="/dashboard-preview.svg" 
                  alt="HostIT Dashboard Preview - Modern deployment platform interface"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700"
                  style={{ minHeight: '400px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section with Animated Counter */}
        <section className="border-t border-b border-white/10 bg-black/30 backdrop-blur-sm py-20">
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
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2 relative">{stat.value}</p>
                  <p className="text-gray-400 relative">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rest of the sections */}
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
      <AiChatAssistant />
    </div>
  );
};

export default Index;
