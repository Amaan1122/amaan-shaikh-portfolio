import {
  Component,
  Input,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

@Component({
  selector: 'app-image-with-fallback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-with-fallback.component.html',
  styleUrls: ['./image-with-fallback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageWithFallbackComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() className: string = '';
  @Input() style: any = {};
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() decoding: 'async' | 'auto' | 'sync' = 'async';
  @Input() crossorigin: 'anonymous' | 'use-credentials' | '' = '';
  @Input() referrerpolicy: string = '';
  @Input() sizes: string = '';
  @Input() srcset: string = '';
  @Input() usemap: string = '';
  @Input() width: number | string = '';
  @Input() height: number | string = '';

  didError = signal(false);
  readonly ERROR_IMG_SRC = ERROR_IMG_SRC;

  handleError(): void {
    this.didError.set(true);
  }

  getErrorContainerClasses(): string {
    return `inline-block bg-gray-100 text-center align-middle ${
      this.className || ''
    }`.trim();
  }
}
