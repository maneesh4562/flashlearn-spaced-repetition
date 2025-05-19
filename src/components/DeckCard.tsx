import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DeckCardProps {
  id: string;
  name: string;
  cardCount: number;
}

export default function DeckCard({ id, name, cardCount }: DeckCardProps) {
  return (
    <Link to={`/decks/${id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 0.98 }}
        className="relative bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden mb-6 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="p-8 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-1">{name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {cardCount} {cardCount === 1 ? 'card' : 'cards'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 