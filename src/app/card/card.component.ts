import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Card } from '../interfaces/card.interface';
import { CardService } from '../services/card.service';
import { CardSelected, DetermineCardMatch, RemoveCards } from '../state/game.action';
import { CardsFlipped } from '../state/game.reducer';
import { getGameState } from '../state/game.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [ CardService ]
})
export class CardComponent {
  CARD_BACK_IMAGE = 'https://www.pngkey.com/png/full/121-1215512_playing-cards-back-png-albino-dragon-kingdoms-of.png';
  @Input() card: Card;
  @ViewChild('flippedElem') flippedElem: ElementRef;

  constructor(private store: Store) { }

  selected(): void {
    if (this.card.permFlipped) return;

    this.store.dispatch(new CardSelected(this.card));

    this.store.select(getGameState).pipe(take(1)).subscribe(state => {
      if (state.cardsFlipped === CardsFlipped.TWO) {
        setTimeout(() => this.store.dispatch(new DetermineCardMatch()), 700);
        setTimeout(() => this.store.dispatch(new RemoveCards()), 1600);
      }
    });
  }

  getCardClasses(): string {
    let classes: string = this.flippedElem?.nativeElement.className || 'card';

    if (this.card.permFlipped) {
      return `card matched-remove`;
    }

    if (classes.includes('is-flipped-show') && this.card.isFlipped === false) {
      return `card is-flipped-hide`;
    }

    if (this.card.isFlipped) {
      return `card is-flipped-show`;
    }

    return classes;
  }
}
