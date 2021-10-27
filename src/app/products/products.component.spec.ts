import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { Observable, of } from 'rxjs';
import { Grocery, GroceryCat } from '../grocery';
import { GroceryService } from '../grocery.service';

class MockGroceryService {
  getAllGroceries(): Observable<Grocery[]> {
    return of([ { name: "Tomato", category: GroceryCat.FRUIT_VEGETABLE, price: 200, promo: true } ]);
  }
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [
        { provide: GroceryService, useClass: MockGroceryService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
