import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  icon: Icon,
  children,
  className,
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary bg-gradient-to-br from-primary/5 to-primary/10',
    success: 'border-success bg-gradient-to-br from-success/5 to-success/10',
    warning: 'border-warning bg-gradient-to-br from-warning/5 to-warning/10',
    danger: 'border-danger bg-gradient-to-br from-danger/5 to-danger/10'
  };

  return (
    <Card className={cn(
      'shadow-industrial hover:shadow-elevated transition-all duration-300',
      variantStyles[variant],
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-sm font-semibold text-foreground">
          {Icon && <Icon className="h-4 w-4" />}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};