import { Injectable } from '@angular/core';
import { Grocery } from './grocery';
import { Observable, Subject } from 'rxjs';
import { GroceryService } from './grocery.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private groceryService: GroceryService) { }

  adjustCart(product: Grocery, adjustment: number): Observable<Grocery[]> {
    console.log('adjust cart');
    return this.groceryService.adjustCart(product, adjustment);
  }

  retrieveInCartProducts(): Observable<Grocery[]> {
    return this.groceryService.getInCartGroceries();
  }
}
