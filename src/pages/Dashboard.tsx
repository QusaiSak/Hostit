
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { GithubRepoList } from '@/components/ui/github-repo-list';
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

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
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <span className="px-3 py-1 bg-launchpad-purple/20 border border-launchpad-purple/30 text-launchpad-purple rounded-full text-xs font-medium">
                  Beta
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { title: "Active Deployments", value: "0", icon: <Zap className="w-5 h-5 text-launchpad-cyan" /> },
                  { title: "Connected Repos", value: "3", icon: <Zap className="w-5 h-5 text-launchpad-cyan" /> },
                  { title: "Total Bandwidth", value: "0 GB", icon: <Zap className="w-5 h-5 text-launchpad-cyan" /> }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/30 border border-white/10 rounded-lg p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="bg-launchpad-purple/10 p-2 rounded-full">
                        {stat.icon}
                      </div>
                    </div>
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
