import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
type ButtonElement = 'button' | 'a' | 'div';

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
  @Input() element: ButtonElement = 'button';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() href: string = ''; // for anchor elements
  @Input() target: string = ''; // for anchor elements

  @Output() buttonClick = new EventEmitter<Event>();

  @HostBinding('class')
  get hostClasses(): string {
    return 'button-host';
  }

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'button';
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.updateSVGClasses();
  }

  getButtonClasses(): string {
    const baseClasses = `
      inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md 
      text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 
      shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 
      focus-visible:ring-[3px] aria-invalid:ring-destructive/20 
      dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
      button-svg-styles
    `;

    const variantClasses = this.getVariantClasses();
    const sizeClasses = this.getSizeClasses();

    return `${baseClasses} ${variantClasses} ${sizeClasses} ${this.className}`.trim();
  }

  private getVariantClasses(): string {
    const variants: Record<ButtonVariant, string> = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: `
        bg-destructive text-white hover:bg-destructive/90 
        focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 
        dark:bg-destructive/60
      `,
      outline: `
        border bg-background text-foreground hover:bg-accent 
        hover:text-accent-foreground dark:bg-input/30 dark:border-input 
        dark:hover:bg-input/50
      `,
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost:
        'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline',
    };

    return variants[this.variant] || variants.default;
  }

  private getSizeClasses(): string {
    const sizes: Record<ButtonSize, string> = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md gap-1.5 px-3',
      lg: 'h-10 rounded-md px-6',
      icon: 'size-9 rounded-md',
    };

    return sizes[this.size] || sizes.default;
  }

  private updateSVGClasses(): void {
    const buttonElement = this.elementRef.nativeElement.querySelector(
      '[data-slot="button"]'
    );
    const hasSVG = buttonElement?.querySelector('svg');

    if (hasSVG && buttonElement) {
      this.renderer.addClass(buttonElement, 'has-svg');

      // Apply size-specific padding for buttons with SVG
      if (this.size === 'default') {
        this.renderer.addClass(buttonElement, 'has-svg-default');
      } else if (this.size === 'sm') {
        this.renderer.addClass(buttonElement, 'has-svg-sm');
      } else if (this.size === 'lg') {
        this.renderer.addClass(buttonElement, 'has-svg-lg');
      }
    }
  }

  onClick(event: Event): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

  get elementType(): ButtonElement {
    if (this.asChild && this.href) return 'a';
    if (this.asChild) return 'div';
    return 'button';
  }
}
