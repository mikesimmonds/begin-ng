import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

export interface AlertModalOptions {
  message: string;
  title?: string;
  btnText?: string;
}

@Component({
  template: `
    <div class="scrollbar">
    <h1>{{data.title}}</h1>
    <p> {{data.message}}</p>
    <div class="action-container">
      <button appButton type="primary" (click)="dialogRef.close(true)">
        {{data.btnText}}
      </button>
    </div>
  </div>
  `,
  styleUrls: ['./standard-dialog-default.scss']
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
