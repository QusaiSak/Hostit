
import { motion } from 'framer-motion';
import { Button } from './button';
import { ArrowRight, Github, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-hero min-h-[60vh] rounded-xl flex flex-col items-center justify-center px-6 py-24 text-center">
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

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Deploy<span className="text-launchpad-cyan">AI</span> Launchpad
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Deploy your projects in seconds with GitHub integration and AI assistance.
            Build, deploy, and iterate faster than ever before.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            className="bg-gradient-button hover:shadow-lg hover:shadow-launchpad-purple/40 transition-all"
            size="lg"
            onClick={() => navigate('/dashboard')}
          >
            <span className="mr-2">Get Started</span>
            <ArrowRight size={16} />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/20 bg-white/10 backdrop-blur-lg text-white hover:bg-white/20"
          >
            <Github size={16} className="mr-2" />
            <span>Continue with GitHub</span>
          </Button>
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
