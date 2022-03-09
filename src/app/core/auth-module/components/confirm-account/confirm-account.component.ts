import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { AuthRestService } from '../../services/auth-rest.service';

@Component({
  selector: 'bgng-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  accountState!: 'inactive' | 'activated' | 'code-invalid' | 'code-expired';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: AuthRestService
  ) {}

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams && queryParams.code) {
      this.accountState = 'inactive';
      this.tryActivationCode(queryParams.code)
        .pipe(
          delay(1200),
          catchError((origErr) => {
            return this.handleError(origErr);
          })
        )
        .subscribe((userDetails) => {
          this.accountState = 'activated';
        });
    } else {
      this.accountState = 'code-invalid';
      throw new Error('No code in url link');
    }
  }

  private gotoSetPassword() {
    this.router.navigate(['registration/new-password']);
  }

  private tryActivationCode(activationCode: string): Observable<boolean> {
    return this.restService.verifyAccount(activationCode);
  }

  private handleError(origErr: any): Observable<any> {
    switch (origErr.status) {
      case 208: {
        this.gotoSetPassword();
        return throwError(origErr);
      }
      case 404: {
        this.accountState = 'code-invalid';
        return throwError(origErr);
      }
      case 410: {
        this.accountState = 'code-expired';
        return throwError(origErr);
      }
      default: {
        return throwError(origErr);
      }
    }
  }
}
