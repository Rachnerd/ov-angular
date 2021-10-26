import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryService } from '../grocery.service';
import { Grocery } from '../grocery';

@Component({
  selector: 'ov-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [ './product-detail.component.scss' ]
})
export class ProductDetailComponent implements OnInit {
  product?: Grocery;

  constructor(private route: ActivatedRoute, private groceryService: GroceryService) {
  }

  ngOnInit(): void {
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.groceryService.getAllGroceries().subscribe(groceries => {
      this.product = groceries.find(g => g.name === name);
    });
  }

}
