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
  template: `
  <div class="inner">
  <div class="scrollbar">
    <h1>{{data.title}}</h1>
    <p> {{data.message}}</p>
    <input type="text" [placeholder]="data.placeholder" #textInput>
    <div class="action-container">
      <p class="button--3" (click)="dialogRef.close(textInput.value)">
        {{data.trueBtnText}}
      </p>
      <p class="button--3" (click)="dialogRef.close()">
        {{data.falseBtnText}}
      </p>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./standard-dialog-default.scss']
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

  constructor(
    public dialogRef: DialogRef<string, PromptModalComponent>,
    @Inject(DIALOG_DATA) promptModalOptions:
      PromptModalOptions
  ) {
    this.data = { ...this.defaultOptions, ...promptModalOptions };
  }

}
