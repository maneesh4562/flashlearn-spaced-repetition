import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CardModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (front: string, back: string) => void;
  mode: 'add' | 'edit';
  initialFront?: string;
  initialBack?: string;
}

export default function CardModal({
  open,
  onClose,
  onSave,
  mode,
  initialFront = '',
  initialBack = '',
}: CardModalProps) {
  const [front, setFront] = useState(initialFront);
  const [back, setBack] = useState(initialBack);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      onSave(front.trim(), back.trim());
      setFront('');
      setBack('');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Blurred/gradient background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-100/70 via-white/80 to-purple-100/70 dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-blue-900/80 backdrop-blur-md"
            onClick={onClose}
            style={{ zIndex: 1 }}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.2 }}
            className="relative z-10 bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-4 sm:mx-0"
            tabIndex={-1}
            aria-label={mode === 'add' ? 'Add Card Modal' : 'Edit Card Modal'}
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              style={{ zIndex: 2 }}
            >
              <X size={18} />
            </motion.button>
            <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100 pr-10">
              {mode === 'add' ? 'Add New Card' : 'Edit Card'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="front" className="block text-base font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Front
                </label>
                <textarea
                  id="front"
                  ref={inputRef}
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  className="w-full p-4 border rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 resize-none h-28 text-lg"
                  placeholder="Enter the question or term"
                  required
                  aria-label="Card front"
                />
              </div>
              <div>
                <label htmlFor="back" className="block text-base font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Back
                </label>
                <textarea
                  id="back"
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  className="w-full p-4 border rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 resize-none h-28 text-lg"
                  placeholder="Enter the answer or definition"
                  required
                  aria-label="Card back"
                />
              </div>
              <div className="flex justify-end gap-2 mt-8">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors text-base font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-base font-semibold shadow"
                >
                  {mode === 'add' ? 'Add Card' : 'Save Changes'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 