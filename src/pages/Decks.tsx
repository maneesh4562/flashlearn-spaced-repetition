import DeckCard from '../components/DeckCard';
import { useState } from 'react';
import Toast from '../components/Toast';
import { useFlashcardStore } from '../stores/flashcards';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FolderPlus, Sparkles } from 'lucide-react';
import Container from '../components/Container';

export default function Decks() {
  const { decks, addDeck, editDeck } = useFlashcardStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<{ id: string; name: string } | null>(null);
  const [newDeckName, setNewDeckName] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '' });

  const showToast = (title: string, description?: string) => {
    setToastMessage({ title, description: description ?? '' });
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 2000);
  };

  const handleAddDeck = () => {
    if (newDeckName.trim()) {
      addDeck(newDeckName.trim());
      setNewDeckName('');
      setModalOpen(false);
      showToast('Deck Added', `"${newDeckName.trim()}" has been created.`);
    }
  };

  const handleEditDeck = () => {
    if (editingDeck && newDeckName.trim()) {
      editDeck(editingDeck.id, newDeckName.trim());
      setEditingDeck(null);
      setNewDeckName('');
      setModalOpen(false);
      showToast('Deck Updated', `Deck renamed to "${newDeckName.trim()}".`);
    }
  };

  const totalCards = decks.reduce((acc, deck) => acc + deck.cards.length, 0);

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Your Decks</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            {decks.length} {decks.length === 1 ? 'deck' : 'decks'} • {totalCards} total cards
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 0.96}}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-3000 transition-colors shadow-md"
          onClick={() => {
            setEditingDeck(null);
            setNewDeckName('');
            setModalOpen(true);
          }}
        >
          <Plus size={20} />
          <span>New Deck</span>
        </motion.button>
      </div>

      {decks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
          className="flex-1 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
            className="mb-6"
          >
            <FolderPlus size={64} className="mx-auto text-blue-400 dark:text-blue-500 drop-shadow-lg" />
          </motion.div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-400" size={24} />
            Welcome!
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">
            You don&apos;t have any decks yet. Start by creating your first deck to begin your spaced repetition journey!
          </p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-lg font-semibold"
            onClick={() => {
              setEditingDeck(null);
              setNewDeckName('');
              setModalOpen(true);
            }}
          >
            <Plus size={24} />
            Create Your First Deck
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {decks.map(deck => (
              <DeckCard key={deck.id} id={deck.id} name={deck.name} cardCount={deck.cards.length} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl w-full max-w-md mx-4"
            >
              <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                {editingDeck ? 'Edit Deck' : 'New Deck'}
              </h3>
              <input
                type="text"
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400"
                placeholder="Deck name"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={editingDeck ? handleEditDeck : handleAddDeck}
                >
                  {editingDeck ? 'Save' : 'Add'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        title={toastMessage.title}
        description={toastMessage.description}
      />
    </Container>
  );
} 