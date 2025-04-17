import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { Button } from '@/components/ui/button';
import { SystemDiagrams } from '@/components/ui/diagrams';
import { Footer } from '@/components/ui/footer';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/ui/navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import {
    Book,
    Bot,
    CheckCircle,
    ChevronRight,
    Code,
    Copy,
    Cpu,
    Database,
    FileText,
    Globe,
    HelpCircle,
    Layers,
    Search,
    Server,
    Settings,
    Shield,
    Terminal,
    Zap
} from 'lucide-react';
import { useState } from 'react';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const handleCopy = (text: string, index: number) => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Documentation</h1>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {/* Sidebar Navigation */}
              <div className="md:col-span-1">
                <div className="sticky top-24 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                  >
                    <nav className="space-y-2">
                      <a href="#getting-started" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/5">
                        <Zap className="w-4 h-4" />
                        <span>Getting Started</span>
                      </a>
                      <a href="#deployment" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/5">
                        <Cpu className="w-4 h-4" />
                        <span>Deployment</span>
                      </a>
                      <a href="#configuration" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/5">
                        <Settings className="w-4 h-4" />
                        <span>Configuration</span>
                      </a>
                      <a href="#system-diagrams" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/5">
                        <FileText className="w-4 h-4" />
                        <span>System Diagrams</span>
                      </a>
                      <a href="#api" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/5">
                        <Code className="w-4 h-4" />
                        <span>API Reference</span>
                      </a>
                      <a href="#faq" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/5">
                        <HelpCircle className="w-4 h-4" />
                        <span>FAQ</span>
                      </a>
                    </nav>
                  </motion.div>
                </div>
              </div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:col-span-3 space-y-8"
              >
                <Tabs defaultValue="getting-started" className="space-y-8">
                  <TabsList className="bg-black/30 border border-white/10">
                    <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                    <TabsTrigger value="deployment">Deployment</TabsTrigger>
                    <TabsTrigger value="configuration">Configuration</TabsTrigger>
                    <TabsTrigger value="system-diagrams">System Diagrams</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>

                  <TabsContent value="getting-started">
                    <div className="space-y-8">
                      <section>
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Quick Start Guide</h2>
                        <div className="space-y-4">
                          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
                            <h3 className="text-xl font-semibold mb-4">1. Connect Your GitHub Account</h3>
                            <p className="text-gray-300 mb-4">Link your GitHub account to start deploying your repositories.</p>
                            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm">
                              <pre className="text-gray-300">$ hostit auth github</pre>
                            </div>
                          </div>

                          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
                            <h3 className="text-xl font-semibold mb-4">2. Initialize Your Project</h3>
                            <p className="text-gray-300 mb-4">Set up your project with HostIT configuration.</p>
                            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm">
                              <pre className="text-gray-300">$ hostit init</pre>
                            </div>
                          </div>

                          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
                            <h3 className="text-xl font-semibold mb-4">3. Deploy Your Project</h3>
                            <p className="text-gray-300 mb-4">Deploy your project with a single command.</p>
                            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm">
                              <pre className="text-gray-300">$ hostit deploy</pre>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </TabsContent>

                  <TabsContent value="deployment">
                    {/* Deployment content */}
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Deployment Options</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
                          <Server className="w-8 h-8 text-blue-400 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Automatic Deployments</h3>
                          <p className="text-gray-300">Set up automatic deployments from your main branch.</p>
                        </div>
                        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
                          <Globe className="w-8 h-8 text-purple-400 mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Custom Domains</h3>
                          <p className="text-gray-300">Configure custom domains for your deployments.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="configuration">
                    {/* Configuration content */}
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Configuration Guide</h2>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Environment Variables</h3>
                        <div className="space-y-4">
                          <div className="bg-black/40 rounded-lg p-4">
                            <pre className="text-gray-300">{`# .env.example
DATABASE_URL=
API_KEY=
NODE_ENV=production`}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="system-diagrams">
                    <SystemDiagrams />
                  </TabsContent>

                  <TabsContent value="api">
                    {/* API Reference content */}
                    <div className="space-y-8">
                      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">API Reference</h2>
                      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold">REST API Endpoints</h3>
                          <Button
                            variant="outline"
                            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                            onClick={() => handleCopy('curl https://api.hostit.com/v1/deployments', 0)}
                          >
                            {copiedIndex === 0 ? (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            ) : (
                              <Copy className="w-4 h-4 mr-2" />
                            )}
                            {copiedIndex === 0 ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <div className="bg-black/40 rounded-lg p-4 font-mono text-sm">
                          <pre className="text-gray-300">curl https://api.hostit.com/v1/deployments</pre>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="faq">
                    {/* FAQ Section */}
                    <div className="mb-12" id="faq">
                      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
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
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors"
                          >
                            <h4 className="text-xl font-bold text-white mb-3">{faq.q}</h4>
                            <p className="text-gray-300">{faq.a}</p>
                          </motion.div>
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
                  className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-white/10 rounded-2xl p-8 text-center mt-16"
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

export default Documentation;
