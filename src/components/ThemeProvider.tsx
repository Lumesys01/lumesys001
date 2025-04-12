
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner";

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize theme from localStorage, user preference or system setting
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      
      // Check for user system preference if no stored theme
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Update the HTML class and localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Handle transition state
    if (theme) {
      setIsTransitioning(true);
      
      // Add transition class to smooth all transitions
      root.classList.add('changing-theme');
      
      // Remove old theme class and add new one
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      
      // Store theme preference in localStorage
      localStorage.setItem('theme', theme);
      
      // Remove transition class and reset transition state after animation completes
      const timer = setTimeout(() => {
        root.classList.remove('changing-theme');
        setIsTransitioning(false);
      }, 600); // Match this with the CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only change theme if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Toggle between light and dark themes with transition
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Show toast notification
    // This requires the sonner toast to be added to your App component
    const message = newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled';
    const icon = newTheme === 'dark' ? '🌙' : '☀️';
    
    // Using setTimeout to avoid triggering toast while DOM is transitioning
    setTimeout(() => {
      if (window.toast) {
        window.toast(message, {
          description: `Theme preference saved`,
          icon,
        });
      }
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
