
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
  HelpCircle,
  Cpu,
  Globe,
  Shield,
  Zap,
  Database,
  Layers,
  Server
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    {
      title: "Platform Features",
      icon: <Cpu className="w-5 h-5" />,
      articles: [
        { title: "AI Assistance", link: "#ai-assistance" },
        { title: "Analytics", link: "#analytics" },
        { title: "Team Collaboration", link: "#collaboration" },
        { title: "Custom Scripts", link: "#custom-scripts" },
      ]
    },
    {
      title: "Security",
      icon: <Shield className="w-5 h-5" />,
      articles: [
        { title: "Authentication", link: "#authentication" },
        { title: "SSL Encryption", link: "#ssl" },
        { title: "Environment Protection", link: "#env-protection" },
        { title: "Access Controls", link: "#access-controls" },
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
    },
    {
      title: "Configure Custom Domain",
      language: "bash",
      code: "# Add a custom domain to your deployment\ndeploy-ai domain add myapp.com --project my-project"
    },
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
                <Tabs defaultValue="getting-started" className="mb-8">
                  <TabsList className="bg-black/50">
                    <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                    <TabsTrigger value="deployments">Deployments</TabsTrigger>
                    <TabsTrigger value="github">GitHub</TabsTrigger>
                    <TabsTrigger value="platform">Platform</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="getting-started">
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
                      
                      {/* Account Setup */}
                      <h3 className="text-2xl font-bold mb-4" id="account-setup">Account Setup</h3>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                        <p className="text-gray-300 mb-4">
                          To get started with HostIT, you need to create an account and complete your profile setup:
                        </p>
                        <ul className="list-disc list-inside space-y-3 text-gray-300">
                          <li>Sign up with email or GitHub OAuth</li>
                          <li>Verify your email address</li>
                          <li>Set up two-factor authentication (recommended)</li>
                          <li>Complete your profile information</li>
                          <li>Set up your team if you're collaborating with others</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="deployments">
                    {/* Deployments Section */}
                    <div className="mb-12" id="deployment-process">
                      <h2 className="text-3xl font-bold mb-6">Deployment Process</h2>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                        <p className="text-gray-300 mb-4">
                          Our deployment process is designed to be simple yet powerful, with automatic detection of frameworks and build requirements.
                        </p>
                        
                        <h4 className="text-xl font-bold mb-2 text-white">Deployment Steps</h4>
                        <ol className="list-decimal list-inside space-y-3 text-gray-300 mb-6">
                          <li>Code is pushed to your connected GitHub repository</li>
                          <li>HostIT detects changes and initiates the build process</li>
                          <li>Build environment is prepared based on your project type</li>
                          <li>Dependencies are installed and build scripts are executed</li>
                          <li>Output is deployed to our global CDN</li>
                          <li>Your application is live and accessible via your domain</li>
                        </ol>
                        
                        <h4 className="text-xl font-bold mb-2 text-white">Supported Frameworks</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                          {["React", "Vue", "Angular", "Next.js", "Nuxt.js", "Svelte", "Express", "Node.js", "Django"].map((framework, index) => (
                            <div key={index} className="bg-black/40 p-3 rounded-md border border-white/10 text-center text-gray-300">
                              {framework}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Environment Variables */}
                      <h3 className="text-2xl font-bold mb-4" id="environment-variables">Environment Variables</h3>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                        <p className="text-gray-300 mb-4">
                          Securely manage environment variables for your deployments:
                        </p>
                        <ul className="list-disc list-inside space-y-3 text-gray-300 mb-6">
                          <li>Set variables through the dashboard or CLI</li>
                          <li>Encrypted storage for sensitive data</li>
                          <li>Environment-specific variables (production, staging, development)</li>
                          <li>Automatic injection during build and runtime</li>
                        </ul>
                        
                        <div className="bg-gray-900 rounded-lg overflow-hidden">
                          <div className="bg-gray-800 px-4 py-2">
                            <span className="text-sm font-medium text-white">Example Environment Setup</span>
                          </div>
                          <pre className="p-4 text-gray-300 overflow-x-auto">
                            <code>
                              # Setting environment variables<br/>
                              deploy-ai env set DATABASE_URL=postgres://user:pass@host:port/db<br/>
                              deploy-ai env set API_KEY=your_api_key --secret<br/><br/>
                              
                              # Setting environment-specific variables<br/>
                              deploy-ai env set NODE_ENV=production --env production<br/>
                              deploy-ai env set DEBUG=true --env development
                            </code>
                          </pre>
                        </div>
                      </div>
                      
                      {/* Custom Domains */}
                      <h3 className="text-2xl font-bold mb-4" id="custom-domains">Custom Domains</h3>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                        <p className="text-gray-300 mb-4">
                          Connect your own domains to your deployments with automatic SSL certificate provisioning:
                        </p>
                        <ul className="list-disc list-inside space-y-3 text-gray-300">
                          <li>Add custom domains through the dashboard or CLI</li>
                          <li>Automatic HTTPS setup with Let's Encrypt</li>
                          <li>DNS configuration guidance</li>
                          <li>Support for apex domains and subdomains</li>
                          <li>Domain verification process</li>
                        </ul>
                      </div>
                      
                      {/* Deployment Settings */}
                      <h3 className="text-2xl font-bold mb-4" id="deployment-settings">Deployment Settings</h3>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <p className="text-gray-300 mb-4">
                          Customize how your application is built and deployed:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-bold mb-2 text-white">Build Settings</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Custom build commands</li>
                              <li>Build environment selection</li>
                              <li>Cache configuration</li>
                              <li>Dependency management</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold mb-2 text-white">Runtime Settings</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Server specifications</li>
                              <li>Auto-scaling configuration</li>
                              <li>Geographic deployment regions</li>
                              <li>Resource allocation</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="github">
                    {/* GitHub Integration */}
                    <div className="mb-12" id="github-connect">
                      <h2 className="text-3xl font-bold mb-6">GitHub Integration</h2>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                        <p className="text-gray-300 mb-4">
                          HostIT integrates seamlessly with GitHub to provide a smooth deployment workflow:
                        </p>
                        
                        <h4 className="text-xl font-bold mb-2 text-white">Connecting Your GitHub Account</h4>
                        <ol className="list-decimal list-inside space-y-3 text-gray-300 mb-6">
                          <li>Go to Settings → Integrations in your HostIT dashboard</li>
                          <li>Click "Connect GitHub"</li>
                          <li>Authorize HostIT in the GitHub OAuth flow</li>
                          <li>Select which repositories to give access to</li>
                          <li>Your GitHub repositories are now available for deployment</li>
                        </ol>
                        
                        <h4 className="text-xl font-bold mb-2 text-white" id="managing-repos">Managing Repositories</h4>
                        <p className="text-gray-300 mb-4">
                          After connecting your GitHub account, you can:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                          <li>Import repositories directly from GitHub</li>
                          <li>Configure repository-specific settings</li>
                          <li>Set up branch rules for deployment</li>
                          <li>Manage repository access permissions</li>
                        </ul>
                        
                        <h4 className="text-xl font-bold mb-2 text-white" id="auto-deploy">Automatic Deployments</h4>
                        <p className="text-gray-300 mb-4">
                          Configure automatic deployments based on GitHub events:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                          <li>Deploy on push to specific branches</li>
                          <li>Deploy on pull request creation or merge</li>
                          <li>Preview deployments for pull requests</li>
                          <li>Scheduled deployments</li>
                        </ul>
                      </div>
                      
                      {/* Branch Controls */}
                      <h3 className="text-2xl font-bold mb-4" id="branch-controls">Branch Controls</h3>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <p className="text-gray-300 mb-4">
                          Control how different branches are handled in your deployment workflow:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-bold mb-2 text-white">Production Branch</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Usually the main or master branch</li>
                              <li>Deploys to production environment</li>
                              <li>Can require approval before deployment</li>
                              <li>Configurable rollback options</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold mb-2 text-white">Development Branches</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Deploy to preview environments</li>
                              <li>Unique URLs for each branch</li>
                              <li>Automatic tear-down options</li>
                              <li>Integration with PR workflows</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="platform">
                    {/* Platform Features */}
                    <div className="mb-12" id="platform-features">
                      <h2 className="text-3xl font-bold mb-6">Platform Features</h2>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                                <Zap className="w-5 h-5 text-blue-400" />
                              </div>
                              <h4 className="text-xl font-bold text-white" id="ai-assistance">AI Assistance</h4>
                            </div>
                            <p className="text-gray-300 mb-4">
                              Our AI-powered assistant helps optimize your deployment process:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Framework detection</li>
                              <li>Build optimization suggestions</li>
                              <li>Deployment troubleshooting</li>
                              <li>Performance recommendations</li>
                            </ul>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                                <Database className="w-5 h-5 text-blue-400" />
                              </div>
                              <h4 className="text-xl font-bold text-white" id="analytics">Analytics</h4>
                            </div>
                            <p className="text-gray-300 mb-4">
                              Comprehensive analytics for your deployments:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Performance metrics</li>
                              <li>Resource usage tracking</li>
                              <li>Error monitoring</li>
                              <li>User engagement data</li>
                            </ul>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                                <Layers className="w-5 h-5 text-blue-400" />
                              </div>
                              <h4 className="text-xl font-bold text-white" id="collaboration">Team Collaboration</h4>
                            </div>
                            <p className="text-gray-300 mb-4">
                              Tools for team collaboration on projects:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Role-based access control</li>
                              <li>Deployment permissions</li>
                              <li>Activity logs</li>
                              <li>Team notifications</li>
                            </ul>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                                <Server className="w-5 h-5 text-blue-400" />
                              </div>
                              <h4 className="text-xl font-bold text-white" id="custom-scripts">Custom Scripts</h4>
                            </div>
                            <p className="text-gray-300 mb-4">
                              Run custom scripts at various deployment stages:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Pre-build scripts</li>
                              <li>Post-build scripts</li>
                              <li>Pre-deployment scripts</li>
                              <li>Post-deployment scripts</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Security */}
                      <h3 className="text-2xl font-bold mb-4" id="security">Security</h3>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                                <Shield className="w-5 h-5 text-blue-400" />
                              </div>
                              <h4 className="text-xl font-bold text-white" id="authentication">Authentication</h4>
                            </div>
                            <p className="text-gray-300 mb-4">
                              Secure access to your HostIT account:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Multi-factor authentication</li>
                              <li>SSO integration</li>
                              <li>API key management</li>
                              <li>Session controls</li>
                            </ul>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                                <Globe className="w-5 h-5 text-blue-400" />
                              </div>
                              <h4 className="text-xl font-bold text-white" id="ssl">SSL Encryption</h4>
                            </div>
                            <p className="text-gray-300 mb-4">
                              Automatic SSL certificate management:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                              <li>Free SSL certificates</li>
                              <li>Automatic renewals</li>
                              <li>Custom certificate upload</li>
                              <li>HTTP to HTTPS redirection</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faq">
                    {/* FAQ Section */}
                    <div className="mb-12" id="faq">
                      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                      <div className="space-y-6">
                        {[
                          {
                            q: "How does pricing work?",
                            a: "HostIT offers tiered pricing based on your needs, from a free tier for personal projects to enterprise plans for large organizations. Pricing is based on build minutes, bandwidth, and number of projects. Visit our Pricing page for detailed information."
                          },
                          {
                            q: "Can I use my own domain name?",
                            a: "Yes, you can connect any domain you own to your HostIT deployments. We provide automatic SSL certificate provisioning and DNS configuration guidance."
                          },
                          {
                            q: "How do I handle environment variables?",
                            a: "Environment variables can be set through our dashboard or CLI. They are encrypted at rest and injected into your application during build and runtime."
                          },
                          {
                            q: "Do you support server-side rendering?",
                            a: "Yes, HostIT supports server-side rendering for frameworks like Next.js, Nuxt.js, and others that require server-side functionality."
                          },
                          {
                            q: "How do I get support?",
                            a: "We offer multiple support channels including documentation, community forums, and direct support. Enterprise plans include dedicated support."
                          }
                        ].map((faq, index) => (
                          <div key={index} className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                            <h4 className="text-xl font-bold text-white mb-3">{faq.q}</h4>
                            <p className="text-gray-300">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
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
