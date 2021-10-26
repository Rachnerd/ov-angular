import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { Grocery } from '../grocery';
import { Subject } from 'rxjs';

@Component({
  selector: 'ov-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products = new Subject<Grocery[]>();

  constructor(private groceryService: GroceryService) { }

  ngOnInit(): void {
    this.groceryService.getAllGroceries().subscribe(groceries => this.products.next(groceries));
  }
}
