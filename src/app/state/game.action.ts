import { Action } from "@ngrx/store";
import { Card } from '../interfaces/card.interface';

export enum GameActionTypes {
  UserSelectedCard = '[Game] User Selected Card',
  SetCards = '[Game] Set Cards',
  DetermineCardMatch = '[Game] Determine Card Match',
  RemoveCards = '[Game] Remove Matched Cards From List'
}

export class CardSelected implements Action {
  readonly type = GameActionTypes.UserSelectedCard;
  constructor(public payload: Card) { }
}

export class SetCards implements Action {
  readonly type = GameActionTypes.SetCards;
  constructor(public payload: Card[]) { }
}

export class DetermineCardMatch implements Action {
  readonly type = GameActionTypes.DetermineCardMatch;
  constructor() { }
}

export class RemoveCards implements Action {
  readonly type = GameActionTypes.RemoveCards;
  constructor() { }
}

export type GameActions = CardSelected | SetCards | DetermineCardMatch | RemoveCards;
