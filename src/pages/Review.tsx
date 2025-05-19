import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFlashcardStore } from '../stores/flashcards';
import Flashcard from '../components/Flashcard';
import { scheduleCard } from '../utils/scheduler';
import Toast from '../components/Toast';
import { CheckCircle2, XCircle, HelpCircle, Keyboard } from 'lucide-react';
import { incrementStreak } from '../components/StreakCounter';
import Container from '../components/Container';
import type { Card } from '../stores/types';

export default function Review() {
  const navigate = useNavigate();
  const { decks, updateCard } = useFlashcardStore();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [dueCards, setDueCards] = useState<Array<{ card: Card; deckId: string }>>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '' });
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  useEffect(() => {
    const cards = getDueCards();
    if (cards.length === 0) {
      navigate('/decks');
      return;
    }
    setDueCards(cards);
  }, [decks]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '1') handleRating(0);
      if (e.key === '2') handleRating(2);
      if (e.key === '3') handleRating(4);
      if (e.key === 'h') setShowKeyboardShortcuts(s => !s);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCardIndex, dueCards]);

  const getDueCards = () => {
    const now = new Date();
    return decks.flatMap(deck =>
      deck.cards
        .filter(card => new Date(card.due) <= now)
        .map(card => ({ card, deckId: deck.id }))
    );
  };

  const handleRating = (quality: number) => {
    if (currentCardIndex >= dueCards.length) return;

    const { card, deckId } = dueCards[currentCardIndex];
    const updatedCard = scheduleCard(card, quality);
    updateCard(deckId, card.id, updatedCard);

    if (currentCardIndex === dueCards.length - 1) {
      incrementStreak();
      setToastMessage({
        title: 'Review Complete!',
        description: 'Great job! Come back tomorrow for more cards.'
      });
      setToastOpen(true);
      setTimeout(() => navigate('/decks'), 2000);
    } else {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  if (dueCards.length === 0) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">No Cards Due</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Come back later for more cards!</p>
          </motion.div>
        </div>
      </Container>
    );
  }

  const currentCard = dueCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / dueCards.length) * 100;

  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Review Cards</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Card {currentCardIndex + 1} of {dueCards.length}
            </p>
            <div className="mt-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", bounce: 0.7 }}
            >
              <Flashcard
                front={currentCard.card.front}
                back={currentCard.card.back}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">How well did you know this card?</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowKeyboardShortcuts(s => !s)}
                className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <Keyboard size={16} />
              </motion.button>
            </div>
            
            <AnimatePresence>
              {showKeyboardShortcuts && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-zinc-500 dark:text-zinc-400"
                >
                  Press 1 for Hard, 2 for Good, 3 for Easy
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRating(0)}
                className="p-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <XCircle size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRating(2)}
                className="p-3 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
              >
                <HelpCircle size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRating(4)}
                className="p-3 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <CheckCircle2 size={24} />
              </motion.button>
            </div>
          </div>
        </div>

        <Toast
          open={toastOpen}
          onOpenChange={setToastOpen}
          title={toastMessage.title}
          description={toastMessage.description}
        />
      </div>
    </Container>
  );
} 