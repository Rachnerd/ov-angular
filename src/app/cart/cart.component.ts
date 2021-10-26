import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Grocery } from '../grocery';

@Component({
  selector: 'ov-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  inCartProducts: Grocery[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.retrieveInCartProducts();
  }


  private retrieveInCartProducts() {
    this.cartService.retrieveInCartProducts().subscribe(groceries => this.inCartProducts = groceries);
  }
}
