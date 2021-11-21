import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { MockComponent } from 'ng-mocks';
import { ProductComponent } from './product/product.component';
import { createProductMock } from '../shared/product.mock';
import { Product } from '../shared/product';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  const PRODUCTS_MOCK: Product[] = [
    createProductMock({
      id: 1,
    }),
    createProductMock({
      id: 2,
    }),
    createProductMock({
      id: 3,
    }),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, MockComponent(ProductComponent)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    component.products = PRODUCTS_MOCK;
    fixture.detectChanges();
  });

  it('should render 3 products', () => {
    const productComponents = fixture.debugElement.queryAll(
      By.directive(ProductComponent)
    );

    expect(productComponents.length).toBe(3);

    productComponents.forEach(({ componentInstance }, index) => {
      expect(componentInstance.product).toEqual(PRODUCTS_MOCK[index]);
    });
  });
});
