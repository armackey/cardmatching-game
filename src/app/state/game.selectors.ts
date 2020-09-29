import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from "../interfaces/game.interface";

const getGameFeatureSelector = createFeatureSelector<GameState>('game');

export const getGameState = createSelector(
  getGameFeatureSelector,
  state => state
);

export const getCardList = createSelector(
  getGameFeatureSelector,
  state => state.cards
);
