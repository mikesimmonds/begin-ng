import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';

function matchPasswords(AC: AbstractControl): ValidationErrors | null {
  if (!AC) return null;
  const firstControlValue = AC.get('password')?.value;
  const secondControlValue = AC.get('confirmPassword')?.value;
  if (!secondControlValue) {
    return null;
  } else {
    if (firstControlValue !== secondControlValue) {
      return { unmatchedPasswords: true };
    } else {
      return null;
    }
  }
}

@Component({
  selector: 'lib-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordControlComponent,
      multi: true,
    },
  ],
})
export class PasswordControlComponent implements ControlValueAccessor, OnInit {
  @Input() options!: {
    value: number | string;
    pwdLabel: string;
    confirmLabel: string;
  };
  @Input() idPrefix: string = Math.floor(
    1000 + Math.random() * 9000
  ).toString();

  passwordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  propagateChange = (_: string | null) => {}; // change any to formControl data type
  propagateTouched = (_: boolean) => {}; // inform parent form when controls are touched (onTouched = true)

  ngOnInit(): void {
    this.passwordForm = this.createPasswordForm();
    this.setConfirmStatusToFromStatus();
  }

  createPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: [, Validators.required],
      },
      { validators: matchPasswords }
    );
  }

  // We do this so that the validation on the whole form is visible to the user in the conformPassword field
  setConfirmStatusToFromStatus() {
    this.passwordForm.statusChanges.subscribe((status) => {
      const confirmPwdCtrl = this.passwordForm?.get('confirmPassword');
      if (!confirmPwdCtrl) return;
      if (status === 'VALID') {
        confirmPwdCtrl.setErrors(null, { emitEvent: false });
      } else {
        confirmPwdCtrl.setErrors(
          { unmatchedPasswords: true },
          { emitEvent: false }
        );
      }
    });
  }

  writeValue(value: string) {
    this.passwordForm.setValue({ password: value, confirmPassword: null });
  }

  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  onChange(value: any) {
    this.passwordForm.updateValueAndValidity();
    if (this.passwordForm.valid) {
      this.propagateChange(value);
    } else {
      this.propagateChange(null);
    }
  }

  onBlur() {
    this.propagateTouched(true);
    this.propagateTouched(true);
    const pwdCtrl = this.passwordForm.get('password');
    if (!pwdCtrl) return;
    this.onChange(pwdCtrl.value);
  }

  setErrorsOnAllControls(errors: ValidationErrors | null) {
    if (!this.passwordForm) return;
    const controls = this.passwordForm.controls;
    for (let key in controls) {
      controls[key].setErrors(errors, { emitEvent: false });
    }
  }

  // This fn and its provider turn this method into a validation for this formControl. It is fired when the registerOnChange() callback is called. Note the customFormControl, that this component creates is invalid, but it does not render the internal form invalid without manuallt setting the errors.
  validate(AC: AbstractControl): ValidationErrors | null {
    const firstControlValue = this.passwordForm.get('password');
    const secondControlValue = this.passwordForm.get('confirmPassword');
    if (!firstControlValue || !secondControlValue) return null;
    if (firstControlValue.value !== secondControlValue.value) {
      return { unmatchedPasswords: true };
    } else {
      this.setErrorsOnAllControls(null);
      return null;
    }
  }
}

/* if i type a:

valid password no-emit, no error
  correct confirmation: emit, no error
  unmatch confirmation; no-emit, error confirmation
    correct password; emit, no error
    incorrect password; no-emit, error




*/
