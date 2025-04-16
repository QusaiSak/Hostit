
import { motion } from 'framer-motion';
import { Button } from './button';
import { ArrowRight, Github, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-hero rounded-2xl flex flex-col items-center justify-center px-6 py-24 text-center mb-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-3xl"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3], 
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0], 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Deploy<span className="text-launchpad-cyan">AI</span> Launchpad
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Your all-in-one platform to effortlessly deploy projects with AI assistance.
            Connect your GitHub, deploy in seconds, and share with the world.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            className="bg-gradient-button hover:shadow-lg hover:shadow-launchpad-purple/40 transition-all text-lg py-6 px-8"
            size="lg"
            onClick={() => navigate('/dashboard')}
          >
            <span className="mr-2">Get Started</span>
            <ArrowRight size={18} />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/20 bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 text-lg py-6 px-8"
          >
            <Github size={18} className="mr-2" />
            <span>Continue with GitHub</span>
          </Button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[
            { title: "Quick Deployment", description: "Deploy in under 60 seconds" },
            { title: "GitHub Integration", description: "Seamless repository connection" },
            { title: "AI Assistance", description: "Get help at every step" }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating deployment icon */}
      <motion.div 
        className="absolute bottom-10 right-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 1, 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
      >
        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-full animate-float">
          <Rocket className="text-white w-8 h-8" />
        </div>
      </motion.div>
    </div>
  );
}
