import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../shared-form/validation-service/custom-validators';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'bgng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  displayError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, CustomValidators.email]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    const loginDetails = {
      ...this.loginForm.value,
    };
    this.displayError = false;
    this.authService
      .login(loginDetails)
      .pipe(
        catchError((origError) => {
          if (origError) {
            this.displayError = true;
            return throwError(origError);
          }
        })
      )
      .subscribe((credentials) => {
        if (credentials && credentials.access_token) {
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
