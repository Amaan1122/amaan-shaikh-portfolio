import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() className: string = '';
  @Input() htmlFor: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'label';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getLabelClasses();
  }

  constructor() {}

  getLabelClasses(): string {
    const baseClasses = `
      flex items-center gap-2 text-sm leading-none font-medium select-none
      group-data-disabled-pointer-events-none group-data-disabled-opacity-50
      peer-disabled-cursor-not-allowed peer-disabled-opacity-50
    `;

    return `${baseClasses} ${this.className}`.trim();
  }
}
