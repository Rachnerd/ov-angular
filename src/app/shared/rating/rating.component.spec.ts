import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { MockProvider } from "ng-mocks";
import { StarService } from "./shared/star.service";

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingComponent],
      providers: [MockProvider(StarService)]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    element = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should render a bad rating', () => {
    const starService = TestBed.inject(StarService);
    spyOn(starService, 'createStars').and.returnValue([0, 0, 0, 0, 0]);

    fixture.detectChanges();

    const emptyStars = element.querySelectorAll('.fa-star-o');

    expect(emptyStars.length).toBe(5);
  });

  it('should render a great rating', () => {
    const starService = TestBed.inject(StarService);
    spyOn(starService, 'createStars').and.returnValue([1, 1, 1, 1, 1]);

    fixture.detectChanges();

    const fullStars = element.querySelectorAll('.fa-star');

    expect(fullStars.length).toBe(5);
  });

  it('should render a mediocre rating', () => {
    const starService = TestBed.inject(StarService);
    spyOn(starService, 'createStars').and.returnValue([1, 1, 0.5, 0, 0]);

    fixture.detectChanges();

    const fullStars = element.querySelectorAll('.fa-star');
    const halfStars = element.querySelectorAll('.fa-star-half-o');
    const emptyStars = element.querySelectorAll('.fa-star-o');

    expect(fullStars.length).toBe(2);
    expect(halfStars.length).toBe(1);
    expect(emptyStars.length).toBe(2);
  });
});
