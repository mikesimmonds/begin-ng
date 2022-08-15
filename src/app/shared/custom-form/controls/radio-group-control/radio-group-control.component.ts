import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-group-control',
  templateUrl: './radio-group-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RadioGroupControlComponent)
    }
  ]
})
export class RadioGroupControlComponent implements ControlValueAccessor {

  @Input() options: {value: string | number, label: string}[];
  @Input() idPrefix: any = Math.floor(1000 + Math.random() * 9000);

  disabled = false;

  _selectedValue: FormControl;
  private propagateChange = (_: any) => { };

  constructor() {
  }

  radioOptionChanged(value) {
    this.propagateChange(value)
  }

  writeValue(val: string | number): void {
    if (!val) return;
    this._selectedValue.setValue(val);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
