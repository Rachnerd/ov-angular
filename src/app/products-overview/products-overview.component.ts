import { Component, OnInit } from '@angular/core';
import { Product } from "../shared/product";
import { ProductsService } from "../products/shared/products.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'ov-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {
  products$: Observable<Product[]>

  query: string;

  constructor(private productsService: ProductsService) {
    this.products$ = this.productsService.products$;
  }

  onSearch(query: string): void {
    this.query = query;
    this.productsService.get({filter: query});
  }

  ngOnInit(): void {
    this.productsService.get();
  }
}
