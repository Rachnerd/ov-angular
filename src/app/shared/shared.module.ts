import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from "./rating/rating.component";
import { SquareImageComponent } from "./square-image/square-image.component";

@NgModule({
  declarations: [RatingComponent, SquareImageComponent],
  imports: [
    CommonModule
  ],
  exports: [RatingComponent, SquareImageComponent],
})
export class SharedModule { }
