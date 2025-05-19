import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  className?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-60 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 shadow-md px-5 py-3',
  secondary:
    'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600 px-5 py-3',
  danger:
    'bg-red-600 text-white hover:bg-red-700 shadow-md px-5 py-3',
  icon:
    'bg-transparent text-zinc-500 hover:text-blue-600 p-2',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
} 