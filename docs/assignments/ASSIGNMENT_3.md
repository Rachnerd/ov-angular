# Assignment 3 Testing
If you want to catch up:

```
git checkout basic/assignment-3
```

## 1.1 Mock data
To reduce boilter plate code in tests it's a good idea to centralize mock data creation.

- Create a file called `shared/product.mock.ts` and paste the following code:

```typescript
import { Product } from './product';

export const createProductMock = (product: Partial<Product> = {}): Product => ({
  price: 10,
  description: 'description',
  title: 'title',
  category: 'category',
  image: 'image',
  id: 1,
  rating: {
    count: 10,
    rate: 5,
  },
  ...product,
});
``` 

Resources:
- [Partial type](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [...spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

This mock function returns a default mock object that can be overridden by the caller:

```typescript
// Usage
createProductMock(); // default
createProductMock({ id: 2 }); // default + custom id
createProductMock({ id: 2, title: 'foo' }); // default + custom id + custom title
``` 

## 1.2 ProductsComponent

- Install ng-mocks:

```
npm i --save-dev ng-mocks
```

- Study the following test and copy it to `products/products.component.spec.ts`:

```typescript
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

it("should render 3 products", () => {
  const productComponents = fixture.debugElement.queryAll(
    By.directive(ProductComponent)
  );

  expect(productComponents.length).toBe(3);
  productComponents.forEach(({ componentInstance }, index) => {
    // Check if the @Input paramater of product is set correctly
    expect(componentInstance.product).toEqual(PRODUCTS_MOCK[index]);
  });
});
```

Resources:
- [MockComponent](https://ng-mocks.sudo.eu/api/MockComponent)
- [Component testing](https://angular.io/guide/testing-components-scenarios)

## 1.3 ProductComponent

- Test `ProductComponent` by implementing the following test cases:


```typescript
it('should render product title, category, description and price', () => {
  // ...
});

it('should render a rating', () => {
  // ...
});

it('should render a square image with src and alt', () => {
  // ...
});
```

Resources:
- [Component testing](https://angular.io/guide/testing-components-scenarios)

[Solution](https://github.com/Rachnerd/ov-angular/compare/basic/assignment-3...basic/assignment-4)
