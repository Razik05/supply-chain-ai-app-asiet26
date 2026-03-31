'use client';

interface StatusBadgeProps {
  status: 'on-time' | 'delayed' | 'at-risk' | 'delivered';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusConfig = {
    'on-time': {
      bg: 'bg-green-900/30',
      text: 'text-green-400',
      label: 'On Time',
    },
    delayed: {
      bg: 'bg-orange-900/30',
      text: 'text-orange-400',
      label: 'Delayed',
    },
    'at-risk': {
      bg: 'bg-red-900/30',
      text: 'text-red-400',
      label: 'At Risk',
    },
    delivered: {
      bg: 'bg-blue-900/30',
      text: 'text-blue-400',
      label: 'Delivered',
    },
  };

  const config = statusConfig[status];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5';

  return (
    <span
      className={`inline-flex font-semibold rounded-full ${sizeClass} ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
