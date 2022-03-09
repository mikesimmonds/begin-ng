import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {AuthCredentialsResponse, LoginDetails} from "../auth.models";
import {SetPassword} from "../components/new-password/new-password.component";

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  constructor(
    private http: HttpClient
  ) { }

  // old registration module
  createAccount(email){

  }

  login(loginDetails: LoginDetails): Observable<AuthCredentialsResponse> {
    return this.http.post<AuthCredentialsResponse>(`${environment.loginUrl}`, loginDetails)
  }
  newPassword(setPassword: SetPassword): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/signup/setPassword`, setPassword);
  }

  // ** warn - should be under /member not /signup
  verifyAccount(activationCode): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/signup/verifyAccount`, {activationCode});
  }

  resetPassword(email: string) {
    return this.http.post<any>(`${environment.resetPasswordUrl}`, {email});
  }
  // END - Old registration module

  refreshAccessToken(refreshToken): Observable<AuthCredentialsResponse> {
    return this.http.post<AuthCredentialsResponse>(
      environment.refreshTokenUrl,
      `grant_type=refresh_token&refresh_token=${refreshToken}`,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }

  checkResetTokenValidity(resetToken): Observable<boolean> {
    throw new Error(`Endpoint not yet set up, called with ${resetToken}`)
    //   return this.http.post<any>(`${environment.apiUrl}/signup/verifyResetLink`, {resetToken});
  }

}
