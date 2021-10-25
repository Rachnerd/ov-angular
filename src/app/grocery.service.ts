import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grocery } from './grocery';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private url = 'assets/api/groceries.json'
  private groceries?: Grocery[];

  constructor(
    private http: HttpClient) {
  }

  public getAllGroceries(): Observable<Grocery[]> {
    return this.groceries
      ? of(this.groceries)
      : this.http.get<Grocery[]>(this.url);
  }
}
