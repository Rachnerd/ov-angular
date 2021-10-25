import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { Grocery } from '../grocery';

@Component({
  selector: 'ov-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Grocery[] = [];

  constructor(private groceryService: GroceryService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.groceryService.getAllGroceries()
      .subscribe(groceries => this.products = groceries);
  }

}
