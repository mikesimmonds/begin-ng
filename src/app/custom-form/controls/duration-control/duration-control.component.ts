import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * This custom form control is used for inputting time periods.
 * It accepts and displays time in seconds.
 *
 * @export
 * @class DurationControlComponent
 * @implements {ControlValueAccessor}
 */
@Component({
  selector: 'app-duration-control',
  templateUrl: './duration-control.component.html',
  styleUrls: ['./duration-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationControlComponent),
      multi: true,
    },
  ],
})
export class DurationControlComponent implements ControlValueAccessor {
  @Input() hideUnits: Array<'days' | 'hours' | 'mins'>;
  // Call this function to update the parent.
  onChangeHandler = (_: number) => {};

  daysAvailable = [...Array(8).keys()];
  hoursAvailable = [...Array(25).keys()];
  minsAvailable = [0, 15, 30, 45];

  daysValue = 0;
  hoursValue = 0;
  minsValue = 0;

  _currentSeconds = 0;

  constructor() {}

  writeValue(value: number) {
    // writes a new value from the form model into the view. Called on setValue() or patchValue()
    [this.daysValue, this.hoursValue, this.minsValue] =
      this.secondsToDHM(value);
  }

  registerOnChange(fn) {
    // Registers the handler function we want to call whenever the formControl value changes through the view.
    this.onChangeHandler = fn;
  }

  registerOnTouched() {
    // Similiar to registerOnChange(), this registers a handler specifically for when a control receives a touch event. Often unused.
  }

  onChange() {
    const seconds = this.dmhToSeconds([
      this.daysValue,
      this.hoursValue,
      this.minsValue,
    ]);
    this.onChangeHandler(seconds);
  }

  secondsToDHM(timeInSeconds: number): [number, number, number] {
    const seconds = Math.floor(timeInSeconds);
    const dayMs = 86400;
    const hourMs = 3600;
    const minuteMs = 60;

    const days = Math.floor(seconds / dayMs);
    const hours = Math.floor((seconds - days * dayMs) / hourMs);
    const minutes = Math.floor(
      (seconds - days * dayMs - hours * hourMs) / minuteMs
    );
    return [days, hours, minutes];
  }

  dmhToSeconds([days, hours, minutes]): number {
    const dayMs = 86400;
    const hourMs = 3600;
    const minuteMs = 60;
    return days * dayMs + hours * hourMs + minutes * minuteMs;
  }
}
