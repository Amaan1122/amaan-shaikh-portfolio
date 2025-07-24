import { Component, Input } from '@angular/core';
import {CommonModule } from '@angular/common';

const ERROR_IMG_SRC =
  'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg';

@Component({
  selector: 'app-image-with-fallback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-with-fallback.component.html',
  styleUrls: ['./image-with-fallback.component.scss']
})
export class ImageWithFallbackComponent {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() className?: string;
  @Input() styleObject?: { [key: string]: any };

  didError = false;
  errorImgSrc = ERROR_IMG_SRC;

  handleError() {
    this.didError = true;
  }
}
