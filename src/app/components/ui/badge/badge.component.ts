import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './badge.component.html',
})
export class BadgeComponent {
  @Input() variant: 'default' | 'secondary' | 'destructive' | 'outline' =
    'default';
  @Input() className = '';
  @Input() ariaInvalid = false;

  getVariantClass(): string {
    switch (this.variant) {
      case 'secondary':
        return 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90';
      case 'destructive':
        return 'border-transparent bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60';
      case 'outline':
        return 'text-foreground hover:bg-accent hover:text-accent-foreground';
      case 'default':
      default:
        return 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90';
    }
  }
}
