import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

export interface ConfirmModalOptions {
  message?: string;
  title?: string;
  trueBtnText?: string;
  falseBtnText?: string;
}

@Component({
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
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
