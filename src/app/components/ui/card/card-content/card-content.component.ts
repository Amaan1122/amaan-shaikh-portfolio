import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardContentComponent {
  @Input() className: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'card-content';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getContentClasses();
  }

  getContentClasses(): string {
    const baseClasses = `px-6 last-child-pb-6`;
    return `${baseClasses} ${this.className}`.trim();
  }
}
