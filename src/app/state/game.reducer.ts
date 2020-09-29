import { Card } from '../interfaces/card.interface';
import { GameState } from '../interfaces/game.interface';
import { GameActions, GameActionTypes } from './game.action';

export enum CardsFlipped {
  NONE = 'NONE',
  ONE = 'ONE',
  TWO = 'TWO'
}

const initialState: GameState = {
  firstCard: undefined,
  secondCard: undefined,
  cards: [],
  cardsFlipped: 'NONE',
  isMatch: false
};

export function reducer(state = initialState, action: GameActions) {
  let cards: Card[] = [ ...state.cards ];
  switch(action.type) {
    case GameActionTypes.UserSelectedCard: {
      const card: Card = { ...action.payload };
      let firstCard: Card = state.firstCard?.isFlipped ? { ...state.firstCard } : undefined;

      if (state.cardsFlipped === CardsFlipped.ONE) {
        card.isFlipped = true;
        return { ...state, secondCard: card, cards: addCards(cards, card), cardsFlipped: CardsFlipped.TWO };
      }

      firstCard = card;
      firstCard.isFlipped = !firstCard.isFlipped;
      return {  ...state, firstCard: card, cards: addCards(cards, firstCard), cardsFlipped: CardsFlipped.ONE };
    }
    case GameActionTypes.SetCards: {
      return { ...state, cards: action.payload };
    }
    case GameActionTypes.DetermineCardMatch: {
      const first: Card = { ...state.firstCard };
      const second: Card = { ...state.secondCard };
      const isMatch = first.value === second.value && first.code !== second.code;
      first.isFlipped = second.isFlipped = false;

      if (isMatch) {
        first.permFlipped = second.permFlipped = true;
      }

      return {
        ...state,
        cards: addCards(cards, first, second),
        cardsFlipped: CardsFlipped.NONE,
        isMatch
      };
    }
    case GameActionTypes.RemoveCards: {
      const first: Card = { ...state.firstCard };
      const second: Card = { ...state.secondCard };

      if (!state.isMatch) {
        return { ...state };
      }

      return {
        ...state,
        firstCard: undefined,
        secondCard: undefined,
        cards: removeCards([ ...state.cards ], first, second),
        isMatch: false
      }
    }
    default: {
      return { ...state };
    }
  }
}

function findIndex(array: Card[], card: Card): number {
  return array.findIndex(c => c.code === card.code);
}

function insert(array: Card[], card: Card, index: number): Card[] {
  array.splice(index, 1, card);
  return array;
}

function addCards(array: Card[], ...insertingItems: Card[]): Card[] {
  return insertingItems.map(c => insert(array, c, findIndex(array, c)))[0];
}

function removeCards(array: Card[], ...removingItems: Card[]): Card[] {
  return removingItems.map(c => remove(array, c, findIndex(array, c)))[0];
}

function remove(array: Card[], card: Card, index: number): Card[] {
  array.splice(index, 1);
  return array;
}
