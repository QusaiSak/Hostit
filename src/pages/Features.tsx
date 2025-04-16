
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Bot, 
  Code, 
  Github, 
  Link as LinkIcon, 
  RefreshCw, 
  Globe,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: <Github className="w-10 h-10 text-blue-400" />,
      title: "GitHub Integration",
      description: "Connect your GitHub account and import repositories with a single click. Our platform automatically sets up your project with optimal configurations.",
      color: "from-blue-500/20 to-blue-600/20",
      delay: 0.1
    },
    {
      icon: <Rocket className="w-10 h-10 text-indigo-400" />,
      title: "One-Click Deployment",
      description: "Deploy your projects in seconds, no complex configuration required. Our intelligent system analyzes your code and sets up the perfect environment.",
      color: "from-indigo-500/20 to-indigo-600/20",
      delay: 0.2
    },
    {
      icon: <Bot className="w-10 h-10 text-violet-400" />,
      title: "AI Assistance",
      description: "Get intelligent help with your deployments from our AI assistant powered by cutting-edge models that understand your code and deployment needs.",
      color: "from-violet-500/20 to-violet-600/20",
      delay: 0.3
    }
  ];

  const secondaryFeatures = [
    {
      icon: <LinkIcon className="w-6 h-6 text-blue-400" />,
      title: "Custom Domains",
      description: "Connect your own domain to your deployed projects with automatic SSL certificates and global CDN distribution.",
      delay: 0.4
    },
    {
      icon: <Code className="w-6 h-6 text-blue-400" />,
      title: "Framework Support",
      description: "Support for popular frameworks including React, Next.js, Vue, and more with optimized build configurations.",
      delay: 0.5
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-400" />,
      title: "Continuous Deployment",
      description: "Automatically deploy updates when you push to your repository with branch preview deployments.",
      delay: 0.6
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      title: "Global Edge Network",
      description: "Deploy your applications to our global edge network for ultra-low latency access worldwide.",
      delay: 0.7
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: "Serverless Functions",
      description: "Build and deploy serverless functions alongside your frontend for complete backend functionality.",
      delay: 0.8
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security with automatic updates, vulnerability scanning, and compliance tools.",
      delay: 0.9
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: "Real-time Analytics",
      description: "Monitor your deployments with real-time analytics, error tracking, and performance metrics.",
      delay: 1.0
    }
  ];

  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 container mx-auto px-6 pt-24 pb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-2 mb-4">
                <div className="bg-gradient-button rounded-full p-2">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything you need to deploy and manage your projects with ease,
                powered by AI and seamless GitHub integration.
              </p>
            </motion.div>

            {/* Main Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  viewport={{ once: true }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className={`h-1 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-8">
                    <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl p-4 inline-flex mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Secondary Features */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Our platform provides a comprehensive suite of tools to streamline your deployment workflow.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {secondaryFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    viewport={{ once: true }}
                    className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-blue-500/30 transition-all"
                  >
                    <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-white/10 rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Deploy?</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Experience the future of deployment with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-button px-8 py-3 rounded-lg text-white font-medium"
                >
                  Get Started
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-white/20 bg-white/10 px-8 py-3 rounded-lg text-white font-medium"
                >
                  View Demo
                </motion.button>
              </div>
            </motion.div>
          </main>
          <Footer />
          <AiChatAssistant />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Features;
