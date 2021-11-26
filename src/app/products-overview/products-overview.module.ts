import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsOverviewComponent } from './products-overview.component';
import { ProductsModule } from "../products/products.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: ProductsOverviewComponent}
];

@NgModule({
  declarations: [
    ProductsOverviewComponent
  ],
  imports: [
    CommonModule,
    ProductsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ProductsOverviewComponent]
})
export class ProductsOverviewModule { }
