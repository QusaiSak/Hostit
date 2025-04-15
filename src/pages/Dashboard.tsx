
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { GithubRepoList } from '@/components/ui/github-repo-list';
import { AiChatAssistant } from '@/components/ui/ai-chat-assistant';

const Dashboard = () => {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 container mx-auto px-6 pt-24 pb-16">
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
