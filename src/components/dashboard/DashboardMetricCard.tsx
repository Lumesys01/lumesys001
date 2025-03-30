
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface DashboardMetricCardProps {
  title: string;
  icon: ReactNode;
  iconColor?: string;
  children: ReactNode;
}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  title,
  icon,
  iconColor = 'text-highlight',
  children,
}) => {
  return (
    <Card className="bg-black/50 border-white/20 backdrop-blur-sm overflow-hidden relative">
      <CardHeader className="pb-2">
        <div className="flex items-center text-sm font-medium text-white">
          <div className={`w-4 h-4 mr-2 ${iconColor}`}>{icon}</div>
          {title}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardMetricCard;
