import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export default function Toast({
  open,
  onOpenChange,
  title,
  description,
  type = 'success',
}: ToastProps) {
  const icons = {
    success: <CheckCircle2 className="text-green-500" size={20} />,
    error: <XCircle className="text-red-500" size={20} />,
    warning: <AlertCircle className="text-yellow-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  const colors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", bounce: 0.2 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div
            className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border ${colors[type]} max-w-sm`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {icons[type]}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                {title}
              </h3>
              {description && (
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onOpenChange(false)}
              className="flex-shrink-0 p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <XCircle size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 