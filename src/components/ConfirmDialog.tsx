import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  type = 'warning',
}: ConfirmDialogProps) {
  const colors = {
    danger: {
      icon: 'text-red-500',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      icon: 'text-yellow-500',
      button: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    },
    info: {
      icon: 'text-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Blurred/gradient background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-100/60 via-white/60 to-red-100/60 dark:from-zinc-900/80 dark:via-zinc-900/60 dark:to-yellow-900/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.2 }}
            className="relative bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-4"
            tabIndex={-1}
            aria-label="Confirmation Dialog"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onOpenChange(false)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <X size={22} />
            </motion.button>
            <div className="flex items-start gap-4 mb-4">
              <div className={`flex-shrink-0 ${colors[type].icon}`}>
                <AlertTriangle size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-base">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-8">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenChange(false)}
                className="px-5 py-3 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-base font-medium"
              >
                {cancelText}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleConfirm}
                className={`px-5 py-3 rounded-xl transition-colors text-base font-semibold shadow ${colors[type].button}`}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 