import { Injectable } from '@angular/core';
import {AuthCredentials} from "../auth.models";

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  constructor() { }

  clearAllCredentials() {
    window.localStorage.clear();
  }

  storeAuthCredentials(credentials: AuthCredentials) {
    try {
      window.localStorage.setItem('authCredentials', JSON.stringify(credentials));
    } catch {
      throw new Error(`Could not set local storage for credentials`);
    }
  }

  retrieveAuthCredentials(): AuthCredentials {
    const credentials = window.localStorage.getItem('authCredentials');
    if (credentials) {
      return JSON.parse(credentials);
    }
  }
}
