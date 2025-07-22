import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-description.component.html',
  styleUrls: ['./card-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDescriptionComponent {
  @Input() className: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'card-description';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getDescriptionClasses();
  }

  getDescriptionClasses(): string {
    const baseClasses = `text-muted-foreground`;
    return `${baseClasses} ${this.className}`.trim();
  }
}
