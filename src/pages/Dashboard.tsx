
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';
import { Footer } from '@/components/ui/footer';
import { GithubRepoList } from '@/components/ui/github-repo-list';
import { Navbar } from '@/components/ui/navbar';
import { Progress } from '@/components/ui/progress';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, BarChart, Cpu, GitBranch } from 'lucide-react';

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
                </div>
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
