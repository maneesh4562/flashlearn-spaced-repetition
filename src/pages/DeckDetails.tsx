import { useParams, useNavigate } from 'react-router-dom';
import { useFlashcardStore } from '../stores/flashcards';
import Container from '../components/Container';
import EmptyState from '../components/EmptyState';
import { PlusCircle, ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import CardModal from '../components/CardModal';
import Button from '../components/Button';

export default function DeckDetails() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { decks, addCard } = useFlashcardStore();
  const deck = decks.find(d => d.id === deckId);
  const [cardModalOpen, setCardModalOpen] = useState(false);

  if (!deck) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Deck not found</h2>
          <Button
            onClick={() => navigate('/decks')}
            variant="primary"
          >
            <ArrowLeft size={18} /> Back to Decks
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/decks')}
            variant="secondary"
            aria-label="Back to decks list"
          >
            <ArrowLeft size={18} /> Back
          </Button>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{deck.name}</h2>
        </div>
        <Button
          onClick={() => setCardModalOpen(true)}
          variant="primary"
          aria-label="Add new card to this deck"
        >
          <Plus size={20} /> Add Card
        </Button>
      </div>
      {deck.cards.length === 0 ? (
        <EmptyState
          icon={<PlusCircle size={48} className="text-blue-400 dark:text-blue-500" />}
          title="No Cards Yet"
          message="This deck doesn't have any cards. Start by adding your first card to begin practicing!"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {deck.cards.map((card, index) => (
    <div
    
      key={card.id}
      className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-lg hover:scale-98 transition-shadow duration-300 p-6 space-y-2"
    >
      {/* Index and Front in the same line */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          #{index + 1}. 
        </span>
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {card.front}
        </span>
      </div>

      {/* Back Content below */}
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {card.back}
      </div>
    </div>
  ))}
</div>

    
      )}
      <CardModal
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSave={(front, back) => {
          addCard(deck.id, front, back);
          setCardModalOpen(false);
        }}
        mode="add"
      />
    </Container>
  );
} 