import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthRestService} from "./auth-rest.service";
import {AuthStorageService} from "./auth-storage.service";
import {AuthCredentials, AuthCredentialsResponse, LoginDetails} from '../auth.models';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService: AuthStorageService,
    private restService: AuthRestService
  ) {}

  login(loginDetails: LoginDetails): Observable<AuthCredentialsResponse> {
    return this.restService.login(loginDetails);
  }

  logout(): void {
    this.storageService.clearAllCredentials();
    window.location.href = `${environment.loginUrl}`;
  }

  isLoggedIn(): boolean {
    const tokenExpiryTime = this.storageService.retrieveAuthCredentials().expires_at;
    return tokenExpiryTime < new Date().getTime();
  }

  refreshAccessToken(): Observable<AuthCredentialsResponse> {
    const refreshToken = this.getRefreshToken();
    return this.restService.refreshAccessToken(refreshToken)
  }

  getAuth(): AuthCredentials {
    return this.storageService.retrieveAuthCredentials();
  }

  getAccessToken(): string {
    if (this.getAuth()) {
      return this.getAuth().access_token;
    }
  }

  getRefreshToken(): string {
    if (this.getAuth()) {
      return this.getAuth().refresh_token;
    }
  }

  // This method should be customised based on the SpringSecurityRest plugin configuration.
  // This can use the environment vars right?
  isRefreshUrl(url: string) {
    return url.includes(environment.refreshTokenUrl) || url.includes(environment.loginUrl);
    // return url.includes('oauth') || url.includes('login');
  }
}
