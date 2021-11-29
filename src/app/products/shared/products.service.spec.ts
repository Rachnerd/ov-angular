import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { API_CONFIG } from "../../shared/api-config.token";
import { MockProvider } from "ng-mocks";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Product } from "../../shared/product";
import { createProductMock } from "../../shared/product.mock";

describe('ProductsService', () => {
  let service: ProductsService;
  const PRODUCTS_MOCK: Product[] = [
    createProductMock(),
    createProductMock(),
    createProductMock(),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(API_CONFIG, {
          url: 'url'
        }),
        MockProvider(HttpClient),
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit products after a successful call', () => {
    const httpClient = TestBed.inject(HttpClient);

    spyOn(httpClient, 'get').and.returnValue(of(PRODUCTS_MOCK));

    const productsSpy = jasmine.createSpy();

    service.products$.subscribe(productsSpy);
    service.get();

    expect(productsSpy).toHaveBeenCalledTimes(1);
    expect(productsSpy).toHaveBeenCalledWith(PRODUCTS_MOCK);
  });

  it('should filter products serverside', () => {
    const httpClient = TestBed.inject(HttpClient);

    const getSpy = spyOn(httpClient, 'get').and.returnValue(of(PRODUCTS_MOCK));

    service.get({
      filter: 'filterValue'
    });

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('url/products?filter=filterValue');

  });
});
