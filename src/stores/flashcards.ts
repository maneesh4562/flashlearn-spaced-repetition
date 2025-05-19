import { create } from 'zustand';
import type { Card, Deck } from './types';

type FlashcardState = {
  decks: Deck[];
  addDeck: (name: string) => void;
  editDeck: (id: string, name: string) => void;
  archiveDeck: (id: string) => void;
  addCard: (deckId: string, front: string, back: string) => void;
  editCard: (deckId: string, cardId: string, front: string, back: string) => void;
  deleteCard: (deckId: string, cardId: string) => void;
  updateCard: (deckId: string, cardId: string, updates: Partial<Card>) => void;
};

export const useFlashcardStore = create<FlashcardState>((set) => ({
  decks: [],
  addDeck: (name) => set((state) => ({
    decks: [
      ...state.decks,
      { id: crypto.randomUUID(), name, archived: false, cards: [] },
    ],
  })),
  editDeck: (id, name) => set((state) => ({
    decks: state.decks.map(deck => deck.id === id ? { ...deck, name } : deck),
  })),
  archiveDeck: (id) => set((state) => ({
    decks: state.decks.map(deck => deck.id === id ? { ...deck, archived: true } : deck),
  })),
  addCard: (deckId, front, back) => set((state) => ({
    decks: state.decks.map(deck => deck.id === deckId ? {
      ...deck,
      cards: [
        ...deck.cards,
        {
          id: crypto.randomUUID(),
          front,
          back,
          due: new Date().toISOString(),
          interval: 0,
          ease: 2.5,
          repetitions: 0,
          lastReviewed: new Date().toISOString(),
        },
      ],
    } : deck),
  })),
  editCard: (deckId, cardId, front, back) => set((state) => ({
    decks: state.decks.map(deck => deck.id === deckId ? {
      ...deck,
      cards: deck.cards.map(card => card.id === cardId ? { ...card, front, back } : card),
    } : deck),
  })),
  deleteCard: (deckId, cardId) => set((state) => ({
    decks: state.decks.map(deck => deck.id === deckId ? {
      ...deck,
      cards: deck.cards.filter(card => card.id !== cardId),
    } : deck),
  })),
  updateCard: (deckId, cardId, updates) => set((state) => ({
    decks: state.decks.map(deck => deck.id === deckId ? {
      ...deck,
      cards: deck.cards.map(card => card.id === cardId ? { ...card, ...updates } : card),
    } : deck),
  })),
})); 