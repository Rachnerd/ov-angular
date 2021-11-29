import { Inject, Injectable } from '@angular/core';
import { Product } from "../../shared/product";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiConfig } from "../../shared/api-config";
import { API_CONFIG } from "../../shared/api-config.token";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products$: Observable<Product[]>;
  error$: Observable<unknown>;

  private productsSubject = new Subject<Product[]>();
  private errorSubject = new Subject<unknown>();

  constructor(@Inject(API_CONFIG) private apiConfig: ApiConfig, private httpClient: HttpClient) {
    this.products$ = this.productsSubject.asObservable();
    this.error$ = this.errorSubject.asObservable();
  }

  get({ filter}: { filter?: string} = {}): void {
    this.httpClient.get<Product[]>(`${this.apiConfig.url}/products${filter ? `?filter=${filter}` : ''}`)
      .subscribe(
        products => this.productsSubject.next(products),
          error => this.errorSubject.next(error)
      );
  }
}
