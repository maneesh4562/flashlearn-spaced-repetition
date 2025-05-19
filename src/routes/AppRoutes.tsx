import { Routes, Route, Navigate } from 'react-router-dom';
import Decks from '../pages/Decks';
import Review from '../pages/Review';
import Stats from '../pages/Stats';
import Settings from '../pages/Settings';
import DeckDetails from '../pages/DeckDetails';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/decks" replace />} />
      <Route path="/decks" element={<Decks />} />
      <Route path="/decks/:deckId" element={<DeckDetails />} />
      <Route path="/review" element={<Review />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
} 