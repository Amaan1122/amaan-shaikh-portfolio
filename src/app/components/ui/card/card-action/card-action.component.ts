import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-action',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-action.component.html',
  styleUrls: ['./card-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardActionComponent {
  @Input() className: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'card-action';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getActionClasses();
  }

  getActionClasses(): string {
    const baseClasses = `
      col-start-2 row-span-2 row-start-1 self-start justify-self-end
    `;
    return `${baseClasses} ${this.className}`.trim();
  }
}
