import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { UtilModule } from '../util/util.module';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule {
}
