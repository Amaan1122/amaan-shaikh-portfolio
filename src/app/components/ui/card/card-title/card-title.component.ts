import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-title.component.html',
  styleUrls: ['./card-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTitleComponent {
  @Input() className: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'card-title';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getTitleClasses();
  }

  getTitleClasses(): string {
    const baseClasses = `leading-none`;
    return `${baseClasses} ${this.className}`.trim();
  }
}
