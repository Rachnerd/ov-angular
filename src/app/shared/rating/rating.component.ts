import { AfterViewInit, Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { Star, StarService } from './shared/star.service';

const STAR_CLASSES: Record<Star, string> = {
  '0': 'star fa fa-star-o',
  '0.5': 'star fa fa-star-half-o',
  '1': 'star fa fa-star',
};

@Component({
  selector: 'ov-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements AfterViewInit {
  @Input() rate: number;
  @Input() count: number;

  @ViewChild('stars')
  starsElement: ElementRef;

  constructor(private starService: StarService) {}

  ngAfterViewInit(): void {
    this.renderStars();
  }

  private renderStars() {
    const stars = this.starService.createStars(this.rate);

    stars.forEach((star) => {
      const starElement = document.createElement('span');
      starElement.className = STAR_CLASSES[star];
      this.starsElement.nativeElement.appendChild(starElement);
    });
  }
}
