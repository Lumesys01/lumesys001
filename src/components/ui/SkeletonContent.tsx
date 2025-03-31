
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonSectionProps {
  type: 'hero' | 'card' | 'text' | 'chart' | 'table';
  rows?: number;
  animate?: boolean;
}

export const SkeletonSection: React.FC<SkeletonSectionProps> = ({ 
  type, 
  rows = 1, 
  animate = true 
}) => {
  const baseClass = animate ? 'animate-pulse' : '';
  
  switch (type) {
    case 'hero':
      return (
        <div className={`w-full space-y-8 ${baseClass}`}>
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-8 w-60 rounded-md" />
            <Skeleton className="h-16 w-[90%] max-w-2xl rounded-md" />
            <Skeleton className="h-4 w-[70%] max-w-xl rounded-md" />
            <div className="flex space-x-4 pt-6">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
        </div>
      );
      
    case 'card':
      return (
        <div className={`w-full h-full p-6 rounded-xl border ${baseClass}`}>
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-24 w-full mb-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      );
      
    case 'text':
      return (
        <div className={`w-full space-y-2 ${baseClass}`}>
          {Array(rows).fill(0).map((_, i) => (
            <Skeleton key={i} className={`h-4 w-${Math.floor(Math.random() * 40) + 60}% rounded-md`} />
          ))}
        </div>
      );
      
    case 'chart':
      return (
        <div className={`w-full h-[300px] ${baseClass}`}>
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      );
      
    case 'table':
      return (
        <div className={`w-full space-y-4 ${baseClass}`}>
          <Skeleton className="h-8 w-full rounded-md" />
          {Array(rows).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      );
      
    default:
      return <Skeleton className="h-16 w-full" />;
  }
};

export const LazyLoadWrapper: React.FC<{
  children: React.ReactNode;
  skeletonType: SkeletonSectionProps['type'];
  rows?: number;
  height?: string;
  isLoading?: boolean;
}> = ({ 
  children, 
  skeletonType, 
  rows = 3, 
  height = 'auto',
  isLoading = false
}) => {
  const [loaded, setLoaded] = React.useState(false);
  
  React.useEffect(() => {
    // Simulate content loading if not explicitly controlled
    if (isLoading === false) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 800); // Default skeleton display time
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  // Use external loading state if provided, otherwise use internal state
  const showContent = isLoading !== undefined ? !isLoading : loaded;
  
  return (
    <div style={{ height, minHeight: height !== 'auto' ? height : undefined }}>
      {!showContent ? (
        <SkeletonSection type={skeletonType} rows={rows} />
      ) : (
        <div className={`animate-fade-in`}>
          {children}
        </div>
      )}
    </div>
  );
};
