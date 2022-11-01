import {
  CdkDialogContainer,
  Dialog,
  DialogConfig,
  DialogRef,
} from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AlertModalComponent,
  AlertModalOptions,
} from './alert-modal/alert-modal.component';
import {
  ConfirmModalComponent,
  ConfirmModalOptions,
} from './confirm-modal/confirm-modal.component';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  baseConfig: DialogConfig = {
    panelClass: ['modal-base'], // Must be in global scope :(
  };

  constructor(public ngDialog: Dialog) {}
/**
 * Opens a custom dialog with the Component or #TemplateReference provided.
 * Returns the DialogRef which gives acess to the underlying component instance.
 * Use DialogRef.closed to get an Observable of the result.
 *
 * @param {(ComponentType<any> | TemplateRef<any>)} modal
 * @param {DialogConfig} [configOverride]
 * @return {*}  {DialogRef}
 * @memberof ModalService
 */
open(
    modal: ComponentType<any> | TemplateRef<any>,
    configOverride?: DialogConfig
  ): DialogRef {
    const config = { ...this.baseConfig, ...configOverride };
    return this.ngDialog.open(modal, config);
  }
  /**
   * Opens an alert dialog similar to window.alert().
   * Returns an Observable.
   *
   * @param {string} message - the message to display in alert.
   * @memberof ModalService
   */
  alert(data: AlertModalOptions): Observable<true | undefined> {
    console.log(`this.alert: `);
    const config = { ...this.baseConfig, data };
    return this.ngDialog.open<true | undefined>(AlertModalComponent, config)
      .closed;
  }

  /**
   * Opens an alert dialog similar to window.confirm().
   * Returns an Observable.
   *
   * @param {string} message - the message to display in alert.
   * @memberof ModalService
   */
  confirm(data: ConfirmModalOptions): Observable<boolean | null> {
    const config = { ...this.baseConfig, ...{ data: data } };
    return this.ngDialog.open<boolean | null>(ConfirmModalComponent, config)
      .closed;
  }

  prompt(data: ConfirmModalOptions): Observable<string | null> {
    const config = { ...this.baseConfig, ...{ data: data } };
    return this.ngDialog.open<string | null>(PromptModalComponent, config)
      .closed;
   }
}
