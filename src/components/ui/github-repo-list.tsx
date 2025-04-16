import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@clerk/clerk-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, ChevronLeft, ChevronRight, Clock, Code, Copy, Github, Link2, RefreshCw, Rocket, Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Input } from './input';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const reposPerPage = 5;
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const fetchRepositories = async (username: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      // Filter for JavaScript, TypeScript, and React projects
      const filteredData = data.filter((repo: Repository) => {
        const isJavaScript = repo.language === 'JavaScript';
        const isTypeScript = repo.language === 'TypeScript';
        const isReactProject = repo.description?.toLowerCase().includes('react') || 
                             repo.name.toLowerCase().includes('react');
        return isJavaScript || isTypeScript || isReactProject;
      });
      
      setRepos(filteredData);
      setFilteredRepos(filteredData);
      setCurrentPage(1);
      
      toast({
        title: "Repositories Updated",
        description: `Found ${filteredData.length} JavaScript/TypeScript/React repositories`,
      });
    } catch (err: unknown) {
      console.error('Error fetching repositories:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Error Refreshing Repositories",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    if (!user?.externalAccounts?.length) {
      toast({
        title: "No GitHub Account",
        description: "Please connect your GitHub account in settings first.",
        variant: "destructive"
      });
      return;
    }

    const githubAccount = user.externalAccounts.find(
      account => account.provider === "github"
    );
    
    if (githubAccount?.username) {
      setIsRefreshing(true);
      setIsRefetching(true);
      await fetchRepositories(githubAccount.username);
      // Add a small delay to make the animation more noticeable
      setTimeout(() => setIsRefetching(false), 500);
    } else {
      toast({
        title: "Error",
        description: "Could not find GitHub username. Please reconnect your GitHub account.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
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

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRepos(repos);
      setCurrentPage(1);
    } else {
      const filtered = repos.filter(repo => 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredRepos(filtered);
      setCurrentPage(1);
    }
  }, [searchQuery, repos]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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

  // Pagination logic
  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeploy = async (repoId: number, repoName: string, repoUrl: string) => {
    setIsDeploying(repoId);
    setDeploymentStatus(prev => ({ ...prev, [repoId]: 'pending' }));
    
    try {
      const response = await fetch('https://localhost:3000/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoUrl,
        })
      });
      
      if (!response.ok) throw new Error('Deployment failed');
      const data = await response.json();
      
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
    const deploymentUrl = `https://hostit-${repoName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.vercel.app`;
    
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
            <Github size={36} className="text-blue-500" />
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
          <p className="text-gray-400">JavaScript, TypeScript, and React projects</p>
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
            onClick={handleRefresh}
            variant="outline" 
            className="border-white/20 bg-white/10 text-white hover:bg-white/20 relative overflow-hidden group"
            disabled={isLoading || isRefreshing}
          >
            <RefreshCw 
              className={`mr-2 h-4 w-4 transition-transform duration-500 ${
                isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
              }`} 
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
            {isRefreshing && (
              <div className="absolute inset-0 bg-white/5"></div>
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isRefetching ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-[400px] flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-gray-400">Updating repositories...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-4"
          >
            {currentRepos.length > 0 ? (
              currentRepos.map((repo) => (
                <motion.div 
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="border border-white/10 rounded-lg p-6 bg-black/20 hover:border-blue-500/40 transition-colors duration-200"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-medium mr-3">{repo.name}</h3>
                        <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                          <Star size={14} className="mr-1" />
                          <span className="text-sm">{repo.stargazers_count}</span>
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
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          <Code size={14} className="mr-2" />
                          <span>View Source</span>
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
                              : 'bg-blue-500 hover:bg-blue-600'
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
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 border border-white/10 rounded-lg bg-black/20"
              >
                <Github size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">No repositories found</h3>
                <p className="text-gray-400">No JavaScript, TypeScript, or React projects found</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      <AnimatePresence>
        {filteredRepos.length > reposPerPage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex justify-center gap-2"
          >
            <Button
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <Button
                key={number}
                variant={currentPage === number ? "default" : "outline"}
                className={`${
                  currentPage === number
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </Button>
            ))}
            <Button
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
