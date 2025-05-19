import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Keyboard } from 'lucide-react';

interface FlashcardProps {
  front: string;
  back: string;
  progress?: { current: number; total: number };
}

export default function Flashcard({ front, back, progress }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setIsFlipped(f => !f);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto my-8 flex items-center justify-center min-h-screen">
      {progress && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-2/3">
          <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(progress.current / progress.total) * 100}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
          <div className="text-xs text-center text-zinc-500 dark:text-zinc-400 mt-1">
            Card {progress.current} of {progress.total}
          </div>
        </div>
      )}
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
        className="relative w-[55vw] aspect-[3/2] preserve-3d"
        style={{ perspective: 1200 }}
      >
        {/* Front of card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute w-full h-full backface-hidden rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-900/30 ${
            isFlipped ? 'invisible' : 'visible'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-center text-zinc-900 dark:text-zinc-100">
                {front}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFlipped(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow"
              >
                <RotateCcw size={16} />
                <span>Show Answer</span>
              </motion.button>
            </div>
            <div className="absolute bottom-2 right-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setShowHint(true)}
                onHoverEnd={() => setShowHint(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <Keyboard size={16} />
              </motion.button>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded whitespace-nowrap"
                  >
                    Press Space to flip
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute w-full h-full backface-hidden rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-8 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-900/30 rotate-y-180 ${
            isFlipped ? 'visible' : 'invisible'
          }`}
        >
          <div className="h-full flex flex-col" style={{ transform: 'rotateY(180deg)' }}>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-center text-zinc-900 dark:text-zinc-100">
                {back}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFlipped(false)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors shadow"
              >
                <RotateCcw size={16} />
                <span>Show Question</span>
              </motion.button>
            </div>
            <div className="absolute bottom-2 right-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setShowHint(true)}
                onHoverEnd={() => setShowHint(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <Keyboard size={16} />
              </motion.button>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded whitespace-nowrap"
                  >
                    Press Space to flip
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 