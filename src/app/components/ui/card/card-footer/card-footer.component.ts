import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFooterComponent {
  @Input() className: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'card-footer';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getFooterClasses();
  }

  getFooterClasses(): string {
    const baseClasses = `flex items-center px-6 pb-6 border-t-conditional pt-6-conditional`;
    return `${baseClasses} ${this.className}`.trim();
  }
}
