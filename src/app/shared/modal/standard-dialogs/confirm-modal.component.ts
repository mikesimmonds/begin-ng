import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

export interface ConfirmModalOptions {
  message?: string;
  title?: string;
  trueBtnText?: string;
  falseBtnText?: string;
}

@Component({
  template: `
  <div class="inner">
  <div class="scrollbar">
    <h1>{{data.title}}</h1>
    <p> {{data.message}}</p>
    <div class="action-container">
      <p class="button--3" (click)="dialogRef.close(true)">
        {{data.trueBtnText}}
      </p>
      <p class="button--3" (click)="dialogRef.close(false)">
        {{data.falseBtnText}}
      </p>
    </div>
  </div>
</div>`,
  styleUrls: ['./standard-dialog-default.scss']
})
export class ConfirmModalComponent {

  defaultOptions: ConfirmModalOptions = {
    message: 'Are you sure?',
    title: 'Confirm',
    trueBtnText: 'Yes',
    falseBtnText: 'No'
  };
  data: ConfirmModalOptions;

  constructor(
    public dialogRef: DialogRef<boolean, ConfirmModalComponent>,
    @Inject(DIALOG_DATA) confirmModalOptions:
      ConfirmModalOptions
  ) {
    this.data = { ...this.defaultOptions, ...confirmModalOptions };
  }

}
