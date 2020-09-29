import { Card } from './card.interface';

export interface GameState {
  firstCard: Card | undefined;
  secondCard: Card | undefined;
  cards: Card[];
  cardsFlipped: 'ONE' | 'TWO' | 'NONE';
  isMatch: boolean
}
