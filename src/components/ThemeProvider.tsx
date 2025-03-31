
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
  // Initialize theme from localStorage, but default to 'light' for first-time visitors
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      // Only use stored theme if it exists, otherwise default to light
      return storedTheme ? storedTheme : 'light';
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
      
      // Remove old theme class and add new one
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      
      // Store theme preference in localStorage
      localStorage.setItem('theme', theme);
      
      // Reset transition state after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // Match this with the CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [theme]);

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
