import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const email = control.value;
    const regex: RegExp = /[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-+]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})/;
    if (regex.test(email)) {
      return null;
    } else {
      return { invalidEmail: true };
    }
  }

  static postcode(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const postCode = control.value;
    const regex: RegExp = /^[1-9][0-9]{3} ?(?!SA|SD|SS)[A-Z]{2}$/i;
    if (!regex.test(postCode)) {
      return { invalidPostcode: true };
    } else {
      return null;
    }
  }

  static phone(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const phoneNumber = control.value;
    const regex: RegExp = /^[0-9]{10}$/;
    if (regex.test(phoneNumber)) {
      return null;
    } else {
      return { invalidPhone: true };
    }
  }


  static valueIsTrue(control: AbstractControl): ValidationErrors | null {
    return control.value === true ? null : {isNotTrue: true};
  }

  static MatchFields( firstControlName, secondControlName): ValidationErrors | null {
    return (AC: AbstractControl) => {
      const firstControlValue = AC.get(firstControlName).value;
      const secondControlValue = AC.get(secondControlName).value;

      if (firstControlValue !== secondControlValue) {
        AC.get(secondControlName).setErrors({ matchFields: true });
      } else {
        return null;
      }
    };
  }

  static minMaxYears(minYears, maxYears): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return;
      }
      const ISOdateString = control.value;
      const year = parseInt(ISOdateString.split('-')[0], 10);
      if (!year) {
        return null;
      }

      if ( year > maxYears || year < minYears ) {
          return {
            yearRangeError: {
              given: year,
              max: maxYears,
              min: minYears
            }
          };
        } else {
          return null;
        }
    };
  }

}
