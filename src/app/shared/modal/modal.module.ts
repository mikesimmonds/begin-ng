import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BaseContainerComponent } from './base-container/base-container.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import { ExampleCustomModalComponent } from './example-custom-modal/example-custom-modal.component';
import { DialogModule } from '@angular/cdk/dialog';

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
    FormsModule,
    DialogModule
  ],
  exports: [
    DialogModule
  ],
})
export class ModalModule { }
