'use client'

import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

interface GitHubContributionsProps {
  username: string;
  compact?: boolean;
  className?: string;
}

const GitHubContributions: React.FC<GitHubContributionsProps> = ({ 
  username,
  compact = false,
  className = ""
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    // Monochrome-esque palette similar to the provided design
    light: ["#ECEEF1", "#DFE3E9", "#C9CED6", "#AEB5BF", "#8F97A4"],
    dark: ["#1F242B", "#2A3038", "#343B45", "#3F4752", "#4B5563"],
  };

  if (!mounted) {
    return (
      <div className={`w-full ${compact ? 'h-[120px]' : 'h-[160px]'} rounded-xl bg-muted animate-pulse ${className}`} />
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <motion.div
        className="w-full overflow-hidden rounded-xl bg-transparent backdrop-blur-none border-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`${compact ? 'p-2' : 'p-3'}`}>
          <div className="github-calendar-wrapper overflow-x-auto">
            <GitHubCalendar
              username={username}
              colorScheme={resolvedTheme as "light" | "dark"}
              fontSize={12}
              blockSize={compact ? 12 : 14}
              blockMargin={compact ? 3 : 4}
              showWeekdayLabels={!compact}
              theme={theme}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GitHubContributions;
