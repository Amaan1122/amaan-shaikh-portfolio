import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent {
  @Input() className: string = '';
  @Input() value: number = 0;
  @Input() max: number = 100;

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'progress';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getProgressClasses();
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'progressbar';
  }

  @HostBinding('attr.aria-valuenow')
  get ariaValueNow(): number {
    return this.value;
  }

  @HostBinding('attr.aria-valuemin')
  get ariaValueMin(): number {
    return 0;
  }

  @HostBinding('attr.aria-valuemax')
  get ariaValueMax(): number {
    return this.max;
  }

  getProgressClasses(): string {
    const baseClasses = `
      bg-primary/20 relative h-2 w-full overflow-hidden rounded-full
    `;

    return `${baseClasses} ${this.className}`.trim();
  }

  getIndicatorTransform(): string {
    const percentage = Math.min(Math.max(this.value || 0, 0), 100);
    return `translateX(-${100 - percentage}%)`;
  }
}
