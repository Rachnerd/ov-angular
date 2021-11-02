import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[ovPromotion]'
})
export class PromotionDirective implements OnInit {
  @Input() ovPromotion = false;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.ovPromotion) {
      this.el.nativeElement.classList.add('promotion');
    }
  }
}
