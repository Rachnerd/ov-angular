import { TestBed } from '@angular/core/testing';

import { StarService } from './star.service';

describe('StarService', () => {
  let service: StarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarService],
    });
    service = TestBed.inject(StarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a perfect rating ', () => {
    expect(service.createStars(5)).toEqual([1, 1, 1, 1, 1]);
  });

  it('should create a bad rating ', () => {
    expect(service.createStars(1)).toEqual([1, 0, 0, 0, 0]);
  });

  it('should create a rounded down rating ', () => {
    expect(service.createStars(3.24)).toEqual([1, 1, 1, 0, 0]);
  });
  it('should create a rounded up to half rating ', () => {
    expect(service.createStars(3.25)).toEqual([1, 1, 1, 0.5, 0]);
  });

  it('should create a rounded down to half rating ', () => {
    expect(service.createStars(3.74)).toEqual([1, 1, 1, 0.5, 0]);
  });

  it('should create a rounded up rating ', () => {
    expect(service.createStars(3.75)).toEqual([1, 1, 1, 1, 0]);
  });
});
