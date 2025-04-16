
import { motion } from 'framer-motion';
import { Github, Rocket, Zap, Share2 } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Connect GitHub",
      description: "Link your GitHub account to access all your repositories",
      icon: <Github className="w-10 h-10 text-white" />,
      color: "from-blue-600/20 to-blue-600/10"
    },
    {
      id: 2,
      title: "Select Repository",
      description: "Choose the project you want to deploy from your repositories",
      icon: <Zap className="w-10 h-10 text-white" />,
      color: "from-purple-600/20 to-purple-600/10"
    },
    {
      id: 3,
      title: "One-Click Deploy",
      description: "Deploy your application with a single button click",
      icon: <Rocket className="w-10 h-10 text-white" />,
      color: "from-cyan-600/20 to-cyan-600/10"
    },
    {
      id: 4,
      title: "Share & Collaborate",
      description: "Get a shareable link and invite teammates to collaborate",
      icon: <Share2 className="w-10 h-10 text-white" />,
      color: "from-green-600/20 to-green-600/10"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-black/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Deploy your projects in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br border border-white/10 rounded-xl p-6 h-full bg-black/20 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.color} mb-6 shadow-inner shadow-white/5`}>
                  {step.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <span className="text-primary mr-2">{step.id}.</span> {step.title}
                </h3>
                
                <p className="text-gray-400">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
