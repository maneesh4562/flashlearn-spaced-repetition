import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useFlashcardStore } from '../stores/flashcards';
import Container from '../components/Container';
import EmptyState from '../components/EmptyState';
import { BarChart2, Repeat } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Stats() {
  const navigate = useNavigate();
  const { decks } = useFlashcardStore();
  const allCards = decks.flatMap(deck => deck.cards);
  const reviewsByDate = allCards.reduce((acc, card) => {
    const date = new Date(card.lastReviewed).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const data = Object.entries(reviewsByDate).map(([date, reviews]) => ({ date, reviews }));

  // Sort data by date for chart
  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Container>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Review Stats</h2>
      {data.length === 0 ? (
        <EmptyState
          icon={<BarChart2 size={48} className="text-blue-400 dark:text-blue-500" />}
          title="No Stats Yet"
          message="Complete some reviews to see your progress here!"
          action={
            <Button onClick={() => navigate('/review')} variant="primary">
              <Repeat size={20} /> Start Reviewing
            </Button>
          }
        />
      ) : (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#888888" />
              <YAxis allowDecimals={false} stroke="#888888" />
              <Tooltip />
              <Line type="monotone" dataKey="reviews" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 text-center">
            Reviews per day
          </div>
        </div>
      )}
    </Container>
  );
} 