import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsOverviewComponent } from './products-overview.component';
import { Type } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ProductsComponent } from "../products/products.component";
import { SearchComponent } from "../products/search/search.component";
import { Product } from "../shared/product";
import { createProductMock } from "../shared/product.mock";
import { MockComponent, MockPipe } from "ng-mocks";
import { ProductsFilterPipe } from "../products/shared/products-filter.pipe";

describe('ProductsOverviewComponent', () => {
  let component: ProductsOverviewComponent;
  let fixture: ComponentFixture<ProductsOverviewComponent>;

  const PRODUCTS_MOCK: Product[] = [
    createProductMock(),
    createProductMock(),
    createProductMock(),
  ];

  let productsFilterSpy: jasmine.Spy;

  beforeEach(async () => {
    /**
     * This spy represents the `transform` method of `ProductsFilterPipe` and will always return `PRODUCTS_MOCK`.
     */
    productsFilterSpy = jasmine.createSpy().and.returnValue(PRODUCTS_MOCK);
    await TestBed.configureTestingModule({
      declarations: [
        ProductsOverviewComponent,
        MockComponent(ProductsComponent),
        MockComponent(SearchComponent),
        MockPipe(ProductsFilterPipe, productsFilterSpy)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOverviewComponent);
    component = fixture.componentInstance;
    component.products = PRODUCTS_MOCK;
    fixture.detectChanges();
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
