
import { useState } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { motion } from 'framer-motion';
import { 
  Book, 
  Search, 
  ChevronRight, 
  Copy, 
  CheckCircle,
  FileText,
  Code,
  Terminal,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const categories = [
    {
      title: "Getting Started",
      icon: <FileText className="w-5 h-5" />,
      articles: [
        { title: "Introduction to HostIT", link: "#introduction" },
        { title: "Quick Start Guide", link: "#quick-start" },
        { title: "Creating Your First Project", link: "#first-project" },
        { title: "Account Setup", link: "#account-setup" },
      ]
    },
    {
      title: "Deployments",
      icon: <Terminal className="w-5 h-5" />,
      articles: [
        { title: "Deployment Process", link: "#deployment-process" },
        { title: "Environment Variables", link: "#environment-variables" },
        { title: "Custom Domains", link: "#custom-domains" },
        { title: "Deployment Settings", link: "#deployment-settings" },
      ]
    },
    {
      title: "GitHub Integration",
      icon: <Code className="w-5 h-5" />,
      articles: [
        { title: "Connecting to GitHub", link: "#github-connect" },
        { title: "Managing Repositories", link: "#managing-repos" },
        { title: "Automatic Deployments", link: "#auto-deploy" },
        { title: "Branch Controls", link: "#branch-controls" },
      ]
    },
    {
      title: "Configuration",
      icon: <Settings className="w-5 h-5" />,
      articles: [
        { title: "Project Configuration", link: "#project-config" },
        { title: "Build Settings", link: "#build-settings" },
        { title: "Runtime Settings", link: "#runtime-settings" },
        { title: "Advanced Options", link: "#advanced-options" },
      ]
    },
  ];
  
  const codeSnippets = [
    {
      title: "Connect to GitHub",
      language: "bash",
      code: "# Connect your GitHub account\ndeploy-ai connect --provider github"
    },
    {
      title: "Deploy a Repository",
      language: "bash",
      code: "# Deploy from a GitHub repository\ndeploy-ai deploy --repo username/repository"
    },
    {
      title: "Set Environment Variables",
      language: "bash",
      code: "# Set environment variables\ndeploy-ai env set API_KEY=your_api_key DATABASE_URL=your_db_url"
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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
                  <Book className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Everything you need to know about deploying your projects with HostIT.
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search documentation..." 
                  className="pl-10 bg-black/30 border-white/20 py-6 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Documentation Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-5 sticky top-24">
                  <h3 className="text-lg font-bold mb-4">Documentation</h3>
                  <nav>
                    <ul className="space-y-6">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <div className="flex items-center text-white mb-2">
                            {category.icon}
                            <span className="ml-2 font-medium">{category.title}</span>
                          </div>
                          <ul className="space-y-2 ml-7 border-l border-white/10 pl-4">
                            {category.articles.map((article, articleIndex) => (
                              <li key={articleIndex}>
                                <a 
                                  href={article.link} 
                                  className="text-gray-400 hover:text-white flex items-center text-sm py-1"
                                >
                                  <ChevronRight className="w-3 h-3 mr-1" />
                                  {article.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </motion.div>
              
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                {/* Getting Started Section */}
                <div className="mb-12" id="introduction">
                  <h2 className="text-3xl font-bold mb-6">Getting Started with HostIT</h2>
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                    <p className="text-gray-300 mb-4">
                      HostIT is a modern deployment platform that integrates with GitHub to help you deploy your projects quickly and easily. Our AI-powered platform automatically analyzes your code and sets up the optimal deployment environment.
                    </p>
                    <p className="text-gray-300 mb-4">
                      This documentation will guide you through the process of setting up your account, connecting your GitHub repositories, and deploying your first project.
                    </p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start">
                      <HelpCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
                      <p className="text-blue-300 text-sm">
                        New to HostIT? We recommend starting with our <a href="#quick-start" className="text-blue-400 underline">Quick Start Guide</a> to get up and running in minutes.
                      </p>
                    </div>
                  </div>
                  
                  {/* Code Snippets */}
                  <h3 className="text-2xl font-bold mb-4" id="quick-start">Quick Start Commands</h3>
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {codeSnippets.map((snippet, index) => (
                      <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                          <span className="text-sm font-medium text-white">{snippet.title}</span>
                          <button 
                            onClick={() => copyToClipboard(snippet.code, index)}
                            className="text-gray-400 hover:text-white"
                          >
                            {copiedIndex === index ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-gray-300 overflow-x-auto">
                          <code>{snippet.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                  
                  {/* First Project */}
                  <h3 className="text-2xl font-bold mb-4" id="first-project">Creating Your First Project</h3>
                  <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                    <ol className="list-decimal list-inside space-y-4 text-gray-300">
                      <li>
                        <span className="font-medium text-white">Sign in to your account</span>
                        <p className="mt-1 ml-6">Use your GitHub account to sign in or create a new HostIT account.</p>
                      </li>
                      <li>
                        <span className="font-medium text-white">Connect your GitHub account</span>
                        <p className="mt-1 ml-6">Go to Dashboard → Settings → Integrations and connect your GitHub account.</p>
                      </li>
                      <li>
                        <span className="font-medium text-white">Select a repository</span>
                        <p className="mt-1 ml-6">Choose a repository from the list of available repositories.</p>
                      </li>
                      <li>
                        <span className="font-medium text-white">Configure deployment settings</span>
                        <p className="mt-1 ml-6">Set your preferred deployment settings or use our AI recommendations.</p>
                      </li>
                      <li>
                        <span className="font-medium text-white">Deploy your project</span>
                        <p className="mt-1 ml-6">Click the "Deploy" button to start the deployment process.</p>
                      </li>
                    </ol>
                  </div>
                </div>
                
                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-white/10 rounded-2xl p-8 text-center"
                >
                  <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                  <p className="text-gray-300 max-w-xl mx-auto mb-6">
                    Our support team is ready to assist you with any questions you may have about deploying your projects.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-button">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                      Join Discord Community
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
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

export default Documentation;
