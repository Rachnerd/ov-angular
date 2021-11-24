import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent, MockPipe } from "ng-mocks";
import { ProductsComponent } from "./products/products.component";
import { ProductsFilterPipe } from "./products/shared/products-filter.pipe";
import { SearchComponent } from "./products/search/search.component";
import { Product } from "./shared/product";
import { createProductMock } from "./shared/product.mock";
import { Type } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let productsFilterSpy: jasmine.Spy;

  const PRODUCTS_MOCK: Product[] = [
    createProductMock(),
    createProductMock(),
    createProductMock(),
  ];

  beforeEach(async () => {
    /**
     * This spy represents the `transform` method of `ProductsFilterPipe` and will always return `PRODUCTS_MOCK`.
     */
    productsFilterSpy = jasmine.createSpy().and.returnValue(PRODUCTS_MOCK);

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(ProductsComponent),
        MockComponent(SearchComponent),
        MockPipe(ProductsFilterPipe, productsFilterSpy)
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.products = PRODUCTS_MOCK;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  const getComponent = <T>(type: Type<T>): T =>
    fixture.debugElement.query(By.directive(type)).componentInstance;

  it('should render products', () => {
    const productsComponent = getComponent(ProductsComponent);
    expect(productsComponent.products).toEqual(PRODUCTS_MOCK);
  });

  it('should filter products based on search query', () => {
    /**
     * `productsFilterSpy` is already called when the template initializes. Reset is called so it has a clean slate for
     * this test.
     */
    productsFilterSpy.calls.reset();

    const searchComponent = getComponent(SearchComponent);

    searchComponent.search.emit('foo');

    fixture.detectChanges();

    expect(productsFilterSpy).toHaveBeenCalledWith(PRODUCTS_MOCK, 'foo');
    expect(productsFilterSpy).toHaveBeenCalledTimes(1);
  });
});
