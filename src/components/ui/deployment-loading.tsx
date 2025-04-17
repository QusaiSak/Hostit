import { motion } from 'framer-motion';
import { Check, Copy, Link2, Rocket } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { Progress } from './progress';

interface DeploymentLoadingProps {
  deploymentId: string | null;
  isLoading: boolean;
  deploymentUrl: string | null;
  onClose: () => void;
}

export function DeploymentLoading({ deploymentId, isLoading, deploymentUrl, onClose }: DeploymentLoadingProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    if (deploymentUrl) {
      await navigator.clipboard.writeText(deploymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gradient-to-br from-black/80 to-gray-900/80 border border-white/10 rounded-lg p-8 max-w-md w-full shadow-2xl"
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-t-4 border-blue-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Deploying Your Site
            </h2>
            
            <p className="text-gray-400 text-center mb-6">
              We're setting up your deployment environment and configuring your React application.
            </p>
            
            <Progress 
              value={65} 
              className="h-2 w-full mb-4"
              style={{ 
                '--tw-gradient-from': '#3b82f6',
                '--tw-gradient-to': '#60a5fa' 
              } as React.CSSProperties}
            />
            
            <p className="text-sm text-gray-500">Deployment ID: {deploymentId}</p>
          </div>
        ) : deploymentUrl ? (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <Link2 className="w-8 h-8 text-green-500" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-4 text-white">
              Deployment Successful!
            </h2>
            
            <p className="text-gray-400 text-center mb-6">
              Your site has been successfully deployed and is now live at:
            </p>
            
            <div 
              className="bg-white/5 border border-white/10 rounded-lg p-4 w-full mb-6 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer"
              onClick={handleCopyUrl}
            >
              <span className="text-blue-400 truncate">{deploymentUrl}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 p-1 rounded-md hover:bg-white/10"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />
                )}
              </motion.button>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={() => window.open(deploymentUrl, '_blank')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Visit Site
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
} 