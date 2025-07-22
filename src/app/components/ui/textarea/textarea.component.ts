import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() className: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() rows: number = 4;
  @Input() cols: number = 50;
  @Input() maxlength: number | null = null;
  @Input() minlength: number | null = null;
  @Input() ariaLabel: string = '';
  @Input() ariaDescribedBy: string = '';
  @Input() ariaInvalid: boolean = false;

  @Output() textareaChange = new EventEmitter<Event>();
  @Output() textareaFocus = new EventEmitter<FocusEvent>();
  @Output() textareaBlur = new EventEmitter<FocusEvent>();

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'textarea';
  }

  // ControlValueAccessor implementation
  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getTextareaClasses(): string {
    const baseClasses = `
      resize-none border-input placeholder-text-muted-foreground 
      focus-visible-border-ring focus-visible-ring-ring-50 
      aria-invalid-ring-destructive-20 dark-aria-invalid-ring-destructive-40 
      aria-invalid-border-destructive dark-bg-input-30 flex field-sizing-content 
      min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base 
      transition-color-box-shadow outline-none focus-visible-ring-3 
      disabled-cursor-not-allowed disabled-opacity-50 md-text-sm
    `;

    return `${baseClasses} ${this.className}`.trim();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    this.textareaChange.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.textareaFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.onTouched();
    this.textareaBlur.emit(event);
  }
}
