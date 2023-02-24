import { DEFAULT_DIALOG_CONFIG, Dialog, DialogConfig, DialogModule } from '@angular/cdk/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { ApplicationRef, NgModule, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiElementsModule } from '../ui-elements/ui-elements.module';
import { CustomCdkDialogContainerComponent } from './custom-cdk-dialog-container/custom-cdk-dialog-container.component';
import { CustomCdkOverlayContainer } from './custom-cdk-overlay-container';
import { ModalService } from './modal.service';
import { AlertModalComponent } from './standard-dialogs/alert-modal.component';
import { ConfirmModalComponent } from './standard-dialogs/confirm-modal.component';
import { PromptModalComponent } from './standard-dialogs/prompt-modal.component';

const dialogConfigFactory = () => {
  const defaultDialogConfig = new DialogConfig();
  defaultDialogConfig.container = CustomCdkDialogContainerComponent;
  return defaultDialogConfig;
}

@NgModule({
  declarations: [
    AlertModalComponent,
    CustomCdkDialogContainerComponent,
    ConfirmModalComponent,
    PromptModalComponent
  ],
  providers: [
    // Make Modal Service only available to modules that import ModalModule
    ModalService,
    // Create a custom overlay container that is within the app-root (otherwise it gets appended to the <body> and app styles are not applied)
    { provide: OverlayContainer, useClass: CustomCdkOverlayContainer },
    // Use a custom CDK dialog container to style the modal shell
    {provide: DEFAULT_DIALOG_CONFIG, useFactory: dialogConfigFactory}
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    UiElementsModule
  ],
  exports: [
    DialogModule
  ],
})
export class ModalModule { }
