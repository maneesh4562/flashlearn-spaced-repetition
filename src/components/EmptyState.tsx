import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  message: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, message, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 ${className}`}>
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
} 