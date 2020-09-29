import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { pluck, take } from 'rxjs/operators';
import { Card } from '../interfaces/card.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCardList } from '../state/game.selectors';
import { SetCards } from '../state/game.action';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  providers: [ CardService ]
})
export class CardListComponent implements OnInit {
  cards$: Observable<Card[]>;
  constructor(public cardService: CardService, private store: Store) { }

  ngOnInit() {
    this.cards$ = this.store.select(getCardList);
    this.cardService.getCards()
      .pipe(take(1), pluck('cards'))
      .subscribe((cards: Card[]) => {
        this.store.dispatch(new SetCards(cards));
      });
  }

  trackCard(index: number, card: Card): string {
    return card.code;
  }

}
