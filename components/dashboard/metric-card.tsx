'use client';

import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  className?: string;
}

export function MetricCard({
  label,
  value,
  icon,
  trend,
  className = '',
}: MetricCardProps) {
  return (
    <Card className={`bg-card border-border p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {trend && (
              <span
                className={`text-xs font-semibold ${
                  trend.direction === 'up' ? 'text-destructive' : 'text-green-400'
                }`}
              >
                {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}%
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="text-accent rounded-lg bg-accent/10 p-2">{icon}</div>
        )}
      </div>
    </Card>
  );
}
