import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
  @Input() id = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() rows = 6;
  @Input() cols = 50;
  @Input() maxlength: number | null = null;
  @Input() minlength: number | null = null;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaInvalid: boolean | string = false;
  @Input() className = '';

  @Output() textareaChange = new EventEmitter<Event>();
  @Output() textareaFocus = new EventEmitter<FocusEvent>();
  @Output() textareaBlur = new EventEmitter<FocusEvent>();

  @HostBinding('attr.data-slot') dataSlot = 'textarea';

  message: string = '';

  onChange = (message: any) => {};
  onTouched = () => {};

  get finalClass(): string {
    const baseClass = `
      resize-none border-input placeholder:text-muted-foreground
      focus-visible:border-ring focus-visible:ring-ring/50
      aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
      aria-invalid:border-destructive dark:bg-input/30
      flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background
      px-3 py-2 text-base transition-[color,box-shadow] outline-none
      focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
    `;
    return `${baseClass} ${this.className}`.trim();
  }

  writeValue(message: any): void {
    this.message = message || '';
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

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;
    this.onChange(this.message);
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
