import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface PasswordRequirements {
  upperCount?: number;
  lowerCount?: number;
  numberCount?: number;
  symbolCount?: number;
  pwdLength?: number;
}
const baseRequirements = {
  upperCount: 0,
  lowerCount: 0,
  numberCount: 0,
  symbolCount: 0,
  pwdLength: 0
};


export function passwordStrengthValidator(requirements?: PasswordRequirements): ValidatorFn {
  if (!requirements) {
    console.error('No password requirements provided to passwordStrengthValidator. Password will not be validated.');
    requirements = baseRequirements;
  }
  requirements = {...baseRequirements, ...requirements};
  return (control: AbstractControl): ValidationErrors | null => {
    const str = control.value?.toString();
    if (!str) return null;
    const errors: ValidationErrors = {};
    const passwordHas: PasswordRequirements = {
      upperCount: str.replace(/[^A-Z]/g, '').length,
      lowerCount: str.replace(/[^a-z]/g, '').length,
      numberCount: str.replace(/[^1-9]/g, '').length,
      symbolCount: str.replace(/[a-zA-Z\d\s:]/g, '').length,
      pwdLength: str.length
    };
    Object.keys(passwordHas).forEach(key => {
      if (passwordHas[key] < requirements[key]) {
        errors[key] = { required: requirements[key], found: passwordHas[key]};
      }
    });
    const hasErrors = Object.keys(errors).length;
    return hasErrors ? {passwordStrength: errors} : null;
  };

}
