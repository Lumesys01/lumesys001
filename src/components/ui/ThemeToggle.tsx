
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Switch } from '@/components/ui/switch';

export const ThemeToggle = ({ variant = 'icon' }: { variant?: 'icon' | 'switch' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'switch') {
    return (
      <div className="flex items-center gap-2">
        <Sun size={16} className="text-foreground dark:text-foreground-dark" />
        <Switch 
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="data-[state=checked]:bg-accent"
          aria-label="Toggle theme"
        />
        <Moon size={16} className="text-foreground dark:text-foreground-dark" />
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-foreground-dark" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </Button>
  );
};
