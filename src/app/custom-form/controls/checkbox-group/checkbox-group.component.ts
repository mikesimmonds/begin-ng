import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CheckboxGroupComponent),
    },
  ],
})
export class CheckboxGroupComponent implements ControlValueAccessor {
  @Input() options!: { value: number | string; label: string; help: string }[];
  @Input() idPrefix: any = Math.floor(1000 + Math.random() * 9000);

  disabled = false;

  private _selectedValues: (number | string)[] = [];
  private propagateChange = (_: any) => {};

  constructor() {}

  checked(value: number | string): boolean {
    return this._selectedValues && this._selectedValues.indexOf(value) > -1;
  }

  checkboxClick(value: number | string): void {
    const index = this._selectedValues.indexOf(value);
    if (index < 0) {
      this._selectedValues.push(value);
    } else {
      this._selectedValues.splice(index, 1);
    }
    this.propagateChange(this._selectedValues);
  }

  writeValue(obj: any[]): void {
    this._selectedValues = obj ? (obj as any[]) : [];
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
