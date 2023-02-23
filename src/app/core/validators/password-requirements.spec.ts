import { UntypedFormControl } from '@angular/forms';
import { passwordStrengthValidator } from './password-requirements';

describe('validatePasswords', () => {
  let control: UntypedFormControl

  beforeEach(() => {
    control = new UntypedFormControl(['', passwordStrengthValidator()]);
  });

  it('should find missing uppercase correctly', () => {
    control.setValue('passw0rd!')

    expect(control.hasError('upperCase')).toBe(true);
  });

  // it('should be valid if passwords match', () => {
  //   formGroup.patchValue({
  //     [password]: '123',
  //     [confirmPassword]: '123'
  //   });

  //   expect(formGroup.get(confirmPassword).valid).toBe(true);
  // });
});
