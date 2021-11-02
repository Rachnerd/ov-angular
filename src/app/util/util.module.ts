import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFilterPipe } from './category-filter.pipe';
import { PromotionDirective } from './promotion.directive';

@NgModule({
  declarations: [
    CategoryFilterPipe,
    PromotionDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CategoryFilterPipe,
    PromotionDirective
  ]
})
export class UtilModule { }
