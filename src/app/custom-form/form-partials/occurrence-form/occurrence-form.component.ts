import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-occurrence-form',
  templateUrl: './occurrence-form.component.html',
  styleUrls: ['./occurrence-form.component.scss'],
})
export class OccurrenceFormComponent implements OnInit {
  @Input() isAdmin = false;

  public occurrenceForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.occurrenceForm = this.formBuilder.group({
      startDate: [, Validators.required],
      purchaseOrder: [''],
      capacity: [Validators.required, Validators.min(1)],
    });
    if (this.isAdmin) {
      this.occurrenceForm.addControl('paymentDate', new FormControl());
    }
  }
}
