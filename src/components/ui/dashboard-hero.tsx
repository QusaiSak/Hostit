import { motion } from 'framer-motion';
import React from 'react';

export const DashboardHero = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.03)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.03)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.03)" />
          </linearGradient>
          <linearGradient id="circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background grid */}
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#grid)"
        />

        {/* Animated circles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            initial={{
              cx: 150 + i * 125,
              cy: 200,
              r: 20 + i * 5,
              opacity: 0
            }}
            animate={{
              cx: [150 + i * 125, 150 + i * 125 + 30, 150 + i * 125],
              cy: [200, 180, 200],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
            fill="url(#circle-gradient)"
          />
        ))}

        {/* Animated lines */}
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={`line-${i}`}
            initial={{
              d: `M ${100 + i * 300} 100 Q ${150 + i * 300} 200 ${200 + i * 300} 300`,
              pathLength: 0,
              opacity: 0
            }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut"
            }}
            stroke="url(#circle-gradient)"
            strokeWidth="2"
            fill="none"
          />
        ))}

        {/* Floating dots */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            initial={{
              cx: Math.random() * 800,
              cy: Math.random() * 400,
              r: Math.random() * 3 + 1,
              opacity: 0
            }}
            animate={{
              cx: [
                Math.random() * 800,
                Math.random() * 800,
                Math.random() * 800
              ],
              cy: [
                Math.random() * 400,
                Math.random() * 400,
                Math.random() * 400
              ],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
            fill="url(#circle-gradient)"
          />
        ))}
      </svg>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-block rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-2 mb-4">
            <div className="bg-gradient-button rounded-full p-2">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Your Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Monitor and manage your deployments in one place
          </p>
        </motion.div>
      </div>
    </div>
  );
}; 