import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../shared-form/validation-service/custom-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthRestService } from '../../services/auth-rest.service';

export interface SetPassword {
  activationCode: string;
  password1: string;
  password2: string;
}

@Component({
  selector: 'bgng-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;

  displayError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private restService: AuthRestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // TODO: re-activate this when backend is complete
    this.checkTokenValidity(this.getActivationCode());
    this.createForm();
  }

  createForm() {
    this.newPasswordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required]],
        confirmedPassword: [null, [Validators.required]],
      },
      {
        validators: [
          CustomValidators.MatchFields('password', 'confirmedPassword'),
        ],
      }
    );
  }

  submit() {
    if (this.displayError) {
      this.router.navigate(['../forgot-password']);
    } else {
      if (this.newPasswordForm.valid) {
        const activationCode = this.getActivationCode();
        const body: SetPassword = {
          activationCode,
          password1: this.newPasswordForm.get('password').value,
          password2: this.newPasswordForm.get('confirmedPassword').value,
        };
        this.restService
          .newPassword(body)
          .pipe(
            catchError((origError) => {
              if (origError.status === 404) {
                this.displayError = true;
                return throwError(origError);
              }
            })
          )
          .subscribe(() => {
            this.router.navigate(['registration/login']);
          });
      } else {
        this.newPasswordForm.markAllAsTouched();
      }
    }
  }

  getActivationCode(): string {
    if (this.route.snapshot.queryParams.code) {
      return this.route.snapshot.queryParams.code;
    }
  }

  private checkTokenValidity(resetToken) {
    this.restService
      .checkResetTokenValidity(resetToken)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            this.showInvalidTokenModal();
          }
          return throwError(error);
        })
      )
      .subscribe(() => {});
  }

  private showInvalidTokenModal() {
    //alert('Deze link is niet meer geldig. Vraag opnieuw een wachtwoord reset aan.');
    this.displayError = true;
    //this.router.navigate(['../forgot-password']);
  }
}
