import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from '../../../../shared-form/validation-service/custom-validators';
import { AuthRestService } from '../../services/auth-rest.service';

@Component({
  selector: 'bgng-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authRestService: AuthRestService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, CustomValidators.email]],
    });
  }

  submit() {
    this.authRestService
      .resetPassword(this.forgotPasswordForm.get('email').value)
      .subscribe(() => {
        alert('Check je email om je wachtwoord te herstellen');
      });
  }
}
