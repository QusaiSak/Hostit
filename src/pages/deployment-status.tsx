import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { CheckCircle, Link2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DeploymentData {
  repoId: number;
  repoName: string;
  repoUrl: string;
}

interface DeploymentResponse {
  id: string;
  status: 'success' | 'error';
  url?: string;
  error?: string;
}

export default function DeploymentStatus() {
  const [deploymentData, setDeploymentData] = useState<DeploymentData | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentResponse | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Retrieve deployment data from sessionStorage
    const storedData = sessionStorage.getItem('deploymentData');
    if (storedData) {
      setDeploymentData(JSON.parse(storedData));
    }

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 95));
    }, 500);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const initiateDeployment = async () => {
      if (!deploymentData) return;

      try {
        const response = await fetch('http://localhost:3000/deploy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            repoUrl: deploymentData.repoUrl,
          }),
        });

        if (!response.ok) throw new Error('Deployment failed');
        
        const data = await response.json();
        const deploymentUrl = `http://${data.id}.localhost:3001`;
        
        setDeploymentStatus({
          id: data.id,
          status: 'success',
          url: deploymentUrl,
        });
        
        setProgress(100);
      } catch (error) {
        console.error('Deployment error:', error);
        setDeploymentStatus({
          id: '',
          status: 'error',
          error: 'Failed to deploy the repository',
        });
        toast({
          title: "Deployment Failed",
          description: "There was an error deploying your repository.",
          variant: "destructive"
        });
      }
    };

    if (deploymentData) {
      initiateDeployment();
    }
  }, [deploymentData]);

  if (!deploymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">No deployment data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-8 space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">Deploying Repository</h1>
            <p className="text-gray-400">{deploymentData.repoName}</p>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Status Message */}
          <div className="text-center">
            {!deploymentStatus ? (
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                <span className="text-gray-400">Deploying your repository...</span>
              </div>
            ) : deploymentStatus.status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center space-x-2 text-green-500">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Deployment Successful!</span>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Your site is live at:</p>
                  <a
                    href={deploymentStatus.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center justify-center space-x-2"
                  >
                    <Link2 className="w-4 h-4" />
                    <span>{deploymentStatus.url}</span>
                  </a>
                </div>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Back to Dashboard
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 space-y-4"
              >
                <p>{deploymentStatus.error}</p>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="border-red-500/20 hover:bg-red-500/10"
                >
                  Return to Dashboard
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 