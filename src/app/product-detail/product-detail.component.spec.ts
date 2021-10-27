import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GroceryService } from '../grocery.service';
import { Grocery, GroceryCat } from '../grocery';

class MockGroceryService {
  getAllGroceries(): Observable<Grocery[]> {
    return of([ { name: "Tomato", category: GroceryCat.FRUIT_VEGETABLE, price: 200, promo: true } ]);
  }
}

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => of(convertToParamMap({ name: 'Tomato' }))
  }
  }
  } },
        { provide: GroceryService, useClass: MockGroceryService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
