import { Component, Input, HostBinding, ChangeDetectionStrategy, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeaderComponent implements AfterViewInit {
  @Input() className: string = '';

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'card-header';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.getHeaderClasses();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.updateGridLayout();
  }

  getHeaderClasses(): string {
    const baseClasses = `
      container-card-header grid auto-rows-min grid-rows-auto-auto items-start 
      gap-1.5 px-6 pt-6 border-b-conditional pb-6-conditional
    `;
    
    return `${baseClasses} ${this.className}`.trim();
  }

  private updateGridLayout(): void {
    const headerElement = this.elementRef.nativeElement;
    const hasCardAction = headerElement.querySelector('[data-slot="card-action"]');
    
    if (hasCardAction) {
      this.renderer.addClass(headerElement, 'has-card-action');
    }
  }
}
