export interface Card {
  id: string;
  front: string;
  back: string;
  due: string; // ISO date
  interval: number;
  ease: number;
  repetitions: number;
  lastReviewed: string; // ISO date
}

export interface Deck {
  id: string;
  name: string;
  archived: boolean;
  cards: Card[];
} 