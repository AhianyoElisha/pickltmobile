import React, { createContext, useCallback, useContext, useState } from 'react';

export type CardBrand = 'mastercard' | 'visa';

export interface SavedCard {
  id: string;
  bg: string;
  balance: string;
  number: string; // formatted "5294 2436 4780 9568"
  expiry: string; // "MM/YY"
  brand: CardBrand;
  holder: string;
}

const INITIAL_CARDS: SavedCard[] = [
  {
    id: 'mc',
    bg: '#0D121C',
    balance: '$4,570,80',
    number: '5294 2436 4780 9568',
    expiry: '12/24',
    brand: 'mastercard',
    holder: 'Jenny Wilson',
  },
  {
    id: 'visa',
    bg: '#16B364',
    balance: '$3,242,23',
    number: '9865 3567 4563 4235',
    expiry: '12/24',
    brand: 'visa',
    holder: 'Jenny Wilson',
  },
];

interface CardsContextValue {
  cards: SavedCard[];
  defaultId: string | null;
  setDefault: (id: string) => void;
  addCard: (card: Omit<SavedCard, 'id'>) => SavedCard;
}

const CardsContext = createContext<CardsContextValue | null>(null);

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<SavedCard[]>(INITIAL_CARDS);
  const [defaultId, setDefaultId] = useState<string | null>('mc');

  const addCard = useCallback((card: Omit<SavedCard, 'id'>) => {
    const created: SavedCard = { ...card, id: `card_${Date.now()}` };
    setCards((prev) => [...prev, created]);
    setDefaultId(created.id);
    return created;
  }, []);

  const setDefault = useCallback((id: string) => setDefaultId(id), []);

  return (
    <CardsContext.Provider value={{ cards, defaultId, setDefault, addCard }}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCards() {
  const ctx = useContext(CardsContext);
  if (!ctx) throw new Error('useCards must be used within CardsProvider');
  return ctx;
}
