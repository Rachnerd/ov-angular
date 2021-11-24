import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from "./rating/rating.component";
import { SquareImageComponent } from "./square-image/square-image.component";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [RatingComponent, SquareImageComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    RatingComponent,
    SquareImageComponent,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class SharedModule {
}
