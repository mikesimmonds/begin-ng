import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BaseContainerComponent } from './base-container/base-container.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import { FormsModule } from '@angular/forms';
import { ExampleCustomModalComponent } from './example-custom-modal/example-custom-modal.component';

@NgModule({
  declarations: [
    AlertModalComponent,
    BaseContainerComponent,
    ConfirmModalComponent,
    PromptModalComponent,
    ExampleCustomModalComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
  ]
})
export class ModalModule { }
