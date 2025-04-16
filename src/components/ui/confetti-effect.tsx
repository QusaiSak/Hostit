
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';

interface ConfettiEffectProps {
  show: boolean;
  duration?: number;
  onComplete?: () => void;
}

export const ConfettiEffect = ({ 
  show, 
  duration = 5000, 
  onComplete 
}: ConfettiEffectProps) => {
  const { width, height } = useWindowSize();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (show) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
        if (onComplete) {
          onComplete();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!isActive) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
      colors={['#3B82F6', '#6366F1', '#4F46E5', '#8B5CF6', '#ffffff', '#10B981']}
    />
  );
};
