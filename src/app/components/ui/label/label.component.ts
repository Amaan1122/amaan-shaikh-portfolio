import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent implements OnInit, OnDestroy {
  @Input() className: string = '';
  @Input() htmlFor: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'label';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getLabelClasses();
  }

  private mutationObserver?: MutationObserver;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setupPeerObserver();
  }

  ngOnDestroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  getLabelClasses(): string {
    const baseClasses = `
      flex items-center gap-2 text-sm leading-none font-medium select-none
      group-data-disabled-pointer-events-none group-data-disabled-opacity-50
      peer-disabled-cursor-not-allowed peer-disabled-opacity-50
    `;

    return `${baseClasses} ${this.className}`.trim();
  }

  private setupPeerObserver(): void {
    // Watch for peer disabled states
    this.mutationObserver = new MutationObserver(() => {
      this.updatePeerStates();
    });

    this.mutationObserver.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['disabled', 'aria-disabled', 'data-disabled'],
    });
  }

  private updatePeerStates(): void {
    const labelElement = this.elementRef.nativeElement;

    // Find associated form element
    let associatedElement: HTMLElement | null = null;

    if (this.htmlFor) {
      associatedElement = document.getElementById(this.htmlFor);
    }

    if (associatedElement?.hasAttribute('disabled')) {
      this.renderer.addClass(labelElement, 'peer-is-disabled');
    } else {
      this.renderer.removeClass(labelElement, 'peer-is-disabled');
    }

    // Check for group disabled state
    const groupElement = labelElement.closest('[data-disabled="true"]');
    if (groupElement) {
      this.renderer.addClass(labelElement, 'group-is-disabled');
    } else {
      this.renderer.removeClass(labelElement, 'group-is-disabled');
    }
  }
}
