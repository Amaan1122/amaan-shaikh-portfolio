import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  ViewChild,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Types for button variants
export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'gradient';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonVariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// Class Variance Authority equivalent function
function cva(baseClasses: string, config: any) {
  return function (props: any) {
    let classes = baseClasses;

    if (config.variants) {
      Object.keys(config.variants).forEach((key) => {
        const variantValue = props[key] || config.defaultVariants?.[key];
        if (variantValue && config.variants[key][variantValue]) {
          classes += ' ' + config.variants[key][variantValue];
        }
      });
    }

    if (props.className) {
      classes += ' ' + props.className;
    }

    return classes;
  };
}

// Button variants configuration (Updated with gradient)
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-primary rounded-2xl glass-effect font-semibold letter-spacing-015 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient:
          'bg-gradient border-0 rounded-2xl letter-spacing-015 focus-visible:ring-primary/30 neon-border text-white font-semibold',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements AfterViewInit {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() className: string = '';
  @Input() asChild: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel: string = '';
  @Input() ariaInvalid: boolean = false;

  @ViewChild('buttonElement', { static: true }) buttonElement!: ElementRef;

  get buttonClasses(): string {
    return this.cn(
      buttonVariants({
        variant: this.variant,
        size: this.size,
        className: this.className,
      })
    );
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Set data-slot attribute
    this.renderer.setAttribute(
      this.buttonElement.nativeElement,
      'data-slot',
      'button'
    );
  }

  // Utility function equivalent to cn from utils
  private cn(...classes: (string | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
  }

  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    // Event will bubble up naturally
  }
}
