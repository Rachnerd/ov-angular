import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from "./products.component";
import { ProductComponent } from "./product/product.component";
import { SharedModule } from "../shared/shared.module";
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductsFilterPipe } from './shared/products-filter.pipe';

@NgModule({
  declarations: [ProductsComponent, ProductComponent, SearchComponent, ProductsFilterPipe],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ProductsComponent, SearchComponent, ProductsFilterPipe]
})
export class ProductsModule { }
