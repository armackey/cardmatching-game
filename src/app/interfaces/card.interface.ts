export interface Card {
  code: string;
  image: string;
  suit: string;
  value: string;
  permFlipped?: boolean;
  isFlipped?: boolean;
}

export interface CardResponse {
  cards: Card[];
  deck_id: string;
  remaining: number;
  success: boolean;
}
