import { AfterViewInit, Component, forwardRef, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Occurrence } from 'src/app/workshop/workshop.interfaces';
import { CustomValidators } from '../custom-validators';
import { OccurrenceFormComponent } from '../../form-partials/occurrence-form/occurrence-form.component';

@Component({
  selector: 'app-occurrences-control',
  templateUrl: './occurrences-control.component.html',
  styleUrls: ['./occurrences-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OccurrencesControlComponent),
      multi: true,
    },
  ],
})
export class OccurrencesControlComponent
  implements AfterViewInit, ControlValueAccessor
{
  occBeingEdited: Occurrence | null;
  constructor() {}

  occurrences: Occurrence[];

  @ViewChild(OccurrenceFormComponent, { static: true })
  occurrenceFormComponent: OccurrenceFormComponent;

  occurrenceForm: FormGroup;

  ngAfterViewInit(): void {
    this.occurrenceForm = this.occurrenceFormComponent.occurrenceForm;
  }

  onEdit(occurrenceIndex) {
    // Remove occ from occ.array. store original occ. Add occ to the form. no emit
    const [occurrence] = this.occurrences.splice(occurrenceIndex, 1);
    this.occBeingEdited = occurrence;
    this.occurrenceForm.reset();
    this.updatePOValidator();
    this.occurrenceForm.patchValue({ ...occurrence }, { emitEvent: false });
  }

  onDelete(occurrenceIndex: number) {
    // remove occ from occ.array. emit.
    const [occurrence] = this.occurrences.splice(occurrenceIndex, 1);
    this.onChange(this.occurrences);
    this.occurrenceForm.reset();
    this.occBeingEdited = null;
    this.updatePOValidator();
  }

  onCancel() {
    // find a cached verion of the occ and put it into the array. no emit
    this.occurrences = [...this.occurrences, this.occBeingEdited];
    this.occBeingEdited = null;
    this.occurrenceForm.reset();
    this.updatePOValidator();
  }

  onSubmit() {
    // combines update and add
    // put the occ from the form into the array. emit
    if (!this.occurrenceForm.valid) {
      this.occurrenceForm.markAllAsTouched();
      return;
    }
    this.occurrences = [...this.occurrences, this.occurrenceForm.value];
    this.onChange(this.occurrences);
    this.occBeingEdited = null;
    this.clearPoNumber();
    this.updatePOValidator();
  }

  clearPoNumber() {
    this.occurrenceForm.get('purchaseOrder').reset();
  }

  updatePOValidator() {
    const poList = this.occurrences?.map((oc) => oc.purchaseOrder) || [];
    const control = this.occurrenceForm.get('purchaseOrder');
    control.setValidators([CustomValidators.notIncludedIn(poList)]);
    control.updateValueAndValidity();
    control.reset();
  }

  // CVA methods

  // Call this function to update the parent.
  onChangeHandler = (_: any) => {}; // change any to formControl data type

  writeValue(occurrences: Occurrence[]) {
    this.occurrences = occurrences;
  }

  registerOnTouched(fn) {}

  registerOnChange(fn) {
    // Registers the handler function we want to call whenever the formControl value changes through the view.
    this.onChangeHandler = fn;
  }

  onChange(value) {
    this.onChangeHandler(value);
  }
}
