import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

export interface PromptModalOptions {
  message?: string;
  title?: string;
  trueBtnText?: string;
  falseBtnText?: string;
  placeholder?: string;
}

@Component({
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.scss']
})
export class PromptModalComponent {

  defaultOptions: PromptModalOptions = {
    message: 'Please enter a value',
    title: 'Prompt',
    trueBtnText: 'OK',
    falseBtnText: 'Cancel',
    placeholder: ''
  };
  data: PromptModalOptions;

  inputText: string;

  constructor(
    public dialogRef: DialogRef<string, PromptModalComponent>,
    @Inject(DIALOG_DATA) promptModalOptions:
      PromptModalOptions
  ) {
    this.data = { ...this.defaultOptions, ...promptModalOptions };
  }

}
