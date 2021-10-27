import { PromotionDirective } from './promotion.directive';
import { ElementRef } from '@angular/core';

describe('PromotionDirective', () => {
  it('should create an instance', () => {
    let directive: PromotionDirective;
    directive = new PromotionDirective(new ElementRef<any>({}));
    expect(directive).toBeTruthy();
  });
});
