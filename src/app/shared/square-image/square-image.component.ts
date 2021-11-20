import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ov-square-image',
  templateUrl: './square-image.component.html',
  styleUrls: ['./square-image.component.scss']
})
export class SquareImageComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;

  constructor() { }

  ngOnInit(): void {
  }

}
