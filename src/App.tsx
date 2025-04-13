
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Helmet } from "react-helmet";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import { toast } from "sonner";

// Make toast available globally for ThemeProvider
declare global {
  interface Window {
    toast: typeof toast;
  }
}

if (typeof window !== 'undefined') {
  window.toast = toast;
}

// Configure QueryClient for optimal performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes
      retry: 1,
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lumesys - AI-Powered Energy Optimization Solutions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Add preload for critical resources */}
        <link rel="preload" href="/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png" as="image" />
        
        {/* Add resource hints */}
        <link rel="prefetch" href="/src/components/DashboardPreview.tsx" />
        
        {/* SEO enhancements */}
        <meta name="description" content="Reduce building energy costs by at least 10% with Lumesys AI-driven optimization platform. Smart, sustainable, and proven solutions for facilities management." />
        <meta name="keywords" content="energy management, AI building solutions, HVAC optimization, energy cost reduction, smart buildings, energy efficiency, sustainability" />
      </Helmet>
      <TooltipProvider>
        <Toaster />
        <Sonner 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--background)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
            className: 'group',
          }}
          richColors
          closeButton
          expand
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
