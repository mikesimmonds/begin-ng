import { CdkDialogContainer } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
/**
 * This component replaces the standard CdkDialogContainer, which is used to wrap the dialog components. Please see: https://github.com/angular/components/blob/main/src/cdk/dialog/dialog-container.ts to learn how to use it
 *
 *
 * https://stackoverflow.com/questions/73831569/creating-a-custom-dialog-container-using-cdkdialogcontainer
 *
 * @export
 * @class BaseContainerComponent
 * @extends {CdkDialogContainer}
 */
@Component({
  selector: 'app-modal-custom-cdk-dialog-container',
  template: `<ng-template cdkPortalOutlet></ng-template>`,
  styleUrls: ['./custom-cdk-dialog-container.component.scss']
})
export class CustomCdkDialogContainerComponent extends CdkDialogContainer {

}
