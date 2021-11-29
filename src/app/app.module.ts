import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from "@angular/common/http";
import { API_CONFIG } from "./shared/api-config.token";
import { ApiConfig } from "./shared/api-config";

const apiConfig: ApiConfig = {
  url: 'http://localhost:8080'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: API_CONFIG,
    useValue: apiConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
