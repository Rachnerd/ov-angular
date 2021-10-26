import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { Grocery } from '../grocery';
import { CartService } from '../cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ov-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Subject<Grocery[]> = new Subject<Grocery[]>();

  constructor(private groceryService: GroceryService,
              public cartService: CartService) { }

  ngOnInit(): void {
    this.groceryService.getAllGroceries().subscribe(groceries => this.products.next(groceries));
  }

  adjustCart(product: Grocery, adjustment: number) {
    this.cartService.adjustCart(product, adjustment).subscribe(groceries => this.products.next(groceries));
  }
}
