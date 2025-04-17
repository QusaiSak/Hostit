import { motion } from 'framer-motion';
import { Code2, GitBranch, GitFork, ZoomIn } from 'lucide-react';
import { useState } from 'react';

export const SystemDiagrams = () => {
  const [expandedDiagram, setExpandedDiagram] = useState<string | null>(null);

  return (
    <div className="space-y-16">
      {/* Use Case Diagram Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center">
          <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-2 mb-4">
            <div className="bg-gradient-button rounded-full p-2">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            System Use Cases
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Overview of the main actors and their interactions with the HostIT platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* UML Diagram */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="relative group cursor-pointer" onClick={() => setExpandedDiagram('usecase')}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity rounded-lg">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
              <img 
                src="/docs/use-case-diagram.svg" 
                alt="Use Case Diagram"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Interactive Legend */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Main Actors</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                      <span className="text-blue-400 text-sm">👤</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Developer</h4>
                      <p className="text-gray-400 text-sm">Primary user who deploys and manages applications</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                      <span className="text-purple-400 text-sm">👑</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Admin</h4>
                      <p className="text-gray-400 text-sm">Platform administrator with enhanced access</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                      <span className="text-green-400 text-sm">🤖</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">AI Assistant</h4>
                      <p className="text-gray-400 text-sm">Provides deployment and troubleshooting assistance</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center mt-1">
                      <span className="text-gray-400 text-sm">🔗</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">GitHub</h4>
                      <p className="text-gray-400 text-sm">External system for repository management</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Core Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                      <span className="text-blue-400 text-sm">🚀</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Deployment Management</h4>
                      <p className="text-gray-400 text-sm">One-click deployments and configuration</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                      <span className="text-purple-400 text-sm">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Monitoring</h4>
                      <p className="text-gray-400 text-sm">Real-time deployment status and analytics</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                      <span className="text-green-400 text-sm">🌐</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Domain Management</h4>
                      <p className="text-gray-400 text-sm">Custom domain configuration and SSL</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Activity Diagram Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-8"
      >
        <div className="text-center">
          <div className="inline-block rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-2 mb-4">
            <div className="bg-gradient-button rounded-full p-2">
              <GitFork className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Deployment Flow
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Step-by-step process of deploying an application on HostIT.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* UML Diagram */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="relative group cursor-pointer" onClick={() => setExpandedDiagram('activity')}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity rounded-lg">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
              <img 
                src="/docs/activity-diagram.svg" 
                alt="Activity Diagram"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Interactive Steps */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "Authentication",
                    icon: "🔐",
                    steps: ["Sign in to platform", "GitHub authentication", "Access validation"]
                  },
                  {
                    title: "Configuration",
                    icon: "⚙️",
                    steps: ["Select repository", "Set environment variables", "Configure deployment settings"]
                  },
                  {
                    title: "Deployment",
                    icon: "🚀",
                    steps: ["Build process", "Tests execution", "Production deployment"]
                  }
                ].map((phase, index) => (
                  <motion.div
                    key={phase.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <span className="text-lg">{phase.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {phase.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-center space-x-2 text-gray-400">
                          <Code2 className="w-4 h-4" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Modal for expanded diagrams */}
      {expandedDiagram && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedDiagram(null)}
        >
          <div className="max-w-4xl w-full bg-black/90 p-4 rounded-lg">
            <img 
              src={`/docs/${expandedDiagram}-diagram.svg`}
              alt={`${expandedDiagram} Diagram`}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}; 