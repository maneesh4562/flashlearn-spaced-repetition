import type { Card } from '../stores/types';

// SM-2 Algorithm implementation
export function scheduleCard(card: Card, quality: number): Card {
  // Quality should be between 0 and 5
  const q = Math.max(0, Math.min(5, quality));
  
  // Calculate new ease factor
  const newEase = card.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  const boundedEase = Math.max(1.3, newEase); // Minimum ease factor is 1.3
  
  // Calculate new interval
  let newInterval: number;
  if (card.repetitions === 0) {
    newInterval = 1;
  } else if (card.repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(card.interval * boundedEase);
  }
  
  // Calculate next review date
  const now = new Date();
  const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);
  
  return {
    ...card,
    interval: newInterval,
    ease: boundedEase,
    repetitions: card.repetitions + 1,
    due: nextReview.toISOString(),
    lastReviewed: now.toISOString(),
  };
} 