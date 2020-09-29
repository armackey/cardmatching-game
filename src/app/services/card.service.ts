import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CardResponse } from '../interfaces/card.interface';

const CARD_URL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards(): Observable<CardResponse> {
    return this.http.get<CardResponse>(CARD_URL);
  }
}
