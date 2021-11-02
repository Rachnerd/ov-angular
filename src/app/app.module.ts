import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { ProductDetailModule } from './product-detail/product-detail.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    ProductDetailModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
