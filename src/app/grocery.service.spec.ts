import { getTestBed, TestBed } from '@angular/core/testing';

import { GroceryService } from './grocery.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GroceryService', () => {
  let service: GroceryService;
  let injector: TestBed;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [GroceryService]
    });
    injector = getTestBed();
    service = injector.inject(GroceryService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
