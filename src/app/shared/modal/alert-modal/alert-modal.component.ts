import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

export interface AlertModalOptions {
  message: string;
  title?: string;
  btnText?: string;
}

@Component({
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {

  defaultOptions: AlertModalOptions = {
    message: 'Alert',
    title: 'Alert',
    btnText: 'OK',
  };
  data: AlertModalOptions;

  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) alertModalOptions: AlertModalOptions
  ) {
    this.data = { ...this.defaultOptions, ...alertModalOptions };
  }

}
