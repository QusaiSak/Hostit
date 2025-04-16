
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { GithubRepoList } from '@/components/ui/github-repo-list';
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { motion } from 'framer-motion';
import { Activity, GitBranch, Cpu, BarChart, ArrowUpRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 container mx-auto px-6 pt-24 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-xs font-medium">
                      Beta
                    </span>
                  </div>
                  <p className="text-gray-400">Deploy your projects with one click</p>
                </div>
                
                <div className="hidden md:block">
                  <motion.a 
                    href="https://docs.deployai.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent hover:bg-white/5 border border-blue-500/30 text-blue-400 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Documentation <ArrowUpRight size={14} />
                  </motion.a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { title: "Active Deployments", value: "3", icon: <Activity className="w-5 h-5 text-blue-400" />, percent: 75 },
                  { title: "Connected Repos", value: "12", icon: <GitBranch className="w-5 h-5 text-blue-400" />, percent: 50 },
                  { title: "CPU Usage", value: "18%", icon: <Cpu className="w-5 h-5 text-blue-400" />, percent: 18 },
                  { title: "Bandwidth", value: "1.2 GB", icon: <BarChart className="w-5 h-5 text-blue-400" />, percent: 30 }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:border-blue-500/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-400">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className="bg-blue-500/10 p-2 rounded-full">
                        {stat.icon}
                      </div>
                    </div>
                    <Progress value={stat.percent} className="h-1 bg-blue-950" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <GithubRepoList />
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

export default Dashboard;
