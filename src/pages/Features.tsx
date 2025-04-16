import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';
import { Navbar } from '@/components/ui/navbar';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Box,
  Cloud,
  Code,
  Command,
  Cpu,
  Database,
  FileCode,
  GitBranch,
  Globe,
  Lock,
  Rocket,
  Server,
  Settings,
  Shield,
  Zap
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Rocket />,
      title: "One-Click Deployments",
      description: "Deploy your applications instantly with a single click. Our platform handles all the complexity for you."
    },
    {
      icon: <GitBranch />,
      title: "Git Integration",
      description: "Seamless integration with GitHub for automatic deployments and preview environments for your pull requests."
    },
    {
      icon: <Bot />,
      title: "AI Assistant",
      description: "Get instant help with deployments and troubleshooting from our AI-powered chat assistant."
    },
  
  ];


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-2 mb-4">
            <div className="bg-gradient-button rounded-full p-2">
              <Cpu className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Platform Features
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to deploy and scale your applications with confidence.
          </p>
        </motion.div>

        {/* Core Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-200 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-white/10 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Deploy your first project in minutes and experience the power of our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-button">
              Start Deploying
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              View Pricing
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
