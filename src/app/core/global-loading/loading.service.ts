import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _isLoading = new BehaviorSubject(false);
  isLoading$ = this._isLoading.asObservable().pipe(distinctUntilChanged());

  constructor() {}

  showLoading() {
    this._isLoading.next(true);
  }

  hideLoading() {
    this._isLoading.next(false);
  }
}
