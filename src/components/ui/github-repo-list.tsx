
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import { Search, Github, Code, Star, Clock, Rocket, Link2, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Progress } from './progress';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  language: string | null;
  clone_url?: string;
  default_branch?: string;
}

export function GithubRepoList() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedRepo, setCopiedRepo] = useState<number | null>(null);
  const [isDeploying, setIsDeploying] = useState<number | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<Record<number, 'pending' | 'success' | 'error'>>({});
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (isSignedIn && user) {
      // Get GitHub username from user's public metadata or external accounts
      const githubAccount = user.externalAccounts.find(
        account => account.provider === "github"
      );
      
      if (githubAccount?.username) {
        fetchRepositories(githubAccount.username);
      } else {
        setIsLoading(false);
        setError("No GitHub account connected. Please connect your GitHub account in settings.");
      }
    } else {
      setIsLoading(false);
    }
  }, [isSignedIn, user]);

  const fetchRepositories = async (username: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setRepos(data);
      setFilteredRepos(data);
    } catch (err: any) {
      console.error('Error fetching repositories:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRepos(repos);
    } else {
      const filtered = repos.filter(repo => 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredRepos(filtered);
    }
  }, [searchQuery, repos]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Function to get language color
  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'Java': 'bg-red-500',
      'Go': 'bg-blue-400',
      'Ruby': 'bg-red-600',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-purple-500',
    };
    
    return colors[language || ''] || 'bg-gray-400';
  };

  const handleDeploy = async (repoId: number, repoName: string, cloneUrl: string) => {
    setIsDeploying(repoId);
    setDeploymentStatus(prev => ({ ...prev, [repoId]: 'pending' }));
    
    try {
      // In a real app, this would be a call to your backend API
      const token = await getToken({ template: "api_auth" });
      
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // This would be a real API call in production
      // const response = await fetch('https://api.deployai.com/deploy', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     repoName,
      //     cloneUrl,
      //   })
      // });
      
      // if (!response.ok) throw new Error('Deployment failed');
      // const data = await response.json();
      
      setDeploymentStatus(prev => ({ ...prev, [repoId]: 'success' }));
      
      toast({
        title: "Deployment Successful",
        description: `${repoName} has been deployed successfully.`,
      });
    } catch (error) {
      console.error('Deployment error:', error);
      setDeploymentStatus(prev => ({ ...prev, [repoId]: 'error' }));
      
      toast({
        title: "Deployment Failed",
        description: "There was an error deploying your repository.",
        variant: "destructive"
      });
    } finally {
      setIsDeploying(null);
    }
  };

  const getRepoLink = (repoId: number, repoName: string) => {
    // This would generate a deployment link in a real app
    const deploymentUrl = `https://deployai-${repoName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.vercel.app`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(deploymentUrl).then(() => {
      setCopiedRepo(repoId);
      toast({
        title: "Link Copied",
        description: "Deployment link copied to clipboard.",
      });
      
      setTimeout(() => setCopiedRepo(null), 3000);
    });
  };

  if (isLoading && !repos.length) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <Github size={36} className="text-blue-500 animate-pulse" />
          </div>
          <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-400">Fetching your repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 flex flex-col items-center justify-center border border-red-300 bg-red-50/10 rounded-lg">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-500">Error</h3>
        <p className="text-center text-gray-400 mt-2">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Repositories</h2>
          <p className="text-gray-400">Select a repository to deploy</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:flex-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search repositories..." 
              className="pl-10 bg-black/20 border-white/10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => user?.externalAccounts?.find(a => a.provider === "github")?.username && 
              fetchRepositories(user.externalAccounts.find(a => a.provider === "github")!.username!)}
            variant="outline" 
            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            disabled={isLoading}
          >
            <Github className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {isLoading && repos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map(i => (
            <div 
              key={i}
              className="border border-white/10 rounded-lg p-6 bg-black/20 animate-pulse"
            >
              <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-white/10 rounded w-2/3 mb-6"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-white/10 rounded w-1/4"></div>
                <div className="h-10 bg-white/10 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo, index) => (
              <motion.div 
                key={repo.id}
                className="border border-white/10 rounded-lg p-6 bg-gradient-card hover:border-blue-500/40 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-medium mr-3">{repo.name}</h3>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Star size={14} className="mr-1" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4">{repo.description || 'No description'}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      {repo.language && (
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getLanguageColor(repo.language)}`}></div>
                          <span className="text-sm text-gray-300">{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock size={14} className="mr-2" />
                        <span>Updated {formatDate(repo.updated_at)}</span>
                      </div>
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline flex items-center"
                      >
                        <Code size={14} className="mr-2" />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 min-w-[240px]">
                    {deploymentStatus[repo.id] === 'success' ? (
                      <Button 
                        onClick={() => getRepoLink(repo.id, repo.name)}
                        variant="outline" 
                        className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                      >
                        {copiedRepo === repo.id ? (
                          <>
                            <CheckCircle size={16} className="mr-2 text-green-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Link2 size={16} className="mr-2" />
                            Get Link
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleDeploy(repo.id, repo.name, repo.clone_url || '')}
                        disabled={isDeploying === repo.id || deploymentStatus[repo.id] === 'pending'}
                        className={`${
                          deploymentStatus[repo.id] === 'error' 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-gradient-button hover:opacity-90'
                        } min-w-[120px]`}
                      >
                        {isDeploying === repo.id || deploymentStatus[repo.id] === 'pending' ? (
                          <>
                            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                            Deploying...
                          </>
                        ) : deploymentStatus[repo.id] === 'error' ? (
                          <>
                            <AlertCircle size={16} className="mr-2" />
                            Retry
                          </>
                        ) : (
                          <>
                            <Rocket size={16} className="mr-2" />
                            Deploy
                          </>
                        )}
                      </Button>
                    )}
                    
                    {deploymentStatus[repo.id] === 'pending' && (
                      <div className="w-full mt-2">
                        <Progress 
                          value={65} 
                          className="h-1 bg-blue-950"
                          style={{ 
                            '--tw-gradient-from': '#3b82f6',
                            '--tw-gradient-to': '#60a5fa' 
                          } as React.CSSProperties}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 border border-white/10 rounded-lg bg-black/20">
              <Github size={48} className="mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">No repositories found</h3>
              <p className="text-gray-400">Try adjusting your search or connect your GitHub account</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
