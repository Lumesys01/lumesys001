
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
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDark ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Sun size={16} className="text-foreground dark:text-foreground-dark" />
        </motion.div>
        
        <Switch 
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="data-[state=checked]:bg-accent relative"
          aria-label="Toggle theme"
          disabled={isTransitioning}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-highlight to-accent opacity-30"
            animate={{ 
              opacity: isTransitioning ? 0.8 : 0,
            }}
            transition={{ duration: 0.6 }}
          />
        </Switch>
        
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDark ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
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
      className="rounded-full hover:bg-black/5 dark:hover:bg-white/10 relative overflow-hidden"
      aria-label="Toggle theme"
      disabled={isTransitioning}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-5 w-5 text-foreground-dark" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-5 w-5 text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Additional pulse effect when transitioning */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-highlight to-accent"
        animate={{ 
          opacity: isTransitioning ? 0.2 : 0,
          scale: isTransitioning ? 1.5 : 1
        }}
        transition={{ duration: 0.6 }}
      />
    </Button>
  );
};
