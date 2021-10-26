import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grocery } from './grocery';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private url = 'assets/api/groceries.json'
  private groceries: Subject<Grocery[]> = new Subject<Grocery[]>();

  constructor(
    private http: HttpClient) {
    this.getGroceries().subscribe(groceries => this.groceries.next(groceries));
  }

  getAllGroceries(): Subject<Grocery[]> {
    return this.groceries;
  }

  getInCartGroceries(): Observable<Grocery[]> {
    return this.groceries.pipe(
      map(groceries => groceries.filter(grocery => grocery.inCart > 0)));
  }

  adjustCart(product: Grocery, adjustment: number): Observable<Grocery[]> {
    console.log('in groceryservice');
    this.groceries.pipe(
      map(groceries => {
        console.log('in pipe(map())');
        groceries.filter(g => g.name === product.name)
          .map(g => g.inCart + adjustment);
        this.groceries.next(groceries);
      }));
    return this.groceries;
  }

  private getGroceries(): Observable<Grocery[]> {
    return this.http.get<{ groceries: Grocery[] }>(this.url).pipe(map(({ groceries }) => groceries));
  }
}
