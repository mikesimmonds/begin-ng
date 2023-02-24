import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AlertModalComponent,
  AlertModalOptions,
} from './standard-dialogs/alert-modal.component';
import {
  ConfirmModalComponent,
  ConfirmModalOptions,
} from './standard-dialogs/confirm-modal.component';
import { PromptModalComponent } from './standard-dialogs/prompt-modal.component';

@Injectable()
export class ModalService {
  constructor(public ngDialog: Dialog) {}
  /**
   * Opens a custom dialog with the Component or #TemplateReference provided.
   * Returns the DialogRef which gives access to the underlying component
   * instance.
   * If a #templateRef is used, the *dialogRef directive exposes the modal
   * dialogRef, which can be used to close the modal
   * (see dialogRef.directive.ts for details)
   *
   * Use DialogRef.closed to get an Observable of the result.
   *
   * @param {(ComponentType<any> | TemplateRef<any>)} modalContent
   * @param {DialogConfig} [configOverride]
   * @return {*}  {DialogRef}
   * @memberof ModalService
   */
  open(
    modalContent: ComponentType<any> | TemplateRef<any>,
    configOverride: DialogConfig<unknown, any>
  ): DialogRef<any, any> {
    const config = { ...configOverride };
    return this.ngDialog.open(modalContent, config);
  }

  /**
   * Opens an alert dialog similar to window.alert().
   * Returns an Observable.
   *
   * @param {string} message - the message to display in alert.
   * @memberof ModalService
   */
  alert(data: AlertModalOptions): Observable<true | undefined> {
    const config = { data: data };
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
  confirm(data: ConfirmModalOptions): Observable<boolean | null | undefined> {
    const config = { data: data };
    return this.ngDialog.open<boolean | null>(ConfirmModalComponent, config)
      .closed;
  }

  prompt(data: ConfirmModalOptions): Observable<string | null | undefined> {
    const config = { data: data };
    return this.ngDialog.open<string | null>(PromptModalComponent, config)
      .closed;
  }
}
