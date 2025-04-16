import { motion } from 'framer-motion';
import {
  Bot,
  Code,
  Github,
  Link as LinkIcon,
  RefreshCw,
  Rocket
} from 'lucide-react';

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <motion.div 
    className="bg-gradient-card backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-launchpad-purple/10 transition-all"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <div className="bg-launchpad-purple/20 p-3 rounded-lg w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export function FeaturesSection() {
  const features = [
    {
      icon: <Github className="w-6 h-6 text-white" />,
      title: "GitHub Integration",
      description: "Connect your GitHub account and import repositories with a single click.",
      delay: 0.1
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "One-Click Deployment",
      description: "Deploy your projects in seconds with our streamlined deployment process.",
      delay: 0.2
    },
    {
      icon: <Bot className="w-6 h-6 text-white" />,
      title: "Chat Support",
      description: "Get instant help from our chat assistant for any deployment questions.",
      delay: 0.3
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge Your Deployment Workflow</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to deploy and manage your projects,
            with simple one-click deployment and helpful chat support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
