import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { Grocery, GroceryCat } from '../grocery';
import { Subject } from 'rxjs';

@Component({
  selector: 'ov-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
})
export class ProductsComponent implements OnInit {
  public products$ = new Subject<Grocery[]>();
  categories: String[] = [];

  constructor(private groceryService: GroceryService) {
  }

  private _selectedValue: GroceryCat = GroceryCat.ALL;

  get selectedValue(): GroceryCat {
    return this._selectedValue;
  }

  set selectedValue(value: GroceryCat) {
    this._selectedValue = value;
  }

  ngOnInit(): void {
    this.groceryService.getAllGroceries().subscribe(groceries => this.products$.next(groceries));
    this.categories = Object.values(GroceryCat);
  }

  onChange(selectedCat: GroceryCat) {
    this.groceryService.getAllGroceries().subscribe(groceries => {
      if (selectedCat === GroceryCat.ALL) {
        this.products$.next(groceries);
      } else {
        this.products$.next(groceries.filter(product => product.category === selectedCat));
      }
    });
  }
}
