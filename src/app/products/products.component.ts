import { Component, Input, OnInit } from '@angular/core';
import { Product } from "../shared/product";

@Component({
  selector: 'ov-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input()
  products: Product[];

  constructor() { }

  ngOnInit(): void {
  }
}
