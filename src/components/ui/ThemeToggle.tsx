
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle = ({ variant = 'icon' }: { variant?: 'icon' | 'switch' }) => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'switch') {
    return (
      <div className="flex items-center gap-2" role="group" aria-label="Toggle color theme">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDark ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          <Sun size={16} className="text-foreground dark:text-foreground-dark" />
        </motion.div>
        
        <Switch 
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="data-[state=checked]:bg-accent relative focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          disabled={isTransitioning}
        >
          {/* Enhanced transition effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-highlight to-accent opacity-30"
            animate={{ 
              opacity: isTransitioning ? 0.8 : 0,
              scale: isTransitioning ? 1.2 : 1,
            }}
            transition={{ duration: 0.8 }}
            aria-hidden="true"
          />
        </Switch>
        
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDark ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          <Moon size={16} className="text-foreground dark:text-foreground-dark" />
        </motion.div>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={isTransitioning}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <Sun className="h-5 w-5 text-foreground-dark" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <Moon className="h-5 w-5 text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced transition effect with ripple */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-highlight to-accent"
        animate={{ 
          opacity: isTransitioning ? 0.3 : 0,
          scale: isTransitioning ? 1.8 : 1
        }}
        transition={{ duration: 0.8 }}
        aria-hidden="true"
      />
      
      {/* Added sparkle effects during transition */}
      {isTransitioning && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, index) => (
            <motion.div 
              key={index}
              className="absolute w-1 h-1 rounded-full bg-highlight/80"
              initial={{ 
                top: `${50 + (Math.random() * 30 - 15)}%`, 
                left: `${50 + (Math.random() * 30 - 15)}%`,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 0.8,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </Button>
  );
};
