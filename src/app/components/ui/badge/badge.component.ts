import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() className: string = '';
  @Input() asChild: boolean = false;
  @Input() element: 'span' | 'div' | 'a' = 'span';

  @HostBinding('class')
  get hostClasses(): string {
    return this.getBadgeClasses();
  }

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'badge';
  }

  getBadgeClasses(): string {
    const baseClasses = `
      inline-flex items-center justify-center rounded-md border px-2 py-0.5 
      text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 
      focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] 
      aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
      aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden
      badge-svg-styles
    `;

    const variantClasses = this.getVariantClasses();

    return `${baseClasses} ${variantClasses} ${this.className}`.trim();
  }

  private getVariantClasses(): string {
    const variants: Record<BadgeVariant, string> = {
      default: `
        border-transparent bg-primary text-primary-foreground 
        hover:bg-primary/90
      `,
      secondary: `
        border-transparent bg-secondary text-secondary-foreground 
        hover:bg-secondary/90
      `,
      destructive: `
        border-transparent bg-destructive text-white 
        hover:bg-destructive/90 focus-visible:ring-destructive/20 
        dark:focus-visible:ring-destructive/40 dark:bg-destructive/60
      `,
      outline: `
        text-foreground hover:bg-accent hover:text-accent-foreground
      `,
    };

    return variants[this.variant] || variants.default;
  }
}
