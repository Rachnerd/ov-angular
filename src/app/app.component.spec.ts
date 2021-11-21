import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent } from "ng-mocks";
import { ProductsComponent } from "./products/products.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(ProductsComponent)
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
