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
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() className: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() min: string | number = '';
  @Input() max: string | number = '';
  @Input() step: string | number = '';
  @Input() pattern: string = '';
  @Input() accept: string = ''; // for file inputs
  @Input() multiple: boolean = false; // for file inputs
  @Input() autocomplete: string = '';
  @Input() ariaLabel: string = '';
  @Input() ariaDescribedBy: string = '';
  @Input() ariaInvalid: boolean = false;

  @Output() inputChange = new EventEmitter<Event>();
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  @Output() inputBlur = new EventEmitter<FocusEvent>();

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'input';
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

  getInputClasses(): string {
    const baseClasses = `
      file-text-foreground placeholder-text-muted-foreground 
      selection-bg-primary selection-text-primary-foreground 
      dark-bg-input-30 border-input flex h-9 w-full min-w-0 rounded-md 
      border px-3 py-1 text-base bg-input-background transition-color-box-shadow 
      outline-none file-styles disabled-pointer-events-none 
      disabled-cursor-not-allowed disabled-opacity-50 md-text-sm
      focus-visible-border-ring focus-visible-ring-ring-50 focus-visible-ring-3
      aria-invalid-ring-destructive-20 dark-aria-invalid-ring-destructive-40 
      aria-invalid-border-destructive
    `;

    return `${baseClasses} ${this.className}`.trim();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.inputChange.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.inputFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.onTouched();
    this.inputBlur.emit(event);
  }
}
