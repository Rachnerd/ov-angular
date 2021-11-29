import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsOverviewComponent } from './products-overview.component';
import { Type } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ProductsComponent } from "../products/products.component";
import { SearchComponent } from "../products/search/search.component";
import { Product } from "../shared/product";
import { createProductMock } from "../shared/product.mock";
import { MockComponent, MockProvider } from "ng-mocks";
import { ProductsService } from "../products/shared/products.service";
import { Subject } from "rxjs";

describe('ProductsOverviewComponent', () => {
  let component: ProductsOverviewComponent;
  let fixture: ComponentFixture<ProductsOverviewComponent>;
  let productsSubject: Subject<Product[]>;

  const PRODUCTS_MOCK: Product[] = [
    createProductMock(),
    createProductMock(),
    createProductMock(),
  ];


  beforeEach(async () => {
    /**
     * This spy represents the `transform` method of `ProductsFilterPipe` and will always return `PRODUCTS_MOCK`.
     */
    productsSubject = new Subject();
    await TestBed.configureTestingModule({
      declarations: [
        ProductsOverviewComponent,
        MockComponent(ProductsComponent),
        MockComponent(SearchComponent)
      ],
      providers: [
        MockProvider(ProductsService, {
          products$: productsSubject
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getComponent = <T>(type: Type<T>): T =>
    fixture.debugElement.query(By.directive(type)).componentInstance;

  it('should render products', () => {
    productsSubject.next(PRODUCTS_MOCK);
    fixture.detectChanges();
    const productsComponent = getComponent(ProductsComponent);
    expect(productsComponent.products).toEqual(PRODUCTS_MOCK);
  });

  it('should filter products based on search query', () => {
    const productsService = TestBed.inject(ProductsService);
    spyOn(productsService, 'get');

    const searchComponent = getComponent(SearchComponent);

    searchComponent.search.emit('foo');

    fixture.detectChanges();

    expect(productsService.get).toHaveBeenCalledWith({ filter: 'foo'});
    expect(productsService.get).toHaveBeenCalledTimes(1);
  });
});
