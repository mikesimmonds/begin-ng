import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-date-time-control',
  templateUrl: './date-time-control.component.html',
  styleUrls: ['./date-time-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeControlComponent),
      multi: true,
    },
  ],
})
export class DateTimeControlComponent implements ControlValueAccessor {
  constructor() {}

  dateValue: Moment;
  timeValue: string;

  checkAndUpdate() {
    if (this.dateValue && this.timeValue) {
      let currentDate = new Date();
      currentDate = this.updateDate(currentDate);
      currentDate = this.updateTime(currentDate);
      this.onChange(currentDate);
    }
  }

  updateDate(date: Date): Date {
    const currentDate = new Date(date);
    const formDate = this.dateValue.toDate();
    currentDate.setFullYear(formDate.getFullYear());
    currentDate.setMonth(formDate.getMonth());
    currentDate.setDate(formDate.getDate());
    return currentDate;
  }

  updateTime(date: Date): Date {
    const arr = this.timeValue.split(':');
    const hour = +arr[0];
    const minute = +arr[1];

    const currentDate = new Date(date);
    currentDate.setHours(hour);
    currentDate.setMinutes(minute);
    currentDate.setSeconds(0);
    return currentDate;
  }

  // Call this function to update the parent.
  onChangeHandler = (_: Date) => {}; // change any to formControl data type

  writeValue(value: any) {
    // change any to formControl data type
    // writes a new value from the form model into the view. Called on setValue() or patchValue()
    this.dateValue = moment(value);
    if (this.dateValue.isValid()) {
      // TODO: string date manipulation
      this.timeValue = this.dateValue.format('HH:mm');
    } else {
      this.timeValue = null;
    }
  }

  registerOnTouched() {}

  registerOnChange(fn) {
    // Registers the handler function we want to call whenever the formControl value changes through the view.
    this.onChangeHandler = fn;
  }

  onChange(value) {
    this.onChangeHandler(value);
  }
}
