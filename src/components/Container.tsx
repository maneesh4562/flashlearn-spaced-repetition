import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={`w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 min-h-[80vh] ${className}`}
      style={{ boxSizing: 'border-box' }}
    >
      {children}
    </div>
  );
} 