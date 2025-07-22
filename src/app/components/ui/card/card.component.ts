import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() className: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'card';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getCardClasses();
  }

  getCardClasses(): string {
    const baseClasses = `
      bg-card text-card-foreground flex flex-col gap-6 rounded-xl border
    `;
    
    return `${baseClasses} ${this.className}`.trim();
  }
}
