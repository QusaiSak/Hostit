
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import { Search, Github, Code, Star, Clock, Rocket, Link2 } from 'lucide-react';
import axios from 'axios';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  language: string | null;
}

export function GithubRepoList() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock fetch GitHub repos (in a real app, this would use the GitHub API with auth)
  const fetchRepos = async () => {
    setIsLoading(true);
    try {
      // In a real app with GitHub OAuth, you'd use the user's token to fetch their repos
      // This is just a mock example using the public API to fetch a sample user's repos
      const response = await axios.get('https://api.github.com/users/octocat/repos');
      setRepos(response.data);
      setFilteredRepos(response.data);
    } catch (error) {
      console.error('Error fetching repos:', error);
      // Mock data as fallback
      const mockRepos: Repository[] = [
        {
          id: 1,
          name: 'next-js-portfolio',
          description: 'My personal website built with Next.js and TailwindCSS',
          html_url: 'https://github.com/user/next-js-portfolio',
          stargazers_count: 12,
          updated_at: '2023-08-15T10:30:00Z',
          language: 'TypeScript'
        },
        {
          id: 2,
          name: 'react-task-manager',
          description: 'A simple task manager built with React and Firebase',
          html_url: 'https://github.com/user/react-task-manager',
          stargazers_count: 8,
          updated_at: '2023-09-02T14:45:00Z',
          language: 'JavaScript'
        },
        {
          id: 3,
          name: 'python-ml-experiments',
          description: 'Machine learning experiments using Python and TensorFlow',
          html_url: 'https://github.com/user/python-ml-experiments',
          stargazers_count: 5,
          updated_at: '2023-07-22T09:15:00Z',
          language: 'Python'
        }
      ];
      setRepos(mockRepos);
      setFilteredRepos(mockRepos);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

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

  const deployRepo = (repoId: number) => {
    // This would connect to your backend deployment service in a real app
    console.log(`Deploying repo with ID: ${repoId}`);
    // Simulate deployment success
    alert(`Deployment initiated for repository! In a real app, this would start your deployment process.`);
  };

  const getRepoLink = (repoId: number) => {
    // This would generate a deployment link in a real app
    console.log(`Getting link for repo with ID: ${repoId}`);
    return `https://deploy-ai-launchpad.web.app/${repoId}`;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Repositories</h2>
          <p className="text-gray-400">Select a repository to deploy</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:flex-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search repositories..." 
              className="pl-10 bg-black/20 border-white/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={fetchRepos}
            variant="outline" 
            className="border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <Github className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {isLoading ? (
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
                className="border border-white/10 rounded-lg p-6 bg-gradient-card hover:border-launchpad-purple/40 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
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
                        className="text-sm text-launchpad-cyan hover:underline flex items-center"
                      >
                        <Code size={14} className="mr-2" />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => alert(`Link generated: ${getRepoLink(repo.id)}`)}
                      variant="outline" 
                      className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                    >
                      <Link2 size={16} className="mr-2" />
                      Get Link
                    </Button>
                    <Button 
                      onClick={() => deployRepo(repo.id)}
                      className="bg-gradient-button"
                    >
                      <Rocket size={16} className="mr-2" />
                      Deploy
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 border border-white/10 rounded-lg bg-black/20">
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
