import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { MockComponent } from 'ng-mocks';
import { SquareImageComponent } from '../../shared/square-image/square-image.component';
import { RatingComponent } from '../../shared/rating/rating.component';
import { By } from '@angular/platform-browser';
import { Type } from '@angular/core';
import { createProductMock } from "../../shared/product.mock";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let PRODUCT_MOCK = createProductMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
        MockComponent(SquareImageComponent),
        MockComponent(RatingComponent),
      ],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.product = PRODUCT_MOCK;
    fixture.detectChanges();
  });

  const getText = (selector: string) =>
    fixture.nativeElement.querySelector(selector)!.textContent;

  it('should render product title, category, description and price', () => {
    expect(getText('.title')).toContain(PRODUCT_MOCK.title);
    expect(getText('.description')).toContain(PRODUCT_MOCK.description);
    expect(getText('.category')).toContain(PRODUCT_MOCK.category);
    expect(getText('.price')).toContain(PRODUCT_MOCK.price);
  });

  const getChildComponent = (type: Type<any>) =>
    fixture.debugElement.query(By.directive(type));

  it('should render a rating', () => {
    const { componentInstance } = getChildComponent(RatingComponent);
    expect(componentInstance).toBeDefined();
  });

  it('should render a square image with src and alt', () => {
    const { componentInstance } = getChildComponent(SquareImageComponent);

    expect(componentInstance.src).toContain(PRODUCT_MOCK.image);
    expect(componentInstance.alt).toContain(PRODUCT_MOCK.title);
  });
});
